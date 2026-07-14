import React, { useState, useEffect } from 'react';
import './Module5.css';
import Module5Quiz from './Module5Quiz';
import { BookOpen, Lightbulb, HelpCircle, ArrowRight, Play, Sliders } from 'lucide-react';

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
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
              animation: 'fadeInM5 0.2s ease-out'
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
   MAIN MODULE 5 COMPONENT
   ════════════════════════════════════════════════════════════════════════ */

export default function Module5({ theme, setActiveTab }) {
  const tabsList = [
    ["5.1 — Partial-Equilibrium Trade Policy", "5.1 Partial Equilibrium"],
    ["5.2 — Domestic Market Power & the Second Best", "5.2 Second Best"],
    ["5.3 — Cournot Duopoly Model of Strategic Trade Policy", "5.3 Strategic Cournot"],
    ["5.4 — Optimum Tariffs, Retaliation & Country Size", "5.4 Tariffs & Size"],
    ["5.5 — Strategic Trade Policy Under Imperfect Competition", "5.5 Imperfect Comp"],
    ["5.6 — Political Economy of Trade Policy", "5.6 Political Economy"],
    ["5.7 — Final Exam", "5.7 Final Exam"]
  ];
  const [moduleTab, setModuleTab] = useState("5.1 — Partial-Equilibrium Trade Policy");
  const [activeMathStep, setActiveMathStep] = useState(1);

  // Trigger MathJax rendering when tabs or steps change
  useEffect(() => {
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [moduleTab, activeMathStep]);

  // Reset stepper on tab changes
  useEffect(() => {
    setActiveMathStep(1);
  }, [moduleTab]);

  // ──────────────────────────────────────────────────────────────────────
  // TAB 5.1 PARAMETERS & CALCULATIONS
  // ──────────────────────────────────────────────────────────────────────
  const [tSmall, setTSmall] = useState(0.5);
  const [tLarge, setTLarge] = useState(0.5);
  const [quotaVal, setQuotaVal] = useState(2.0);

  // Small Country Math: P^w = 1.5, tSpecific, D = 10 - 2P, S = 2P
  const pWorldSmall = 1.5;
  const pDomesticSmall = pWorldSmall + tSmall;
  const qSupplySmall0 = 2 * pWorldSmall;
  const qDemandSmall0 = 10 - 2 * pWorldSmall;
  const qSupplySmall = 2 * pDomesticSmall;
  const qDemandSmall = 10 - 2 * pDomesticSmall;
  
  const csLossSmall = 7 * tSmall - tSmall * tSmall;
  const psGainSmall = 3 * tSmall + tSmall * tSmall;
  const trSmall = tSmall * Math.max(0, 4 - 4 * tTSmallCheck(tSmall));
  const dwlSmall = 2 * tSmall * tSmall;

  function tTSmallCheck(t) {
    return t > 1.0 ? 1.0 : t; // Prohibitive tariff at t = 1.0
  }

  // Large Country Math: MD = 13 - 4P, XS* = 4P - 7
  // P^w = 2.5, M_ft = 3. Price wedge: P^t - P^{t*} = t.
  // P^{t*} = 2.5 - 0.5t, P^t = 2.5 + 0.5t, M(t) = 3 - 2t. Prohibitive at t = 1.5
  const tLargeLim = tLarge > 1.5 ? 1.5 : tLarge;
  const pDomesticLarge = 2.5 + 0.5 * tLargeLim;
  const pForeignLarge = 2.5 - 0.5 * tLargeLim;
  const mTradeLarge = Math.max(0, 3 - 2 * tLargeLim);
  const totGainLarge = 0.5 * tLargeLim * mTradeLarge;
  const dwlLarge = 0.5 * tLargeLim * tLargeLim;
  const welfareLarge = totGainLarge - dwlLarge;

  // Quota Math: MD = 4 - 0.5M, XS* = 0.5 + 0.5M. FT = 3.5, P^w = 2.25
  const pQuotaDom = Math.max(0.5, 4 - 0.5 * quotaVal);
  const pQuotaFor = Math.max(0.5, 0.5 + 0.5 * quotaVal);
  const quotaRent = Math.max(0, (pQuotaDom - pQuotaFor) * quotaVal);

  // Quizzes for Tab 5.1 (Lessons 1-3)
  const quizL1 = [
    {
      question: "Q1.1 In the small-country tariff diagram, the areas b and d measure, respectively:",
      options: ["Option A: producer gain and government revenue", "Option B: the production distortion (too much high-cost domestic output) and the consumption distortion (too little consumption)", "Option C: terms-of-trade gain and quota rent", "Option D: transfers to foreigners"],
      correctIndex: 1,
      explanation: "Area b measures the production distortion (inefficient domestic expansion), while area d measures the consumption distortion (lost consumer value from reduced consumption)."
    },
    {
      question: "Q1.2 The net welfare effect of a small-country tariff is:",
      options: ["Option A: + c", "Option B: -(b + d) < 0: unambiguously negative", "Option C: + a - c", "Option D: zero"],
      correctIndex: 1,
      explanation: "A small-country tariff causes deadweight loss triangles b and d without any countervailing terms-of-trade improvement, making it strictly welfare-reducing."
    },
    {
      question: "Q1.3 Tariff revenue is zero at both t = 0 and t = ¯t because:",
      options: ["Option A: the government forgets to collect it", "Option B: at t = 0 the rate is zero; at ¯t imports are zero — revenue is rate × volume", "Option C: demand is perfectly inelastic", "Option D: the world price adjusts"],
      correctIndex: 1,
      explanation: "Revenue is rate × volume. At t = 0, the tariff rate is zero. At the prohibitive tariff ¯t, imports shrink to zero, leaving zero revenue."
    },
    {
      question: "Q1.4 Why can't a small country gain from any tariff?",
      options: ["Option A: its government is too weak", "Option B: it faces a fixed world price, so there is no terms-of-trade gain to offset the deadweight losses", "Option C: its consumers do not value imports", "Option D: tariffs are illegal"],
      correctIndex: 1,
      explanation: "A small country has no market power, so it cannot force foreign exporters to absorb any of the tariff cost. The world price remains fixed at P^w."
    }
  ];

  const quizL2 = [
    {
      question: "Q2.1 The terms-of-trade gain e from a large-country tariff equals:",
      options: ["Option A: t × domestic output", "Option B: (P^w - P_t^*) × M: the fall in the price paid to foreign exporters, times imports", "Option C: consumer surplus", "Option D: the area b + d"],
      correctIndex: 1,
      explanation: "The terms-of-trade gain is the drop in the price paid to foreign suppliers (P^w - P_t^*) multiplied by the volume of imports M."
    },
    {
      question: "Q2.2 A small tariff raises a large country's welfare because:",
      options: ["Option A: deadweight losses are always zero", "Option B: the terms-of-trade gain e is first-order in t while the distortions b + d are second-order", "Option C: foreign producers do not react", "Option D: revenue is spent efficiently"],
      correctIndex: 1,
      explanation: "For small tariffs, the terms-of-trade transfer (e) is a first-order gain, while the distortions (b + d) are quadratic (second-order), guaranteeing positive net gains."
    },
    {
      question: "Q2.3 The optimum tariff topt = 1/ε* implies that against a partner with a very inelastic export supply, Home should set:",
      options: ["Option A: a lower tariff", "Option B: a higher tariff", "Option C: a zero tariff", "Option D: an import subsidy"],
      correctIndex: 1,
      explanation: "Inelastic export supply (low ε*) means foreign suppliers will absorb a large share of the tariff to stay in the market, allowing Home to impose a higher tariff."
    },
    {
      question: "Q2.4 In offer-curve space, the optimal tariff is found where:",
      options: ["Option A: the two offer curves are parallel", "Option B: Home’s trade indifference curve is tangent to Foreign’s offer curve", "Option C: Foreign’s indifference curve is tangent to Home’s offer curve", "Option D: trade volume is maximized"],
      correctIndex: 1,
      explanation: "The optimal tariff shifts Home's offer curve to achieve the point of tangency between Home's trade indifference curves and Foreign's offer curve, maximizing Home welfare."
    }
  ];

  const quizL3 = [
    {
      question: "Q3.1 The quota rent is:",
      options: ["Option A: the deadweight loss of the quota", "Option B: (P_M - P_M^*) × M: the gap between the domestic price and the marginal foreign supply price, on the quota volume", "Option C: always captured by the government", "Option D: zero when the quota binds"],
      correctIndex: 1,
      explanation: "A quota restricts quantity, driving up the domestic price. The difference between the domestic price and the foreign supply cost represents the quota rent."
    },
    {
      question: "Q3.2 A tariff and an equally restrictive quota differ, under perfect competition, only in:",
      options: ["Option A: the resulting domestic price", "Option B: who captures the rent rectangle: treasury (tariff revenue) vs. license holders (quota rents)", "Option C: the volume of imports", "Option D: consumer surplus"],
      correctIndex: 1,
      explanation: "Under perfect competition, a tariff and an equivalent quota yield identical price and quantity results; they differ only in who pockets the revenue rectangle."
    },
    {
      question: "Q3.3 If import licenses are given to foreign exporters, Home’s welfare change from the quota is:",
      options: ["Option A: -b - d + f", "Option B: -(b + d) minus the entire rent rectangle: strictly worse than the equivalent tariff", "Option C: + f", "Option D: zero"],
      correctIndex: 1,
      explanation: "If foreign license holders capture the rents, the terms-of-trade benefit is completely lost, causing Home welfare to fall by both the deadweight loss and the rent rectangle."
    },
    {
      question: "Q3.4 The deep reason tariff–quota equivalence fails under domestic monopoly is:",
      options: ["Option A: quotas are illegal under WTO rules", "Option B: a tariff leaves the monopolist facing a price ceiling, while a quota leaves it facing a residual demand curve it can exploit", "Option C: tariffs raise no revenue", "Option D: monopolists never import"],
      correctIndex: 1,
      explanation: "A tariff locks in a maximum price ceiling (inducing competitive price-taking at that ceiling), whereas a quota caps import quantities, allowing the monopolist to exploit the residual demand curve."
    }
  ];

  // ──────────────────────────────────────────────────────────────────────
  // TAB 5.2 PARAMETERS & CALCULATIONS
  // ──────────────────────────────────────────────────────────────────────
  const [tMon, setTMon] = useState(1.0);
  const [quotaMon, setQuotaMon] = useState(2.0);
  const [gtSlope, setGtSlope] = useState(-0.4);

  // Monopoly curves: D: P = 6 - Q, MC: P = 1 + Q, P^w = 2
  // Free trade ceiling = 2. Q_F = 1, Imports = 3.
  // With tariff: ceiling is 2 + t. For t = 1.0, ceiling is 3. Q_t = 2. Imports = 1.
  // Prohibitive tariff makes firm unconstrained monopolist: MR = MC => 6 - 2Q = 1 + Q => Q = 5/3, P = 4.33
  const tMonProh = tMon > 2.33 ? 2.33 : tMon;
  const pCeilingMon = 2.0 + tMonProh;
  const qDomesticMon = Math.min(5/3, pCeilingMon - 1.0);
  const qDemandMon = Math.max(qDomesticMon, 6.0 - pCeilingMon);
  const mImportsMon = Math.max(0, qDemandMon - qDomesticMon);

  // Quotas under Monopoly: Dq = 6 - M - Q = 6 - quotaMon - Q
  // MRq = 6 - quotaMon - 2Q. MC = 1 + Q.
  // 6 - quotaMon - 2Q = 1 + Q => 3Q = 5 - quotaMon => Q_q = (5 - quotaMon)/3.
  // P_q = 6 - quotaMon - Q_q = 6 - quotaMon - (5 - quotaMon)/3 = (13 - 2*quotaMon)/3
  const qQuotaMon = Math.max(0, (5.0 - quotaMon) / 3.0);
  const pQuotaMonPrice = (13.0 - 2.0 * quotaMon) / 3.0;

  const quizL4 = [
    {
      question: "Q4.1 Under free trade, a domestic monopolist facing world price P^w behaves as:",
      options: ["Option A: an unconstrained monopolist", "Option B: a price-taker at P^w — import competition removes its pricing power", "Option C: a Stackelberg leader", "Option D: a perfect price discriminator"],
      correctIndex: 1,
      explanation: "Import competition acts as a price ceiling at P^w. Any price above P^w loses all market share, forcing competitive pricing."
    },
    {
      question: "Q4.2 A non-prohibitive tariff t leaves the monopolist:",
      options: ["Option A: free to set MR = MC", "Option B: a constrained price-taker at the higher ceiling P^w + t, expanding along MC", "Option C: unaffected", "Option D: unable to produce"],
      correctIndex: 1,
      explanation: "The tariff raises the domestic price ceiling to P^w + t, so the monopolist expands production along its MC curve to maximize profits under the cap."
    },
    {
      question: "Q4.3 A binding quota reintroduces monopoly pricing because:",
      options: ["Option A: quotas raise marginal cost", "Option B: the monopolist faces the downward-sloping residual demand D(P) - M rather than a horizontal price ceiling", "Option C: quota rents accrue to the government", "Option D: consumers stop buying imports"],
      correctIndex: 1,
      explanation: "By capping import quantities, a quota removes the infinite price elasticity of imports. The monopolist regains pricing power over the residual domestic demand."
    },
    {
      question: "Q4.4 Ranked by welfare (best to worst) for the same import volume under domestic monopoly:",
      options: ["Option A: quota ≻ tariff", "Option B: tariff ≻ quota — the quota adds the monopoly distortion at any binding level", "Option C: they are always equivalent", "Option D: cannot be ranked"],
      correctIndex: 1,
      explanation: "The tariff preserves price ceiling competition, whereas the quota gives the monopolist pricing power, raising prices and generating monopoly deadweight loss."
    }
  ];

  const quizL5 = [
    {
      question: "Q5.1 The stability/uniqueness condition for the Nash equilibrium is:",
      options: ["Option A: π1_a1 = π2_a2 = 0", "Option B: Δ = π1_a1a1*π2_a2a2 - π1_a1a2*π2_a2a1 > 0", "Option C: π1_a1a2 > 0", "Option D: θ1 = θ2"],
      correctIndex: 1,
      explanation: "Nash stability requires that own-actions have a stronger direct effect than the feedback of cross-actions, mathematically verified when Δ > 0."
    },
    {
      question: "Q5.2 Actions are strategic substitutes when:",
      options: ["Option A: π1_a1a2 < 0: a higher rival action lowers own marginal payoff, so best responses slope down", "Option B: π1_a1a2 > 0", "Option C: payoffs are symmetric", "Option D: the Nash equilibrium is unique"],
      correctIndex: 0,
      explanation: "Strategic substitutes are characterized by a negative cross-partial derivative, meaning aggressive action by one's rival decreases one's own optimal action."
    },
    {
      question: "Q5.3 By the envelope theorem, the effect of a shock θ2 on player 1’s equilibrium payoff runs only through:",
      options: ["Option A: player 1’s own action (first-order)", "Option B: the rival’s equilibrium action, π1_a2 * (daN_2 / dθ2)", "Option C: the constant term", "Option D: nothing — payoffs are unaffected"],
      correctIndex: 1,
      explanation: "At equilibrium, own first-order condition is zero (π1_a1 = 0). The direct effect of own adjustments vanishes, and only the strategic response of the rival survives."
    },
    {
      question: "Q5.4 Interpreting a home tariff as c2 = c1 + t means:",
      options: ["Option A: tariffs subsidize the foreign firm", "Option B: a tariff is formally a rise in the foreign rival’s marginal cost of serving the home market", "Option C: tariffs change preferences", "Option D: the model breaks down"],
      correctIndex: 1,
      explanation: "A tariff is structurally modeled as a cost adder on foreign shipments, identical to a cost shock c2 in game theoretic duopoly models."
    }
  ];

  // ──────────────────────────────────────────────────────────────────────
  // TAB 5.3 PARAMETERS & CALCULATIONS
  // ──────────────────────────────────────────────────────────────────────
  const [c2, setC2] = useState(2.5);
  const [tCour, setTCour] = useState(0.0);

  // Linear Demand Cournot: P = 10 - X, c1 = 2.0, c2_eff = c2 + tCour
  const c1Fixed = 2.0;
  const c2Eff = c2 + tCour;
  const x1Cour = Math.max(0, (10 - 2 * c1Fixed + c2Eff) / 3);
  const x2Cour = Math.max(0, (10 - 2 * c2Eff + c1Fixed) / 3);
  const xTotalCour = x1Cour + x2Cour;
  const pCour = 10 - xTotalCour;
  
  const profit1Cour = (pCour - c1Fixed) * x1Cour;
  const profit2Cour = (pCour - c2Eff) * x2Cour;
  const jointProfitCour = profit1Cour + profit2Cour;

  // Let's create data for the U-shaped joint profit curve: c2 ranges from 0.5 to 5.0
  const c2RangeForProfit = Array.from({ length: 46 }, (_, i) => 0.5 + i * 0.1);
  const jointProfitsForCurve = c2RangeForProfit.map(c => {
    const x1 = Math.max(0, (10 - 2 * c1Fixed + c) / 3);
    const x2 = Math.max(0, (10 - 2 * c + c1Fixed) / 3);
    return Math.pow(x1, 2) + Math.pow(x2, 2);
  });

  const quizL6 = [
    {
      question: "Q6.1 In Cournot with P' + P''X_i < 0, quantities are:",
      options: ["Option A: strategic complements", "Option B: strategic substitutes: reaction functions slope down", "Option C: independent", "Option D: perfect substitutes in preferences"],
      correctIndex: 1,
      explanation: "Cournot quantities are strategic substitutes because one firm's expansion reduces the market price, depressing the rival's marginal revenue."
    },
    {
      question: "Q6.2 A rise in the foreign rival’s cost c2 causes:",
      options: ["Option A: X1 ↓, X2 ↑", "Option B: X1 ↑, X2 ↓, total output ↓, price ↑", "Option C: both outputs rise", "Option D: no change in price"],
      correctIndex: 1,
      explanation: "Increasing c2 contracts foreign output, shifting Home demand outward. The Home firm expands, but not enough to offset the Foreign cut, raising prices."
    },
    {
      question: "Q6.3 The effect of c2 on joint profit π1 + π2 is:",
      options: ["Option A: always positive", "Option B: always negative", "Option C: U-shaped: negative near symmetry, positive for large wedges, flat after exit", "Option D: exactly zero"],
      correctIndex: 2,
      explanation: "At cost symmetry, business stealing is highly destructive. As cost asymmetry widens, the low-cost firm expands aggressively, eventual monopoly efficiency dominates, and joint profit turns up."
    },
    {
      question: "Q6.4 Why does own profit always rise when the rival’s cost rises?",
      options: ["Option A: demand shifts out", "Option B: by the envelope theorem the only surviving channel is the rival’s contraction, which raises the price firm 1 receives", "Option C: costs fall for firm 1", "Option D: consumers switch loyalty"],
      correctIndex: 1,
      explanation: "The envelope theorem dictates that firm 1's profit gains run entirely through the rival's output change. Since dX2/dc2 < 0, domestic price and profits rise."
    }
  ];

  const quizL7 = [
    {
      question: "Q7.1 In the quasilinear framework, national welfare is:",
      options: ["Option A: consumer surplus only", "Option B: CS + total profits (+ wage income): u(X) − PX + π1 + π2 + wL", "Option C: tariff revenue only", "Option D: GDP at world prices"],
      correctIndex: 1,
      explanation: "Quasilinear utility isolates the consumer's net utility (CS) and sums it directly with industry profits and labor earnings."
    },
    {
      question: "Q7.2 At free trade (t = 0), a marginal home tariff changes welfare by:",
      options: ["Option A: + X2 dt", "Option B: −X2 dt < 0: the first-order consumer loss dominates the second-order profit-shifting gain", "Option C: zero", "Option D: + t dX1"],
      correctIndex: 1,
      explanation: "At t = 0, the tariff's profit-shifting benefit is exactly zero (second-order). The consumption tax distortion is first-order, making the marginal tariff welfare-reducing."
    },
    {
      question: "Q7.3 'Reciprocal dumping' refers to:",
      options: ["Option A: both governments subsidizing agriculture", "Option B: two-way trade in the same homogeneous good, driven by Cournot rivalry across segmented markets", "Option C: selling below cost in one’s own market", "Option D: exchange-rate manipulation"],
      correctIndex: 1,
      explanation: "Reciprocal dumping describes cross-hauling of identical products as rival duopolists absorb transport costs to enter each other's home markets."
    },
    {
      question: "Q7.4 Cournot market power matters for trade-policy analysis because:",
      options: ["Option A: it eliminates deadweight loss", "Option B: it creates a pre-existing distortion (P > c), putting policy in a second-best world where interventions can raise welfare", "Option C: it makes demand vertical", "Option D: it fixes the terms of trade"],
      correctIndex: 1,
      explanation: "Cournot pricing creates a domestic markup distortion (price above MC). In this second-best setting, a tariff can improve national welfare by acting as a regulator."
    }
  ];

  // ──────────────────────────────────────────────────────────────────────
  // TAB 5.4 PARAMETERS & CALCULATIONS
  // ──────────────────────────────────────────────────────────────────────
  const [lambdaVal, setLambdaVal] = useState(1.0);
  const [tWarHome, setTWarHome] = useState(1.0);

  // Nash retaliation curves: Home best response RR shifts down with size lambda (lambda = L_F / L_H)
  // Higher lambda (Foreign is larger) => RR shifts down (Home tariff decreases).
  // Home tariff: tRR = 1.2 / (1 + 0.3 * lambda) - 0.2 * tStar
  // Foreign best response R*R*: tStar = 1.2 / (1 + 0.3 / lambda) - 0.2 * tHome
  const tHomeNash = 1.2 / (1.0 + 0.3 * lambdaVal);
  const tForNash = 1.2 / (1.0 + 0.3 / lambdaVal);
  
  // Solve for intersection:
  // tH = H_0 - 0.2 tF
  // tF = F_0 - 0.2 tH => tH = H_0 - 0.2(F_0 - 0.2 tH) = H_0 - 0.2 F_0 + 0.04 tH
  // 0.96 tH = H_0 - 0.2 F_0 => tH = (H_0 - 0.2 F_0) / 0.96
  const h0 = tHomeNash;
  const f0 = tForNash;
  const tHomeEq = Math.max(0, (h0 - 0.2 * f0) / 0.96);
  const tForEq = Math.max(0, (f0 - 0.2 * h0) / 0.96);

  const quizL8 = [
    {
      question: "Q8.1 Johnson’s central finding on retaliation is that:",
      options: ["Option A: both countries always lose a tariff war relative to free trade", "Option B: at most one country must lose; a country with favorable relative offer-curve elasticities can win the tariff war", "Option C: trade always collapses to zero", "Option D: tariffs converge to 100%"],
      correctIndex: 1,
      explanation: "Johnson proved that a large country facing highly inelastic partner offer curves can win the tariff war, ending up better off than under free trade."
    },
    {
      question: "Q8.2 Mayer’s Pareto-efficiency condition t + t* + tt* = 0 implies:",
      options: ["Option A: both countries should set equal tariffs", "Option B: efficiency requires free trade for both, or a tariff by one matched by a subsidy by the other", "Option C: tariffs are efficient if small", "Option D: only quotas are efficient"],
      correctIndex: 1,
      explanation: "Efficiency demands equal relative border prices. Thus, if one country sets a tariff, the other must subsidize to eliminate the wedge."
    },
    {
      question: "Q8.3 The threat point of Mayer’s negotiation is:",
      options: ["Option A: free trade", "Option B: the Nash tariff-war equilibrium E at the crossing of RR and R*R*", "Option C: autarky", "Option D: the point M"],
      correctIndex: 1,
      explanation: "Negotiations operate under the threat of a breakdown, which leads back to the non-cooperative Nash tariff-war equilibrium."
    },
    {
      question: "Q8.4 Negotiated settlements always dominate the tariff war because:",
      options: ["Option A: governments dislike conflict", "Option B: at E the indifference curves cross (perpendicular slopes), so tangency points on CC exist that make both better off", "Option C: the WTO enforces free trade", "Option D: E lies on CC"],
      correctIndex: 1,
      explanation: "At E, marginal trade-offs differ across countries, so their trade indifference curves cross. Moving to a tangency locus on CC Pareto-improves welfare."
    }
  ];

  const quizL9 = [
    {
      question: "Q9.1 Syropoulos measures country size by relative population λi = Lj/Li (at fixed per-capita endowments) because:",
      options: ["Option A: population data are more accurate", "Option B: GDP shares are endogenous to trade policy, while λi is a true primitive", "Option C: small countries have no GDP", "Option D: it makes the algebra harder"],
      correctIndex: 1,
      explanation: "Tariffs change domestic prices and incomes, distorting nominal GDP. Relative population λi is a structural primitive, immune to policy shocks."
    },
    {
      question: "Q9.2 Proposition 2 states that a country wins the tariff war if:",
      options: ["Option A: it moves first", "Option B: its relative size exceeds a threshold λ_bar_i", "Option C: it has absolute advantage in both goods", "Option D: its tariff is lower"],
      correctIndex: 1,
      explanation: "Terms-of-trade leverage scales with country size. A sufficiently large country (above λ_bar_i) extracts enough foreign surplus to win the war."
    },
    {
      question: "Q9.3 Under Assumptions 1–2, tariffs are:",
      options: ["Option A: strategic complements", "Option B: strategic substitutes, with a unique Nash equilibrium; own tariff rises with own size", "Option C: neutral", "Option D: random"],
      correctIndex: 1,
      explanation: "Stability assumptions guarantee general-equilibrium tariffs are strategic substitutes. Larger countries wield greater market power, setting higher Nash tariffs."
    },
    {
      question: "Q9.4 The “Prisoner’s Dilemma” region is where:",
      options: ["Option A: both countries win the tariff war", "Option B: both countries lose relative to free trade, yet each finds a positive tariff unilaterally optimal", "Option C: neither sets a tariff", "Option D: only the small country loses"],
      correctIndex: 1,
      explanation: "In this intermediate size region, both countries end up worse off than under free trade, despite unilaterally optimizing with positive tariffs."
    }
  ];

  // ──────────────────────────────────────────────────────────────────────
  // TAB 5.5 PARAMETERS & CALCULATIONS
  // ──────────────────────────────────────────────────────────────────────
  const [convexityR, setConvexityR] = useState(0.0);
  const [subsidyS, setSubsidyS] = useState(0.5);
  const [bertrandSoft, setBertrandSoft] = useState(0.0);

  // Demand convexity R: optimal tariff t = -P'X(R + 1). Let P'X = -1.0.
  // Then t = R + 1. If R = 0 (linear), t = 1.0 (positive tariff).
  // If R = -1.5, t = -0.5 (import subsidy).
  const optTariffMon = convexityR + 1.0;

  // Third-market export subsidy s: FOC: xP' + P - c_x + s = 0.
  // Shifts domestic reaction function outwards. Nash moves along foreign reaction curve.
  const xHomeSub = 2.0 + 0.6 * subsidyS;
  const yForSub = 2.0 - 0.3 * subsidyS;

  const quizL10 = [
    {
      question: "Q10.1 Against a foreign monopolist with linear demand, the optimal home policy is:",
      options: ["Option A: free trade", "Option B: a positive rent-extracting tariff t_hat = −P′X > 0", "Option C: an import subsidy", "Option D: a quota of zero"],
      correctIndex: 1,
      explanation: "With linear demand (R = 0), the optimal tariff is strictly positive: t_hat = -P'X, successfully extracting monopoly rent for the treasury."
    },
    {
      question: "Q10.2 With constant-elasticity demand, the optimal policy flips to an import subsidy because:",
      options: ["Option A: elasticity is infinite", "Option B: R = −1 − 1/ε < −1: tariff pass-through exceeds one-for-one, so consumers lose more than the treasury gains", "Option C: the monopolist has no rents", "Option D: revenue cannot be collected"],
      correctIndex: 1,
      explanation: "Constant-elasticity demand is highly convex (R < -1). A tariff causes prices to rise by more than the tariff rate, harming consumers more than the treasury gains."
    },
    {
      question: "Q10.3 In the domestic-plus-foreign-firm model, a tariff raises home welfare mainly by:",
      options: ["Option A: raising total consumption", "Option B: shifting output and profit from the foreign to the domestic firm (yt > 0, xt < 0) plus revenue on residual imports", "Option C: lowering the domestic price", "Option D: eliminating fixed costs"],
      correctIndex: 1,
      explanation: "The tariff shifts market share and profits from the foreign firm to the domestic competitor, keeping rents within the national border."
    },
    {
      question: "Q10.4 Higher transport costs k lower optimal tariffs because:",
      options: ["Option A: governments cannot measure them", "Option B: markets are already more segmented, so less rent remains for a tariff to extract or shift", "Option C: they are a substitute form of revenue", "Option D: firms merge"],
      correctIndex: 1,
      explanation: "High transport costs already limit trade volume and shrink import rents, leaving less margin for a tariff to shift profits."
    }
  ];

  const quizL11 = [
    {
      question: "Q11.1 At free trade, a marginal export subsidy in the third-market Cournot model:",
      options: ["Option A: lowers welfare, like the marginal tariff of Lesson 7", "Option B: raises welfare: Gs|s=0 = xP′ys > 0, with no domestic consumer loss to offset the profit shift", "Option C: has no effect", "Option D: raises the world price"],
      correctIndex: 1,
      explanation: "Since all output is sold to a third country, there is no domestic consumer surplus loss. The profit shift is a first-order welfare gain."
    },
    {
      question: "Q11.2 The optimal subsidy implements the outcome the home firm would achieve as:",
      options: ["Option A: a perfect competitor", "Option B: a Stackelberg quantity leader", "Option C: a monopolist", "Option D: a Bertrand player"],
      correctIndex: 1,
      explanation: "The subsidy acts as a commitment device, shifting the home firm's reaction function to implement the Stackelberg leader equilibrium."
    },
    {
      question: "Q11.3 For an international monopolist with no rival, an export subsidy is:",
      options: ["Option A: still optimal", "Option B: pure waste: Gs = −s xs < 0 — there is no rival from whom to shift profit", "Option C: equivalent to a tariff", "Option D: necessary for exports"],
      correctIndex: 1,
      explanation: "Without a competitor, there is no profit-shifting channel. A subsidy simply represents a deadweight loss to the home country."
    },
    {
      question: "Q11.4 Under Bertrand competition with differentiated products, the optimal export policy is typically:",
      options: ["Option A: a larger subsidy", "Option B: an export tax: with upward-sloping reaction curves, committing to softness raises both prices and margins", "Option C: free trade always", "Option D: a quota"],
      correctIndex: 1,
      explanation: "Bertrand prices are strategic complements. An export tax raises prices, inducing the foreign rival to raise prices too, soft-pedaling competition."
    },
    {
      question: "Q11.5 In the three-government linear benchmark, the importer’s optimal tariff equals:",
      options: ["Option A: zero", "Option B: the sum of the two exporters’ optimal subsidies, t = s + s*", "Option C: half of each subsidy", "Option D: the world price"],
      correctIndex: 1,
      explanation: "The importing nation optimal tariff extracts the foreign subsidies by setting a tariff rate exactly equal to their sum."
    }
  ];

  // ──────────────────────────────────────────────────────────────────────
  // TAB 5.6 PARAMETERS & CALCULATIONS
  // ──────────────────────────────────────────────────────────────────────
  const [votingCost, setVotingCost] = useState(0.05);
  const [lobbyShare, setLobbyShare] = useState(0.3);
  const [lobbyOrganized, setLobbyOrganized] = useState(true);

  // Grossman-Helpman Protection for Sale: Ramsey rule slope
  // ti / (1 + ti) = (Ii - alpha_L) / (a + alpha_L) * (z_i / e_i)
  // Let a = 1.0 ( benevolence weight )
  // If organized (Ii = 1): slope = (1 - alpha_L) / (1 + alpha_L)
  // If unorganized (Ii = 0): slope = -alpha_L / (1 + alpha_L)
  const ghSlope = lobbyOrganized 
    ? (1.0 - lobbyShare) / (1.0 + lobbyShare) 
    : -lobbyShare / (1.0 + lobbyShare);

  const quizL12 = [
    {
      question: "Q12.1 In Mayer (1984), person i wants a positive tariff iff:",
      options: ["Option A: they consume no imports", "Option B: they are relatively well endowed with the factor used intensively in the import-competing sector", "Option C: their income is above average", "Option D: they own no capital"],
      correctIndex: 1,
      explanation: "A tariff increases the real reward to the factor used intensively in the protected sector (Stolper-Samuelson), raising the income of its owners."
    },
    {
      question: "Q12.2 With costless universal voting, the equilibrium tariff is:",
      options: ["Option A: the mean voter’s optimum", "Option B: the median voter’s optimal tariff (single-peaked preferences, Black’s theorem)", "Option C: zero", "Option D: the maximum-revenue tariff"],
      correctIndex: 1,
      explanation: "Under single-peaked voter preferences, majority voting selects the median voter's preferred tariff rate."
    },
    {
      question: "Q12.3 Right-skewed capital ownership biases the vote toward:",
      options: ["Option A: free trade", "Option B: policies favoring the labor-owning majority, e.g. tariffs on capital-intensive imports", "Option C: export subsidies", "Option D: capital owners"],
      correctIndex: 1,
      explanation: "Skewed asset distributions place the median voter below the average capital ratio, biasing election outcomes toward labor-protective tariffs."
    },
    {
      question: "Q12.4 The specific-factors result Bgg > −Bhg explains why:",
      options: ["Option A: all sectors are protected equally", "Option B: small, organized sectors win protection: concentrated per-capita gains beat diffuse per-capita losses once participation is costly", "Option C: tariffs are zero in equilibrium", "Option D: consumers organize easily"],
      correctIndex: 1,
      explanation: "Specific factors gain heavily while other sectors lose diffuse amounts per capita. Costly voting causes diffuse losers to stay home, while gainers organize."
    }
  ];

  const quizL13 = [
    {
      question: "Q13.1 In Protection for Sale, the government’s objective values:",
      options: ["Option A: only welfare", "Option B: contributions and welfare — equivalently, lobby members at weight 1 + a and others at weight a", "Option C: only contributions", "Option D: exports only"],
      correctIndex: 1,
      explanation: "The government trades off contributions against national welfare, giving organized lobby groups a higher implicit weight (1 + a)."
    },
    {
      question: "Q13.2 According to the equilibrium formula, protection is higher for sectors that are:",
      options: ["Option A: organized, with high output-to-import ratios and low trade elasticities", "Option B: unorganized, trade-intensive, and elastic", "Option C: capital-intensive always", "Option D: export-oriented always"],
      correctIndex: 0,
      explanation: "The Ramsey-type formula shows organized lobbies get high tariffs when their domestic output is large (high z_i) and deadweight losses are low (low e_i)."
    },
    {
      question: "Q13.3 If every citizen belongs to some lobby (αL = 1, all Ii = 1):",
      options: ["Option A: protection is maximal", "Option B: free trade emerges — rival lobbies fully neutralize one another", "Option C: the government collapses", "Option D: tariffs equal 1 /ei"],
      correctIndex: 1,
      explanation: "If everyone belongs to a lobby, competing lobby bids cancel out, leaving the government to set tariffs to maximize national welfare, which yields free trade."
    },
    {
      question: "Q13.4 Lobbies may prefer the government to use inefficient instruments because:",
      options: ["Option A: they misunderstand economics", "Option B: inefficiency weakens the government’s threat of a cheap deal with rival groups, lowering the contributions needed to sustain the lobby’s preferred policy", "Option C: tariffs are easier to spell", "Option D: efficient instruments are unconstitutional"],
      correctIndex: 1,
      explanation: "Inefficient instruments limit the government's threat potential. This reduces the contribution bribes lobbies must pay to secure their policy."
    }
  ];

  return (
    <div className="container module5-container" style={{ padding: '40px 24px' }}>
      {/* Header */}
      <div className="module-header">
        <button onClick={() => setActiveTab('home')} className="back-btn">
          <span>← Back to Course Path</span>
        </button>
        <div className="module-title-row">
          <div>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Module 5
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '4px' }}>Trade Policy &amp; Welfare</h2>
          </div>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="module-sections-nav" style={{ overflowX: 'auto' }}>
        {tabsList.map(([keyName, label]) => {
          return (
            <button 
              key={keyName} 
              className={`tab-btn ${moduleTab === keyName ? 'active' : ''}`} 
              onClick={() => setModuleTab(keyName)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* TAB 5.1: PARTIAL EQUILIBRIUM TRADE POLICY */}
      {/* ======================================================== */}
      {moduleTab === "5.1 — Partial-Equilibrium Trade Policy" && (
        <div className="lesson-step-content">
          <div className="stepper-section-title">
            5.1 — Partial-Equilibrium Trade Policy
          </div>

          <div className="stepper-header">
            <button className={`step-indicator-btn ${activeMathStep === 1 ? 'active' : ''}`} onClick={() => setActiveMathStep(1)}>
              <span className="step-num-badge">1</span> Step 1: Small Country &amp; Laffer Curve
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 2 ? 'active' : ''}`} onClick={() => setActiveMathStep(2)}>
              <span className="step-num-badge">2</span> Step 2: Large Country Case &amp; TOT Gains
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 3 ? 'active' : ''}`} onClick={() => setActiveMathStep(3)}>
              <span className="step-num-badge">3</span> Step 3: Optimal Tariff &amp; Quotas
            </button>
          </div>

          <div className="stepper-card-body">
            {activeMathStep === 1 && (
              <div>
                <h3>Small Country Tariff &amp; Welfare Decomposition</h3>
                <p>
                  {`A small country faces a perfectly elastic world supply at price $P^w$. A specific tariff $t$ raises the domestic price to $P^w + t$, generating deadweight losses:`}
                </p>
                {`$$\\Delta W = -\\underbrace{(b + d)}_{\\text{Deadweight Loss}} < 0$$`}
                
                <DefinitionBox title="Welfare decomposition">
                  {`The welfare impact of a tariff is decomposed into three domestic groups:
                  - Consumer Surplus change: $\\Delta CS = -(a + b + c + d)$
                  - Producer Surplus change: $\\Delta PS = +a$
                  - Tariff Revenue change: $\\Delta TR = +c$
                  Because there is no terms-of-trade effect, the sum is strictly negative: $\\Delta W = -(b+d) < 0$.`}
                </DefinitionBox>

                <IntuitionBox title="Laffer Curve Trade-off">
                  {`Tariff revenue is zero at both extremes: $t = 0$ (large volume, zero rate) and $t = \\bar{t}$ (high rate, zero imports). In between, it is hump-shaped. Linear imports $M(t) = M_0(1 - t/\\bar{t})$ imply that revenue peaks exactly at $t_{max} = \\bar{t}/2$. Note that the revenue-maximizing tariff is not the welfare-maximizing tariff (which is zero).`}
                </IntuitionBox>
              </div>
            )}

            {activeMathStep === 2 && (
              <div>
                <h3>Large Country Tariff &amp; Terms of Trade (TOT)</h3>
                <p>
                  {`A large country's import tariff shifts world demand, driving down the foreign exporter's price to $P^{t*}$. The domestic price rises by less than the full tariff rate:`}
                </p>
                {`$$\\Delta W = \\underbrace{e}_{\\text{TOT Gain}} - \\underbrace{(b + d)}_{\\text{Deadweight Loss}}$$`}

                <DefinitionBox title="Terms-of-trade gain">
                  {`The portion of tariff revenue extracted directly from foreigners: $e = (P^w - P^{t*})M$. Because the foreign export price falls, a fraction of the domestic tax burden is shifted onto foreign producers, which can net positive welfare gains for small tariffs.`}
                </DefinitionBox>
              </div>
            )}

            {activeMathStep === 3 && (
              <div>
                <h3>Johnson's Optimal Tariff &amp; Quota Equivalence</h3>
                <p>
                  {`Maximizing Home welfare with respect to the tariff wedge yields Johnson's optimal tariff formula:`}
                </p>
                {`$$t_{opt} = \\frac{1}{\\epsilon^*}$$`}
                <p>
                  {`where $\\epsilon^*$ is the price elasticity of the partner's export supply.`}
                </p>

                <DerivationStepper 
                  title="Johnson's Optimal Tariff Formula"
                  steps={[
                    {
                      explanation: "Maximize Home welfare with respect to imports. The domestic price is Pt, and world supply is Pt*.",
                      math: "$$\\Delta W = e - (b + d) = (P^w - P^{t*})M - \\int_{P^w}^{P^t} M^D(P) dP + \\int_{P^w}^{P^{t*}} X^{S*}(P) dP$$"
                    },
                    {
                      explanation: "Differentiate with respect to the import volume M to yield the optimal markup wedge:",
                      math: "$$\\frac{P^t - P^{t*}}{P^{t*}} = \\frac{1}{\\epsilon^*}$$"
                    },
                    {
                      explanation: "This resolves to the inverse-elasticity rule. The optimal tariff is higher when Foreign's export supply is less elastic:",
                      math: "$$t_{opt} = \\frac{1}{\\epsilon^*}$$"
                    }
                  ]}
                />

                <DefinitionBox title="Tariff-quota equivalence and its breakdown">
                  {`Under perfect competition, a tariff t and a quota M = M(t) yield identical prices and quantities. The only difference is rent distribution: the government captures tariff revenue, while license holders capture quota rents. The equivalence breaks down completely if domestic firms possess monopoly market power.`}
                </DefinitionBox>
              </div>
            )}
          </div>

          {/* Tab 5.1 Interactive Controls */}
          {activeMathStep === 1 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Small Country Tariff ($t$):</span>
                    <span className="val-highlight">{tSmall.toFixed(2)}</span>
                  </label>
                  <input 
                    type="range" min="0.0" max="1.5" step="0.05"
                    value={tSmall} onChange={(e) => setTSmall(Number(e.target.value))} 
                    className="range-slider"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Small Country Welfare Decomposition</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 360 200" width="100%" height="100%">
                      {/* Gridlines */}
                      <line x1="40" y1="50" x2="340" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="80" x2="340" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="110" x2="340" y2="110" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="140" x2="340" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      
                      <line x1="100" y1="20" x2="100" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="160" y1="20" x2="160" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="220" y1="20" x2="220" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="280" y1="20" x2="280" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Axes */}
                      <line x1="40" y1="170" x2="340" y2="170" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                      <text x="190" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Quantity</text>
                      <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Price</text>

                      {/* Demand Curve */}
                      <line x1="60" y1="40" x2="320" y2="160" stroke="#ef4444" strokeWidth="3.5" />
                      <text x="310" y="150" fill="#ef4444" style={{ fontSize: '0.8rem', fontWeight: 600 }}>D</text>

                      {/* Supply Curve */}
                      <line x1="60" y1="160" x2="320" y2="40" stroke="#3b82f6" strokeWidth="3.5" />
                      <text x="310" y="50" fill="#3b82f6" style={{ fontSize: '0.8rem', fontWeight: 600 }}>S</text>

                      {/* Price lines */}
                      {/* P^w = 1.5 => y = 110 */}
                      <line x1="40" y1="110" x2="340" y2="110" stroke="var(--text-muted)" strokeDasharray="3 3" />
                      <text x="45" y="105" className="svg-text">P^w</text>

                      {/* P^t = P^w + t */}
                      {(() => {
                        const yPt = 110 - tSmall * 40;
                        const xS_t = 100 + tSmall * 40;
                        const xD_t = 220 - tSmall * 40;
                        
                        return (
                          <>
                            <line x1="40" y1={yPt} x2="340" y2={yPt} stroke="#f59e0b" strokeWidth="1.5" />
                            <text x="45" y={yPt - 5} className="svg-text-bold" fill="#f59e0b">P^w + t</text>

                            {/* Shaded Areas */}
                            {/* Area a: Producer surplus transfer */}
                            <path d={`M 100 110 L 100 ${yPt} L ${100 + tSmall * 40} ${yPt} L 100 110`} fill="rgba(59, 130, 246, 0.15)" />
                            
                            {/* Area b & d: Deadweight Loss */}
                            <rect x={100 + tSmall * 40} y={yPt} width={tSmall * 40} height={110 - yPt} fill="rgba(239, 68, 68, 0.2)" />
                            
                            {/* Area c: Tariff revenue */}
                            <rect x={100 + tSmall * 80} y={yPt} width={Math.max(0, (4 - 4 * tTSmallCheck(tSmall)) * 40)} height={110 - yPt} fill="rgba(16, 185, 129, 0.2)" />

                            {/* Axis markers for quantities */}
                            <line x1={xS_t} y1={yPt} x2={xS_t} y2="170" stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />
                            <line x1={xD_t} y1={yPt} x2={xD_t} y2="170" stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                  <div className="svg-legend">
                    <span><span style={{ color: '#3b82f6' }}>■</span> Area a (PS Gain)</span>
                    <span><span style={{ color: '#ef4444' }}>■</span> Areas b + d (DWL)</span>
                    <span><span style={{ color: '#10b981' }}>■</span> Area c (TR Revenue)</span>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Hump-Shaped Tariff Laffer Curve</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 360 200" width="100%" height="100%">
                      {/* Gridlines */}
                      <line x1="40" y1="50" x2="340" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="85" x2="340" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="120" x2="340" y2="120" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="155" x2="340" y2="155" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      
                      <line x1="90" y1="20" x2="90" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="140" y1="20" x2="140" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="190" y1="20" x2="190" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="240" y1="20" x2="240" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="290" y1="20" x2="290" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Axes */}
                      <line x1="40" y1="170" x2="340" y2="170" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                      <text x="190" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Tariff Rate t</text>
                      <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Revenue TR(t)</text>

                      {/* Hump curve */}
                      <path 
                        d={Array.from({ length: 21 }, (_, idx) => {
                          const t = idx * 0.05;
                          const rev = t * Math.max(0, 4 - 4 * t);
                          const x = 40 + t * 200;
                          const y = 170 - (rev / 1.0) * 140;
                          return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')} 
                        className="svg-curve" 
                        stroke="#10b981" 
                        strokeWidth="3.5"
                      />

                      {/* Prohibitive tariff indicator at t = 1.0 */}
                      <line x1="240" y1="20" x2="240" y2="170" stroke="var(--text-muted)" strokeDasharray="2 2" />
                      <text x="240" y="15" className="svg-text" textAnchor="middle">¯t = 1.0 (Prohibitive)</text>

                      {/* Current marker */}
                      {(() => {
                        const tValClamped = tTSmallCheck(tSmall);
                        const rev = tValClamped * (4 - 4 * tValClamped);
                        const x = 40 + tValClamped * 200;
                        const y = 170 - (rev / 1.0) * 140;
                        return (
                          <>
                            {/* Guide lines to axes */}
                            <line x1={x} y1={y} x2={x} y2="170" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                            <line x1="40" y1={y} x2={x} y2={y} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />

                            <circle cx={x} cy={y} r="6" fill="#f59e0b" className="svg-marker" />
                            <text x={x + 10} y={y - 5} className="svg-text-bold" fill="#f59e0b">TR: {trSmall.toFixed(2)}</text>
                            
                            {/* Dynamic coordinates labels */}
                            <text x={x} y="182" className="svg-text" textAnchor="middle" fill="var(--text-muted)">{tValClamped.toFixed(2)}</text>
                            <text x="35" y={y + 4} className="svg-text" textAnchor="end" fill="var(--text-muted)">{rev.toFixed(2)}</text>
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                  <div className="implications-panel" style={{ margin: 0 }}>
                    <div className="implications-grid">
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{(csLossSmall).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Consumer Loss</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{(psGainSmall).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Producer Gain</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{(trSmall).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Tariff Revenue</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val" style={{ color: 'var(--accent-error)' }}>{(dwlSmall).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Deadweight Loss</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <LessonQuiz title="Lesson 1" questions={quizL1} />
            </>
          )}

          {activeMathStep === 2 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Large Country Tariff ($t$):</span>
                    <span className="val-highlight-purple">{tLarge.toFixed(2)}</span>
                  </label>
                  <input 
                    type="range" min="0.0" max="2.0" step="0.05"
                    value={tLarge} onChange={(e) => setTLarge(Number(e.target.value))} 
                    className="range-slider slider-purple"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card" style={{ gridColumn: 'span 2', maxWidth: '800px', margin: '0 auto 1.5rem auto', width: '100%' }}>
                  <div className="svg-title">🌐 Large-Country General Equilibrium (Home, World, Foreign)</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 720 200" width="100%" height="100%">
                      {/* HOME PANEL (0 to 220) */}
                      <g transform="translate(10, 0)">
                        {/* Gridlines */}
                        <line x1="30" y1="50" x2="200" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="30" y1="95" x2="200" y2="95" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="30" y1="140" x2="200" y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="80" y1="20" x2="80" y2="170" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="140" y1="20" x2="140" y2="170" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />

                        <line x1="30" y1="170" x2="200" y2="170" className="svg-axis" />
                        <line x1="30" y1="20" x2="30" y2="170" className="svg-axis" />
                        <text x="115" y="190" className="svg-text" textAnchor="middle" style={{ fontSize: '0.75rem' }}>Home Quantity</text>
                        <text x="12" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 12 95)" style={{ fontSize: '0.75rem' }}>Price</text>
                        {/* Demand & Supply */}
                        <line x1="40" y1="40" x2="190" y2="150" stroke="#ef4444" strokeWidth="3" />
                        <line x1="40" y1="150" x2="190" y2="40" stroke="#3b82f6" strokeWidth="3" />
                        <text x="180" y="145" fill="#ef4444" style={{ fontSize: '0.7rem' }}>D</text>
                        <text x="180" y="45" fill="#3b82f6" style={{ fontSize: '0.7rem' }}>S</text>
                        
                        {/* Pt and Pw */}
                        <line x1="30" y1="95" x2="200" y2="95" stroke="var(--text-muted)" strokeDasharray="2 2" />
                        <line x1="30" y1={95 - tLargeLim * 20} x2="200" y2={95 - tLargeLim * 20} stroke="#f59e0b" strokeWidth="1.5" />
                        <text x="35" y={90 - tLargeLim * 20} className="svg-text" fill="#f59e0b" style={{ fontSize: '0.7rem' }}>P^t</text>
                      </g>

                      {/* WORLD PANEL (240 to 460) */}
                      <g transform="translate(250, 0)">
                        {/* Gridlines */}
                        <line x1="30" y1="50" x2="200" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="30" y1="95" x2="200" y2="95" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="30" y1="140" x2="200" y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="80" y1="20" x2="80" y2="170" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="140" y1="20" x2="140" y2="170" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />

                        <line x1="30" y1="170" x2="200" y2="170" className="svg-axis" />
                        <line x1="30" y1="20" x2="30" y2="170" className="svg-axis" />
                        <text x="115" y="190" className="svg-text" textAnchor="middle" style={{ fontSize: '0.75rem' }}>World Trade Volume</text>
                        
                        {/* MD & XS* curves */}
                        <line x1="40" y1="30" x2="190" y2="160" stroke="#ef4444" strokeWidth="3" />
                        <line x1="40" y1="160" x2="190" y2="30" stroke="#10b981" strokeWidth="3" />
                        
                        {/* Shaded TOT Gain (Rectangle e) */}
                        {(() => {
                          const yPt = 95 - tLargeLim * 20;
                          const yPft = 95;
                          const yPfor = 95 + tLargeLim * 20;
                          const xM = 30 + mTradeLarge * 45;
                          
                          return (
                            <>
                              {/* Terms of trade gain rectangle e */}
                              <rect x="30" y={yPft} width={mTradeLarge * 45} height={yPfor - yPft} fill="rgba(124, 58, 237, 0.15)" />
                              
                              {/* Price Wedge indicators */}
                              <line x1="30" y1={yPt} x2={xM} y2={yPt} stroke="#f59e0b" strokeWidth="1.5" />
                              <line x1="30" y1={yPfor} x2={xM} y2={yPfor} stroke="#a78bfa" strokeWidth="1.5" />
                              <line x1="30" y1={yPft} x2="200" y2={yPft} stroke="var(--text-muted)" strokeDasharray="3 3" />

                              {/* Vertical guide line from active trade volume */}
                              <line x1={xM} y1={yPt} x2={xM} y2="170" stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />
                              
                              <circle cx={xM} cy={yPt} r="5" fill="#f59e0b" />
                              <circle cx={xM} cy={yPfor} r="5" fill="#a78bfa" />
                            </>
                          );
                        })()}
                      </g>

                      {/* FOREIGN PANEL (480 to 700) */}
                      <g transform="translate(490, 0)">
                        {/* Gridlines */}
                        <line x1="30" y1="50" x2="200" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="30" y1="95" x2="200" y2="95" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="30" y1="140" x2="200" y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="80" y1="20" x2="80" y2="170" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="140" y1="20" x2="140" y2="170" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />

                        <line x1="30" y1="170" x2="200" y2="170" className="svg-axis" />
                        <line x1="30" y1="20" x2="30" y2="170" className="svg-axis" />
                        <text x="115" y="190" className="svg-text" textAnchor="middle" style={{ fontSize: '0.75rem' }}>Foreign Quantity</text>
                        
                        {/* D* & S* */}
                        <line x1="40" y1="140" x2="190" y2="30" stroke="#ef4444" strokeWidth="3" />
                        <line x1="40" y1="30" x2="190" y2="140" stroke="#3b82f6" strokeWidth="3" />
                        
                        {/* Pw and Pt* */}
                        <line x1="30" y1="95" x2="200" y2="95" stroke="var(--text-muted)" strokeDasharray="2 2" />
                        <line x1="30" y1={95 + tLargeLim * 20} x2="200" y2={95 + tLargeLim * 20} stroke="#a78bfa" strokeWidth="1.5" />
                        <text x="35" y={90 + tLargeLim * 20} className="svg-text" fill="#a78bfa" style={{ fontSize: '0.7rem' }}>P_t^*</text>
                      </g>
                    </svg>
                  </div>
                  <div className="implications-panel" style={{ margin: 0 }}>
                    <div className="implications-grid">
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{(pDomesticLarge).toFixed(3)}</div>
                        <div className="implication-stat-lbl">Home Price (P^t)</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val purple-text">{(pForeignLarge).toFixed(3)}</div>
                        <div className="implication-stat-lbl">Foreign Price (P^t*)</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{(totGainLarge).toFixed(3)}</div>
                        <div className="implication-stat-lbl">TOT Gain (Area e)</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val" style={{ color: 'var(--accent-error)' }}>{(dwlLarge).toFixed(3)}</div>
                        <div className="implication-stat-lbl">Home DWL (b + d)</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val" style={{ color: welfareLarge >= 0 ? 'var(--accent-success)' : 'var(--accent-error)' }}>
                          {(welfareLarge).toFixed(3)}
                        </div>
                        <div className="implication-stat-lbl">Net Welfare change</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <LessonQuiz title="Lesson 2" questions={quizL2} />
            </>
          )}

          {activeMathStep === 3 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Import Quota Volume ($M$):</span>
                    <span className="val-highlight-orange">{quotaVal.toFixed(1)}</span>
                  </label>
                  <input 
                    type="range" min="0.5" max="3.5" step="0.1"
                    value={quotaVal} onChange={(e) => setQuotaVal(Number(e.target.value))} 
                    className="range-slider slider-orange"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Import Quotas and Quota Rents</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 450 200" width="100%" height="100%">
                      {/* Gridlines */}
                      <line x1="40" y1="50" x2="410" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="85" x2="410" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="120" x2="410" y2="120" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="155" x2="410" y2="155" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      <line x1="120" y1="20" x2="120" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="200" y1="20" x2="200" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="280" y1="20" x2="280" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="360" y1="20" x2="360" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Axes */}
                      <line x1="40" y1="170" x2="410" y2="170" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                      <text x="225" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Quantity</text>
                      <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Price</text>

                      {/* Demand MD */}
                      <line x1="60" y1="30" x2="380" y2="160" stroke="#ef4444" strokeWidth="3.5" />
                      <text x="370" y="150" fill="#ef4444">MD</text>

                      {/* Supply XS* */}
                      <line x1="60" y1="160" x2="380" y2="30" stroke="#10b981" strokeWidth="3.5" />
                      <text x="370" y="45" fill="#10b981">XS*</text>

                      {/* Quota volume lines */}
                      {(() => {
                        const xQuota = 40 + quotaVal * 80;
                        const yDom = 170 - (pQuotaDom / 4.0) * 140;
                        const yFor = 170 - (pQuotaFor / 4.0) * 140;
                        
                        return (
                          <>
                            {/* Vertical Quota line */}
                            <line x1={xQuota} y1="20" x2={xQuota} y2="170" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 3" />
                            <text x={xQuota + 8} y="30" fill="#f59e0b" className="svg-text-bold">Quota M</text>

                            {/* Shaded Rent area */}
                            <rect x="40" y={yDom} width={quotaVal * 80} height={yFor - yDom} fill="rgba(245, 158, 11, 0.15)" />

                            {/* Domestic price horizontal */}
                            <line x1="40" y1={yDom} x2={xQuota} y2={yDom} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
                            <text x="45" y={yDom - 5} className="svg-text" fill="#ef4444">P_M</text>

                            {/* Foreign supply price horizontal */}
                            <line x1="40" y1={yFor} x2={xQuota} y2={yFor} stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />
                            <text x="45" y={yFor + 12} className="svg-text" fill="#10b981">P_M^*</text>

                            {/* Intersection points */}
                            <circle cx={xQuota} cy={yDom} r="5" fill="#ef4444" />
                            <circle cx={xQuota} cy={yFor} r="5" fill="#10b981" />
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <div className="implications-grid">
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{(pQuotaDom).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Domestic Price (P_M)</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val purple-text">{(pQuotaFor).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Foreign Price (P_M*)</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val orange-text">{(quotaRent).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Quota Rents</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <LessonQuiz title="Lesson 3" questions={quizL3} />
            </>
          )}

          <div className="stepper-nav-footer">
            <button className="quiz-btn quiz-btn-secondary" onClick={() => setActiveMathStep((prev) => Math.max(1, prev - 1))} disabled={activeMathStep === 1}>
              ← Back
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Step {activeMathStep} of 3</span>
            <button className="quiz-btn quiz-btn-primary" onClick={() => setActiveMathStep((prev) => Math.min(3, prev + 1))} disabled={activeMathStep === 3}>
              Next Step →
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5.2: DOMESTIC MARKET POWER & THE SECOND BEST */}
      {/* ======================================================== */}
      {moduleTab === "5.2 — Domestic Market Power & the Second Best" && (
        <div className="lesson-step-content">
          <div className="stepper-section-title">
            5.2 — Domestic Market Power &amp; the Second Best
          </div>

          <div className="stepper-header">
            <button className={`step-indicator-btn ${activeMathStep === 1 ? 'active' : ''}`} onClick={() => setActiveMathStep(1)}>
              <span className="step-num-badge">1</span> Step 1: Monopoly protected by a Tariff
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 2 ? 'active' : ''}`} onClick={() => setActiveMathStep(2)}>
              <span className="step-num-badge">2</span> Step 2: Tariff vs. Quota under Monopoly
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 3 ? 'active' : ''}`} onClick={() => setActiveMathStep(3)}>
              <span className="step-num-badge">3</span> Step 3: Game Theory Toolkit
            </button>
          </div>

          <div className="stepper-card-body">
            {activeMathStep === 1 && (
              <div>
                <h3>Free Trade Disciplines the Monopolist</h3>
                <p>
                  {`Under free trade, a domestic monopolist cannot price above the world price $P^w$ without losing the entire market. Import competition forces it to act as a price-taker:`}
                </p>
                {`$$P = P^w, \\quad MC(Q) = P^w$$`}
                
                <DefinitionBox title="Free trade as a regulatory device">
                  {`In neoclassical trade, free trade is the first-best policy. When a domestic industry has monopoly market power, free trade acts as an direct regulator: the threat of infinite imports at P^w removes all market power, eliminating the monopoly deadweight loss completely.`}
                </DefinitionBox>

                <IntuitionBox title="A tariff vs. prohibitive tariff under monopoly">
                  {`A tariff $t$ raises the price ceiling to $P^w + t$. The monopolist expands output along its marginal cost curve. However, if the tariff is prohibitive ($t > P^m - P^w$), the monopolist is unconstrained and sets $MR = MC$, reintroducing monopoly distortions.`}
                </IntuitionBox>
              </div>
            )}

            {activeMathStep === 2 && (
              <div>
                <h3>Tariff vs. Quota under Domestic Monopoly</h3>
                <p>
                  {`A quota is strictly worse than a tariff under domestic monopoly. While a tariff preserves competitive price-taking behavior at the ceiling $P^w + t$, a quota converts import supply into a fixed volume $M$, leaving the monopolist to optimize along residual demand:`}
                </p>
                {`$$D_q(P) = D(P) - M$$`}

                <DefinitionBox title="The breakdown of tariff-quota equivalence">
                  {`Under monopoly, a tariff and a quota that restrict imports to the same volume are no longer equivalent. The quota hands the monopolist full pricing power over residual consumers, raising domestic prices and restoring monopoly deadweight losses.`}
                </DefinitionBox>
              </div>
            )}

            {activeMathStep === 3 && (
              <div>
                <h3>The Game-Theory Toolkit &amp; Comparative Statics</h3>
                <p>
                  {`Two players optimize payoffs $\\pi_i(a_1, a_2; \\theta_i)$. Stability and comparative statics are solved via Cramer's rule:`}
                </p>

                <DerivationStepper 
                  title="Cramer's Rule for Strategic Feedback"
                  steps={[
                    {
                      explanation: "Totally differentiate both players' FOCs with respect to parameter shock dθ2:",
                      math: "$$\\pi_{a_1 a_1} da_1 + \\pi_{a_1 a_2} da_2 = 0$$ $$\\pi_{a_2 a_1} da_1 + \\pi_{a_2 a_2} da_2 + \\pi_{a_2 \\theta_2} d\\theta_2 = 0$$"
                    },
                    {
                      explanation: "Express the differentiated system in matrix form:",
                      math: "$$\\begin{bmatrix} \\pi_{a_1 a_1} & \\pi_{a_1 a_2} \\\\ \\pi_{a_2 a_1} & \\pi_{a_2 a_2} \\end{bmatrix} \\begin{bmatrix} da_1 \\\\ da_2 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ -\\pi_{a_2 \\theta_2} d\\theta_2 \\end{bmatrix}$$"
                    },
                    {
                      explanation: "Solve using Cramer's rule, accounting for the system determinant Δ = π_a1a1*π_a2a2 - π_a1a2*π_a2a1:",
                      math: "$$\\frac{da_1}{d\\theta_2} = \\frac{-\\pi_{a_1 a_2} \\pi_{a_2 \\theta_2}}{\\Delta}, \\quad \\frac{da_2}{d\\theta_2} = \\frac{\\pi_{a_1 a_1} \\pi_{a_2 \\theta_2}}{\\Delta}$$"
                    }
                  ]}
                />

                <DefinitionBox title="First-Order and Second-Order Nash Conditions">
                  {`For an equilibrium a^N:
                  - FOC: $\\pi_{i,a_i} = 0$ (players optimize own action)
                  - SOC: $\\pi_{i,a_ia_i} < 0$ (concavity)
                  - Stability: $\\Delta \\equiv \\pi_{1,a_1a_1}\\pi_{2,a_2a_2} - \\pi_{1,a_1a_2}\\pi_{2,a_2a_1} > 0$`}
                </DefinitionBox>

                <DefinitionBox title="Strategic complements versus substitutes">
                  {`- Strategic substitutes (reaction curve slopes down): $\\pi_{i,a_i a_j} < 0$. An aggressive action by a rival lowers own marginal payoff, inducing retreat.
                  - Strategic complements (reaction curve slopes up): $\\pi_{i,a_i a_j} > 0$. Rival aggression triggers aggressive matching.`}
                </DefinitionBox>

                <DefinitionBox title="The envelope theorem">
                  {`At the Nash equilibrium, the direct effect of a player's own choice on their payoff is zero by the first-order condition ($d\\pi_i/da_i = 0$). Therefore, parameter shocks only affect the payoff through the rival's response:
                  $$d\\pi_{1}^N/d\\theta_2 = \\pi_{1,a_2} (da_2^N/d\\theta_2)$$.`}
                </DefinitionBox>
              </div>
            )}
          </div>

          {/* Tab 5.2 Interactive Controls */}
          {activeMathStep === 1 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Monopoly Tariff ($t$):</span>
                    <span className="val-highlight">{tMon.toFixed(2)}</span>
                  </label>
                  <input 
                    type="range" min="0.0" max="3.0" step="0.1"
                    value={tMon} onChange={(e) => setTMon(Number(e.target.value))} 
                    className="range-slider"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Domestic Monopoly &amp; Price Ceiling Regulations</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 450 200" width="100%" height="100%">
                      {/* Gridlines */}
                      <line x1="40" y1="50" x2="410" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="100" x2="410" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="150" x2="410" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      <line x1="100" y1="20" x2="100" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="160" y1="20" x2="160" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="220" y1="20" x2="220" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="280" y1="20" x2="280" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="340" y1="20" x2="340" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Axes */}
                      <line x1="40" y1="170" x2="410" y2="170" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                      <text x="225" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Quantity Q</text>
                      <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Price</text>

                      {/* Demand D */}
                      <line x1="60" y1="30" x2="380" y2="160" stroke="#ef4444" strokeWidth="3.5" />
                      <text x="370" y="150" fill="#ef4444">Demand D</text>

                      {/* MR */}
                      <line x1="60" y1="30" x2="220" y2="160" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
                      <text x="210" y="150" fill="#ef4444" style={{ opacity: 0.75 }}>MR</text>

                      {/* MC */}
                      <line x1="60" y1="150" x2="380" y2="60" stroke="#3b82f6" strokeWidth="3.5" />
                      <text x="370" y="70" fill="#3b82f6">MC</text>

                      {/* P^w = 2.0 => y = 100 */}
                      <line x1="40" y1="100" x2="410" y2="100" stroke="var(--text-muted)" strokeDasharray="3 3" />
                      <text x="45" y="95" className="svg-text">P^w</text>

                      {/* P^w + t */}
                      {(() => {
                        const yPt = 100 - tMonProh * 20;
                        const xDom = 40 + qDomesticMon * 60;
                        const xDem = 40 + qDemandMon * 60;
                        
                        return (
                          <>
                            {/* Guide lines to axes */}
                            <line x1={xDom} y1={yPt} x2={xDom} y2="170" stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />
                            <line x1="40" y1={yPt} x2={xDom} y2={yPt} stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />

                            <line x1="40" y1={yPt} x2="410" y2={yPt} stroke="#f59e0b" strokeWidth="2.5" />
                            <text x="45" y={yPt - 5} className="svg-text-bold" fill="#f59e0b">P^w + t</text>

                            {/* Domestic output marker */}
                            <circle cx={xDom} cy={yPt} r="5" fill="#3b82f6" />
                            
                            {/* Imports segment */}
                            {xDem > xDom && (
                              <line x1={xDom} y1={yPt} x2={xDem} y2={yPt} stroke="#10b981" strokeWidth="4" />
                            )}
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <div className="implications-grid">
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{(qDomesticMon).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Monopolist Output</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{(qDemandMon).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Domestic Demand</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val" style={{ color: 'var(--accent-success)' }}>{(mImportsMon).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Imports</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <LessonQuiz title="Lesson 4" questions={quizL4} />
            </>
          )}

          {activeMathStep === 2 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Import Quota ($M$):</span>
                    <span className="val-highlight-orange">{quotaMon.toFixed(1)}</span>
                  </label>
                  <input 
                    type="range" min="0.5" max="3.5" step="0.1"
                    value={quotaMon} onChange={(e) => setQuotaMon(Number(e.target.value))} 
                    className="range-slider slider-orange"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Quota Residual Demand Exploitation under Monopoly</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 450 200" width="100%" height="100%">
                      {/* Gridlines */}
                      <line x1="40" y1="50" x2="410" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="85" x2="410" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="120" x2="410" y2="120" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="155" x2="410" y2="155" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      <line x1="100" y1="20" x2="100" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="160" y1="20" x2="160" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="220" y1="20" x2="220" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="280" y1="20" x2="280" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="340" y1="20" x2="340" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Axes */}
                      <line x1="40" y1="170" x2="410" y2="170" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                      <text x="225" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Quantity</text>
                      <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Price</text>

                      {/* Demand D */}
                      <line x1="60" y1="30" x2="380" y2="160" stroke="#ef4444" strokeWidth="1.5" style={{ opacity: 0.4 }} />
                      <text x="370" y="150" fill="#ef4444" style={{ opacity: 0.4 }}>Demand D</text>

                      {/* Residual Demand D_q = D - M */}
                      {(() => {
                        const shiftX = quotaMon * 30;
                        const xStart = 60 + shiftX;
                        const xEnd = 380;
                        
                        const yQuota = 170 - (pQuotaMonPrice / 4.0) * 140;
                        const xQ = 40 + qQuotaMon * 60;
                        
                        return (
                          <>
                            {/* Dq */}
                            <line x1={xStart} y1="30" x2={xEnd} y2="140" stroke="#ef4444" strokeWidth="2.5" />
                            <text x="360" y="130" fill="#ef4444" style={{ fontWeight: 600 }}>D_q = D - M</text>

                            {/* MC */}
                            <line x1="60" y1="150" x2="380" y2="60" stroke="#3b82f6" strokeWidth="2" />
                            
                            {/* MRq */}
                            <line x1={xStart} y1="30" x2="220 + shiftX/2" y2="170" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                            
                            {/* Monopolist Choice */}
                            <circle cx={xQ} cy={yQuota} r="6" fill="#f59e0b" />
                            <line x1={xQ} y1={yQuota} x2="40" y2={yQuota} stroke="#f59e0b" strokeDasharray="2 2" />
                            <text x="45" y={yQuota - 5} fill="#f59e0b" className="svg-text-bold">P_q</text>
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <div className="implications-grid">
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{(qQuotaMon).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Domestic Output (Q_q)</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val orange-text">{(pQuotaMonPrice).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Domestic Price (P_q)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <LessonQuiz title="Lesson 4 (continued)" questions={quizL4} />
            </>
          )}

          {activeMathStep === 3 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Cross-action response ($\\pi_{12}$):</span>
                    <span className="val-highlight">{gtSlope.toFixed(2)}</span>
                  </label>
                  <input 
                    type="range" min="-0.8" max="0.8" step="0.1"
                    value={gtSlope} onChange={(e) => setGtSlope(Number(e.target.value))} 
                    className="range-slider"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Best Response Slopes: Strategic Substitutes vs. Complements</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 450 200" width="100%" height="100%">
                      {/* Axes */}
                      <line x1="40" y1="170" x2="410" y2="170" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                      <text x="225" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Rival Action a2</text>
                      <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Own Action a1</text>

                      {/* Best response 1 */}
                      {(() => {
                        const yStart = 95 - gtSlope * 60;
                        const yEnd = 95 + gtSlope * 60;
                        return (
                          <>
                            <line x1="100" y1={yStart} x2="340" y2={yEnd} stroke="var(--accent-primary)" strokeWidth="3" />
                            <text x="330" y={yEnd - 10} fill="var(--accent-primary)" className="svg-text-bold">BR1</text>
                          </>
                        );
                      })()}

                      {/* Reference horizontal */}
                      <line x1="40" y1="95" x2="410" y2="95" stroke="var(--text-muted)" strokeDasharray="3 3" />
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                      {gtSlope < 0 
                        ? "Strategic Substitutes: A higher action by the rival causes the player to retreat (BR curve slopes downward)."
                        : gtSlope > 0
                          ? "Strategic Complements: A higher action by the rival induces matching aggression (BR curve slopes upward)."
                          : "Strategic Independence: Best response is completely flat."}
                    </p>
                  </div>
                </div>
              </div>

              <LessonQuiz title="Lesson 5" questions={quizL5} />
            </>
          )}

          <div className="stepper-nav-footer">
            <button className="quiz-btn quiz-btn-secondary" onClick={() => setActiveMathStep((prev) => Math.max(1, prev - 1))} disabled={activeMathStep === 1}>
              ← Back
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Step {activeMathStep} of 3</span>
            <button className="quiz-btn quiz-btn-primary" onClick={() => setActiveMathStep((prev) => Math.min(3, prev + 1))} disabled={activeMathStep === 3}>
              Next Step →
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5.3: COURNOT DUOPOLY MODEL OF STRATEGIC TRADE POLICY */}
      {/* ======================================================== */}
      {moduleTab === "5.3 — Cournot Duopoly Model of Strategic Trade Policy" && (
        <div className="lesson-step-content">
          <div className="stepper-section-title">
            5.3 — Cournot Duopoly Model of Strategic Trade Policy
          </div>

          <div className="stepper-header">
            <button className={`step-indicator-btn ${activeMathStep === 1 ? 'active' : ''}`} onClick={() => setActiveMathStep(1)}>
              <span className="step-num-badge">1</span> Step 1: Duopoly Model &amp; Cost statics
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 2 ? 'active' : ''}`} onClick={() => setActiveMathStep(2)}>
              <span className="step-num-badge">2</span> Step 2: Individual &amp; Joint Profits
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 3 ? 'active' : ''}`} onClick={() => setActiveMathStep(3)}>
              <span className="step-num-badge">3</span> Step 3: Welfare &amp; Marginal Tariff
            </button>
          </div>

          <div className="stepper-card-body">
            {activeMathStep === 1 && (
              <div>
                <h3>Cournot Duopoly Model of Trade</h3>
                <p>
                  {`Two firms serve the domestic market: Home firm 1 (marginal cost $c_1$) and Foreign firm 2 ($c_2$). inverse demand is $P(X) = a - bX$ where $X = X_1 + X_2$:`}
                </p>
                {`$$\\pi_1 = P(X)X_1 - c_1X_1, \\quad \\pi_2 = P(X)X_2 - c_2X_2$$`}

                <DefinitionBox title="Cournot Duopoly FOCs and SOCs">
                  {`The first- and second-order conditions for Cournot duopoly quantity choices satisfy:
                  - FOC: $\\pi_{i,X_i} = P + P'X_i - c_i = 0$
                  - SOC: $\\pi_{i,X_iX_i} = 2P' + P''X_i < 0$
                  - Cross-partial: $\\pi_{i,X_iX_j} = P' + P''X_i < 0$ (quantities are strategic substitutes).
                  Nash stability and uniqueness requires $\\Delta \\equiv \\pi_{1,X_1X_1}\\pi_{2,X_2X_2} - \\pi_{1,X_1X_2}\\pi_{2,X_2X_1} > 0$.`}
                </DefinitionBox>

                <DefinitionBox title="Comparative statics with respect to the rival's cost">
                  {`Applying Cramer's rule to the differentiated FOC system yields cost pass-through effects:
                  $$\\frac{dX_1}{dc_2} = -\\frac{\\pi_{1,X_1X_2}}{\\Delta} = -\\frac{P' + P''X_1}{\\Delta} > 0$$
                  $$\\frac{dX_2}{dc_2} = \\frac{\\pi_{1,X_1X_1}}{\\Delta} = \\frac{2P' + P''X_1}{\\Delta} < 0$$
                  $$\\frac{dX}{dc_2} = \\frac{P'}{\\Delta} < 0$$
                  A marginal cost shock to the foreign firm contracts foreign output, expands domestic output, and shrinks total output (raising domestic price).`}
                </DefinitionBox>

                <IntuitionBox title="Effects on profits">
                  {`Applying the envelope theorem, the effect of a competitor's cost shock on own profit operates solely through rival output changes:
                  $$\\frac{d\\pi_1}{dc_2} = \\pi_{1,X_2}\\frac{dX_2}{dc_2} = P'X_1 \\frac{dX_2}{dc_2} > 0$$
                  $$\\frac{d\\pi_2}{dc_2} = \\pi_{2,X_1}\\frac{dX_1}{dc_2} + \\pi_{2,c_2} = P'X_2 \\frac{dX_1}{dc_2} - X_2 < 0$$
                  So own profit always increases when the rival suffers a cost increase.`}
                </IntuitionBox>

                <DefinitionBox title="The symmetric benchmark">
                  {`At cost symmetry ($c_2 = c_1$), the derivative of joint profits with respect to a cost wedge is negative:
                  $$\\frac{d(\\pi_1 + \\pi_2)}{dc_2}\\Big|_{c_2=c_1} = X \\left[ \\frac{(P')^2}{\\Delta} - 1 \\right] < 0$$
                  Starting from cost symmetry, a small unilateral cost increase for the foreign rival reduces joint industry profits.`}
                </DefinitionBox>
              </div>
            )}

            {activeMathStep === 2 && (
              <div>
                <h3>The U-Shaped Joint Profit Curve</h3>
                <p>
                  {`Widening cost differences affect profits. While Home profit rises and Foreign profit falls, the sum of industry profits behaves non-monotonically:`}
                </p>
                {`$$\\text{Joint Profit } \\Pi = \\pi_1 + \\pi_2$$`}

                <DefinitionBox title="Business-stealing versus coordination efficiency">
                  {`- Near cost symmetry ($c_2 \\approx c_1$), business-stealing competition is intense, dissipating joint rents.
                  - As cost asymmetry increases ($c_2 > c_1$), the low-cost home firm dominates the market, capturing high margins and driving joint profit back up.
                  - Once the foreign rival exits, joint profit flattens at the domestic monopoly level.`}
                </DefinitionBox>
              </div>
            )}

            {activeMathStep === 3 && (
              <div>
                <h3>National Welfare &amp; The Marginal Tariff</h3>
                <p>
                  {`In a quasilinear framework, Home welfare is $U = u(X) - PX + \\pi_1 + t X_2$. Differentiating at free trade ($t = 0$):`}
                </p>
                {`$$dU|_{t=0} = -X_2 dt < 0$$`}

                <DerivationStepper 
                  title="Welfare Change of a Marginal Tariff"
                  steps={[
                    {
                      explanation: "Express national welfare in the domestic market, counting CS, Home firm profit, and tariff revenue:",
                      math: "$$U = u(X) - P(X)X + (P(X) - c_1)X_1 + t X_2$$"
                    },
                    {
                      explanation: "Differentiate with respect to the tariff t (using c2 = c1 + t and the envelope theorem):",
                      math: "$$dU = (P - c_1)dX_1 + (P - c_2)dX_2 - X_2 dt$$"
                    },
                    {
                      explanation: "Evaluate at free trade (t = 0, where P - c2 = P - c1). Under Cournot, P - c1 = X1 P'. Hence:",
                      math: "$$dU|_{t=0} = X_1 P' dX - X_2 dt = -X_2 dt < 0$$"
                    }
                  ]}
                />

                <DefinitionBox title="Result: sign of the marginal tariff">
                  {`Starting from free trade, a marginal tariff in a symmetric Cournot duopoly reduces welfare. The profit-shifting gain is a second-order envelope effect, whereas the consumption distortion is first-order. Active profit-shifting requires a strictly positive (large) optimal tariff.`}
                </DefinitionBox>

                <DefinitionBox title="Quasilinear national welfare">
                  {`Using quasilinear utility $U = u(X) + Z$ with budget constraint $PX + Z = wL + \\pi_1 + \\pi_2 + TR$, welfare equals consumer surplus plus total domestic firm profits plus labor income and tariff revenue: $U = CS + \\Pi + TR + wL$. The Cournot markup introduces a pre-existing deadweight loss.`}
                </DefinitionBox>

                <DefinitionBox title="Reciprocal dumping: the two-country extension">
                  {`Two-way trade in the same homogeneous good, driven by Cournot rivalry across segmented national markets. Each firm dumps its product in the other's market, absorbing transport costs. Welfare in each country includes export profits: $U = CS + \\pi_{domestic} + \\pi_{exports} + wL$.`}
                </DefinitionBox>
              </div>
            )}
          </div>

          {/* Tab 5.3 Interactive Controls */}
          {activeMathStep === 1 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Foreign cost ($c_2$):</span>
                    <span className="val-highlight-purple">{c2.toFixed(2)}</span>
                  </label>
                  <input 
                    type="range" min="1.0" max="4.0" step="0.1"
                    value={c2} onChange={(e) => setC2(Number(e.target.value))} 
                    className="range-slider slider-purple"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Cournot Reaction Curves and Cost Shocks</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 450 200" width="100%" height="100%">
                      {/* Gridlines */}
                      <line x1="40" y1="50" x2="410" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="95" x2="410" y2="95" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="140" x2="410" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      <line x1="100" y1="20" x2="100" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="180" y1="20" x2="180" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="260" y1="20" x2="260" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="340" y1="20" x2="340" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Axes */}
                      <line x1="40" y1="170" x2="410" y2="170" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                      <text x="225" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Foreign Output X2</text>
                      <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Home Output X1</text>

                      {/* Home reaction: X1 = (10 - c1 - X2)/2 => X1 = (8 - X2)/2 */}
                      <line x1="40" y1="130" x2="280" y2="170" stroke="var(--accent-primary)" strokeWidth="3.5" />
                      <text x="270" y="160" fill="var(--accent-primary)">BR1</text>

                      {/* Foreign reaction: X2 = (10 - c2Eff - X1)/2 */}
                      {(() => {
                        const interceptX2 = (10 - c2Eff) * 20; // scale
                        const yStart = 170 - interceptX2;
                        const xEnd = 40 + interceptX2 * 2;
                        
                        const xN = 40 + x2Cour * 45;
                        const yN = 170 - x1Cour * 45;
                        
                        return (
                          <>
                            <line x1="40" y1={yStart} x2={xEnd} y2="170" stroke="var(--accent-secondary)" strokeWidth="3.5" strokeDasharray="1" />
                            <text x="40" y={yStart - 10} fill="var(--accent-secondary)">BR2 (c2)</text>

                            {/* Coordinate guide lines */}
                            <line x1={xN} y1={yN} x2={xN} y2="170" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                            <line x1="40" y1={yN} x2={xN} y2={yN} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />

                            {/* Equilibrium */}
                            <circle cx={xN} cy={yN} r="6" fill="#f59e0b" />
                            <text x={xN + 8} y={yN - 16} className="svg-text-bold" fill="#f59e0b">
                              Nash ({x2Cour.toFixed(2)}, {x1Cour.toFixed(2)})
                            </text>
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <div className="implications-grid">
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{(x1Cour).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Home Output (X1)</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val purple-text">{(x2Cour).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Foreign Output (X2)</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{(pCour).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Market Price (P)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <LessonQuiz title="Lesson 6" questions={quizL6} />
            </>
          )}

          {activeMathStep === 2 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Foreign cost ($c_2$):</span>
                    <span className="val-highlight-purple">{c2.toFixed(2)}</span>
                  </label>
                  <input 
                    type="range" min="1.0" max="4.0" step="0.1"
                    value={c2} onChange={(e) => setC2(Number(e.target.value))} 
                    className="range-slider slider-purple"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 The U-Shaped Joint Profit Curve (π1 + π2)</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 450 200" width="100%" height="100%">
                      {/* Gridlines */}
                      <line x1="40" y1="50" x2="410" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="95" x2="410" y2="95" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="140" x2="410" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      <line x1="110" y1="20" x2="110" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="180" y1="20" x2="180" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="250" y1="20" x2="250" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="320" y1="20" x2="320" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="390" y1="20" x2="390" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Axes */}
                      <line x1="40" y1="170" x2="410" y2="170" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                      <text x="225" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Foreign Cost c2</text>
                      <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Joint Profit Π</text>

                      {/* U-Shape Curve (Zoomed in on range 12.0 to 19.5) */}
                      <path 
                        d={jointProfitsForCurve.map((prof, idx) => {
                          const c = 0.5 + idx * 0.1;
                          const x = 40 + (c / 5.0) * 350;
                          const y = 170 - ((prof - 12.0) / 7.5) * 140;
                          return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')} 
                        className="svg-curve" 
                        stroke="#7c3aed" 
                        strokeWidth="3.5"
                      />

                      {/* Symmetry line at c2 = c1 = 2.0 */}
                      <line x1={40 + (2.0/5.0)*350} y1="20" x2={40 + (2.0/5.0)*350} y2="170" stroke="var(--text-muted)" strokeDasharray="3 3" />
                      <text x={40 + (2.0/5.0)*350} y="15" className="svg-text" textAnchor="middle">c2 = c1 = 2.0 (Symmetry)</text>

                      {/* Current location marker */}
                      {(() => {
                        const xMarker = 40 + (c2Eff / 5.0) * 350;
                        const yMarker = 170 - ((jointProfitCour - 12.0) / 7.5) * 140;
                        return (
                          <>
                            {/* Guide lines to axes */}
                            <line x1={xMarker} y1={yMarker} x2={xMarker} y2="170" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                            <line x1="40" y1={yMarker} x2={xMarker} y2={yMarker} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />

                            <circle cx={xMarker} cy={yMarker} r="6" fill="#f59e0b" className="svg-marker" />
                            <text x={xMarker} y={yMarker - 10} className="svg-text-bold" fill="#f59e0b" textAnchor="middle">
                              {jointProfitCour.toFixed(2)}
                            </text>
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <div className="implications-grid">
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{(profit1Cour).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Home Profit (π1)</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val purple-text">{(profit2Cour).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Foreign Profit (π2)</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val orange-text">{(jointProfitCour).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Joint Profit (Π)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeMathStep === 3 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Home Tariff ($t$):</span>
                    <span className="val-highlight">{tCour.toFixed(2)}</span>
                  </label>
                  <input 
                    type="range" min="0.0" max="1.5" step="0.05"
                    value={tCour} onChange={(e) => setTCour(Number(e.target.value))} 
                    className="range-slider"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Duopoly Pre-existing Distortion &amp; Deadweight Losses</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 450 200" width="100%" height="100%">
                      {/* Axes */}
                      <line x1="40" y1="170" x2="410" y2="170" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                      <text x="225" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Total Output X</text>
                      <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Price P</text>

                      {/* Demand P = 10 - X */}
                      <line x1="60" y1="30" x2="380" y2="160" stroke="#ef4444" strokeWidth="2.5" />
                      <text x="370" y="150" fill="#ef4444">Demand P</text>

                      {/* Marginal cost baseline c1 = 2.0 => y = 120 */}
                      <line x1="40" y1="120" x2="410" y2="120" stroke="var(--text-muted)" strokeDasharray="3 3" />
                      <text x="45" y="115" className="svg-text">MC baseline</text>

                      {/* Equilibrium location */}
                      {(() => {
                        const xEq = 40 + xTotalCour * 40;
                        const yEq = 170 - (pCour / 10.0) * 140;
                        return (
                          <>
                            <circle cx={xEq} cy={yEq} r="6" fill="#f59e0b" />
                            <line x1={xEq} y1={yEq} x2={xEq} y2="170" stroke="#f59e0b" strokeDasharray="2 2" />
                            <text x={xEq} y={yEq - 10} className="svg-text-bold" fill="#f59e0b" textAnchor="middle">P_Cournot</text>
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                      {`Under duopoly, market power restricts output, driving price above marginal cost. A tariff raises this price further, worsening the consumption distortion.`}
                    </p>
                  </div>
                </div>
              </div>

              <LessonQuiz title="Lesson 7" questions={quizL7} />
            </>
          )}

          <div className="stepper-nav-footer">
            <button className="quiz-btn quiz-btn-secondary" onClick={() => setActiveMathStep((prev) => Math.max(1, prev - 1))} disabled={activeMathStep === 1}>
              ← Back
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Step {activeMathStep} of 3</span>
            <button className="quiz-btn quiz-btn-primary" onClick={() => setActiveMathStep((prev) => Math.min(3, prev + 1))} disabled={activeMathStep === 3}>
              Next Step →
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5.4: OPTIMUM TARIFFS, RETALIATION & COUNTRY SIZE */}
      {/* ======================================================== */}
      {moduleTab === "5.4 — Optimum Tariffs, Retaliation & Country Size" && (
        <div className="lesson-step-content">
          <div className="stepper-section-title">
            5.4 — Optimum Tariffs, Retaliation &amp; Country Size
          </div>

          <div className="stepper-header">
            <button className={`step-indicator-btn ${activeMathStep === 1 ? 'active' : ''}`} onClick={() => setActiveMathStep(1)}>
              <span className="step-num-badge">1</span> Step 1: Optimum Tariffs &amp; Retaliation
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 2 ? 'active' : ''}`} onClick={() => setActiveMathStep(2)}>
              <span className="step-num-badge">2</span> Step 2: Mayer Negotiated Settlements
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 3 ? 'active' : ''}`} onClick={() => setActiveMathStep(3)}>
              <span className="step-num-badge">3</span> Step 3: Syropoulos Country Size
            </button>
          </div>

          <div className="stepper-card-body">
            {activeMathStep === 1 && (
              <div>
                <h3>Retaliation best responses: Johnson (1953-54)</h3>
                <p>
                  {`Johnson modeled tariff retaliation as a non-cooperative game. Each country sets its optimal tariff based on the elasticity of the partner's offer curve:`}
                </p>
                {`$$t_I = \\frac{1}{j - 1}, \\quad t_{II} = \\frac{1}{k - 1}$$`}

                <DefinitionBox title="Johnson (1953–54) setting">
                  {`Two large countries trade two goods. Redistribution of tariff revenue rotates Home's offer curve. Non-cooperative tariff-setting iterations converges either to a stable Nash equilibrium or to a perpetual tariff cycle.`}
                </DefinitionBox>

                <DefinitionBox title="Johnson's Retaliation Game">
                  {`Country II's best response is its own optimum tariff. Iterating these best response functions (which Johnson explicitly compared to Cournot duopoly reaction dynamics) leads either to a stable Nash equilibrium or to a perpetual cycle.`}
                </DefinitionBox>

                <IntuitionBox title="Can a country win a tariff war?">
                  {`Contrary to Scitovszky's classic assertion that both countries must lose, Johnson showed that if Country I faces a highly inelastic partner offer curve, it can win the retaliation war, ending up better off than under free trade.`}
                </IntuitionBox>
              </div>
            )}

            {activeMathStep === 2 && (
              <div>
                <h3>Mayer's Pareto Locus &amp; Bargaining</h3>
                <p>
                  {`Mayer (1981) defined tariff-indifference curves in $(t, t^*)$ space. Efficient agreements must equalize relative domestic prices across borders, yielding the efficiency locus CC:`}
                </p>
                {`$$t + t^* + t t^* = 0$$`}

                <DerivationStepper 
                  title="Mayer's Pareto Locus Derivation"
                  steps={[
                    {
                      explanation: "Let p and p* be the relative price of imports at Home and Foreign. Iceberg costs are absent, so prices satisfy:",
                      math: "$$p = \\pi (1 + t), \\quad p^* = \\frac{\\pi}{1 + t^*}$$"
                    },
                    {
                      explanation: "Pareto efficiency requires equal relative prices across countries (p = p*) to prevent allocative distortions:",
                      math: "$$\\pi (1 + t) = \\frac{\\pi}{1 + t^*}$$"
                    },
                    {
                      explanation: "Cancel world terms of trade π and cross-multiply to solve the CC locus:",
                      math: "$$(1 + t)(1 + t^*) = 1 \\implies t + t^* + t t^* = 0$$"
                    }
                  ]}
                />

                <DefinitionBox title="Mayer's Pareto Locus">
                  {`The locus t + t* + tt* = 0 implies that a joint tariff war is never Pareto efficient. Any point of CC dominates the threat point E, showing that negotiated settlements (segment MN) always weakly beat tariff retaliation.`}
                </DefinitionBox>
              </div>
            )}

            {activeMathStep === 3 && (
              <div>
                <h3>Country Size and Retaliation: Syropoulos (2002)</h3>
                <p>
                  {`Syropoulos measured relative country size using labor endowments: $\\lambda_i = L_j / L_i$. He proved that terms-of-trade leverage is determined by relative size:`}
                </p>

                <DefinitionBox title="Syropoulos size thresholds">
                  {`For each country, there is a size threshold $\\bar{\\lambda}_i$ such that the country wins the tariff war (ends up better off under Nash retaliation than free trade) if its size exceeds the threshold: $\\lambda_i > \\bar{\\lambda}_i$.`}
                </DefinitionBox>

                <IntuitionBox title="The three size regions">
                  {`Exogenous sizes divide the world into three zones:
                  - Country j wins: Foreign is large enough to dominate.
                  - Prisoner's Dilemma region: Both lose relative to free trade.
                  - Country i wins: Home is large enough to dominate.`}
                </IntuitionBox>
              </div>
            )}
          </div>

          {/* Tab 5.4 Interactive Controls */}
          {activeMathStep === 1 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Relative Country Size ($\\lambda$):</span>
                    <span className="val-highlight">{lambdaVal.toFixed(2)}</span>
                  </label>
                  <input 
                    type="range" min="0.2" max="3.0" step="0.1"
                    value={lambdaVal} onChange={(e) => setLambdaVal(Number(e.target.value))} 
                    className="range-slider"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Tariff Retaliation War &amp; Best Responses</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 450 200" width="100%" height="100%">
                      {/* Gridlines */}
                      <line x1="40" y1="50" x2="410" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="95" x2="410" y2="95" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="140" x2="410" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      <line x1="100" y1="20" x2="100" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="160" y1="20" x2="160" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="220" y1="20" x2="220" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="280" y1="20" x2="280" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="340" y1="20" x2="340" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Axes */}
                      <line x1="40" y1="170" x2="410" y2="170" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                      <text x="225" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Foreign Tariff t*</text>
                      <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Home Tariff t</text>

                      {/* Home reaction RR */}
                      {(() => {
                        const yStart = 170 - tHomeNash * 60;
                        const yEnd = 170 - (tHomeNash - 0.2 * 2.0) * 60;
                        
                        const xStart = 40 + tForNash * 60;
                        const xEnd = 40 + (tForNash - 0.2 * 2.0) * 60;
                        
                        const xEq = 40 + tForEq * 60;
                        const yEq = 170 - tHomeEq * 60;
                        
                        return (
                          <>
                            <line x1="40" y1={yStart} x2="160" y2={yEnd} stroke="var(--accent-primary)" strokeWidth="3.5" />
                            <text x="150" y={yEnd - 10} fill="var(--accent-primary)">RR (Home)</text>

                            {/* Foreign reaction R*R* */}
                            <line x1={xStart} y1="170" x2={xEnd} y2="50" stroke="var(--accent-secondary)" strokeWidth="3.5" />
                            <text x={xStart + 10} y="45" fill="var(--accent-secondary)">R*R* (Foreign)</text>

                            {/* Guide lines to axes */}
                            <line x1={xEq} y1={yEq} x2={xEq} y2="170" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                            <line x1="40" y1={yEq} x2={xEq} y2={yEq} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />

                            {/* Nash Equilibrium */}
                            <circle cx={xEq} cy={yEq} r="6" fill="#f59e0b" className="svg-marker" />
                            <text x={xEq + 10} y={yEq - 10} className="svg-text-bold" fill="#f59e0b">
                              E Nash ({tForEq.toFixed(2)}, {tHomeEq.toFixed(2)})
                            </text>
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <div className="implications-grid">
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{(tHomeEq).toFixed(3)}</div>
                        <div className="implication-stat-lbl">Home Nash Tariff</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val purple-text">{(tForEq).toFixed(3)}</div>
                        <div className="implication-stat-lbl">Foreign Nash Tariff</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <LessonQuiz title="Lesson 8" questions={quizL8} />
            </>
          )}

          {activeMathStep === 2 && (
            <>
              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Mayer Negotiated Settlements and the CC Locus</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 450 200" width="100%" height="100%">
                      {/* Gridlines */}
                      <line x1="40" y1="50" x2="410" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="95" x2="410" y2="95" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="140" x2="410" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      <line x1="100" y1="20" x2="100" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="200" y1="20" x2="200" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="300" y1="20" x2="300" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="400" y1="20" x2="400" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Axes */}
                      <line x1="40" y1="170" x2="410" y2="170" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                      <text x="225" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Foreign Tariff t*</text>
                      <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Home Tariff t</text>

                      {/* CC Locus: t* = -t / (1 + t) */}
                      <path 
                        d={Array.from({ length: 31 }, (_, idx) => {
                          const t = -0.5 + idx * 0.05;
                          const tStar = -t / (1 + t);
                          const x = 200 + tStar * 100;
                          const y = 95 - t * 100;
                          return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')} 
                        className="svg-curve-dashed" 
                        stroke="#ef4444" 
                        strokeWidth="2.5"
                      />
                      <text x="320" y="50" fill="#ef4444">CC: t + t* + tt* = 0</text>

                      {/* Negotiable range MN */}
                      <line x1="200" y1="95" x2="300" y2="30" stroke="#10b981" strokeWidth="4" />
                      <text x="260" y="25" fill="#10b981" className="svg-text-bold">MN (Negotiable Range)</text>

                      {/* Nash Threat point */}
                      <circle cx="280" cy="55" r="6" fill="#f59e0b" />
                      <text x="290" y="55" className="svg-text-bold" fill="#f59e0b">E (Threat Point)</text>
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                      {`Cooperative negotiations from the threat point E settle on the segment MN of the efficiency locus CC, strictly dominating the non-cooperative war outcomes.`}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeMathStep === 3 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Relative Country Size ($\\lambda$):</span>
                    <span className="val-highlight">{lambdaVal.toFixed(2)}</span>
                  </label>
                  <input 
                    type="range" min="0.2" max="3.0" step="0.1"
                    value={lambdaVal} onChange={(e) => setLambdaVal(Number(e.target.value))} 
                    className="range-slider"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Syropoulos Relative Size-Welfare Partition</div>
                  <div className="svg-wrapper" style={{ minHeight: '180px' }}>
                    <svg viewBox="0 0 450 120" width="100%" height="100%">
                      {/* Linear scale bar */}
                      <rect x="30" y="45" width="390" height="25" fill="rgba(255,255,255,0.05)" stroke="var(--card-border)" />
                      
                      {/* Partition Zones */}
                      <rect x="30" y="45" width="65" height="25" fill="rgba(239, 68, 68, 0.15)" />
                      <text x="62.5" y="61" className="svg-text-bold" fill="#ef4444" textAnchor="middle" style={{ fontSize: '9px' }}>Foreign Wins</text>

                      <rect x="95" y="45" width="195" height="25" fill="rgba(245, 158, 11, 0.15)" />
                      <text x="192.5" y="61" className="svg-text-bold" fill="#f59e0b" textAnchor="middle" style={{ fontSize: '9px' }}>Prisoner's Dilemma</text>

                      <rect x="290" y="45" width="130" height="25" fill="rgba(59, 130, 246, 0.15)" />
                      <text x="355" y="61" className="svg-text-bold" fill="#3b82f6" textAnchor="middle" style={{ fontSize: '9px' }}>Home Wins</text>
                      
                      {/* Threshold markers */}
                      {/* λ_bar_j = 0.5, λ_bar_i = 2.0 */}
                      <line x1="95" y1="45" x2="95" y2="70" stroke="var(--text-primary)" strokeWidth="2" />
                      <text x="95" y="35" className="svg-text" textAnchor="middle">λ_j = 0.5</text>
                      
                      <line x1="290" y1="45" x2="290" y2="70" stroke="var(--text-primary)" strokeWidth="2" />
                      <text x="290" y="35" className="svg-text" textAnchor="middle">λ_i = 2.0</text>

                      {/* Current marker */}
                      {(() => {
                        const xPos = 30 + (lambdaVal / 3.0) * 390;
                        return (
                          <>
                            <polygon points={`${xPos},75 ${xPos-8},90 ${xPos+8},90`} fill="#f59e0b" />
                            <text x={xPos} y="105" className="svg-text-bold" fill="#f59e0b" textAnchor="middle">
                              Size λ = {lambdaVal.toFixed(2)}
                            </text>
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                      {lambdaVal < 0.5 
                        ? "Foreign is sufficiently large to win the tariff war relative to free trade."
                        : lambdaVal > 2.0
                          ? "Home is sufficiently large to win the tariff war relative to free trade."
                          : "Prisoner's Dilemma: Both countries end up worse off than under free trade."}
                    </p>
                  </div>
                </div>
              </div>

              <LessonQuiz title="Lesson 9" questions={quizL9} />
            </>
          )}

          <div className="stepper-nav-footer">
            <button className="quiz-btn quiz-btn-secondary" onClick={() => setActiveMathStep((prev) => Math.max(1, prev - 1))} disabled={activeMathStep === 1}>
              ← Back
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Step {activeMathStep} of 3</span>
            <button className="quiz-btn quiz-btn-primary" onClick={() => setActiveMathStep((prev) => Math.min(3, prev + 1))} disabled={activeMathStep === 3}>
              Next Step →
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5.5: STRATEGIC TRADE POLICY UNDER IMPERFECT COMPETITION */}
      {/* ======================================================== */}
      {moduleTab === "5.5 — Strategic Trade Policy Under Imperfect Competition" && (
        <div className="lesson-step-content">
          <div className="stepper-section-title">
            5.5 — Strategic Trade Policy Under Imperfect Competition
          </div>

          <div className="stepper-header">
            <button className={`step-indicator-btn ${activeMathStep === 1 ? 'active' : ''}`} onClick={() => setActiveMathStep(1)}>
              <span className="step-num-badge">1</span> Step 1: Foreign Monopoly
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 2 ? 'active' : ''}`} onClick={() => setActiveMathStep(2)}>
              <span className="step-num-badge">2</span> Step 2: Subsidies &amp; Profit Shifting
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 3 ? 'active' : ''}`} onClick={() => setActiveMathStep(3)}>
              <span className="step-num-badge">3</span> Step 3: Subsidy War &amp; Bertrand Caveat
            </button>
          </div>

          <div className="stepper-card-body">
            {activeMathStep === 1 && (
              <div>
                <h3>Foreign Monopoly and the Rent-Extracting Tariff</h3>
                <p>
                  {`A single foreign monopolist exports to the home market. Welfare is $U = u(X) - PX + tX$. The optimal tariff satisfies the Brander-Spencer sign condition:`}
                </p>
                {`$$\\hat{t} = -P'X(R + 1)$$`}
                <p>
                  {`where $R \\equiv XP'' / P'$ is the relative demand convexity.`}
                </p>

                <DerivationStepper 
                  title="Optimal Rent Extraction Tariff"
                  steps={[
                    {
                      explanation: "The foreign monopolist maximizes profit π = P X - (c + t)X, leading to the FOC:",
                      math: "$$P + P'X - (c + t) = 0$$"
                    },
                    {
                      explanation: "Differentiate welfare U = u(X) - PX + tX with respect to t to find the optimal rate:",
                      math: "$$\\hat{t} = X \\left( P' - \\frac{1}{dX/dt} \\right) = -X(P' + P''X)$$"
                    },
                    {
                      explanation: "Factor out -P'X to isolate the demand convexity parameter R = XP''/P':",
                      math: "$$\\hat{t} = -P'X \\left( 1 + \\frac{XP''}{P'} \\right) = -P'X(R + 1)$$"
                    }
                  ]}
                />

                <DefinitionBox title="Brander and Spencer (1984): the sign of the optimal tariff">
                  {`The optimal policy is a tariff (t_hat > 0) if demand is linear or moderately convex (R > -1). However, if demand is highly convex (R < -1, e.g., constant elasticity), the optimal policy flips to an import subsidy!`}
                </DefinitionBox>

                <DefinitionBox title="Domestic and foreign firms: profit shifting">
                  {`Under Cournot duopoly with a domestic and a foreign competitor supplying the home market, a home tariff raises the foreign firm's marginal cost. By the envelope theorem, this shifts production and profits from the foreign firm to the domestic competitor, increasing national welfare.`}
                </DefinitionBox>
              </div>
            )}

            {activeMathStep === 2 && (
              <div>
                <h3>Strategic Export Subsidies: Brander-Spencer (1985)</h3>
                <p>
                  {`Two firms compete in a third-country market. A home export subsidy $s$ pre-commits the home firm to producing more output, shifting profits:`}
                </p>
                {`$$s_{opt} = -\\frac{x P' y_s}{x_s} > 0$$`}

                <DerivationStepper 
                  title="Optimal Strategic Export Subsidy"
                  steps={[
                    {
                      explanation: "Domestic welfare is industry profit net of the subsidy cost: G(s) = π1 - sx. Differentiate with respect to s:",
                      math: "$$G_s = \\pi_x x_s + \\pi_y y_s + x - x - s x_s$$"
                    },
                    {
                      explanation: "Substitute the subsidized Cournot FOC (π_x = 0) and simplify using envelope properties:",
                      math: "$$G_s = x P' y_s - s x_s$$"
                    },
                    {
                      explanation: "Set G_s = 0 and solve for the optimal subsidy s_opt:",
                      math: "$$s_{opt} = -\\frac{x P' y_s}{x_s} > 0$$"
                    }
                  ]}
                />

                <DefinitionBox title="Stackelberg replication proposition">
                  {`The optimal export subsidy shifts the home firm's reaction curve outward to implement the exact Stackelberg leader quantity outcome, stealing profits from the foreign rival.`}
                </DefinitionBox>
              </div>
            )}

            {activeMathStep === 3 && (
              <div>
                <h3>The Subsidy War &amp; The Bertrand Caveat</h3>
                <p>
                  {`If both exporting nations subsidize, they enter a Prisoner's Dilemma subsidy war, where Nash subsidies are positive but joint welfare falls. Crucially, the policy flips under price competition:`}
                </p>

                <DefinitionBox title="General equilibrium, subsidy wars, and three governments">
                  {`An international subsidy war represents a Prisoner's Dilemma: both countries subsidize to shift profits, but in equilibrium they cross-subsidize, burning resources. A third-country importing government can set an optimal tariff $t = s + s^*$ to extract 100% of both export subsidies.`}
                </DefinitionBox>

                <DefinitionBox title="Cournot vs. Bertrand caveat">
                  {`- Under Cournot (quantity), quantities are strategic substitutes. The optimal policy is an export subsidy.
                  - Under Bertrand (price), prices are strategic complements. The optimal policy flips to an export tax! Committing to a tax raises domestic costs, prompting the rival to raise prices and expanding joint margins.`}
                </DefinitionBox>
              </div>
            )}
          </div>

          {/* Tab 5.5 Interactive Controls */}
          {activeMathStep === 1 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Demand Convexity ($R$):</span>
                    <span className="val-highlight">{convexityR.toFixed(2)}</span>
                  </label>
                  <input 
                    type="range" min="-2.0" max="1.0" step="0.1"
                    value={convexityR} onChange={(e) => setConvexityR(Number(e.target.value))} 
                    className="range-slider"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Demand Convexity and Optimal Import Policy</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 450 200" width="100%" height="100%">
                      {/* Gridlines */}
                      <line x1="40" y1="50" x2="410" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="100" x2="410" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="150" x2="410" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      <line x1="100" y1="20" x2="100" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="180" y1="20" x2="180" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="260" y1="20" x2="260" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="340" y1="20" x2="340" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Axes */}
                      <line x1="40" y1="170" x2="410" y2="170" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                      <text x="225" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Quantity</text>
                      <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Price</text>

                      {/* Curve based on R */}
                      <path 
                        d={Array.from({ length: 31 }, (_, idx) => {
                          const xVal = 0.5 + idx * 0.1;
                          // Convex curve: P = 4 - x^(1 + R)
                          const pVal = Math.max(0.2, 4.0 - Math.pow(xVal, 1.0 + convexityR * 0.2));
                          const x = 40 + xVal * 80;
                          const y = 170 - (pVal / 4.0) * 140;
                          return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')} 
                        className="svg-curve" 
                        stroke="#ef4444" 
                        strokeWidth="3.5"
                      />

                      {/* t_hat indicator */}
                      <line x1="40" y1={100} x2="410" y2={100} stroke="var(--text-muted)" strokeDasharray="3 3" />
                      <text x="320" y="95" className="svg-text">Marginal Cost c</text>
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <div className="implications-grid">
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{convexityR.toFixed(2)}</div>
                        <div className="implication-stat-lbl">Convexity R</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val" style={{ color: optTariffMon >= 0 ? 'var(--accent-success)' : 'var(--accent-error)' }}>
                          {optTariffMon.toFixed(2)}
                        </div>
                        <div className="implication-stat-lbl">Optimal Policy (t_hat)</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">
                          {optTariffMon >= 0 ? "Import Tariff" : "Import Subsidy"}
                        </div>
                        <div className="implication-stat-lbl">Recommended Instrument</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <LessonQuiz title="Lesson 10" questions={quizL10} />
            </>
          )}

          {activeMathStep === 2 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Export Subsidy ($s$):</span>
                    <span className="val-highlight-purple">{subsidyS.toFixed(2)}</span>
                  </label>
                  <input 
                    type="range" min="0.0" max="1.5" step="0.05"
                    value={subsidyS} onChange={(e) => setSubsidyS(Number(e.target.value))} 
                    className="range-slider slider-purple"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Strategic Export Subsidies &amp; Reaction Curve Shift</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 450 200" width="100%" height="100%">
                      {/* Gridlines */}
                      <line x1="40" y1="50" x2="410" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="95" x2="410" y2="95" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="140" x2="410" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      <line x1="100" y1="20" x2="100" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="180" y1="20" x2="180" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="260" y1="20" x2="260" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="340" y1="20" x2="340" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Axes */}
                      <line x1="40" y1="170" x2="410" y2="170" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                      <text x="225" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Foreign Output y</text>
                      <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Home Output x</text>

                      {/* Foreign Reaction curve */}
                      <line x1="40" y1="40" x2="280" y2="160" stroke="var(--accent-secondary)" strokeWidth="3.5" />
                      <text x="270" y="150" fill="var(--accent-secondary)">BR* (Foreign)</text>

                      {/* Home Reaction curve shifting out by s */}
                      {(() => {
                        const shiftY = subsidyS * 30;
                        const yStart = 150 - shiftY;
                        const yEnd = 30 - shiftY;
                        
                        const xN = 40 + yForSub * 60;
                        const yN = 170 - xHomeSub * 35;
                        
                        return (
                          <>
                            <line x1="60" y1={yStart} x2="380" y2={yEnd} stroke="var(--accent-primary)" strokeWidth="3.5" strokeDasharray="3 3" />
                            <text x="360" y={yEnd - 10} fill="var(--accent-primary)">BR (Home + s)</text>

                            {/* Guide lines to axes */}
                            <line x1={xN} y1={yN} x2={xN} y2="170" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                            <line x1="40" y1={yN} x2={xN} y2={yN} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />

                            {/* Nash point */}
                            <circle cx={xN} cy={yN} r="6" fill="#f59e0b" />
                            <text x={xN + 8} y={yN - 12} className="svg-text-bold" fill="#f59e0b">
                              Nash ({yForSub.toFixed(2)}, {xHomeSub.toFixed(2)})
                            </text>
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <div className="implications-grid">
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{xHomeSub.toFixed(2)}</div>
                        <div className="implication-stat-lbl">Home Share (x)</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val purple-text">{yForSub.toFixed(2)}</div>
                        <div className="implication-stat-lbl">Foreign Share (y)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <LessonQuiz title="Lesson 11" questions={quizL11} />
            </>
          )}

          {activeMathStep === 3 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Bertrand Commitment ($t_B$):</span>
                    <span className="val-highlight">{bertrandSoft.toFixed(2)}</span>
                  </label>
                  <input 
                    type="range" min="-0.5" max="0.5" step="0.05"
                    value={bertrandSoft} onChange={(e) => setBertrandSoft(Number(e.target.value))} 
                    className="range-slider"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Bertrand Price Competition &amp; Strategic Complements</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 450 200" width="100%" height="100%">
                      {/* Gridlines */}
                      <line x1="40" y1="50" x2="410" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="95" x2="410" y2="95" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="140" x2="410" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      <line x1="100" y1="20" x2="100" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="180" y1="20" x2="180" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="260" y1="20" x2="260" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="340" y1="20" x2="340" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Axes */}
                      <line x1="40" y1="170" x2="410" y2="170" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                      <text x="225" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Foreign Price P2</text>
                      <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Home Price P1</text>

                      {/* Complements reaction curves slope up */}
                      {(() => {
                        const shiftY = bertrandSoft * 40;
                        const yStart = 150 - shiftY;
                        const yEnd = 40 - shiftY;
                        return (
                          <>
                            <line x1="60" y1={yStart} x2="380" y2={yEnd} stroke="var(--accent-primary)" strokeWidth="3.5" />
                            <text x="360" y={yEnd - 10} fill="var(--accent-primary)">BR1 (Price)</text>
                          </>
                        );
                      })()}
                      
                      <line x1="40" y1="150" x2="350" y2="30" stroke="var(--accent-secondary)" strokeWidth="3.5" />
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                      {`Under price competition, reaction curves slope up (strategic complements). Aggressive subsidies prompt competitive price matching, causing a mutually destructive price war. Thus, export taxes are optimal under Bertrand.`}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="stepper-nav-footer">
            <button className="quiz-btn quiz-btn-secondary" onClick={() => setActiveMathStep((prev) => Math.max(1, prev - 1))} disabled={activeMathStep === 1}>
              ← Back
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Step {activeMathStep} of 3</span>
            <button className="quiz-btn quiz-btn-primary" onClick={() => setActiveMathStep((prev) => Math.min(3, prev + 1))} disabled={activeMathStep === 3}>
              Next Step →
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5.6: POLITICAL ECONOMY OF TRADE POLICY */}
      {/* ======================================================== */}
      {moduleTab === "5.6 — Political Economy of Trade Policy" && (
        <div className="lesson-step-content">
          <div className="stepper-section-title">
            5.6 — Political Economy of Trade Policy
          </div>

          <div className="stepper-header">
            <button className={`step-indicator-btn ${activeMathStep === 1 ? 'active' : ''}`} onClick={() => setActiveMathStep(1)}>
              <span className="step-num-badge">1</span> Step 1: Majority Voting &amp; Median Voter
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 2 ? 'active' : ''}`} onClick={() => setActiveMathStep(2)}>
              <span className="step-num-badge">2</span> Step 2: Costly voting &amp; Specific Factors
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 3 ? 'active' : ''}`} onClick={() => setActiveMathStep(3)}>
              <span className="step-num-badge">3</span> Step 3: Grossman-Helpman Lobbying
            </button>
          </div>

          <div className="stepper-card-body">
            {activeMathStep === 1 && (
              <div>
                <h3>Endogenous Tariffs by Majority Voting: Mayer (1984)</h3>
                <p>
                  {`Mayer modeled tariff selection as an electoral game. Voters own heterogeneous assets $k_i$. Under costless voting, majority rule selects the median voter's optimal tariff:`}
                </p>
                {`$$t^* = t_m$$`}

                <DefinitionBox title="Endogenous Tariff majority voting">
                  {`Because capital distributions are right-skewed (median capital ownership ratio lies below the mean), the median voter has relatively low capital, biasing voting outcomes toward protecting the labor-intensive sector.`}
                </DefinitionBox>

                <DefinitionBox title="The median-voter tariff">
                  {`In a model where tariffs protect capital-intensive goods, if asset distribution is right-skewed, the median voter owns less capital relative to labor than the average voter. Hence, the median voter favors a higher tariff on the labor-intensive import sector than what would maximize average national welfare.`}
                </DefinitionBox>
              </div>
            )}

            {activeMathStep === 2 && (
              <div>
                <h3>Costly Voting &amp; Specific-Factors Asymmetry</h3>
                <p>
                  {`When voting incurs costs $F$, only concentrated owners with stakes exceeding $F$ participate. The specific factors model implies:`}
                </p>
                {`$$B_{gg} > -B_{hg}$$`}

                <DefinitionBox title="Concentrated benefits, diffuse costs">
                  {`A tariff on good g grants concentrated benefits ($B_{gg}$) to g's specific factor owners, while spreading diffuse costs ($B_{hg}$) across all other sectors' consumers. Costly voting shuts out diffuse losers, allowing concentrated minorities to win protection.`}
                </DefinitionBox>
              </div>
            )}

            {activeMathStep === 3 && (
              <div>
                <h3>Grossman and Helpman (1994): Protection for Sale</h3>
                <p>
                  {`Lobbies bribe the government with contributions. In truthful Nash equilibrium, the tariff rate satisfies a modified Ramsey rule:`}
                </p>
                {`$$\\frac{t_i}{1 + t_i} = \\frac{I_i - \\alpha_L}{a + \\alpha_L} \\cdot \\frac{z_i}{e_i}$$`}

                <DerivationStepper 
                  title="Protection for Sale Equilibrium Tariff"
                  steps={[
                    {
                      explanation: "The government maximizes G = Σ Ci + a W. Organized lobbies i choose contribution schedules truthfully reflecting their surplus:",
                      math: "$$\\frac{\\partial C_i}{\\partial p_j} = \\frac{\\partial W_i}{\\partial p_j}$$"
                    },
                    {
                      explanation: "The political equilibrium weights lobby members 1 + a and non-members a. Solving the FOC for domestic prices yields:",
                      math: "$$(I_i - \\alpha_L) y_i + (a + \\alpha_L)(p_i - p_i^*) \\frac{dm_i}{dp_i} = 0$$"
                    },
                    {
                      explanation: "Rearrange to express in terms of the ad-valorem tariff and import elasticity e_i:",
                      math: "$$\\frac{t_i}{1 + t_i} = \\frac{I_i - \\alpha_L}{a + \\alpha_L} \\cdot \\frac{z_i}{e_i}$$"
                    }
                  ]}
                />

                <DefinitionBox title="Grossman–Helpman common-agency model">
                  {`The government acts as the agent setting trade policy to maximize a weighted sum of lobby campaign contributions and general welfare. The organized lobbies act as principals, submitting campaign schedules that truthfully reflect their surplus gains at the margin.`}
                </DefinitionBox>

                <DefinitionBox title="Ramsey rule in Protection for Sale">
                  {`Protection falls with import elasticity (e_i) because deadweight losses scale with elasticity. Lobbies of organized sectors (Ii = 1) get positive protection, while unorganized sectors (Ii = 0) are taxed (ti < 0) to subsidize them.`}
                </DefinitionBox>

                <IntuitionBox title="Why lobbies may prefer inefficient instruments">
                  {`Organized interest groups may support inefficient policy instruments (like import quotas instead of tariffs). Inefficient instruments weaken the government's threat of making a deal with rival groups, lowering the total lobby contribution bribes required to sustain the policy.`}
                </IntuitionBox>
              </div>
            )}
          </div>

          {/* Tab 5.6 Interactive Controls */}
          {activeMathStep === 1 && (
            <>
              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Mayer Voter Utility &amp; Capital Endowment Skewness</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 450 160" width="100%" height="100%">
                      {/* Gridlines */}
                      <line x1="40" y1="40" x2="410" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="80" x2="410" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      
                      <line x1="110" y1="20" x2="110" y2="130" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="180" y1="20" x2="180" y2="130" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="280" y1="20" x2="280" y2="130" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="350" y1="20" x2="350" y2="130" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Axes */}
                      <line x1="40" y1="130" x2="410" y2="130" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="130" className="svg-axis" />
                      <text x="225" y="150" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Capital-Labor Ratio k_i</text>
                      
                      {/* Mean and Median indicators */}
                      <line x1="180" y1="20" x2="180" y2="130" stroke="#ef4444" strokeWidth="2.5" />
                      <text x="180" y="15" fill="#ef4444" className="svg-text" textAnchor="middle">Median Voter</text>

                      <line x1="280" y1="20" x2="280" y2="130" stroke="#3b82f6" strokeWidth="2.5" />
                      <text x="280" y="15" fill="#3b82f6" className="svg-text" textAnchor="middle">Mean (Average)</text>

                      {/* Skewed density distribution */}
                      <path d="M 40 130 Q 150 30 180 60 T 410 130" fill="rgba(59,130,246,0.1)" stroke="var(--text-muted)" strokeWidth="3.5" />
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                      {`Right-skewed asset ownership places the median voter below the average capital ratio, creating democratic bias toward labor protection.`}
                    </p>
                  </div>
                </div>
              </div>

              <LessonQuiz title="Lesson 12" questions={quizL12} />
            </>
          )}

          {activeMathStep === 2 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Voting Cost ($F$):</span>
                    <span className="val-highlight">{votingCost.toFixed(3)}</span>
                  </label>
                  <input 
                    type="range" min="0.0" max="0.15" step="0.01"
                    value={votingCost} onChange={(e) => setVotingCost(Number(e.target.value))} 
                    className="range-slider"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Voting Turnout &amp; Sector Participation Boundaries</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 450 160" width="100%" height="100%">
                      {/* Scale */}
                      <line x1="40" y1="100" x2="410" y2="100" stroke="var(--text-muted)" strokeWidth="2" />
                      
                      {/* Voting cost barriers */}
                      {(() => {
                        const barrierWidth = votingCost * 1200;
                        const xL = 225 - barrierWidth/2;
                        const xR = 225 + barrierWidth/2;
                        
                        return (
                          <>
                            {/* Shaded Stay Home zone */}
                            <rect x={xL} y="30" width={barrierWidth} height="70" fill="rgba(239, 68, 68, 0.15)" />
                            <text x="225" y="65" fill="#ef4444" className="svg-text-bold" textAnchor="middle">Stay Home</text>

                            {/* Active voters on edges */}
                            <text x="80" y="65" fill="#10b981" className="svg-text-bold" textAnchor="middle">Active Voters</text>
                            <text x="370" y="65" fill="#10b981" className="svg-text-bold" textAnchor="middle">Active Voters</text>

                            <line x1={xL} y1="30" x2={xL} y2="100" stroke="#ef4444" strokeWidth="2.5" />
                            <line x1={xR} y1="30" x2={xR} y2="100" stroke="#ef4444" strokeWidth="2.5" />
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                      {`As voting cost F increases, the 'Stay Home' range widens. Consumers who stand to lose small individual amounts stay home, whereas highly specialized factor owners cross the threshold and vote.`}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeMathStep === 3 && (
            <>
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>Lobby Population Share ($\\alpha_L$):</span>
                    <span className="val-highlight">{lobbyShare.toFixed(2)}</span>
                  </label>
                  <input 
                    type="range" min="0.1" max="0.9" step="0.05"
                    value={lobbyShare} onChange={(e) => setLobbyShare(Number(e.target.value))} 
                    className="range-slider"
                  />
                </div>
                <div className="slider-card" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label htmlFor="lobby-check" style={{ cursor: 'pointer' }}>Organized Lobby Sector:</label>
                  <input 
                    id="lobby-check"
                    type="checkbox" 
                    checked={lobbyOrganized} 
                    onChange={(e) => setLobbyOrganized(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title">📈 Grossman-Helpman Protection for Sale: Ramsey Tariff Slopes</div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 450 200" width="100%" height="100%">
                      {/* Gridlines */}
                      <line x1="40" y1="60" x2="410" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="100" x2="410" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="40" y1="140" x2="410" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="180" y1="20" x2="180" y2="180" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="260" y1="20" x2="260" y2="180" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="340" y1="20" x2="340" y2="180" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Axes */}
                      <line x1="40" y1="100" x2="410" y2="100" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="180" className="svg-axis" />
                      <text x="225" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Inverse Elasticity Scale z_i/e_i</text>
                      <text x="15" y="100" className="svg-text" textAnchor="middle" transform="rotate(-90 15 100)" style={{ fontWeight: 600 }}>Tariff Rate t_i / (1 + t_i)</text>

                      {/* Sloped lines */}
                      {(() => {
                        const yEnd = 100 - ghSlope * 120;
                        return (
                          <>
                            {/* Guide line to axes from the terminal point of the line */}
                            <line x1="380" y1={yEnd} x2="380" y2="100" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                            <line x1="40" y1={yEnd} x2="380" y2={yEnd} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />

                            <line x1="40" y1="100" x2="380" y2={yEnd} stroke={lobbyOrganized ? 'var(--accent-success)' : 'var(--accent-error)'} strokeWidth="3.5" />
                            <text x="370" y={yEnd - 10} fill={lobbyOrganized ? 'var(--accent-success)' : 'var(--accent-error)'} className="svg-text-bold">
                              {lobbyOrganized ? 'Organized Lobby (t_i > 0)' : 'Unorganized (t_i < 0)'}
                            </text>
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📊 Model Implications &amp; Outcomes
                  </div>
                  <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'center' }}>
                    <div className="implications-grid">
                      <div className="implication-stat-card">
                        <div className="implication-stat-val">{(lobbyShare).toFixed(2)}</div>
                        <div className="implication-stat-lbl">Lobby share (αL)</div>
                      </div>
                      <div className="implication-stat-card">
                        <div className="implication-stat-val" style={{ color: ghSlope >= 0 ? 'var(--accent-success)' : 'var(--accent-error)' }}>
                          {(ghSlope).toFixed(3)}
                        </div>
                        <div className="implication-stat-lbl">Tariff Policy Slope</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <LessonQuiz title="Lesson 13" questions={quizL13} />
            </>
          )}

          <div className="stepper-nav-footer">
            <button className="quiz-btn quiz-btn-secondary" onClick={() => setActiveMathStep((prev) => Math.max(1, prev - 1))} disabled={activeMathStep === 1}>
              ← Back
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Step {activeMathStep} of 3</span>
            <button className="quiz-btn quiz-btn-primary" onClick={() => setActiveMathStep((prev) => Math.min(3, prev + 1))} disabled={activeMathStep === 3}>
              Next Step →
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5.7: FINAL EXAM */}
      {/* ======================================================== */}
      {moduleTab === "5.7 — Final Exam" && (
        <Module5Quiz />
      )}

      {/* Next Lesson Navigation Button */}
      {(() => {
        const currentTabIdx = tabsList.findIndex(([key]) => key === moduleTab);
        if (currentTabIdx === -1) return null;
        
        const isLastLesson = currentTabIdx === tabsList.length - 2;
        const isExamTab = currentTabIdx === tabsList.length - 1;
        
        let label = "Next Lesson";
        if (isLastLesson) {
          label = "Take the Final Exam";
        } else if (isExamTab) {
          label = "Next Module: The Structural Gravity Model";
        } else {
          label = `Next Lesson: ${tabsList[currentTabIdx + 1][1]}`;
        }

        return (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem', borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem' }}>
            <button
              onClick={() => {
                if (!isExamTab) {
                  setModuleTab(tabsList[currentTabIdx + 1][0]);
                } else {
                  setActiveTab('module6');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hero-btn"
            >
              <span>{label}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        );
      })()}
    </div>
  );
}
