import React, { useState } from 'react';
import {
  BookOpen,
  Target,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Cpu,
  Workflow,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  Code
} from 'lucide-react';

export const AboutProjectView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const vivaQuestions = [
    {
      q: "1. What is the fundamental problem statement of this project?",
      a: "With the exponential proliferation of digital news, automated disinformation campaigns and clickbait create public panic, market volatility, and social division. This project develops an end-to-end NLP & Machine Learning system that computationally assists users by predicting credibility signals, analyzing emotional tone, and highlighting textual red flags without asserting infallibility."
    },
    {
      q: "2. Why is TF-IDF (Term Frequency - Inverse Document Frequency) preferred over CountVectorizer (Bag of Words)?",
      a: "CountVectorizer simply tallies term occurrence frequencies, heavily weighting common words (e.g. 'said', 'today', 'people'). In contrast, TF-IDF multiplies Term Frequency by Inverse Document Frequency (log(N/df)), heavily penalizing words that appear everywhere across all news articles, while boosting distinctive domain-specific terms (such as 'shocking', 'conspiracy' vs 'official', 'telemetry')."
    },
    {
      q: "3. What is the relationship between Sentiment Analysis and Fake News Classification?",
      a: "Fake news and propaganda rely heavily on high emotional arousal—utilizing fear, outrage, urgent calls to action, and hyperbolic claims. Sentiment and subjectivity metrics reveal whether a text is neutral and factual or heavily polarized and emotionally manipulative."
    },
    {
      q: "4. What is the difference between Precision and Recall in this project context?",
      a: "Precision answers: 'When our AI flags an article as FAKE, how often is it actually fake?' (High precision prevents falsely accusing legitimate news agencies). Recall answers: 'Out of all real-world fake news articles, what percentage did our AI catch?' (High recall prevents dangerous hoaxes from slipping past)."
    },
    {
      q: "5. How does the Extractive Summarizer work without hallucinating?",
      a: "Unlike generative models that can hallucinate details, this extractive algorithm scores existing sentences using normalized word-frequency weights (Luhn's algorithm). It picks the top 2-3 most informative original sentences and maintains their original chronology."
    },
    {
      q: "6. Why does the system strictly avoid claiming an article is definitely True or False?",
      a: "Ethical and computational accuracy: machine learning algorithms detect statistical linguistic patterns and syntax anomalies, but they cannot independently ground truth in the real physical world without real-time investigative journalism. Displaying results as probabilistic predictions ensures responsible AI deployment."
    },
    {
      q: "7. What happens if a news website blocks web scraping?",
      a: "The architecture provides dual input modalities. If a target URL blocks automated scrapers (via anti-bot protection or paywalls), the system provides an informative fallback error recommending the user to copy and paste the raw text directly into the article box."
    },
    {
      q: "8. How can this project be scaled in production for millions of users?",
      a: "By containerizing the Flask API using Docker, deploying behind an asynchronous Gunicorn/WSGI server with Celery task queues for long scraping jobs, caching frequent URL hashes in Redis, and integrating vector databases for real-time embedding similarity search."
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Title Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>College MCA / BCA Computer Science Major Project Documentation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          AI-Based Fake News Detection and News Sentiment Analysis System
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-2">
          Comprehensive project report covering theoretical problem statement, objectives, system architecture, methodology, advantages, limitations, and college viva-voce preparation.
        </p>
      </div>

      {/* HOW IT WORKS PIPELINE */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Workflow className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-900">System Architecture &amp; Workflow</h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          The processing pipeline executes sequential natural language transformations from raw input down to structured decision metrics:
        </p>

        {/* Visual Flowchart */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative group hover:border-blue-300 transition-colors">
            <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1">Step 1</span>
            <h4 className="font-bold text-sm text-slate-900">News Input</h4>
            <p className="text-xs text-slate-500 mt-1">Direct text paste or target news article URL submission.</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative group hover:border-blue-300 transition-colors">
            <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1">Step 2</span>
            <h4 className="font-bold text-sm text-slate-900">Text Extraction</h4>
            <p className="text-xs text-slate-500 mt-1">DOM traversal via BeautifulSoup4 stripping HTML tags, scripts, and ads.</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative group hover:border-blue-300 transition-colors">
            <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1">Step 3</span>
            <h4 className="font-bold text-sm text-slate-900">Preprocessing</h4>
            <p className="text-xs text-slate-500 mt-1">Lowercasing, regex cleanup, punctuation removal, and stopword filtering.</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative group hover:border-blue-300 transition-colors">
            <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1">Step 4</span>
            <h4 className="font-bold text-sm text-slate-900">Feature Extraction</h4>
            <p className="text-xs text-slate-500 mt-1">TF-IDF Vectorization converting text to 5,000 unigram/bigram numerical vectors.</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative group hover:border-blue-300 transition-colors">
            <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1">Step 5</span>
            <h4 className="font-bold text-sm text-slate-900">ML Classification</h4>
            <p className="text-xs text-slate-500 mt-1">Logistic Regression calculates probability scores for Real vs Fake.</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative group hover:border-blue-300 transition-colors">
            <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1">Step 6</span>
            <h4 className="font-bold text-sm text-slate-900">Sentiment Analysis</h4>
            <p className="text-xs text-slate-500 mt-1">Polarity evaluation (-1 to +1) determining Positive, Negative, or Neutral.</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative group hover:border-blue-300 transition-colors">
            <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1">Step 7</span>
            <h4 className="font-bold text-sm text-slate-900">Summary &amp; Keywords</h4>
            <p className="text-xs text-slate-500 mt-1">Extractive sentence scoring extracts core claims and top topic tags.</p>
          </div>

          <div className="p-4 bg-blue-50 border-2 border-blue-400 rounded-xl relative shadow-xs">
            <span className="text-[10px] font-bold text-blue-700 uppercase block mb-1">Step 8</span>
            <h4 className="font-bold text-sm text-blue-950">Final Dashboard</h4>
            <p className="text-xs text-blue-800 mt-1">Transparent confidence gauges, explanation factors, and verification links.</p>
          </div>
        </div>
      </div>

      {/* Grid: Problem Statement, Objectives, Tech Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem Statement */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-rose-700 font-bold">
            <AlertTriangle className="w-4 h-4" />
            <h3 className="text-base text-slate-900">Problem Statement</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The rampant spread of misinformation, deepfakes, and clickbait articles across digital platforms undermines public health, democratic processes, and financial stability. Manual verification by human journalists is resource-intensive and cannot keep pace with viral information spreading in seconds. There is an urgent need for automated, interpretable NLP systems that can provide instant credibility indicators and emotional tone assessments.
          </p>
        </div>

        {/* Project Objectives */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-emerald-700 font-bold">
            <Target className="w-4 h-4" />
            <h3 className="text-base text-slate-900">Project Objectives</h3>
          </div>
          <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Design a text classification pipeline predicting Real vs Fake news with &gt;90% accuracy.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Implement sentiment and subjectivity modeling to assess emotional manipulation.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Extract objective summaries and salient topic keywords automatically.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Provide transparent, non-dogmatic explanations with direct verification notices.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Technologies Used Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-600" />
          <span>Technologies &amp; Libraries Used</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block">Python 3.10+</span>
            <span className="text-slate-500">Core ML &amp; NLP scripts</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block">Flask &amp; CORS</span>
            <span className="text-slate-500">RESTful microservice API</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block">Scikit-Learn</span>
            <span className="text-slate-500">TF-IDF &amp; Logistic Regression</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block">NLTK / Lexicon</span>
            <span className="text-slate-500">Sentiment polarity &amp; stopwords</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block">BeautifulSoup4</span>
            <span className="text-slate-500">HTML parsing &amp; text extraction</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block">React 19 &amp; Vite</span>
            <span className="text-slate-500">Modern reactive frontend SPA</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block">Tailwind CSS</span>
            <span className="text-slate-500">Responsive dashboard UI</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block">TypeScript &amp; Express</span>
            <span className="text-slate-500">Full-stack server runtime</span>
          </div>
        </div>
      </div>

      {/* Grid: Advantages, Limitations, Future Enhancements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-sm text-emerald-800 mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Advantages
          </h4>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li>Instant sub-second analysis for web URLs or raw text.</li>
            <li>Interpretable feature indicators rather than black-box outputs.</li>
            <li>No costly external GPU requirement for inference.</li>
            <li>Dual-view with sentiment tone and extractive summary.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-sm text-amber-800 mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Limitations
          </h4>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li>Evaluates style/rhetoric, cannot verify unrecorded real-world facts.</li>
            <li>Paywalled sites prevent direct scraping without credentials.</li>
            <li>Cleverly crafted satirical articles can exhibit formal grammar.</li>
            <li>English language focus in initial baseline models.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-sm text-blue-800 mb-2 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            Future Enhancements
          </h4>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li>Multimodal verification (CLIP / Vision deepfake analysis).</li>
            <li>Knowledge Graph cross-referencing via Wikipedia / Wikidata.</li>
            <li>Multilingual Indian regional languages (Hindi, Tamil, etc.).</li>
            <li>Browser extension for automated social feed flagging.</li>
          </ul>
        </div>
      </div>

      {/* College Viva-Voce Questions Accordion */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-900">College Viva-Voce Questions &amp; Answers</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          High-yield academic questions commonly asked by internal and external project evaluators:
        </p>

        <div className="space-y-3">
          {vivaQuestions.map((item, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 bg-slate-50 hover:bg-slate-100/80 transition-colors"
              >
                <span className="font-bold text-xs sm:text-sm text-slate-900">{item.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
