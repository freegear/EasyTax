#!/usr/bin/env python3
"""DB 초기화 — 테이블 생성 및 기본 사용자 등록. 멱등하게 동작합니다."""
from db import Base, SessionLocal, User, engine
from auth import hash_password


def init():
    Base.metadata.create_all(bind=engine)
    print("[DB] 테이블 생성 완료")

    db = SessionLocal()
    try:
        defaults = [("freegear", "gundam")]
        for username, password in defaults:
            if db.query(User).filter(User.username == username).first():
                print(f"[DB] 사용자 이미 존재: {username}")
            else:
                db.add(User(username=username, hashed_password=hash_password(password)))
                db.commit()
                print(f"[DB] 기본 사용자 생성: {username}")
    finally:
        db.close()


if __name__ == "__main__":
    init()
    print("[DB] 초기화 완료")
