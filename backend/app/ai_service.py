import json
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def call_llm(prompt: str):
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
    )

    content = response.choices[0].message.content.strip()

    print("LLM RAW OUTPUT:", content)  # 🔥 DEBUG

    try:
        return json.loads(content)
    except:
        return {
            "match_score": "N/A",
            "missing_skills": [],
            "strengths": [],
            "improvements": [],
            "raw_output": content
        }