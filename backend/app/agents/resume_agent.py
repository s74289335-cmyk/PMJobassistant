from app.ai_service import call_llm

def analyze_resume(resume, jd):
    prompt = f"""
You are an expert resume analyzer.

Respond ONLY in valid JSON format like this:

{{
  "match_score": 75,
  "missing_skills": ["skill1"],
  "strengths": ["strength1"],
  "improvements": ["improvement1"]
}}

Do not add any explanation.

Resume:
{resume}

Job Description:
{jd}
"""
    return call_llm(prompt)