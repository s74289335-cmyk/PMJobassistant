from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.hash import bcrypt

from app.database import SessionLocal
from app.models import User

router = APIRouter()


# 🔹 DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔹 SIGNUP
@router.post("/signup")
def signup(data: dict, db: Session = Depends(get_db)):

    if not data.get("name") or not data.get("email") or not data.get("password"):
        raise HTTPException(status_code=400, detail="All fields are required")

    # 🔥 Check if user already exists
    existing_user = db.query(User).filter(User.email == data["email"]).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    password = data["password"][:72]
    hashed = bcrypt.hash(password)

    user = User(
        name=data["name"],
        email=data["email"],
        password=hashed
    )

    db.add(user)
    db.commit()

    return {"message": "User created successfully"}


# 🔹 LOGIN
@router.post("/login")
def login(data: dict, db: Session = Depends(get_db)):

    if not data.get("email") or not data.get("password"):
        raise HTTPException(status_code=400, detail="Email and password required")

    user = db.query(User).filter(User.email == data["email"]).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    password = data["password"][:72]

    if not bcrypt.verify(password, user.password):
        raise HTTPException(status_code=401, detail="Incorrect password")

    return {
        "message": "Login success",
        "user_id": user.id
    }