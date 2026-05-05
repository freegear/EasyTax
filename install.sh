#!/usr/bin/env bash
# EasyTax — Ubuntu 설치 스크립트
# 사용법: chmod +x install.sh && ./install.sh
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$APP_DIR/.venv"

echo "================================================"
echo "  EasyTax 설치 (Ubuntu)"
echo "================================================"
echo ""

# ── 1. 시스템 패키지 ─────────────────────────────────────────

echo "[1/5] 시스템 패키지 확인 중..."

NEED_APT=()
command -v python3  &>/dev/null || NEED_APT+=(python3)
command -v pip3     &>/dev/null || NEED_APT+=(python3-pip)
command -v curl     &>/dev/null || NEED_APT+=(curl)
python3 -m venv --help &>/dev/null 2>&1 || NEED_APT+=(python3-venv)
command -v fuser    &>/dev/null || NEED_APT+=(psmisc)   # fuser — 포트 점유 프로세스 종료

if [ ${#NEED_APT[@]} -gt 0 ]; then
  echo "  → 설치 필요: ${NEED_APT[*]}"
  sudo apt-get update -y -qq
  sudo apt-get install -y -qq "${NEED_APT[@]}"
else
  echo "  → 이미 설치됨"
fi

# Python 3.10+ 확인
PYTHON_VER=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
PYTHON_MINOR=$(python3 -c "import sys; print(sys.version_info.minor)")
echo "  Python $PYTHON_VER 확인"

if [ "$PYTHON_MINOR" -lt 10 ]; then
  echo "  Python 3.10+ 필요. 3.11 설치 중..."
  sudo apt-get install -y -qq python3.11 python3.11-venv python3.11-pip
  PYTHON_BIN=python3.11
else
  PYTHON_BIN=python3
fi

# ── 2. 가상환경 ──────────────────────────────────────────────

echo ""
echo "[2/5] 가상환경 설정 중..."

if [ ! -d "$VENV_DIR" ]; then
  $PYTHON_BIN -m venv "$VENV_DIR"
  echo "  → 생성 완료: $VENV_DIR"
else
  echo "  → 이미 존재: $VENV_DIR"
fi

# ── 3. Python 패키지 ─────────────────────────────────────────

echo ""
echo "[3/5] Python 패키지 설치 중..."

"$VENV_DIR/bin/pip" install --upgrade pip -q
"$VENV_DIR/bin/pip" install -r "$APP_DIR/requirements.txt" -q
echo "  → 완료"

# ── 4. 폴더 및 권한 ─────────────────────────────────────────

echo ""
echo "[4/5] 폴더 및 권한 설정 중..."

mkdir -p "$APP_DIR/logs"
mkdir -p "$APP_DIR/image"
chmod +x "$APP_DIR/run.sh"
echo "  → logs/, image/ 생성 완료"
echo "  → run.sh 실행 권한 부여"

# ── 5. DB 초기화 ─────────────────────────────────────────────

echo ""
echo "[5/5] DB 초기화 중..."

cd "$APP_DIR"
"$VENV_DIR/bin/python" init_db.py

# ── 완료 ─────────────────────────────────────────────────────

echo ""
echo "================================================"
echo "  설치 완료"
echo "================================================"
echo ""
echo "  다음 파일을 image/ 폴더에 복사하세요:"
echo "    image/logo.png    — 앱 로고"
echo "    image/favicon.png — 파비콘"
echo ""
echo "  서버 시작: ./run.sh"
echo ""
