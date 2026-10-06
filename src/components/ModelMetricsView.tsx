import React from 'react';
import {
  CheckCircle2,
  TrendingUp,
  Cpu,
  BarChart3,
  Layers,
  Database,
  Award,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const ModelMetricsView: React.FC = () => {
  const metrics = {
    accuracy: 93.4,
    precision: 92.8,
    recall: 94.1,
    f1_score: 93.4
  };

  const confusionMatrix = {
    tp: 1176, // Fake classified as Fake
    fp: 91,   // Real classified as Fake
    fn: 74,   // Fake classified as Real
    tn: 1159  // Real classified as Real
  };

  const topFakeIndicators = [
    { word: 'shocking', score: 4.82 },
    { word: 'miracle cure', score: 4.31 },
    { word: "they don't want", score: 3.95 },
    { word: 'secret leaked', score: 3.84 },
    { word: 'banned video', score: 3.72 },
    { word: 'urgent share', score: 3.49 },
    { word: 'big pharma', score: 3.28 },
    { word: 'mind blowing', score: 3.15 }
  ];

  const topRealIndicators = [
    { word: 'reuters', score: 4.67 },
    { word: 'spokesperson said', score: 4.25 },
    { word: 'official statement', score: 3.98 },
    { word: 'according to the', score: 3.81 },
    { word: 'press conference', score: 3.55 },
    { word: 'published study', score: 3.42 },
    { word: 'department of', score: 3.29 },
    { word: 'clinical trial', score: 3.12 }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" />
            <span>Machine Learning Performance Evaluation</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            TfidfVectorizer + Logistic Regression Benchmark
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Trained and cross-validated on balanced news corpora with 80/20 stratified split.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-100 text-blue-800 text-xs font-semibold">
          <Database className="w-4 h-4 text-blue-600" />
          <span>N-gram Range: (1, 2) • 5,000 Features</span>
        </div>
      </div>

      {/* 4 Core Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Accuracy */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Accuracy
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{metrics.accuracy}%</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Overall percentage of correctly classified Real and Fake articles.
          </p>
        </div>

        {/* Precision */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Precision
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">{metrics.precision}%</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Ratio of true fake detections to all flagged fake predictions (low false alarms).
          </p>
        </div>

        {/* Recall */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Recall
            </span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-indigo-600">{metrics.recall}%</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Percentage of all actual fake news articles caught by the classifier.
          </p>
        </div>

        {/* F1-Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-purple-300 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              F1-Score
            </span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-purple-600">{metrics.f1_score}%</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Harmonic mean balancing precision and recall across test sets.
          </p>
        </div>
      </div>

      {/* Grid: Confusion Matrix & Model Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confusion Matrix Interactive Diagram */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Confusion Matrix (2,500 Test Samples)
            </h3>
            <span className="text-xs text-slate-500">Stratified Test Split</span>
          </div>

          <p className="text-xs text-slate-600 mb-4">
            Shows the exact distribution between Ground Truth labels and AI Predicted labels:
          </p>

          <div className="overflow-x-auto">
            <div className="min-w-[320px] grid grid-cols-3 gap-2 text-center text-xs">
              {/* Header Row */}
              <div className="p-2 font-bold text-slate-400"></div>
              <div className="p-2 font-bold bg-slate-100 rounded-lg text-slate-700">Predicted REAL</div>
              <div className="p-2 font-bold bg-slate-100 rounded-lg text-slate-700">Predicted FAKE</div>

              {/* Row 1: Actual Real */}
              <div className="p-2 font-bold bg-slate-100 rounded-lg text-slate-700 flex items-center justify-center">
                Actual REAL
              </div>
              <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-xl">
                <span className="block text-2xl font-black text-emerald-700">{confusionMatrix.tn}</span>
                <span className="text-[11px] font-semibold text-emerald-800">True Negative (TN)</span>
                <span className="text-[10px] text-slate-500 block">Real correctly verified</span>
              </div>
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                <span className="block text-2xl font-black text-rose-600">{confusionMatrix.fp}</span>
                <span className="text-[11px] font-semibold text-rose-800">False Positive (FP)</span>
                <span className="text-[10px] text-slate-500 block">Type I Error</span>
              </div>

              {/* Row 2: Actual Fake */}
              <div className="p-2 font-bold bg-slate-100 rounded-lg text-slate-700 flex items-center justify-center">
                Actual FAKE
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <span className="block text-2xl font-black text-amber-600">{confusionMatrix.fn}</span>
                <span className="text-[11px] font-semibold text-amber-800">False Negative (FN)</span>
                <span className="text-[10px] text-slate-500 block">Type II Error (Missed)</span>
              </div>
              <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-xl">
                <span className="block text-2xl font-black text-emerald-700">{confusionMatrix.tp}</span>
                <span className="text-[11px] font-semibold text-emerald-800">True Positive (TP)</span>
                <span className="text-[10px] text-slate-500 block">Fake correctly caught</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Total Test Samples: <strong>2,500</strong></span>
            <span>Total Correct: <strong className="text-emerald-700">2,335 (93.4%)</strong></span>
          </div>
        </div>

        {/* Feature Weights (Top Real vs Top Fake Indicators) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-600" />
                TF-IDF Feature Weights (Coefficients)
              </h3>
              <span className="text-xs text-slate-400">Logistic Regression Coefs</span>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Phrases carrying the strongest mathematical weights learned during model training:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Fake Indicators */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wide block">
                  Top FAKE Cues (+Coef)
                </span>
                <div className="space-y-1.5">
                  {topFakeIndicators.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-rose-50/60 border border-rose-100 text-xs"
                    >
                      <span className="font-semibold text-slate-800">"{item.word}"</span>
                      <span className="font-mono text-rose-700 font-bold">+{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real Indicators */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide block">
                  Top REAL Cues (-Coef)
                </span>
                <div className="space-y-1.5">
                  {topRealIndicators.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs"
                    >
                      <span className="font-semibold text-slate-800">"{item.word}"</span>
                      <span className="font-mono text-emerald-700 font-bold">-{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            *Sublinear TF scaling applied: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono">1 + log(tf)</code> to avoid bias from repetition.
          </div>
        </div>
      </div>
    </div>
  );
};
