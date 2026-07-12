import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: "F1. A tariff in a small country reduces welfare by exactly:",
    options: [
      "Option A: a + c",
      "Option B: the two deadweight triangles b + d",
      "Option C: tariff revenue",
      "Option D: zero"
    ],
    correct: 1,
    explanation: "Correct! Only b (production distortion) and d (consumption distortion) represent net deadweight losses. Areas a (producer surplus gain) and c (tariff revenue) are pure domestic transfers from consumers."
  },
  {
    id: 2,
    question: "F2. The large-country welfare decomposition is ΔW = -b - d + e, where e is:",
    options: [
      "Option A: quota rent",
      "Option B: the terms-of-trade gain (P^w - P_t^*)M, extracted from foreign exporters",
      "Option C: consumer surplus",
      "Option D: the production distortion"
    ],
    correct: 1,
    explanation: "Correct! The terms-of-trade gain represents the portion of tariff revenue paid by foreign exporters who lower their prices, representing a direct transfer of surplus from Foreign to Home."
  },
  {
    id: 3,
    question: "F3. Johnson's optimum tariff is t_opt = 1/ε*: a small country's optimal tariff is zero because:",
    options: [
      "Option A: it has no imports",
      "Option B: it faces an infinitely elastic foreign offer curve (ε* -> ∞)",
      "Option C: its government is benevolent",
      "Option D: of WTO rules"
    ],
    correct: 1,
    explanation: "Correct! Since a small country faces a perfectly elastic foreign supply (ε* -> ∞), it cannot force foreign exporters to lower their price, meaning t_opt = 1/∞ = 0."
  },
  {
    id: 4,
    question: "F4. Tariff–quota equivalence fails under domestic monopoly because:",
    options: [
      "Option A: quotas raise more revenue",
      "Option B: a quota leaves the monopolist a downward-sloping residual demand to exploit; a tariff only raises its price ceiling",
      "Option C: tariffs are ad valorem",
      "Option D: quotas are permanent"
    ],
    correct: 1,
    explanation: "Correct! While a tariff imposes a flat price ceiling (allowing imports to expand if the monopolist restricts domestic output), a quota caps import volume, allowing the monopolist to treat the remaining demand as its private residual monopoly market."
  },
  {
    id: 5,
    question: "F5. Strategic substitutes vs. complements are defined by the sign of:",
    options: [
      "Option A: the first-order condition (π1_a1)",
      "Option B: the cross-partial derivative of payoff (π1_a1a2)",
      "Option C: the system determinant (Δ)",
      "Option D: the intercept"
    ],
    correct: 1,
    explanation: "Correct! If π1_a1a2 < 0, player 1's marginal payoff decreases when player 2 acts aggressively, making their choices strategic substitutes (BR curve slopes down). Complements correspond to π1_a1a2 > 0."
  },
  {
    id: 6,
    question: "F6. In Cournot, a home tariff (a rise in the foreign rival's cost c2) causes:",
    options: [
      "Option A: X1 ↑, X2 ↓, price ↑: profit shifts to the home firm",
      "Option B: both outputs rise",
      "Option C: price falls",
      "Option D: X1 ↓"
    ],
    correct: 0,
    explanation: "Correct! A tariff increases the foreign firm's marginal cost of serving the domestic market, causing it to contract output, which allows the home firm to expand and captures shifted profits."
  },
  {
    id: 7,
    question: "F7. Starting from free trade in the single-market Cournot model, a marginal tariff:",
    options: [
      "Option A: raises welfare by profit shifting",
      "Option B: lowers welfare: dU|t=0 = -X2 dt < 0 — profit shifting is second-order, the consumer loss first-order",
      "Option C: has zero effect",
      "Option D: is prohibitive"
    ],
    correct: 1,
    explanation: "Correct! At free trade, the marginal profit-shifting gain is a second-order envelope effect, whereas the consumption distortion from the price increase is a first-order welfare loss."
  },
  {
    id: 8,
    question: "F8. Johnson's answer to 'must both countries lose a tariff war?' is:",
    options: [
      "Option A: yes, always",
      "Option B: no: at most one must lose; relative offer-curve elasticities decide who can win",
      "Option C: both always win",
      "Option D: trade goes to zero"
    ],
    correct: 1,
    explanation: "Correct! Johnson demonstrated that a country with sufficiently favorable offer-curve elasticities can extract enough terms-of-trade gains to offset the trade contraction, winning the war relative to free trade."
  },
  {
    id: 9,
    question: "F9. Mayer's (1981) locus t + t* + tt* = 0 characterizes:",
    options: [
      "Option A: Nash tariffs",
      "Option B: Pareto-efficient policy pairs: free trade, or one tariff matched by one subsidy",
      "Option C: revenue-maximizing tariffs",
      "Option D: the prohibitive tariff"
    ],
    correct: 1,
    explanation: "Correct! To equalize relative domestic prices across borders, Pareto efficiency requires that one country's tariff is balanced by the other's subsidy: t + t* + tt* = 0. Pure tariff wars are never efficient."
  },
  {
    id: 10,
    question: "F10. Syropoulos (2002): a country wins the bilateral tariff war when:",
    options: [
      "Option A: it is more patient",
      "Option B: its relative size exceeds a unique threshold λ_bar",
      "Option C: it moves second",
      "Option D: its tariff is bound"
    ],
    correct: 1,
    explanation: "Correct! In general equilibrium, relative size determines terms-of-trade leverage. If a country is sufficiently large compared to its partner, it can dominate the tariff war, ending up better off than under free trade."
  },
  {
    id: 11,
    question: "F11. Brander–Spencer (1984): against a foreign monopolist, the optimal import policy is a subsidy when:",
    options: [
      "Option A: demand is linear",
      "Option B: demand is sufficiently convex (R < -1, e.g. constant elasticity), so tariff pass-through exceeds one",
      "Option C: the monopolist is small",
      "Option D: never"
    ],
    correct: 1,
    explanation: "Correct! When demand is highly convex (R < -1), the pass-through of the tariff exceeds 100%, causing consumer prices to jump by more than the tariff collected, making an import subsidy welfare-improving instead."
  },
  {
    id: 12,
    question: "F12. Brander–Spencer (1985): the optimal export subsidy makes the home firm behave like:",
    options: [
      "Option A: a price-taker",
      "Option B: a Stackelberg quantity leader",
      "Option C: a monopsonist",
      "Option D: a colluder"
    ],
    correct: 1,
    explanation: "Correct! The export subsidy pre-commits the home firm to producing more, shifting its reaction function out to intersect the foreign firm's reaction curve at the exact Stackelberg leader point."
  },
  {
    id: 13,
    question: "F13. Under Bertrand competition the Brander–Spencer prescription flips to an export tax because:",
    options: [
      "Option A: prices are sticky",
      "Option B: best responses slope up: committing to a higher price induces the rival to raise its price too, softening competition",
      "Option C: taxes raise revenue",
      "Option D: quantity is fixed"
    ],
    correct: 1,
    explanation: "Correct! Under Bertrand, prices are strategic complements. By taxing exports, the government increases the home firm's cost, shifting its reaction curve up and allowing both firms to charge higher prices and raise margins."
  },
  {
    id: 14,
    question: "F14. The exporters' subsidy war (Propositions 4–5) is a Prisoner's Dilemma because:",
    options: [
      "Option A: subsidies are irreversible",
      "Option B: each exporter subsidizes in equilibrium, yet both would gain if subsidies were jointly cut (the joint optimum is even an export tax)",
      "Option C: the importer always loses",
      "Option D: there is no equilibrium"
    ],
    correct: 1,
    explanation: "Correct! Subsidies are mutually aggressive. In Nash equilibrium, both governments spend tax money to shift profits, but the net effect is a terms-of-trade loss to the importing country, leaving both exporters worse off than under cooperation."
  },
  {
    id: 15,
    question: "F15. Mayer (1984): with skewed capital ownership and majority voting, the equilibrium tariff is set by:",
    options: [
      "Option A: the mean capital owner",
      "Option B: the median voter, whose endowment ratio lies below the mean",
      "Option C: the largest capitalist",
      "Option D: economists"
    ],
    correct: 1,
    explanation: "Correct! Under Black's theorem, majority voting selects the median voter's preferred tariff. Due to the skewed (unequal) distribution of capital, the median capital ratio is below the mean, biasing the result toward labor protection."
  },
  {
    id: 16,
    question: "F16. In Protection for Sale, unorganized sectors receive:",
    options: [
      "Option A: high tariffs",
      "Option B: negative protection (ti < 0): they are effectively taxed to fund organized sectors' protection",
      "Option C: free trade exactly",
      "Option D: quotas"
    ],
    correct: 1,
    explanation: "Correct! Since the government weights contributions and welfare, organized lobbies bribe the government for protection, which draws resources away from unorganized sectors, resulting in negative protection (ti < 0)."
  }
];

