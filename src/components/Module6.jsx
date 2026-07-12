import React, { useState, useEffect } from 'react';
import './Module6.css';
import { BookOpen, Lightbulb, Calculator, HelpCircle, ArrowRight, Play, Sliders } from 'lucide-react';

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
        background: 'rgba(59, 130, 246, 0.02)',
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
            background: 'rgba(124, 58, 237, 0.1)', 
            border: '2px solid var(--accent-secondary)' 
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
                btnStyle.background = 'var(--accent-secondary)';
                btnStyle.border = '1px solid var(--accent-secondary)';
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
              animation: 'fadeInM6 0.2s ease-out'
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
   MAIN MODULE 6 COMPONENT
   ════════════════════════════════════════════════════════════════════════ */

const finalQuestions = [
  {
    question: "F1. In the Newton/gravity analogy, the gravitational constant G maps to:",
    options: ["the elasticity of substitution", "the inverse of world output, 1/Y", "bilateral distance", "the trade elasticity θ"],
    correctIndex: 1,
    explanation: "Correct! In the structural gravity model, the gravitational constant G maps directly to 1/Y where Y is world nominal output."
  },
  {
    question: "F2. The structural gravity equation Xij = (YiEj/Y)(tij/(ΠiPj))^(1-σ) is derived by combining CES demand with:",
    options: ["free entry", "market clearing for each origin’s output", "balanced trade for each pair", "fixed wages"],
    correctIndex: 1,
    explanation: "Correct! Imposing market clearing for each exporter's output (Yi = sum_j Xij) closes the CES demand system and implicitly defines the multilateral resistances."
  },
  {
    question: "F3. The outward and inward multilateral resistances Πi, Pj are:",
    options: ["exogenous policy parameters", "jointly, simultaneously determined general-equilibrium trade cost aggregates", "equal to bilateral distance", "irrelevant for gravity estimation"],
    correctIndex: 1,
    explanation: "Correct! Multilateral resistances represent a country's average market access and are jointly determined in general equilibrium across all countries."
  },
  {
    question: "F4. The Eaton–Kortum supply-side derivation of gravity replaces 1 − σ with:",
    options: ["−θ, the Fréchet dispersion parameter", "the number of goods", "the labour share", "zero"],
    correctIndex: 0,
    explanation: "Correct! In the Eaton-Kortum Ricardian model, the shape parameter θ (measuring the dispersion of productivity) replaces the demand elasticity parameter σ - 1."
  },
  {
    question: "F5. PPML is preferred to OLS on logged gravity mainly because it:",
    options: ["is always faster to compute", "remains consistent under heteroscedasticity and uses information in zero trade flows", "requires fewer covariates", "cannot include fixed effects"],
    correctIndex: 1,
    explanation: "Correct! PPML estimates gravity in multiplicative form, retaining zero trade flows, and provides consistent estimates under heteroscedasticity where logged OLS fails due to Jensen's inequality."
  },
  {
    question: "F6. Country-pair fixed effects in a panel gravity regression:",
    options: ["identify the effect of bilateral distance", "absorb time-invariant bilateral trade costs and help address the endogeneity of trade policy", "are redundant with exporter-time fixed effects", "cannot be used with PPML"],
    correctIndex: 1,
    explanation: "Correct! Pair fixed effects control for all time-invariant bilateral costs (like distance, language) and absorb unobserved link-level trade determinants, reducing RTA/policy endogeneity bias."
  },
  {
    question: "F7. Non-discriminatory policies (e.g. MFN tariffs) can be identified in a gravity model with directional fixed effects by:",
    options: ["dropping the fixed effects", "interacting the policy with an international-trade dummy and including intra-national trade in the sample", "using cross-sectional data only", "averaging tariffs across all partners"],
    correctIndex: 1,
    explanation: "Correct! By interacting the policy with an international dummy (INTL_ij = 1 if i != j) and including intra-national trade (i = j) as the reference, we create bilateral variation that is not collinear with directional fixed effects."
  },
  {
    question: "F8. The tariff-equivalent of an RTA can be computed from β_RTA alone, without tariff data, using:",
    options: ["β_RTA × 100", "(e^(β_RTA/σ) - 1) × 100, given an external estimate of σ", "the distance coefficient", "nothing; tariff data are always required"],
    correctIndex: 1,
    explanation: "Correct! Since structurally β_tariffs = -σ, the RTA coefficient can be translated into a tariff equivalent via (e^(β_RTA/σ) - 1) * 100 given an external elasticity σ."
  },
  {
    question: "F9. Consistent aggregation of bilateral trade costs to the customs-union level weights each bilateral cost by:",
    options: ["equal weights", "each destination’s share of market potential within the union", "population only", "nothing; simple averages are theoretically consistent"],
    correctIndex: 1,
    explanation: "Correct! Theoretically consistent aggregation weights bilateral trade costs by each destination's share of union-wide market potential, Ej / Pj^(1-σ)."
  },
  {
    question: "F10. Import data are typically preferred over export data in constructing the gravity dependent variable because:",
    options: ["exports are never recorded", "imports are more closely monitored by customs, often due to duties", "imports are always larger", "export data are classified differently every year"],
    correctIndex: 1,
    explanation: "Correct! Customs offices track imports much more carefully than exports because imports represent tax bases for tariffs and duties."
  },
  {
    question: "F11. The “distance puzzle” (the apparent lack of decline in the distance coefficient over time) is resolved once:",
    options: ["distance is dropped from the regression", "intra-national trade and intra-national distance are included, so that international distance is measured relative to the correct internal benchmark", "PPML is replaced with OLS", "colonial ties are excluded"],
    correctIndex: 1,
    explanation: "Correct! Controlling for intra-national trade costs allows the model to measure international trade costs relative to the correct domestic benchmark, dissolving the puzzle."
  },
  {
    question: "F12. Compared to specification without pair fixed effects, adding pair fixed effects to the RTA gravity regression:",
    options: ["lowers the estimated RTA effect due to overfitting", "raises the estimated RTA effect, consistent with downward endogeneity bias in its absence", "has no effect on the RTA coefficient", "eliminates the RTA variable entirely"],
    correctIndex: 1,
    explanation: "Correct! Excluding pair fixed effects biases the RTA coefficient downward, because trade policies are signed preferentially between partners with high unobserved trade potential."
  },
  {
    question: "F13. Once time-varying globalization forces (international border dummies) are controlled for, the estimated total RTA effect in the applications of this chapter:",
    options: ["increases substantially", "is roughly cut in half", "becomes negative and significant", "is unchanged"],
    correctIndex: 1,
    explanation: "Correct! The estimated RTA effect halves because the border control isolates general globalization trends from genuine RTA integration."
  },
  {
    question: "F14. The separability property of the structural gravity model implies that:",
    options: ["sectoral gravity equations cannot be estimated", "sectoral (or regional) gravity equations take exactly the same form as the aggregate equation and can be estimated the same way", "only aggregate data can ever be used", "trade costs must be identical across sectors"],
    correctIndex: 1,
    explanation: "Correct! Separability means each sector's gravity system behaves independently and isomorphic to the aggregate economy."
  },
  {
    question: "F15. The Arkolakis–Costinot–Rodríguez-Clare isomorphism result implies that:",
    options: ["only the Armington model is theoretically valid", "many structurally different trade models (Armington, Ricardian/EK, heterogeneous firms, Heckscher-Ohlin) generate the same gravity equation and the same gains-from-trade formula", "gravity fails empirically", "comparative advantage is irrelevant to gravity"],
    correctIndex: 1,
    explanation: "Correct! The ACR result shows that the gains from trade can be calculated using the same trade share and trade elasticity across a wide set of models."
  }
];

