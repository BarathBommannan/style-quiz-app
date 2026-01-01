import ollama

def generate_explanation(preferences: dict, item: dict) -> str:
    prompt = f"""
You are a fashion recommendation assistant.

Write ONE concise sentence explaining why the product matches the user's preferences.

Rules:
- Do NOT mention gender explicitly
- Mention colour, category, or season only if relevant
- Friendly, natural tone
- Max 25 words

User preferences:
{preferences}

Recommended product:
{item}
"""

    response = ollama.chat(
        model="llama3.1:8b",
        messages=[{"role": "user", "content": prompt}],
    )

    return response["message"]["content"].strip()


# SAFE wrapper (IMPORTANT)
def safe_generate_explanation(preferences: dict, item: dict) -> str:
    try:
        return generate_explanation(preferences, item)
    except Exception as e:
        print("LLM error:", e)
        return "Recommended based on your style preferences"
