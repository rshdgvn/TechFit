from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import joblib
import pandas as pd
import numpy as np
import os
import re
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from utils.parser import extract_text_from_file
from utils.processor import clean_resume_text, extract_skills

df_roles = pd.DataFrame()
role_embeddings = None
embedding_model = None
known_skills = []

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

@asynccontextmanager
async def lifespan(app: FastAPI):
    global df_roles, role_embeddings, embedding_model, known_skills
    try:
        print("Starting up: Port is bound, loading model artifacts...")
        df_roles = joblib.load(os.path.join(MODEL_DIR, "roles_dataframe.pkl"))
        role_embeddings = np.load(os.path.join(MODEL_DIR, "role_embeddings.npy"))
        
        print("Loading Sentence Transformer model... (This may take time on Render)")
        embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        print("Semantic Matching Models loaded successfully.")
        
        temp_skills = set()
        if not df_roles.empty:
            for skill_str in df_roles['Skills'].dropna():
                skills_list = re.split(r'[,\n]', str(skill_str))
                for skill in skills_list:
                    clean_skill = skill.strip()
                    if clean_skill: 
                        temp_skills.add(clean_skill)
        known_skills = list(temp_skills)
        
    except Exception as e:
        print(f"Warning: Could not load models. Error: {e}")
        
    yield

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
    return {"message": "Welcome to the Techfit"}

@app.post("/predict")
async def predict_job(file: UploadFile = File(...)):
    if embedding_model is None or role_embeddings is None:
        return {"error": "Techfit is getting things ready. Please try again in a few seconds."}

    contents = await file.read()
    
    raw_text = extract_text_from_file(contents, file.filename)        
    detected_skills = extract_skills(raw_text, known_skills)    
    clean_text = clean_resume_text(raw_text)
    
    text_to_embed = f"Skills: {', '.join(detected_skills)}. Experience: {clean_text}"
    resume_embedding = embedding_model.encode([text_to_embed.lower()])
    
    similarities = cosine_similarity(resume_embedding, role_embeddings)[0]
    top_indices = np.argsort(similarities)[::-1][:3]
    
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
        
    return {
        "filename": file.filename,
        "extracted_skills": detected_skills,
        "suggestions": suggestions
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000)