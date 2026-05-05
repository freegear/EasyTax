import logging
import mimetypes
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import Depends, FastAPI, Form, Request
from fastapi.responses import FileResponse, JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from auth import create_token, get_current_user, verify_password
from db import User, get_db
from logger import setup_logging

mimetypes.add_type("text/javascript", ".jsx")

BASE_DIR = Path(__file__).parent
log = logging.getLogger("easytax")


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging()
    log.info("EasyTax 서버 시작")
    yield
    log.info("EasyTax 서버 종료")


app = FastAPI(title="EasyTax · 절세 진단", lifespan=lifespan)


@app.get("/login")
async def login_page(request: Request):
    if get_current_user(request):
        return RedirectResponse("/", status_code=302)
    return FileResponse(BASE_DIR / "login.html")


@app.post("/api/auth/login")
async def login(
    request: Request,
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        log.warning("로그인 실패: %s (IP: %s)", username, request.client.host)
        return JSONResponse(status_code=401, content={"detail": "아이디 또는 비밀번호가 올바르지 않습니다."})

    log.info("로그인 성공: %s (IP: %s)", username, request.client.host)
    response = JSONResponse({"ok": True, "username": username})
    response.set_cookie("access_token", create_token(username), httponly=True, max_age=86400, samesite="lax")
    response.set_cookie("username", username, httponly=False, max_age=86400, samesite="lax")
    return response


@app.post("/api/auth/logout")
async def logout(request: Request):
    user = get_current_user(request)
    log.info("로그아웃: %s", user or "unknown")
    response = JSONResponse({"ok": True})
    response.delete_cookie("access_token")
    response.delete_cookie("username")
    return response


@app.get("/")
async def root(request: Request):
    if not get_current_user(request):
        return RedirectResponse("/login", status_code=302)
    return FileResponse(BASE_DIR / "app.html")


app.mount("/", StaticFiles(directory=BASE_DIR), name="static")
