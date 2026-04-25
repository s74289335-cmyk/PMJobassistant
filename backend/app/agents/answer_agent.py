from app.ai_service import call_llm

def generate_answer(profile, jd, question):
    prompt = f"""
You are a job application assistant.

Return ONLY JSON:
{{
  "answer": "string"
}}

Profile:
{profile}

Job Description:
{jd}

Question:
{question}
"""
    return call_llm(prompt)