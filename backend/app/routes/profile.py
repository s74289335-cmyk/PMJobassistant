from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import User
import pdfplumber
import io
router = APIRouter()


# 🔹 DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔹 GET PROFILE (🔥 ADD THIS)
@router.get("/profile/{user_id}")
def get_profile(user_id: int, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "name": user.name,
        "email": user.email,
        "resume": user.resume
    }


# 🔹 UPLOAD RESUME
@router.post("/profile/upload/{user_id}")
async def upload_resume(
    user_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # 🔥 Validate user
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 🔥 Validate file type
    allowed_types = ["text/plain", "application/pdf"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Only TXT or PDF files allowed")

    # 🔥 Read file
    content = await file.read()

    # 🔥 Size check (1MB limit)
    if len(content) > 1_000_000:
        raise HTTPException(status_code=400, detail="File too large")

    # 🔥 Convert to text
    # 🔥 Convert to text (FIXED)
    try:
        if file.content_type == "application/pdf":
            with pdfplumber.open(io.BytesIO(content)) as pdf:
                text = ""
                for page in pdf.pages:
                    text += page.extract_text() or ""
        else:
            text = content.decode("utf-8", errors="ignore")

    except Exception:
        raise HTTPException(status_code=500, detail="Failed to read file")

    # 🔥 Save to DB
    user.resume = text
    db.commit()

    return {"message": "Resume uploaded successfully"}