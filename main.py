import mimetypes
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

mimetypes.add_type("text/javascript", ".jsx")

BASE_DIR = Path(__file__).parent

app = FastAPI(title="EasyTax · 고연봉 직장인 절세 진단")


@app.get("/")
async def root():
    return FileResponse(BASE_DIR / "EasyTax.html")


app.mount("/", StaticFiles(directory=BASE_DIR), name="static")
