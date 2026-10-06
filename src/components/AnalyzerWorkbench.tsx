import React, { useState } from 'react';
import { SAMPLE_ARTICLES, SampleArticle } from '../data/samples';
import { AnalysisResponse } from '../types';
import { ResultDashboard } from './ResultDashboard';
import {
  FileText,
  Link2,
  Sparkles,
  Trash2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Info,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';

interface AnalyzerWorkbenchProps {
  onAnalysisSuccess: (data: AnalysisResponse) => void;
}

export const AnalyzerWorkbench: React.FC<AnalyzerWorkbenchProps> = ({ onAnalysisSuccess }) => {
  const [inputMode, setInputMode] = useState<'text' | 'url'>('text');
  const [newsText, setNewsText] = useState('');
  const [newsUrl, setNewsUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);

  // Compute live stats
  const wordCount = newsText.trim() ? newsText.trim().split(/\s+/).length : 0;
  const charCount = newsText.length;

  const handleClear = () => {
    setNewsText('');
    setNewsUrl('');
    setError(null);
    setRecommendation(null);
    setAnalysisResult(null);
  };

  const handleLoadSample = (sample: SampleArticle) => {
    setInputMode('text');
    setNewsText(sample.text);
    setError(null);
    setRecommendation(null);
    setAnalysisResult(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setRecommendation(null);

    if (inputMode === 'text') {
      if (!newsText.trim()) {
        setError('Please paste or type the news article text into the input field.');
        return;
      }
      if (newsText.trim().length < 30) {
        setError('Article text is too short. Please provide at least 30 characters for reliable NLP analysis.');
        return;
      }
    } else {
      if (!newsUrl.trim()) {
        setError('Please enter a valid news article URL (e.g., https://example.com/article).');
        return;
      }
      try {
        const parsed = new URL(newsUrl.trim());
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          setError('URL must start with http:// or https://');
          return;
        }
      } catch {
        setError('The entered URL format is invalid. Please check for typos.');
        return;
      }
    }

    setLoading(true);

    try {
      const payload = inputMode === 'text' ? { text: newsText.trim() } : { url: newsUrl.trim() };

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to complete analysis.');
        if (data.recommendation) setRecommendation(data.recommendation);
        setLoading(false);
        return;
      }

      setAnalysisResult(data);
      onAnalysisSuccess(data);

      // Scroll smoothly to results
      setTimeout(() => {
        const el = document.getElementById('analysis-results-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError('Network communication failed: ' + (err.message || 'Server did not respond.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multimodal NLP Pipeline • Real-time Linguistic Feature Analysis</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          AI-Based Fake News Detection &amp; News Sentiment Analysis System
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Evaluate the credibility, rhetoric, and emotional polarity of any digital news piece. 
          Combines TF-IDF n-gram vectorization, machine learning classification, and extractive text summarization.
        </p>
      </div>

      {/* Main Analysis Input Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Method Toggle Tabs */}
        <div className="border-b border-slate-200 bg-slate-50/70 p-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setInputMode('text');
                setError(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                inputMode === 'text'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>A. Paste News Article</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setInputMode('url');
                setError(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                inputMode === 'url'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Link2 className="w-4 h-4" />
              <span>B. Enter News URL</span>
            </button>
          </div>

          {/* Quick Clear */}
          {(newsText || newsUrl) && (
            <button
              onClick={handleClear}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Inputs</span>
            </button>
          )}
        </div>

        {/* Input Form Body */}
        <div className="p-6">
          {inputMode === 'text' ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                <label htmlFor="article-text-area" className="font-semibold text-slate-700">
                  Full Article Headline &amp; Body:
                </label>
                <div className="space-x-3">
                  <span>{wordCount} words</span>
                  <span>{charCount} characters</span>
                </div>
              </div>

              <textarea
                id="article-text-area"
                rows={7}
                value={newsText}
                onChange={(e) => setNewsText(e.target.value)}
                placeholder="Paste the news story, press release, or social media claim here for deep linguistic & credibility assessment..."
                className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-800 text-sm leading-relaxed font-sans placeholder:text-slate-400"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <label htmlFor="article-url-input" className="block text-xs font-semibold text-slate-700">
                News Web Article Link:
              </label>
              <div className="relative">
                <input
                  id="article-url-input"
                  type="url"
                  value={newsUrl}
                  onChange={(e) => setNewsUrl(e.target.value)}
                  placeholder="https://www.reuters.com/world/article-headline..."
                  className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-800 text-sm placeholder:text-slate-400"
                />
                <Link2 className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>The backend will safely extract article paragraphs while stripping scripts and navigation bars.</span>
              </p>
            </div>
          )}

          {/* Preset Sample Buttons */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Load College Project Test Presets:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {SAMPLE_ARTICLES.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleLoadSample(sample)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium border transition-colors ${
                      sample.category === 'Real'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        : sample.category === 'Fake'
                        ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                        : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error & Warning Alert Banner */}
          {error && (
            <div className="mt-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-900">{error}</p>
                {recommendation && (
                  <p className="text-xs text-rose-700 mt-1">{recommendation}</p>
                )}
              </div>
            </div>
          )}

          {/* Action Button Row */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => handleSubmit()}
              disabled={loading}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 disabled:opacity-60 transition-all text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing NLP &amp; AI Analysis...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze News</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
            >
              <Trash2 className="w-4 h-4 text-slate-500" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results Display Anchor */}
      {analysisResult && (
        <div id="analysis-results-section" className="pt-4">
          <ResultDashboard data={analysisResult} onAnalyzeAnother={handleClear} />
        </div>
      )}
    </div>
  );
};