export default function Module5Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [currentQuestion, quizSubmitted, showResults]);

  const handleSelectAnswer = (idx) => {
    if (quizSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || quizSubmitted) return;
    
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correct;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion]: {
        selected: selectedAnswer,
        correct: isCorrect
      }
    }));
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setQuizSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setQuizSubmitted(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setScore(0);
    setShowResults(false);
    setUserAnswers({});
  };

  if (showResults) {
    return (
      <div className="stepper-card-body" style={{ textAlign: 'center', animation: 'fadeInM5 0.3s ease-out' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--accent-primary)', marginBottom: '16px' }}>
          📊 Final Quiz Assessment Results
        </h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          You completed the Module 5 Comprehensive Final Exam.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '4px solid var(--accent-primary)',
            background: 'rgba(59, 130, 246, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{score}</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>out of 16</span>
          </div>
        </div>

        <p style={{ maxWidth: '600px', margin: '0 auto 30px auto', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
          {score === 16 
            ? "Flawless score! You have completely mastered the economics and strategic games of trade policy, tariffs, quotas, retaliation, subsidies, and lobbying!"
            : score >= 12 
              ? "Excellent job! You have a strong conceptual grasp of strategic trade policy and political economy frameworks. Go through the explanations for the ones you missed to master the details."
              : "Review the module content and slider sandboxes. Trade policy incorporates complex strategic interactions under duopoly and lobbying that are highly path-dependent!"}
        </p>

        <button className="quiz-btn quiz-btn-primary" onClick={handleRestart}>
          <RotateCcw size={16} />
          <span>Restart Quiz Assessment</span>
        </button>
      </div>
    );
  }

  const q = quizQuestions[currentQuestion];

  return (
    <div className="stepper-card-body" style={{ animation: 'fadeInM5 0.3s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--card-border)', paddingBottom: '12px', marginBottom: '20px' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Module 5 Final Exam
          </span>
          <h4 style={{ fontSize: '1.2rem', margin: '4px 0 0 0', color: 'var(--text-primary)' }}>
            Question {currentQuestion + 1} of 16
          </h4>
        </div>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', alignSelf: 'center' }}>
          Current Score: {score}
        </span>
      </div>

      <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '20px', lineHeight: '1.5' }}>
        {q.question}
      </p>

      <div className="quiz-options-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {q.options.map((option, idx) => {
          let btnStyle = {
            padding: '12px 16px',
            textAlign: 'left',
            borderRadius: '6px',
            border: '1px solid var(--card-border)',
            background: 'rgba(255, 255, 255, 0.02)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.15s ease',
          };

          if (quizSubmitted) {
            if (idx === q.correct) {
              btnStyle.background = 'rgba(16, 185, 129, 0.15)';
              btnStyle.border = '1px solid #10b981';
              btnStyle.color = '#10b981';
            } else if (idx === selectedAnswer) {
              btnStyle.background = 'rgba(239, 68, 68, 0.15)';
              btnStyle.border = '1px solid #ef4444';
              btnStyle.color = '#ef4444';
            } else {
              btnStyle.opacity = 0.5;
            }
          } else if (idx === selectedAnswer) {
            btnStyle.background = 'var(--accent-primary)';
            btnStyle.border = '1px solid var(--accent-primary)';
            btnStyle.color = '#fff';
          }

          return (
            <button
              key={idx}
              style={btnStyle}
              onClick={() => handleSelectAnswer(idx)}
              disabled={quizSubmitted}
            >
              {option}
            </button>
          );
        })}
      </div>

      {quizSubmitted && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '6px',
          borderLeft: '4px solid var(--accent-secondary)',
          marginBottom: '24px',
          animation: 'fadeInM5 0.2s ease-out'
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            <strong>Explanation:</strong> {q.explanation}
          </p>
        </div>
      )}

      <div className="stepper-nav-footer">
        <button
          className="quiz-btn quiz-btn-secondary"
          onClick={() => {
            if (currentQuestion > 0) {
              setCurrentQuestion(prev => prev - 1);
              setSelectedAnswer(null);
              setQuizSubmitted(false);
            }
          }}
          disabled={currentQuestion === 0 || quizSubmitted}
        >
          ← Previous
        </button>

        {!quizSubmitted ? (
          <button
            className="quiz-btn quiz-btn-primary"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
          >
            Submit Answer
          </button>
        ) : (
          <button className="quiz-btn quiz-btn-primary" onClick={handleNext}>
            {currentQuestion === quizQuestions.length - 1 ? 'Finish Challenge' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  );
}
