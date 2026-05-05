#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$APP_DIR/.venv"

echo "=== EasyTax 설치 시작 ==="

# Python 3.11+ 확인
if ! command -v python3 &>/dev/null; then
  echo "[설치] python3 설치 중..."
  sudo apt-get update -y
  sudo apt-get install -y python3 python3-pip python3-venv
fi

PYTHON_MINOR=$(python3 -c "import sys; print(sys.version_info.minor)")
if [ "$PYTHON_MINOR" -lt 10 ]; then
  echo "[설치] Python 3.10+ 설치 중..."
  sudo apt-get update -y
  sudo apt-get install -y python3.11 python3.11-venv python3.11-pip
  PYTHON_BIN=python3.11
else
  PYTHON_BIN=python3
fi

# 가상환경 생성
if [ ! -d "$VENV_DIR" ]; then
  echo "[설치] 가상환경 생성 중..."
  $PYTHON_BIN -m venv "$VENV_DIR"
fi

# 의존성 설치
echo "[설치] 패키지 설치 중..."
"$VENV_DIR/bin/pip" install --upgrade pip -q
"$VENV_DIR/bin/pip" install -r "$APP_DIR/requirements.txt" -q

# 실행 스크립트에 실행 권한 부여
chmod +x "$APP_DIR/run.sh"

echo ""
echo "=== 설치 완료 ==="
echo "실행: ./run.sh"
