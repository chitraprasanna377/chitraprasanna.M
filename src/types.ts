export interface AnalysisResponse {
  classification: 'Real News' | 'Fake News' | 'Uncertain';
  confidence: number;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  sentiment_confidence: number;
  polarity_score: number;
  summary: string;
  keywords: string[];
  explanation: string;
  signals?: {
    sensational_score: number;
    formality_score: number;
    quotation_density: number;
    emotional_urgency: 'Low' | 'Moderate' | 'High';
  };
  source_info: {
    url: string | null;
    domain: string;
    title: string;
    word_count: number;
    character_count: number;
  };
  verification_message: string;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  title: string;
  snippet: string;
  domain: string;
  classification: 'Real News' | 'Fake News' | 'Uncertain';
  confidence: number;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  sentiment_confidence: number;
  summary: string;
  keywords: string[];
  explanation: string;
}

export interface ModelMetrics {
  project: string;
  version: string;
  model_architecture: string;
  dataset: string;
  train_test_split: string;
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
  };
  confusion_matrix: {
    true_positive_fake: number;
    false_positive_fake: number;
    true_negative_real: number;
    false_negative_real: number;
  };
  top_fake_indicators: Array<{ word: string; weight: number }>;
  top_real_indicators: Array<{ word: string; weight: number }>;
}
