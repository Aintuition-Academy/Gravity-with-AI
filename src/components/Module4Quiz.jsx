import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    question: "What does Krugman's (1980) model add to classical trade theory?",
    options: [
      "It introduces resource differences as the driver of trade.",
      "It shows trade can arise from increasing returns and love of variety — without any comparative advantage.",
      "It proves that only developing countries benefit from trade.",
      "It replaces comparative advantage with absolute advantage."
    ],
    correct: 1,
    explanation: "Krugman's breakthrough was showing that two identical countries can gain from trade simply by specializing in different varieties and accessing each other's products — no comparative advantage needed."
  },
  {
    id: 2,
    question: "In the Dixit-Stiglitz model, what is the optimal monopolistic price?",
    options: [
      "p = MC (competitive pricing)",
      "p = (sigma / (sigma-1)) x MC — a constant markup over marginal cost",
      "p = MC x Labour supply",
      "p = sigma x Fixed Cost"
    ],
    correct: 1,
    explanation: "With CES preferences, each firm faces a constant demand elasticity of sigma, so optimal pricing gives a constant markup: p* = sigma/(sigma-1) x MC. Higher sigma means lower markup."
  },
  {
    id: 3,
    question: "In the Dixit-Stiglitz free-entry equilibrium, what determines the number of firms?",
    options: [
      "n = L / (sigma x F) — more workers or lower fixed costs mean more firms",
      "n = sigma x F — higher fixed costs mean more firms",
      "n = L x sigma — more workers mean bigger firms",
      "n is set by government regulation"
    ],
    correct: 0,
    explanation: "Free entry drives profit to zero. Combined with the markup pricing condition, this pins down n = L / (sigma x F). Larger markets (higher L) support more varieties, not larger firms."
  },
  {
    id: 4,
    question: "What is the 'love of variety' welfare gain from trade in the Krugman model?",
    options: [
      "Trade reduces the number of firms, so each firm produces more efficiently.",
      "Access to foreign varieties raises consumer utility even if prices don't change.",
      "Trade always lowers prices, which raises real income.",
      "Trade eliminates fixed costs for all firms."
    ],
    correct: 1,
    explanation: "With CES utility, consumers value variety. When trade opens, Home consumers can access both Home and Foreign varieties (n_H + n_F). This variety expansion directly raises welfare — the 'love of variety' gain."
  },
  {
    id: 5,
    question: "What does Krugman's Home Market Effect predict?",
    options: [
      "Smaller countries always dominate scale-intensive sectors.",
      "Large countries produce more than proportionally in increasing-returns sectors.",
      "Trade equalizes production shares across countries.",
      "Fixed costs eliminate any home market advantage."
    ],
    correct: 1,
    explanation: "With increasing returns and trade costs, countries with larger domestic markets attract more firms in scale-intensive sectors. A country with 60% of world demand ends up with more than 60% of world production — amplification beyond the 45-degree line."
  },
  {
    id: 6,
    question: "What is the key innovation in Melitz (2003) compared to Krugman (1980)?",
    options: [
      "Melitz uses a different utility function.",
      "Melitz introduces firm heterogeneity in productivity — not all firms are identical.",
      "Melitz removes fixed export costs.",
      "Melitz assumes perfect competition."
    ],
    correct: 1,
    explanation: "Krugman assumed all firms are identical (symmetric). Melitz (2003) introduced firm heterogeneity: firms draw productivities from a distribution. Only the most productive firms can profitably export — generating selection effects."
  },
  {
    id: 7,
    question: "In the Melitz model, why do we observe that exporters are more productive than non-exporters?",
    options: [
      "Governments subsidise only the most productive firms.",
      "Exporting requires paying an additional fixed cost f_x; only high-productivity firms generate enough revenue to cover this cost.",
      "Less productive firms choose not to export for cultural reasons.",
      "All firms can export at the same cost, but most choose not to."
    ],
    correct: 1,
    explanation: "Exporting requires paying a fixed cost f_x beyond the domestic fixed cost f_d. The additional revenue from exporting only exceeds this cost for sufficiently high-productivity firms (phi >= phi*_x). This self-selection makes exporters systematically more productive."
  },
  {
    id: 8,
    question: "What happens to average industry productivity when trade is liberalised in the Melitz model?",
    options: [
      "Average productivity falls as foreign competition eliminates domestic firms.",
      "Average productivity rises: low-productivity firms exit while high-productivity exporters expand.",
      "Average productivity stays unchanged.",
      "Only firms that export become more productive."
    ],
    correct: 1,
    explanation: "Trade liberalisation has a selection effect: reduced domestic sales force the least productive firms to exit. Meanwhile, high-productivity exporters expand their scale. The reallocation raises average productivity — a gain beyond Krugman's variety gains."
  },
  {
    id: 9,
    question: "What is the shape condition for Melitz-Pareto to have a well-defined equilibrium?",
    options: [
      "k < sigma - 1 (Pareto shape must be less than the substitution elasticity minus 1)",
      "k > sigma - 1 (Pareto shape must exceed substitution elasticity minus 1)",
      "k = sigma exactly",
      "There is no shape condition needed"
    ],
    correct: 1,
    explanation: "For the Melitz-Pareto model to have finite average productivity and a well-defined equilibrium, we need k > sigma - 1. If this fails, the productivity distribution has infinite variance and the model has no interior equilibrium."
  },
  {
    id: 10,
    question: "How does the Melitz-Pareto model connect to the gravity equation of Module 3?",
    options: [
      "It doesn't — Melitz and Armington generate completely different predictions.",
      "Trade flows follow X_ij proportional to Y_i Y_j / tau^k — a gravity equation with Pareto shape k as the trade elasticity.",
      "It generates trade flows proportional to sigma, not k.",
      "Melitz-Pareto predicts that trade flows are independent of trade costs."
    ],
    correct: 1,
    explanation: "When productivity is Pareto-distributed, aggregate trade flows in Melitz reduce to a gravity equation X_ij proportional to Y_i Y_j / tau^k. The Pareto shape k plays the role of the trade elasticity (like sigma in Armington), connecting the micro theory of firms to macro gravity empirics."
  }
];

