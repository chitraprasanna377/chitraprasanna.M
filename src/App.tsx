/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AnalyzerWorkbench } from './components/AnalyzerWorkbench';
import { ResultDashboard } from './components/ResultDashboard';
import { ModelMetricsView } from './components/ModelMetricsView';
import { AboutProjectView } from './components/AboutProjectView';
import { SourceCodeExplorer } from './components/SourceCodeExplorer';
import { HistoryView } from './components/HistoryView';
import { AnalysisResponse } from './types';
import { ShieldCheck, Sparkles, BookOpen, ExternalLink, Code2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'metrics' | 'about' | 'code' | 'history'>('analyzer');
  const [currentResult, setCurrentResult] = useState<AnalysisResponse | null>(null);
  const [historyCount, setHistoryCount] = useState<number>(2);

  const handleAnalysisSuccess = (data: AnalysisResponse) => {
    setCurrentResult(data);
    setHistoryCount((prev) => prev + 1);
  };

  const handleSelectHistoryRecord = (record: AnalysisResponse) => {
    setCurrentResult(record);
    setActiveTab('analyzer');
    setTimeout(() => {
      const el = document.getElementById('analysis-results-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Sticky Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={historyCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'analyzer' && (
          <AnalyzerWorkbench onAnalysisSuccess={handleAnalysisSuccess} />
        )}

        {activeTab === 'metrics' && (
          <ModelMetricsView />
        )}

        {activeTab === 'about' && (
          <AboutProjectView />
        )}

        {activeTab === 'code' && (
          <SourceCodeExplorer />
        )}

        {activeTab === 'history' && (
          <HistoryView
            onSelectRecord={handleSelectHistoryRecord}
            onHistoryUpdated={(count) => setHistoryCount(count)}
          />
        )}
      </main>

      {/* College Project Academic Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-10 px-4 sm:px-6 mt-16 print:hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span>AI-Based Fake News Detection &amp; News Sentiment Analysis System</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A comprehensive Natural Language Processing (NLP) capstone computer science project designed for MCA / BCA degree curricula. Combines TF-IDF feature extraction, Logistic Regression, sentiment polarity scoring, and responsible AI verification warnings.
            </p>
            <div className="text-[11px] text-slate-500">
              Department of Computer Applications • Machine Learning &amp; NLP Lab
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Project Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('analyzer')}
                  className="hover:text-white transition-colors"
                >
                  News Analysis Workbench
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('metrics')}
                  className="hover:text-white transition-colors"
                >
                  Model Metrics &amp; Confusion Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-white transition-colors"
                >
                  Project Objectives &amp; Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('code')}
                  className="hover:text-white transition-colors"
                >
                  Python Flask Source Code
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Independent Fact Checkers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://toolbox.google.com/factcheck/explorer"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  <span>Google Fact Check</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.snopes.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  <span>Snopes Fact Checking</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.politifact.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  <span>PolitiFact Truth-O-Meter</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.reuters.com/fact-check"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  <span>Reuters Fact Check</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} MCA / BCA Computer Science Project. All AI results are probabilistic estimations for academic demonstration.
          </p>
          <p className="text-slate-400 font-medium">
            Always verify critical claims using multiple independent journalistic sources.
          </p>
        </div>
      </footer>
    </div>
  );
}
