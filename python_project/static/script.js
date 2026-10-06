let currentInputMode = 'text';

function switchInput(mode) {
  currentInputMode = mode;
  document.getElementById('tab-text-btn').classList.toggle('active', mode === 'text');
  document.getElementById('tab-url-btn').classList.toggle('active', mode === 'url');
  document.getElementById('text-input-group').style.display = mode === 'text' ? 'block' : 'none';
  document.getElementById('url-input-group').style.display = mode === 'url' ? 'block' : 'none';
}

const SAMPLE_DATA = {
  real: "The European Space Agency announced on Wednesday that its advanced solar observation satellite successfully passed high-altitude thermal calibration trials. Ground control telemetry confirmed that data transmission protocols operated with zero latency degradation. Independent astrophysicists commended the international engineering collaboration.",
  fake: "SHOCKING SECRET: Banned miracle fruit discovered in the Himalayas melts 40 pounds of body fat overnight! Corrupt medical doctors and weight loss clinics are desperately bribing politicians to ban this website. Click immediately before government censors shut this down forever!"
};

function loadSample(type) {
  switchInput('text');
  document.getElementById('news-text').value = SAMPLE_DATA[type] || '';
}

function clearInputs() {
  document.getElementById('news-text').value = '';
  document.getElementById('news-url').value = '';
  document.getElementById('results').style.display = 'none';
}

async function submitAnalysis() {
  const text = document.getElementById('news-text').value.trim();
  const url = document.getElementById('news-url').value.trim();

  if (currentInputMode === 'text' && !text) {
    alert('Please enter or paste news article text.');
    return;
  }
  if (currentInputMode === 'url' && !url) {
    alert('Please enter a valid news article URL.');
    return;
  }

  const payload = currentInputMode === 'text' ? { text } : { url };

  document.getElementById('loading').style.display = 'block';
  document.getElementById('results').style.display = 'none';

  try {
    const res = await fetch('/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    document.getElementById('loading').style.display = 'none';

    if (!res.ok) {
      alert(data.error || 'Failed to analyze news.');
      return;
    }

    renderResults(data);
  } catch (err) {
    document.getElementById('loading').style.display = 'none';
    alert('Network or server error: ' + err.message);
  }
}

function renderResults(data) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.style.display = 'flex';

  // 1. Classification
  const clfBadge = document.getElementById('classification-badge');
  clfBadge.textContent = data.classification;
  clfBadge.className = 'badge-large';
  if (data.classification === 'Real News') clfBadge.classList.add('badge-real');
  else if (data.classification === 'Fake News') clfBadge.classList.add('badge-fake');
  else clfBadge.classList.add('badge-uncertain');

  document.getElementById('confidence-val').textContent = data.confidence + '%';

  // 2. Sentiment
  const sentBadge = document.getElementById('sentiment-badge');
  sentBadge.textContent = data.sentiment;
  sentBadge.className = 'badge-large';
  if (data.sentiment === 'Positive') sentBadge.classList.add('badge-positive');
  else if (data.sentiment === 'Negative') sentBadge.classList.add('badge-negative');
  else sentBadge.classList.add('badge-neutral');

  document.getElementById('polarity-val').textContent = (data.polarity_score || 0).toFixed(2);

  // 3. Summary
  document.getElementById('summary-val').textContent = data.summary;

  // 4. Keywords
  const kwContainer = document.getElementById('keywords-container');
  kwContainer.innerHTML = '';
  (data.keywords || []).forEach(kw => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = '#' + kw;
    kwContainer.appendChild(span);
  });

  // 5. Explanation
  document.getElementById('explanation-val').textContent = data.explanation;

  // 6. Source
  document.getElementById('source-domain').textContent = (data.source_info && data.source_info.domain) || 'Manual Input';

  // Scroll to results
  resultsDiv.scrollIntoView({ behavior: 'smooth' });
}
