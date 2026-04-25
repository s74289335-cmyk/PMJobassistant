from app.ai_service import call_llm

def recommend_jobs(resume_text):

    prompt = f"""
You are a job recommendation AI.

Based on the resume below, suggest 5 relevant job roles.

Return ONLY JSON:
[
  {{
    "title": "",
    "company": ""
  }}
]

Resume:
{resume_text}
"""

    return call_llm(prompt)