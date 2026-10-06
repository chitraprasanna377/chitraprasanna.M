"""
sentiment.py
------------
NLP Sentiment Analysis Module for News Articles.
Analyzes emotional tone, polarity score (-1.0 to +1.0), subjectivity, and confidence.
Suitable for BCA/MCA Natural Language Processing projects.
"""

import re
import math

# Lexicon of positive, negative, and sensational sentiment indicators
POSITIVE_LEXICON = {
    "breakthrough", "success", "successful", "progress", "advance", "growth",
    "improvement", "effective", "promising", "gain", "beneficial", "milestone",
    "recovery", "optimistic", "achieve", "solution", "innovative", "support",
    "cooperation", "resilient", "historic", "peace", "agreement", "healing",
    "pioneering", "record", "victory", "stable", "honor", "thriving"
}

NEGATIVE_LEXICON = {
    "crisis", "scandal", "panic", "collapse", "disaster", "fatal", "failure",
    "threat", "danger", "fraud", "corrupt", "investigation", "decline", "loss",
    "conflict", "violent", "attack", "death", "epidemic", "protest", "lawsuit",
    "allegation", "crash", "recession", "devastation", "hazard", "warning", "ban"
}

SENSATIONAL_LEXICON = {
    "shocking", "unbelievable", "secret", "miracle", "banned", "conspiracy",
    "elites", "insane", "bombshell", "wake up", "censored", "they don't want you to know",
    "hidden truth", "exposed", "terrifying", "mind-blowing", "viral"
}

def clean_for_sentiment(text: str) -> list:
    """Preprocess text: lowercasing, non-alpha removal, tokenization."""
    cleaned = re.sub(r"[^\w\s]", " ", text.lower())
    return [w for w in cleaned.split() if len(w) > 2]

def analyze_sentiment(text: str) -> dict:
    """
    Computes sentiment polarity, classification, confidence, and subjectivity.
    
    Returns:
    {
        "sentiment": "Positive" | "Negative" | "Neutral",
        "polarity_score": float (-1.0 to 1.0),
        "sentiment_confidence": float (percentage),
        "subjectivity": float (0.0 to 1.0),
        "sensationalism_score": float (0.0 to 1.0)
    }
    """
    if not text or not text.strip():
        return {
            "sentiment": "Neutral",
            "polarity_score": 0.0,
            "sentiment_confidence": 50.0,
            "subjectivity": 0.0,
            "sensationalism_score": 0.0
        }

    tokens = clean_for_sentiment(text)
    total_tokens = max(len(tokens), 1)

    pos_count = sum(1 for w in tokens if w in POSITIVE_LEXICON)
    neg_count = sum(1 for w in tokens if w in NEGATIVE_LEXICON)
    sensational_count = sum(1 for w in tokens if w in SENSATIONAL_LEXICON)

    # Polarity calculation: normalized between -1.0 and 1.0
    denom = pos_count + neg_count + 2
    raw_polarity = (pos_count - neg_count) / denom
    polarity = max(-1.0, min(1.0, raw_polarity * 2.5))

    # Subjectivity: ratio of emotional tokens to total tokens
    subjectivity = min(1.0, ((pos_count + neg_count + sensational_count * 2) / total_tokens) * 8.0)
    sensationalism = min(1.0, (sensational_count / (total_tokens / 15 + 1)))

    # Classification threshold
    if polarity > 0.15:
        sentiment = "Positive"
        confidence = 60.0 + min(35.0, abs(polarity) * 40.0)
    elif polarity < -0.15:
        sentiment = "Negative"
        confidence = 60.0 + min(35.0, abs(polarity) * 40.0)
    else:
        sentiment = "Neutral"
        confidence = 70.0 + (1.0 - abs(polarity) / 0.15) * 20.0

    return {
        "sentiment": sentiment,
        "polarity_score": round(polarity, 3),
        "sentiment_confidence": round(confidence, 1),
        "subjectivity": round(subjectivity, 2),
        "sensationalism_score": round(sensationalism, 2),
        "positive_cues": pos_count,
        "negative_cues": neg_count
    }

if __name__ == "__main__":
    sample = "NASA engineers celebrated a historic milestone with breakthrough propulsion success."
    print("Test Sample:", analyze_sentiment(sample))
