from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import User
from app.agents.job_agent import recommend_jobs

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/jobs/recommend/{user_id}")
def get_jobs(user_id: int, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user or not user.resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    jobs = recommend_jobs(user.resume)

    return jobs