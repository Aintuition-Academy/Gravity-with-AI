import React, { useState, useEffect } from 'react';
import './Module8.css';
import { BookOpen, Lightbulb, Calculator, HelpCircle, BarChart2, ArrowRight, Play, RefreshCw, Layers } from 'lucide-react';

/* ════════════════════════════════════════════════════════════════════════
   REUSABLE INTERACTIVE COMPONENTS FOR PEDAGOGY
   ════════════════════════════════════════════════════════════════════════ */

function DefinitionBox({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen && window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [isOpen]);

  return (
    <div 
      className="tutor-tip-box" 
      style={{ 
        borderLeft: '4px solid var(--accent-primary)',
        cursor: 'pointer',
        background: 'rgba(244, 63, 94, 0.02)',
        marginBottom: '1rem',
        padding: '12px 16px',
        borderRadius: '4px',
        transition: 'all 0.2s ease'
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <div style={{ color: 'var(--accent-primary)', marginTop: '2px' }}>
          <BookOpen size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ color: 'var(--accent-primary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em', margin: 0, fontWeight: 700 }}>
              Definition: {title}
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {isOpen ? 'Click to collapse ▲' : 'Click to expand ▼'}
            </span>
          </div>
          {isOpen && (
            <div style={{ margin: '8px 0 0 0', fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function IntuitionBox({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen && window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [isOpen]);

  return (
    <div 
      className="tutor-tip-box" 
      style={{ 
        borderLeft: '4px solid #eab308',
        cursor: 'pointer',
        background: 'rgba(234, 179, 8, 0.02)',
        marginBottom: '1rem',
        padding: '12px 16px',
        borderRadius: '4px',
        transition: 'all 0.2s ease'
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <div style={{ color: '#eab308', marginTop: '2px' }}>
          <Lightbulb size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ color: '#eab308', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em', margin: 0, fontWeight: 700 }}>
              Intuition: {title}
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {isOpen ? 'Click to collapse ▲' : 'Click to expand ▼'}
            </span>
          </div>
          {isOpen && (
            <div style={{ margin: '8px 0 0 0', fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DerivationBox({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen && window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [isOpen]);

  return (
    <div 
      className="tutor-tip-box" 
      style={{ 
        borderLeft: '4px solid #8b5cf6',
        cursor: 'pointer',
        background: 'rgba(139, 92, 246, 0.02)',
        marginBottom: '1rem',
        padding: '12px 16px',
        borderRadius: '4px',
        transition: 'all 0.2s ease'
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <div style={{ color: '#8b5cf6', marginTop: '2px' }}>
          <Calculator size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ color: '#8b5cf6', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em', margin: 0, fontWeight: 700 }}>
              Derivation: {title}
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {isOpen ? 'Click to collapse ▲' : 'Click to expand ▼'}
            </span>
          </div>
          {isOpen && (
            <div style={{ margin: '8px 0 0 0', fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmpiricalFactBox({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen && window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [isOpen]);

  return (
    <div 
      className="tutor-tip-box" 
      style={{ 
        borderLeft: '4px solid #06b6d4',
        cursor: 'pointer',
        background: 'rgba(6, 182, 212, 0.02)',
        marginBottom: '1rem',
        padding: '12px 16px',
        borderRadius: '4px',
        transition: 'all 0.2s ease'
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <div style={{ color: '#06b6d4', marginTop: '2px' }}>
          <Layers size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ color: '#06b6d4', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em', margin: 0, fontWeight: 700 }}>
              Empirical Fact: {title}
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {isOpen ? 'Click to collapse ▲' : 'Click to expand ▼'}
            </span>
          </div>
          {isOpen && (
            <div style={{ margin: '8px 0 0 0', fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DerivationStepper({ title, steps }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [currentStep]);

  return (
    <div className="sub-step-box" style={{ 
      margin: '1.5rem 0', 
      border: '1px solid var(--card-border)', 
      borderRadius: '8px', 
      padding: '16px', 
      background: 'rgba(255, 255, 255, 0.01)' 
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid var(--card-border)',
        paddingBottom: '8px',
        marginBottom: '12px'
      }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '6px' }}>
          🧮 {title}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Step {currentStep + 1} of {steps.length}
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button 
              className="quiz-btn quiz-btn-secondary" 
              style={{ padding: '2px 8px', fontSize: '0.75rem', minWidth: 'auto', height: '26px' }}
              onClick={(e) => { e.stopPropagation(); setCurrentStep(prev => Math.max(0, prev - 1)); }}
              disabled={currentStep === 0}
            >
              ←
            </button>
            <button 
              className="quiz-btn quiz-btn-primary" 
              style={{ padding: '2px 8px', fontSize: '0.75rem', minWidth: 'auto', height: '26px' }}
              onClick={(e) => { e.stopPropagation(); setCurrentStep(prev => Math.min(steps.length - 1, prev + 1)); }}
              disabled={currentStep === steps.length - 1}
            >
              →
            </button>
          </div>
        </div>
      </div>
      <div style={{ minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
          {steps[currentStep].explanation}
        </p>
        <div style={{ 
          background: 'rgba(0,0,0,0.2)', 
          padding: '10px 14px', 
          borderRadius: '4px',
          overflowX: 'auto',
          margin: '4px 0 0 0',
          textAlign: 'center',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)'
        }}>
          {steps[currentStep].math}
        </div>
      </div>
    </div>
  );
}

function LessonQuiz({ title, questions }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [currentIdx, isAnswered, showResult]);

  const handleOptionClick = (optIdx) => {
    if (isAnswered) return;
    setSelectedOpt(optIdx);
    setIsAnswered(true);
    if (optIdx === questions[currentIdx].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextClick = () => {
    setSelectedOpt(null);
    setIsAnswered(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  const activeQuestion = questions[currentIdx];

  return (
    <div className="section-quiz-card" style={{ 
      marginTop: '24px', 
      padding: '20px', 
      border: '1px solid var(--card-border)', 
      borderRadius: '8px', 
      background: 'rgba(255,255,255,0.02)' 
    }}>
      <h4 style={{ color: 'var(--accent-secondary)', margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: 600 }}>
        📝 {title} Quick Assessment
      </h4>
      {showResult ? (
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <h5 style={{ fontSize: '1.1rem', margin: '10px 0', color: 'var(--text-primary)' }}>Quiz Completed!</h5>
          <div style={{ 
            margin: '15px auto', 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            background: 'rgba(244, 63, 94, 0.1)', 
            border: '2px solid var(--accent-primary)' 
          }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{score}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/{questions.length}</span>
          </div>
          <button onClick={handleRestart} className="quiz-btn quiz-btn-secondary" style={{ margin: '10px auto 0 auto' }}>
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            <span>Question {currentIdx + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>
          <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: '0 0 16px 0', color: 'var(--text-primary)', lineHeight: '1.4' }}>
            {activeQuestion.question}
          </p>
          <div className="quiz-options-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeQuestion.options.map((option, idx) => {
              let btnStyle = {
                padding: '10px 14px',
                textAlign: 'left',
                borderRadius: '6px',
                border: '1px solid var(--card-border)',
                background: 'rgba(255,255,255,0.03)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'all 0.15s ease',
              };

              if (isAnswered) {
                if (idx === activeQuestion.correctIndex) {
                  btnStyle.background = 'rgba(16, 185, 129, 0.15)';
                  btnStyle.border = '1px solid #10b981';
                  btnStyle.color = '#10b981';
                } else if (idx === selectedOpt) {
                  btnStyle.background = 'rgba(239, 68, 68, 0.15)';
                  btnStyle.border = '1px solid #ef4444';
                  btnStyle.color = '#ef4444';
                } else {
                  btnStyle.opacity = 0.5;
                }
              } else if (idx === selectedOpt) {
                btnStyle.background = 'var(--accent-primary)';
                btnStyle.border = '1px solid var(--accent-primary)';
                btnStyle.color = '#fff';
              }

              return (
                <button
                  key={idx}
                  style={btnStyle}
                  onClick={() => handleOptionClick(idx)}
                  disabled={isAnswered}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div style={{ 
              marginTop: '16px', 
              padding: '12px', 
              background: 'rgba(255, 255, 255, 0.03)', 
              borderRadius: '6px', 
              borderLeft: '4px solid var(--accent-secondary)',
              animation: 'fadeInM8 0.2s ease-out'
            }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                <strong>Explanation:</strong> {activeQuestion.explanation}
              </p>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button
              className="quiz-btn quiz-btn-primary"
              onClick={handleNextClick}
              disabled={!isAnswered}
              style={{ padding: '6px 16px', fontSize: '0.85rem' }}
            >
              {currentIdx === questions.length - 1 ? 'Finish Challenge' : 'Next Question →'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   FINAL EXAM QUESTIONS DATA
   ════════════════════════════════════════════════════════════════════════ */

const finalQuestions = [
  {
    question: "F1. In Costinot-Donaldson-Smith, a plot’s land productivity draw is:",
    options: [
      "a single national number",
      "a Fréchet-distributed random variable specific to that plot and crop",
      "always equal across crops",
      "irrelevant to output"
    ],
    correctIndex: 1,
    explanation: "Correct! CDS model plots as heterogeneous micro-units drawing crop-specific Fréchet yields."
  },
  {
    question: "F2. FAO-GAEZ “potential yield” should be interpreted as:",
    options: [
      "the observed yield on a field",
      "the yield if the field were entirely devoted to one crop — an agro-climatic, not socio-economic, measure",
      "a price index",
      "a labor supply elasticity"
    ],
    correctIndex: 1,
    explanation: "Correct! FAO-GAEZ is purely agro-climatic, ignoring socioeconomic factors and specialization."
  },
  {
    question: "F3. In CDS’s counterfactual, freezing the production margin (crop switching) relative to full adjustment:",
    options: [
      "roughly triples the world welfare loss from climate change",
      "eliminates all losses",
      "has no effect",
      "only matters for trade"
    ],
    correctIndex: 0,
    explanation: "Correct! The world welfare loss triples if farmers cannot switch crops within their fields."
  },
  {
    question: "F4. Farrokhi-Pellegrina’s generalized Fréchet nests:",
    options: [
      "countries within crops",
      "crops (dispersion θ1) and, within each crop, technologies (dispersion θ2)",
      "only technologies, no crops",
      "only labor, no land"
    ],
    correctIndex: 1,
    explanation: "Correct! A two-tier distribution: the upper tier across crops, and lower tier across modern vs traditional options."
  },
  {
    question: "F5. The Farrokhi-Pellegrina gains-from-trade formula Gi = 1 - λ_ii^(1/(σ-1)) * α_i,0^(1/θ2) shows that the classical ACR formula alone:",
    options: [
      "fully captures all gains from trade in agriculture",
      "misses gains from imported-input-driven technology adoption, captured by the second term",
      "is exactly equal to the technology term",
      "does not apply to agriculture"
    ],
    correctIndex: 1,
    explanation: "Correct! The technology-adoption term (α_i,0) represents additional gains from importing modern farm inputs."
  },
  {
    question: "F6. Empirical Pattern 3 in Farrokhi-Pellegrina (large yield premia not varying systematically with income) implies that cross-country adoption gaps mostly reflect:",
    options: [
      "agro-climatic potential differences",
      "economic incentives (prices, market access) rather than agronomy",
      "random noise",
      "labor supply"
    ],
    correctIndex: 1,
    explanation: "Correct! Yield premia exist everywhere, indicating that lack of adoption is driven by prices and access barriers."
  },
  {
    question: "F7. In the Herrendorf-Rogerson-Valentinyi benchmark model, the key decomposition is:",
    options: [
      "growth equals structural transformation exactly",
      "growth (intertemporal problem, driven by A_xt) is separate from structural transformation (static allocation problem)",
      "there is no growth in the model",
      "all sectors grow at the same rate always"
    ],
    correctIndex: 1,
    explanation: "Correct! Growth and reallocation aggregate separate intertemporal and static decisions."
  },
  {
    question: "F8. A generalized balanced growth path (GBGP) requires:",
    options: [
      "constant sectoral shares",
      "a constant real interest rate while sectoral shares evolve freely",
      "zero technology growth",
      "constant relative prices"
    ],
    correctIndex: 1,
    explanation: "Correct! Real interest rates must lock while sectoral allocations are permitted to shift."
  },
  {
    question: "F9. The Ngai-Pissarides mechanism for structural transformation relies on:",
    options: [
      "subsistence consumption alone",
      "differential sectoral TFP growth combined with low substitutability across sectors",
      "free trade",
      "labor mobility frictions"
    ],
    correctIndex: 1,
    explanation: "Correct! Fast TFP growth in a sector with low elasticity of substitution causes its nominal value-added share to fall."
  },
  {
    question: "F10. Opening a structural-transformation economy to international trade:",
    options: [
      "makes production and expenditure shares identical by construction",
      "breaks the tight closed-economy link between production and expenditure shares, since firms specialize by comparative advantage",
      "eliminates all sectors but one",
      "has no effect on manufacturing’s hump shape"
    ],
    correctIndex: 1,
    explanation: "Correct! Trade decouples domestic production from consumption bundles through specialization."
  },
  {
    question: "F11. Lagakos-Waugh’s central empirical fact is that cross-country productivity gaps are:",
    options: [
      "identical across agriculture and non-agriculture",
      "roughly ten times larger in agriculture (45×) than non-agriculture (4×)",
      "larger in non-agriculture",
      "zero in both sectors"
    ],
    correctIndex: 1,
    explanation: "Correct! Gaps are 45× in agriculture vs. 4× in non-agriculture (a 10.7× ratio)."
  },
  {
    question: "F12. In the Lagakos-Waugh Roy model, a worker selects into non-agriculture when:",
    options: [
      "z^n_i / z^a_i ≥ p_a",
      "z^a_i / z^n_i ≥ p_a",
      "wages are equal in both sectors regardless of type",
      "never"
    ],
    correctIndex: 0,
    explanation: "Correct! Roy selection dictates workers sort based on relative efficiency vs relative prices."
  },
  {
    question: "F13. Proposition 2 in Lagakos-Waugh states that positive sorting on comparative advantage:",
    options: [
      "shrinks the agricultural productivity gap below the efficiency gap A^R/A^P",
      "amplifies the agricultural gap above A^R/A^P and shrinks the non-agricultural gap below it",
      "has no effect on measured gaps",
      "only affects non-agriculture"
    ],
    correctIndex: 1,
    explanation: "Correct! Selection pushes high-productivity workers into rich-country farming, amplifying the measured gap."
  },
  {
    question: "F14. The calibrated Lagakos-Waugh model explains roughly what share of the observed 10.7× agriculture/non-agriculture productivity-gap amplification?",
    options: [
      "0%",
      "about half (model ratio 2.2 vs. 1.0 with no selection, against a 10.7 target)",
      "100% exactly",
      "over 200%"
    ],
    correctIndex: 1,
    explanation: "Correct! Model selection yields a ratio of 2.2, covering about 50% of the target amplification."
  },
  {
    question: "F15. In Hsiao-Moscona-Sastry, domestic extreme heat and foreign extreme heat move the Nominal Rate of Assistance (NRA):",
    options: [
      "in the same direction",
      "in opposite directions — domestic heat lowers NRA (pro-consumer), foreign heat raises NRA (pro-producer)",
      "only through input policy",
      "not at all"
    ],
    correctIndex: 1,
    explanation: "Correct! Domestic shocks spark consumer protection; foreign shocks prompt export-revenue seeking."
  },
  {
    question: "F16. Under utilitarian political weights (λ_P = λ_C = λ_G), optimal border policy α* in the Hsiao-Moscona-Sastry model:",
    options: [
      "responds strongly to domestic and foreign shocks",
      "collapses to the pure terms-of-trade benchmark -1/ε_x, independent of shocks",
      "is always positive",
      "is undefined"
    ],
    correctIndex: 1,
    explanation: "Correct! Equal weights collapse politics, leaving only terms-of-trade manipulation."
  },
  {
    question: "F17. The paper’s headline normative finding on endogenous food policy is that it is:",
    options: [
      "always globally welfare-improving",
      "can be globally regressive even though domestically politically rational",
      "irrelevant to welfare",
      "beneficial only to foreign producers"
    ],
    correctIndex: 1,
    explanation: "Correct! Border interventions shift price shocks onto poorer, heat-exposed countries."
  },
  {
    question: "F18. In Nath (2025), the food-problem condition requires:",
    options: [
      "low trade costs and homothetic preferences",
      "high trade costs (large domestic trade share π_akk) together with non-homothetic, low-substitutability preferences",
      "σ > 1",
      "no agriculture sector"
    ],
    correctIndex: 1,
    explanation: "Correct! Food necessity and barriers prevent countries from importing food when hit by shocks."
  },
  {
    question: "F19. Under frictionless trade, Nath’s Corollary 1 shows that a small country’s food problem:",
    options: [
      "is maximized",
      "disappears, since the domestic-price term (A) vanishes as π_akk → 0",
      "is unaffected",
      "only appears for rich countries"
    ],
    correctIndex: 1,
    explanation: "Correct! Frictionless imports completely insure against local agricultural TFP shocks."
  },
  {
    question: "F20. At current (high) trade costs, Nath’s calibration implies climate change:",
    options: [
      "lowers agriculture’s GDP share in the poorest quartile of countries",
      "raises agriculture’s GDP share in the poorest quartile by about 2.8 percentage points, a genuine food problem",
      "has zero effect on any country",
      "only affects rich countries"
    ],
    correctIndex: 1,
    explanation: "Correct! Warming forces poor countries to allocate 2.8 percentage points more GDP to food."
  },
  {
    question: "F21. What is the common mathematical thread linking the Roy-Fréchet selection models of Costinot-Donaldson-Smith, Farrokhi-Pellegrina, and Lagakos-Waugh?",
    options: [
      "heterogeneous units (plots or workers) draw random productivities and select into the option with the highest return, and Fréchet dispersion parameters govern how responsive that selection is to relative-return changes",
      "they all assume homogeneous agents",
      "none of them use discrete choice",
      "they all study only manufacturing"
    ],
    correctIndex: 0,
    explanation: "Correct! The Roy-Fréchet framework models sorting over random yields or worker efficiencies."
  },
  {
    question: "F22. Which single policy lever appears, in one form or another, throughout all six papers in this module as the key determinant of how much climate/trade shocks damage welfare?",
    options: [
      "the level of (natural and policy-induced) trade costs",
      "the interest rate",
      "the level of nominal wages",
      "the exchange rate regime"
    ],
    correctIndex: 0,
    explanation: "Correct! Trade costs dictate whether countries can adjust to localized shocks or remain trapped."
  }
];

export default function Module8({ theme, setActiveTab }) {
  const [moduleTab, setModuleTab] = useState("8.1 — Fréchet Yields");

  useEffect(() => {
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [moduleTab]);

  // ──────────────────────────────────────────────────────────────────────
  // TAB 8.1 STATES: FIELD-LEVEL YIELDS & CROP SELECTION
  // ──────────────────────────────────────────────────────────────────────
  const [wheatMean, setWheatMean] = useState(0);
  const [wheatSkew, setWheatSkew] = useState(25);
  const [riceMean, setRiceMean] = useState(-30);
  const [riceSkew, setRiceSkew] = useState(30);

  // Plot-level simulator states
  const [priceRice, setPriceRice] = useState(1.2);
  const [priceWheat, setPriceWheat] = useState(1.0);
  const [yieldRice, setYieldRice] = useState(2.0);
  const [yieldWheat, setYieldWheat] = useState(1.8);
  const [theta1, setTheta1] = useState(2.46);

  const returnRice = priceRice * yieldRice;
  const returnWheat = priceWheat * yieldWheat;
  const alphaVal = 1.2; // manufacturing alternative return
  const denom = Math.pow(alphaVal, theta1) + Math.pow(returnRice, theta1) + Math.pow(returnWheat, theta1);
  const shareRice = ((Math.pow(returnRice, theta1) / denom) * 100).toFixed(1);
  const shareWheat = ((Math.pow(returnWheat, theta1) / denom) * 100).toFixed(1);
  const shareIdle = (100 - parseFloat(shareRice) - parseFloat(shareWheat)).toFixed(1);

  // ──────────────────────────────────────────────────────────────────────
  // TAB 8.2 STATES: THREE SCENARIOS WELFARE COST
  // ──────────────────────────────────────────────────────────────────────
  const [activeCountry, setActiveCountry] = useState("World"); // World, Canada, Malawi
  const countryWelfare = {
    World: { full: -0.26, noProd: -0.78, noTrade: -0.27 },
    Canada: { full: 10.0, noProd: 5.5, noTrade: 2.1 },
    Malawi: { full: -49.0, noProd: -58.2, noTrade: -52.0 }
  };

  // ──────────────────────────────────────────────────────────────────────
  // TAB 8.3 STATES: TECHNOLOGY-ADOPTION PPF
  // ──────────────────────────────────────────────────────────────────────
  const [theta2, setTheta2] = useState(4.51);

  // ──────────────────────────────────────────────────────────────────────
  // TAB 8.4 STATES: INPUT VS OUTPUT GLOBALIZATION
  // ──────────────────────────────────────────────────────────────────────
  const [globMode, setGlobMode] = useState("input"); // input, output

  // ──────────────────────────────────────────────────────────────────────
  // TAB 8.5 STATES: STYLIZED REALLOCATION SHARES
  // ──────────────────────────────────────────────────────────────────────
  const [devLevel, setDevLevel] = useState(4); // 1 (Poor) to 10 (Rich)

  // ──────────────────────────────────────────────────────────────────────
  // TAB 8.6 STATES: DIVERGENCE OF PROD VS EXPENDITURE SHARES
  // ──────────────────────────────────────────────────────────────────────
  const [economyOpen, setEconomyOpen] = useState(false);

  // ──────────────────────────────────────────────────────────────────────
  // TAB 8.7 STATES: ROY SELECTION SCATTER
  // ──────────────────────────────────────────────────────────────────────
  const [royPa, setRoyPa] = useState(1.0); // relative price of agriculture
  const workers = [
    { id: 1, za: 1.2, zn: 1.8 },
    { id: 2, za: 2.1, zn: 1.5 },
    { id: 3, za: 0.8, zn: 1.4 },
    { id: 4, za: 1.5, zn: 1.0 },
    { id: 5, za: 2.5, zn: 2.8 },
    { id: 6, za: 0.5, zn: 0.9 },
    { id: 7, za: 1.9, zn: 1.2 },
    { id: 8, za: 1.1, zn: 2.2 },
    { id: 9, za: 2.8, zn: 1.6 },
    { id: 10, za: 0.9, zn: 0.5 }
  ];

  // ──────────────────────────────────────────────────────────────────────
  // TAB 8.9 STATES: REGIONAL SHOCKS ON NRA
  // ──────────────────────────────────────────────────────────────────────
  const [nraShockMode, setNraShockMode] = useState("domestic"); // domestic, foreign

  // ──────────────────────────────────────────────────────────────────────
  // TAB 8.10 STATES: GOVERNMENT POLITICAL calculator
  // ──────────────────────────────────────────────────────────────────────
  const [lambdaC, setLambdaC] = useState(1.0);
  const [lambdaP, setLambdaP] = useState(1.5);
  const [lambdaG, setLambdaG] = useState(1.2);
  const [epsD, setEpsD] = useState(0.3);
  const [epsS, setEpsS] = useState(0.4);
  const [epsX, setEpsX] = useState(1.5);

  const getPEPolicy = () => {
    const r = 0.6; // Self-sufficiency ratio (y/q)
    const numerator = lambdaP * r + lambdaG * (1 - r) - lambdaC;
    const denominator = lambdaG * (epsS * r + epsD) - numerator;
    if (Math.abs(denominator) < 0.05) return "0.00";
    const optimalAlpha = (numerator / (epsX * denominator)).toFixed(3);
    return optimalAlpha;
  };

  const optimalAlpha = getPEPolicy();
  const isRedistributive = ((epsS * lambdaC + epsD * lambdaP) / (epsS + epsD)) > lambdaG;

  // ──────────────────────────────────────────────────────────────────────
  // TAB 8.11 STATES: BUDGET SHAPE VS INCOME
  // ──────────────────────────────────────────────────────────────────────
  const [realIncome, setRealIncome] = useState(1.0); // 0.2 to 5.0

  // ──────────────────────────────────────────────────────────────────────
  // TAB 8.12 STATES: CAUSAL ANATOMY STEPPER
  // ──────────────────────────────────────────────────────────────────────
  const [causalStep, setCausalStep] = useState(1);

  // ──────────────────────────────────────────────────────────────────────
  // FINAL EXAM STATES
  // ──────────────────────────────────────────────────────────────────────
  const [currentExamIdx, setCurrentExamIdx] = useState(0);
  const [selectedExamOpt, setSelectedExamOpt] = useState(null);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [showExamResults, setShowExamResults] = useState(false);
  const [examAnswers, setExamAnswers] = useState({});

  const handleExamOptionClick = (optIdx) => {
    if (examSubmitted) return;
    setSelectedExamOpt(optIdx);
  };

  const handleExamSubmit = () => {
    if (selectedExamOpt === null || examSubmitted) return;
    const isCorrect = selectedExamOpt === finalQuestions[currentExamIdx].correctIndex;
    setExamAnswers(prev => ({
      ...prev,
      [currentExamIdx]: { selected: selectedExamOpt, correct: isCorrect }
    }));
    if (isCorrect) {
      setExamScore(prev => prev + 1);
    }
    setExamSubmitted(true);
  };

  const handleExamNext = () => {
    if (currentExamIdx < finalQuestions.length - 1) {
      setCurrentExamIdx(prev => prev + 1);
      setSelectedExamOpt(null);
      setExamSubmitted(false);
    } else {
      setShowExamResults(true);
    }
  };

  const handleExamRestart = () => {
    setCurrentExamIdx(0);
    setSelectedExamOpt(null);
    setExamSubmitted(false);
    setExamScore(0);
    setShowExamResults(false);
    setExamAnswers({});
  };

  return (
    <div className="container module8-container" style={{ padding: '40px 24px' }}>
      
      {/* ── Header ── */}
      <div className="module-header">
        <button onClick={() => setActiveTab('home')} className="back-btn">
          <span>← Back to Course Path</span>
        </button>
        <div className="module-title-row">
          <div>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Module 8
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '4px' }}>Trade, Climate Change, and Agricultural/Environmental Economics</h2>
          </div>
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="module-sections-nav" style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        {[
          ["8.1 — Fréchet Yields", "8.1 Fréchet Yields"],
          ["8.2 — Welfare Consequences", "8.2 Welfare Costs"],
          ["8.3 — Input Patterns", "8.3 Input Patterns & PPF"],
          ["8.4 — Gains Decomp", "8.4 Gains & Globalization"],
          ["8.5 — Growth facts", "8.5 Growth & Reallocation"],
          ["8.6 — Price vs Income", "8.6 Price vs Income Trade"],
          ["8.7 — Roy Selection", "8.7 Roy Selection Model"],
          ["8.8 — Amplification Gaps", "8.8 Amplification Gaps"],
          ["8.9 — Policy & Heat Shocks", "8.9 Policy & Shocks"],
          ["8.10 — Political Economy", "8.10 Political Economy"],
          ["8.11 — Non-Homothetic EK", "8.11 Non-Homothetic EK"],
          ["8.12 — Food Problem", "8.12 Food Problem Condition"],
          ["8.13 — Final Exam", "8.13 Final Exam"]
        ].map(([keyName, label]) => (
          <button 
            key={keyName} 
            className={`tab-btn ${moduleTab === keyName ? 'active' : ''}`} 
            onClick={() => setModuleTab(keyName)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          8.1 — CLIMATE CHANGE & FRECHET YIELDS
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "8.1 — Fréchet Yields" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 8.1: Climate Change, Comparative Advantage, and the Fréchet Model of Field-Level Yields</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              Based on Part I: Costinot, Donaldson & Smith (2016, JPE), "Evolving Comparative Advantage and the Impact of Climate Change..."
            </p>

            <IntuitionBox title="Philippines/Rice crop switching margin">
              {`If climate change damages rice productivity in the Philippines, adjustments can cushion the blow: 
              1. Production-side: Farmers reallocate land towards crops whose productivity is less affected.
              2. Trade-side: Consumers import more rice from countries experiencing lower climate damages. Both operate via comparative advantage.`}
            </IntuitionBox>

            <DefinitionBox title="FAO-GAEZ potential yields vs. Setup">
              {`- FAO-GAEZ Potential Yields: Agro-climatic constructs (soil, temperature, rainfall) mapping potential productivity if the entire field were devoted to a single crop. Not observed socioeconomic yields.
              - Model Environment: N countries, K crops, land organized into fields $f \\in F_i$, and plot-level continuum $\\omega \\in [0, 1]$. Iceberg costs $d_{ij,k}$ apply.`}
            </DefinitionBox>

            <DerivationBox title="The Roy-Fréchet Plot Problem & Land Shares">
              {`Plot technology is modeled as Fréchet draws:
              $$A^f_{i,k}(\\omega) \\sim \\exp(-A^f_{i,k}\\cdot z^{-\\theta})$$
              A plot selects the crop maximizing revenue, or stays idle (earning wage $w_i = A^0_i$ from manufacturing):
              $$\\max \\{ p_{i,1}A^f_{i,1}(\\omega), \\dots, p_{i,K}A^f_{i,K}(\\omega), w_i N^f_i(\\omega) \\}$$
              Aggregating choices yields the closed-form land-share formula:
              $$\\pi^f_{i,k} = \\frac{(p_{i,k}A^f_{i,k})^\\theta}{(\\alpha_i)^\\theta + \\sum_{k'}(p_{i,k'}A^f_{i,k'})^\\theta}$$
              Due to selection, conditional productivity on planted plots exceeds the unconditional mean, scaling with $(\\pi^f_{i,k})^{-1/\\theta}$.`}
            </DerivationBox>

            <LessonQuiz 
              title="Lesson 8.1"
              questions={[
                {
                  question: "Q1.1 FAO-GAEZ “potential yield” is best described as:",
                  options: [
                    "the yield actually observed on a field",
                    "the mean yield if the entire field were devoted to crop k, an agro-climatic (not socioeconomic) object",
                    "the labor cost of producing crop k",
                    "a market price"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! GAEZ represents agro-ecological crop potentials, not actual selections."
                },
                {
                  question: "Q1.2 The two margins of climate adaptation in CDS are:",
                  options: [
                    "saving and investment",
                    "production (switching crops within a country) and trade (switching source countries)",
                    "migration and fertility",
                    "monetary and fiscal policy"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! These adjustment channels permit adaptation by changing outputs and trade partners."
                },
                {
                  question: "Q1.3 A plot is allocated to crop k in equilibrium only when:",
                  options: [
                    "its productivity draw for k delivers the highest return among all crops and the outside option",
                    "the government mandates it",
                    "θ = 0",
                    "all crops are grown with equal probability"
                  ],
                  correctIndex: 0,
                  explanation: "Correct! Sorting follows plot-level optimization over price-adjusted yield draws."
                },
                {
                  question: "Q1.4 Because plots select into crops based on favorable draws, conditional mean productivity on planted land is:",
                  options: [
                    "equal to the unconditional mean",
                    "lower than the unconditional mean",
                    "higher than the unconditional mean, scaling with (π^f_{i,k})^{-1/θ}",
                    "undefined"
                  ],
                  correctIndex: 2,
                  explanation: "Correct! The truncated-mean property ensures that only fields with favorable draws are active, elevating conditional yield."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Yield Change Density &amp; Plot Simulator</span>
            
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>Wheat Yield Change Center: <span className="val-highlight">{wheatMean}%</span></label>
                <input type="range" min="-80" max="80" step="5" value={wheatMean} onChange={e => setWheatMean(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>Rice Yield Change Center: <span className="val-highlight-purple">{riceMean}%</span></label>
                <input type="range" min="-80" max="80" step="5" value={riceMean} onChange={e => setRiceMean(Number(e.target.value))} className="range-slider slider-purple" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="160" viewBox="0 0 400 160" style={{ background: '#0f172a', borderRadius: '6px' }}>
                {/* Wheat Density curve */}
                <path 
                  d={`M ${Array.from({ length: 40 }).map((_, i) => {
                    const x = i * 10;
                    const val = x - 200 - wheatMean;
                    const y = 130 - Math.exp(-Math.pow(val / wheatSkew, 2)) * 80;
                    return `${x} ${y}`;
                  }).join(" L ")}`}
                  fill="none" stroke="var(--accent-primary)" strokeWidth="3"
                />
                <text x="310" y="30" fill="var(--accent-primary)" fontSize="9" fontWeight="bold">Wheat</text>

                {/* Rice Density curve */}
                <path 
                  d={`M ${Array.from({ length: 40 }).map((_, i) => {
                    const x = i * 10;
                    const val = x - 200 - riceMean;
                    const y = 130 - Math.exp(-Math.pow(val / riceSkew, 2)) * 80;
                    return `${x} ${y}`;
                  }).join(" L ")}`}
                  fill="none" stroke="#8b5cf6" strokeWidth="3"
                />
                <text x="310" y="50" fill="#8b5cf6" fontSize="9" fontWeight="bold">Rice</text>

                <line x1="50" y1="130" x2="350" y2="130" stroke="#475569" strokeWidth="2" />
                <line x1="200" y1="20" x2="200" y2="130" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
                <text x="200" y="145" textAnchor="middle" fill="var(--text-muted)" fontSize="9">Potential Yield Change (%)</text>
              </svg>
            </div>

            {/* Plot selection simulator */}
            <span className="svg-title" style={{ marginTop: '12px' }}>🧮 Plot-level Crop Allocation Simulator</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr 1fr', padding: '12px', gap: '8px', marginBottom: '0' }}>
              <div className="slider-card">
                <label>{`Rice Price:`} <span className="val-highlight">{priceRice.toFixed(1)}</span></label>
                <input type="range" min="0.5" max="3.0" step="0.1" value={priceRice} onChange={e => setPriceRice(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>{`Rice Potential Yield:`} <span className="val-highlight">{yieldRice.toFixed(1)}</span></label>
                <input type="range" min="0.5" max="4.0" step="0.1" value={yieldRice} onChange={e => setYieldRice(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>{`Wheat Price:`} <span className="val-highlight-purple">{priceWheat.toFixed(1)}</span></label>
                <input type="range" min="0.5" max="3.0" step="0.1" value={priceWheat} onChange={e => setPriceWheat(Number(e.target.value))} className="range-slider slider-purple" />
              </div>
              <div className="slider-card">
                <label>{`Wheat Potential Yield:`} <span className="val-highlight-purple">{yieldWheat.toFixed(1)}</span></label>
                <input type="range" min="0.5" max="4.0" step="0.1" value={yieldWheat} onChange={e => setYieldWheat(Number(e.target.value))} className="range-slider slider-purple" />
              </div>
              <div className="slider-card" style={{ gridColumn: 'span 2' }}>
                <label>{`Dispersion parameter (\\theta):`} <span className="val-highlight-orange">{theta1.toFixed(2)}</span></label>
                <input type="range" min="1.0" max="6.0" step="0.1" value={theta1} onChange={e => setTheta1(Number(e.target.value))} className="range-slider slider-orange" />
              </div>
            </div>

            <div className="implications-panel" style={{ marginTop: '10px' }}>
              <div className="implications-grid">
                <div className="implication-stat-card">
                  <div className="implication-stat-val">{shareRice}%</div>
                  <div className="implication-stat-lbl">Rice Land Share</div>
                </div>
                <div className="implication-stat-card">
                  <div className="implication-stat-val purple-text">{shareWheat}%</div>
                  <div className="implication-stat-lbl">Wheat Land Share</div>
                </div>
                <div className="implication-stat-card">
                  <div className="implication-stat-val orange-text">{shareIdle}%</div>
                  <div className="implication-stat-lbl">Idle Land Share</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          8.2 — ESTIMATION & WELFARE COST OF CLIMATE CHANGE
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "8.2 — Welfare Consequences" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 8.2: Estimating Demand/Fréchet Supply Parameters &amp; Welfare Consequences</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              Based on Part I: Costinot, Donaldson & Smith (2016, JPE), "Evolving Comparative Advantage..."
            </p>

            <DerivationBox title="Nested Gravity Regressions & IVs">
              {`Bilateral trade equations can be log-linearized into nested gravity structures:
              $$\\ln(X_{ij,k}/X_{j,k}) = M_{j,k} + (1-\\sigma)\\ln p_{i,k} + \\epsilon_{ij,k}$$
              $$\\ln(X_{j,k}/X_j) = M_j + (1-\\kappa)\\ln P_{j,k} + \\epsilon_{j,k}$$
              Prices $p_{i,k}$ are instrumented with average field potential yields. Because potential yield is driven by agro-climatic factors, it is a valid supply instrument excluded from demand shocks.`}
            </DerivationBox>

            <DerivationBox title="Non-Linear Least Squares (NLS)">
              {`Since potential yields are directly observed, estimating the supply side requires identifying $\\alpha_i$ and $\\theta$. First, $\\alpha_i(\\theta)$ is calibrated to match national agricultural land. Then $\\theta$ is chosen via NLS to match log agricultural output:
              $$\\min_\\theta \\sum_{i,k} \\left[ \\ln Q_{i,k}(\\theta) - \\ln Q_{i,k}^{data} \\right]^2 \\quad \\text{s.t. Land matches data}$$`}
            </DerivationBox>

            <EmpiricalFactBox title="Estimated Parameters & Adjustment Scenarios">
              {`- Parameters: Elasticity across countries $\\sigma = 5.40$, across crops $\\kappa = 2.82$, supply dispersion $\\theta = 2.46$.
              - θ comparison: A low $\\theta$ (relative to $\\theta \\approx 4\\text{--}8$ in manufacturing) indicates high field heterogeneity across crops, granting large adjustment opportunities.
              - Scenarios: (1) Full adjustment, (2) No production adjustment (frozen crop shares), (3) No trade adjustment (frozen trade shares).`}
            </EmpiricalFactBox>

            <LessonQuiz 
              title="Lesson 8.2"
              questions={[
                {
                  question: "Q2.1 CDS instrument prices with average potential yield because it:",
                  options: [
                    "shifts demand directly",
                    "is an agro-climatic supply shifter plausibly excluded from the demand error",
                    "is set by governments",
                    "equals the wage"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Agro-ecological potentials act as exogenous cost shocks, identifying demand elasticities."
                },
                {
                  question: "Q2.2 Because potential yield is observed directly from FAO-GAEZ, estimating the supply side reduces to recovering:",
                  options: [
                    "only θ",
                    "only α_i",
                    "jointly (α_i, θ), matching agricultural land and output",
                    "nothing — the supply side is fully known"
                  ],
                  correctIndex: 2,
                  explanation: "Correct! National adjustment parameters and the dispersion theta are computed simultaneously."
                },
                {
                  question: "Q2.3 Freezing production adjustment (no crop switching) in the climate counterfactual:",
                  options: [
                    "has no effect on welfare",
                    "roughly triples the world welfare loss relative to full adjustment",
                    "eliminates the welfare loss",
                    "only affects trade shares"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Restricting farmers' ability to change crops dramatically elevates the real welfare damage of climate change."
                },
                {
                  question: "Q2.4 The estimated θ = 2.46 for land, compared to typical EK estimates of θ ≈ 4–8 for manufacturing, implies:",
                  options: [
                    "land productivity is less dispersed than manufacturing productivity",
                    "land productivity is more dispersed across crops within a field, giving strong scope for comparative-advantage reallocation",
                    "θ is not comparable across sectors",
                    "agriculture has no comparative advantage"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Lower shape theta means higher dispersion and thus greater gains from sorting land usage."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Welfare Scenarios &amp; Cross-Country Heterogeneity</span>
            <div style={{ display: 'flex', gap: '8px', padding: '4px' }}>
              {["World", "Canada", "Malawi"].map(country => (
                <button 
                  key={country} 
                  onClick={() => setActiveCountry(country)}
                  className={`quiz-btn ${activeCountry === country ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                  style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                >
                  {country}
                </button>
              ))}
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="20" y="30" fill="var(--text-secondary)" fontSize="11" fontWeight="bold">
                  {`Welfare Shock Response for: ${activeCountry}`}
                </text>

                {/* Scenario Bars */}
                {/* 1. Full Adjustment */}
                <rect 
                  x="60" 
                  y={countryWelfare[activeCountry].full >= 0 ? 100 - countryWelfare[activeCountry].full * 2 : 100} 
                  width="50" 
                  height={Math.abs(countryWelfare[activeCountry].full * 2)} 
                  fill="var(--accent-primary)" 
                />
                <text x="85" y={countryWelfare[activeCountry].full >= 0 ? 90 - countryWelfare[activeCountry].full * 2 : 115 + Math.abs(countryWelfare[activeCountry].full * 2)} textAnchor="middle" fill="var(--accent-primary)" fontSize="10" fontWeight="bold">
                  {countryWelfare[activeCountry].full.toFixed(2)}%
                </text>
                <text x="85" y="195" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Full Adj.</text>

                {/* 2. No Production Adjustment */}
                <rect 
                  x="170" 
                  y={countryWelfare[activeCountry].noProd >= 0 ? 100 - countryWelfare[activeCountry].noProd * 2 : 100} 
                  width="50" 
                  height={Math.abs(countryWelfare[activeCountry].noProd * 2)} 
                  fill="#8b5cf6" 
                />
                <text x="195" y={countryWelfare[activeCountry].noProd >= 0 ? 90 - countryWelfare[activeCountry].noProd * 2 : 115 + Math.abs(countryWelfare[activeCountry].noProd * 2)} textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">
                  {countryWelfare[activeCountry].noProd.toFixed(2)}%
                </text>
                <text x="195" y="195" textAnchor="middle" fill="var(--text-muted)" fontSize="8">No Prod. Adj</text>

                {/* 3. No Trade Adjustment */}
                <rect 
                  x="280" 
                  y={countryWelfare[activeCountry].noTrade >= 0 ? 100 - countryWelfare[activeCountry].noTrade * 2 : 100} 
                  width="50" 
                  height={Math.abs(countryWelfare[activeCountry].noTrade * 2)} 
                  fill="#f59e0b" 
                />
                <text x="305" y={countryWelfare[activeCountry].noTrade >= 0 ? 90 - countryWelfare[activeCountry].noTrade * 2 : 115 + Math.abs(countryWelfare[activeCountry].noTrade * 2)} textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">
                  {countryWelfare[activeCountry].noTrade.toFixed(2)}%
                </text>
                <text x="305" y="195" textAnchor="middle" fill="var(--text-muted)" fontSize="8">No Trade Adj</text>

                {/* Center Baseline */}
                <line x1="40" y1="100" x2="360" y2="100" stroke="#475569" strokeWidth="2" />
              </svg>
            </div>
            <div className="implications-panel">
              <span style={{ fontWeight: 600 }}>Scenario Context:</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {activeCountry === "World" 
                  ? "At the global level, freezing production adjustment (no crop switching) triples the welfare loss (-0.78% vs -0.26%)."
                  : activeCountry === "Canada"
                  ? "Canada benefits from warming due to agricultural frontiers shifting north, with trade limits reducing gains."
                  : "Malawi faces extreme welfare losses (-49%), illustrating that climate change hit equatorial poor countries catastrophically."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          8.3 — FOUR EMPIRICAL PATTERNS & THE ADOPTION MODEL
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "8.3 — Input Patterns" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 8.3: Technology Adoption &amp; Four Motivating Patterns</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              Based on Part II: Farrokhi & Pellegrina (2023, JPE), "Trade, Technology, and Agricultural Productivity."
            </p>

            <EmpiricalFactBox title="Four Empirical Patterns">
              {`- Pattern 1: Cost share of agricultural inputs and input-per-land use rise with GDP per capita (slopes of +0.09, +1.48).
              - Pattern 2: Two-thirds of farm machinery, fertilizer, and pesticides are imported; top 10 exporters supply 77-85% of world exports.
              - Pattern 3: Modern potential yields exceed traditional yields by a factor of 4-7 (e.g., 6.7x for soy, 4.0x for potato).
              - Pattern 4: Modern technology land share falls with distance to trade hubs (slope of -1.312).`}
            </EmpiricalFactBox>

            <DefinitionBox title="The Crop and Technology Choice Setup">
              {`Plot production of crop $k$ with technology $\\tau \\in \\{0, 1\\}$ (traditional, modern) uses inputs:
              $$Q^f_{i,k\\tau}(\\omega) = \\bar{q}_{k\\tau} [z^f_{i,k\\tau}(\\omega)] \\cdot [L^f_{i,k\\tau}(\\omega)]^{\\gamma^L_{k\\tau}} [N^f_{i,k\\tau}(\\omega)]^{\\gamma^N_{k\\tau}} \\prod_j [M_{j,f}(\\omega)]^{\\gamma^M_{k\\tau}\\lambda^j_k}$$
              Traditional uses no purchased inputs ($\\gamma^M_{k0} = 0$), while modern does ($\\gamma^M_{k1} > 0$).`}
            </DefinitionBox>

            <DerivationBox title="Generalized Nested Fréchet Distribution">
              {`Productivity draws follow a nested Fréchet distribution with crop dispersion $\\theta_1$ and technology dispersion $\\theta_2$:
              $$\\pi^f_{i,k\\tau} = \\frac{(H^f_{i,k})^{\\theta_1}}{\\sum_{k'}(H^f_{i,k'})^{\\theta_1}} \\times \\frac{(a^f_{i,k\\tau} h_{i,k\\tau})^{\\theta_2}}{(H^f_{i,k})^{\\theta_2}}$$
              where $H^f_{i,k} \\equiv \\left[ \\sum_\\tau (a^f_{i,k\\tau} h_{i,k\\tau})^{\\theta_2} \\right]^{1/\\theta_2}$. Curvature of the technology PPF is governed by $\\theta_2$.`}
            </DerivationBox>

            <LessonQuiz 
              title="Lesson 8.3"
              questions={[
                {
                  question: "Q3.1 Empirical Pattern 3 (large yield premia that don’t vary systematically with GDP per capita) is important because it shows:",
                  options: [
                    "poor countries have no agronomic potential for modern technology",
                    "the potential for modernization is broadly similar everywhere, so cross-country adoption gaps must reflect economic incentives, not agronomy",
                    "rich countries have higher potential yields",
                    "technology adoption is random"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! The presence of potential yield premiums worldwide implies economic barriers prevent adoption."
                },
                {
                  question: "Q3.2 In the generalized Fréchet, θ1 and θ2 respectively govern dispersion:",
                  options: [
                    "across countries; across crops",
                    "across crops within a field; across technologies within a crop",
                    "across technologies; across crops",
                    "across fields; across countries"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! θ1 drives crop selection, and θ2 drives traditional vs modern technology choice."
                },
                {
                  question: "Q3.3 Traditional technology differs from modern technology in the production function because:",
                  options: [
                    "traditional technology uses more land",
                    "traditional uses no purchased inputs (γM_k0 = 0), while modern uses them (γM_k1 > 0)",
                    "modern technology uses no labor",
                    "they have identical input shares"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Traditional farming operates purely on domestic land/labor without imported chemical/machinery inputs."
                },
                {
                  question: "Q3.4 Pattern 4 (adoption falls with distance to trade hubs) is evidence for:",
                  options: [
                    "the role of domestic and international market access in technology adoption, holding potential yield fixed",
                    "random measurement error",
                    "that only rich countries have hubs",
                    "that technology does not depend on geography"
                  ],
                  correctIndex: 0,
                  explanation: "Correct! Remoteness inflates internal transport costs, raising imported input prices and depressing adoption."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Curvature of the Technology PPF</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>{`Technology substitution elasticity (\\theta_2):`} <span className="val-highlight">{theta2.toFixed(2)}</span></label>
                <input type="range" min="1.1" max="8.0" step="0.2" value={theta2} onChange={e => setTheta2(Number(e.target.value))} className="range-slider" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                {/* Axes */}
                <line x1="50" y1="20" x2="50" y2="180" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="180" x2="350" y2="180" stroke="#475569" strokeWidth="2" />
                <text x="340" y="195" fill="var(--text-secondary)" fontSize="9" textAnchor="end">Modern Land Share (L_k1)</text>
                <text x="35" y="30" fill="var(--text-secondary)" fontSize="9" transform="rotate(-90 35 30)" textAnchor="end">Traditional Land Share (L_k0)</text>

                {/* PPF curve */}
                {/* Curve modeled as (L_k0^p + L_k1^p = 1) where p = theta2 */}
                <path 
                  d={`M ${Array.from({ length: 50 }).map((_, i) => {
                    const xPct = i / 49;
                    const yPct = Math.pow(1 - Math.pow(xPct, theta2), 1 / theta2);
                    const x = 50 + xPct * 260;
                    const y = 180 - yPct * 140;
                    return `${x} ${y}`;
                  }).join(" L ")}`}
                  fill="none" stroke="var(--accent-primary)" strokeWidth="3"
                />

                {/* Tangent slope illustration */}
                <line x1="120" y1="60" x2="240" y2="160" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
                <circle cx="180" cy="110" r="5" fill="#ef4444" />
                <text x="190" y="105" fill="#ef4444" fontSize="8" fontWeight="bold">Equilibrium Choice</text>
              </svg>
            </div>
            <div className="implications-panel">
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {`A lower θ2 index curves the PPF more sharply, representing higher heterogeneity in technology returns, preventing specialization.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          8.4 — GAINS DECOMP & GLOBALIZATION
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "8.4 — Gains Decomp" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 8.4: Gains from Trade and Globalization Counterfactuals</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              Based on Part II: Farrokhi & Pellegrina (2023, JPE), "Trade, Technology, and Agricultural Productivity."
            </p>

            <DerivationBox title="Gains-from-Trade Decomposition">
              {`Total gains from trade decompose into a classical ACR trade term and a technology-adoption term:
              $$G_i = 1 - \\underbrace{(\\lambda_{ii})^{\\frac{1}{\\sigma-1}}}_{\\text{Trade (ACR)}} \\times \\underbrace{(\\alpha_{i,0})^{\\frac{1}{\\theta_2}}}_{\\text{Technology (FP)}}$$
              - Example (Colombia): Evaluated at $\\lambda_{ii} = 0.85$ and $\\alpha_{i,0} = 0.55$, classical ACR estimates gains of 3.4%. Adding the technology term raises gains to 18.6% — quintupling the estimate!`}
            </DerivationBox>

            <DerivationBox title="Estimation Moments & Findings">
              {`- Moment 1 (Land vs. Yields): Pinpoints $\\theta_1 = 1.38$ (s.e. 0.19).
              - Moment 2 (Adoption vs. Internal Trade Frictions): Yields a slope of -10.67, pinning down $\\theta_2 = 4.51$ (s.e. 0.45).
              - Reversing Globalization to 1980 levels: Reversing input trade costs yields a -1.6% global welfare loss; output trade costs also yield -1.6% (total -3.3%).`}
            </DerivationBox>

            <IntuitionBox title="Who benefits from input vs output globalization?">
              {`- Output globalization (food imports) benefits poor countries most (high food budget share).
              - Input globalization (imported fertilizer, machinery) benefits middle-income countries most (they have room to scale technology adoption, unlike near-fully modernized rich countries or destitute poor countries).`}
            </IntuitionBox>

            <LessonQuiz 
              title="Lesson 8.4"
              questions={[
                {
                  question: "Q4.1 In the gains-from-trade decomposition, the second term (α_i,0)^(1/θ2) captures gains from:",
                  options: [
                    "lower trade costs on final goods only",
                    "access to imported agricultural inputs, enabling technology adoption",
                    "labor mobility",
                    "government subsidies"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! The FP term captures efficiency gains realized by switching from traditional to modern imported inputs."
                },
                {
                  question: "Q4.2 The moment “modern land share vs. log internal trade cost” (slope ≈ −10.7) is most informative about:",
                  options: ["σ", "κ", "θ1", "θ2"],
                  correctIndex: 3,
                  explanation: "Correct! High internal shipping costs suppress imported input adoption, directly revealing the technology shape parameter θ2."
                },
                {
                  question: "Q4.3 Reversing globalization in agricultural inputs only (not outputs) back to 1980 levels:",
                  options: [
                    "raises global welfare",
                    "lowers modern-technology land share and yields, and lowers welfare by about 1.6%",
                    "has no effect on technology adoption",
                    "only affects rich countries"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Input trade friction spikes lower adoption rates, decreasing yields and overall welfare by 1.6%."
                },
                {
                  question: "Q4.4 Output-side globalization benefits ____ most, while input-side globalization benefits ____ most:",
                  options: [
                    "rich countries; poor countries",
                    "poor countries (high food expenditure share); middle-income countries (intermediate room to adopt technology)",
                    "all countries equally in both cases",
                    "middle-income countries; poor countries"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Poorer countries gain from cheap food; middle-income countries leverage imports to transition to modern farming."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Cross-Country Distributional Effects</span>
            <div style={{ display: 'flex', gap: '8px', padding: '4px' }}>
              <button 
                onClick={() => setGlobMode("input")}
                className={`quiz-btn ${globMode === "input" ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              >
                Input-only Globalization
              </button>
              <button 
                onClick={() => setGlobMode("output")}
                className={`quiz-btn ${globMode === "output" ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              >
                Output-only Globalization
              </button>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="20" y="30" fill="var(--text-secondary)" fontSize="11" fontWeight="bold">
                  {globMode === "input" ? "U-Shaped Welfare Gains (Input-only):" : "Monotonically Declining Gains (Output-only):"}
                </text>

                {globMode === "input" ? (
                  /* U-shaped schematic curve */
                  <path 
                    d="M 50 170 Q 200 60 350 175" 
                    fill="none" stroke="var(--accent-primary)" strokeWidth="3" 
                  />
                ) : (
                  /* Monotonic decline curve */
                  <path 
                    d="M 50 60 L 350 175" 
                    fill="none" stroke="#8b5cf6" strokeWidth="3" 
                  />
                )}

                <line x1="50" y1="40" x2="50" y2="180" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="180" x2="350" y2="180" stroke="#475569" strokeWidth="2" />
                <text x="200" y="195" textAnchor="middle" fill="var(--text-muted)" fontSize="9">Log GDP per Worker</text>
                <text x="40" y="110" textAnchor="middle" fill="var(--text-muted)" fontSize="9" transform="rotate(-90 40 110)">Welfare Effect (%)</text>
              </svg>
            </div>
            <div className="implications-panel">
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {globMode === "input" 
                  ? "Input-side benefits peak in middle-income nations because rich countries are already modernized, and poor countries lack scale."
                  : "Output-side benefits fall monotonically with income as food budget shares shrink in richer economies."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          8.5 — STYLIZED FACTS & MULTI-SECTOR GROWTH
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "8.5 — Growth facts" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 8.5: Structural Transformation and Multi-Sector Growth</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              Based on Part III: Herrendorf, Rogerson & Valentinyi, Handbook of Economic Growth chapter.
            </p>

            <DefinitionBox title="Structural Transformation Definition">
              {`Structural transformation is the reallocation of economic activity across sectors (agriculture, manufacturing, services). It is measured by:
              1. Employment shares
              2. Value-added shares (nominal or real)
              3. Final consumption expenditure shares.
              These can diverge when international trade or input-output links are present.`}
            </DefinitionBox>

            <EmpiricalFactBox title="Empirical Long-run Patterns">
              {`As countries grow:
              - Agriculture's share declines monotonically.
              - Services' share rises monotonically.
              - Manufacturing's share is hump-shaped (first rising, then falling).`}
            </EmpiricalFactBox>

            <DerivationBox title="Multi-Sector Growth Model Aggregation">
              {`Preferences feature a subsistence food level $\\bar{c}_a$ and services luxury threshold $\\bar{c}_s$:
              $$U = \\sum \\beta^t \\ln \\left[ \\omega_a^{1/\\epsilon} (c_a - \\bar{c}_a)^{\\frac{\\epsilon-1}{\\epsilon}} + \\omega_m^{1/\\epsilon} c_m^{\\frac{\\epsilon-1}{\\epsilon}} + \\omega_s^{1/\\epsilon} (c_s + \\bar{c}_s)^{\\frac{\\epsilon-1}{\\epsilon}} \\right]^{\\frac{\\epsilon}{\\epsilon-1}}$$
              Under equalized capital-labor ratios, the multi-sector economy aggregates into a one-sector model:
              $$Y_t = X_t + P_t C_t = K_t^\\theta A_{xt}^{1-\\theta}$$
              Aggregated savings behave like a single-sector model driven by investment-sector TFP ($A_{xt}$). Sectoral reallocation does not affect aggregate growth (Growth $\\neq$ Reallocation).`}
            </DerivationBox>

            <LessonQuiz 
              title="Lesson 8.5"
              questions={[
                {
                  question: "Q5.1 The three ways of measuring structural transformation (employment, value added, expenditure shares) are:",
                  options: [
                    "always identical",
                    "conceptually distinct — the first two are production-side, the third consumption-side, and they can diverge with trade or IO linkages",
                    "only relevant in autarky",
                    "interchangeable if ε = 1"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Trade and intermediate input linkages create wedges between production and consumption locations."
                },
                {
                  question: "Q5.2 Manufacturing’s share of value added over the growth path is typically:",
                  options: ["monotonically rising", "monotonically falling", "hump-shaped", "constant"],
                  correctIndex: 2,
                  explanation: "Correct! Industrialization first expands manufacturing's share, which later contracts as services take over."
                },
                {
                  question: "Q5.3 The key decomposition “growth ≠ structural transformation” means:",
                  options: [
                    "growth is driven by the intertemporal (saving) problem via A_xt, while transformation comes from the static allocation problem across c_a, c_m, c_s",
                    "structural transformation causes all aggregate growth",
                    "they are the same object",
                    "neither is affected by technology"
                  ],
                  correctIndex: 0,
                  explanation: "Correct! Savings choices set aggregate capital growth, while relative prices/income set how output splits across consumption sectors."
                },
                {
                  question: "Q5.4 A generalized balanced growth path (GBGP) requires:",
                  options: [
                    "constant sectoral employment shares",
                    "a constant real interest rate, while sectoral shares are allowed to evolve",
                    "zero productivity growth",
                    "constant relative prices"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! GBGP relaxes exact balanced growth conditions, allowing interest rates to stabilize while sectoral shares drift."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Sectoral Shares over Development Path</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>Development Level (log GDP per capita): <span className="val-highlight">{devLevel}</span></label>
                <input type="range" min="1" max="10" step="1" value={devLevel} onChange={e => setDevLevel(Number(e.target.value))} className="range-slider" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                {/* Curves */}
                {/* 1. Agriculture (Declining) */}
                <path 
                  d="M 50 60 Q 200 160 350 175" 
                  fill="none" stroke="var(--accent-primary)" strokeWidth="3" 
                />
                <text x="70" y="80" fill="var(--accent-primary)" fontSize="9" fontWeight="bold">Agr.</text>

                {/* 2. Services (Rising) */}
                <path 
                  d="M 50 170 Q 200 140 350 60" 
                  fill="none" stroke="#8b5cf6" strokeWidth="3" 
                />
                <text x="310" y="80" fill="#8b5cf6" fontSize="9" fontWeight="bold">Serv.</text>

                {/* 3. Manufacturing (Hump-shaped) */}
                <path 
                  d="M 50 175 Q 200 90 350 170" 
                  fill="none" stroke="#f59e0b" strokeWidth="3" 
                />
                <text x="210" y="110" fill="#f59e0b" fontSize="9" fontWeight="bold">Mfg.</text>

                {/* Development indicator */}
                <line 
                  x1={50 + (devLevel - 1) * 33.3} 
                  y1="30" 
                  x2={50 + (devLevel - 1) * 33.3} 
                  y2="180" 
                  stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" 
                />
                <circle cx={50 + (devLevel - 1) * 33.3} cy="100" r="4" fill="#ef4444" />

                <line x1="50" y1="30" x2="50" y2="180" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="180" x2="365" y2="180" stroke="#475569" strokeWidth="2" />
              </svg>
            </div>
            <div className="implications-panel">
              <div className="implications-grid">
                <div className="implication-stat-card">
                  <div className="implication-stat-val">{Math.max(5, Math.round(80 - (devLevel - 1) * 8))}%</div>
                  <div className="implication-stat-lbl">Agriculture Share</div>
                </div>
                <div className="implication-stat-card">
                  <div className="implication-stat-val purple-text">{Math.min(85, Math.round(15 + (devLevel - 1) * 7.5))}%</div>
                  <div className="implication-stat-lbl">Services Share</div>
                </div>
                <div className="implication-stat-card">
                  <div className="implication-stat-val orange-text">
                    {devLevel <= 5 ? Math.round(5 + (devLevel - 1) * 5) : Math.round(25 - (devLevel - 5) * 4)}%
                  </div>
                  <div className="implication-stat-lbl">Mfg Share</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          8.6 — PRICE VS INCOME MECHANISMS & TRADE ROLE
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "8.6 — Price vs Income" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 8.6: Reallocation Mechanisms and the Role of Trade</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              Based on Part III: Herrendorf, Rogerson & Valentinyi, Handbook of Economic Growth chapter.
            </p>

            <DerivationBox title="Case 1: Pure Income Effects (Stone-Geary)">
              {`If TFP growth is common across consumption sectors ($\\gamma_a = \\gamma_m = \\gamma_s$) and substitution elasticity $\\epsilon = 1$, shares shift purely due to non-homothetic preferences:
              $$c_{at} = \\omega_a \\frac{P_t C_t}{p_{at}} + \\bar{c}_a, \\quad c_{mt} = \\omega_m \\frac{P_t C_t}{p_{mt}}, \\quad c_{st} = \\omega_s \\frac{P_t C_t}{p_{st}} - \\bar{c}_s$$
              Explains agriculture's drop and services' expansion, but fails to yield a manufacturing hump alone.`}
            </DerivationBox>

            <DerivationBox title="Case 2: Pure Price Effects (Ngai-Pissarides)">
              {`If preferences are homothetic ($\\bar{c}_a = \\bar{c}_s = 0$) but sectors exhibit differential TFP growth ($\\gamma_a > \\gamma_m > \\gamma_s$). If $\\epsilon < 1$, the sector with the fastest TFP growth (agriculture) shrinks in nominal value-added share because prices drop faster than consumed quantities rise.`}
            </DerivationBox>

            <DerivationBox title="Open Economy Decoupling">
              {`In a closed economy, domestic production must match consumption ($Y_{it} = P_{it}C_{it}$). Openness breaks this link:
              $$\\text{Production Shares} \\neq \\text{Expenditure Shares}$$
              A country with rapid manufacturing TFP growth can see a rising manufacturing output share (exports) even as domestic consumption drifts to services.`}
            </DerivationBox>

            <LessonQuiz 
              title="Lesson 8.6"
              questions={[
                {
                  question: "Q6.1 The Kongsamut-Rey-Xie mechanism relies mainly on:",
                  options: [
                    "differential TFP growth across sectors",
                    "non-homothetic (Stone-Geary) preferences with roughly common TFP growth",
                    "trade liberalization",
                    "labor mobility frictions"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Stone-Geary income effects shift demand independently of price adjustments."
                },
                {
                  question: "Q6.2 The Ngai-Pissarides mechanism explains diverging real vs. nominal value-added shares through:",
                  options: [
                    "income effects only",
                    "differential TFP growth combined with low substitutability (ε < 1) across sectors",
                    "government policy",
                    "constant relative prices"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Differential supply shifts combined with low elasticity map output growth to nominal value share contraction."
                },
                {
                  question: "Q6.3 Opening the economy to trade breaks the tight link between production and expenditure shares because:",
                  options: [
                    "firms now specialize by comparative advantage while consumption follows preferences, so the two need not coincide",
                    "trade eliminates all sectors but one",
                    "prices become fixed",
                    "closed-economy identities still hold exactly"
                  ],
                  correctIndex: 0,
                  explanation: "Correct! Openness decouples production locations (Ricardian advantage) from household utility targets."
                },
                {
                  question: "Q6.4 A country with strong manufacturing TFP growth that opens to trade may:",
                  options: [
                    "never show a manufacturing hump",
                    "show a rising manufacturing share via specialization/exports even as its consumption continues shifting toward services",
                    "automatically deindustrialize",
                    "have identical experience to a closed economy"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Specialization lets industrial output rise to feed world markets, bypassing local consumption limits."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Production vs. Expenditure Decoupling</span>
            <div style={{ display: 'flex', gap: '8px', padding: '4px' }}>
              <button 
                onClick={() => setEconomyOpen(false)}
                className={`quiz-btn ${!economyOpen ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              >
                Closed Economy (Autarky)
              </button>
              <button 
                onClick={() => setEconomyOpen(true)}
                className={`quiz-btn ${economyOpen ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              >
                Open Economy (Trade)
              </button>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="20" y="30" fill="var(--text-secondary)" fontSize="11" fontWeight="bold">
                  {economyOpen ? "Shares Decouple (Open):" : "Shares Match (Closed):"}
                </text>

                {/* Consumption Curve */}
                <path d="M 50 170 Q 200 130 350 60" fill="none" stroke="#8b5cf6" strokeWidth="3" />
                <text x="310" y="50" fill="#8b5cf6" fontSize="9" fontWeight="bold">Expenditure Share</text>

                {economyOpen ? (
                  /* Specialization production curve rises then falls differently */
                  <path d="M 50 140 Q 200 50 350 120" fill="none" stroke="var(--accent-primary)" strokeWidth="3" strokeDasharray="4,4" />
                ) : (
                  /* Production matches consumption curve */
                  <path d="M 50 170 Q 200 130 350 60" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="2,2" />
                )}
                <text x="210" y="110" fill="var(--accent-primary)" fontSize="9" fontWeight="bold">Production Share</text>

                <line x1="50" y1="40" x2="50" y2="180" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="180" x2="350" y2="180" stroke="#475569" strokeWidth="2" />
                <text x="200" y="195" textAnchor="middle" fill="var(--text-muted)" fontSize="9">Log GDP per Capita</text>
              </svg>
            </div>
            <div className="implications-panel">
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {economyOpen 
                  ? "Under trade, comparative advantage drives sectoral production, diverging from domestic demand shapes."
                  : "In autarky, local production is strictly constrained to match local consumption bundles."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          8.7 — THE PUZZLE & ROY SELECTION MODEL
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "8.7 — Roy Selection" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 8.7: Selection &amp; Cross-Country Agricultural Productivity Gaps</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              Based on Part IV: Lagakos & Waugh (2013, AER), "Selection, Agriculture, and Cross-Country Productivity Differences."
            </p>

            <EmpiricalFactBox title="The 10.7x Amplification Puzzle">
              {`Comparing 90th to 10th percentile countries:
              - Agricultural productivity gap: 45x.
              - Non-agricultural productivity gap: 4x.
              - Aggregate gap: 22x.
              - Employment share: 78% (poor) down to 3% (rich).
              Productivity differences are ten times larger in farming than in other sectors.`}
            </EmpiricalFactBox>

            <IntuitionBox title="Subsistence selection trap">
              {`In poor countries, food subsistence requires a massive agricultural labor force, forcing low-efficiency workers into farming. In rich countries, only workers with strong agricultural comparative advantage remain. Selection amplifies observed productivity gaps.`}
            </IntuitionBox>

            <DefinitionBox title="The Two-Sector Setup & Roy Selection">
              {`Preferences feature Stone-Geary food subsistence:
              $$U_i = \\ln(c_i^a - \\bar{a}) + \\nu \\ln c_i^n$$
              Workers draw efficiency pairs $(z_i^a, z_i^n) \\sim G(z^a, z^n)$. Relative agriculture price is $p_a$. Selection rule: a worker picks non-agriculture iff:
              $$\\frac{z^n_i}{z^a_i} \\geq p_a$$`}
            </DefinitionBox>

            <LessonQuiz 
              title="Lesson 8.7"
              questions={[
                {
                  question: "Q7.1 The central empirical puzzle Lagakos-Waugh resolve is:",
                  options: [
                    "why aggregate productivity gaps are zero",
                    "why cross-country agricultural productivity gaps (≈45×) are far larger than non-agricultural gaps (≈4×)",
                    "why rich countries have more farmers",
                    "why subsistence consumption does not exist"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Selection makes cross-country gaps in farming look ten times larger than in manufacturing."
                },
                {
                  question: "Q7.2 A worker chooses non-agriculture in the Roy model when:",
                  options: [
                    "z^n_i / z^a_i ≥ p_a",
                    "z^n_i / z^a_i ≤ p_a",
                    "z^a_i > z^n_i always",
                    "wages are equal in both sectors regardless of type"
                  ],
                  correctIndex: 0,
                  explanation: "Correct! Sorting is dictated by comparing relative efficiency to relative market prices."
                },
                {
                  question: "Q7.3 Proposition 1 states that poor countries have a ____ relative price of agriculture than rich countries:",
                  options: [
                    "lower",
                    "higher, because subsistence food demand is more binding",
                    "identical",
                    "undefined"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Poor countries must maintain high food prices to draw enough labor to meet subsistence constraints."
                },
                {
                  question: "Q7.4 Measured agricultural labor productivity depends on:",
                  options: [
                    "only the common efficiency parameter A",
                    "both the common efficiency A and the selection of which workers choose agriculture",
                    "only the subsistence parameter ¯a",
                    "nothing — it is exogenous"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Aggregate productivity mixes the baseline sector technology with the sorted workforce quality."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Roy Selection Worker Simulator</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>Relative Food Price ($p_a$): <span className="val-highlight">{royPa.toFixed(2)}</span></label>
                <input type="range" min="0.4" max="2.5" step="0.1" value={royPa} onChange={e => setRoyPa(Number(e.target.value))} className="range-slider" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                {/* Axes */}
                <line x1="50" y1="20" x2="50" y2="180" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="180" x2="350" y2="180" stroke="#475569" strokeWidth="2" />
                <text x="340" y="195" fill="var(--text-secondary)" fontSize="9" textAnchor="end">Agricultural Efficiency (z^a)</text>
                <text x="35" y="30" fill="var(--text-secondary)" fontSize="9" transform="rotate(-90 35 30)" textAnchor="end">Non-agr. Efficiency (z^n)</text>

                {/* Threshold line z^n = p_a * z^a */}
                {/* Line coordinates: (50, 180) to (50 + 250, 180 - 250 * royPa * scaling) */}
                <line 
                  x1="50" 
                  y1="180" 
                  x2="300" 
                  y2={Math.max(20, 180 - 250 * royPa * 0.4)} 
                  stroke="#ef4444" strokeWidth="2.5" 
                />
                <text x="280" y={Math.max(30, 180 - 250 * royPa * 0.4 - 10)} fill="#ef4444" fontSize="9" fontWeight="bold">p_a Cutoff</text>

                {/* Render Workers */}
                {workers.map(w => {
                  const x = 50 + w.za * 80;
                  const y = 180 - w.zn * 50;
                  const isNonAg = (w.zn / w.za) >= royPa;

                  return (
                    <g key={w.id}>
                      <circle 
                        cx={x} 
                        cy={y} 
                        r="5" 
                        fill={isNonAg ? "#8b5cf6" : "var(--accent-primary)"} 
                      />
                      <text x={x + 6} y={y + 3} fill="var(--text-muted)" fontSize="8">{`W${w.id}`}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="roy-selection-plot-grid">
              <div className="roy-plot-item selected-agr">
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>Agriculture sorting:</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                  {workers.filter(w => (w.zn / w.za) < royPa).length} workers
                </div>
              </div>
              <div className="roy-plot-item selected-non">
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b5cf6' }}>Non-agri sorting:</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                  {workers.filter(w => (w.zn / w.za) >= royPa).length} workers
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          8.8 — AMPLIFICATION GAPS
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "8.8 — Amplification Gaps" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 8.8: Amplification, Fréchet Quantification, and Gaps</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              Based on Part IV: Lagakos & Waugh (2013, AER), "Selection, Agriculture, and Cross-Country Productivity Differences."
            </p>

            <DerivationBox title="Proposition 2: Sorting Amplification">
              {`If comparative and absolute advantage are positively correlated:
              $$\\frac{\\text{Agr. productivity gap (R / P)}}{\\text{Non-agr. productivity gap (R / P)}} > 1.0$$
              Selection inflates the measured agricultural gap while shrinking the non-agricultural gap.`}
            </DerivationBox>

            <DerivationBox title="Fréchet Selection Analytics">
              {`Assuming efficiencies follow independent Fréchet structures:
              $$\\pi_a = \\frac{1}{p_a^{-\\theta} + 1}$$
              Expected worker productivity conditional on choosing agriculture is:
              $$E(z^a \\mid a) = \\gamma \\pi_a^{-1/\\theta}$$
              As $\\pi_a \\to 0$ (rich countries), average farmer capability rises mechanically because only extreme positive outliers remain.`}
            </DerivationBox>

            <EmpiricalFactBox title="Quantitative Results: Data vs. Model">
              {`- Target Ratio (Agr/Non-agr gaps): 10.7x.
              - Model with selection: 2.2x.
              - Model with no selection: 1.0x.
              - Sorting explains about 50% of the observed amplification.
              - Rich-country farmers average 1.55x the population capability mean; poor-country farmers average 1.00x.`}
            </EmpiricalFactBox>

            <LessonQuiz 
              title="Lesson 8.8"
              questions={[
                {
                  question: "Q8.1 Proposition 2 says selection makes the agricultural productivity gap:",
                  options: [
                    "exactly equal to A^R/A^P",
                    "larger than A^R/A^P, while the non-agricultural gap becomes smaller than A^R/A^P",
                    "unrelated to A^R/A^P",
                    "always equal to one"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Selection amplifies the farming gap and compresses the non-agricultural gap."
                },
                {
                  question: "Q8.2 In the Fréchet example, E(z^a | a) = γ * π_a^(-1/θ) implies that when a country’s agricultural employment share π_a falls:",
                  options: [
                    "selected agricultural productivity falls",
                    "selected agricultural productivity mechanically rises (fewer, more selected farmers)",
                    "nothing changes",
                    "θ must be zero"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! As farming labor shrinks, only the absolute highest comparative advantage types remain, elevating average yields."
                },
                {
                  question: "Q8.3 The calibrated model produces an agriculture/non-agriculture gap ratio of:",
                  options: [
                    "10.7, matching the data exactly",
                    "1.0, meaning selection explains nothing",
                    "2.2, roughly half of the 10.7 data target",
                    "45"
                  ],
                  correctIndex: 2,
                  explanation: "Correct! The model predicts a ratio of 2.2, capturing half of the empirical target amplification."
                },
                {
                  question: "Q8.4 Rich-country agricultural workers have average agricultural productivity relative to the population mean of about:",
                  options: ["0.71", "1.00", "1.55, reflecting strong positive selection", "10.7"],
                  correctIndex: 2,
                  explanation: "Correct! Only high-efficiency workers remain in rich-country agriculture, yielding a 1.55x capability factor."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Agr/Non-agr Productivity Gap Ratio</span>
            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                {/* Data Column */}
                <rect x="70" y="40" width="50" height="140" fill="var(--accent-primary)" />
                <text x="95" y="30" textAnchor="middle" fill="var(--accent-primary)" fontSize="11" fontWeight="bold">10.7</text>
                <text x="95" y="195" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Data</text>

                {/* Model Column */}
                <rect x="175" y="140" width="50" height="40" fill="#8b5cf6" />
                <text x="200" y="130" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">2.2</text>
                <text x="200" y="195" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Model</text>

                {/* No Selection Column */}
                <rect x="280" y="160" width="50" height="20" fill="#f59e0b" />
                <text x="305" y="150" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">1.0</text>
                <text x="305" y="195" textAnchor="middle" fill="var(--text-muted)" fontSize="8">No Selection</text>

                <line x1="50" y1="180" x2="350" y2="180" stroke="#475569" strokeWidth="2" />
              </svg>
            </div>
            <div className="implications-panel">
              <span style={{ fontWeight: 600 }}>Amplification Decomposition:</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {`Selection alone accounts for a 2.2x ratio, covering roughly half of the 10.7x empirical gap difference between sectors.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          8.9 — POLICY & HEAT SHOCKS
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "8.9 — Policy & Heat Shocks" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 8.9: Measuring Policy, Heat Exposure, and Core Patterns</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              Based on Part V: Hsiao, Moscona & Sastry (2026, Econometrica), "Food Policy in a Warming World."
            </p>

            <DefinitionBox title="Nominal Rate of Assistance (NRA)">
              {`The Nominal Rate of Assistance compares distorted producer prices to international levels:
              $$NRA_{\\ell k t} = \\frac{p_{\\ell k t} - p^I_{k t}}{p^I_{k t}}$$
              - $NRA > 0$: Producer protection (tariffs, subsidies).
              - $NRA < 0$: Consumer protection (export restrictions, price controls).`}
            </DefinitionBox>

            <DefinitionBox title="Crop-specific Extreme Heat Exposure">
              {`Heat is weighted by grid-level land shares:
              $$ExtremeHeat_{\\ell k t} = \\sum_{c \\in \\ell} \\frac{Area_{c k}}{\\sum_{c'} Area_{c' k}} \\cdot DegreeDays_{c t}(T^{max}_k)$$
              This isolates identifying variation across crops within a country.`}
            </DefinitionBox>

            <DerivationBox title="Empirical Specifications">
              {`- Yield Validation: Lowers yields on fields, confirming extreme heat acts as a real cost shock.
              - NRA response:
              $$NRA_{\\ell k t} = g(ExtremeHeat_{\\ell k t}) + \\gamma_{\\ell t} + \\delta_{k t} + \\mu_{\\ell k} + \\epsilon_{\\ell k t}$$
              Controls absorb country-year, crop-year, and country-crop shocks.`}
            </DerivationBox>

            <EmpiricalFactBox title="Opposite policy responses">
              {`- Domestic heat shocks lower NRA (pro-consumer protection: export bans and domestic caps to prevent local spikes).
              - Foreign heat shocks raise NRA (pro-producer protection: lower export controls to chase international prices).
              - Concentrated in border controls, staple crops, and election years.`}
            </EmpiricalFactBox>

            <LessonQuiz 
              title="Lesson 8.9"
              questions={[
                {
                  question: "Q9.1 The Nominal Rate of Assistance NRA < 0 signals:",
                  options: [
                    "producer assistance",
                    "consumer assistance (domestic price below the free-market international price)",
                    "no distortion",
                    "a tariff on imports"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Negative NRA represents taxes/barriers that artificially suppress domestic food prices below world market rates."
                },
                {
                  question: "Q9.2 ExtremeHeat is constructed using crop-specific heat tolerance and land shares because:",
                  options: [
                    "it allows identification from within-country, across-crop variation",
                    "all crops have identical heat tolerance",
                    "it ignores where crops are actually grown",
                    "it is unrelated to yields"
                  ],
                  correctIndex: 0,
                  explanation: "Correct! Utilizing localized crop weights isolates identifying variation from macro country-level trends."
                },
                {
                  question: "Q9.3 Domestic extreme heat and foreign extreme heat move NRA:",
                  options: [
                    "in the same direction always",
                    "in opposite directions: domestic heat lowers NRA (pro-consumer), foreign heat raises NRA (pro-producer)",
                    "only affects input policy",
                    "have no effect"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Domestic heat prompts consumer shields, while foreign shocks trigger export profit chasing."
                },
                {
                  question: "Q9.4 The policy response to extreme heat is strongest for:",
                  options: [
                    "cash crops in non-election years",
                    "staple crops and in election years",
                    "countries with no trade",
                    "manufacturing goods"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Staples carry high survival weight, and election cycles intensify political pressure."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 NRA Policy Response by Shock Type</span>
            <div style={{ display: 'flex', gap: '8px', padding: '4px' }}>
              <button 
                onClick={() => setNraShockMode("domestic")}
                className={`quiz-btn ${nraShockMode === "domestic" ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              >
                Domestic Heat Shock (NRA Change)
              </button>
              <button 
                onClick={() => setNraShockMode("foreign")}
                className={`quiz-btn ${nraShockMode === "foreign" ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              >
                Foreign Heat Shock (NRA Change)
              </button>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="20" y="30" fill="var(--text-secondary)" fontSize="11" fontWeight="bold">
                  {nraShockMode === "domestic" ? "Domestic Shock lowers NRA (pro-consumer):" : "Foreign Shock raises NRA (pro-producer):"}
                </text>

                {nraShockMode === "domestic" ? (
                  /* Downward bars across quartiles */
                  <g>
                    <rect x="60" y="100" width="40" height="15" fill="var(--accent-primary)" />
                    <rect x="140" y="100" width="40" height="30" fill="var(--accent-primary)" />
                    <rect x="220" y="100" width="40" height="50" fill="var(--accent-primary)" />
                    <rect x="300" y="100" width="40" height="75" fill="var(--accent-primary)" />
                    
                    <text x="80" y="90" textAnchor="middle" fill="var(--text-primary)" fontSize="9">-0.02</text>
                    <text x="160" y="90" textAnchor="middle" fill="var(--text-primary)" fontSize="9">-0.05</text>
                    <text x="240" y="90" textAnchor="middle" fill="var(--text-primary)" fontSize="9">-0.09</text>
                    <text x="320" y="90" textAnchor="middle" fill="var(--text-primary)" fontSize="9">-0.15</text>
                  </g>
                ) : (
                  /* Upward bars across quartiles */
                  <g>
                    <rect x="60" y="85" width="40" height="15" fill="#8b5cf6" />
                    <rect x="140" y="70" width="40" height="30" fill="#8b5cf6" />
                    <rect x="220" y="50" width="40" height="50" fill="#8b5cf6" />
                    <rect x="300" y="25" width="40" height="75" fill="#8b5cf6" />

                    <text x="80" y="115" textAnchor="middle" fill="var(--text-primary)" fontSize="9">+0.01</text>
                    <text x="160" y="115" textAnchor="middle" fill="var(--text-primary)" fontSize="9">+0.03</text>
                    <text x="240" y="115" textAnchor="middle" fill="var(--text-primary)" fontSize="9">+0.06</text>
                    <text x="320" y="115" textAnchor="middle" fill="var(--text-primary)" fontSize="9">+0.11</text>
                  </g>
                )}

                <text x="80" y="195" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Q1 Heat</text>
                <text x="160" y="195" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Q2 Heat</text>
                <text x="240" y="195" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Q3 Heat</text>
                <text x="320" y="195" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Q4 Heat</text>

                <line x1="40" y1="100" x2="360" y2="100" stroke="#475569" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          8.10 — POLITICAL ECONOMY MODEL & WELFARE
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "8.10 — Political Economy" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 8.10: Political Economy Model of Trade Policy and Welfare</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              Based on Part V: Hsiao, Moscona & Sastry (2026, Econometrica), "Food Policy in a Warming World."
            </p>

            <DefinitionBox title="The PE Model Setup">
              {`- Demand: $q = p^{-\\epsilon_d}$.
              - Supply: $y = \\omega p^{\\epsilon_s}$.
              - Net Export demand: $x = \\omega' p^{-\\epsilon_x}$.
              - Border tax: $\\alpha$ links prices $p^* = (1+\\alpha)p^I$.
              Government chooses $\\alpha$ to maximize weighted welfare:
              $$\\max_\\alpha \\lambda_C CS + \\lambda_P PS - \\lambda_G \\frac{\\alpha}{1+\\alpha} p^* X$$`}
            </DefinitionBox>

            <DerivationBox title="Closed-Form Optimal Tariff/Subsidy">
              {`In terms of self-sufficiency ratio $r = y/q$, optimal policy is:
              $$\\alpha^* = \\frac{1}{\\epsilon_x} \\left[ \\frac{\\lambda_P r + \\lambda_G(1-r) - \\lambda_C}{\\lambda_G(\\epsilon_s r + \\epsilon_d) - (\\lambda_P r + \\lambda_G(1-r) - \\lambda_C)} \\right]$$
              A government is redistribution-focused if:
              $$\\frac{\\epsilon_s\\lambda_C + \\epsilon_d\\lambda_P}{\\epsilon_s + \\epsilon_d} > \\lambda_G$$
              If redistribution-focused, domestic vs. foreign shocks move policy in opposite directions.`}
            </DerivationBox>

            <EmpiricalFactBox title="Welfare Consequences">
              {`Responsive policy shields local consumers but damages producers and shifts costs onto unshocked trading partners. Endogenous food policy is globally regressive because it concentrates price shocks on poorer, more heat-exposed countries.`}
            </EmpiricalFactBox>

            <LessonQuiz 
              title="Lesson 8.10"
              questions={[
                {
                  question: "Q10.1 Under utilitarian weights λ_P = λ_C = λ_G, optimal policy α* reduces to:",
                  options: [
                    "zero",
                    "−1/ε_x, the pure terms-of-trade manipulation benchmark",
                    "infinity",
                    "1 / ε_d"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Equal political weighting strips shock-redistribution incentives, leaving only classical terms-of-trade manipulation."
                },
                {
                  question: "Q10.2 For a redistribution-focused government, a domestic adverse supply shock (low ω) and a foreign adverse supply shock (high ω′):",
                  options: [
                    "both raise α*",
                    "both lower α*",
                    "push α* in opposite directions",
                    "have no effect on α*"
                  ],
                  correctIndex: 2,
                  explanation: "Correct! Shocks push policies in opposite directions to shield domestic market participants from external vs. internal shortages."
                },
                {
                  question: "Q10.3 The paper’s normative headline is that endogenous food policy:",
                  options: [
                    "is always welfare-improving globally",
                    "can be globally regressive even though it is domestically politically rational",
                    "eliminates all climate damage",
                    "only affects producers"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Endogenous trade policy transfers volatility to poorer, exposed trading partners, making it globally regressive."
                },
                {
                  question: "Q10.4 A government is “redistribution-focused” when:",
                  options: [
                    "λ_G dominates the weighted elasticity average",
                    "the weighted average (ε_s * λ_C + ε_d * λ_P) / (ε_s + ε_d) exceeds λ_G",
                    "ε_x = 0",
                    "there is no trade"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! When the political value of domestic surplus exceeds the fiscal value of border revenues, policies shift to redistribute shock impacts."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 PE Optimal Trade Policy Calculator</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr 1fr', padding: '12px', gap: '8px', marginBottom: '0' }}>
              <div className="slider-card">
                <label>{`Consumer Weight ($\\lambda_C$):`} <span className="val-highlight">{lambdaC}</span></label>
                <input type="range" min="0.5" max="3.0" step="0.1" value={lambdaC} onChange={e => setLambdaC(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>{`Producer Weight ($\\lambda_P$):`} <span className="val-highlight">{lambdaP}</span></label>
                <input type="range" min="0.5" max="3.0" step="0.1" value={lambdaP} onChange={e => setLambdaP(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>{`Fiscal Weight ($\\lambda_G$):`} <span className="val-highlight">{lambdaG}</span></label>
                <input type="range" min="0.5" max="3.0" step="0.1" value={lambdaG} onChange={e => setLambdaG(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>Export Elasticity ($\\epsilon_x$): <span className="val-highlight">{epsX}</span></label>
                <input type="range" min="1.0" max="4.0" step="0.1" value={epsX} onChange={e => setEpsX(Number(e.target.value))} className="range-slider" />
              </div>
            </div>

            <div className="implications-panel" style={{ marginTop: '12px' }}>
              <span style={{ fontWeight: 600 }}>Calculator Outputs:</span>
              <div className="implications-grid">
                <div className="implication-stat-card">
                  <div className="implication-stat-val">{optimalAlpha}</div>
                  <div className="implication-stat-lbl">Optimal Policy (α*)</div>
                </div>
                <div className="implication-stat-card">
                  <div className="implication-stat-val purple-text">{isRedistributive ? "Redistribution" : "Revenue"}</div>
                  <div className="implication-stat-lbl">Government Type</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          8.11 — NON-HOMOTHETIC CES + EATON-KORTUM MODEL
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "8.11 — Non-Homothetic EK" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 8.11: Sectoral Reallocation &amp; Eaton-Kortum Gravity</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              Based on Part VI: Nath (2025, JPE), "Climate Change, the Food Problem, and the Challenge of Adaptation..."
            </p>

            <EmpiricalFactBox title="Three Empirical Facts">
              {`- Fact 1: Extreme heat reduces annual agricultural output per worker by 0.4% per 40°C day in poor countries. Negligible in manufacturing.
              - Fact 2: Agriculture's GDP share is 67% in poor countries vs. 3% in rich countries, despite a 45x agricultural productivity gap.
              - Fact 3: Temperature shocks increase, not decrease, the agricultural employment share in poor countries.`}
            </EmpiricalFactBox>

            <IntuitionBox title="The Food Problem in one sentence">
              {`Under high trade barriers, falling agricultural productivity makes a country poorer, and food subsistence forces the country to reallocate more labor to the damaged sector — a vicious trap.`}
            </IntuitionBox>

            <DefinitionBox title="Implicit CES Utility & EK Production">
              {`Non-homothetic CES utility is defined by:
              $$\\sum_j \\Omega_j^{1/\\sigma} U_k^{\\frac{\\epsilon_j - \\sigma}{\\sigma}} C_{jk}^{\\frac{\\sigma-1}{\\sigma}} = 1$$
              with $\\sigma = 0.27 < 1$ and $\\epsilon_a = 0.29 < 1-\\sigma$ (necessity).
              Roy's Identity yields the food budget share:
              $$\\omega_{ak} = \\Omega_a \\left( \\frac{P_{ak}}{P_k} \\right)^{1-\\sigma} \\left( \\frac{Y_k}{P_k} \\right)^{\\epsilon_a - (1-\\sigma)}$$
              Since $\\epsilon_a - (1-\\sigma) < 0$, falling real income forces $\\omega_{ak}$ to rise.`}
            </DefinitionBox>

            <LessonQuiz 
              title="Lesson 8.11"
              questions={[
                {
                  question: "Q11.1 Fact 3 (extreme heat raises agriculture’s employment share) is surprising because naively one might expect:",
                  options: [
                    "workers to flee the sector being damaged by heat, lowering its share",
                    "no relationship between heat and employment shares",
                    "heat to only affect manufacturing",
                    "this is not actually surprising"
                  ],
                  correctIndex: 0,
                  explanation: "Correct! Standard theory suggests moving labor away from damaged sectors, but subsistence binds too tightly."
                },
                {
                  question: "Q11.2 In the non-homothetic CES system, ϵ_a < 1 - σ means:",
                  options: [
                    "agriculture is a luxury",
                    "agriculture is a necessity: its expenditure share falls as real income rises",
                    "σ must equal 1",
                    "there is no food problem possible"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! The negative exponent causes the expenditure share on food to climb as real income drops."
                },
                {
                  question: "Q11.3 The employment-share equation ljk = πjkk * ωjk + ∑_{n≠k} πjkn * ωjn * Yn/Yk says a sector's labor share equals:",
                  options: [
                    "only domestic consumption of the domestic good",
                    "domestic consumption of the domestic good plus exports to other countries scaled by relative incomes",
                    "a constant",
                    "only exports"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! The labor share sums domestic demand absorption and foreign export capture."
                },
                {
                  question: "Q11.4 The trade elasticities used for agriculture and manufacturing are:",
                  options: [
                    "θ_a = 4.06, θ_m = 4.63",
                    "θ_a = 8.28 (EK’s estimate)",
                    "both equal to σ",
                    "unrelated to Fréchet dispersion"
                  ],
                  correctIndex: 0,
                  explanation: "Correct! These shape parameters represent Tombe's (2015) estimates utilized in Nath's model."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Food Budget Share vs. Real Income</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>Household Real Income Index: <span className="val-highlight">{realIncome.toFixed(1)}</span></label>
                <input type="range" min="0.2" max="5.0" step="0.1" value={realIncome} onChange={e => setRealIncome(Number(e.target.value))} className="range-slider" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                {/* Budget share curve */}
                {/* Curve modeled as omega_a = 0.8 * income^(-0.44) */}
                <path 
                  d={`M ${Array.from({ length: 50 }).map((_, i) => {
                    const inc = 0.2 + (i / 49) * 4.8;
                    const val = 0.8 * Math.pow(inc, -0.44);
                    const x = 50 + (i / 49) * 300;
                    const y = 180 - val * 150;
                    return `${x} ${y}`;
                  }).join(" L ")}`}
                  fill="none" stroke="var(--accent-primary)" strokeWidth="3"
                />

                {/* Marker */}
                <circle 
                  cx={50 + ((realIncome - 0.2) / 4.8) * 300} 
                  cy={180 - (0.8 * Math.pow(realIncome, -0.44)) * 150} 
                  r="6" 
                  fill="#ef4444" 
                />

                <line x1="50" y1="20" x2="50" y2="180" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="180" x2="360" y2="180" stroke="#475569" strokeWidth="2" />
                <text x="200" y="195" textAnchor="middle" fill="var(--text-muted)" fontSize="9">Real Income Index</text>
                <text x="35" y="100" textAnchor="middle" fill="var(--text-muted)" fontSize="9" transform="rotate(-90 35 100)">Food Share (ω_a)</text>
              </svg>
            </div>
            <div className="implications-panel" style={{ padding: '8px 12px' }}>
              <span style={{ fontSize: '0.8rem' }}>
                Food Expenditure Share: <strong>{Math.round(80 * Math.pow(realIncome, -0.44))}%</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          8.12 — THE FOOD PROBLEM CONDITION
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "8.12 — Food Problem" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 8.12: The Food Problem Condition &amp; Calibration</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              Based on Part VI: Nath (2025, JPE), "Climate Change, the Food Problem, and the Challenge of Adaptation..."
            </p>

            <DerivationBox title="Food-Problem Condition Derivation">
              {`Differentiating the employment share equation $l_{ak} = \\pi_{akk}\\omega_{ak} + \\sum_{n \\neq k} \\pi_{akn}\\omega_{an} \\frac{Y_n}{Y_k}$:
              $$dl_{ak} = \\underbrace{\\pi_{akk}d\\omega_{ak}}_{\\text{(A) Substitution + Income}} + \\underbrace{\\omega_{ak}d\\pi_{akk}}_{\\text{(B) Local Trade Drop}} + \\underbrace{\\sum_{n \\neq k} \\omega_{an}d\\pi_{akn} \\frac{Y_n}{Y_k}}_{\\text{(C) Export Trade Drop}}$$
              - Term (A): Positive (low income and low substitution push $\\omega_{ak}$ up).
              - Terms (B) & (C): Negative (country imports more, cutting domestic trade shares).
              A food problem occurs if Term (A) dominates: $(A) > -(B)-(C)$.`}
            </DerivationBox>

            <DerivationBox title="Two Corollaries & Parameters">
              {`- Corollary 1 (Frictionless Trade): If $\\tau = 1$ everywhere, $\\pi_{akk} \\to 0$, term (A) vanishes, and $dl_{ak} < 0$.
              - Corollary 2 (Homothetic Preferences): Term (A) is non-positive, so $dl_{ak} < 0$.
              The food problem strictly requires both high trade barriers and non-homothetic preferences.`}
            </DerivationBox>

            <EmpiricalFactBox title="Calibration & Counterfactual Results">
              {`- Calibration: Poorest quartile imports only 9% of its food ($\\pi_{akk} = 0.91$).
              - Findings: Under current trade barriers, climate change raises agriculture's GDP share in poor countries by 2.8 percentage points, yielding a welfare loss of -6.6%. Lowering trade barriers to the 90th-percentile level reduces welfare losses to -3.8% and reverses the rise in agriculture's share.`}
            </EmpiricalFactBox>

            <LessonQuiz 
              title="Lesson 8.12"
              questions={[
                {
                  question: "Q12.1 The food-problem condition requires the positive term (A) to dominate terms (B) and (C), which requires:",
                  options: [
                    "low trade costs and homothetic preferences",
                    "high trade costs (large π_akk) and non-homothetic, low-substitutability preferences",
                    "θ_a = θ_m",
                    "free migration"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Without trade barriers and subsistence constraints, local shocks do not trigger labor locking."
                },
                {
                  question: "Q12.2 Under frictionless trade (τ = 1), term (A) vanishes for a small country because:",
                  options: [
                    "π_akk → 0: the country barely produces its own food, so domestic price effects carry no weight in its overall employment share",
                    "σ → ∞",
                    "ϵ_a → 0",
                    "wages become infinite"
                  ],
                  correctIndex: 0,
                  explanation: "Correct! Integration lets the country import food, decoupling local jobs from local agronomic shocks."
                },
                {
                  question: "Q12.3 At current trade costs, climate change is estimated to change the poorest quartile’s agricultural GDP share by:",
                  options: ["−2.8 points", "+2.8 points (a genuine food problem)", "0", "+28 points"],
                  correctIndex: 1,
                  explanation: "Correct! The model calibrated simulation projects a +2.8 percentage point increase in farming's share."
                },
                {
                  question: "Q12.4 Moving to 90th-percentile trade openness:",
                  options: [
                    "worsens welfare losses to −10%",
                    "reduces the poorest quartile’s welfare loss from −6.6% to −3.8% and reverses the rise in agriculture’s share",
                    "has no effect",
                    "only helps rich countries"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Openness cuts the climate loss by nearly half and lets workers transition out of agriculture."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Food Problem Causal-Anatomy Diagram</span>
            <div style={{ display: 'flex', gap: '8px', padding: '4px' }}>
              {[1, 2, 3, 4].map(step => (
                <button 
                  key={step} 
                  onClick={() => setCausalStep(step)}
                  className={`quiz-btn ${causalStep === step ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                  style={{ padding: '6px 12px', fontSize: '0.85rem', minWidth: 'auto' }}
                >
                  {`Stage ${step}`}
                </button>
              ))}
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <rect x="20" y="20" width="360" height="150" fill="rgba(255,255,255,0.02)" rx="6" />
                
                {causalStep === 1 && (
                  <g>
                    <text x="200" y="50" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="bold">Stage 1: Climate Shock</text>
                    <text x="200" y="80" textAnchor="middle" fill="var(--text-primary)" fontSize="11">Agricultural productivity drops (dZ_ak &lt; 0)</text>
                    <text x="200" y="110" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" width="300">Warming reduces agricultural productivity by 14-21%.</text>
                  </g>
                )}

                {causalStep === 2 && (
                  <g>
                    <text x="200" y="50" textAnchor="middle" fill="var(--accent-primary)" fontSize="15" fontWeight="bold">Stage 2: Price &amp; Income Channels (Term A)</text>
                    <text x="200" y="80" textAnchor="middle" fill="var(--text-primary)" fontSize="11">Relative price P_ak/P_k ↑ and Real Income Y_k/P_k ↓</text>
                    <text x="200" y="110" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Since food is a necessity, budget share ω_ak must rise.</text>
                  </g>
                )}

                {causalStep === 3 && (
                  <g>
                    <text x="200" y="50" textAnchor="middle" fill="#8b5cf6" fontSize="15" fontWeight="bold">Stage 3: Trade-Reallocation Offset (Terms B &amp; C)</text>
                    <text x="200" y="80" textAnchor="middle" fill="var(--text-primary)" fontSize="11">Import shares rise and domestic shares fall (dπ_akk &lt; 0)</text>
                    <text x="200" y="110" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Under low trade barriers, imports replace domestic farming jobs.</text>
                  </g>
                )}

                {causalStep === 4 && (
                  <g>
                    <text x="200" y="50" textAnchor="middle" fill="#f59e0b" fontSize="15" fontWeight="bold">Stage 4: Net Effect &amp; Reallocation</text>
                    <text x="200" y="80" textAnchor="middle" fill="var(--text-primary)" fontSize="11">Agriculture labor share l_ak rises if trade costs are high</text>
                    <text x="200" y="110" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">High trade costs lock poor countries into low-productivity farming.</text>
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          8.13 — FINAL EXAM
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "8.13 — Final Exam" && (
        <div className="section-quiz-card" style={{ 
          marginTop: '24px', 
          padding: '24px', 
          border: '1px solid var(--card-border)', 
          borderRadius: '8px', 
          background: 'rgba(255,255,255,0.02)' 
        }}>
          <h4 style={{ color: 'var(--accent-secondary)', margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 600 }}>
            🏆 Module 8 Comprehensive Final Exam
          </h4>
          
          {showExamResults ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h5 style={{ fontSize: '1.3rem', margin: '10px 0', color: 'var(--text-primary)' }}>Final Exam Completed!</h5>
              <div style={{ 
                margin: '20px auto', 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                background: 'rgba(244, 63, 94, 0.1)', 
                border: '3px solid var(--accent-primary)' 
              }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{examScore}</span>
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/{finalQuestions.length}</span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                {examScore >= 18 
                  ? "Flawless! You have fully mastered the econometrics of climate change and environmental trade theory!"
                  : "Great effort! Review the lessons and try the exam again to sharpen your understanding."}
              </p>
              <button onClick={handleExamRestart} className="quiz-btn quiz-btn-primary">
                Restart Exam
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                <span>Question {currentExamIdx + 1} of {finalQuestions.length}</span>
                <span>Score: {examScore}</span>
              </div>
              <p style={{ fontWeight: 600, fontSize: '1rem', margin: '0 0 20px 0', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                {finalQuestions[currentExamIdx].question}
              </p>
              
              <div className="quiz-options-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {finalQuestions[currentExamIdx].options.map((option, idx) => {
                  let btnStyle = {
                    padding: '12px 16px',
                    textAlign: 'left',
                    borderRadius: '6px',
                    border: '1px solid var(--card-border)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.15s ease',
                  };

                  if (examSubmitted) {
                    if (idx === finalQuestions[currentExamIdx].correctIndex) {
                      btnStyle.background = 'rgba(16, 185, 129, 0.15)';
                      btnStyle.border = '1px solid #10b981';
                      btnStyle.color = '#10b981';
                    } else if (idx === selectedExamOpt) {
                      btnStyle.background = 'rgba(239, 68, 68, 0.15)';
                      btnStyle.border = '1px solid #ef4444';
                      btnStyle.color = '#ef4444';
                    } else {
                      btnStyle.opacity = 0.5;
                    }
                  } else if (idx === selectedExamOpt) {
                    btnStyle.background = 'var(--accent-primary)';
                    btnStyle.border = '1px solid var(--accent-primary)';
                    btnStyle.color = '#fff';
                  }

                  return (
                    <button
                      key={idx}
                      style={btnStyle}
                      onClick={() => handleExamOptionClick(idx)}
                      disabled={examSubmitted}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {examSubmitted && (
                <div style={{ 
                  marginTop: '20px', 
                  padding: '16px', 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  borderRadius: '6px', 
                  borderLeft: '4px solid var(--accent-secondary)',
                  animation: 'fadeInM8 0.2s ease-out'
                }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    <strong>Explanation:</strong> {finalQuestions[currentExamIdx].explanation}
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', borderTop: '1px solid var(--card-border)', paddingTop: '16px' }}>
                <button
                  className="quiz-btn quiz-btn-secondary"
                  onClick={handleExamSubmit}
                  disabled={selectedExamOpt === null || examSubmitted}
                >
                  Submit Answer
                </button>
                <button
                  className="quiz-btn quiz-btn-primary"
                  onClick={handleExamNext}
                  disabled={!examSubmitted}
                >
                  {currentExamIdx === finalQuestions.length - 1 ? 'Finish Exam' : 'Next Question →'}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
