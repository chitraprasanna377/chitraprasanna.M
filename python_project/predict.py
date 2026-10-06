"""
predict.py
----------
Inference module for Fake News Classification.
Loads trained scikit-learn model and TF-IDF vectorizer.
Includes fallback NLP heuristic classification if model is not yet trained.
"""

import os
import re
import joblib

MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "fake_news_model.pkl")
VECTORIZER_PATH = os.path.join(os.path.dirname(__file__), "models", "tfidf_vectorizer.pkl")

# Loaded in memory lazily
_model = None
_vectorizer = None

def load_artifacts():
    global _model, _vectorizer
    if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
        try:
            _model = joblib.load(MODEL_PATH)
            _vectorizer = joblib.load(VECTORIZER_PATH)
            return True
        except Exception as e:
            print(f"[!] Warning: Failed to load pkl files: {e}")
            return False
    return False

def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"https?://\S+|www\.\S+", "", text)
    text = re.sub(r"<.*?>", "", text)
    text = re.sub(r"[^a-zA-Z\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def heuristic_predict(text: str) -> dict:
    """
    Robust rule-based and linguistic scoring fallback.
    Analyzes sensational words, clickbait punctuation, quote citations, and attribution phrases.
    """
    clean = text.lower()
    sensational_words = [
        "shocking", "miracle", "secret", "banned", "conspiracy", "they don't want you to know",
        "wake up", "leaked", "censored", "elites", "instant wealth", "alien", "glitch",
        "cure all", "unbelievable", "big pharma", "mind-blowing", "urgent share", "100% proof"
    ]
    credible_words = [
        "spokesperson", "announced", "statement", "reuters", "associated press", "university",
        "researchers", "published", "according to", "official", "confirmed", "clinical trial",
        "press briefing", "federal", "committee", "peer-reviewed", "investigation", "telemetry"
    ]

    s_matches = [w for w in sensational_words if w in clean]
    c_matches = [w for w in credible_words if w in clean]

    # Check for excessive exclamation marks or all-caps
    caps_count = sum(1 for c in text if c.isupper())
    caps_ratio = caps_count / max(len(text), 1)
    excl_count = text.count("!")

    fake_score = len(s_matches) * 18 + (excl_count * 5) + (20 if caps_ratio > 0.15 else 0)
    real_score = len(c_matches) * 16

    total = fake_score + real_score
    if total == 0:
        return {
            "classification": "Uncertain",
            "confidence": 55.0,
            "explanation": "Insufficient distinctive lexical patterns detected in the provided text. Recommend manual verification with reputable journalistic news outlets.",
            "linguistic_signals": {
                "sensational_cues": s_matches,
                "credible_cues": c_matches,
                "exclamation_points": excl_count
            }
        }

    prob_fake = fake_score / (total + 10)

    if prob_fake >= 0.58:
        classification = "Fake News"
        confidence = round(min(96.0, 60.0 + prob_fake * 35.0), 1)
        explanation = f"Detected high concentration of sensational/clickbait cues ({', '.join(s_matches[:4])}) with lack of verifiable journalistic attributions."
    elif prob_fake <= 0.35:
        classification = "Real News"
        confidence = round(min(95.0, 60.0 + (1.0 - prob_fake) * 35.0), 1)
        explanation = f"Article demonstrates balanced, formal journalistic vocabulary with authoritative citation terms ({', '.join(c_matches[:4])})."
    else:
        classification = "Uncertain"
        confidence = round(52.0 + abs(0.5 - prob_fake) * 20.0, 1)
        explanation = "Mixed signals detected. The text contains both informal and conventional phrases; further independent cross-referencing is recommended."

    return {
        "classification": classification,
        "confidence": confidence,
        "explanation": explanation,
        "linguistic_signals": {
            "sensational_cues": s_matches,
            "credible_cues": c_matches,
            "exclamation_points": excl_count
        }
    }

def predict_news(text: str) -> dict:
    """Predict whether an article is Real News or Fake News."""
    if not text or len(text.strip()) < 20:
        return {
            "classification": "Uncertain",
            "confidence": 50.0,
            "explanation": "The text provided is too short for reliable machine learning classification."
        }

    has_model = load_artifacts()

    if has_model and _model is not None and _vectorizer is not None:
        try:
            cleaned = clean_text(text)
            vec = _vectorizer.transform([cleaned])
            probs = _model.predict_proba(vec)[0]  # [prob_real, prob_fake]
            prob_real = probs[0]
            prob_fake = probs[1]

            if prob_fake > 0.65:
                classification = "Fake News"
                confidence = round(prob_fake * 100, 1)
                explanation = "Trained TF-IDF Logistic Regression model detected lexical n-gram patterns predominantly aligned with known misleading or clickbait reports."
            elif prob_real > 0.65:
                classification = "Real News"
                confidence = round(prob_real * 100, 1)
                explanation = "Trained TF-IDF Logistic Regression model identified formal journalistic syntax and institutional attribution terms matching real news corpora."
            else:
                classification = "Uncertain"
                confidence = round(max(prob_real, prob_fake) * 100, 1)
                explanation = "Prediction probabilities are near boundary (45-55%), indicating ambiguous journalistic structure. Caution advised."

            return {
                "classification": classification,
                "confidence": confidence,
                "prob_real": round(float(prob_real) * 100, 1),
                "prob_fake": round(float(prob_fake) * 100, 1),
                "explanation": explanation,
                "model_used": "Scikit-Learn TF-IDF LogisticRegression"
            }
        except Exception as e:
            print(f"[!] Model predict error: {e}, falling back to heuristic")

    # Fallback to heuristic rule engine
    res = heuristic_predict(text)
    res["model_used"] = "NLP Linguistic Pattern Matcher"
    return res

if __name__ == "__main__":
    test_sample = "NASA announced successful lunar spacecraft landing with full telemetry confirmation."
    print("Test Sample Prediction:", predict_news(test_sample))
