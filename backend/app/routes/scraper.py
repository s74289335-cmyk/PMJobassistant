from fastapi import APIRouter
from app.agents.scraper import scrape_job

router = APIRouter()

@router.post("/")
def scrape(data: dict):
    return {"text": scrape_job(data["url"])}