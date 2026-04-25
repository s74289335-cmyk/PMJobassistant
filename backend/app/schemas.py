from pydantic import BaseModel

class ResumeRequest(BaseModel):
    resume: str
    jd: str

class AnswerRequest(BaseModel):
    profile: str
    jd: str
    question: str

class ApplicationCreate(BaseModel):
    job_title: str
    company: str
    status: str