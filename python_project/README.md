# AI-Based Fake News Detection and News Sentiment Analysis System
**College MCA / BCA Final Year Computer Science Project**

---

## 📌 Project Overview
The **AI-Based Fake News Detection & News Sentiment Analysis System** is an end-to-end Natural Language Processing (NLP) and Machine Learning application designed to assess the authenticity and emotional polarity of digital news articles. It allows users to submit either a live web URL or paste full article text, producing a comprehensive analysis dashboard.

### Key Objectives
1. **Credibility Classification**: Predict whether a news item is `REAL`, `FAKE`, or `UNCERTAIN` with a calculated confidence percentage.
2. **Sentiment Analysis**: Determine if the narrative tone is `Positive`, `Negative`, or `Neutral`, evaluating emotional charge and subjectivity.
3. **Article Summarization**: Extract key arguments into an accessible 3-sentence summary using frequency-weighted extractive NLP.
4. **Keyword Extraction**: Identify salient topical entities without relying on black-box external services.
5. **Responsible AI Guardrails**: Display explicit verification warnings recommending cross-checking with independent fact-checking bodies (PolitiFact, Snopes, Reuters Fact Check).

---

## 🛠️ System Architecture

```text
[News URL / Article Text]
          │
          ▼
┌─────────────────────────┐
│ 1. Web Extraction (URL) │ (Requests + BeautifulSoup4)
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ 2. Text Preprocessing   │ (Lowercase, Regex clean, Stopword filter)
└───────────┬─────────────┘
            │
      ┌─────┴───────────────────────────┐
      ▼                                 ▼
┌───────────────────────┐   ┌────────────────────────┐
│ 3. Feature Extraction │   │ 4. Sentiment Analysis  │
│  TF-IDF Vectorizer    │   │  Polarity & Emotion    │
│  (Unigrams + Bigrams) │   │  Lexicon Scorer        │
└───────────┬───────────┘   └───────────┬────────────┘
            │                           │
            ▼                           │
┌───────────────────────┐               │
│ 5. Fake News ML Model │               │
│  Logistic Regression  │               │
│  / PassiveAggressive  │               │
└───────────┬───────────┘               │
            │                           │
            ▼                           ▼
┌────────────────────────────────────────────────────┐
│ 6. Extractive Summarizer & Topic Keyword Extractor │
└─────────────────────────┬──────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────┐
│ 7. JSON API Response / Responsive Web Dashboard    │
│  - Classification Badge & Confidence Gauge         │
│  - Sentiment Polar Meter                           │
│  - Concise 3-Sentence Summary                      │
│  - Transparent Factor Explanation                  │
│  - Verification Warning & Fact-Checking Links      │
└────────────────────────────────────────────────────┘
```

---

## 💻 Visual Studio Code Setup Guide

### Step 1: Open Project in VS Code
Open VS Code, press `File > Open Folder...`, and select the `python_project` directory.

### Step 2: Create a Python Virtual Environment
Open the VS Code Terminal (`Ctrl + ~` or ``Cmd + ~``):
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Required Libraries
```bash
pip install -r requirements.txt
```

### Step 4: Train the Fake News ML Model
```bash
python train_model.py
```
*Expected Output:*
- Computes Accuracy, Precision, Recall, and F1-score.
- Displays Confusion Matrix.
- Saves `models/fake_news_model.pkl` and `models/tfidf_vectorizer.pkl`.

### Step 5: Run the Flask Web Application
```bash
python app.py
```
The server will start at `http://127.0.0.1:5000/`.

---

## 🧪 Testing the API with cURL or Postman

### Sample Request (Text Analysis):
```bash
curl -X POST http://127.0.0.1:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "NASA announced today that the Artemis lunar mission completed critical cryogenic fuel rehearsal tests at Kennedy Space Center with nominal telemetry readings."}'
```

### Sample Response:
```json
{
  "classification": "Real News",
  "confidence": 89.2,
  "sentiment": "Positive",
  "sentiment_confidence": 76.5,
  "polarity_score": 0.42,
  "summary": "NASA announced today that the Artemis lunar mission completed critical cryogenic fuel rehearsal tests...",
  "keywords": ["artemis", "mission", "nasa", "cryogenic", "kennedy"],
  "explanation": "Article demonstrates balanced, formal journalistic vocabulary with authoritative citation terms.",
  "verification_message": "AI-generated analysis should not be treated as proof that a news article is true or false. Verify important information using multiple trusted and independent sources."
}
```

---

## 🎓 College Viva-Voce Questions & Answers

### 1. Why use TF-IDF instead of simple Bag of Words (CountVectorizer)?
**Answer:** Bag of Words only counts word occurrences, which unfairly weights common terms (like *said*, *news*). TF-IDF (Term Frequency-Inverse Document Frequency) penalizes words that appear across all documents while highlighting distinctive terms unique to specific articles.

### 2. What is the difference between Precision and Recall in Fake News Detection?
**Answer:** 
- **Precision** measures: Of all articles the model flagged as Fake, how many were actually Fake? (Prevents legitimate news from being falsely marked as fake).
- **Recall** measures: Of all actual Fake articles, how many did the model catch? (Prevents dangerous disinformation from slipping through).

### 3. Why is Sentiment Analysis paired with Fake News Detection?
**Answer:** Disinformation campaigns frequently use emotionally charged, fear-inducing, or sensational language (high subjectivity and extreme polarity) to trigger emotional sharing rather than rational scrutiny.

### 4. What are the limitations of this system?
**Answer:** The model relies on linguistic patterns and lexical signals. It cannot verify external facts in real-time without external knowledge retrieval (RAG) or ground-truth journalistic fact-checking databases. Hence, the system presents predictions rather than absolute truth.

---

## 🔮 Future Enhancements
1. **Multimodal Analysis**: Integrating Computer Vision models (e.g. CLIP / ViT) to detect manipulated images and deepfake thumbnails.
2. **Retrieval-Augmented Generation (RAG)**: Cross-referencing claims against live Google Fact Check and Wikipedia APIs.
3. **Multilingual NLP**: Supporting regional languages using multilingual BERT (mBERT) or IndicBERT.
4. **Blockchain Integrity**: Storing cryptographically signed article hashes on an immutable distributed ledger.
