import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    question: "What does the gravity equation say about trade between two countries?",
    options: [
      "Trade depends only on the distance between them.",
      "Trade is larger when both economies are large and smaller when they are far apart.",
      "Trade depends only on the size of the exporter.",
      "Trade is always equal between any two countries."
    ],
    correct: 1,
    explanation: "The gravity equation says trade rises with economic size (of both exporter and importer) and falls with distance — just like gravitational pull in physics."
  },
  {
    id: 2,
    question: "In the gravity equation, what happens to predicted trade if the importer's GDP doubles (all else equal)?",
    options: [
      "Predicted trade falls by half.",
      "Predicted trade stays the same.",
      "Predicted trade roughly doubles (increases).",
      "Predicted trade becomes unpredictable."
    ],
    correct: 2,
    explanation: "A larger importer GDP means more spending capacity, so predicted trade rises. In the gravity equation, importer GDP enters positively."
  },
  {
    id: 3,
    question: "What effect does larger geographic distance typically have on bilateral trade?",
    options: [
      "It increases trade because far countries need each other more.",
      "It has no effect on trade.",
      "It reduces trade because of higher shipping costs, delays, and information frictions.",
      "It only matters for developing countries."
    ],
    correct: 2,
    explanation: "Distance reduces trade through higher shipping costs, longer delivery times, cultural frictions, and weaker information links. The distance elasticity γ is typically negative."
  },
  {
    id: 4,
    question: "In the naive gravity regression: ln Xij = α ln Yi + β ln Yj + γ ln distanceij + εij, what does a negative γ tell us?",
    options: [
      "Trade rises when distance increases.",
      "Trade falls when distance increases.",
      "Distance has no effect on trade.",
      "γ must always be positive in gravity models."
    ],
    correct: 1,
    explanation: "A negative γ means higher log distance reduces predicted log trade. Empirically, γ is typically around −1, meaning a 10% increase in distance reduces trade by roughly 10%."
  },
  {
    id: 5,
    question: "What does 'structural gravity' add that naive gravity misses?",
    options: [
      "Structural gravity adds a constant term to the regression.",
      "Structural gravity is identical to naive gravity.",
      "Structural gravity includes multilateral resistance terms — how easily each country trades with the rest of the world.",
      "Structural gravity replaces GDP with population."
    ],
    correct: 2,
    explanation: "Structural gravity (Anderson & van Wincoop, 2003) adds outward multilateral resistance (Ωᵢ) for exporters and inward multilateral resistance (Φⱼ) for importers, capturing the full global trading system."
  },
  {
    id: 6,
    question: "In simple words, what does 'multilateral resistance' mean?",
    options: [
      "The number of countries a country trades with.",
      "The total tariff rate a country faces.",
      "How easily a country can trade with all its partners — its outside options in the world trading system.",
      "The speed at which goods cross borders."
    ],
    correct: 2,
    explanation: "Multilateral resistance captures a country's alternatives. If Foreign has many cheap trading partners, it resists buying from Home even if Home-Foreign bilateral costs are low. Bilateral trade depends on the global context."
  },
  {
    id: 7,
    question: "What is the Armington assumption?",
    options: [
      "All goods are identical regardless of origin.",
      "Consumers prefer domestic goods over foreign goods.",
      "Goods are differentiated by their country of origin — French cheese and Swiss cheese are different varieties.",
      "Only labor-intensive goods are traded internationally."
    ],
    correct: 2,
    explanation: "The Armington assumption means goods of the same category are treated as different varieties based on their origin. This is why both imports and exports can occur in the same product category."
  },
  {
    id: 8,
    question: "What does iceberg trade cost dᵢⱼ = 1.25 mean?",
    options: [
      "Goods travel 1.25 times faster from i to j.",
      "The exporter must ship 1.25 units for 1 unit to arrive — 0.25 units 'melt away' in transit.",
      "The importer pays 25% less than the market price.",
      "Trade is 25% more efficient between these countries."
    ],
    correct: 1,
    explanation: "Iceberg trade costs mean a fraction of the good melts away in transit. If dᵢⱼ = 1.25, the exporter ships 1.25 units but only 1 unit arrives. The 'melted' portion represents all trade costs — shipping, tariffs, delays."
  },
  {
    id: 9,
    question: "In CES preferences, what does a higher elasticity of substitution σ mean?",
    options: [
      "Consumers see all varieties as more different and never switch.",
      "Consumers find varieties easy to substitute — a small price advantage creates a large spending-share shift.",
      "Consumers always spend equally on all varieties.",
      "The price index becomes more stable."
    ],
    correct: 1,
    explanation: "A higher σ means varieties are closer substitutes. Even a small price difference causes consumers to shift spending dramatically toward the cheaper variety. A lower σ means consumers value variety more and switch less."
  },
  {
    id: 10,
    question: "In the trade share formula πᵢⱼ, what happens to origin i's trade share if its wage wᵢ rises (all else equal)?",
    options: [
      "Origin i's trade share rises because higher wages attract more buyers.",
      "Origin i's trade share stays the same.",
      "Origin i's trade share falls because higher wages raise costs, making its goods more expensive.",
      "Origin i's trade share doubles."
    ],
    correct: 2,
    explanation: "Higher wages (wᵢ) raise the producer price (pᵢ = wᵢ/aᵢ), which raises delivered prices and reduces trade shares. Wages and productivity together determine cost competitiveness."
  },
  {
    id: 11,
    question: "In the wage iteration algorithm, what does the 'dampening parameter' μ do?",
    options: [
      "It sets the final equilibrium wage directly.",
      "It slows down wage updates to prevent the algorithm from jumping too far and diverging.",
      "It eliminates all off-diagonal effects from the Jacobian.",
      "It ensures all countries have the same wage in equilibrium."
    ],
    correct: 1,
    explanation: "Dampening makes updates more conservative: w(t+1) = (1−μ)w(t) + μ × (proposed update). Lower μ means smaller steps — safer but slower. Higher μ is faster but riskier. Without dampening, the algorithm may oscillate or diverge."
  },
  {
    id: 12,
    question: "The gains-from-trade formula GFTₙ = 1 − πₙₙ^(1/(1−σ)) says: which country has larger gains from trade?",
    options: [
      "The country with the highest domestic expenditure share πₙₙ (most self-sufficient).",
      "The country with the lowest domestic expenditure share πₙₙ (most open to imports).",
      "All countries always have equal gains from trade.",
      "Gains from trade depend only on σ, not πₙₙ."
    ],
    correct: 1,
    explanation: "A lower πₙₙ means the country imports more and relies less on its own goods. More openness → larger gains from trade. A country with πₙₙ close to 1 (nearly autarky) has very small measured gains from trade."
  }
];

