import os
import joblib
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

def test_model():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    MODEL_DIR = os.path.join(BASE_DIR, "..", "models")

    print("Loading model and artifacts...")
    df_roles = joblib.load(os.path.join(MODEL_DIR, "roles_dataframe.pkl"))
    role_embeddings = np.load(os.path.join(MODEL_DIR, "role_embeddings.npy"))
    model = SentenceTransformer('all-MiniLM-L6-v2')

    test_resumes = [
        {
            "expected_field": "Frontend / Web Development",
            "text": "I have 4 years of experience building UI components with React, Vue, and Tailwind CSS. I am proficient in JavaScript and HTML."
        },
        {
            "expected_field": "Data / AI",
            "text": "Developed machine learning pipelines using Python, TensorFlow, and PyTorch. Skilled in SQL and big data architectures."
        },
        {
            "expected_field": "Cybersecurity",
            "text": "Certified ethical hacker. Experience with penetration testing, Kali Linux, network security, and vulnerability scanning."
        }
    ]

    for i, test in enumerate(test_resumes, 1):
        print(f"Test {i} - Expected Field: {test['expected_field']}")
        print(f"Resume Snippet: '{test['text']}'")
        
        resume_embedding = model.encode([test['text'].lower()])
        
        similarities = cosine_similarity(resume_embedding, role_embeddings)[0]
        
        top_indices = np.argsort(similarities)[::-1][:3]
        
        print("Top 3 Matches:")
        for rank, idx in enumerate(top_indices, 1):
            score = round(float(similarities[idx]) * 100, 1)
            role_title = df_roles.iloc[idx]['Job Title']
            print(f"  {rank}. {role_title} ({score}% match)")
        print("-" * 50)

if __name__ == "__main__":
    test_model()