"""
train_model.py
--------------
Model Training Script for Fake News Detection.
Uses Scikit-Learn Pipeline: TfidfVectorizer + LogisticRegression.
Computes Accuracy, Precision, Recall, F1-score, and Confusion Matrix.
Saves serialized model and vectorizer into models/ directory.

Usage:
    python train_model.py
"""

import os
import re
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression, PassiveAggressiveClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report
import joblib

def clean_text(text: str) -> str:
    """Preprocess article text for TF-IDF vectorization."""
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r"https?://\S+|www\.\S+", "", text)
    text = re.sub(r"<.*?>", "", text)
    text = re.sub(r"[^a-zA-Z\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def train():
    dataset_path = os.path.join(os.path.dirname(__file__), "dataset", "news.csv")
    models_dir = os.path.join(os.path.dirname(__file__), "models")
    os.makedirs(models_dir, exist_ok=True)

    print("=" * 60)
    print("AI-BASED FAKE NEWS DETECTION MODEL TRAINING")
    print("=" * 60)

    if not os.path.exists(dataset_path):
        print(f"Dataset not found at {dataset_path}!")
        return

    # Load dataset
    print(f"[*] Loading dataset from {dataset_path}...")
    df = pd.read_csv(dataset_path)
    print(f"[*] Total records: {len(df)}")
    print(df["label"].value_counts())

    # Preprocessing
    print("[*] Preprocessing news text...")
    df["clean_content"] = (df["title"].fillna("") + " " + df["text"].fillna("")).apply(clean_text)

    X = df["clean_content"]
    y = df["label"].map({"REAL": 0, "FAKE": 1})

    # Train-test split
    # Note: with smaller demo dataset, test_size is proportional
    test_size = 0.25 if len(df) >= 20 else 0.2
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=42, stratify=y if len(df) >= 10 else None
    )

    print(f"[*] Training samples: {len(X_train)}, Testing samples: {len(X_test)}")

    # TF-IDF Vectorization
    print("[*] Vectorizing with TF-IDF (1-gram and 2-gram)...")
    tfidf = TfidfVectorizer(max_features=5000, ngram_range=(1, 2), stop_words="english")
    X_train_tfidf = tfidf.fit_transform(X_train)
    X_test_tfidf = tfidf.transform(X_test)

    # Train Classifier
    print("[*] Training Logistic Regression classifier...")
    model = LogisticRegression(C=1.0, max_iter=1000, random_state=42)
    model.fit(X_train_tfidf, y_train)

    # Evaluation
    y_pred = model.predict(X_test_tfidf)
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, zero_division=0)
    rec = recall_score(y_test, y_pred, zero_division=0)
    f1 = f1_score(y_test, y_pred, zero_division=0)
    cm = confusion_matrix(y_test, y_pred)

    print("\n" + "=" * 60)
    print("MODEL EVALUATION METRICS:")
    print("=" * 60)
    print(f"Accuracy  : {acc * 100:.2f}%")
    print(f"Precision : {prec * 100:.2f}%")
    print(f"Recall    : {rec * 100:.2f}%")
    print(f"F1-Score  : {f1 * 100:.2f}%")
    print("\nConfusion Matrix:")
    print(f"[[TN (Real as Real): {cm[0][0] if len(cm)>0 else 0}, FP (Real as Fake): {cm[0][1] if len(cm)>0 and len(cm[0])>1 else 0}]")
    print(f" [FN (Fake as Real): {cm[1][0] if len(cm)>1 else 0}, TP (Fake as Fake): {cm[1][1] if len(cm)>1 and len(cm[1])>1 else 0}]]")

    # Feature Importance
    feature_names = np.array(tfidf.get_feature_names_out())
    coefs = model.coef_[0]
    top_fake_idx = np.argsort(coefs)[-10:]
    top_real_idx = np.argsort(coefs)[:10]

    print("\nTop 10 Words Indicating FAKE News:")
    print(", ".join(feature_names[top_fake_idx]))

    print("\nTop 10 Words Indicating REAL News:")
    print(", ".join(feature_names[top_real_idx]))

    # Save artifacts
    model_save_path = os.path.join(models_dir, "fake_news_model.pkl")
    vectorizer_save_path = os.path.join(models_dir, "tfidf_vectorizer.pkl")

    joblib.dump(model, model_save_path)
    joblib.dump(tfidf, vectorizer_save_path)
    print(f"\n[✓] Saved trained model to {model_save_path}")
    print(f"[✓] Saved vectorizer to {vectorizer_save_path}")
    print("=" * 60)

if __name__ == "__main__":
    train()
