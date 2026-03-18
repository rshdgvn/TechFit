from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from pydantic import BaseModel
from typing import List, Dict, Any

import joblib
import pandas as pd
import numpy as np
import gc
import os
import re

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv
from supabase import create_client, Client

from utils.parser import extract_text_from_file
from utils.processor import clean_resume_text, extract_skills

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client | None = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

df_roles = pd.DataFrame()
role_embeddings = None
embedding_model = None
known_skills = []

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

class ManualProfileRequest(BaseModel):
    mode: str
    skills: List[str]
    custom_skills: List[str]
    interests: str

def update_analytics_count() -> int | None:
    if not supabase:
        return None
    try:
        response = supabase.table("analytics").select("resumes_analyzed").eq("id", 1).execute()
        new_count = response.data[0]["resumes_analyzed"] + 1
        supabase.table("analytics").update({"resumes_analyzed": new_count}).eq("id", 1).execute()
        return new_count
    except Exception as e:
        print(f"Failed to update analytics: {e}")
        return None

def get_top_role_suggestions(embedding: np.ndarray, top_k: int = 3) -> List[Dict[str, Any]]:
    similarities = cosine_similarity(embedding, role_embeddings)[0]
    top_indices = np.argsort(similarities)[::-1][:top_k]
    
    suggestions = []
    for i in top_indices:
        score = float(similarities[i])
        role_data = df_roles.iloc[i]
        suggestions.append({
            "job_title": role_data['Job Title'],
            "confidence": round(score * 100, 2),
            "required_skills": role_data['Skills'],
            "job_description": role_data.get('Job Description', 'No description available'),
        })
    return suggestions

@asynccontextmanager
async def lifespan(app: FastAPI):
    global df_roles, role_embeddings, embedding_model, known_skills
    try:
        print("Starting up: Loading model artifacts...")
        df_roles = joblib.load(os.path.join(MODEL_DIR, "roles_dataframe.pkl"))
        role_embeddings = np.load(os.path.join(MODEL_DIR, "role_embeddings.npy"))
        
        print("Loading Sentence Transformer model...")
        embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        
        temp_skills = set()
        if not df_roles.empty:
            for skill_str in df_roles['Skills'].dropna():
                temp_skills.update([s.strip() for s in re.split(r'[,\n]', str(skill_str)) if s.strip()])
        known_skills = list(temp_skills)
        print("Models loaded successfully.")
    except Exception as e:
        print(f"Error loading models: {e}")
        
    yield  
    
    df_roles, role_embeddings, embedding_model = pd.DataFrame(), None, None
    gc.collect()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the Techfit API"}

def check_models_loaded():
    if embedding_model is None or role_embeddings is None:
        raise HTTPException(status_code=503, detail="Techfit is getting things ready. Please try again in a few seconds.")

@app.post("/predict")
async def predict_job(file: UploadFile = File(...)):
    check_models_loaded()

    contents = await file.read()
    raw_text = extract_text_from_file(contents, file.filename)        
    detected_skills = extract_skills(raw_text, known_skills)    
    clean_text = clean_resume_text(raw_text)
    
    text_to_embed = f"Skills: {', '.join(detected_skills)}. Experience: {clean_text}"
    resume_embedding = embedding_model.encode([text_to_embed.lower()])
    
    return {
        "filename": file.filename,
        "extracted_skills": detected_skills,
        "suggestions": get_top_role_suggestions(resume_embedding),
        "new_count": update_analytics_count()
    }

@app.post("/match-profile")
async def match_profile(payload: ManualProfileRequest):
    check_models_loaded()

    all_skills = payload.skills + payload.custom_skills
    text_to_embed = f"Skills: {', '.join(all_skills)}. Interests and Experience: {payload.interests}"
    
    profile_embedding = embedding_model.encode([text_to_embed.lower()])
    
    return {
        "extracted_skills": all_skills,
        "suggestions": get_top_role_suggestions(profile_embedding),
        "new_count": update_analytics_count()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000)