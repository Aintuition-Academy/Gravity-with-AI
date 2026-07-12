import React, { useState, useEffect } from 'react';
import './Module7.css';
import { BookOpen, Lightbulb, Calculator, ArrowRight, Play, RefreshCw, BarChart2 } from 'lucide-react';

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
        background: 'rgba(16, 185, 129, 0.02)',
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
            background: 'rgba(16, 185, 129, 0.1)', 
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
              animation: 'fadeInM7 0.2s ease-out'
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
   MAIN MODULE 7 COMPONENT
   ════════════════════════════════════════════════════════════════════════ */

const finalQuestions = [
  {
    question: "F1. The multilateral resistance system (2-2)–(2-3) can only be solved:",
    options: [
      "in unique absolute levels",
      "up to a normalising scalar, requiring a reference-country normalisation",
      "only with cross-section data",
      "only if trade costs are symmetric"
    ],
    correctIndex: 1,
    explanation: "Correct! The structural gravity system is homogeneous of degree zero in Π_i and P_j, so a reference country normalisation is always required."
  },
  {
    question: "F2. A bilateral RTA between i and j affects non-member countries mainly through:",
    options: [
      "a direct cut in their own trade costs",
      "changes in their own multilateral resistances, triggered by the liberalizing countries’ improved market access",
      "changes in their tariff schedules",
      "nothing; non-members are unaffected"
    ],
    correctIndex: 1,
    explanation: "Correct! Non-members are affected via third-party multilateral resistance shifters that reflect the members' improved market integration."
  },
  {
    question: "F3. In the “conditional general equilibrium” scenario, which of the following remains fixed?",
    options: [
      "bilateral trade costs",
      "output and expenditure",
      "the multilateral resistances",
      "factory-gate prices"
    ],
    correctIndex: 1,
    explanation: "Correct! Conditional GE holds nominal output Y_i and expenditure E_j fixed, focusing solely on MR adjustments."
  },
  {
    question: "F4. In the “full endowment general equilibrium” scenario, relative to conditional GE, the additional channel activated is:",
    options: [
      "endogenous factory-gate prices, output, and expenditure",
      "endogenous elasticities of substitution",
      "endogenous population growth",
      "endogenous physical endowments Qi"
    ],
    correctIndex: 0,
    explanation: "Correct! Full endowment GE endogenizes factory-gate prices, allowing nominal GDP and expenditure to adjust while holding physical endowments fixed."
  },
  {
    question: "F5. Nesting gravity inside a dynamic capital-accumulation model, setting δ = 0:",
    options: [
      "breaks the gravity system",
      "recovers the static endowment-economy gravity system exactly",
      "makes trade costs irrelevant",
      "eliminates the multilateral resistances"
    ],
    correctIndex: 1,
    explanation: "Correct! Setting the capital accumulation parameter δ = 0 shuts off dynamics, collapsing the system exactly to the static endowment benchmark."
  },
  {
    question: "F6. The Constructed Trade Bias (CTB) index is independent of the elasticity of substitution σ because it is built from:",
    options: [
      "raw trade values only",
      "the power-transformed objects t^(1-σ)_ij, Π^(1-σ)_i, P^(1-σ)_j directly",
      "tariff data",
      "GDP per capita"
    ],
    correctIndex: 1,
    explanation: "Correct! By using power-transformed baseline items directly, CTB cancels out the need for σ."
  },
  {
    question: "F7. The ACR sufficient-statistic welfare formula relates welfare gains to changes in:",
    options: [
      "the domestic expenditure share and the trade elasticity",
      "the exchange rate",
      "population growth",
      "government spending"
    ],
    correctIndex: 0,
    explanation: "Correct! ACR shows that changes in domestic trade shares and the trade elasticity are sufficient to compute aggregate welfare gains."
  },
  {
    question: "F8. The GEPPML procedure recovers the multilateral resistances from:",
    options: [
      "a stand-alone non-linear solver only",
      "the estimated exporter-time and importer-time fixed effects of a PPML gravity regression",
      "survey data",
      "bilateral exchange rates"
    ],
    correctIndex: 1,
    explanation: "Correct! GEPPML maps the estimated fixed effects of a standard PPML model directly onto structural resistances."
  },
  {
    question: "F9. The GEPPML iterative loop for full endowment GE effects converges when:",
    options: [
      "exactly one iteration has run",
      "the change in factory-gate prices across iterations goes to zero",
      "the pair fixed effects are dropped",
      "σ reaches its maximum value"
    ],
    correctIndex: 1,
    explanation: "Correct! Convergence is defined by the changes in factory-gate prices between iterations shrinking to zero."
  },
  {
    question: "F10. Missing/zero bilateral trade data over a whole sample period can be handled in the GEPPML framework by:",
    options: [
      "ignoring the pair permanently",
      "regressing estimable pair fixed effects on gravity covariates and country fixed effects, then predicting the missing values",
      "setting the missing trade cost to zero",
      "excluding the country entirely from all counterfactuals"
    ],
    correctIndex: 1,
    explanation: "Correct! The two-stage Anderson-Yotov (2016) procedure fits a gravity-style predictor to fill missing cells."
  },
  {
    question: "F11. In the “trade without borders” application, real GDP gains from removing all international borders are found to be:",
    options: [
      "larger for small/less-developed economies, working mainly through lower consumer prices",
      "identical across all countries",
      "larger only for the United States and Japan",
      "negative for every country"
    ],
    correctIndex: 0,
    explanation: "Correct! Small, remote countries benefit heavily from consumer-price drops (lower inward MR), yielding higher relative GDP gains."
  },
  {
    question: "F12. NAFTA member countries’ full endowment general equilibrium export gains are slightly larger than their conditional GE gains because:",
    options: [
      "of a size effect: higher factory-gate prices and income reinforce the pure trade-cost effect",
      "non-member trade costs also fell",
      "of a calculation error in the Guide",
      "conditional GE always overstates true effects"
    ],
    correctIndex: 0,
    explanation: "Correct! Endogenizing prices adds positive income feedbacks, expanding members' trade capacity further."
  },
  {
    question: "F13. Non-member countries’ trade and welfare responses to NAFTA are, in general equilibrium:",
    options: [
      "as large as member countries’ responses",
      "small, typically slightly negative, and an order of magnitude smaller than member responses",
      "always exactly zero",
      "always positive and large"
    ],
    correctIndex: 1,
    explanation: "Correct! Non-member responses are second-order and typically two orders of magnitude smaller than member effects."
  },
  {
    question: "F14. The core reason PPML fixed effects can substitute for a generic non-linear GE solver is:",
    options: [
      "PPML fixed effects are unrelated to the multilateral resistances",
      "PPML’s additive property makes its fixed effects map exactly onto the structural multilateral resistance terms",
      "non-linear solvers are always faster",
      "PPML cannot estimate fixed effects"
    ],
    correctIndex: 1,
    explanation: "Correct! PPML's structural properties ensure that estimated fixed effects satisfy the theoretical MR equations."
  },
  {
    question: "F15. The dynamic gravity extension shows that a trade-cost shock in one country can affect capital accumulation everywhere because:",
    options: [
      "capital accumulation depends on factory-gate prices and the inward multilateral resistance, both of which are general-equilibrium objects that respond to shocks anywhere in the world",
      "capital is perfectly mobile across countries",
      "trade costs directly enter the capital accumulation equation with no other channel",
      "dynamic considerations are irrelevant to gravity"
    ],
    correctIndex: 0,
    explanation: "Correct! Trade shocks ripple to prices and MRs globally, shifting the investment rate in all countries."
  }
];

