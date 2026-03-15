from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import os
import re

from utils.parser import extract_text_from_file
from utils.processor import clean_resume_text, extract_skills

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

try:
    model = joblib.load(os.path.join(BASE_DIR, "models", "rf_classifier.pkl"))
    tfidf = joblib.load(os.path.join(BASE_DIR, "models", "tfidf_vectorizer.pkl"))
    le = joblib.load(os.path.join(BASE_DIR, "models", "label_encoder.pkl"))
    print("Machine Learning Models loaded successfully.")
except Exception as e:
    print(f"Warning: Could not load .pkl models. Did you run train_model.py? Error: {e}")

DATA_PATH = os.path.join(BASE_DIR, "data", "resume_data.csv")
known_skills = set()

df = pd.read_csv(DATA_PATH)
df.columns = [col.strip().replace('\ufeff', '') for col in df.columns]

for skill_str in df['skills'].dropna():
    skill_str = str(skill_str)
    
    clean_str = skill_str.replace('[', '').replace(']', '').replace("'", "").replace('"', "")
    skills_list = re.split(r'[,\n]', clean_str)
    
    for skill in skills_list:
        clean_skill = skill.strip()
        if clean_skill: 
            known_skills.add(clean_skill)
            
known_skills = list(known_skills)
    
@app.post("/predict")
async def predict_job(file: UploadFile = File(...)):
    contents = await file.read()
    
    raw_text = extract_text_from_file(contents, file.filename)        
    detected_skills = extract_skills(raw_text, known_skills)    
    
    skills_only_text = " ".join(detected_skills)
    
    if not skills_only_text:
        skills_only_text = clean_resume_text(raw_text)
        
    vectorized = tfidf.transform([skills_only_text])
    probabilities = model.predict_proba(vectorized)[0]
    top_indices = probabilities.argsort()[-3:][::-1]
    
    suggestions = []
    for i in top_indices:
        suggestions.append({
            "job_title": le.inverse_transform([i])[0],
            "confidence": round(float(probabilities[i]) * 100, 2)
        })
        
    return {
        "filename": file.filename,
        "extracted_skills": detected_skills,
        "suggestions": suggestions
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)