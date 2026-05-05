#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$APP_DIR/.venv"
PID_FILE="$APP_DIR/.easytax.pid"
LOG_FILE="$APP_DIR/easytax.log"
PORT=9040

# ── 기존 프로세스 정리 ────────────────────────────────────────────────────────

echo "=== 기존 EasyTax 프로세스 종료 중 ==="

# PID 파일로 관리되는 프로세스 종료
if [ -f "$PID_FILE" ]; then
  OLD_PID=$(cat "$PID_FILE")
  if kill -0 "$OLD_PID" 2>/dev/null; then
    echo "  [종료] PID $OLD_PID"
    kill -TERM "$OLD_PID" 2>/dev/null || true
    sleep 1
    kill -KILL "$OLD_PID" 2>/dev/null || true
  fi
  rm -f "$PID_FILE"
fi

# uvicorn main:app 관련 프로세스 전체 종료
while read -r PID; do
  echo "  [종료] uvicorn PID $PID"
  kill -TERM "$PID" 2>/dev/null || true
done < <(pgrep -f "uvicorn main:app" 2>/dev/null || true)

sleep 1

# 포트 점유 프로세스 종료
while read -r PID; do
  echo "  [종료] 포트 $PORT 점유 프로세스 PID $PID"
  kill -TERM "$PID" 2>/dev/null || true
done < <(lsof -ti tcp:"$PORT" 2>/dev/null || true)

sleep 1

# 포트가 아직 점유 중이면 강제 종료
while read -r PID; do
  echo "  [강제 종료] PID $PID"
  kill -KILL "$PID" 2>/dev/null || true
done < <(lsof -ti tcp:"$PORT" 2>/dev/null || true)

echo "  완료"

# ── 서버 시작 ─────────────────────────────────────────────────────────────────

echo ""
echo "=== EasyTax 서버 시작 ==="
echo "  주소: http://0.0.0.0:$PORT"
echo "  로그: $LOG_FILE"

if [ ! -d "$VENV_DIR" ]; then
  echo "[오류] 가상환경이 없습니다. 먼저 ./install.sh 를 실행하세요."
  exit 1
fi

cd "$APP_DIR"

nohup "$VENV_DIR/bin/uvicorn" main:app \
  --host 0.0.0.0 \
  --port "$PORT" \
  --log-level info \
  >> "$LOG_FILE" 2>&1 &

echo $! > "$PID_FILE"
echo "  PID: $(cat "$PID_FILE")"

# 기동 확인 (최대 5초 대기)
for i in $(seq 1 10); do
  if curl -sf "http://localhost:$PORT/" -o /dev/null 2>/dev/null; then
    echo ""
    echo "=== 서버가 정상 기동됐습니다 (http://localhost:$PORT) ==="
    exit 0
  fi
  sleep 0.5
done

echo "[경고] 5초 내 응답 없음 — 로그를 확인하세요: $LOG_FILE"
tail -20 "$LOG_FILE"
exit 1
