import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split 
from sklearn.metrics import accuracy_score, classification_report 
import joblib
import os

def train():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    DATA_PATH = os.path.join(BASE_DIR, "..", "data", "resume_data.csv")
    
    df = pd.read_csv(DATA_PATH)
    df.columns = [col.strip().replace('\ufeff', '') for col in df.columns]

    df['text_data'] = (
      df['job_position_name'].fillna('') + " " + 
      df['skills_required'].fillna('') + " " + 
      df['responsibilities.1'].fillna('')
    ).str.lower()

    tfidf = TfidfVectorizer(stop_words='english', max_features=3000)
    X = tfidf.fit_transform(df['text_data'])
    
    le = LabelEncoder()
    y = le.fit_transform(df['job_position_name'])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print(f"Training on {X_train.shape[0]} rows...")
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)

    print(f"Testing on {X_test.shape[0]} rows...")
    y_pred = clf.predict(X_test)
    
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\n======================================")
    print(f"MODEL ACCURACY: {round(accuracy * 100, 2)}%")
    print(f"======================================\n")
    
    MODEL_DIR = os.path.join(BASE_DIR, "..", "models")
    os.makedirs(MODEL_DIR, exist_ok=True)
    joblib.dump(clf, os.path.join(MODEL_DIR, "rf_classifier.pkl"))
    joblib.dump(tfidf, os.path.join(MODEL_DIR, "tfidf_vectorizer.pkl"))
    joblib.dump(le, os.path.join(MODEL_DIR, "label_encoder.pkl"))
    print("Model training complete. Artifacts saved in /models")

if __name__ == "__main__":
    train()