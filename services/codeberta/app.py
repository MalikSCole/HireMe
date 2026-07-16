import os
from contextlib import asynccontextmanager

import torch
from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel, Field
from transformers import AutoModelForSequenceClassification, AutoTokenizer

MODEL_ID = os.environ.get("CODEBERTA_MODEL_ID")
API_KEY = os.environ.get("CODEBERTA_API_KEY")
MAX_SOURCE_LENGTH = 20_000
state = {}


class AnalysisRequest(BaseModel):
    source_code: str = Field(min_length=1, max_length=MAX_SOURCE_LENGTH)
    problem_title: str = Field(min_length=1, max_length=160)
    problem_description: str = Field(min_length=1, max_length=20_000)
    ast_features: dict


@asynccontextmanager
async def lifespan(_: FastAPI):
    if not MODEL_ID:
        raise RuntimeError("CODEBERTA_MODEL_ID must point to a fine-tuned sequence-classification model.")
    state["tokenizer"] = AutoTokenizer.from_pretrained(MODEL_ID)
    state["model"] = AutoModelForSequenceClassification.from_pretrained(MODEL_ID)
    state["model"].eval()
    yield
    state.clear()


app = FastAPI(title="HireMe CodeBERTa Classifier", lifespan=lifespan)


@app.get("/health")
def health():
    return {"ready": "model" in state, "model": MODEL_ID}


@app.post("/analyze")
def analyze(request: AnalysisRequest, authorization: str | None = Header(default=None)):
    if API_KEY and authorization != f"Bearer {API_KEY}":
        raise HTTPException(status_code=401, detail="Invalid classifier API key.")

    tokenizer = state["tokenizer"]
    model = state["model"]
    context = f"{request.problem_title}\n{request.problem_description}\nAST: {request.ast_features}"
    inputs = tokenizer(context, request.source_code, truncation=True, max_length=512, return_tensors="pt")
    with torch.inference_mode():
        probabilities = torch.softmax(model(**inputs).logits[0], dim=-1)

    id_to_label = model.config.id2label
    ranked = sorted(
        ({"label": id_to_label.get(index, f"LABEL_{index}"), "probability": float(value)} for index, value in enumerate(probabilities)),
        key=lambda item: item["probability"],
        reverse=True,
    )
    return {"model": MODEL_ID, "label": ranked[0]["label"], "confidence": ranked[0]["probability"], "probabilities": ranked}
