from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 🔹 DB
from app.database import engine, Base

# 🔹 ROUTES
from app.routes import resume, answers, applications, auth, scraper, profile

# 🔹 INIT APP
app = FastAPI()

# 🔹 CREATE TABLES
Base.metadata.create_all(bind=engine)

# 🔹 CORS (frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 ROUTERS
app.include_router(resume.router, prefix="/api/resume")
app.include_router(answers.router, prefix="/api/answers")
app.include_router(applications.router, prefix="/api/applications")
app.include_router(auth.router, prefix="/api/auth")
app.include_router(scraper.router, prefix="/api")
app.include_router(profile.router, prefix="/api")

from app.routes import jobs

app.include_router(jobs.router, prefix="/api")