export default function Module7({ theme, setActiveTab }) {
  const [moduleTab, setModuleTab] = useState("7.1 — GE Gravity System");
  const [activeMathStep, setActiveMathStep] = useState(1);

  useEffect(() => {
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [moduleTab, activeMathStep]);

  useEffect(() => {
    setActiveMathStep(1);
  }, [moduleTab]);

  // ──────────────────────────────────────────────────────────────────────
  // TAB 7.1 STATES: MR TRADE RESPONSE
  // ──────────────────────────────────────────────────────────────────────
  const [mrPi, setMrPi] = useState(1.0);
  const [mrPj, setMrPj] = useState(1.0);
  const [mrTij, setMrTij] = useState(1.5);
  const [mrSigma, setMrSigma] = useState(4.0);

  const baselineTrade = 100.0;
  const realizedTrade = (baselineTrade * Math.pow(mrTij / (mrPi * mrPj), 1 - mrSigma)).toFixed(1);

  // ──────────────────────────────────────────────────────────────────────
  // TAB 7.2 STATES: THREE CHANNELS RIPPLE
  // ──────────────────────────────────────────────────────────────────────
  const [rippleActive, setRippleActive] = useState(false);
  const [channelType, setChannelType] = useState("PE"); // PE, CDL_GE, FULL_GE

  // Member trade change and Non-member trade change
  let memberTradeChg = 0;
  let nonMemberTradeChg = 0;

  if (rippleActive) {
    if (channelType === "PE") {
      memberTradeChg = 55.1;
      nonMemberTradeChg = 0.0;
    } else if (channelType === "CDL_GE") {
      memberTradeChg = 35.0;
      nonMemberTradeChg = -0.14;
    } else {
      memberTradeChg = 37.5;
      nonMemberTradeChg = -0.17;
    }
  }

  // ──────────────────────────────────────────────────────────────────────
  // TAB 7.3 STATES: CAPITAL ACCUMULATION
  // ──────────────────────────────────────────────────────────────────────
  const [deltaVal, setDeltaVal] = useState(0.3);
  const [shockTriggered, setShockTriggered] = useState(false);

  const getCapitalPath = () => {
    let path = [];
    let K = 100.0;
    const shockPeriod = 5;
    for (let t = 0; t <= 15; t++) {
      if (shockTriggered && t >= shockPeriod) {
        // Higher investment rate due to shock
        const shockEffect = deltaVal * 15.0;
        K = K * (1 - deltaVal) + deltaVal * 120.0 + shockEffect;
      } else {
        K = K * (1 - deltaVal) + deltaVal * 100.0;
      }
      path.push({ t, K: parseFloat(K.toFixed(1)) });
    }
    return path;
  };

  const capitalPath = getCapitalPath();

  // ──────────────────────────────────────────────────────────────────────
  // TAB 7.4 STATES: NORMALIZED MR VS CPI
  // ──────────────────────────────────────────────────────────────────────
  const [showIntermediates, setShowIntermediates] = useState(false);
  const [showProdWeighted, setShowProdWeighted] = useState(false);
  const [showHomeBias, setShowHomeBias] = useState(false);
  const [showMisspec, setShowMisspec] = useState(false);

  const getCpiData = () => {
    let base = 100.0;
    let mr = 100.0;
    let path = [];
    for (let t = 0; t <= 10; t++) {
      let gap = 0;
      if (showIntermediates) gap += 2.5 * t;
      if (showProdWeighted) gap += 1.8 * t;
      if (showHomeBias) gap -= 3.0 * t;
      if (showMisspec) gap += 4.0 * Math.sin(t);
      path.push({ t, cpi: parseFloat((base - t * 1.5).toFixed(1)), mr: parseFloat((mr - t * 1.5 + gap).toFixed(1)) });
    }
    return path;
  };

  const cpiData = getCpiData();

  // ──────────────────────────────────────────────────────────────────────
  // TAB 7.5 STATES: ACR WELFARE CALCULATOR
  // ──────────────────────────────────────────────────────────────────────
  const [acrLambdaChg, setAcrLambdaChg] = useState(0.9); // counterfactual over baseline
  const [acrSigma, setAcrSigma] = useState(5.0);
  const acrWelfare = ((Math.pow(acrLambdaChg, 1 / (1 - acrSigma)) - 1) * 100).toFixed(2);

  // ──────────────────────────────────────────────────────────────────────
  // TAB 7.6 STATES: 5-STEP WIZARD
  // ──────────────────────────────────────────────────────────────────────
  const [wizardStep, setWizardStep] = useState(1);

  // ──────────────────────────────────────────────────────────────────────
  // TAB 7.7 STATES: FIXED EFFECTS SHIFTING
  // ──────────────────────────────────────────────────────────────────────
  const [rtaFlipped, setRtaFlipped] = useState(false);
  const feResults = {
    baseline: { memberPi: 1.0, memberP: 1.0, nonMemberPi: 1.0, nonMemberP: 1.0 },
    counterfactual: { memberPi: 0.85, memberP: 0.88, nonMemberPi: 1.05, nonMemberP: 1.04 }
  };
  const activeFE = rtaFlipped ? feResults.counterfactual : feResults.baseline;

  // ──────────────────────────────────────────────────────────────────────
  // TAB 7.8 STATES: ITERATIVE LOOP SIMULATOR
  // ──────────────────────────────────────────────────────────────────────
  const [loopIter, setLoopIter] = useState(0);
  const [loopRunning, setLoopRunning] = useState(false);
  const loopPath = [
    { iter: 0, dp: 0.250 },
    { iter: 1, dp: 0.082 },
    { iter: 2, dp: 0.021 },
    { iter: 3, dp: 0.005 },
    { iter: 4, dp: 0.000 }
  ];

  const handleRunLoop = () => {
    if (loopRunning) return;
    setLoopRunning(true);
    setLoopIter(0);
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setLoopIter(current);
      if (current >= 4) {
        clearInterval(timer);
        setLoopRunning(false);
      }
    }, 1200);
  };

  // ──────────────────────────────────────────────────────────────────────
  // TAB 7.9 STATES: TRADE WITHOUT BORDERS
  // ──────────────────────────────────────────────────────────────────────
  const [borderView, setBorderView] = useState("exports"); // exports, gdp
  const borderData = [
    { country: "Small/Remote", exportsCDL: 60, exportsFULL: 110, gdpCDL: 2.1, gdpFULL: 5.4 },
    { country: "Medium sized", exportsCDL: 80, exportsFULL: 145, gdpCDL: 1.5, gdpFULL: 3.2 },
    { country: "Large/Central", exportsCDL: 115, exportsFULL: 206, gdpCDL: 0.8, gdpFULL: 1.8 }
  ];

  // ──────────────────────────────────────────────────────────────────────
  // TAB 7.10 STATES: NAFTA
  // ──────────────────────────────────────────────────────────────────────
  const naftaData = [
    { country: "CAN", partial: 55.05, cond: 34.99, fullEx: 37.46, fullGdp: 3.40, isMember: true },
    { country: "MEX", partial: 56.65, cond: 41.64, fullEx: 43.51, fullGdp: 3.81, isMember: true },
    { country: "USA", partial: 18.33, cond: 14.48, fullEx: 14.88, fullGdp: 0.33, isMember: true },
    { country: "DEU", partial: 0.00, cond: -0.14, fullEx: -0.17, fullGdp: -0.01, isMember: false },
    { country: "CHN", partial: 0.00, cond: -0.34, fullEx: -0.38, fullGdp: -0.01, isMember: false },
    { country: "COL", partial: 0.00, cond: -1.80, fullEx: -1.73, fullGdp: -0.03, isMember: false }
  ];

  const [naftaFilter, setNaftaFilter] = useState("all"); // all, member, nonmember

  const filteredNafta = naftaData.filter(d => {
    if (naftaFilter === "member") return d.isMember;
    if (naftaFilter === "nonmember") return !d.isMember;
    return true;
  });

  return (
    <div className="container module7-container" style={{ padding: '40px 24px' }}>
      
      {/* ── Header ── */}
      <div className="module-header">
        <button onClick={() => setActiveTab('home')} className="back-btn">
          <span>← Back to Course Path</span>
        </button>
        <div className="module-title-row">
          <div>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Module 7
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '4px' }}>General Equilibrium Structural Gravity</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px', fontStyle: 'italic', maxWidth: '800px', lineHeight: '1.4' }}>
              Based on Yotov, Y. V., Piermartini, R., Monteiro, J.-A., & Larch, M. (2016). An Advanced Guide to Trade Policy Analysis: The Structural Gravity Model. UNCTAD–WTO. Chapter 2 ("General Equilibrium").
            </p>
          </div>
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="module-sections-nav" style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        {[
          ["7.1 — GE Gravity System", "7.1 GE System & MRs"],
          ["7.2 — Three Channels", "7.2 Three GE Channels"],
          ["7.3 — Dynamic Growth Model", "7.3 Dynamic Growth"],
          ["7.4 — Normalization Indexes", "7.4 Normalization Indexes"],
          ["7.5 — Normalization-Free", "7.5 Normalization-Free"],
          ["7.6 — Five-Step Approach", "7.6 Five-Step Wizard"],
          ["7.7 — GEPPML Baseline/Cond", "7.7 GEPPML FE Shifting"],
          ["7.8 — GEPPML Full GE Loop", "7.8 GEPPML GE Loop"],
          ["7.9 — Trade Without Borders", "7.9 Trade Without Borders"],
          ["7.10 — NAFTA", "7.10 NAFTA application"],
          ["7.11 — Final Exam", "7.11 Final Exam"]
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
          7.1 — GE GRAVITY SYSTEM
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "7.1 — GE Gravity System" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 7.1: The GE Gravity System &amp; Six Properties of Multilateral Resistances</h3>
            <p>
              {`General equilibrium structural gravity models capture how bilateral trade shifters propagate globally through unobserved price aggregator indices.`}
            </p>

            <DefinitionBox title="The full structural gravity system">
              {`The full general-equilibrium gravity environment is defined by five equations:
              $$X_{ij} = \\frac{Y_i E_j}{Y} \\left( \\frac{t_{ij}}{\\Pi_i P_j} \\right)^{1-\\sigma} \\quad (2-1)$$
              $$\\Pi_i^{1-\\sigma} = \\sum_j \\left( \\frac{t_{ij}}{P_j} \\right)^{1-\\sigma} \\frac{E_j}{Y} \\quad (2-2)$$
              $$P_j^{1-\\sigma} = \\sum_i \\left( \\frac{t_{ij}}{\\Pi_i} \\right)^{1-\\sigma} \\frac{Y_i}{Y} \\quad (2-3)$$
              $$p_i = \\left( \\frac{Y_i}{Y} \\right)^{\\frac{1}{1-\\sigma}} \\frac{1}{\\alpha_i \\Pi_i} \\quad (2-4)$$
              $$E_i = \\phi_i Y_i = \\phi_i p_i Q_i \\quad (2-5)$$
              where $p_i$ is the market-clearing factory-gate price and $Q_i$ is the physical endowment.`}
            </DefinitionBox>

            <IntuitionBox title="Six reasons MRs are central">
              {`1. Krugman's Mars: remote countries trade more with each other because they have fewer alternatives.
              2. Theory-consistent aggregates: collapses N x N bilateral costs into 2 x N index variables.
              3. GE ripple: a bilateral liberalization affects the entire network.
              4. Incidence: Π_i is producer incidence; P_j is consumer incidence.
              5. Easy to construct: solvable by iteration or PPML fixed effects.
              6. Policy usefulness: decomposes policy impacts.`}
            </IntuitionBox>

            <DerivationBox title="Why Normalisation is always needed">
              {`Because the system (2-2)–(2-3) is homogeneous of degree zero in $\{\\Pi^{1-\\sigma}_i, P^{1-\\sigma}_j\}$, any scalar multiplication $\\lambda$ leaves the system invariant. Thus, we must choose a reference country $R$ to set $P_R = 1$ to fix the absolute level.`}
            </DerivationBox>

            <LessonQuiz 
              title="Lesson 7.1"
              questions={[
                {
                  question: "Q1.1 All else equal, two very remote countries (high Π_i and P_j) will trade with each other:",
                  options: [
                    "less, because remoteness always deters trade",
                    "more, because they have fewer good alternative trading partners",
                    "the same as any other pair",
                    "never, by definition"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Remote countries have fewer alternatives, making their bilateral links relatively more valuable (Krugman's Mars intuition)."
                },
                {
                  question: "Q1.2 The multilateral resistance system (2-2)–(2-3) can only be solved:",
                  options: [
                    "in absolute levels directly, with no ambiguity",
                    "up to a normalising scalar λ, requiring a reference-country normalisation",
                    "if σ = 1",
                    "using cross-sectional data only"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! System is homogeneous of degree zero, requiring a reference-country benchmark."
                },
                {
                  question: "Q1.3 Π_i is best described as the incidence of trade costs on:",
                  options: [
                    "consumers in country i, as if buying from one world market",
                    "producers in country i, as if selling to one world market",
                    "government revenue in country i",
                    "foreign consumers only"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Π_i acts as the average trade cost incidence facing producers/exporters in origin country i."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Multilateral Resistance Frictions &amp; Bilateral Trade</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>{`Outward MR ($\\Pi_i$):`} <span className="val-highlight">{mrPi.toFixed(2)}</span></label>
                <input type="range" min="0.5" max="2.5" step="0.1" value={mrPi} onChange={e => setMrPi(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>{`Inward MR ($P_j$):`} <span className="val-highlight-purple">{mrPj.toFixed(2)}</span></label>
                <input type="range" min="0.5" max="2.5" step="0.1" value={mrPj} onChange={e => setMrPj(Number(e.target.value))} className="range-slider slider-purple" />
              </div>
              <div className="slider-card">
                <label>{`Bilateral Trade Cost ($t_{ij}$):`} <span className="val-highlight-orange">{mrTij.toFixed(2)}</span></label>
                <input type="range" min="1.0" max="3.0" step="0.1" value={mrTij} onChange={e => setMrTij(Number(e.target.value))} className="range-slider slider-orange" />
              </div>
              <div className="slider-card">
                <label>{`Substitution Elasticity ($\\sigma$):`} <span className="val-highlight">{mrSigma}</span></label>
                <input type="range" min="2.0" max="8.0" step="0.5" value={mrSigma} onChange={e => setMrSigma(Number(e.target.value))} className="range-slider" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="200" y="40" textAnchor="middle" fill="var(--text-secondary)" fontSize="13">Bilateral Trade Flow (X_ij):</text>
                <text x="200" y="85" textAnchor="middle" fill="var(--accent-primary)" fontSize="32" fontWeight="bold">
                  {realizedTrade}
                </text>
                
                {/* Distance/Remoteness Link arrow */}
                <line x1="80" y1="140" x2="320" y2="140" stroke="#475569" strokeWidth="4" />
                <circle cx="80" cy="140" r="20" fill="var(--accent-primary)" />
                <circle cx="320" cy="140" r="20" fill="var(--accent-secondary)" />
                <text x="80" y="144" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">i</text>
                <text x="320" y="144" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">j</text>

                {/* Curved Arrow illustrating flow */}
                <path 
                  d="M 80 120 Q 200 80 320 120" 
                  fill="none" 
                  stroke="var(--accent-primary)" 
                  strokeWidth={Math.min(12, Math.max(1, realizedTrade / 20))} 
                  markerEnd="url(#arrow)" 
                />
              </svg>
            </div>
            <div className="implications-panel">
              <span style={{ fontWeight: 600 }}>Mars Remoteness Effect:</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {`When resistances (Π_i, P_j) increase (meaning countries are physically remote from the rest of the world), they trade MORE with each other (X_ij rises) for any given direct bilateral cost.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          7.2 — THREE CHANNELS
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "7.2 — Three Channels" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 7.2: Three Channels: Partial, Conditional GE, and Full GE</h3>
            <p>
              {`Analyzing how policy shocks propagate under three successive levels of general-equilibrium feedback.`}
            </p>

            <DerivationStepper 
              title="Understanding the Three Channels"
              steps={[
                {
                  explanation: "Channel 1: Partial equilibrium (direct) effects freezes MRs, prices, and sizes, changing only member links:",
                  math: "$$X_{ij} = \\frac{Y_i E_j}{Y} \\left( \\frac{t_{ij}}{\\Pi_i P_j} \\right)^{1-\\sigma} \\quad \\implies \\quad \\Delta X_{ij} \\propto \\Delta t_{ij}^{1-\\sigma}$$"
                },
                {
                  explanation: "Channel 2: Conditional general equilibrium allows MRs to adjust, capturing trade diversion while output sizes remain frozen:",
                  math: "$$\\Pi_i = F(t), \\quad P_j = G(t) \\quad \\text{with } Y_i, E_j \\text{ held constant}$$"
                },
                {
                  explanation: "Channel 3: Full endowment general equilibrium endogenizes factory prices (and thus outputs/spendings) via endowment links:",
                  math: "$$Y_i = p_i Q_i, \\quad E_i = \\phi_i Y_i \\quad \\text{with all equations solved simultaneously}$$"
                }
              ]}
            />

            <IntuitionBox title="Trade creation vs trade diversion">
              {`Because each MR index is a size-weighted average of all trade costs, the change in member MRs is always smaller in magnitude than the direct trade cost shock. Thus, trade diversion never completely wipes out the direct trade creation between members.`}
            </IntuitionBox>

            <LessonQuiz 
              title="Lesson 7.2"
              questions={[
                {
                  question: "Q2.1 In the “conditional general equilibrium” scenario, which variables are held fixed?",
                  options: [
                    "bilateral trade costs t_ij",
                    "output Y_i and expenditure E_j",
                    "the multilateral resistances",
                    "nothing is held fixed"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Conditional GE freezes nominal outputs/expenditures to isolate MR adjustments."
                },
                {
                  question: "Q2.2 Trade diversion in the conditional GE scenario can never overturn the direct trade-creation effect because:",
                  options: [
                    "trade diversion does not exist",
                    "the change in each multilateral resistance is a size-weighted average across all bilateral costs, so it is always smaller than the direct bilateral change",
                    "σ is always equal to one",
                    "non-members do not respond"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Weighting ensures the general equilibrium feedback is of a smaller order of magnitude than the primary shock."
                },
                {
                  question: "Q2.3 In the full endowment GE scenario, a fall in a liberalizing country’s outward multilateral resistance Π_i leads to:",
                  options: [
                    "a fall in its factory-gate price and output",
                    "a rise in its factory-gate price, and hence in its nominal output/income",
                    "no change in prices",
                    "a fall in world output"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Better market access raises exporter price levels, augmenting nominal output."
                },
                {
                  question: "Q2.4 The scope of the three general equilibrium channels, from narrowest to broadest, is:",
                  options: [
                    "full endowment GE, conditional GE, partial equilibrium",
                    "partial equilibrium, conditional GE, full endowment GE",
                    "conditional GE, full endowment GE, partial equilibrium",
                    "they all have identical scope"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Each channel is a strict superset of the constraints in the previous one."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Member vs. Non-Member Ripple Effect</span>
            <div style={{ display: 'flex', gap: '8px', padding: '4px' }}>
              <button 
                onClick={() => { setRippleActive(!rippleActive); }}
                className={`quiz-btn ${rippleActive ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              >
                {rippleActive ? "Reset Shock" : "Liberalize Link 1-2 (RTA)"}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px', margin: '8px 0' }}>
              {["PE", "CDL_GE", "FULL_GE"].map(ch => (
                <button 
                  key={ch} 
                  onClick={() => setChannelType(ch)} 
                  className={`quiz-btn ${channelType === ch ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  disabled={!rippleActive}
                >
                  {ch === "PE" ? "1. Partial" : ch === "CDL_GE" ? "2. Cond GE" : "3. Full GE"}
                </button>
              ))}
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                {/* Node 1 */}
                <circle cx="100" cy="80" r="24" fill={rippleActive ? "#10b981" : "#475569"} className="network-node" />
                <text x="100" y="84" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">Member 1</text>

                {/* Node 2 */}
                <circle cx="300" cy="80" r="24" fill={rippleActive ? "#10b981" : "#475569"} className="network-node" />
                <text x="300" y="84" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">Member 2</text>

                {/* Node 3 */}
                <circle cx="200" cy="170" r="24" fill={rippleActive ? "#ef4444" : "#475569"} className="network-node" />
                <text x="200" y="174" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">Outsider 3</text>

                {/* Link 1-2 */}
                <line x1="124" y1="80" x2="276" y2="80" stroke={rippleActive ? "#10b981" : "#475569"} strokeWidth={rippleActive ? "5" : "2"} />
                {rippleActive && <text x="200" y="70" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">t_12 ↓</text>}

                {/* Link 1-3 */}
                <line x1="115" y1="98" x2="182" y2="152" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" />

                {/* Link 2-3 */}
                <line x1="285" y1="98" x2="218" y2="152" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" />
              </svg>
            </div>
            
            <div className="implications-panel">
              <span style={{ fontWeight: 600 }}>Channel Comparison Results:</span>
              <div className="implications-grid">
                <div className="implication-stat-card">
                  <div className="implication-stat-val">{rippleActive ? `+${memberTradeChg}%` : "0.0%"}</div>
                  <div className="implication-stat-lbl">Members Trade 1-2</div>
                </div>
                <div className="implication-stat-card">
                  <div className="implication-stat-val orange-text">{rippleActive ? `${nonMemberTradeChg}%` : "0.0%"}</div>
                  <div className="implication-stat-lbl">Outsider Trade 1-3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          7.3 — NESTING GRAVITY IN A DYNAMIC GROWTH MODEL
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "7.3 — Dynamic Growth Model" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 7.3: Nesting Gravity Inside a Dynamic Growth Model</h3>
            <p>
              {`Expanding structural gravity beyond static allocations by incorporating capital accumulation dynamics.`}
            </p>

            <DefinitionBox title="The dynamic gravity system">
              {`Household variety investment choices collapse to a system isomorphic to static gravity (2-1)–(2-4) plus:
              $$Y_{i,t} = p_{i,t} A_{i,t} L_{i,t}^{1-\\eta} K_{i,t}^{\\eta}$$
              $$E_{i,t} = \\phi_i Y_{i,t}$$
              $$K_{i,t+1} = \\gamma^{\\delta} \\phi_{i,t}^{\\delta} \\left[ \\frac{\\eta p_{i,t} A_{i,t} L_{i,t}^{1-\\eta} K_{i,t}^{\\eta-1}}{(1-\\gamma+\\delta\\gamma)P_{i,t}} \\right]^{\\delta} K_{i,t}$$
              where $\\delta$ is the capital-share/depreciation coefficient.`}
            </DefinitionBox>

            <IntuitionBox title="The two new dynamic channels">
              {`1. Factory price link: A higher $p_{i,t}$ raises the marginal product of capital, encouraging investment.
              2. Resistance index link: A higher $P_{i,t}$ inflates the cost of investment goods, discouraging savings.`}
            </IntuitionBox>

            <LessonQuiz 
              title="Lesson 7.3"
              questions={[
                {
                  question: "Q3.1 Setting the capital-share/depreciation parameter δ = 0 in the dynamic gravity system:",
                  options: [
                    "breaks the model",
                    "collapses it exactly back to the static endowment-economy gravity system",
                    "eliminates trade entirely",
                    "only affects consumption, not trade"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Shutting off the capital dynamic parameter collapses the Lucas-Prescott structure back to static endowment gravity."
                },
                {
                  question: "Q3.2 Capital accumulation in country i is increasing in the factory-gate price pi,t because:",
                  options: [
                    "higher prices lower the marginal product of capital",
                    "higher prices raise the marginal product of capital, stimulating investment",
                    "prices do not affect capital accumulation",
                    "it is a pure accounting identity"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Exporter price gains shift capital return upward, inducing higher capital storage."
                },
                {
                  question: "Q3.3 Capital accumulation is decreasing in the inward multilateral resistance Pi,t because Pi,t prices:",
                  options: [
                    "government spending only",
                    "both consumption and investment goods, so expensive Pi,t discourages saving/investment",
                    "labour only",
                    "nothing relevant to households"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Inward MR serves as the price index for investment goods, raising costs when high."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Simulated Capital Path &amp; Accumulation</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>{`Capital Share / Speed ($\\delta$):`} <span className="val-highlight">{deltaVal}</span></label>
                <input type="range" min="0.0" max="0.8" step="0.1" value={deltaVal} onChange={e => setDeltaVal(Number(e.target.value))} className="range-slider" />
              </div>
              <button 
                onClick={() => setShockTriggered(!shockTriggered)} 
                className={`quiz-btn ${shockTriggered ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              >
                {shockTriggered ? "Reset Trade Shock" : "Trigger Trade Cost Cut"}
              </button>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="20" y="30" fill="var(--text-secondary)" fontSize="11" fontWeight="bold">Capital Stock over Time:</text>
                
                {/* Simulated Chart */}
                <path 
                  d={`M ${capitalPath.map(p => `${50 + p.t * 20} ${170 - (p.K - 100) * 1.5}`).join(" L ")}`}
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="3"
                />

                {capitalPath.map((p, idx) => (
                  <circle 
                    key={idx} 
                    cx={50 + p.t * 20} 
                    cy={170 - (p.K - 100) * 1.5} 
                    r="4" 
                    fill="var(--accent-secondary)" 
                  />
                ))}

                {shockTriggered && <line x1="150" y1="40" x2="150" y2="180" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" />}
                {shockTriggered && <text x="155" y="50" fill="#ef4444" fontSize="9">Shock t=5</text>}

                <line x1="50" y1="40" x2="50" y2="180" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="180" x2="360" y2="180" stroke="#475569" strokeWidth="2" />
                <text x="350" y="195" fill="var(--text-muted)" fontSize="9">Period (t)</text>
              </svg>
            </div>
            <div className="implications-panel">
              <span style={{ fontWeight: 600 }}>Dynamics Summary:</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {deltaVal === 0 
                  ? "At δ = 0, the capital stock is completely flat. Shocks fail to trigger capital accumulation, collapsing to the static case." 
                  : "Under δ > 0, the trade shock triggers a dynamic accumulation path, expanding productivity capacity over time."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          7.4 — GE INDEXES THAT REQUIRE NORMALIZATION
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "7.4 — Normalization Indexes" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 7.4: GE Indexes That Require Normalization</h3>
            <p>
              {`Analyzing inward/outward multilateral resistances and factory-gate prices relative to a baseline reference.`}
            </p>

            <DefinitionBox title="The normalization-dependent indexes">
              {`- Inward MR ($P_j$): CES-based price aggregate representing supplier access.
              - Outward MR ($\\Pi_i$): market access index representing exporter frictions.
              - Factory-gate price ($p_i$): directly updates nominal output and expend.`}
            </DefinitionBox>

            <IntuitionBox title="Why P_j diverges from headline CPI">
              {`1. Intermediates: captures trade costs on inputs, which are omitted in CPI.
              2. Production-weighted: weighted by output size instead of consumer bundles.
              3. Home-bias: absorbs preferences for domestic varieties.
              4. Model spec: relies on CES structural assumptions.`}
            </IntuitionBox>

            <LessonQuiz 
              title="Lesson 7.4"
              questions={[
                {
                  question: "Q4.1 The inward multilateral resistance Pj can be interpreted as a:",
                  options: [
                    "supplier access index summarizing the trade-cost incidence facing j’s consumers",
                    "measure of j’s labour force",
                    "tariff schedule",
                    "random error term"
                  ],
                  correctIndex: 0,
                  explanation: "Correct! Pj represents the aggregate competitor friction index facing consumers in destination j."
                },
                {
                  question: "Q4.2 Pj may only loosely track an observed consumer price index because:",
                  options: [
                    "it is measured in a different currency",
                    "it also captures intermediate-goods incidence, is production-weighted, may absorb home bias, and relies on the CES functional form",
                    "CPI data are never available",
                    "it only applies to services"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Theoretical constructs include production components and intermediate input links absent from CPI surveys."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Simulated Inward MR vs. Headline CPI</span>
            <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label><input type="checkbox" checked={showIntermediates} onChange={e => setShowIntermediates(e.target.checked)} /> Include intermediate-goods friction</label>
              <label><input type="checkbox" checked={showProdWeighted} onChange={e => setShowProdWeighted(e.target.checked)} /> Use production weights</label>
              <label><input type="checkbox" checked={showHomeBias} onChange={e => setShowHomeBias(e.target.checked)} /> Absorb Home-Bias wedge</label>
              <label><input type="checkbox" checked={showMisspec} onChange={e => setShowMisspec(e.target.checked)} /> Introduce CES mismatch</label>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="20" y="20" fill="var(--text-secondary)" fontSize="10" fontWeight="bold">Divergence Plot:</text>
                
                {/* Headline CPI Path */}
                <path 
                  d={`M ${cpiData.map(p => `${50 + p.t * 30} ${170 - (p.cpi - 80) * 4}`).join(" L ")}`}
                  fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="3,3"
                />
                <text x="320" y="80" fill="#64748b" fontSize="8">Headline CPI</text>

                {/* Solved Inward MR Path */}
                <path 
                  d={`M ${cpiData.map(p => `${50 + p.t * 30} ${170 - (p.mr - 80) * 4}`).join(" L ")}`}
                  fill="none" stroke="var(--accent-primary)" strokeWidth="3"
                />
                <text x="320" y="110" fill="var(--accent-primary)" fontSize="8">Inward MR (P_j)</text>

                <line x1="50" y1="30" x2="50" y2="180" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="180" x2="370" y2="180" stroke="#475569" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          7.5 — GE INDEXES INDEPENDENT OF NORMALIZATION
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "7.5 — Normalization-Free" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 7.5: GE Indexes Independent of Normalization</h3>
            <p>
              {`Mastering indexes that are scale-invariant, including CTB, Terms of Trade, and the ACR welfare formula.`}
            </p>

            <DefinitionBox title="Normalization-free indexes">
              {`- Constructed Trade Bias (CTB): ratio of predicted to frictionless trade:
              $$CTB_{ij} \\equiv \\frac{\\hat{X}_{ij}}{Y_i E_j / Y} = \\left( \\frac{\\hat{t}_{ij}}{\\hat{\\Pi}_i \\hat{P}_j} \\right)^{1-\\sigma} \\quad (2-22)$$
              - Terms of Trade ($ToT_i$): exporter price over importer price:
              $$ToT_i \\equiv \\frac{\\hat{p}_i}{\\hat{P}_i} \\quad (2-24)$$
              - ACR Welfare Gain Formula:
              $$WS_i \\equiv \\frac{W^{CFL}_i}{W^{BLN}_i} = \\left( \\frac{\\lambda^{CFL}_{ii}}{\\lambda^{BLN}_{ii}} \\right)^{\\frac{1}{1-\\sigma}} \\quad (2-25)$$`}
            </DefinitionBox>

            <IntuitionBox title="CTB advantages and the ACR sufficient statistic">
              {`CTB is independent of σ since it's computed using power-transformed objects directly. For welfare, the domestic expenditure share λ_ii is a sufficient statistic because it maps openness directly to real consumption gains.`}
            </IntuitionBox>

            <LessonQuiz 
              title="Lesson 7.5"
              questions={[
                {
                  question: "Q5.1 The Constructed Trade Bias (CTB) index is defined as:",
                  options: [
                    "actual trade divided by GDP",
                    "the ratio of predicted (fitted) trade to hypothetical frictionless trade",
                    "the elasticity of substitution",
                    "a tariff rate"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! CTB measures the ratio of estimated trade to the frictionless potential."
                },
                {
                  question: "Q5.2 The terms-of-trade index ToTi = pi / Pi can be interpreted as a welfare measure because:",
                  options: [
                    "it is always equal to one",
                    "the numerator reflects nominal income and the denominator reflects consumer prices",
                    "it ignores trade costs",
                    "it only applies to non-member countries"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! The ratio links nominal revenue shifts to competitor consumer price indices directly."
                },
                {
                  question: "Q5.3 The ACR sufficient-statistic welfare formula requires knowledge of:",
                  options: [
                    "the full bilateral trade cost matrix and all preference parameters",
                    "only the change in the domestic expenditure share and the trade elasticity",
                    "tariff revenue only",
                    "nothing beyond GDP"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! ACR sufficient stats prove that domestic trade shares and the trade elasticity alone identify welfare gains."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 ACR Sufficient-Statistic Welfare Calculator</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>{`Counterfactual Domestic Share Ratio ($\\lambda^{CFL}_{ii} / \\lambda^{BLN}_{ii}$):`} <span className="val-highlight">{acrLambdaChg}</span></label>
                <input type="range" min="0.5" max="1.5" step="0.05" value={acrLambdaChg} onChange={e => setAcrLambdaChg(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>{`Trade Elasticity ($\\sigma$):`} <span className="val-highlight-purple">{acrSigma}</span></label>
                <input type="range" min="2.0" max="8.0" step="0.5" value={acrSigma} onChange={e => setAcrSigma(Number(e.target.value))} className="range-slider slider-purple" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="200" y="60" textAnchor="middle" fill="var(--text-secondary)" fontSize="14">Implied Real Welfare Change:</text>
                <text x="200" y="110" textAnchor="middle" fill="var(--accent-primary)" fontSize="36" fontWeight="bold">
                  {parseFloat(acrWelfare) >= 0 ? `+${acrWelfare}%` : `${acrWelfare}%`}
                </text>
              </svg>
            </div>
            <div className="implications-panel">
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {`A lower counterfactual domestic share ratio represents liberalization (importing more). The ACR formula maps this shift directly into real consumption gains.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          7.6 — FIVE-STEP APPROACH
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "7.6 — Five-Step Approach" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 7.6: The Standard Five-Step Counterfactual Approach</h3>
            <p>
              {`Reviewing the chronological steps required to execute general-equilibrium counterfactual simulations.`}
            </p>

            <DerivationBox title="The Five Steps">
              {`- Step 1: Solve the baseline. Obtain baseline trade costs $\\hat{t}_{ij}$ via estimation, calibration (odds ratio), or estibration.
              - Step 2: Define the counterfactual. Change the policy vector (e.g. flip RTA $0 \\to 1$).
              - Step 3: Solve counterfactual model. Re-resolve MRs (conditional) or the full system (endowment).
              - Step 4: Report percentage changes in variables.
              - Step 5: Bootstrap confidence intervals to reflect baseline parameter uncertainty.`}
            </DerivationBox>

            <IntuitionBox title="Why bootstrap deterministic simulations?">
              {`Although counterfactual simulation formulas are deterministic, the baseline parameter values (like $\\hat{\\beta}$ and $\\sigma$) are estimated and carry standard errors. Bootstrapping maps this baseline uncertainty to counterfactual outputs.`}
            </IntuitionBox>

            <LessonQuiz 
              title="Lesson 7.6"
              questions={[
                {
                  question: "Q6.1 The “calibration” approach to obtaining baseline trade costs has the advantage of fitting the data perfectly, but the disadvantage that it:",
                  options: [
                    "cannot identify which policy produced a given trade-cost change",
                    "requires panel data",
                    "cannot be used with PPML",
                    "ignores multilateral resistances"
                  ],
                  correctIndex: 0,
                  explanation: "Correct! Calibration is purely numerical and cannot decouple policy determinants from residuals."
                },
                {
                  question: "Q6.2 “Estibration” (Anderson, Larch and Yotov, 2015b) combines:",
                  options: [
                    "two different elasticities of substitution",
                    "the decomposability of estimation with the perfect data fit of calibration, by folding the error term into the trade-cost vector",
                    "OLS and Tobit",
                    "cross-section and panel data only"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Estibration keeps estimation's causal decoupling while matching raw trade levels exactly."
                },
                {
                  question: "Q6.3 The “conditional general equilibrium” step of the standard approach solves:",
                  options: [
                    "the full 5 × N system including prices and incomes",
                    "only the multilateral resistance system (2-2)–(2-3), holding output and expenditure fixed",
                    "nothing; it is skipped in practice",
                    "only equation (2-1)"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Conditional GE isolates the MR channel by keeping country output size frozen."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Step-through Wizard: GE Counterfactual Workflow</span>
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '4px' }}>
              {[1, 2, 3, 4, 5].map(step => (
                <button 
                  key={step} 
                  onClick={() => setWizardStep(step)} 
                  className={`quiz-btn ${wizardStep === step ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                  style={{ padding: '6px 12px', fontSize: '0.8rem', minWidth: 'auto' }}
                >
                  {`Step ${step}`}
                </button>
              ))}
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="20" y="30" fill="var(--accent-primary)" fontSize="12" fontWeight="bold">
                  {wizardStep === 1 ? "1. Solve Baseline (Estimation / Calibration)" :
                   wizardStep === 2 ? "2. Define Counterfactual" :
                   wizardStep === 3 ? "3. Solve GE Counterfactual Model" :
                   wizardStep === 4 ? "4. Report Percentage Changes" :
                   "5. Bootstrap Confidence Intervals"}
                </text>

                <rect x="20" y="50" width="360" height="60" fill="rgba(255,255,255,0.03)" rx="4" />
                
                <text x="35" y="75" fill="var(--text-primary)" fontSize="9" fontWeight="bold">Formula:</text>
                <text x="35" y="95" fill="var(--text-secondary)" fontSize="9">
                  {wizardStep === 1 ? "t^(1-σ)_BLN = exp[μ_ij + T_ij β]" :
                   wizardStep === 2 ? "t^(1-σ)_CFL = exp[μ_ij + T_CFL β]" :
                   wizardStep === 3 ? "Solve Π_i, P_j (and p_i, Y_i in Full GE)" :
                   wizardStep === 4 ? "Δ% I_i = (I_CFL - I_BLN) / I_BLN * 100" :
                   "Bootstrap draws -> [2 I - I_BOOT(97.5%), 2 I - I_BOOT(2.5%)]"}
                </text>

                <text x="35" y="145" fill="var(--text-muted)" fontSize="10" width="350">
                  {wizardStep === 1 ? "Estimate baseline trade cost frictions and elasticities using historical data." :
                   wizardStep === 2 ? "Inject policy shock (e.g., set counterfactual RTA indicator variable to 1)." :
                   wizardStep === 3 ? "Simulate resistances (and sizes if full GE) using non-linear solvers or GEPPML." :
                   wizardStep === 4 ? "Compute welfare and trade shifts relative to the baseline scenario." :
                   "Derive margins of error using bootstrap iterations to address parameter uncertainty."}
                </text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          7.7 — GEPPML BASELINE/COND
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "7.7 — GEPPML Baseline/Cond" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 7.7: GEPPML Baseline and Conditional GE</h3>
            <p>
              {`Using estimated exporter and importer fixed effects directly to solve structural multilateral resistances.`}
            </p>

            <DefinitionBox title="The fixed-effects mapping">
              {`By utilizing PPML's additive property, the estimated fixed dummy parameters satisfy:
              $$\\exp(\\hat{\\pi}_{i,t}) = \\frac{Y_{i,t}}{\\hat{\\Pi}_{i,t}^{1-\\sigma}} E_{R,t} \\quad (2-36)$$
              $$\\exp(\\hat{\\chi}_{j,t}) = \\frac{E_{j,t}}{\\hat{P}_{j,t}^{1-\\sigma}} \\frac{1}{E_{R,t}} \\quad (2-37)$$
              Thus, re-estimating PPML with a modified policy variable directly delivers the new resistances.`}
            </DefinitionBox>

            <DerivationBox title="Anderson-Yotov missing trade costs procedure">
              {`If a country pair has zero recorded trade, we fit a gravity predictor on estimable pair dummies:
              $$\\exp(\\hat{\\mu}_{ij}) = \\exp[\\pi_i + \\chi_j + \\beta_1 \\ln DIST_{ij} + \\beta_2 CNTG_{ij} + \\beta_3 LANG_{ij} + \\beta_4 CLNY_{ij}]$$
              This creates a complete baseline wedge matrix, avoiding third-party bias.`}
            </DerivationBox>

            <LessonQuiz 
              title="Lesson 7.7"
              questions={[
                {
                  question: "Q7.1 The GEPPML procedure recovers the multilateral resistances directly from:",
                  options: [
                    "a separate non-linear solver only",
                    "the estimated exporter-time and importer-time fixed effects of a PPML gravity regression",
                    "the RESET test statistic",
                    "bilateral tariff schedules"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! PPML additive structure ensures fixed effects map directly to structural aggregates."
                },
                {
                  question: "Q7.2 If a country pair has zero recorded trade throughout the sample, its bilateral trade cost can be recovered by:",
                  options: [
                    "leaving it undefined, biasing the whole counterfactual",
                    "regressing the estimable pair fixed effects on standard gravity covariates and country fixed effects, then predicting the missing values",
                    "assuming it equals zero",
                    "using OLS on log trade only"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! The two-stage Anderson-Yotov regression fills in empty cells consistently."
                },
                {
                  question: "Q7.3 In the “conditional general equilibrium” PPML step, the coefficients ˆβ on the policy vector are:",
                  options: [
                    "re-estimated freely",
                    "held fixed at their baseline estimated values while the fixed effects re-adjust",
                    "set to zero",
                    "irrelevant"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! The policy elasticities remain locked while fixed dummies adjust to re-solve resistances."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 GEPPML Fixed Effects Shifting</span>
            <div style={{ display: 'flex', gap: '8px', padding: '4px' }}>
              <button 
                onClick={() => setRtaFlipped(!rtaFlipped)} 
                className={`quiz-btn ${rtaFlipped ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              >
                {rtaFlipped ? "RTA Counterfactual Active" : "Baseline Active"}
              </button>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="20" y="30" fill="var(--text-secondary)" fontSize="11" fontWeight="bold">Estimated Fixed Dummies (exp):</text>
                
                {/* Member Exporter FE */}
                <rect x="150" y="55" width={activeFE.memberPi * 100} height="15" fill="var(--accent-primary)" />
                <text x="20" y="67" fill="var(--text-primary)" fontSize="10" fontWeight="bold">Member Exp FE:</text>
                <text x="260" y="67" fill="var(--text-secondary)" fontSize="10">{activeFE.memberPi.toFixed(2)}</text>

                {/* Member Importer FE */}
                <rect x="150" y="85" width={activeFE.memberP * 100} height="15" fill="var(--accent-primary)" />
                <text x="20" y="97" fill="var(--text-primary)" fontSize="10" fontWeight="bold">Member Imp FE:</text>
                <text x="260" y="97" fill="var(--text-secondary)" fontSize="10">{activeFE.memberP.toFixed(2)}</text>

                {/* Outsider Exporter FE */}
                <rect x="150" y="115" width={activeFE.nonMemberPi * 100} height="15" fill="var(--accent-secondary)" />
                <text x="20" y="127" fill="var(--text-primary)" fontSize="10" fontWeight="bold">Outsider Exp FE:</text>
                <text x="260" y="127" fill="var(--text-secondary)" fontSize="10">{activeFE.nonMemberPi.toFixed(2)}</text>

                {/* Outsider Importer FE */}
                <rect x="150" y="145" width={activeFE.nonMemberP * 100} height="15" fill="var(--accent-secondary)" />
                <text x="20" y="157" fill="var(--text-primary)" fontSize="10" fontWeight="bold">Outsider Imp FE:</text>
                <text x="260" y="157" fill="var(--text-secondary)" fontSize="10">{activeFE.nonMemberP.toFixed(2)}</text>

                <line x1="150" y1="40" x2="150" y2="170" stroke="#475569" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          7.8 — GEPPML FULL GE LOOP
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "7.8 — GEPPML Full GE Loop" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 7.8: GEPPML Full Endowment GE Iterative Loop</h3>
            <p>
              {`Solving the complete general equilibrium system through repeated PPML estimations and price/income updates.`}
            </p>

            <DefinitionBox title="The GEPPML Loop Stages">
              {`- (i) Update prices:
              $$\\Delta p^{CFL}_{i,t} = \\left[ \\frac{\\exp(\\hat{\\pi}^{CFL}_{i,t}) / E^{CFL}_{R,t}}{\\exp(\\hat{\\pi}_{i,t}) / E_{R,t}} \\right]^{\\frac{1}{1-\\sigma}} \\quad (2-43)$$
              - (ii) Update size:
              $$Y^{CFL}_{i,t} = (p^{CFL}_{i,t}/p_{i,t})Y_{i,t}, \\quad E^{CFL}_{j,t} = (p^{CFL}_{j,t}/p_{j,t})E_{j,t}$$
              - (iii) Re-estimate PPML on updated trade flows $X^{CFL}_{ij,t}$.
              - (iv) Iterate until $\\Delta p^{CFL}_{i,t} \\to 0$.`}
            </DefinitionBox>

            <IntuitionBox title="First-order updates within the loop">
              {`The updated trade matrix equation (2-44) is considered 'first-order' because it uses conditional, not yet fully converged multilateral resistances. Repeatedly cycling resolves this feedback completely.`}
            </IntuitionBox>

            <LessonQuiz 
              title="Lesson 7.8"
              questions={[
                {
                  question: "Q8.1 The GEPPML iterative loop converges when:",
                  options: [
                    "the trade elasticity reaches zero",
                    "the change in factory-gate prices from one iteration to the next goes to zero for every country",
                    "exactly 200 iterations have run",
                    "the pair fixed effects become negative"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Fixed-point convergence is reached when price shifts stabilize."
                },
                {
                  question: "Q8.2 Equation (2-44), which updates trade in the loop, is described as only a “first-order” update because:",
                  options: [
                    "it ignores trade costs entirely",
                    "it uses the conditional (not yet fully updated) multilateral resistances, requiring further iteration to converge",
                    "it only applies to two countries",
                    "it assumes zero trade costs"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! It utilizes intermediate MR values that require looping to reach the GE steady state."
                },
                {
                  question: "Q8.3 The core practical appeal of GEPPML relative to a generic non-linear solver is that it:",
                  options: [
                    "requires no software at all",
                    "can be implemented with nothing more than repeated calls to a standard PPML routine available in most statistical packages",
                    "avoids the need for any baseline data",
                    "only works for two-country models"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Loops of standard PPML estimators bypass the need for custom optimization routines."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 GEPPML Loop Convergence Simulator</span>
            <div style={{ padding: '4px' }}>
              <button 
                onClick={handleRunLoop} 
                disabled={loopRunning}
                className="quiz-btn quiz-btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <RefreshCw size={16} className={loopRunning ? "pulsing-loop-arrow" : ""} />
                {loopRunning ? `Running... Iter ${loopIter}` : "Run GEPPML Loop"}
              </button>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                {/* Convergence diagram */}
                <path 
                  d={`M ${loopPath.map(p => `${50 + p.iter * 60} ${180 - p.dp * 500}`).join(" L ")}`}
                  fill="none" stroke="var(--accent-primary)" strokeWidth="3"
                />
                
                {loopPath.map(p => (
                  <circle 
                    key={p.iter}
                    cx={50 + p.iter * 60} 
                    cy={180 - p.dp * 500} 
                    r={loopIter === p.iter ? "7" : "4"} 
                    fill={loopIter === p.iter ? "#ef4444" : "var(--accent-secondary)"} 
                  />
                ))}

                <line x1="50" y1="20" x2="50" y2="185" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="185" x2="350" y2="185" stroke="#475569" strokeWidth="2" />
                
                <text x="350" y="200" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Iteration</text>
                <text x="40" y="20" fill="var(--text-muted)" fontSize="9" textAnchor="end">Δp</text>
              </svg>
            </div>
            <div className="implications-panel" style={{ padding: '8px 12px' }}>
              <span style={{ fontSize: '0.8rem' }}>
                Current Price Error (Δp): <strong>{loopPath[loopIter].dp.toFixed(4)}</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          7.9 — TRADE WITHOUT BORDERS
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "7.9 — Trade Without Borders" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 7.9: Application — Trade Without Borders</h3>
            <p>
              {`Applying the GEPPML framework to a world where all international border frictions are set to zero.`}
            </p>

            <DerivationBox title="Baseline Border Friction Estimates">
              {`The 2006 cross-sectional estimation yields:
              $$\\ln X_{ij} = \\pi_i + \\chi_j - 0.791 \\ln DIST_{ij} + 0.674 CNTG_{ij} - 2.474 INTL_{ij}$$
              The border coefficient (-2.474) implies that international borders reduce trade, on average, by:
              $$\\left( e^{-2.474} - 1 \\right) \\times 100 \\approx -91.6\\%$$`}
            </DerivationBox>

            <IntuitionBox title="Four findings from Figures 6-7">
              {`1. Full endowment export responses exceed conditional GE by 41 to 91 percentage points.
              2. Large countries export more (positive correlation between size and export response).
              3. Real GDP gains suggestion: roughly half of Costinot-Rodríguez-Clare's autarky benchmark.
              4. Small/less-developed economies gain more in real GDP, but via consumer-price drops (lower P_j) rather than producer prices.`}
            </IntuitionBox>

            <LessonQuiz 
              title="Lesson 7.9"
              questions={[
                {
                  question: "Q9.1 In the “trade without borders” application, the estimated international-border coefficient implies borders reduce trade by approximately:",
                  options: ["9%", "50%", "91.6%", "2.5%"],
                  correctIndex: 2,
                  explanation: "Correct! The coefficient of -2.474 translates to an exponential volume cut of -91.6%."
                },
                {
                  question: "Q9.2 The full endowment general equilibrium export response to removing borders is:",
                  options: [
                    "always smaller than the conditional GE response",
                    "consistently larger than the conditional GE response, by 41 to 91 percentage points",
                    "exactly equal to the conditional GE response",
                    "unrelated to country size"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Income feedbacks augment trade capacity, adding 41-91 percentage points of export expansion."
                },
                {
                  question: "Q9.3 Real GDP gains from removing all borders are found to be, on average:",
                  options: [
                    "larger for small/less-developed economies, concentrated on the consumer-price side",
                    "larger for small economies, concentrated on the producer-price side",
                    "identical across all countries",
                    "largest for the United States and Japan"
                  ],
                  correctIndex: 0,
                  explanation: "Correct! Smaller remote economies benefit primarily via consumer price index drops (falling P_j)."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Border Removal: Conditional vs Full GE</span>
            <div style={{ display: 'flex', gap: '8px', padding: '4px' }}>
              <button 
                onClick={() => setBorderView("exports")} 
                className={`quiz-btn ${borderView === "exports" ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              >
                Export Gains (%)
              </button>
              <button 
                onClick={() => setBorderView("gdp")} 
                className={`quiz-btn ${borderView === "gdp" ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              >
                Real GDP Gains (%)
              </button>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="20" y="25" fill="var(--text-secondary)" fontSize="10" fontWeight="bold">Country Responses:</text>
                
                {borderData.map((d, idx) => {
                  const valCDL = borderView === "exports" ? d.exportsCDL : d.gdpCDL * 30;
                  const valFULL = borderView === "exports" ? d.exportsFULL : d.gdpFULL * 30;
                  const lblCDL = borderView === "exports" ? `+${d.exportsCDL}%` : `+${d.gdpCDL}%`;
                  const lblFULL = borderView === "exports" ? `+${d.exportsFULL}%` : `+${d.gdpFULL}%`;

                  return (
                    <g key={idx} transform={`translate(0, ${40 + idx * 55})`}>
                      <text x="20" y="15" fill="var(--text-primary)" fontSize="10" fontWeight="bold">{d.country}</text>
                      
                      {/* Conditional GE Bar */}
                      <rect x="110" y="0" width={valCDL} height="12" fill="var(--accent-secondary)" />
                      <text x={115 + valCDL} y="10" fill="var(--accent-secondary)" fontSize="9">{lblCDL}</text>

                      {/* Full GE Bar */}
                      <rect x="110" y="15" width={valFULL} height="12" fill="var(--accent-primary)" />
                      <text x={115 + valFULL} y="25" fill="var(--accent-primary)" fontSize="9">{lblFULL}</text>
                    </g>
                  );
                })}

                <line x1="110" y1="30" x2="110" y2="200" stroke="#475569" strokeWidth="2" />
              </svg>
            </div>
            <div className="implications-panel" style={{ padding: '6px 12px' }}>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {borderView === "exports" 
                  ? "Exporter size is positively correlated with total export expansion." 
                  : "GDP gains are larger for small/remote countries through consumer prices."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          7.10 — NAFTA
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "7.10 — NAFTA" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 7.10: Application — NAFTA in General Equilibrium</h3>
            <p>
              {`Analyzing the regional and global trade-policy impacts of NAFTA across different equilibrium channels.`}
            </p>

            <IntuitionBox title="Key Takeaways from NAFTA results">
              {`- Partial vs. Conditional GE: member gains contract in conditional GE (35-42% vs 55-57%) due to trade diversion.
              - Conditional vs. Full GE: member gains are slightly higher in full GE because factory-gate prices rise.
              - Welfare: members' real GDP rises by 0.3% to 3.8% while non-member welfare shifts are negligible (second-order).`}
            </IntuitionBox>

            <LessonQuiz 
              title="Lesson 7.10"
              questions={[
                {
                  question: "Q10.1 Member countries’ export gains from NAFTA are smaller in conditional general equilibrium than in partial equilibrium because:",
                  options: [
                    "of measurement error only",
                    "trade diversion: part of the increase in trade with partners comes at the expense of trade with non-members and domestic sales",
                    "NAFTA reduced tariffs to zero on all goods",
                    "conditional GE ignores multilateral resistances"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Trade diversion offsets some of the initial bilateral trade creation."
                },
                {
                  question: "Q10.2 Non-member countries’ export and real GDP responses to NAFTA are:",
                  options: [
                    "exactly zero in every scenario",
                    "small and typically negative, an order of magnitude smaller than the effects on members",
                    "larger than the effects on members",
                    "always positive"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Third-party effects are second-order and typically two orders of magnitude smaller."
                },
                {
                  question: "Q10.3 Full endowment general equilibrium export gains for NAFTA members are slightly larger than conditional GE gains because:",
                  options: [
                    "of a coding convention",
                    "members’ higher factory-gate prices and incomes add a size effect that reinforces the pure trade-cost effect",
                    "conditional GE overstates the true gains",
                    "non-members’ trade costs fell too"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Size/income effects act as positive feedback shifters in the full GE system."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Table 4: Interactive NAFTA Simulation Results</span>
            <div style={{ display: 'flex', gap: '8px', padding: '4px' }}>
              <button onClick={() => setNaftaFilter("all")} className={`quiz-btn ${naftaFilter === "all" ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`} style={{ padding: '3px 8px', fontSize: '0.75rem' }}>All</button>
              <button onClick={() => setNaftaFilter("member")} className={`quiz-btn ${naftaFilter === "member" ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`} style={{ padding: '3px 8px', fontSize: '0.75rem' }}>Members</button>
              <button onClick={() => setNaftaFilter("nonmember")} className={`quiz-btn ${naftaFilter === "nonmember" ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`} style={{ padding: '3px 8px', fontSize: '0.75rem' }}>Non-Members</button>
            </div>

            <div style={{ overflowX: 'auto', marginTop: '12px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--card-border)' }}>
                    <th style={{ textAlign: 'left', padding: '6px' }}>Country</th>
                    <th style={{ textAlign: 'right', padding: '6px' }}>Partial Ex %</th>
                    <th style={{ textAlign: 'right', padding: '6px' }}>Cond Ex %</th>
                    <th style={{ textAlign: 'right', padding: '6px' }}>Full Ex %</th>
                    <th style={{ textAlign: 'right', padding: '6px' }}>Real GDP %</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNafta.map((d, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--card-border)' }}>
                      <td style={{ padding: '6px', fontWeight: 'bold' }}>{d.country}</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>{d.partial.toFixed(2)}</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>{d.cond.toFixed(2)}</td>
                      <td style={{ padding: '6px', textAlign: 'right' }}>{d.fullEx.toFixed(2)}</td>
                      <td style={{ padding: '6px', textAlign: 'right', color: d.fullGdp >= 0 ? '#10b981' : '#ef4444' }}>{d.fullGdp.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          7.11 — FINAL EXAM
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "7.11 — Final Exam" && (
        <div className="section-quiz-card" style={{ 
          marginTop: '24px', 
          padding: '24px', 
          border: '1px solid var(--card-border)', 
          borderRadius: '8px', 
          background: 'rgba(255,255,255,0.02)' 
        }}>
          <h4 style={{ color: 'var(--accent-secondary)', margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 600 }}>
            🏆 Module 7 Comprehensive Final Exam
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
                background: 'rgba(16, 185, 129, 0.1)', 
                border: '3px solid var(--accent-primary)' 
              }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{examScore}</span>
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/{finalQuestions.length}</span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                {examScore >= 12 
                  ? "Flawless! You have fully mastered the general equilibrium econometrics of gravity models!"
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
                  animation: 'fadeInM7 0.2s ease-out'
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