export default function Module4Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[current];
  const isCorrect = selected === q.correct;

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setDone(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setDone(false);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz-section">
        <div className="quiz-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
            {pct >= 80 ? '🏆' : pct >= 60 ? '📊' : '📚'}
          </div>
          <h3>Module 4 Quiz Complete!</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444', margin: '12px 0' }}>
            {score} / {questions.length} &nbsp;({pct}%)
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
            {pct >= 80
              ? 'Excellent! You have mastered New Trade Theory and firm heterogeneity.'
              : pct >= 60
              ? 'Good effort. Review the Melitz firm-selection sections to consolidate your understanding.'
              : 'Keep studying — revisit the Krugman and Melitz lessons and try again.'}
          </p>
          <button onClick={handleRestart} className="tab-btn active" style={{ fontSize: '1rem', padding: '10px 28px' }}>
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-section">
      <div className="quiz-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <span>Module 4 Quiz</span>
          <span>Question {current + 1} of {questions.length} — Score: {score}</span>
        </div>

        <h3 style={{ marginBottom: '20px', lineHeight: 1.5 }}>{q.question}</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {q.options.map((opt, idx) => {
            let bg = 'var(--surface)';
            let border = '1px solid var(--border)';
            let color = 'var(--text-primary)';
            if (answered) {
              if (idx === q.correct) { bg = 'rgba(16,185,129,0.12)'; border = '1px solid #10b981'; color = '#10b981'; }
              else if (idx === selected) { bg = 'rgba(239,68,68,0.12)'; border = '1px solid #ef4444'; color = '#ef4444'; }
            } else if (selected === idx) {
              border = '1px solid #6366f1';
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={answered}
                style={{ textAlign: 'left', padding: '14px 18px', borderRadius: '10px', background: bg, border, color, fontSize: '0.95rem', cursor: answered ? 'default' : 'pointer', transition: 'all 0.2s', lineHeight: 1.5 }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <div style={{ marginTop: '16px', padding: '14px 18px', borderRadius: '10px', background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${isCorrect ? '#10b981' : '#ef4444'}` }}>
            <strong>{isCorrect ? '✅ Correct!' : '❌ Not quite.'}</strong>
            <p style={{ marginTop: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{q.explanation}</p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button onClick={handleNext} disabled={!answered}
            className="tab-btn active"
            style={{ padding: '10px 28px', fontSize: '1rem', opacity: answered ? 1 : 0.4, cursor: answered ? 'pointer' : 'default' }}>
            {current < questions.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        </div>
      </div>
    </div>
  );
}
