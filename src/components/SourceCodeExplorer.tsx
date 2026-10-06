import React, { useState, useEffect } from 'react';
import {
  Code2,
  FileCode,
  Copy,
  Check,
  Download,
  Terminal,
  FolderTree,
  FileText,
  ExternalLink,
  Info
} from 'lucide-react';

export const SourceCodeExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('app.py');
  const [filesData, setFilesData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/python-code')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.files) {
          setFilesData(data.files);
        }
      })
      .catch((err) => {
        console.error('Failed to load code files:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fileDescriptions: Record<string, string> = {
    'app.py': 'Flask REST API server handling /analyze with URL extraction, text cleaning, model prediction, and JSON formatting.',
    'train_model.py': 'Scikit-learn model training script: loads news.csv, computes TF-IDF n-grams, trains LogisticRegression, displays confusion matrix, and saves .pkl files.',
    'predict.py': 'Inference module loading serialized model artifacts with deterministic heuristic NLP fallback.',
    'sentiment.py': 'NLP sentiment analysis module computing polarity score (-1.0 to +1.0), subjectivity, and confidence.',
    'summarizer.py': 'Frequency-weighted extractive text summarizer and topic keyword extractor using Luhn algorithm.',
    'requirements.txt': 'Python package dependencies (Flask, scikit-learn, pandas, numpy, requests, beautifulsoup4, joblib).',
    'dataset/news.csv': 'Benchmark labeled dataset containing REAL and FAKE news articles with titles and content.',
    'README.md': 'Complete project report, VS Code setup instructions, and architecture diagrams.'
  };

  const currentCode = filesData[selectedFile] || '# Loading code file content...';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.split('/').pop() || 'code.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Code2 className="w-4 h-4" />
            <span>Python Flask Source Code Suite</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            Standalone Python Project Files &amp; Scripts
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete runnable Python codebase for submission, viva demonstrations, and local VS Code execution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download {selectedFile.split('/').pop()}</span>
          </button>
        </div>
      </div>

      {/* VS Code Quick Run Instructions */}
      <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl border border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
          <Terminal className="w-4 h-4" />
          <span>Quick Run in Visual Studio Code (Terminal)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-500 block mb-1"># 1. Install Libraries</span>
            <span className="text-emerald-400">pip install -r requirements.txt</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-500 block mb-1"># 2. Train Model (.pkl)</span>
            <span className="text-emerald-400">python train_model.py</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-500 block mb-1"># 3. Start Flask API</span>
            <span className="text-emerald-400">python app.py</span>
          </div>
        </div>
      </div>

      {/* Code Viewer Layout: Sidebar + Editor */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sidebar: File Tree */}
        <div className="md:col-span-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
            <FolderTree className="w-4 h-4 text-blue-600" />
            <span>Project File Tree</span>
          </div>

          <div className="space-y-1">
            {Object.keys(fileDescriptions).map((file) => {
              const isSelected = selectedFile === file;
              return (
                <button
                  key={file}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200 shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className="truncate">{file}</span>
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>}
                </button>
              );
            })}
          </div>

          {/* Current File Description */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
              File Purpose &amp; Role:
            </span>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              {fileDescriptions[selectedFile]}
            </p>
          </div>
        </div>

        {/* Right Editor Pane */}
        <div className="md:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden flex flex-col">
          {/* Editor Tab Bar */}
          <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="text-xs font-mono font-semibold text-slate-300 ml-2">
                python_project/{selectedFile}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              {currentCode.split('\n').length} lines
            </span>
          </div>

          {/* Code Body */}
          <div className="p-4 overflow-x-auto max-h-[560px] overflow-y-auto font-mono text-xs text-slate-200 leading-relaxed scrollbar-thin">
            <pre>
              <code>{currentCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