export default function Module6({ theme, setActiveTab }) {
  const [moduleTab, setModuleTab] = useState("6.1 — Gravity Analogy");
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
  // TAB 6.1 STATES: NEWTON VS GRAVITY
  // ──────────────────────────────────────────────────────────────────────
  const [newtonM1, setNewtonM1] = useState(50);
  const [newtonM2, setNewtonM2] = useState(50);
  const [newtonDist, setNewtonDist] = useState(5.0);

  const force = ((newtonM1 * newtonM2) / Math.pow(newtonDist, 2)).toFixed(2);

  // ──────────────────────────────────────────────────────────────────────
  // TAB 6.2 STATES: CES SUBS
  // ──────────────────────────────────────────────────────────────────────
  const [cesSigma, setCesSigma] = useState(4.0);
  const [cesT12, setCesT12] = useState(1.5);
  const [cesP2, setCesP2] = useState(1.0);

  // Exporters: 1, 2, 3 exporting to country 2.
  // E_2 = 100. Let's fix relative factory gate prices p = [1, 1, 1], alphas = [1, 1, 1].
  // bilateral costs to 2: t_12 = cesT12, t_22 = 1.0 (domestic), t_32 = 1.8.
  const calcCesShares = () => {
    const t_12 = cesT12;
    const t_22 = 1.0;
    const t_32 = 1.8;
    const exponent = 1 - cesSigma;

    const val1 = Math.pow(t_12, exponent);
    const val2 = Math.pow(t_22 / cesP2, exponent); // domestic price index adjustment
    const val3 = Math.pow(t_32, exponent);

    const total = val1 + val2 + val3;
    return {
      share1: (val1 / total) * 100,
      share2: (val2 / total) * 100,
      share3: (val3 / total) * 100
    };
  };

  const cesShares = calcCesShares();

  // ──────────────────────────────────────────────────────────────────────
  // TAB 6.3 STATES: SIZE VS COSt
  // ──────────────────────────────────────────────────────────────────────
  const [decompT, setDecompT] = useState(1.6);
  const [decompSigma, setDecompSigma] = useState(3.0);
  const decompSize = 50.0; // Frictionless trade YiEj/Y
  const decompRealized = (decompSize * Math.pow(decompT, 1 - decompSigma)).toFixed(1);

  // ──────────────────────────────────────────────────────────────────────
  // TAB 6.4 STATES: MULTILATERAL RESISTANCE GE SOLVER
  // ──────────────────────────────────────────────────────────────────────
  const [geT12, setGeT12] = useState(1.5);
  const [geT13, setGeT13] = useState(1.8);
  const [geT23, setGeT23] = useState(1.6);
  const [geSigma, setGeSigma] = useState(4.0);

  const solveMR = (t12, t13, t23, sigma) => {
    const Y = [40, 30, 30];
    const E = [30, 40, 30];
    const Y_world = 100.0;
    const t = [
      [1.0, t12, t13],
      [t12, 1.0, t23],
      [t13, t23, 1.0]
    ];
    const theta_param = sigma - 1;

    let P = [1.0, 1.0, 1.0];
    let Pi = [1.0, 1.0, 1.0];

    for (let iter = 0; iter < 20; iter++) {
      let nextPi = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        let sum = 0;
        for (let j = 0; j < 3; j++) {
          sum += Math.pow(t[i][j] / P[j], -theta_param) * (E[j] / Y_world);
        }
        nextPi[i] = Math.pow(sum, -1 / theta_param);
      }

      let nextP = [0, 0, 0];
      for (let j = 0; j < 3; j++) {
        let sum = 0;
        for (let i = 0; i < 3; i++) {
          sum += Math.pow(t[i][j] / nextPi[i], -theta_param) * (Y[i] / Y_world);
        }
        nextP[j] = Math.pow(sum, -1 / theta_param);
      }

      const scale = nextP[0];
      if (scale > 0) {
        for (let k = 0; k < 3; k++) {
          nextP[k] = nextP[k] / scale;
          nextPi[k] = nextPi[k] * scale;
        }
      }
      P = nextP;
      Pi = nextPi;
    }
    return { P, Pi };
  };

  const mrResults = solveMR(geT12, geT13, geT23, geSigma);

  // ──────────────────────────────────────────────────────────────────────
  // TAB 6.7 STATES: TARIFF EQUIVALENT CALCULATOR
  // ──────────────────────────────────────────────────────────────────────
  const [calcBetaRta, setCalcBetaRta] = useState(0.76);
  const [calcSigmaVal, setCalcSigmaVal] = useState(5.0);
  const tariffEquivalent = ((Math.exp(calcBetaRta / calcSigmaVal) - 1) * 100).toFixed(1);

  // ──────────────────────────────────────────────────────────────────────
  // TAB 6.8 STATES: CUSTOMS UNION AGGREGATION
  // ──────────────────────────────────────────────────────────────────────
  const [aggT12, setAggT12] = useState(1.4);
  const [aggT13, setAggT13] = useState(1.8);
  const [aggWeight2, setAggWeight2] = useState(60); // weight on destination 2 in %
  const [aggSigma, setAggSigma] = useState(5.0);

  const weight2 = aggWeight2 / 100;
  const weight3 = 1 - weight2;
  const aggUniform = Math.pow(
    weight2 * Math.pow(aggT12, 1 - aggSigma) + weight3 * Math.pow(aggT13, 1 - aggSigma),
    1 / (1 - aggSigma)
  ).toFixed(3);

  // ──────────────────────────────────────────────────────────────────────
  // TAB 6.10 STATES: TABLE 1 HORSE RACE
  // ──────────────────────────────────────────────────────────────────────
  const [selectedRaceSpec, setSelectedRaceSpec] = useState("OLS (1)");
  const raceSpecsData = {
    "OLS (1)": { dist: -1.002, contig: 0.574, lang: 0.802, colony: 0.735, reset: "0.000 (Rejected)" },
    "Remoteness (2)": { dist: -1.185, contig: 0.247, lang: 0.739, colony: 0.842, reset: "0.000 (Rejected)" },
    "OLS FE (3)": { dist: -1.216, contig: 0.223, lang: 0.661, colony: 0.670, reset: "0.000 (Rejected)" },
    "PPML FE (4)": { dist: -0.841, contig: 0.437, lang: 0.247, colony: -0.222, reset: "0.642 (Passed)" }
  };

  // ──────────────────────────────────────────────────────────────────────
  // TAB 6.11 STATES: DISTANCE PUZZLE
  // ──────────────────────────────────────────────────────────────────────
  const [puzzleSpec, setPuzzleSpec] = useState("Intl Only");
  const puzzleData = {
    "Intl Only": { val1986: -1.168, val2006: -1.261, change: "+7.95% (Puzzle)" },
    "With Intra": { val1986: -0.980, val2006: -0.872, change: "-10.97% (Solved)" }
  };

  // ──────────────────────────────────────────────────────────────────────
  // TAB 6.12 STATES: TABLE 3 RTA EFFECTS
  // ──────────────────────────────────────────────────────────────────────
  const [rtaSpecIdx, setRtaSpecIdx] = useState(3);
  const rtaSpecs = [
    { label: "1. Traditional OLS (Intl only)", coeff: -0.004, note: "Endogeneity bias drives estimate to zero." },
    { label: "2. PPML (Intl only)", coeff: 0.191, note: "マルチ/Zero correction adds positive trade volume." },
    { label: "3. + Intra-national trade", coeff: 0.409, note: "Captures trade diversion away from domestic sales." },
    { label: "4. + Country-pair fixed effects", coeff: 0.557, note: "Baier & Bergstrand (2007) endogeneity correction." },
    { label: "5. + RTA Lead check", coeff: 0.520, note: "Strict exogeneity confirmed: lead RTA coefficient (0.077) is insignificant." },
    { label: "6. + Globalization border control", coeff: 0.116, note: "Total RTA effect drops to 0.475; border control separates RTA from globalization trends." }
  ];

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
    <div className="container module6-container" style={{ padding: '40px 24px' }}>
      
      {/* ── Header ── */}
      <div className="module-header">
        <button onClick={() => setActiveTab('home')} className="back-btn">
          <span>← Back to Course Path</span>
        </button>
        <div className="module-title-row">
          <div>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Module 6
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '4px' }}>The Structural Gravity Model</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px', fontStyle: 'italic', maxWidth: '800px', lineHeight: '1.4' }}>
              Based on Yotov, Y. V., Piermartini, R., Monteiro, J.-A., & Larch, M. (2016). An Advanced Guide to Trade Policy Analysis: The Structural Gravity Model. UNCTAD–WTO. Chapter 1 ("Partial Equilibrium").
            </p>
          </div>
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="module-sections-nav" style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        {[
          ["6.1 — Gravity Analogy", "6.1 Gravity Analogy"],
          ["6.2 — Demand Derivation", "6.2 Demand Derivation"],
          ["6.3 — EK Ricardian Derivation", "6.3 Ricardian Derivation"],
          ["6.4 — Estimation Challenges 1–3", "6.4 MR, Zeros & PPML"],
          ["6.5 — Estimation Challenges 4–8", "6.5 Policy & Lags"],
          ["6.6 — Estimating Equation", "6.6 Comprehensive Estimator"],
          ["6.7 — Interpreting Estimates", "6.7 Tariff Equivalents"],
          ["6.8 — Aggregating Costs", "6.8 Aggregate Costs"],
          ["6.9 — Gravity Data", "6.9 Gravity Data"],
          ["6.10 — Table 1 Horse Race", "6.10 Horse Race"],
          ["6.11 — The Distance Puzzle", "6.11 Distance Puzzle"],
          ["6.12 — RTA Specifications", "6.12 RTA Effects"],
          ["6.13 — Final Exam", "6.13 Final Exam"]
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
          6.1 — THE GRAVITY ANALOGY
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "6.1 — Gravity Analogy" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 6.1: The Gravity Analogy &amp; Evolution of Gravity Theory</h3>
            <p>
              {`Bilateral trade behaves in close analogy with Newton's law of universal gravitation: attractive trade potential rises with economic masses and falls with geographical and political resistances.`}
            </p>

            <DefinitionBox title="The Newton/gravity analogy, formalized">
              {`Once derived (Lesson 6.2), the analogy is exact:
              $$F_{ij} = G \\frac{M_i M_j}{D_{ij}^2} \\quad \\longleftrightarrow \\quad X_{ij} = G \\frac{Y_i E_j}{T_{ij}^{\\theta}}$$
              where $X_{ij}$ is bilateral exports from $i$ to $j$; $G \\equiv 1/Y$ is the inverse of world output; $Y_i$ is output (mass); $E_j$ is expenditure (mass); and $T_{ij}$ captures direct and multilateral resistances.`}
            </DefinitionBox>

            <IntuitionBox title="Particles that trade">
              {`Ravenstein (1885) and Tinbergen (1962) noticed that trade flows obey a curve-fitting gravity formula. Anderson (1979) and Eaton-Kortum (2002) later provided general-equilibrium microfoundations, turning an atheoretical curve-fit into structural gravity.`}
            </IntuitionBox>

            <LessonQuiz 
              title="Lesson 6.1"
              questions={[
                {
                  question: "Q1.1 In the Newton/gravity analogy, the term T_ij^θ corresponds to:",
                  options: [
                    "the product of the two countries' GDPs",
                    "the square of physical distance only",
                    "all bilateral and structural trade frictions between i and j combined",
                    "the elasticity of substitution"
                  ],
                  correctIndex: 2,
                  explanation: "Correct! The structural trade cost term gathers bilateral geographical, political, and multilateral resistances into a single wedge."
                },
                {
                  question: "Q1.2 Before Anderson (1979), the gravity equation in trade was mainly:",
                  options: [
                    "derived from the Ricardian model",
                    "an atheoretical empirical regularity",
                    "derived from Heckscher-Ohlin",
                    "rejected by the data"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Tinbergen (1962) first estimated the gravity equation as a pure empirical curve-fit without microfoundations."
                },
                {
                  question: "Q1.3 The main contribution of Arkolakis, Costinot and Rodriguez-Clare (2012) was to show that:",
                  options: [
                    "only the Armington model generates gravity",
                    "a wide class of structurally different trade models generate isomorphic gravity equations and identical formulas for the gains from trade",
                    "gravity does not hold with sectoral data",
                    "trade costs are irrelevant for welfare"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! The ACR isomorphism result demonstrates that many models collapse to the exact same gravity reduced form and welfare formulas."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 The Newton-Gravity Trade Analogy</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>{`Exporter Mass / GDP ($Y_i$):`} <span className="val-highlight">{newtonM1}</span></label>
                <input type="range" min="10" max="100" value={newtonM1} onChange={e => setNewtonM1(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>{`Importer Mass / GDP ($E_j$):`} <span className="val-highlight">{newtonM2}</span></label>
                <input type="range" min="10" max="100" value={newtonM2} onChange={e => setNewtonM2(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>{`Distance / Friction ($D_{ij}$ / $t_{ij}$):`} <span className="val-highlight-purple">{newtonDist}</span></label>
                <input type="range" min="2" max="10" step="0.5" value={newtonDist} onChange={e => setNewtonDist(Number(e.target.value))} className="range-slider slider-purple" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                {/* Exporter Circle */}
                <circle cx="80" cy="110" r={Math.sqrt(newtonM1) * 3} fill="var(--accent-primary)" opacity="0.8" />
                <text x="80" y="110" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold" dy=".3em">
                  {`Yi: ${newtonM1}`}
                </text>

                {/* Importer Circle */}
                <circle cx="320" cy="110" r={Math.sqrt(newtonM2) * 3} fill="var(--accent-secondary)" opacity="0.8" />
                <text x="320" y="110" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold" dy=".3em">
                  {`Ej: ${newtonM2}`}
                </text>

                {/* Frictional Link */}
                <line x1="80" y1="110" x2="320" y2="110" stroke="#475569" strokeWidth="4" strokeDasharray="5,5" />
                
                {/* Attraction Force / Trade Flow Arrow */}
                <path 
                  d={`M ${80 + Math.sqrt(newtonM1)*3} 100 Q 200 ${100 - force/5} ${320 - Math.sqrt(newtonM2)*3} 100`} 
                  fill="none" 
                  stroke="#7c3aed" 
                  strokeWidth={Math.min(12, Math.max(1, force / 8))} 
                  markerEnd="url(#arrow)" 
                />

                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c3aed" />
                  </marker>
                </defs>

                <text x="200" y="145" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="bold">
                  {`Bilateral Attraction / Trade Flow (X_ij): ${force}`}
                </text>
              </svg>
            </div>
            <div className="implications-panel">
              <span style={{ fontWeight: 600 }}>Implications:</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {`Increasing size Yi or Ej swells output/spending and increases bilateral trade. Raising distance/friction rapidly decays the flow due to the inverse square relation, mirroring Newtonian gravity.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          6.2 — DERIVING STRUCTURAL GRAVITY
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "6.2 — Demand Derivation" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 6.2: Deriving Structural Gravity from the Demand Side</h3>
            <p>
              {`By combining consumers' CES preference structure with market-clearing conditions, we solve for the general-equilibrium system.`}
            </p>

            <DerivationStepper 
              title="Demand and the CES Price Index"
              steps={[
                {
                  explanation: "Consumer variety optimization subject to nominal expenditure constraint yields bilateral demand:",
                  math: "$$X_{ij} = \\left( \\frac{\\alpha_i p_i t_{ij}}{P_j} \\right)^{1-\\sigma} E_j$$"
                },
                {
                  explanation: "Where the CES aggregate price index (inward multilateral resistance) is defined as:",
                  math: "$$P_j = \\left[ \\sum_i (\\alpha_i p_i t_{ij})^{1-\\sigma} \\right]^{\\frac{1}{1-\\sigma}}$$"
                }
              ]}
            />

            <DerivationStepper 
              title="Closing the Model to get Structural Gravity"
              steps={[
                {
                  explanation: "Impose goods market clearing at delivered values: i's output must equal global spending on i's variety:",
                  math: "$$Y_i = \\sum_j X_{ij} = \\sum_j \\left( \\frac{\\alpha_i p_i t_{ij}}{P_j} \\right)^{1-\\sigma} E_j$$"
                },
                {
                  explanation: "Divide output by world GDP Y and implicitly solve for scale terms (outward multilateral resistance):",
                  math: "$$\\Pi_i^{1-\\sigma} \\equiv \\sum_j \\left( \\frac{t_{ij}}{P_j} \\right)^{1-\\sigma} \\frac{E_j}{Y} \\quad \\implies \\quad (\\alpha_i p_i)^{1-\\sigma} = \\frac{Y_i / Y}{\\Pi_i^{1-\\sigma}}$$"
                },
                {
                  explanation: "Substitute back into bilateral demand to obtain the Structural Gravity Equation:",
                  math: "$$X_{ij} = \\frac{Y_i E_j}{Y} \\left( \\frac{t_{ij}}{\\Pi_i P_j} \\right)^{1-\\sigma}$$"
                }
              ]}
            />

            <LessonQuiz 
              title="Lesson 6.2"
              questions={[
                {
                  question: "Q2.1 In the Armington–CES structural gravity model, goods are differentiated:",
                  options: ["by sector only", "by place of origin", "by firm", "they are homogeneous"],
                  correctIndex: 1,
                  explanation: "Correct! Armington (1969) assumes goods are differentiated by place of origin (e.g. French wine vs Italian wine)."
                },
                {
                  question: "Q2.2 Bilateral expenditure Xij is increasing in:",
                  options: ["the delivered price pij", "destination expenditure Ej and the destination price index Pj", "bilateral trade costs tij only", "the elasticity of substitution σ only"],
                  correctIndex: 1,
                  explanation: "Correct! Xij scales proportionally with importer expenditure Ej, and is directly related to the competitor price index Pj."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 CES Substitution &amp; Market Shares</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>{`Elasticity of Substitution ($\\sigma$):`} <span className="val-highlight">{cesSigma}</span></label>
                <input type="range" min="1.5" max="10" step="0.5" value={cesSigma} onChange={e => setCesSigma(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>{`Bilateral Trade Cost ($t_{12}$):`} <span className="val-highlight-purple">{cesT12.toFixed(2)}</span></label>
                <input type="range" min="1.0" max="3.0" step="0.1" value={cesT12} onChange={e => setCesT12(Number(e.target.value))} className="range-slider slider-purple" />
              </div>
              <div className="slider-card">
                <label>{`Destination Price Index ($P_2$):`} <span className="val-highlight-orange">{cesP2.toFixed(2)}</span></label>
                <input type="range" min="0.5" max="2.0" step="0.1" value={cesP2} onChange={e => setCesP2(Number(e.target.value))} className="range-slider slider-orange" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="20" y="30" fill="var(--text-secondary)" fontSize="11" fontWeight="bold">Importer 2 Expenditure Shares (%):</text>
                
                {/* Country 1 Share Bar */}
                <rect x="50" y="55" width={cesShares.share1 * 3} height="24" fill="var(--accent-primary)" rx="3" />
                <text x="60" y="71" fill="#fff" fontSize="11" fontWeight="bold">
                  {`Country 1: ${cesShares.share1.toFixed(1)}%`}
                </text>

                {/* Country 2 (Domestic) Share Bar */}
                <rect x="50" y="95" width={cesShares.share2 * 3} height="24" fill="var(--accent-secondary)" rx="3" />
                <text x="60" y="111" fill="#fff" fontSize="11" fontWeight="bold">
                  {`Domestic 2: ${cesShares.share2.toFixed(1)}%`}
                </text>

                {/* Country 3 Share Bar */}
                <rect x="50" y="135" width={cesShares.share3 * 3} height="24" fill="#a855f7" rx="3" />
                <text x="60" y="151" fill="#fff" fontSize="11" fontWeight="bold">
                  {`Country 3: ${cesShares.share3.toFixed(1)}%`}
                </text>

                <line x1="50" y1="50" x2="50" y2="175" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="175" x2="350" y2="175" stroke="#475569" strokeWidth="2" />
              </svg>
            </div>
            <div className="implications-panel">
              <span style={{ fontWeight: 600 }}>Substitution Effect:</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {`When the elasticity σ is high, minor increases in trade cost t_12 rapidly wipe out Country 1's share. If the consumer price index P_2 drops, consumers substitute away from Country 1 toward alternatives.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          6.3 — SIZE VS TRADE COSTS (EK DERIVATION)
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "6.3 — EK Ricardian Derivation" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 6.3: Size vs. Trade Costs &amp; EK Derivation</h3>
            <p>
              {`Structural gravity splits trade into a frictionless capacity component and a frictional trade-cost wedge.`}
            </p>

            <DerivationBox title="Splitting the gravity system in two">
              {`$$X_{ij} = \\underbrace{\\frac{Y_i E_j}{Y}}_{\\text{size}} \\times \\underbrace{\\left( \\frac{t_{ij}}{\\Pi_i P_j} \\right)^{1-\\sigma}}_{\\text{trade cost wedge}}$$
              If all trade costs $t_{ij} = 1$, the right term collapses to 1, and countries trade strictly in proportion to their economic size.`}
            </DerivationBox>

            <DerivationStepper 
              title="Eaton-Kortum Ricardian Derivation"
              steps={[
                {
                  explanation: "Efficiency zi(l) is drawn from Fréchet distribution: F_i(z) = exp(-T_i * z^-θ), and competitive pricing sets pij(l) = (w_i / z_i(l)) * t_ij.",
                  math: "$$p_j(l) = \\min_i \\left\\{ \\frac{w_i t_{ij}}{z_i(l)} \\right\\}$$"
                },
                {
                  explanation: "Extreme-value algebra yields the consumer price distribution Gj(p) = 1 - exp(-Φ_j * p^θ) with state index:",
                  math: "$$\\Phi_j \\equiv \\sum_i T_i (w_i t_{ij})^{-\\theta}$$"
                },
                {
                  explanation: "Market clearing closes the system and delivers identical structural gravity with shape parameters:",
                  math: "$$X_{ij} = \\frac{Y_i E_j}{Y} \\left( \\frac{t_{ij}}{\\Pi_i P_j} \\right)^{-\\theta}$$"
                }
              ]}
            />

            <LessonQuiz 
              title="Lesson 6.3"
              questions={[
                {
                  question: "Q3.1 The frictionless (size) component of the gravity equation, YiEj/Y, is obtained by:",
                  options: ["setting σ = 1", "setting all bilateral trade costs tij = 1", "ignoring expenditure", "assuming autarky"],
                  correctIndex: 1,
                  explanation: "Correct! Setting all trade costs to 1 isolates the pure economic size effect."
                },
                {
                  question: "Q3.2 In the Eaton–Kortum supply-side derivation, the role played by 1 − σ in the CES model is played by:",
                  options: ["−θ, the Fréchet dispersion parameter", "the number of countries N", "the labour endowment", "the CES taste parameter αi"],
                  correctIndex: 0,
                  explanation: "Correct! The shape parameter θ represents comparative-advantage scope and acts as trade elasticity."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Frictionless vs. Realized Trade Wedge</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>{`Iceberg Frictions ($t_{ij}$):`} <span className="val-highlight">{decompT}</span></label>
                <input type="range" min="1.0" max="3.0" step="0.1" value={decompT} onChange={e => setDecompT(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>{`Trade Elasticity ($\\sigma$ / $\\theta$):`} <span className="val-highlight-purple">{decompSigma}</span></label>
                <input type="range" min="1.5" max="8.0" step="0.5" value={decompSigma} onChange={e => setDecompSigma(Number(e.target.value))} className="range-slider slider-purple" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                {/* Frictionless Trade */}
                <rect x="50" y="60" width={decompSize * 4} height="30" fill="var(--card-border)" stroke="#94a3b8" />
                <text x="60" y="80" fill="var(--text-primary)" fontSize="11" fontWeight="bold">
                  {`Frictionless Potential: ${decompSize}`}
                </text>

                {/* Realized Trade */}
                <rect x="50" y="120" width={Math.max(10, Math.min(400, decompRealized * 4))} height="30" fill="var(--accent-primary)" />
                <text x="60" y="140" fill="#fff" fontSize="11" fontWeight="bold">
                  {`Realized Trade: ${decompRealized}`}
                </text>

                <line x1="50" y1="40" x2="50" y2="180" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="180" x2="350" y2="180" stroke="#475569" strokeWidth="2" />
              </svg>
            </div>
            <div className="implications-panel">
              <span style={{ fontWeight: 600 }}>Decomposition Analysis:</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {`The difference between the frictionless potential and realized trade represents the trade cost wedge. As iceberg costs or the trade elasticity increases, the realized flow collapses relative to size.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          6.4 — ESTIMATION CHALLENGES 1-3
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "6.4 — Estimation Challenges 1–3" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 6.4: Challenges 1–3 — Multilateral Resistances, Zeros, and PPML</h3>
            <p>
              {`Theoretical resistance terms are unobserved. OLS fails under zero trade and heteroscedasticity.`}
            </p>

            <DerivationBox title="Four solutions to Challenge 1">
              {`1. Custom nonlinear iteration (Anderson and van Wincoop, 2003)
              2. Remoteness index proxies: GDP-weighted distances (flawed)
              3. Ratio methods (recovers bilateral changes only)
              4. Directional Fixed Effects (standard): Exporter-time and importer-time dummy variables.`}
            </DerivationBox>

            <IntuitionBox title="Why PPML solves two problems at once">
              {`PPML fits the multiplicative model $X_{ij} = \\exp(\\cdot) \\times \\epsilon_{ij}$ directly. It retains zero trade flows (no $\\ln 0$ error) and handles heteroscedasticity (which biases log-linear OLS estimates via Jensen's inequality).`}
            </IntuitionBox>

            <LessonQuiz 
              title="Lesson 6.4"
              questions={[
                {
                  question: "Q4.1 Including exporter-time and importer-time fixed effects in a gravity regression accounts for:",
                  options: ["bilateral tariffs only", "the unobserved multilateral resistance terms", "random error only", "nothing"],
                  correctIndex: 1,
                  explanation: "Correct! Directional fixed effects absorb the unobserved structural multilateral resistance terms perfectly."
                },
                {
                  question: "Q4.2 PPML is preferred to OLS on logged gravity mainly because it:",
                  options: ["is faster to compute", "simultaneously handles zero trade flows and heteroscedasticity-driven inconsistency", "ignores resistances", "requires no panel data"],
                  correctIndex: 1,
                  explanation: "Correct! PPML avoids logging zero trade flows and resolves the inconsistency problem caused by heteroscedasticity."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Multilateral Resistance GE Ripple Effects</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>{`Friction Country 1-2 ($t_{12}$):`} <span className="val-highlight">{geT12.toFixed(1)}</span></label>
                <input type="range" min="1.0" max="4.0" step="0.2" value={geT12} onChange={e => setGeT12(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>{`Friction Country 1-3 ($t_{13}$):`} <span className="val-highlight-purple">{geT13.toFixed(1)}</span></label>
                <input type="range" min="1.0" max="4.0" step="0.2" value={geT13} onChange={e => setGeT13(Number(e.target.value))} className="range-slider slider-purple" />
              </div>
              <div className="slider-card">
                <label>{`Friction Country 2-3 ($t_{23}$):`} <span className="val-highlight-orange">{geT23.toFixed(1)}</span></label>
                <input type="range" min="1.0" max="4.0" step="0.2" value={geT23} onChange={e => setGeT23(Number(e.target.value))} className="range-slider slider-orange" />
              </div>
              <div className="slider-card">
                <label>{`Elasticity of Substitution ($\\sigma$):`} <span className="val-highlight">{geSigma}</span></label>
                <input type="range" min="1.5" max="8.0" step="0.5" value={geSigma} onChange={e => setGeSigma(Number(e.target.value))} className="range-slider" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="15" y="20" fill="var(--text-secondary)" fontSize="10" fontWeight="bold">Solved Outward MR (Π_i):</text>
                <rect x="50" y="30" width={mrResults.Pi[0] * 50} height="15" fill="var(--accent-primary)" />
                <text x="60" y="42" fill="#fff" fontSize="9" fontWeight="bold">{`Π_1: ${mrResults.Pi[0].toFixed(3)}`}</text>
                <rect x="50" y="50" width={mrResults.Pi[1] * 50} height="15" fill="var(--accent-primary)" />
                <text x="60" y="62" fill="#fff" fontSize="9" fontWeight="bold">{`Π_2: ${mrResults.Pi[1].toFixed(3)}`}</text>
                <rect x="50" y="70" width={mrResults.Pi[2] * 50} height="15" fill="var(--accent-primary)" />
                <text x="60" y="82" fill="#fff" fontSize="9" fontWeight="bold">{`Π_3: ${mrResults.Pi[2].toFixed(3)}`}</text>

                <text x="15" y="110" fill="var(--text-secondary)" fontSize="10" fontWeight="bold">Solved Inward MR (P_j):</text>
                <rect x="50" y="120" width={mrResults.P[0] * 50} height="15" fill="var(--accent-secondary)" />
                <text x="60" y="132" fill="#fff" fontSize="9" fontWeight="bold">{`P_1: ${mrResults.P[0].toFixed(3)}`}</text>
                <rect x="50" y="140" width={mrResults.P[1] * 50} height="15" fill="var(--accent-secondary)" />
                <text x="60" y="152" fill="#fff" fontSize="9" fontWeight="bold">{`P_2: ${mrResults.P[1].toFixed(3)}`}</text>
                <rect x="50" y="160" width={mrResults.P[2] * 50} height="15" fill="var(--accent-secondary)" />
                <text x="60" y="172" fill="#fff" fontSize="9" fontWeight="bold">{`P_3: ${mrResults.P[2].toFixed(3)}`}</text>

                <line x1="50" y1="15" x2="50" y2="185" stroke="#475569" strokeWidth="2" />
              </svg>
            </div>
            <div className="implications-panel">
              <span style={{ fontWeight: 600 }}>GE Ripple Effects:</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {`Observe how changing a single bilateral friction (e.g. t_12) shifts the resistance terms for Country 3 as well. Trade is a general-equilibrium system.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          6.5 — ESTIMATION CHALLENGES 4-8
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "6.5 — Estimation Challenges 4–8" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 6.5: Challenges 4–8 — Trade Costs, Endogeneity &amp; Non-Discriminatory Policy</h3>
            <p>
              {`Estimating time-invariant costs, addressing policy endogeneity, and capturing unilateral/MFN policies.`}
            </p>

            <DefinitionBox title="The pair fixed-effects solution">
              {`Bilateral trade policies like RTAs are endogenous. Including country-pair fixed effects $\\mu_{ij}$ absorbs all time-invariant bilateral trade costs (like distance, language) and controls for links between unobservables and trade policies.`}
            </DefinitionBox>

            <DefinitionBox title="The intra-national trade trick">
              {`Non-discriminatory policies (MFN tariffs, subsidies) are exporter- or importer-specific, and are absorbed by directional fixed effects. Heid et al. (2015) show we can identify them by interacting the policy with an international trade dummy $INTL_{ij}$ and including domestic trade in the sample.`}
            </DefinitionBox>

            <LessonQuiz 
              title="Lesson 6.5"
              questions={[
                {
                  question: "Q5.1 Since tariffs are direct price shifters, the coefficient on τ_ij,t recovers:",
                  options: ["the distance elasticity", "minus the trade elasticity of substitution, ˆσ = − ˆβ6", "the RTA effect", "nothing"],
                  correctIndex: 1,
                  explanation: "Correct! The tariff coefficient directly maps to -σ because it acts as a direct price shifter."
                },
                {
                  question: "Q5.2 Non-discriminatory policies such as MFN tariffs are hard to estimate because:",
                  options: ["they never vary over time", "they are absorbed by exporter-time/importer-time fixed effects", "they are always zero", "PPML cannot run them"],
                  correctIndex: 1,
                  explanation: "Correct! Unilateral policies do not vary bilaterally and are absorbed by the directional fixed effects."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📈 Methodological Checklist Summary</span>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(59, 130, 246, 0.05)', padding: '12px', borderRadius: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                <div>
                  <h4 style={{ margin: 0 }}>Use Panel Data with Intervals</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Avoid consecutive years to prevent overstating precision.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(59, 130, 246, 0.05)', padding: '12px', borderRadius: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                <div>
                  <h4 style={{ margin: 0 }}>Include Intra-national Trade</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Allows identification of border effects and unilateral policies.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(59, 130, 246, 0.05)', padding: '12px', borderRadius: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                <div>
                  <h4 style={{ margin: 0 }}>Country-Pair Fixed Effects</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Controls for time-invariant linkages and endogeneity.</p>
                </div>
              </div>
            </div>
            <div className="implications-panel">
              <span style={{ fontWeight: 600 }}>Separability Property:</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {`Gravity is separable, meaning sectoral trade flows can be estimated independently sector by sector with the exact same functional specifications as aggregate trade.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          6.6 — ESTIMATING EQUATION
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "6.6 — Estimating Equation" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 6.6: The Comprehensive, Theory-Consistent Estimating Equation</h3>
            <p>
              {`Assembling all six methodological recommendations into a single structural gravity estimating equation.`}
            </p>

            <DerivationBox title="The comprehensive specification">
              {`$$X_{ij,t} = \\exp \\left[ \\pi_{i,t} + \\chi_{j,t} + \\mu_{ij} + \\eta_1 BTP_{ij,t} + \\eta_2 (NES_{i,t} \\times INTL_{ij}) + \\eta_3 (NIP_{j,t} \\times INTL_{ij}) \\right] \\times \\epsilon_{ij,t}$$
              where:
              - $\\pi_{i,t}$ is exporter-time FE (absorbs outward MR)
              - $\\chi_{j,t}$ is importer-time FE (absorbs inward MR)
              - $\\mu_{ij}$ is pair FE (absorbs time-invariant bilateral costs)
              - $BTP_{ij,t}$ is bilateral trade policy (RTAs, tariffs)
              - $NES_{i,t} \\times INTL_{ij}$ is non-discriminatory export policy
              - $NIP_{j,t} \\times INTL_{ij}$ is non-discriminatory import policy.`}
            </DerivationBox>

            <LessonQuiz 
              title="Lesson 6.6"
              questions={[
                {
                  question: "Q6.1 In the comprehensive equation, the term that absorbs the outward multilateral resistance is:",
                  options: ["µ_ij", "π_i,t", "χ_j,t", "ε_ij,t"],
                  correctIndex: 1,
                  explanation: "Correct! The exporter-time fixed effect π_i,t absorbs the outward multilateral resistance."
                },
                {
                  question: "Q6.2 The interaction NIP_j,t x INTL_ij identifies the effect of a non-discriminatory import policy because:",
                  options: [
                    "it varies only across exporters",
                    "it is bilateral by construction and therefore escapes collinearity with importer-time fixed effects",
                    "it is always statistically insignificant",
                    "it replaces the need for pair fixed effects"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Because it only applies to international trade (INTL_ij = 1), it varies bilaterally and avoids collinearity with the importer-time fixed dummy."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📈 Fixed Effects Roles</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
              <div style={{ background: 'rgba(139, 92, 246, 0.05)', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #8b5cf6' }}>
                <h4 style={{ margin: 0, color: '#8b5cf6' }}>{`Exporter-Time Fixed Effects ($\\pi_{i,t}$)`}</h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{`Absorb outward multilateral resistance $\\Pi_{i,t}^{1-\\sigma}$ and exporter size $Y_{i,t}$.`}</p>
              </div>
              <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '12px', borderRadius: '6px', borderLeft: '4px solid var(--accent-primary)' }}>
                <h4 style={{ margin: 0, color: 'var(--accent-primary)' }}>{`Importer-Time Fixed Effects ($\\chi_{j,t}$)`}</h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{`Absorb inward multilateral resistance $P_{j,t}^{1-\\sigma}$ and importer size $E_{j,t}$.`}</p>
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ margin: 0, color: '#10b981' }}>{`Pair Fixed Effects ($\\mu_{ij}$)`}</h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Absorb distance, language, and time-invariant unobserved pair linkages.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          6.7 — INTERPRETING ESTIMATES
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "6.7 — Interpreting Estimates" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 6.7: Interpreting Gravity Estimates &amp; Tariff Equivalents</h3>
            <p>
              {`Converting dummy variables coefficients into percentage trade volumes and ad-valorem tariff equivalents.`}
            </p>

            <DerivationStepper 
              title="Trade Volume and Tariff Equivalents"
              steps={[
                {
                  explanation: "The percentage trade volume effect of an indicator dummy variable (like RTA) is:",
                  math: "$$\\text{Volume Change (\\%)} = \\left( e^{\\hat{\\beta}_{dummy}} - 1 \\right) \\times 100$$"
                },
                {
                  explanation: "Using an external estimate of the trade elasticity σ, the tariff equivalent of the policy is:",
                  math: "$$\\text{Tariff Equivalent (\\%)} = \\left( e^{\\hat{\\beta}_{RTA} / \\sigma} - 1 \\right) \\times 100$$"
                }
              ]}
            />

            <LessonQuiz 
              title="Lesson 6.7"
              questions={[
                {
                  question: "Q7.1 For a continuous log covariate such as distance, the gravity coefficient is interpreted directly as:",
                  options: ["a probability", "an elasticity of trade with respect to that variable", "a tariff rate", "a fixed cost"],
                  correctIndex: 1,
                  explanation: "Correct! In double-log specifications, coefficients represent elasticity."
                },
                {
                  question: "Q7.2 The trade volume effect of an indicator variable with estimate β_dummy is:",
                  options: ["β_dummy × 100", "(e^β_dummy − 1) × 100", "1 / β_dummy", "e^-β_dummy"],
                  correctIndex: 1,
                  explanation: "Correct! The non-linear transformation is (e^β_dummy - 1) * 100."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 RTA Tariff-Equivalent Calculator</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>{`Estimated RTA Coefficient ($\\hat{\\beta}_{RTA}$):`} <span className="val-highlight">{calcBetaRta.toFixed(2)}</span></label>
                <input type="range" min="0.1" max="1.5" step="0.05" value={calcBetaRta} onChange={e => setCalcBetaRta(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>{`Trade Elasticity ($\\sigma$):`} <span className="val-highlight-purple">{calcSigmaVal.toFixed(1)}</span></label>
                <input type="range" min="2.0" max="10.0" step="0.5" value={calcSigmaVal} onChange={e => setCalcSigmaVal(Number(e.target.value))} className="range-slider slider-purple" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="200" y="60" textAnchor="middle" fill="var(--text-secondary)" fontSize="14">Calculated Trade Volume Increase:</text>
                <text x="200" y="95" textAnchor="middle" fill="var(--accent-secondary)" fontSize="28" fontWeight="bold">
                  {`+${((Math.exp(calcBetaRta) - 1) * 100).toFixed(1)}%`}
                </text>

                <text x="200" y="140" textAnchor="middle" fill="var(--text-secondary)" fontSize="14">Equivalent Tariff Cut:</text>
                <text x="200" y="175" textAnchor="middle" fill="var(--accent-primary)" fontSize="28" fontWeight="bold">
                  {`-${tariffEquivalent}%`}
                </text>
              </svg>
            </div>
            <div className="implications-panel">
              <span style={{ fontWeight: 600 }}>Elasticity Role:</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {`A higher trade elasticity σ implies that consumers are very sensitive to price. Consequently, the observed RTA trade volume effect can be achieved with a much smaller equivalent tariff cut.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          6.8 — CONSISTENT AGGREGATION
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "6.8 — Aggregating Costs" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 6.8: Consistent Aggregation of Bilateral Trade Costs</h3>
            <p>
              {`Aggregating trade costs to the customs union level without violating consumer substitution and trade responses.`}
            </p>

            <DerivationStepper 
              title="Uniform Customs Union Cost Aggregation"
              steps={[
                {
                  explanation: "Bilateral trade cost index b_CU(i) is defined to preserve total export volume to the union:",
                  math: "$$\\sum_{j \\in CU(i)} X_{ij} = \\sum_{j \\in CU(i)} \\frac{Y_i E_j}{Y} \\left( \\frac{b_{CU}(i)}{\\Pi_i P_j} \\right)^{1-\\sigma}$$"
                },
                {
                  explanation: "Solving for the uniform trade cost index yields the market-access weighted average:",
                  math: "$$b_{CU}(i) = \\left[ \\sum_{j \\in CU(i)} \\left( \\frac{E_j/P_j^{1-\\sigma}}{\\sum_k E_k/P_k^{1-\\sigma}} \\right) t_{ij}^{1-\\sigma} \\right]^{\\frac{1}{1-\\sigma}}$$"
                },
                {
                  explanation: "Using estimated PPML importer fixed effects directly provides the weights:",
                  math: "$$b_{CU}(i) = \\left[ \\sum_{j \\in CU(i)} \\left( \\frac{\\chi_j}{\\sum_k \\chi_k} \\right) t_{ij}^{1-\\sigma} \\right]^{\\frac{1}{1-\\sigma}}$$"
                }
              ]}
            />

            <LessonQuiz 
              title="Lesson 6.8"
              questions={[
                {
                  question: "Q8.1 The consistent aggregate trade cost b_CU(i) is defined to preserve:",
                  options: ["i’s aggregate export volume to the customs union", "the simple average of bilateral costs", "the elasticity of substitution", "nothing"],
                  correctIndex: 0,
                  explanation: "Correct! The index aggregates trade costs such that the trade volume predicted remains identical."
                },
                {
                  question: "Q8.2 The weights in the consistent aggregation formula are:",
                  options: ["equal weights across all destinations", "each destination’s share of union-wide market potential", "random", "based on distance only"],
                  correctIndex: 1,
                  explanation: "Correct! Destinations with larger market potential receive larger weights in the aggregate index."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Customs Union Cost Aggregator</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>{`Friction to Destination 2 ($t_{12}$):`} <span className="val-highlight">{aggT12.toFixed(1)}</span></label>
                <input type="range" min="1.0" max="3.0" step="0.1" value={aggT12} onChange={e => setAggT12(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>{`Friction to Destination 3 ($t_{13}$):`} <span className="val-highlight-purple">{aggT13.toFixed(1)}</span></label>
                <input type="range" min="1.0" max="3.0" step="0.1" value={aggT13} onChange={e => setAggT13(Number(e.target.value))} className="range-slider slider-purple" />
              </div>
              <div className="slider-card">
                <label>Weight on Destination 2: <span className="val-highlight-orange">{aggWeight2}%</span></label>
                <input type="range" min="0" max="100" step="5" value={aggWeight2} onChange={e => setAggWeight2(Number(e.target.value))} className="range-slider slider-orange" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="200" y="60" textAnchor="middle" fill="var(--text-secondary)" fontSize="14">Simple Average Cost:</text>
                <text x="200" y="90" textAnchor="middle" fill="var(--text-primary)" fontSize="20" fontWeight="bold">
                  {`t_avg = ${((aggT12 + aggT13) / 2).toFixed(3)}`}
                </text>

                <text x="200" y="135" textAnchor="middle" fill="var(--text-secondary)" fontSize="14">Theory-Consistent Uniform Cost:</text>
                <text x="200" y="170" textAnchor="middle" fill="var(--accent-primary)" fontSize="24" fontWeight="bold">
                  {`b_CU = ${aggUniform}`}
                </text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          6.9 — GRAVITY DATA
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "6.9 — Gravity Data" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 6.9: Gravity Data — Sources, Coverage &amp; Limitations</h3>
            <p>
              {`Constructing variables for structural gravity models using global trade and geography databases.`}
            </p>

            <DefinitionBox title="Bilateral Trade Flows Data">
              {`- IMF DOTS (Direction of Trade Statistics): Long aggregate panels.
              - UN COMTRADE: Highly disaggregated product-level panels.
              - CEPII BACI: Reconciles export/import discrepancies.
              - WTF (World Trade Flows): Reconciles CIF/FOB ratios.`}
            </DefinitionBox>

            <DefinitionBox title="Intra-national trade flows construction">
              {`Intra-national trade ($X_{ii}$) is constructed as:
              $$X_{ii} = \\text{Gross Production}_i - \\text{Total Exports}_i$$
              This requires mapping value-added output classifications (ISIC) to export classifications (HS/SITC).`}
            </DefinitionBox>

            <LessonQuiz 
              title="Lesson 6.9"
              questions={[
                {
                  question: "Q9.1 Import data are generally preferred to export data in gravity estimation because:",
                  options: ["exports are never reported", "imports are typically monitored more closely by customs, due to duties", "imports are always larger", "export classifications change every year"],
                  correctIndex: 1,
                  explanation: "Correct! Importing customs monitor flows closely to collect tariffs, yielding more reliable records."
                },
                {
                  question: "Q9.2 Constructing intra-national trade flows typically requires:",
                  options: ["bilateral tariff schedules only", "the difference between gross production and total exports", "preference parameters", "nothing beyond COMTRADE"],
                  correctIndex: 1,
                  explanation: "Correct! Domestic trade is calculated as gross production minus total exports."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📈 Summary of Trade Frictions Databases</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '12px', borderRadius: '6px' }}>
                <h4 style={{ margin: 0 }}>CEPII GeoDist</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Physical distance, contiguity, language, colonial history.</p>
              </div>
              <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '12px', borderRadius: '6px' }}>
                <h4 style={{ margin: 0 }}>WITS / TRAINS</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>MFN and preferential bilateral applied tariff schedules.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          6.10 — TABLE 1 HORSE RACE
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "6.10 — Table 1 Horse Race" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 6.10: Traditional Gravity Estimates Horse Race</h3>
            <p>
              {`Comparing OLS, remoteness proxies, and PPML with fixed effects specs using the Yotov et al. dataset.`}
            </p>

            <IntuitionBox title="What the horse race teaches">
              {`Omitting multilateral resistance controls (OLS 1) causes significant bias. While OLS with fixed effects (3) absorbs the resistance terms, it fails the Ramsey RESET misspecification test (p=0.000). Only PPML with directional fixed effects (4) passes the RESET test (p=0.642).`}
            </IntuitionBox>

            <LessonQuiz 
              title="Lesson 6.10"
              questions={[
                {
                  question: "Q10.1 Moving from specification (1) to specification (3) in Table 1 changes the distance coefficient because:",
                  options: ["the sample changes", "specification (1) fails to control for multilateral resistance, biasing estimates", "PPML is used", "distance data changed"],
                  correctIndex: 1,
                  explanation: "Correct! Omitting multilateral resistance terms introduces omitted variable bias in OLS."
                },
                {
                  question: "Q10.2 Which specification in Table 1 passes the RESET misspecification test?",
                  options: ["(1) OLS", "(2) OLS with remoteness", "(3) OLS with fixed effects", "(4) PPML with fixed effects"],
                  correctIndex: 3,
                  explanation: "Correct! Only PPML with fixed effects passes the RESET test with a p-value of 0.642."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Interactive Table 1: Gravity Horse Race</span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '4px' }}>
              {["OLS (1)", "Remoteness (2)", "OLS FE (3)", "PPML FE (4)"].map(specName => (
                <button 
                  key={specName} 
                  onClick={() => setSelectedRaceSpec(specName)} 
                  className={`quiz-btn ${selectedRaceSpec === specName ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                  style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                >
                  {specName}
                </button>
              ))}
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="20" y="30" fill="var(--text-secondary)" fontSize="11" fontWeight="bold">Estimated Coefficients:</text>
                
                {/* Distance Bar */}
                <rect x="130" y="45" width={Math.abs(raceSpecsData[selectedRaceSpec].dist) * 80} height="15" fill="var(--accent-primary)" />
                <text x="20" y="57" fill="var(--text-primary)" fontSize="10" fontWeight="bold">Log Distance:</text>
                <text x="140" y="57" fill="#fff" fontSize="10" fontWeight="bold">{raceSpecsData[selectedRaceSpec].dist.toFixed(3)}</text>

                {/* Contiguity Bar */}
                <rect x="130" y="75" width={raceSpecsData[selectedRaceSpec].contig * 80} height="15" fill="var(--accent-secondary)" />
                <text x="20" y="87" fill="var(--text-primary)" fontSize="10" fontWeight="bold">Contiguity:</text>
                <text x="140" y="87" fill="#fff" fontSize="10" fontWeight="bold">{`+${raceSpecsData[selectedRaceSpec].contig.toFixed(3)}`}</text>

                {/* Common Language Bar */}
                <rect x="130" y="105" width={raceSpecsData[selectedRaceSpec].lang * 80} height="15" fill="#a855f7" />
                <text x="20" y="117" fill="var(--text-primary)" fontSize="10" fontWeight="bold">Common Lang:</text>
                <text x="140" y="117" fill="#fff" fontSize="10" fontWeight="bold">{`+${raceSpecsData[selectedRaceSpec].lang.toFixed(3)}`}</text>

                {/* Colony Bar */}
                <rect 
                  x={raceSpecsData[selectedRaceSpec].colony < 0 ? 130 - Math.abs(raceSpecsData[selectedRaceSpec].colony)*80 : 130} 
                  y="135" 
                  width={Math.abs(raceSpecsData[selectedRaceSpec].colony) * 80} 
                  height="15" 
                  fill="#f59e0b" 
                />
                <text x="20" y="147" fill="var(--text-primary)" fontSize="10" fontWeight="bold">Colony:</text>
                <text x="145" y="147" fill="#fff" fontSize="10" fontWeight="bold">
                  {raceSpecsData[selectedRaceSpec].colony > 0 ? `+${raceSpecsData[selectedRaceSpec].colony.toFixed(3)}` : raceSpecsData[selectedRaceSpec].colony.toFixed(3)}
                </text>

                <line x1="130" y1="40" x2="130" y2="160" stroke="#475569" strokeWidth="2" />
              </svg>
            </div>
            <div className="implications-panel" style={{ padding: '10px 14px' }}>
              <span style={{ fontSize: '0.85rem' }}>
                {`Ramsey RESET test p-value: `}
                <strong style={{ color: selectedRaceSpec === "PPML FE (4)" ? "#10b981" : "#ef4444" }}>
                  {raceSpecsData[selectedRaceSpec].reset}
                </strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          6.11 — THE DISTANCE PUZZLE
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "6.11 — The Distance Puzzle" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 6.11: The \"Distance Puzzle\" Resolved</h3>
            <p>
              {`The estimated negative effect of distance on trade has not declined over time despite falling transport costs.`}
            </p>

            <IntuitionBox title="Yotov's (2012) resolution">
              {`Because gravity only identifies relative trade costs, estimating distance on international trade alone measures international distance relative to other international costs. Once intra-national trade is added, the international distance coefficient falls by 10.97%, resolving the puzzle.`}
            </IntuitionBox>

            <LessonQuiz 
              title="Lesson 6.11"
              questions={[
                {
                  question: "Q11.1 The distance puzzle refers to:",
                  options: ["distance has no effect", "the estimated negative effect of distance has not declined despite falling transport costs", "RTAs do nothing", "trade costs are zero"],
                  correctIndex: 1,
                  explanation: "Correct! The distance puzzle is the persistent high coefficient on distance over decades."
                },
                {
                  question: "Q11.2 Yotov (2012) resolves the puzzle by:",
                  options: ["dropping distance", "measuring international distance relative to internal (intra-national) trade costs", "using autarky data", "ignoring panel FEs"],
                  correctIndex: 1,
                  explanation: "Correct! Benchmarking against domestic trade costs allows identification of the true decline in international transport barriers."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Table 2: Resolving the Distance Puzzle</span>
            <div style={{ display: 'flex', gap: '8px', padding: '4px' }}>
              {["Intl Only", "With Intra"].map(specName => (
                <button 
                  key={specName} 
                  onClick={() => setPuzzleSpec(specName)} 
                  className={`quiz-btn ${puzzleSpec === specName ? 'quiz-btn-primary' : 'quiz-btn-secondary'}`}
                  style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                >
                  {specName}
                </button>
              ))}
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                {/* 1986 Bar */}
                <rect x="150" y="55" width={Math.abs(puzzleData[puzzleSpec].val1986) * 120} height="24" fill="var(--accent-primary)" />
                <text x="20" y="71" fill="var(--text-primary)" fontSize="11" fontWeight="bold">Distance 1986:</text>
                <text x="160" y="71" fill="#fff" fontSize="11" fontWeight="bold">{puzzleData[puzzleSpec].val1986.toFixed(3)}</text>

                {/* 2006 Bar */}
                <rect x="150" y="105" width={Math.abs(puzzleData[puzzleSpec].val2006) * 120} height="24" fill="var(--accent-secondary)" />
                <text x="20" y="121" fill="var(--text-primary)" fontSize="11" fontWeight="bold">Distance 2006:</text>
                <text x="160" y="121" fill="#fff" fontSize="11" fontWeight="bold">{puzzleData[puzzleSpec].val2006.toFixed(3)}</text>

                <line x1="150" y1="40" x2="150" y2="155" stroke="#475569" strokeWidth="2" />
              </svg>
            </div>
            <div className="implications-panel">
              <span style={{ fontWeight: 600 }}>Estimated Change (1986-2006):</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {`Change in distance penalty: `}
                <strong style={{ color: puzzleSpec === "With Intra" ? "#10b981" : "#ef4444" }}>
                  {puzzleData[puzzleSpec].change}
                </strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          6.12 — RTA EFFECTS
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "6.12 — RTA Specifications" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 6.12: RTA Effects: Endogeneity, Phasing, and Globalization</h3>
            <p>
              {`Comparing RTA coefficients across six specifications, showing the transition from naive models to theory-consistent estimations.`}
            </p>

            <IntuitionBox title="The big picture across specifications">
              {`Excluding pair FE biases RTA coefficients downward. Adding intra-national trade captures trade diversion, doubling the coefficient. The most robust specification with time-varying borders halves the naive estimate by isolating globalization trends.`}
            </IntuitionBox>

            <LessonQuiz 
              title="Lesson 6.12"
              questions={[
                {
                  question: "Q12.1 Adding pair fixed effects roughly doubles the RTA coefficient (specification 4) because:",
                  options: ["pair FE remove all variation", "without pair FE, estimates are biased downward due to endogeneity", "it increases sample size", "it removes OLS"],
                  correctIndex: 1,
                  explanation: "Correct! RTAs are preferentially signed between countries that trade heavily, causing downward endogeneity bias without pair FE."
                },
                {
                  question: "Q12.2 Once globalization border controls are included, the estimated RTA effect:",
                  options: ["doubles", "is cut in half", "becomes negative", "is unchanged"],
                  correctIndex: 1,
                  explanation: "Correct! Controlling for time-varying international borders captures the generic decline in border barriers that is otherwise misattributed to RTAs."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Step-through: Estimating RTA Effects</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>Specification: <span className="val-highlight">{rtaSpecs[rtaSpecIdx].label}</span></label>
                <input 
                  type="range" min="0" max="5" value={rtaSpecIdx} 
                  onChange={e => setRtaSpecIdx(Number(e.target.value))} 
                  className="range-slider" 
                />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <text x="200" y="60" textAnchor="middle" fill="var(--text-secondary)" fontSize="13">RTA Coefficient (β_RTA):</text>
                <text x="200" y="105" textAnchor="middle" fill="var(--accent-primary)" fontSize="44" fontWeight="bold">
                  {rtaSpecs[rtaSpecIdx].coeff >= 0 ? `+${rtaSpecs[rtaSpecIdx].coeff.toFixed(3)}` : rtaSpecs[rtaSpecIdx].coeff.toFixed(3)}
                </text>
                
                <rect x="50" y="145" width="300" height="50" fill="rgba(255,255,255,0.02)" rx="4" stroke="var(--card-border)" />
                <text x="200" y="165" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="bold">Specification Note:</text>
                <text x="200" y="183" textAnchor="middle" fill="var(--text-muted)" fontSize="9">
                  {rtaSpecs[rtaSpecIdx].note}
                </text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          6.13 — FINAL EXAM
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "6.13 — Final Exam" && (
        <div className="section-quiz-card" style={{ 
          marginTop: '24px', 
          padding: '24px', 
          border: '1px solid var(--card-border)', 
          borderRadius: '8px', 
          background: 'rgba(255,255,255,0.02)' 
        }}>
          <h4 style={{ color: 'var(--accent-secondary)', margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 600 }}>
            🏆 Module 6 Comprehensive Final Exam
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
                background: 'rgba(124, 58, 237, 0.1)', 
                border: '3px solid var(--accent-secondary)' 
              }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{examScore}</span>
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/{finalQuestions.length}</span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                {examScore >= 12 
                  ? "Flawless! You have fully mastered the econometrics and theory of structural gravity!"
                  : "Great effort! Review the notes and try the exam again to sharpen your understanding."}
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
                    btnStyle.background = 'var(--accent-secondary)';
                    btnStyle.border = '1px solid var(--accent-secondary)';
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
                  animation: 'fadeInM6 0.2s ease-out'
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
