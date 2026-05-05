import logging
from datetime import datetime
from pathlib import Path

LOGS_DIR = Path(__file__).parent / "logs"


class DailyFileHandler(logging.FileHandler):
    """자정이 지나면 새 날짜 파일로 자동 전환하는 핸들러."""

    def __init__(self, log_dir: Path = LOGS_DIR):
        self.log_dir = log_dir
        self.log_dir.mkdir(parents=True, exist_ok=True)
        self._current_date = ""
        super().__init__(self._filepath(), encoding="utf-8", delay=False)

    def _filepath(self) -> str:
        return str(self.log_dir / f"easytax_{datetime.now().strftime('%Y%m%d')}.log")

    def emit(self, record: logging.LogRecord) -> None:
        today = datetime.now().strftime("%Y%m%d")
        if today != self._current_date:
            self._current_date = today
            if self.stream:
                self.stream.close()
                self.stream = None
            self.baseFilename = self._filepath()
            self.stream = self._open()
        super().emit(record)


_FMT = logging.Formatter(
    "%(asctime)s [%(levelname)-8s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)


def setup_logging() -> None:
    LOGS_DIR.mkdir(parents=True, exist_ok=True)

    file_handler = DailyFileHandler(LOGS_DIR)
    file_handler.setFormatter(_FMT)

    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(_FMT)

    root = logging.getLogger()
    root.setLevel(logging.INFO)
    # 중복 핸들러 방지
    if not root.handlers:
        root.addHandler(file_handler)
        root.addHandler(stream_handler)
