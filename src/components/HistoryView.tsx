import React, { useState, useEffect } from 'react';
import { HistoryItem, AnalysisResponse } from '../types';
import {
  History,
  Trash2,
  Download,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  HelpCircle,
  Clock,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface HistoryViewProps {
  onSelectRecord: (record: AnalysisResponse) => void;
  onHistoryUpdated: (count: number) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onSelectRecord, onHistoryUpdated }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      if (data && data.history) {
        setHistory(data.history);
        onHistoryUpdated(data.history.length);
      }
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClearHistory = async () => {
    if (!confirm('Are you sure you want to clear all analysis history records?')) return;
    try {
      await fetch('/api/history', { method: 'DELETE' });
      setHistory([]);
      onHistoryUpdated(0);
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  };

  const handleExportCsv = () => {
    if (history.length === 0) return;
    const headers = ['Timestamp', 'Domain', 'Classification', 'Confidence', 'Sentiment', 'Summary'];
    const rows = history.map((item) => [
      `"${new Date(item.timestamp).toLocaleString()}"`,
      `"${item.domain}"`,
      `"${item.classification}"`,
      `"${item.confidence}%"`,
      `"${item.sentiment}"`,
      `"${item.summary.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `news_analysis_history_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReloadIntoDashboard = (item: HistoryItem) => {
    const analysisResponse: AnalysisResponse = {
      classification: item.classification,
      confidence: item.confidence,
      sentiment: item.sentiment,
      sentiment_confidence: item.sentiment_confidence,
      polarity_score: item.sentiment === 'Positive' ? 0.45 : item.sentiment === 'Negative' ? -0.45 : 0.05,
      summary: item.summary,
      keywords: item.keywords,
      explanation: item.explanation,
      source_info: {
        url: null,
        domain: item.domain,
        title: item.title,
        word_count: item.snippet.split(' ').length,
        character_count: item.snippet.length
      },
      verification_message:
        'AI-generated analysis should not be treated as proof that a news article is true or false. Verify important information using multiple trusted and independent sources.'
    };
    onSelectRecord(analysisResponse);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
            <History className="w-4 h-4" />
            <span>Project Audit Trail &amp; Lab Log</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">Analysis Session History</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Log of previously evaluated news articles during this application session.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <>
              <button
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleClearHistory}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* History Items List */}
      {history.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm text-center">
          <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No Analysis History Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Analyze news articles in the Analyzer tab to log and review your evaluation records here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Classification badge */}
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      item.classification === 'Real News'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.classification === 'Fake News'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.classification === 'Real News' ? (
                      <ShieldCheck className="w-3 h-3" />
                    ) : item.classification === 'Fake News' ? (
                      <ShieldAlert className="w-3 h-3" />
                    ) : (
                      <HelpCircle className="w-3 h-3" />
                    )}
                    <span>{item.classification} ({item.confidence.toFixed(1)}%)</span>
                  </span>

                  {/* Sentiment badge */}
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                    Tone: {item.sentiment}
                  </span>

                  <span className="text-[11px] text-slate-400">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {item.domain}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{item.summary}</p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                <button
                  onClick={() => handleReloadIntoDashboard(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Inspect in Dashboard</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
