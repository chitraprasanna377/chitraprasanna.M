import React, { useState } from 'react';
import { AnalysisResponse } from '../types';
import {
  ShieldAlert,
  ShieldCheck,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  FileText,
  Tag,
  AlertTriangle,
  Globe,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Printer,
  Sparkles,
  Search,
  Scale
} from 'lucide-react';

interface ResultDashboardProps {
  data: AnalysisResponse;
  onAnalyzeAnother: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ data, onAnalyzeAnother }) => {
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(data.summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Color styling based on classification
  const getClassificationStyles = () => {
    switch (data.classification) {
      case 'Real News':
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
          badge: 'bg-emerald-600 text-white',
          gaugeBg: 'bg-emerald-100',
          gaugeFill: 'bg-emerald-600',
          icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
          pill: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          subtext: 'High alignment with verified journalistic reporting criteria.'
        };
      case 'Fake News':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-900',
          badge: 'bg-rose-600 text-white',
          gaugeBg: 'bg-rose-100',
          gaugeFill: 'bg-rose-600',
          icon: <ShieldAlert className="w-8 h-8 text-rose-600" />,
          pill: 'bg-rose-100 text-rose-800 border-rose-300',
          subtext: 'Detected prominent deceptive signals, clickbait, or unverified claims.'
        };
      default:
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-900',
          badge: 'bg-amber-600 text-white',
          gaugeBg: 'bg-amber-100',
          gaugeFill: 'bg-amber-600',
          icon: <HelpCircle className="w-8 h-8 text-amber-600" />,
          pill: 'bg-amber-100 text-amber-800 border-amber-300',
          subtext: 'Inconclusive signals. Text contains ambiguous or mixed patterns.'
        };
    }
  };

  // Sentiment styling
  const getSentimentStyles = () => {
    switch (data.sentiment) {
      case 'Positive':
        return {
          badge: 'bg-teal-600 text-white',
          icon: <TrendingUp className="w-5 h-5 text-teal-600" />,
          pill: 'bg-teal-100 text-teal-800 border-teal-200',
          barColor: 'bg-teal-500'
        };
      case 'Negative':
        return {
          badge: 'bg-orange-600 text-white',
          icon: <TrendingDown className="w-5 h-5 text-orange-600" />,
          pill: 'bg-orange-100 text-orange-800 border-orange-200',
          barColor: 'bg-orange-500'
        };
      default:
        return {
          badge: 'bg-slate-600 text-white',
          icon: <Minus className="w-5 h-5 text-slate-600" />,
          pill: 'bg-slate-100 text-slate-800 border-slate-200',
          barColor: 'bg-slate-500'
        };
    }
  };

  const clfStyles = getClassificationStyles();
  const sentStyles = getSentimentStyles();

  // Search query builder for manual verification
  const firstKeyword = data.keywords[0] || 'news claim';
  const queryParam = encodeURIComponent(firstKeyword + ' fact check');

  return (
    <div className="space-y-6 animate-fadeIn print:space-y-4">
      {/* Top Banner with Action Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Analysis Report Generated
          </span>
          <h2 className="text-lg font-bold text-slate-900 line-clamp-1">
            {data.source_info.title || 'News Credibility & Sentiment Assessment'}
          </h2>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto flex-wrap">
          <button
            onClick={handleCopyJson}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
            title="Copy Raw JSON"
          >
            {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedJson ? 'Copied' : 'JSON'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>

          <button
            onClick={onAnalyzeAnother}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
          >
            <span>Analyze Another</span>
          </button>
        </div>
      </div>

      {/* Grid: 1. NEWS CLASSIFICATION & 2. SENTIMENT ANALYSIS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. NEWS CLASSIFICATION CARD */}
        <div className={`p-6 rounded-2xl border ${clfStyles.bg} relative overflow-hidden shadow-sm`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5" />
                1. News Classification
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
                {data.classification}
              </h3>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
              {clfStyles.icon}
            </div>
          </div>

          <p className="text-xs text-slate-600 mb-5">{clfStyles.subtext}</p>

          {/* Confidence Gauge */}
          <div className="space-y-2 bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-white">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-700">Model Confidence</span>
              <span className="text-slate-900 font-bold text-base">{data.confidence.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              <div
                className={`h-full ${clfStyles.gaugeFill} transition-all duration-1000 ease-out`}
                style={{ width: `${Math.min(100, Math.max(10, data.confidence))}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Uncertain (50%)</span>
              <span>Moderate (75%)</span>
              <span>High (95%+)</span>
            </div>
          </div>

          {data.signals && (
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <div className="bg-white/70 p-2.5 rounded-lg border border-slate-200/60">
                <span className="text-slate-500 block">Sensational Index</span>
                <span className="font-bold text-slate-800">{data.signals.sensational_score}/100</span>
              </div>
              <div className="bg-white/70 p-2.5 rounded-lg border border-slate-200/60">
                <span className="text-slate-500 block">Journalistic Formality</span>
                <span className="font-bold text-slate-800">{data.signals.formality_score}/100</span>
              </div>
            </div>
          )}
        </div>

        {/* 2. SENTIMENT ANALYSIS CARD */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  2. Sentiment Analysis
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
                  {data.sentiment} Tone
                </h3>
              </div>
              <div className={`p-2.5 rounded-xl border ${sentStyles.pill}`}>
                {sentStyles.icon}
              </div>
            </div>

            <p className="text-xs text-slate-500 mb-5">
              Reflects the overall emotional polarity, journalistic neutrality, and subjective emphasis.
            </p>

            {/* Sentiment Confidence Gauge */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-700">Sentiment Confidence</span>
                <span className="text-slate-900 font-bold">{data.sentiment_confidence.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${sentStyles.barColor} transition-all duration-1000 ease-out`}
                  style={{ width: `${Math.min(100, Math.max(10, data.sentiment_confidence))}%` }}
                ></div>
              </div>

              {/* Polarity Meter Scale (-1.0 to +1.0) */}
              <div className="mt-3 pt-3 border-t border-slate-200/80">
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Polarity Score</span>
                  <span className="font-mono font-bold text-slate-800">
                    {data.polarity_score > 0 ? `+${data.polarity_score.toFixed(2)}` : data.polarity_score.toFixed(2)}
                  </span>
                </div>
                <div className="relative h-2 bg-gradient-to-r from-rose-400 via-slate-300 to-teal-400 rounded-full">
                  {/* Indicator mark */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-slate-900 border-2 border-white rounded-full shadow-md transition-all duration-700"
                    style={{
                      left: `calc(${((data.polarity_score + 1) / 2) * 100}% - 7px)`
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>-1.0 Negative</span>
                  <span>0.0 Neutral</span>
                  <span>+1.0 Positive</span>
                </div>
              </div>
            </div>
          </div>

          {data.signals && (
            <div className="flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-slate-100 mt-4">
              <span>Urgency Level: <strong className="text-slate-800">{data.signals.emotional_urgency}</strong></span>
              <span>Quoted Sources: <strong className="text-slate-800">{data.signals.quotation_density} quotes</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* 3. ARTICLE SUMMARY */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">3. Article Summary</h3>
              <p className="text-xs text-slate-500">Concise objective synthesis of primary claims and event details</p>
            </div>
          </div>
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSummary ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/60 text-slate-700 text-sm leading-relaxed font-sans">
          {data.summary}
        </div>
      </div>

      {/* 4. KEYWORDS & TOPICS */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">4. Important Keywords &amp; Topics</h3>
            <p className="text-xs text-slate-500">Top informative entities and n-grams extracted from article content</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {data.keywords.map((kw, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 hover:bg-indigo-100 transition-colors"
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* 5. ANALYSIS EXPLANATION */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">5. Analysis Explanation</h3>
            <p className="text-xs text-slate-500">
              Linguistic reasoning &amp; transparent model signals (AI does not invent facts)
            </p>
          </div>
        </div>

        <div className="bg-purple-50/40 p-4 rounded-xl border border-purple-100 text-slate-700 text-sm leading-relaxed">
          <p className="mb-2.5">{data.explanation}</p>
          <div className="text-xs text-slate-500 border-t border-purple-200/40 pt-2 flex items-center gap-1.5">
            <span className="font-semibold text-slate-600">Model Principle:</span>
            <span>Classifications are derived from computational NLP feature vectors and lexical style modeling rather than human editorial consensus.</span>
          </div>
        </div>
      </div>

      {/* 6. SOURCE INFORMATION */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">6. Source Information</h3>
            <p className="text-xs text-slate-500">Metadata regarding the provided input medium</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block mb-1">Domain / Platform</span>
            <span className="font-bold text-slate-900 text-sm break-all">
              {data.source_info.domain}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block mb-1">Input Source URL</span>
            {data.source_info.url ? (
              <a
                href={data.source_info.url}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-blue-600 hover:underline flex items-center gap-1 break-all"
              >
                <span>Visit URL</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            ) : (
              <span className="font-semibold text-slate-700">Direct Text Submission</span>
            )}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block mb-1">Word Count</span>
            <span className="font-bold text-slate-900 text-sm">
              {data.source_info.word_count} words
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block mb-1">Character Length</span>
            <span className="font-bold text-slate-900 text-sm">
              {data.source_info.character_count || 'N/A'} chars
            </span>
          </div>
        </div>
      </div>

      {/* 7. VERIFICATION MESSAGE & FACT-CHECKING TOOLS */}
      <div className="bg-gradient-to-r from-amber-50 via-blue-50 to-indigo-50 border-2 border-amber-300/80 p-6 rounded-2xl shadow-sm">
        <div className="flex items-start gap-3.5 mb-4">
          <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-sm shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-amber-950">
              7. Mandatory Verification Notice
            </h4>
            <p className="text-sm font-semibold text-slate-800 mt-1">
              "{data.verification_message}"
            </p>
            <p className="text-xs text-slate-600 mt-1">
              AI models evaluate rhetorical style and lexical distribution; they cannot guarantee whether a novel real-world event actually took place. Always verify critical facts using established news and fact-checking institutions.
            </p>
          </div>
        </div>

        {/* Fact Checking Action Hub */}
        <div className="pt-3 border-t border-amber-200/60">
          <span className="text-xs font-bold text-slate-700 block mb-2 flex items-center gap-1">
            <Search className="w-3.5 h-3.5 text-blue-600" />
            Quick Verification Resources:
          </span>
          <div className="flex flex-wrap gap-2">
            <a
              href={`https://toolbox.google.com/factcheck/explorer/search/list:recent;query=${queryParam}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300 shadow-2xs transition-colors"
            >
              <span>Google Fact Check Explorer</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href={`https://www.snopes.com/search/${queryParam}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300 shadow-2xs transition-colors"
            >
              <span>Snopes.com</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href={`https://www.politifact.com/search/?q=${queryParam}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300 shadow-2xs transition-colors"
            >
              <span>PolitiFact</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href={`https://www.reuters.com/fact-check/`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300 shadow-2xs transition-colors"
            >
              <span>Reuters Fact Check</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
