#!/usr/bin/env bash
# EasyTax — 백그라운드 실행 스크립트
# 사용법: ./run.sh
#   재시작: ./run.sh          (기존 프로세스 자동 종료 후 재시작)
#   중지:   ./run.sh stop
#   상태:   ./run.sh status
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$APP_DIR/.venv"
PID_FILE="$APP_DIR/.easytax.pid"
LOGS_DIR="$APP_DIR/logs"
PORT=9040
CMD="${1:-start}"

mkdir -p "$LOGS_DIR"
LOG_FILE="$LOGS_DIR/easytax_$(date +%Y%m%d).log"

# ── 헬퍼 ─────────────────────────────────────────────────────

is_running() {
  [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null
}

stop_server() {
  echo "=== EasyTax 프로세스 종료 중 ==="

  # PID 파일로 종료
  if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if kill -0 "$OLD_PID" 2>/dev/null; then
      echo "  [종료] PID $OLD_PID"
      kill -TERM "$OLD_PID" 2>/dev/null || true
      # 최대 5초 대기
      for _ in $(seq 1 10); do
        kill -0 "$OLD_PID" 2>/dev/null || break
        sleep 0.5
      done
      # 아직 살아있으면 강제 종료
      kill -0 "$OLD_PID" 2>/dev/null && kill -KILL "$OLD_PID" 2>/dev/null || true
    fi
    rm -f "$PID_FILE"
  fi

  # uvicorn 잔여 프로세스 종료
  while read -r PID; do
    echo "  [종료] uvicorn PID $PID"
    kill -TERM "$PID" 2>/dev/null || true
  done < <(pgrep -f "uvicorn main:app" 2>/dev/null || true)

  # 포트 점유 프로세스 종료 (fuser 우선, 없으면 ss+kill)
  if command -v fuser &>/dev/null; then
    fuser -k -TERM "${PORT}/tcp" 2>/dev/null || true
    sleep 1
    fuser -k -KILL "${PORT}/tcp" 2>/dev/null || true
  else
    # fuser 없을 때 대안
    while read -r PID; do
      echo "  [종료] 포트 $PORT PID $PID"
      kill -KILL "$PID" 2>/dev/null || true
    done < <(ss -tlnp "sport = :$PORT" 2>/dev/null \
               | grep -oP '(?<=pid=)\d+' || true)
  fi

  sleep 1
  echo "  완료"
}

# ── 명령 분기 ─────────────────────────────────────────────────

case "$CMD" in

  stop)
    stop_server
    echo "=== 서버가 중지됐습니다 ==="
    exit 0
    ;;

  status)
    if is_running; then
      echo "실행 중 — PID $(cat "$PID_FILE") / 포트 $PORT"
      echo "로그: $LOG_FILE"
    else
      echo "중지됨"
    fi
    exit 0
    ;;

  start|restart|"")
    ;;

  *)
    echo "사용법: $0 [start|stop|status]"
    exit 1
    ;;
esac

# ── 가상환경 확인 ─────────────────────────────────────────────

if [ ! -d "$VENV_DIR" ]; then
  echo "[오류] 가상환경이 없습니다. 먼저 ./install.sh 를 실행하세요."
  exit 1
fi

# ── 기존 프로세스 정리 → 재시작 ──────────────────────────────

stop_server

# ── 서버 기동 ─────────────────────────────────────────────────

echo ""
echo "=== EasyTax 서버 시작 ==="
echo "  주소: http://0.0.0.0:$PORT"
echo "  로그: $LOG_FILE"

cd "$APP_DIR"

nohup "$VENV_DIR/bin/uvicorn" main:app \
  --host 0.0.0.0 \
  --port "$PORT" \
  --log-level info \
  >> "$LOG_FILE" 2>&1 &

SERVER_PID=$!
echo $SERVER_PID > "$PID_FILE"
echo "  PID: $SERVER_PID"

# 기동 확인 (최대 10초)
echo "  기동 확인 중..."
for i in $(seq 1 20); do
  if curl -sf "http://localhost:$PORT/login" -o /dev/null 2>/dev/null; then
    echo ""
    echo "=== 서버 정상 기동 (http://localhost:$PORT) ==="
    exit 0
  fi
  # 프로세스가 죽었으면 즉시 실패
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    echo ""
    echo "[오류] 프로세스가 즉시 종료됐습니다. 로그를 확인하세요:"
    tail -30 "$LOG_FILE"
    exit 1
  fi
  sleep 0.5
done

echo "[경고] 10초 내 응답 없음 — 로그를 확인하세요:"
tail -20 "$LOG_FILE"
exit 1