export default function Module3Quiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId, optIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResults(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setShowResults(false);
  };

  const score = questions.filter(q => answers[q.id] === q.correct).length;

  return (
    <div className="quiz-section">
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Module 3 Quiz: GRAVITY with Gravitas</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          12 questions covering gravity equations, structural gravity, the Armington model, iceberg trade costs, CES demand, numerical simulation, exact hat algebra, and gains from trade.
        </p>
      </div>

      {questions.map((q, qi) => {
        const selected = answers[q.id];
        const isAnswered = selected !== undefined;
        const isCorrect = selected === q.correct;

        return (
          <div key={q.id} className="quiz-question-block" style={{
            marginBottom: '24px',
            padding: '20px',
            borderRadius: '12px',
            border: submitted
              ? isCorrect ? '1px solid var(--accent-success)' : isAnswered ? '1px solid var(--accent-error)' : '1px solid var(--border)'
              : '1px solid var(--border)',
            background: 'var(--surface)'
          }}>
            <p style={{ fontWeight: 600, marginBottom: '12px', fontSize: '0.95rem' }}>
              Q{qi + 1}. {q.question}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {q.options.map((opt, oi) => {
                let bg = 'transparent';
                let border = '1px solid var(--border)';
                let color = 'var(--text-primary)';
                if (submitted) {
                  if (oi === q.correct) { bg = 'rgba(16,185,129,0.12)'; border = '1px solid var(--accent-success)'; color = 'var(--accent-success)'; }
                  else if (oi === selected && !isCorrect) { bg = 'rgba(239,68,68,0.12)'; border = '1px solid var(--accent-error)'; color = 'var(--accent-error)'; }
                } else if (oi === selected) {
                  bg = 'rgba(59,130,246,0.12)'; border = '1px solid var(--accent-primary)';
                }
                return (
                  <button
                    key={oi}
                    onClick={() => handleSelect(q.id, oi)}
                    disabled={submitted}
                    style={{
                      textAlign: 'left', padding: '10px 14px', borderRadius: '8px',
                      background: bg, border, color, cursor: submitted ? 'default' : 'pointer',
                      fontSize: '0.9rem', transition: 'all 0.15s'
                    }}
                  >
                    {String.fromCharCode(65 + oi)}. {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div style={{
                marginTop: '12px', padding: '10px 14px', borderRadius: '8px',
                background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                fontSize: '0.85rem', color: 'var(--text-secondary)'
              }}>
                <strong style={{ color: isCorrect ? 'var(--accent-success)' : 'var(--accent-error)' }}>
                  {isCorrect ? '✓ Correct!' : '✗ Incorrect.'}
                </strong>{' '}
                {q.explanation}
              </div>
            )}
          </div>
        );
      })}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
          style={{
            padding: '12px 32px', borderRadius: '8px', fontWeight: 700,
            background: Object.keys(answers).length < questions.length ? 'var(--surface)' : 'linear-gradient(135deg, #7c3aed, #2563eb)',
            color: Object.keys(answers).length < questions.length ? 'var(--text-secondary)' : 'white',
            border: '1px solid var(--border)', cursor: Object.keys(answers).length < questions.length ? 'not-allowed' : 'pointer',
            fontSize: '1rem'
          }}
        >
          Submit Quiz ({Object.keys(answers).length}/{questions.length} answered)
        </button>
      ) : (
        <div style={{ textAlign: 'center', padding: '24px', borderRadius: '12px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>
            {score >= 10 ? '🏆' : score >= 7 ? '🎉' : score >= 5 ? '📚' : '🔄'}
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
            Score: {score} / {questions.length}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            {score >= 10 ? 'Excellent! You have mastered GRAVITY with Gravitas.' :
             score >= 7 ? 'Great work! Review the lessons you missed to deepen your understanding.' :
             score >= 5 ? 'Good effort. Revisit the submodules on structural gravity and hat algebra.' :
             'Keep studying! The gravity model takes time to master. Revisit all submodules.'}
          </p>
          <button
            onClick={handleRetry}
            style={{
              padding: '10px 28px', borderRadius: '8px', fontWeight: 600,
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white',
              border: 'none', cursor: 'pointer', fontSize: '0.95rem'
            }}
          >
            🔄 Retry Quiz
          </button>
        </div>
      )}
    </div>
  );
}
