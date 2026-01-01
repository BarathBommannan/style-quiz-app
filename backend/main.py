from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import sys
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


sys.path.append(os.path.join(os.path.dirname(__file__), "..", "ML"))

from recommend import recommend_from_quiz

class QuizItem(BaseModel):
    liked: bool
    gender: str
    baseColour: str
    articleType: str
    masterCategory: str
    subCategory: str
    season: str


@app.post("/recommend")
def get_recommendations(answers: List[QuizItem]):
    results = recommend_from_quiz([a.dict() for a in answers])
    return {"recommendations": results}
