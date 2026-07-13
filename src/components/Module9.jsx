import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Lightbulb, Calculator, Layers, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import './Module9.css';

// Callout components
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
        background: 'rgba(249, 115, 22, 0.02)',
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
            background: 'rgba(249, 115, 22, 0.1)', 
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
              fontSize: '0.85rem',
              lineHeight: '1.4',
              color: 'var(--text-secondary)'
            }}>
              <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px', color: 'var(--text-primary)' }}>Explanation:</span>
              {activeQuestion.explanation}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button 
              onClick={handleNextClick} 
              disabled={!isAnswered} 
              className="quiz-btn quiz-btn-primary"
            >
              <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'View Score'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function Module9({ theme, setActiveTab }) {
  const [moduleTab, setModuleTab] = useState("9.1 — Guns & Butter");

  // 9.1 Interactive state
  const [price91, setPrice91] = useState(0.45);

  // 9.2 Interactive state
  const [contestedT0, setContestedT0] = useState(3.0);
  const [contestM, setContestM] = useState(0.5);

  // 9.3 Interactive state
  const [price93, setPrice93] = useState(1.0);
  const [mode93, setMode93] = useState("domestic"); // "domestic" or "international"

  // 9.4 Interactive state
  const [mode94, setMode94] = useState("enemies"); // "enemies" or "friends"

  // 9.5 Interactive state
  const [warSurvivability, setWarSurvivability] = useState(0.6); // d
  const [agent1Share, setAgent1Share] = useState(0.5); // s

  // 9.6 Interactive state
  const [conflictProb, setConflictProb] = useState(0.4); // rho
  const [wealthGap, setWealthGap] = useState(1.5);
  const [portfolioStep, setPortfolioStep] = useState(0);

  // 9.7 Interactive state
  const [filter97, setFilter97] = useState("All");

  // Final Exam state
  const [examAnswers, setExamAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [showExamResults, setShowExamResults] = useState(false);

  useEffect(() => {
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [moduleTab, mode93, mode94, portfolioStep, filter97, showExamResults]);

  // Exam handler
  const handleExamSelect = (qKey, optIdx) => {
    if (examSubmitted) return;
    setExamAnswers(prev => ({ ...prev, [qKey]: optIdx }));
  };

  const submitExam = () => {
    setExamSubmitted(true);
    setShowExamResults(true);
  };

  const resetExam = () => {
    setExamAnswers({});
    setExamSubmitted(false);
    setShowExamResults(false);
  };

  const getExamScore = () => {
    let score = 0;
    const keys = Object.keys(examQuestions);
    keys.forEach(k => {
      if (examAnswers[k] === examQuestions[k].correctIndex) {
        score++;
      }
    });
    return score;
  };

  // Exam Questions F17-F26
  const examQuestions = {
    F17: {
      question: "F17. In Skaperdas–Syropoulos (2001), opening to trade “levels the playing field” because:",
      options: [
        "endowments are equalized",
        "both adversaries face the same world price, hence the same opportunity cost of guns",
        "the CSF becomes symmetric",
        "guns are traded"
      ],
      correctIndex: 1,
      explanation: "Trade forces both countries to face the same relative price for secure goods. This equalizes the opportunity cost of arming across adversaries regardless of size or labor differences."
    },
    F18: {
      question: "F18. The realist case against trade holds in the 2001 model when the world price of butter is:",
      options: [
        "above the autarky price",
        "in an intermediate range below the autarky price, where cheap guns and a valuable prize make the security externality dominate",
        "zero",
        "infinite"
      ],
      correctIndex: 1,
      explanation: "In the intermediate range below autarky, butter is cheap, making arming cheap. The resulting security externality (large arming diversion) swamps standard trade gains."
    },
    F19: {
      question: "F19. Skaperdas–Syropoulos (2002): with identical agents, ex post efficient Exchange is ex ante Pareto-dominated by Limited Settlement because:",
      options: [
        "exchange is taxed",
        "rendering the whole output negotiable raises the marginal return to arming, and identical agents have no offsetting gains from trade",
        "operating separate systems fails",
        "land is abundant"
      ],
      correctIndex: 1,
      explanation: "Exchange makes the entire joint surplus subject to bargaining power, creating huge incentives to arm. Since identical agents have no gains from trade, they are left strictly worse off due to high arming costs."
    },
    F20: {
      question: "F20. The historical correlation the 2002 paper explains is between:",
      options: [
        "war and inflation",
        "the security of property rights and the removal of restrictions on exchange",
        "tariffs and growth",
        "feudalism and trade surpluses"
      ],
      correctIndex: 1,
      explanation: "Removing trade restrictions is only ex-ante efficient when property rights are secure. The development of secure rights and free exchange are therefore complements."
    },
    F21: {
      question: "F21. GSS (2008): a boom in the world price of a contested resource’s output:",
      options: [
        "pacifies domestic conflict",
        "intensifies domestic conflict in countries exporting that output — the conflict face of the resource curse",
        "has no effect",
        "lowers arming everywhere"
      ],
      correctIndex: 1,
      explanation: "A natural resource export price boom raises the prize's value, provoking domestic factions to arm more heavily, illustrating the resource curse in conflict form."
    },
    F22: {
      question: "F22. GSY (2020): the pacifying force of trade between adversaries operates through:",
      options: [
        "alliance treaties",
        "a terms-of-trade discipline: extra arming depresses the price of the resource-intensive good the aggressor sells",
        "cultural exchange",
        "fixed exchange rates"
      ],
      correctIndex: 1,
      explanation: "Because adversaries are large, expanding output of the contested good depresses its relative price, penalizing quantity expansion and shifting best responses inward."
    },
    F23: {
      question: "F23. GSY (2020): when adversaries trade only with a friendly third country:",
      options: [
        "arming falls",
        "conflict intensifies and the extra arming can outweigh the gains from trade",
        "war becomes impossible",
        "the friend mediates"
      ],
      correctIndex: 1,
      explanation: "Trading only with allies absorbs captured goods without a terms-of-trade penalty, eliminating the price discipline and worsening bilateral arming."
    },
    F24: {
      question: "F24. GS (2021): unarmed peace preserving the status quo across all endowment distributions requires:",
      options: [
        "perfect security",
        "destructive war — deterrence by the cost of the alternative, not merely savings on guns",
        "side payments",
        "incomplete information"
      ],
      correctIndex: 1,
      explanation: "Deterring deviation at all distribution points requires war to be highly destructive, so that the threat of conflict dominates any incentive to seize resources."
    },
    F25: {
      question: "F25. GSZ (2022): the country that rationally refuses mutually profitable trade is:",
      options: [
        "the poorer one",
        "the richer one, when the wealth gap is large or future conflict is likely, because trade disproportionately arms the rival",
        "the smaller one",
        "neither, ever"
      ],
      correctIndex: 1,
      explanation: "The poorer country converts its relatively larger gains from trade into arming, threatening the future balance of power. The rich country avoids this by choosing autarky."
    },
    F26: {
      question: "F26. Camacho et al. (2025): dual-use technology transfers are blocked by the leader when:",
      options: [
        "the laggard has caught up",
        "technological distance is large, security is low, and absorption is limited — risking a low-technology trap",
        "patents expire",
        "trade costs are high"
      ],
      correctIndex: 1,
      explanation: "If security is low and distance is high, transferring tech raises the laggard's arming capacity too much, prompting the leader to enforce export blocks."
    }
  };

  return (
    <div className="container module9-container" style={{ padding: '40px 24px' }}>
      
      {/* ── Header ── */}
      <div className="module-header">
        <button onClick={() => setActiveTab('home')} className="back-btn">
          <span>← Back to Course Path</span>
        </button>
        <div className="module-title-row">
          <div>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Module 9
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '4px' }}>Trade, Conflict, and Security Economics</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px', fontStyle: 'italic', maxWidth: '800px', lineHeight: '1.4' }}>
              Part VII of the Trade Policy and Welfare companion series, continuing the lesson numbering from Lesson 14 in the source material, but labeled 9.1–9.7 here for consistency.
            </p>
          </div>
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="module-sections-nav" style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        {[
          ["9.1 — Guns & Butter", "9.1 Guns & Butter"],
          ["9.2 — Insecure Property", "9.2 Insecure Property"],
          ["9.3 — Trade & Resource GE", "9.3 GE Resources"],
          ["9.4 — Enemies & Friends", "9.4 Enemies & Friends"],
          ["9.5 — War, Peace & Commitment", "9.5 War & Commitment"],
          ["9.6 — Prudence & Predation", "9.6 Prudence & Predation"],
          ["9.7 — Frontier Research", "9.7 Synthesis Frontier"],
          ["9.8 — Final Exam", "9.8 Final Exam"]
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
          9.1 — GUNS, BUTTER, AND OPENNESS
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "9.1 — Guns & Butter" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 9.1: Guns, Butter, and Openness</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              9.1: Skaperdas &amp; Syropoulos (2001), "Guns, Butter, and Openness: On the Relationship between Security and Trade," AER Papers &amp; Proceedings, 91(2), 353–357.
            </p>

            <IntuitionBox title="Liberal vs. Realist Trade & Arming Debate">
              {`Does opening to trade reduce or increase arming between two countries disputing a resource?
              - Classical Liberal View: Trade pacifies. Interdependence raises the opportunity cost of war, making conflict unthinkable.
              - Realist View: Trade generates security externalities. By shifting the world prices of contested resources, trade can make arming cheaper and exacerbate disputes.`}
            </IntuitionBox>

            <DefinitionBox title="The Symmetric Model Setup">
              {`Two small countries $i \in \{1, 2\}$ dispute a resource prize $T_0$ (e.g. contested land/oil).
              - Secure endowments: Land $T_i$, Labor $L_i$.
              - Production: Labor converts one-to-one to guns $G_i$ or secure butter $B_i$.
              - Contest Success Function (CSF):
              $$\\phi_i = \\frac{G_i^m}{G_1^m + G_2^m}, \\quad m \\le 1$$
              - Country $i$ controls secure land $T_i + \\phi_i T_0$ and retains productive labor $L_i - G_i$.
              - GDP at butter price $p$: $R_i = T_i + \\phi_i T_0 + p(L_i - G_i)$.
              - Indirect utility under Cobb-Douglas preferences:
              $$V_i = \\Gamma p^{-\\beta} R_i, \\quad \\Gamma \\equiv \\alpha^\\alpha \\beta^\\beta$$`}
            </DefinitionBox>

            <DerivationBox title="Autarky Equilibrium Arming">
              {`Under autarky, butter markets clear domestically, locking the domestic price:
              $$p^A_i = \\frac{\\beta}{\\alpha} \\cdot \\frac{T_i + \\phi_i T_0}{L_i - G_i}$$
              Substituting $p^A_i$ into $V_i$ yields autarky welfare:
              $$V^A_i \\propto (T_i + \\phi_i T_0)^\\alpha (L_i - G_i)^\\beta$$
              Taking first order conditions under symmetry ($T_i = T, L_i = L$), we solve for guns:
              $$G^A = \\left[ \\frac{m/4}{m/4 + (\\beta/\\alpha)(1/2 + t)} \\right] L, \\quad t \\equiv T/T_0$$`}
            </DerivationBox>

            <DerivationBox title="Free Trade: Leveling the Playing Field">
              {`Under free trade, the price $p$ is fixed by world markets, eliminating the domestic price feedback. FOC:
              $$\\frac{\\partial R_i}{\\partial G_i} = \\frac{\\partial \\phi_i}{\\partial G_i} T_0 - p = 0 \\implies G^F = \\frac{m T_0}{4p}$$
              - Level playing field: Free trade arming depends only on $T_0$, $m$, and $p$. It is independent of labor endowments, secure land, and tastes—which all shaped autarky.`}
            </DerivationBox>

            <DerivationBox title="Envelope Theorem & Security Externality">
              {`Differentiating trade welfare with respect to world price $p$ yields:
              $$\\frac{d \\tilde{V}^F_i}{dp} = \\Gamma p^{-\\beta} \\left[ -M^F_i + T_0 \\frac{\\partial \\phi_i}{\\partial G_j} \\frac{d G^F_j}{dp} \\right]$$
              where $M^F_i$ is the imports of butter.
              At $p = p^A$ (so $M^F_i = 0$), a rise in price disarms the rival (since $dG^F_j/dp < 0$) and raises welfare via the security externality. A price drop does the opposite.`}
            </DerivationBox>

            <LessonQuiz 
              title="Lesson 9.1"
              questions={[
                {
                  question: "Q14.1 Under free trade, equilibrium arming G^F = m T_0 / 4p depends on:",
                  options: [
                    "labor endowments and tastes, as under autarky",
                    "only the prize T0, conflict effectiveness m, and the world price p — trade equalizes the opportunity cost of guns across the adversaries",
                    "the secure land endowments Ti",
                    "nothing — it is constant"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Opening to trade levels the playing field by equalizing the relative opportunity cost of arming to the world price p."
                },
                {
                  question: "Q14.2 Autarky is superior to free trade exactly when:",
                  options: [
                    "never — small countries always gain from trade",
                    "the world price of butter lies in the intermediate interval (p̃, p̃^A), where the negative security externality outweighs the gains from trade",
                    "the world price exceeds the autarky price",
                    "the country exports oil"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! When the world price is cheap enough to make guns cheap, but not cheap enough to offset it through terms of trade, the security externality makes autarky superior."
                },
                {
                  question: "Q14.3 Starting at p = p̃^A, a small increase in the world price of butter raises welfare because:",
                  options: [
                    "the country’s terms of trade improve (it trades at p̃^A)",
                    "excess demand is zero, so only the security externality operates: the rival’s opportunity cost of guns rises and it disarms",
                    "guns become cheaper",
                    "oil becomes more valuable"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! At the autarky price, trade volumes are zero, so terms-of-trade effects are null; welfare increases purely because the rival reduces arming."
                },
                {
                  question: "Q14.4 Trade intervention can be welfare-improving in this model only if:",
                  options: [
                    "the country is large in world markets",
                    "it is precommitted before security policies are chosen, so that it induces the adversary to arm less",
                    "tariff revenue is redistributed",
                    "demand is linear"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! If the trade regime is locked in beforehand, it alters the game's payoffs and can act as an commitment device that pacifies the rival."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Interactive Welfare Curve V^F(p) vs World Price</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px' }}>
              <div className="slider-card">
                <label>World Price of Butter (p): <span className="val-highlight">{price91.toFixed(2)}</span></label>
                <input type="range" min="0.10" max="1.20" step="0.02" value={price91} onChange={e => setPrice91(Number(e.target.value))} className="range-slider" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 400 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                {/* Reference Grid */}
                <line x1="50" y1="20" x2="50" y2="180" stroke="#334155" strokeWidth="1" />
                <line x1="50" y1="180" x2="380" y2="180" stroke="#334155" strokeWidth="1" />

                {/* Autarky price marker */}
                <line x1={50 + ((0.45 - 0.10) / 1.1) * 330} y1="20" x2={50 + ((0.45 - 0.10) / 1.1) * 330} y2="180" stroke="#f59e0b" strokeDasharray="3 3" />
                <text x={50 + ((0.45 - 0.10) / 1.1) * 330} y="192" fill="#f59e0b" fontSize="8" textAnchor="middle">p^A (0.45)</text>

                {/* Lower price threshold */}
                <line x1={50 + ((0.27 - 0.10) / 1.1) * 330} y1="20" x2={50 + ((0.27 - 0.10) / 1.1) * 330} y2="180" stroke="#ea580c" strokeDasharray="3 3" />
                <text x={50 + ((0.27 - 0.10) / 1.1) * 330} y="192" fill="#ea580c" fontSize="8" textAnchor="middle">p̃ (0.27)</text>

                {/* Autarky constant welfare line */}
                <line x1="50" y1="110" x2="380" y2="110" stroke="#94a3b8" strokeDasharray="4 4" />
                <text x="60" y="105" fill="#94a3b8" fontSize="8">VA (Autarky Welfare)</text>

                {/* Convex Welfare Curve */}
                {/* V^F(p) = 3.5 * p^(-0.5) + 10 * p^0.5 */}
                {/* Scale factor: (yVal - 11.5) * 100 */}
                <path
                  d={`M ${Array.from({ length: 60 }).map((_, i) => {
                    const p = 0.10 + (i / 59) * 1.1;
                    const v = 3.5 * Math.pow(p, -0.5) + 10 * Math.pow(p, 0.5);
                    const x = 50 + (i / 59) * 330;
                    // normalize y around 110 (which represents 11.92)
                    const y = 180 - (v - 10) * 15;
                    return `${x} ${y}`;
                  }).join(" L ")}`}
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="3"
                />

                {/* Current Price Marker */}
                {(() => {
                  const currentV = 3.5 * Math.pow(price91, -0.5) + 10 * Math.pow(price91, 0.5);
                  const markerX = 50 + ((price91 - 0.10) / 1.1) * 330;
                  const markerY = 180 - (currentV - 10) * 15;
                  return (
                    <circle cx={markerX} cy={markerY} r="6" fill="#f97316" stroke="#fff" strokeWidth="1.5" />
                  );
                })()}

                <text x="55" y="30" fill="var(--text-muted)" fontSize="9" fontWeight="500">Welfare V</text>
                <text x="360" y="174" fill="var(--text-muted)" fontSize="9" textAnchor="end">Price p</text>
              </svg>
            </div>

            <div className="implications-panel" style={{ marginTop: '12px' }}>
              <span style={{ fontWeight: 600 }}>Region Analysis:</span>
              <div style={{ padding: '8px 12px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', fontSize: '0.85rem' }}>
                {price91 > 0.45 ? (
                  <span style={{ color: '#10b981', fontWeight: 600 }}>
                    🟢 LIBERAL REGION (p &gt; p^A): World price is high. Opportunity cost of guns rises, adversaries disarm, creating a peace dividend. Trade wins.
                  </span>
                ) : price91 >= 0.27 ? (
                  <span style={{ color: '#ef4444', fontWeight: 600 }}>
                    🔴 REALIST REGION (p̃ ≤ p ≤ p^A): Butter is cheap. Opportunity cost of arming drops, triggering heavy arming. Welfare collapses below autarky.
                  </span>
                ) : (
                  <span style={{ color: '#10b981', fontWeight: 600 }}>
                    🟢 EXHAUSTED EXternalities (p &lt; p̃): Aggressor is fully specialized in guns (G_j = L). Standard terms-of-trade gains resume dominating. Trade wins.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          9.2 — INSECURE PROPERTY & EXCHANGE
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "9.2 — Insecure Property" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 9.2: Insecure Property and the Efficiency of Exchange</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              9.2: Skaperdas &amp; Syropoulos (2002), "Insecure Property and the Efficiency of Exchange," Economic Journal, 112(476), 133–146.
            </p>

            <IntuitionBox title="Is Free Exchange Always Pareto Optimal?">
              {`Under insecure property, the answer is no.
              - The expectation of ex-post tradeability increases the bargaining set: not just contested land, but all output becomes negotiable.
              - This leverages the returns to guns, causing heavy ex-ante arming.
              - A Limited Settlement (contracting only on contested resource splits, then keeping production separate) can be ex-ante Pareto superior.`}
            </IntuitionBox>

            <DefinitionBox title="The Analytical Framework">
              {`Two agents contest secure land $T_i$ and insecure land $T_0$.
              - Neoclassical production: $F(T, L)$, concave, CRS.
              - Expected payoffs under conflict (outside option):
              $$U^1 = p F(T_1 + T_0, R_1 - G_1) + (1-p) F(T_1, R_1 - G_1)$$
              where $p(G_1, G_2)$ is the CSF.
              - Given guns, dividing the resource Pareto-dominates conflict due to the strict concavity of $F$ in land (sure share beats the lottery).`}
            </DefinitionBox>

            <DefinitionBox title="Two Regimes: Limited Settlement vs. Exchange">
              {`- Limited Settlement: Agents divide the contested land only (Nash share $\\gamma$), then consume separate outputs:
              $$V^1 = F(T_1 + \\gamma T_0, R_1 - G_1)$$
              - Exchange: Agents divide land, then combine all factors in ex-post efficient pooled production $F(T, L)$, splitting the returns via Nash-bargaining:
              $$\\lambda(G_1, G_2) = \\frac{1}{2} \\left[ 1 + \\frac{U^1 - U^2}{F(T, L)} \\right]$$
              Since bargaining power prices the entire output, the effective contest extends to all GDP under Exchange, boosting the incentive to arm.`}
            </DefinitionBox>

            <DerivationBox title="Proposition 1 (Symmetric Agents)">
              {`With identical endowments and symmetric Nash sharing:
              1. Each agent arms strictly less under Limited Settlement than under Exchange:
              $$G^{LS} < G^{EX}$$
              2. Both agents obtain higher ex-ante payoffs under Limited Settlement:
              $$V^{LS} > V^{EX}$$
              Because identical agents have no ex-post gains from trade to lose, Exchange is purely rent-dissipating.`}
            </DerivationBox>

            <LessonQuiz 
              title="Lesson 9.2"
              questions={[
                {
                  question: "Q15.1 Given guns, dividing the contested resource in proportion to winning probabilities dominates fighting because:",
                  options: [
                    "fighting is illegal",
                    "F is strictly concave in land, so the sure share beats the lottery with the same mean",
                    "guns are refundable",
                    "the CSF is symmetric"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! By Jensen’s inequality, the concavity of the production function ensures that risk-neutral expected payoffs are lower than the sure yield of the average land allocation."
                },
                {
                  question: "Q15.2 The deep reason Exchange induces more arming than Limited Settlement is that:",
                  options: [
                    "exchange requires more transport",
                    "under Exchange the effective contest extends over the whole output, not just the disputed land, so the marginal return to improving one’s threat point is larger",
                    "bargaining is impossible under Exchange",
                    "guns are cheaper under Exchange"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Because bargaining pools output, relative arming scales the entire production surplus, which amplifies the marginal return to buying guns."
                },
                {
                  question: "Q15.3 With identical agents, Proposition 1 implies:",
                  options: [
                    "Exchange Pareto-dominates because gains from trade are maximal",
                    "Limited Settlement Pareto-dominates: it induces less arming, and identical agents have no ex post gains from trade to lose",
                    "both regimes are equivalent",
                    "conflict is the unique equilibrium"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! If agents are identical, trade gains are zero, meaning the extra arming induced by Exchange represents a pure waste of labor resources."
                },
                {
                  question: "Q15.4 Exchange is more likely to be ex ante Pareto dominant when:",
                  options: [
                    "endowments are dissimilar, the contested resource is important in production, and insecurity is low",
                    "endowments are identical",
                    "insecurity is maximal",
                    "labor is the dominant input"
                  ],
                  correctIndex: 0,
                  explanation: "Correct! Dissimilar endowments provide massive trade gains, and low insecurity contains the arming differential, allowing Exchange to win."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Payoff Frontiers: Limited Settlement vs. Exchange</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr 1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>Contested Land (T0): <span className="val-highlight">{contestedT0.toFixed(1)}</span></label>
                <input type="range" min="1.0" max="5.0" step="0.5" value={contestedT0} onChange={e => setContestedT0(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>Contest Effectiveness (m): <span className="val-highlight">{contestM.toFixed(2)}</span></label>
                <input type="range" min="0.2" max="1.0" step="0.1" value={contestM} onChange={e => setContestM(Number(e.target.value))} className="range-slider" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 250 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                {/* Grid */}
                <line x1="30" y1="20" x2="30" y2="190" stroke="#334155" />
                <line x1="30" y1="190" x2="230" y2="190" stroke="#334155" />

                {/* Nirvana Frontier (D1D2) */}
                <path d="M 30 50 Q 120 50 190 190" fill="none" stroke="#10b981" strokeWidth="2.5" />
                <text x="180" y="80" fill="#10b981" fontSize="7">D1D2 (Nirvana)</text>

                {/* Limited Settlement Frontier (B1B2) */}
                {(() => {
                  const lsShift = contestedT0 * contestM * 6;
                  const cp1Y = 80 + lsShift;
                  const cp2X = 160 - lsShift;
                  return (
                    <path d={`M 30 ${cp1Y} Q 100 ${cp1Y} ${cp2X} 190`} fill="none" stroke="#f97316" strokeWidth="2" />
                  );
                })()}
                <text x="110" y="125" fill="#f97316" fontSize="7">B1B2 (Ltd Settl.)</text>

                {/* Exchange Frontier (C1C2) */}
                {(() => {
                  const exShift = contestedT0 * contestM * 14;
                  const ptY = 110 + exShift;
                  const ptX = 135 - exShift;
                  return (
                    <line x1="30" y1={ptY} x2={ptX} y2="190" stroke="#8b5cf6" strokeWidth="2" />
                  );
                })()}
                <text x="50" y="170" fill="#8b5cf6" fontSize="7">C1C2 (Exchange)</text>

                {/* Conflict point A */}
                {(() => {
                  const ptShift = contestedT0 * contestM * 12;
                  const ptX = 75 - ptShift;
                  const ptY = 150 + ptShift;
                  return (
                    <g>
                      <circle cx={ptX} cy={ptY} r="4" fill="#ef4444" />
                      <text x={ptX + 6} y={ptY + 2} fill="#ef4444" fontSize="7">A (Conflict)</text>
                    </g>
                  );
                })()}

                <text x="35" y="30" fill="var(--text-muted)" fontSize="8">U2</text>
                <text x="210" y="185" fill="var(--text-muted)" fontSize="8">U1</text>
              </svg>
            </div>

            <div className="implications-panel" style={{ marginTop: '12px' }}>
              <span style={{ fontWeight: 600 }}>Simulation Output:</span>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                - Arms under Exchange: <span className="val-highlight">{(0.5 * contestedT0 * contestM * 8).toFixed(2)} guns</span><br />
                - Arms under Limited Settlement: <span className="val-highlight-orange">{(0.5 * contestedT0 * contestM * 4).toFixed(2)} guns</span><br />
                <span style={{ display: 'block', marginTop: '6px', fontSize: '0.75rem', fontStyle: 'italic' }}>
                  Notice that increasing contested land (T0) or contest effectiveness (m) shifts the Exchange frontier (C1C2) inward much faster than Limited Settlement (B1B2) due to massive arming incentives.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          9.3 — TRADE AND INSECURE RESOURCES (GE)
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "9.3 — Trade & Resource GE" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 9.3: General Equilibrium Trade &amp; Insecure Resources</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              9.3: Garfinkel, Skaperdas &amp; Syropoulos (2015), "Trade and Insecure Resources," JIE, 95(1), 98–114; companion: GSS (2008), "Globalization and Domestic Conflict," JIE, 76(2), 296–308.
            </p>

            <IntuitionBox title="Heckscher-Ohlin General Equilibrium Insights">
              {`Let's generalize to full neoclassical general equilibrium with asymmetric countries:
              - Price thresholds determine arming incentives: trade pacifies or exacerbates disputes based on the world price of the contested-resource-intensive good.
              - What is traded matters less than what is contested: Exchanging final goods made with insecure inputs transmits the exact same security externality as trading the inputs directly.
              - Welfare is non-monotone in openness: gains from trade compete with resource waste on guns.`}
            </IntuitionBox>

            <DefinitionBox title="The Domestic Conflict Companion (GSS 2008)">
              {`Turning the apparatus inward: two domestic factions dispute ownership of a resource.
              - Globalization links the domestic price of this resource's output to world price $p$.
              - Commodity Price Boom as a Conflict Shock: A rise in world commodity prices increases the value of the prize $T_0$, which triggers factions to divert labor into arming. This is the resource curse in conflict form.`}
            </DefinitionBox>

            <DerivationBox title="The Envelope Equation in General Equilibrium">
              {`The structural welfare derivative remains:
              $$\\frac{d \\tilde{V}^F_i}{dp} = \\Gamma p^{-\\beta} \\left[ -M^F_i + T_0 \\phi_{Gj} \\frac{d G^F_j}{dp} \\right]$$
              Surviving general Heckscher-Ohlin production structures, this formula highlights that trade-induced changes in security policy are price-dependent.`}
            </DerivationBox>

            <LessonQuiz 
              title="Lesson 9.3"
              questions={[
                {
                  question: "Q16.1 In GSS (2015), security policies are “trade-regime dependent” because:",
                  options: [
                    "armies require imported equipment",
                    "the trade regime determines product and hence relative factor prices, which set the marginal cost of producing military force",
                    "defense is a public good",
                    "the WTO regulates arming"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Goods prices shape factor prices (via Stolper-Samuelson), which in turn alters the opportunity cost of mobilizing labor into arming."
                },
                {
                  question: "Q16.2 Restricting trade only in the contested input is insufficient because:",
                  options: [
                    "smuggling is inevitable",
                    "goods trade embodies factor content: exchanging secure final goods made with insecure inputs transmits the same security externality",
                    "the contested input is never traded",
                    "final goods are always secure"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! The factor content of final tradeable goods is sufficient to tranship the security externality, meaning input restrictions are easily bypassed by trade in final products."
                },
                {
                  question: "Q16.3 In GSS (2008), globalization intensifies domestic conflict when:",
                  options: [
                    "the country imports the contested-resource-intensive good",
                    "the world price of the good produced with the contested resource exceeds its autarky level, raising the value of the prize",
                    "tariffs are high",
                    "groups are identical"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! High world prices appreciate the domestic prize value, sparking higher domestic conflict over resource control."
                },
                {
                  question: "Q16.4 The welfare comparison of trade regimes between adversaries is:",
                  options: [
                    "always in favor of free trade, by the gains-from-trade theorem",
                    "non-monotone: gains from trade compete with induced changes in arming, and either can dominate",
                    "always in favor of autarky",
                    "independent of world prices"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Trade is only superior if price conditions generate a peace dividend or if terms-of-trade gains exceed the arming diversion."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Toggle: International vs. Domestic Conflict Dynamics</span>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button onClick={() => setMode93("international")} className={`quiz-btn ${mode93 === "international" ? "quiz-btn-primary" : "quiz-btn-secondary"}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                GSS (2015) International Trade
              </button>
              <button onClick={() => setMode93("domestic")} className={`quiz-btn ${mode93 === "domestic" ? "quiz-btn-primary" : "quiz-btn-secondary"}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                GSS (2008) Domestic Conflict
              </button>
            </div>

            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr', padding: '12px', marginTop: '12px' }}>
              <div className="slider-card">
                <label>Relative Price of Resource-intensive Good (p): <span className="val-highlight">{price93.toFixed(2)}</span></label>
                <input type="range" min="0.20" max="2.00" step="0.10" value={price93} onChange={e => setPrice93(Number(e.target.value))} className="range-slider" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="160" viewBox="0 0 400 160" style={{ background: '#0f172a', borderRadius: '6px' }}>
                <line x1="50" y1="20" x2="50" y2="130" stroke="#334155" />
                <line x1="50" y1="130" x2="350" y2="130" stroke="#334155" />

                {/* Draw curve representing Guns as function of price */}
                {(() => {
                  let points = [];
                  for (let i = 0; i <= 30; i++) {
                    const pVal = 0.2 + (i / 30) * 1.8;
                    const gunsVal = mode93 === "domestic" ? 20 + pVal * 40 : 100 / pVal;
                    const x = 50 + (i / 30) * 300;
                    const y = 130 - Math.min(100, gunsVal);
                    points.push(`${x} ${y}`);
                  }
                  return (
                    <path d={`M ${points.join(" L ")}`} fill="none" stroke="var(--accent-primary)" strokeWidth="3" />
                  );
                })()}

                {/* Current Dot */}
                {(() => {
                  const currentGuns = mode93 === "domestic" ? 20 + price93 * 40 : 100 / price93;
                  const x = 50 + ((price93 - 0.2) / 1.8) * 300;
                  const y = 130 - Math.min(100, currentGuns);
                  return (
                    <circle cx={x} cy={y} r="6" fill="#ef4444" stroke="#fff" />
                  );
                })()}

                <text x="60" y="30" fill="var(--text-muted)" fontSize="8">Guns (Conflict Intensity)</text>
                <text x="330" y="120" fill="var(--text-muted)" fontSize="8" textAnchor="end">Price p</text>
              </svg>
            </div>

            <div className="implications-panel" style={{ marginTop: '12px' }}>
              <span style={{ fontWeight: 600 }}>Causal Mechanism:</span>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {mode93 === "domestic" ? (
                  <span>
                    ⚠️ <strong>Commodity Prize Appreciates:</strong> A rise in price ($p = {price93.toFixed(2)}$) boosts resource rents. This increases the domestic prize value, sucking labor from butter production into arming. (Guns = <span className="val-highlight">{(20 + price93 * 40).toFixed(1)}%</span> of labor).
                  </span>
                ) : (
                  <span>
                    ℹ️ <strong>Opportunity Cost Shift:</strong> A rise in price ($p = {price93.toFixed(2)}$) increases the wages in productive labor. This raises the opportunity cost of arming, suppressing guns. (Guns = <span className="val-highlight">{(100 / price93).toFixed(1)}%</span> of labor).
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          9.4 — ENEMIES & FRIENDS (LARGE COUNTRIES)
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "9.4 — Enemies & Friends" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 9.4: Enemies &amp; Friends in the Global Economy</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              9.4: Garfinkel, Syropoulos &amp; Yotov (2020), "Arming in the Global Economy: The Importance of Trade with Enemies and Friends," Journal of International Economics, 123, 103295.
            </p>

            <IntuitionBox title="Terms-of-Trade Discipline in Large Countries">
              {`When adversaries are large, arming changes world prices:
              - Trade with the Enemy: Depresses the price of the resource-intensive good the aggressor sells. This self-inflicted terms-of-trade loss acts as a tax on arming, shifting best-response curves inward.
              - Trade with Friends Only: Capturing resources allows selling to a friendly third country at fixed prices, magnifying the prize and shifting best responses outward.`}
            </IntuitionBox>

            <DefinitionBox title="The Pacification Mechanics">
              {`- Trade with Enemy: Pacifying when initial endowments are similar. Both arm less, wasting fewer resources.
              - Trade with Friends Only: Conflict-enhancing. Both countries arm more, which can easily swamp standard trade gains.
              - Sanctions interpretation: Refusing to trade with enemies removes the price discipline, possibly leading to heavier arming.`}
            </DefinitionBox>

            <LessonQuiz 
              title="Lesson 9.4"
              questions={[
                {
                  question: "Q17.1 In GSY (2020), trade between the two adversaries:",
                  options: [
                    "raises each one’s incentive to arm given the rival’s arming",
                    "lowers each one’s incentive to arm given the rival’s arming: extra guns depress the price of the resource-intensive good the aggressor sells, a self-inflicted terms-of-trade loss",
                    "leaves arming unchanged",
                    "is assumed impossible"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Large countries internalize the price collapse of their resource exports caused by expanding output via conquest, which penalizes arming."
                },
                {
                  question: "Q17.2 When the two adversaries trade only with a third, friendly country:",
                  options: [
                    "conflict intensifies: both arm more, and welfare can fall below autarky despite the gains from trade",
                    "conflict disappears",
                    "aggregate arming falls",
                    "the friend arms instead"
                  ],
                  correctIndex: 0,
                  explanation: "Correct! The third-party market absorbs the looted output without local price penalties, encouraging aggressive arming."
                },
                {
                  question: "Q17.3 With sufficiently different endowment mixes, a move to trade between adversaries:",
                  options: [
                    "always benefits both",
                    "can induce one country to arm more and lose, but aggregate arming still falls",
                    "causes war",
                    "has no effect on arming"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Large endowment differences mean the exporter of the non-conflict good has less price discipline, but overall bilateral arming still shrinks."
                },
                {
                  question: "Q17.4 The channel that makes security policies trade-regime dependent here, and that was absent in Lessons 14 and 16, is:",
                  options: [
                    "the opportunity-cost-of-guns channel",
                    "the terms-of-trade channel: the adversaries are large, so arming moves world prices",
                    "the revenue channel",
                    "the exchange-rate channel"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! The large-country setup introduces relative price feed-backs that act directly on resource extraction rents."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Game Theory: Best Response Curve Shifts</span>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button onClick={() => setMode94("enemies")} className={`quiz-btn ${mode94 === "enemies" ? "quiz-btn-primary" : "quiz-btn-secondary"}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                Trade with Enemy (Pacifying)
              </button>
              <button onClick={() => setMode94("friends")} className={`quiz-btn ${mode94 === "friends" ? "quiz-btn-primary" : "quiz-btn-secondary"}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                Trade with Friends Only (Inflaming)
              </button>
            </div>

            <div className="svg-wrapper" style={{ marginTop: '12px' }}>
              <svg width="100%" height="220" viewBox="0 0 220 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                {/* Axis lines */}
                <line x1="30" y1="20" x2="30" y2="190" stroke="#334155" />
                <line x1="30" y1="190" x2="200" y2="190" stroke="#334155" />

                {/* Autarky reference curves (dotted) */}
                {/* G2 = 7 - 0.5*G1, G1 = 7 - 0.5*G2 */}
                <line x1="30" y1="90" x2="170" y2="160" stroke="#475569" strokeDasharray="2 2" />
                <line x1="90" y1="20" x2="160" y2="160" stroke="#475569" strokeDasharray="2 2" />
                <circle cx="116.6" cy="133.3" r="4" fill="#475569" />
                <text x="122" y="130" fill="#475569" fontSize="6">Autarky Nash (3.5, 3.5)</text>

                {mode94 === "enemies" ? (
                  <>
                    {/* Shifted Inwards */}
                    {/* G2 = 5 - 0.4*G1 */}
                    <line x1="30" y1="110" x2="180" y2="170" stroke="var(--accent-primary)" strokeWidth="2" />
                    {/* G1 = 5 - 0.4*G2 */}
                    <line x1="110" y1="20" x2="170" y2="170" stroke="#8b5cf6" strokeWidth="2" />
                    <circle cx="127.1" cy="148.5" r="5" fill="#10b981" />
                    <text x="133" y="145" fill="#10b981" fontSize="7" fontWeight="bold">Enemy Nash (2.2, 2.2)</text>
                  </>
                ) : (
                  <>
                    {/* Shifted Outwards */}
                    {/* G2 = 9 - 0.6*G1 */}
                    <line x1="30" y1="70" x2="160" y2="148" stroke="var(--accent-primary)" strokeWidth="2" />
                    {/* G1 = 9 - 0.6*G2 */}
                    <line x1="70" y1="20" x2="148" y2="160" stroke="#8b5cf6" strokeWidth="2" />
                    <circle cx="102.5" cy="113.7" r="5" fill="#ef4444" />
                    <text x="108" y="110" fill="#ef4444" fontSize="7" fontWeight="bold">Friend Nash (5.5, 5.5)</text>
                  </>
                )}

                <text x="35" y="30" fill="var(--text-muted)" fontSize="8">G2 (Country 2)</text>
                <text x="180" y="185" fill="var(--text-muted)" fontSize="8">G1 (Country 1)</text>
              </svg>
            </div>

            <div className="implications-panel" style={{ marginTop: '12px' }}>
              <span style={{ fontWeight: 600 }}>Best Response Analysis:</span>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {mode94 === "enemies" ? (
                  <span>
                    🛡️ <strong>PACIFYING SHIFT:</strong> Best-response curves shift inward (to the bottom-left). Direct trade forces large adversaries to internalize the output price dump, leading to lower equilibrium arming.
                  </span>
                ) : (
                  <span>
                    ⚠️ <strong>INFLAMING SHIFT:</strong> Best-response curves shift outward (to the top-right). Trading with allies allows exporting the contested resource at stable prices, prompting heavier bilateral militarization.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          9.5 — WAR, PEACE, AND COMMITMENT
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "9.5 — War, Peace & Commitment" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 9.5: War, Peace, and Commitment</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              9.5: Garfinkel &amp; Syropoulos (2019), "Problems of Commitment in Arming and War: How Insecurity and Destruction Matter," Public Choice, 178(3–4), 349–369; and Garfinkel &amp; Syropoulos (2021), "Self-Enforcing Peace Agreements that Preserve the Status Quo," Games and Economic Behavior, 130, 148–178.
            </p>

            <IntuitionBox title="Why Do Wars Happen if Settlement Dominates?">
              {`If dividing resources always beats fighting for any given guns (Lesson 9.2), what causes open warfare?
              - Commitment problems in dynamic arming. A settlement today must be re-defended tomorrow, incurring arming costs indefinitely.
              - War as a costly commitment device: a decisive war today eliminates future threat points, locking in ownership and saving future defense costs.`}
            </IntuitionBox>

            <DefinitionBox title="Unarmed Peace vs. War (GS 2021)">
              {`In a single-period guns-vs-butter model:
              - Unarmed Peace: An agreement to freeze the status quo distribution with zero arming ($G_i = 0$).
              - War: Conflict breaks out, destroying a fraction $1 - d$ of total output.
              - Equilibrium requires immunity to both unilateral and coalitional deviations. For unarmed peace to be stable, the threat of war must be sufficiently destructive.`}
            </DefinitionBox>

            <DerivationBox title="Predation Constraints and Ex-Ante Transfers">
              {`If initial endowments are highly unequal, the poor agent has a strong incentive to arm and predate.
              - Voluntary Resource Transfers: The rich country can voluntarily cede a portion of its resources to buy peace, ceding just enough to satisfy the poor country's predation constraint. This only works for intermediate destruction parameters.`}
            </DerivationBox>

            <LessonQuiz 
              title="Lesson 9.5"
              questions={[
                {
                  question: "Q18.1 In GS (2019), war can rationally be chosen over settlement, despite Lesson 15’s dominance result, because:",
                  options: [
                    "agents are irrational",
                    "settlement must be re-defended by costly arming every period, while a decisive war locks in control and eliminates future arming costs — war is a costly commitment device",
                    "war is never destructive",
                    "information is incomplete"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! The long-run discounted savings of not having to buy guns ever again can outweigh the destruction costs of an immediate war."
                },
                {
                  question: "Q18.2 GS (2021) show that unarmed peace preserving the status quo is stable at every endowment distribution only if:",
                  options: [
                    "output is fully insecure",
                    "war is destructive — the savings on guns alone are an insufficient peace dividend",
                    "agents are identical",
                    "transfers are prohibited"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! If war has no destructive cost, a country always has incentives to arm and attempt to conquer more, so unarmed peace collapses."
                },
                {
                  question: "Q18.3 The equilibrium concept in GS (2021) requires immunity to:",
                  options: [
                    "unilateral deviations only",
                    "both unilateral and coalitional deviations",
                    "trembling-hand perturbations",
                    "renegotiation only"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! The status-quo agreement must resist both single-agent predatory arming and joint shifts back to militarized bargaining."
                },
                {
                  question: "Q18.4 Ex ante resource transfers without commitment:",
                  options: [
                    "never help",
                    "can improve the prospects for peace, but only for some configurations of output security and war’s destructiveness",
                    "always guarantee peace",
                    "are equivalent to arming"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Transferring land or labor cedes relative capacity; if war is not destructive enough, this redistribution just fuels the rival's capability."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Visual Stability: Unarmed Peace Wedge Diagram</span>
            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr 1fr', padding: '12px', gap: '12px' }}>
              <div className="slider-card">
                <label>War Survivability (d): <span className="val-highlight">{warSurvivability.toFixed(2)}</span></label>
                <input type="range" min="0.10" max="0.90" step="0.05" value={warSurvivability} onChange={e => setWarSurvivability(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>Agent 1 Resource Share (s): <span className="val-highlight">{agent1Share.toFixed(2)}</span></label>
                <input type="range" min="0.10" max="0.90" step="0.05" value={agent1Share} onChange={e => setAgent1Share(Number(e.target.value))} className="range-slider" />
              </div>
            </div>

            <div className="svg-wrapper">
              <svg width="100%" height="220" viewBox="0 0 220 220" style={{ background: '#0f172a', borderRadius: '6px' }}>
                {/* Axis */}
                <line x1="30" y1="20" x2="30" y2="190" stroke="#334155" />
                <line x1="30" y1="190" x2="200" y2="190" stroke="#334155" />

                {/* Wedge Polygon: Unarmed peace stable where d is low (high destruction) and s is near 0.5 */}
                {/* Coordinates mapping: X: 30 + s*170, Y: 190 - d*170 */}
                {/* Wedge apex at (s=0.5, d=0.85), base at (s=0.2, d=0.1) and (s=0.8, d=0.1) */}
                <polygon
                  points="115 45, 64 173, 166 173"
                  fill="rgba(16, 185, 129, 0.15)"
                  stroke="#10b981"
                  strokeWidth="1.5"
                />

                {/* Current Dot */}
                {(() => {
                  const x = 30 + agent1Share * 170;
                  const y = 190 - warSurvivability * 170;
                  // Stability calculation
                  const minS = 0.5 - 0.35 * (1 - warSurvivability);
                  const maxS = 0.5 + 0.35 * (1 - warSurvivability);
                  const isStable = warSurvivability <= 0.85 && agent1Share >= minS && agent1Share <= maxS;

                  return (
                    <g>
                      <circle cx={x} cy={y} r="6" fill={isStable ? "#10b981" : "#ef4444"} stroke="#fff" />
                      <line x1="30" y1={y} x2="200" y2={y} stroke="#475569" strokeDasharray="2 2" opacity="0.5" />
                      <line x1={x} y1="20" x2={x} y2="190" stroke="#475569" strokeDasharray="2 2" opacity="0.5" />
                    </g>
                  );
                })()}

                <text x="35" y="30" fill="var(--text-muted)" fontSize="8">Survivability (d)</text>
                <text x="180" y="185" fill="var(--text-muted)" fontSize="8">Share (s)</text>
              </svg>
            </div>

            <div className="implications-panel" style={{ marginTop: '12px' }}>
              <span style={{ fontWeight: 600 }}>Stability Status:</span>
              <div style={{ padding: '8px 12px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', fontSize: '0.85rem' }}>
                {(() => {
                  const minS = 0.5 - 0.35 * (1 - warSurvivability);
                  const maxS = 0.5 + 0.35 * (1 - warSurvivability);
                  const isStable = warSurvivability <= 0.85 && agent1Share >= minS && agent1Share <= maxS;
                  return isStable ? (
                    <span style={{ color: '#10b981', fontWeight: 600 }}>
                      🟢 UNARMED PEACE STABLE: High destruction cost (survivability d = {warSurvivability.toFixed(2)}) and equalized resources deter predation.
                    </span>
                  ) : (
                    <span style={{ color: '#ef4444', fontWeight: 600 }}>
                      🔴 COLLAPSE TO WAR/ARMING: Survivability is too high, or distribution is too unequal (s = {agent1Share.toFixed(2)}). An agent deviates to arm.
                    </span>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          9.6 — PRUDENCE VERSUS PREDATION
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "9.6 — Prudence & Predation" && (
        <div className="svg-canvas-row">
          <div className="svg-canvas-card">
            <h3>Lesson 9.6: Prudence versus Predation</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              9.6: Garfinkel, Syropoulos &amp; Zylkin (2022), "Prudence versus Predation and the Gains from Trade," Journal of Economic Theory, 201.
            </p>

            <IntuitionBox title="Prudent Investment vs. Predatory Arming">
              {`In a dynamic two-period setting:
              - Period 1: Countries decide whether to consume, invest in future capital, or buy arms.
              - Prudence vs. Predation: The resource-poor country has lower returns to investment, so it tilts its portfolio toward arms to "prey" on the richer country's "prudent" capital investment.
              - Higher conflict probability $\\rho$ amplifies this predatory arming bias.`}
            </IntuitionBox>

            <DefinitionBox title="The Security Externality of Trade">
              {`- Trade shifts the relative wealth: Trade increases incomes, but the poorer country realizes a relatively larger percentage income gain.
              - Adverse Power Shift: Because it is predatory, the poor country converts a disproportionate share of its trade gains into arming, shifting the future balance of power.
              - Endogenous trade refusal: The rich country choosing autarky to prevent the rise of the adversary.`}
            </DefinitionBox>

            <LessonQuiz 
              title="Lesson 9.6"
              questions={[
                {
                  question: "Q19.1 In GSZ (2022), a positive probability of future conflict induces:",
                  options: [
                    "the richer country to arm relatively more",
                    "the poorer country to “prey” on the richer rival’s prudence by tilting its portfolio toward arms, more so as conflict becomes more likely",
                    "both countries to disarm",
                    "immediate war"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! The poorer country has lower marginal returns to productive investment, which makes arming relatively more lucrative as conflict risk rises."
                },
                {
                  question: "Q19.2 Although trade raises both countries’ current incomes, the richer country may refuse it because:",
                  options: [
                    "the gains from trade are negative for large countries",
                    "the poorer country gains relatively more and converts a relatively larger share of its gain into arming, shifting the future balance of power against the rich country",
                    "tariff revenue is lost",
                    "consumers prefer domestic goods"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! The wealth-redistributing effect of trade increases the poor country's relative arming capacity, threatening the rich country's future assets."
                },
                {
                  question: "Q19.3 The richer country is more likely to choose autarky when:",
                  options: [
                    "the wealth gap is small and conflict is unlikely",
                    "the initial wealth difference is large and the probability of future conflict is high",
                    "both countries are poor",
                    "arms are ineffective"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! Large initial wealth gaps mean the poor country has extreme predation incentives, and high conflict risk makes those incentives dominate."
                },
                {
                  question: "Q19.4 The empirical episode the paper uses as suggestive evidence is:",
                  options: [
                    "the Napoleonic blockade",
                    "the period surrounding the end of the Cold War",
                    "the 1930s tariff wars",
                    "Bretton Woods"
                  ],
                  correctIndex: 1,
                  explanation: "Correct! The relaxation of perceived conflict risks at the end of the Cold War led immediately to Western trade openings with former adversaries."
                }
              ]}
            />
          </div>

          <div className="svg-canvas-card">
            <span className="svg-title">📊 Step-through: Intertemporal Prudence &amp; Predation Timeline</span>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {[0, 1, 2].map(stepIdx => (
                <button
                  key={stepIdx}
                  onClick={() => setPortfolioStep(stepIdx)}
                  className={`quiz-btn ${portfolioStep === stepIdx ? "quiz-btn-primary" : "quiz-btn-secondary"}`}
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                >
                  Step {stepIdx + 1}
                </button>
              ))}
            </div>

            <div className="sliders-grid" style={{ gridTemplateColumns: '1fr 1fr', padding: '12px', gap: '12px', marginTop: '12px', marginBottom: '0' }}>
              <div className="slider-card">
                <label>Conflict Risk (ρ): <span className="val-highlight">{conflictProb.toFixed(2)}</span></label>
                <input type="range" min="0.0" max="1.0" step="0.1" value={conflictProb} onChange={e => setConflictProb(Number(e.target.value))} className="range-slider" />
              </div>
              <div className="slider-card">
                <label>Initial Wealth Gap: <span className="val-highlight">{wealthGap.toFixed(1)}x</span></label>
                <input type="range" min="1.0" max="3.0" step="0.2" value={wealthGap} onChange={e => setWealthGap(Number(e.target.value))} className="range-slider" />
              </div>
            </div>

            {portfolioStep === 0 && (
              <div className="svg-wrapper" style={{ minHeight: '120px', flexDirection: 'column', gap: '12px' }}>
                <strong>Step 1: Period 1 Portfolio Allocation</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                  - Rich Country 1 invests <span className="val-highlight">{(80 - conflictProb * 40).toFixed(0)}%</span> in productive capacity (Prudence).<br />
                  - Poor Country 2 invests <span className="val-highlight-orange">{(30 + conflictProb * 50).toFixed(0)}%</span> in arming (Predation).<br />
                  As conflict probability $\rho$ rises, Country 2 aggressively builds weapons to plunder Country 1.
                </div>
              </div>
            )}

            {portfolioStep === 1 && (
              <div className="svg-wrapper" style={{ minHeight: '120px', flexDirection: 'column', gap: '12px' }}>
                <strong>Step 2: Welfare Gains and Arming Resources</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                  Under trade, Country 2 realizes a <span className="val-highlight-orange">{(25 * wealthGap).toFixed(0)}%</span> wealth boost compared to Country 1's <span className="val-highlight">10%</span> boost.
                  Because of high conflict risk, Country 2 channels <span className="val-highlight-orange">{(conflictProb * 70).toFixed(0)}%</span> of these new trade gains directly into expanding its military.
                </div>
              </div>
            )}

            {portfolioStep === 2 && (
              <div className="svg-wrapper" style={{ minHeight: '120px', flexDirection: 'column', gap: '12px' }}>
                <strong>Step 3: Rich Country's Decision (Period 1 Trade Refusal)</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                  {conflictProb * wealthGap > 0.9 ? (
                    <span style={{ color: '#ef4444', fontWeight: 600 }}>
                      ❌ AUTARKY CHOSEN: Country 1 refuses trade. The risk of feeding Country 2's predatory growth outweighs the static gains of exchange.
                    </span>
                  ) : (
                    <span style={{ color: '#10b981', fontWeight: 600 }}>
                      ✔ TRADE ACCEPTED: Low conflict risk and small wealth gaps make the security threat manageable.
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          9.7 — FRONTIER RESEARCH
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "9.7 — Frontier Research" && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="svg-canvas-card" style={{ width: '100%' }}>
            <h3>Lesson 9.7: The Research Frontier</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
              9.7: Garfinkel &amp; Syropoulos (2025); Camacho, Garfinkel, Syropoulos &amp; Yotov (2025); Felbermayr, Morgan, Syropoulos &amp; Yotov (2023).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <DefinitionBox title="GS (2025): War vs. Peace Dynamics">
                {`A dynamic framework where countries arm, then choose war or settlement.
                - War: Precludes trade but eliminates future arming.
                - Armed Peace: Negotiated splits are supported by guns.
                - Finding: Armed peace is much easier to sustain than complete disarmament.`}
              </DefinitionBox>

              <DefinitionBox title="Camacho et al. (2025): Tech Transfer">
                {`Leader blocks technology transfers to laggards if output security is low.
                - Dual-use technology boosts laggard's productivity, but also its capability to arm.
                - Blocked transfers trigger a low-technology trap.`}
              </DefinitionBox>

              <DefinitionBox title="Felbermayr et al. (2023): Sanctions">
                {`Reframes sanctions as endogenous tools in active interstate disputes, rather than exogenous costs.
                - Sender chooses sanctions to directly manipulate target's arming resources and bargaining power.`}
              </DefinitionBox>
            </div>

            <span className="svg-title" style={{ marginTop: '16px' }}>📊 Synthesis: One Framework, Seven Lessons</span>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              {["All", "Guns", "Bargaining", "Dynamics"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter97(cat)}
                  className={`quiz-btn ${filter97 === cat ? "quiz-btn-primary" : "quiz-btn-secondary"}`}
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--card-border)', textAlign: 'left' }}>
                  <th style={{ padding: '8px' }}>Paper</th>
                  <th style={{ padding: '8px' }}>Margin of Choice</th>
                  <th style={{ padding: '8px' }}>Headline Lesson</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { paper: "SS 2001 (L14)", margin: "Guns vs butter, small open", lesson: "Trade levels the playing field; autarky beats trade for intermediate prices.", category: "Guns" },
                  { paper: "SS 2002 (L15)", margin: "Scope of settlement", lesson: "Ex-post tradeability can expand conflict and Pareto-dominate bargaining.", category: "Bargaining" },
                  { paper: "GSS 2008/2015 (L16)", margin: "Trade regime in GE", lesson: "Security policies are trade-regime dependent; commodity price booms feed conflict.", category: "Bargaining" },
                  { paper: "GSY 2020 (L17)", margin: "Large country trading partners", lesson: "Trade with enemy pacifies (price discipline); trade with friends only inflames.", category: "Guns" },
                  { paper: "GS 2019/2021 (L18)", margin: "War vs settlement", lesson: "War acts as a commitment device; unarmed peace requires destructive war.", category: "Dynamics" },
                  { paper: "GSZ 2022 (L19)", margin: "Trade today vs power tomorrow", lesson: "Richer country refuses trade to avoid financing the rise of a rival.", category: "Dynamics" },
                  { paper: "GS 2025 / Camacho 2025 (L20)", margin: "Dynamics, tech, sanctions", lesson: "Armed peace is stable; dual-use tech transfer triggers low-tech traps.", category: "Dynamics" }
                ].filter(item => filter97 === "All" || item.category === filter97).map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--card-border)' }}>
                    <td style={{ padding: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{item.paper}</td>
                    <td style={{ padding: '8px' }}>{item.margin}</td>
                    <td style={{ padding: '8px' }}>{item.lesson}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          9.8 — FINAL EXAM
          ────────────────────────────────────────────────────────────────── */}
      {moduleTab === "9.8 — Final Exam" && (
        <div className="svg-canvas-row" style={{ gridTemplateColumns: '1fr' }}>
          <div className="svg-canvas-card">
            <h3>Module 9: Final Exam Supplement</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Complete the 10 final exam supplement questions spanning all lessons of Part VII.
            </p>

            {showExamResults && (
              <div style={{ 
                padding: '16px', 
                background: 'rgba(16, 185, 129, 0.08)', 
                border: '1px solid #10b981', 
                borderRadius: '8px', 
                marginBottom: '20px', 
                textAlign: 'center' 
              }}>
                <h4 style={{ color: '#10b981', margin: '0 0 8px 0' }}>Exam Results</h4>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                  Score: {getExamScore()} / 10 ({(getExamScore() * 10).toFixed(0)}%)
                </p>
                <button onClick={resetExam} className="quiz-btn quiz-btn-secondary">
                  Retake Exam
                </button>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {Object.keys(examQuestions).map((qKey) => {
                const q = examQuestions[qKey];
                const isSelected = examAnswers[qKey] !== undefined;

                return (
                  <div key={qKey} style={{ 
                    padding: '16px', 
                    border: '1px solid var(--card-border)', 
                    borderRadius: '8px', 
                    background: 'rgba(255,255,255,0.01)' 
                  }}>
                    <h5 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {q.question}
                    </h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {q.options.map((opt, optIdx) => {
                        let optStyle = {
                          padding: '10px 14px',
                          textAlign: 'left',
                          borderRadius: '6px',
                          border: '1px solid var(--card-border)',
                          background: 'rgba(255,255,255,0.02)',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        };

                        if (examSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optStyle.background = 'rgba(16, 185, 129, 0.15)';
                            optStyle.border = '1px solid #10b981';
                            optStyle.color = '#10b981';
                          } else if (optIdx === examAnswers[qKey]) {
                            optStyle.background = 'rgba(239, 68, 68, 0.15)';
                            optStyle.border = '1px solid #ef4444';
                            optStyle.color = '#ef4444';
                          } else {
                            optStyle.opacity = 0.5;
                          }
                        } else if (examAnswers[qKey] === optIdx) {
                          optStyle.background = 'var(--accent-primary)';
                          optStyle.border = '1px solid var(--accent-primary)';
                          optStyle.color = '#fff';
                        }

                        return (
                          <button
                            key={optIdx}
                            style={optStyle}
                            onClick={() => handleExamSelect(qKey, optIdx)}
                            disabled={examSubmitted}
                          >
                            <span>{opt}</span>
                            {examSubmitted && optIdx === q.correctIndex && <CheckCircle2 size={16} style={{ color: '#10b981' }} />}
                            {examSubmitted && optIdx === examAnswers[qKey] && optIdx !== q.correctIndex && <XCircle size={16} style={{ color: '#ef4444' }} />}
                          </button>
                        );
                      })}
                    </div>

                    {examSubmitted && (
                      <div style={{ 
                        marginTop: '12px', 
                        padding: '12px', 
                        background: 'rgba(255,255,255,0.02)', 
                        borderRadius: '6px', 
                        fontSize: '0.85rem', 
                        color: 'var(--text-secondary)' 
                      }}>
                        <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Explanation: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!examSubmitted && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                <button 
                  onClick={submitExam} 
                  disabled={Object.keys(examAnswers).length < 10} 
                  className="quiz-btn quiz-btn-primary"
                  style={{ padding: '12px 30px', fontSize: '1rem' }}
                >
                  Submit Exam
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
