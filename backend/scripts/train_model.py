import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
import joblib
import os

def train():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    
    DATA_PATH = os.path.join(BASE_DIR, "..", "data", "tech_roles_dataset.csv")
    
    print("1. Loading dataset...")
    df = pd.read_csv(DATA_PATH)
    
    df.columns = [col.strip().replace('\ufeff', '') for col in df.columns]
    df = df.fillna("")

    print(f"2. Preparing AI context strings for {len(df)} roles...")
    df['ai_context'] = (
        "Role: " + df['Job Title'] + ". " +
        "Skills required: " + df['Skills'] + ". " +
        "Description: " + df['Job Description']
    ).str.lower()

    print("3. Loading Sentence Transformer model (all-MiniLM-L6-v2)...")
    model = SentenceTransformer('all-MiniLM-L6-v2')

    print("4. Generating embeddings... (This might take a minute)")
    role_embeddings = model.encode(df['ai_context'].tolist(), show_progress_bar=True)

    print("5. Saving artifacts to /models...")
    MODEL_DIR = os.path.join(BASE_DIR, "..", "models")
    os.makedirs(MODEL_DIR, exist_ok=True)

    np.save(os.path.join(MODEL_DIR, "role_embeddings.npy"), role_embeddings)
    
    df_clean = df[['Job Title', 'Skills', 'Job Description']]
    joblib.dump(df_clean, os.path.join(MODEL_DIR, "roles_dataframe.pkl"))

    print(f"MODEL INITIALIZATION COMPLETE!")
    print(f"Embedded {role_embeddings.shape[0]} roles into {role_embeddings.shape[1]}-dimensional space.")
    print("Artifacts saved:")
    print(" - role_embeddings.npy")
    print(" - roles_dataframe.pkl")

if __name__ == "__main__":
    train()