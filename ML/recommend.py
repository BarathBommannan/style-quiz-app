import pickle
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import os
from llm_explanations import safe_generate_explanation


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(BASE_DIR, "vectorizer.pkl"), "rb") as f:
    vectorizer = pickle.load(f)

df = pd.read_csv(
    os.path.join(BASE_DIR, "styles.csv"),
    on_bad_lines="skip",
    encoding="utf-8"
).fillna("")

TEXT_COLS = [
    "gender",
    "articleType",
    "baseColour",
    "masterCategory",
    "subCategory",
    "season",
    "productDisplayName"
]

for col in TEXT_COLS:
    df[col] = df[col].astype(str).str.strip().str.lower()


images_df = pd.read_csv(os.path.join(BASE_DIR, "images.csv"))

images_df["id"] = (
    images_df["filename"]
    .str.replace(".jpg", "", regex=False)
    .astype(int)
)

images_df = images_df[["id", "link"]]

df = df.merge(images_df, on="id", how="left")

df["text"] = (
    df["gender"] + " " +
    df["masterCategory"] + " " +
    df["subCategory"] + " " +
    df["articleType"] + " " +
    df["baseColour"] + " " +
    df["season"] + " " +
    df["productDisplayName"]
)

def recommend_from_quiz(quiz_answers, top_n=20):

    if not quiz_answers:
        return []

    quiz_answers = [
        {k: str(v).strip().lower() for k, v in a.items()}
        for a in quiz_answers
    ]

    preferred_gender = quiz_answers[0]["gender"]

    liked_answers = [a for a in quiz_answers if a.get("liked") == "true" or a.get("liked") is True]

    if not liked_answers:
        return []

    liked_subcategories = {a["subCategory"] for a in liked_answers}
    liked_article_types = {a["articleType"] for a in liked_answers}

    preference_summary = {
    "subCategories": list(liked_subcategories),
    "articleTypes": list(liked_article_types),
    "colours": list({a["baseColour"] for a in liked_answers}),
    "seasons": list({a["season"] for a in liked_answers}),
}


    df_filtered = df[
        (df["gender"] == preferred_gender) &
        (df["subCategory"].isin(liked_subcategories))
    ].reset_index(drop=True)

    print(df_filtered["subCategory"].value_counts())
    print(df_filtered["gender"].unique())


    if df_filtered.empty:
        return []

    liked_text = " ".join([
        f"{a['subCategory']} {a['articleType']} {a['baseColour']} {a['season']}"
        for a in liked_answers
    ])

    user_vector = vectorizer.transform([liked_text])
    item_vectors = vectorizer.transform(df_filtered["text"])

    similarities = cosine_similarity(user_vector, item_vectors)[0]

    ranked_indices = similarities.argsort()[::-1]

    results = []
    seen = set()

    for idx in ranked_indices:
        item = df_filtered.iloc[idx]

        dedupe_key = (
            item["articleType"],
            item["baseColour"]
        )

        if dedupe_key in seen:
            continue
        seen.add(dedupe_key)

        if item["gender"] != preferred_gender:
            continue

        reason = safe_generate_explanation(
            preferences=preference_summary,
            item={
                "name": item["productDisplayName"],
                "subCategory": item["subCategory"],
                "articleType": item["articleType"],
                "baseColour": item["baseColour"],
                "season": item["season"],
            }
        )

        results.append({
            "id": int(item["id"]),
            "name": item["productDisplayName"],
            "image": item.get("link"),
            "gender": item["gender"],
            "score": float(similarities[idx]),
            "reason": reason
        })

        if len(results) >= top_n:
            break
    
    return results

    
