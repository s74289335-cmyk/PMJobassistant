from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Application, User
from app.schemas import ApplicationCreate
from pydantic import BaseModel

router = APIRouter()


# 🔹 DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔹 CREATE APPLICATION (manual)
@router.post("/")
def create_application(data: ApplicationCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == data.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    app = Application(**data.dict())

    db.add(app)
    db.commit()
    db.refresh(app)

    return app


# 🔹 GET USER APPLICATIONS
@router.get("/")
def get_applications(user_id: int = Query(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    apps = db.query(Application).filter(Application.user_id == user_id).all()
    return apps


# 🔥 APPLY ENDPOINT (THIS FIXES EVERYTHING)
class ApplyRequest(BaseModel):
    user_id: int
    job_id: str
    job_title: str
    company: str


@router.post("/apply")
def apply_job(data: ApplyRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == data.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 🔥 Prevent duplicate applications
    existing = db.query(Application).filter(
        Application.user_id == data.user_id,
        Application.job_title == data.job_title,
        Application.company == data.company
    ).first()

    if existing:
        return {"message": "Already applied"}

    new_app = Application(
        user_id=data.user_id,
        job_title=data.job_title,
        company=data.company,
        status="Applied"
    )

    db.add(new_app)
    db.commit()
    db.refresh(new_app)

    return {
        "message": "Application submitted",
        "application": new_app
    }