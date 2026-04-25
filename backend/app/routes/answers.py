from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import User
from app.agents.answer_agent import generate_answer

router = APIRouter()


# 🔹 DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔹 GENERATE ANSWER
@router.post("/generate")
def generate(data: dict, db: Session = Depends(get_db)):

    # 🔥 Validate input
    if not data.get("user_id") or not data.get("jd") or not data.get("question"):
        raise HTTPException(status_code=400, detail="Missing required fields")

    # 🔥 Fetch user
    user = db.query(User).filter(User.id == data["user_id"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 🔥 Ensure resume exists
    if not user.resume:
        raise HTTPException(status_code=400, detail="Upload resume first")

    profile = user.resume
    jd = data["jd"]
    question = data["question"]

    # 🔥 Call AI safely
    try:
        result = generate_answer(profile, jd, question)
    except Exception as e:
        raise HTTPException(status_code=500, detail="AI generation failed")

    return result