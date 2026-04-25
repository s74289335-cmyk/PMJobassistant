from fastapi import APIRouter, HTTPException
from app.schemas import ResumeRequest
from app.agents.resume_agent import analyze_resume

router = APIRouter()


@router.post("/analyze")
def analyze(data: ResumeRequest):

    # 🔥 Validate input
    if not data.resume or not data.jd:
        raise HTTPException(status_code=400, detail="Resume and JD are required")

    # 🔥 Call AI safely
    try:
        result = analyze_resume(data.resume, data.jd)
    except Exception:
        raise HTTPException(status_code=500, detail="Resume analysis failed")

    return result