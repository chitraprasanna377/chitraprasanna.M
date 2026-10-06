"""
summarizer.py
-------------
Text Summarization and Keyword Extraction Module.
Uses Extractive Frequency Scoring (Luhn's algorithm / TF-IDF style sentence weighting)
to extract key sentences and salient topical keywords.
"""

import re
from collections import Counter
import math

STOPWORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
    "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
    "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't",
    "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have",
    "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him",
    "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't",
    "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor",
    "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out",
    "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some",
    "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there",
    "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to",
    "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were",
    "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's",
    "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're",
    "you've", "your", "yours", "yourself", "yourselves", "also", "just", "said", "will"
}

def extract_keywords(text: str, top_k: int = 7) -> list:
    """Extract top keywords based on term frequency excluding stop words."""
    words = re.findall(r"\b[a-zA-Z]{3,}\b", text.lower())
    filtered = [w for w in words if w not in STOPWORDS]
    counts = Counter(filtered)
    return [word for word, _ in counts.most_common(top_k)]

def split_sentences(text: str) -> list:
    """Split text into sentences cleanly."""
    sentences = re.split(r"(?<=[.!?])\s+", text.strip())
    return [s.strip() for s in sentences if len(s.strip()) > 15]

def summarize_text(text: str, max_sentences: int = 3) -> str:
    """
    Extractive text summarization based on word frequency ranking.
    Selects top sentences that contain the highest concentration of key informative terms.
    """
    if not text or not text.strip():
        return "No text available to summarize."

    sentences = split_sentences(text)
    if len(sentences) <= max_sentences:
        return " ".join(sentences)

    words = re.findall(r"\b[a-zA-Z]{3,}\b", text.lower())
    filtered_words = [w for w in words if w not in STOPWORDS]
    word_freq = Counter(filtered_words)

    if not word_freq:
        return " ".join(sentences[:max_sentences])

    max_freq = max(word_freq.values())
    for w in word_freq:
        word_freq[w] = word_freq[w] / max_freq

    sentence_scores = {}
    for i, sent in enumerate(sentences):
        sent_words = re.findall(r"\b[a-zA-Z]{3,}\b", sent.lower())
        score = sum(word_freq.get(w, 0) for w in sent_words)
        # normalize by sentence length to avoid bias towards long run-ons
        sentence_scores[i] = score / (len(sent_words) + 5)

    # Rank and select top sentence indices in chronological order
    top_indices = sorted(sorted(sentence_scores.keys(), key=lambda i: sentence_scores[i], reverse=True)[:max_sentences])
    summary = " ".join([sentences[i] for i in top_indices])
    return summary

if __name__ == "__main__":
    sample = ("The Federal Reserve concluded its two-day monetary policy meeting today, announcing that benchmark interest rates will remain unchanged. "
              "Fed Chair Jerome Powell stated during the press briefing that economic growth remains resilient. "
              "Economists surveyed noted that future rate adjustments will depend on upcoming labor market statistics and inflation reports.")
    print("Summary:", summarize_text(sample))
    print("Keywords:", extract_keywords(sample))
