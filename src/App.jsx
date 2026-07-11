import React, { useState, useEffect, Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: '#f87171', background: '#1e1e2e', minHeight: '60vh', borderRadius: '12px', margin: '40px' }}>
          <h2>⚠️ {this.props.moduleName || 'Module'} Crashed</h2>
          <p><strong>Error:</strong> {this.state.error?.message}</p>
          <pre style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap', marginTop: '16px', color: '#94a3b8' }}>
            {this.state.error?.stack}
          </pre>
          <button onClick={() => this.setState({ hasError: false, error: null })} style={{ marginTop: '16px', padding: '8px 16px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Roadmap from './components/Roadmap';
import TutorTip from './components/TutorTip';
import Quiz from './components/Quiz';
import Module2 from './components/Module2';
import Module3 from './components/Module3';
import Module4 from './components/Module4';
import PPFGraph from './components/PPFGraph';
import SpecializationPanel from './components/SpecializationPanel';
import CPFGraph from './components/CPFGraph';
import RSEquilibriumGraph from './components/RSEquilibriumGraph';
import DFSGraph from './components/DFSGraph';
import ComparativeStaticsGraph from './components/ComparativeStaticsGraph';
import GainsFromTradeGraph from './components/GainsFromTradeGraph';
import Module1Section3 from './components/Module1Section3';
import Module1Section4 from './components/Module1Section4';
import { HelpCircle, RefreshCw, Sparkles, BookOpen, Layers, CheckCircle2, XCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'module1', or 'module2'
  const [theme, setTheme] = useState('dark');
  const [moduleTab, setModuleTab] = useState('theory1'); // 'theory1', 'theory2', 'quiz'

  // --- 2x2 Model State Variables ---
  const [homeL, setHomeL] = useState(100);
  const [foreignL, setForeignL] = useState(200);
  const [homeA1, setHomeA1] = useState(1.0); // Mfg
  const [homeA2, setHomeA2] = useState(2.0); // Agri
  const [foreignA1, setForeignA1] = useState(3.0); // Mfg*
  const [foreignA2, setForeignA2] = useState(2.0); // Agri*
  const [worldPrice, setWorldPrice] = useState(1.2); // P1/P2

  // --- DFS Model State Variables ---
  const [dfsL, setDfsL] = useState(100);
  const [dfsLStar, setDfsLStar] = useState(200);
  const [homeBase, setHomeBase] = useState(1.0);
  const [homeSlope, setHomeSlope] = useState(4.0);
  const [foreignBase, setForeignBase] = useState(3.0);
  const [foreignSlope, setForeignSlope] = useState(1.0);

  // --- Reset Helpers ---
  const reset2x2 = () => {
    setHomeL(100);
    setForeignL(200);
    setHomeA1(1.0);
    setHomeA2(2.0);
    setForeignA1(3.0);
    setForeignA2(2.0);
    setWorldPrice(1.2);
  };

  const resetDFS = () => {
    setDfsL(100);
    setDfsLStar(200);
    setHomeBase(1.0);
    setHomeSlope(4.0);
    setForeignBase(3.0);
    setForeignSlope(1.0);
  };

  // --- Inline Lesson 2 Calculator State ---
  const [calcA1, setCalcA1] = useState(2.0);
  const [calcA2, setCalcA2] = useState(4.0);
  const calcProd1 = calcA1 > 0 ? (1 / calcA1).toFixed(2) : 0;
  const calcProd2 = calcA2 > 0 ? (1 / calcA2).toFixed(2) : 0;

  // --- Micro Quiz Answers State ---
  const [microQuizzes, setMicroQuizzes] = useState({
    lesson3: null, // Comparative vs Absolute
    lesson6: null, // Wage Specialization
    dfsLesson4: null // DFS Relative Wage
  });

  const handleMicroQuizClick = (quizKey, selectedIdx, correctIdx) => {
    setMicroQuizzes(prev => ({
      ...prev,
      [quizKey]: {
        selected: selectedIdx,
        correct: selectedIdx === correctIdx
      }
    }));
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  useEffect(() => {
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [activeTab, moduleTab]);

  const handleStartModule = (moduleId) => {
    if (moduleId === 2) {
      setActiveTab('module2');
    } else if (moduleId === 3) {
      setActiveTab('module3');
    } else if (moduleId === 4) {
      setActiveTab('module4');
    } else {
      setActiveTab('module1');
      setModuleTab('theory1');
    }
  };

  // Opportunities and Specialized calculations for quick display panels
  const oppH = homeA2 > 0 ? (homeA1 / homeA2) : 0;
  const oppF = foreignA2 > 0 ? (foreignA1 / foreignA2) : 0;

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} toggleTheme={toggleTheme} />

      {activeTab === 'home' && (
        <>
          <Hero onStartModule={handleStartModule} />
          <Roadmap onSelectModule={handleStartModule} />
        </>
      )}

      {activeTab === 'module1' && (
        <div className="container" style={{ padding: '40px 24px' }}>
          
          {/* Header */}
          <div className="module-header">
            <button onClick={() => setActiveTab('home')} className="back-btn">
              <span>← Back to Course Path</span>
            </button>
            <div className="module-title-row">
              <div>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Module 1
                </span>
                <h2 style={{ fontSize: '2.25rem', marginTop: '4px' }}>Trade and Technology</h2>
              </div>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="module-sections-nav">
            <button 
              onClick={() => setModuleTab('theory1')} 
              className={`tab-btn ${moduleTab === 'theory1' ? 'active' : ''}`}
            >
              1.1 Two-Good Model (Lessons 1-10)
            </button>
            <button 
              onClick={() => setModuleTab('theory2')} 
              className={`tab-btn ${moduleTab === 'theory2' ? 'active' : ''}`}
            >
              1.2 DFS Continuum Model (Lessons 1-8)
            </button>
            <button 
              onClick={() => setModuleTab('theory3')} 
              className={`tab-btn ${moduleTab === 'theory3' ? 'active' : ''}`}
            >
              1.3 Probabilistic Ideas & The Fréchet Frontier
            </button>
            <button 
              onClick={() => setModuleTab('theory4')} 
              className={`tab-btn ${moduleTab === 'theory4' ? 'active' : ''}`}
            >
              1.4 The Probabilistic Ricardian Model: Integrating EK & DFS
            </button>
            <button 
              onClick={() => setModuleTab('quiz')} 
              className={`tab-btn ${moduleTab === 'quiz' ? 'active' : ''}`}
            >
              Final Quiz Assessment
            </button>
          </div>

          {/* Submodule 1.1 Contents */}
          {moduleTab === 'theory1' && (
            <div>
              {/* Introduction header */}
              <div className="lesson-card" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
                <h3>Module Overview</h3>
                <p>
                  Before studying advanced trade models, it is essential to understand the classical Ricardian framework. 
                  This model proves that countries trade because their **opportunity costs differ**, allowing them to specialize in what they do relatively best and export it. 
                  Below, we break this down into ten lessons, complete with calculators, separate Home and Foreign dynamic charts, and micro-quizzes.
                </p>
              </div>

              {/* Lesson 1 */}
              <div className="lesson-card" id="lesson1">
                <h3>Lesson 1: Why Do Countries Trade?</h3>
                <p>
                  Imagine a world containing just two countries, **Home** and **Foreign**, both containing workers (labor) who produce two types of items: Manufacturing (Mfg) and Agriculture (Agri). 
                  Each country has a limited amount of labor and faces a fundamental trade-off: using a worker to produce Manufacturing means that worker cannot be used to produce Agriculture.
                </p>
                <p>
                  Because their natural resources and technological capabilities are different, the cost of transferring workers between sectors differs. 
                  Rather than trying to be self-sufficient in everything, countries can consume more total goods by specializing and trading.
                </p>
                <TutorTip tip="Every country is constrained by its limited labor supply. The central question of international trade is: How should a country allocate its limited workforce to maximize consumer satisfaction?" />
              </div>

              {/* Lesson 2 */}
              <div className="lesson-card" id="lesson2">
                <h3>Lesson 2: Unit Labor Requirement and Productivity</h3>
                <p>
                  To model this mathematically, we define the **unit labor requirement** (denoted by <em>a₁</em> for Manufacturing and <em>a₂</em> for Agriculture) as:
                </p>
                <div className="math-formula">
                  Unit labor requirement: labor needed to produce 1 unit = Labor hours needed to produce 1 unit of a good
                </div>
                <p>
                  **Labor productivity** is the exact mathematical inverse. It represents how many units of a good a single unit of labor can produce:
                </p>
                <div className="math-formula">
                  Productivity: output produced by 1 unit of labor = 1 / Unit labor requirement
                </div>

                <div style={{ margin: '20px 0', border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--card-border)', color: 'var(--text-primary)', textAlign: 'left' }}>
                        <th style={{ padding: '10px 16px' }}>Good / Sector</th>
                        <th style={{ padding: '10px 16px' }}>Home Unit Labor Requirement</th>
                        <th style={{ padding: '10px 16px' }}>Home Labor Productivity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                        <td style={{ padding: '10px 16px', fontWeight: 600 }}>Manufacturing (Sector 1)</td>
                        <td style={{ padding: '10px 16px' }}>a₁</td>
                        <td style={{ padding: '10px 16px' }}>1 / a₁</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '10px 16px', fontWeight: 600 }}>Agriculture (Sector 2)</td>
                        <td style={{ padding: '10px 16px' }}>a₂</td>
                        <td style={{ padding: '10px 16px' }}>1 / a₂</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Inline Calculator */}
                <div className="interactive-calc">
                  <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--accent-primary)' }}>
                    🧭 Interactive Calculator: Try Changing Unit Labor Requirements
                  </h4>
                  <div className="calc-row">
                    <div className="calc-input-wrapper">
                      <label>a₁ (Mfg labor hours):</label>
                      <input 
                        type="number" className="calc-input" value={calcA1} step="0.5" min="0.1"
                        onChange={(e) => setCalcA1(Math.max(0.1, Number(e.target.value)))} 
                      />
                    </div>
                    <div className="calc-input-wrapper">
                      <label>a₂ (Agri labor hours):</label>
                      <input 
                        type="number" className="calc-input" value={calcA2} step="0.5" min="0.1"
                        onChange={(e) => setCalcA2(Math.max(0.1, Number(e.target.value)))} 
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px' }}>
                    <div className="calc-result">
                      Mfg Productivity (1/a₁): {calcProd1} units/hr
                    </div>
                    <div className="calc-result" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-primary)' }}>
                      Agri Productivity (1/a₂): {calcProd2} units/hr
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '15px', padding: '8px', backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <strong>💡 What to notice:</strong> A lower unit labor requirement means higher productivity.
                  </div>
                </div>
              </div>

              {/* Lesson 3 */}
              <div className="lesson-card" id="lesson3">
                <h3>Lesson 3: Absolute Advantage vs Comparative Advantage</h3>
                <p>
                  Learners often confuse absolute and comparative advantage:
                </p>
                <div className="means-box">
                  <strong>Absolute Advantage</strong>: Refers to who is faster or more productive at producing a good. A country has absolute advantage if its unit labor requirement is lower: <strong>a₁ &lt; a₁*</strong>.
                </div>
                <div className="means-box" style={{ borderColor: 'var(--accent-secondary)' }}>
                  <strong>Comparative Advantage</strong>: Refers to who gives up less to produce a good. It is determined by comparing opportunity costs rather than absolute requirements.
                </div>
                <p>
                  Ricardo's major insight is that **even if a country is worse at producing everything (holds no absolute advantage), it will still gain from trade** by specializing in the good in which it has a comparative advantage.
                </p>

                {/* Check your understanding */}
                <div className="micro-quiz-card">
                  <h4>💡 Check Your Understanding</h4>
                  <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>
                    If Home can produce 1 unit of Mfg in 1 hour and 1 unit of Agri in 2 hours, and Foreign can produce 1 unit of Mfg in 3 hours and 1 unit of Agri in 4 hours, who has the absolute advantage in Agriculture?
                  </p>
                  <div className="micro-quiz-options">
                    <button 
                      className={`micro-quiz-option ${microQuizzes.lesson3?.selected === 0 ? 'correct' : ''}`}
                      onClick={() => handleMicroQuizClick('lesson3', 0, 0)}
                      disabled={microQuizzes.lesson3 !== null}
                    >
                      Home (1 unit takes 2 hours)
                    </button>
                    <button 
                      className={`micro-quiz-option ${microQuizzes.lesson3?.selected === 1 ? 'incorrect' : ''}`}
                      onClick={() => handleMicroQuizClick('lesson3', 1, 0)}
                      disabled={microQuizzes.lesson3 !== null}
                    >
                      Foreign (1 unit takes 4 hours)
                    </button>
                    <button 
                      className={`micro-quiz-option ${microQuizzes.lesson3?.selected === 2 ? 'incorrect' : ''}`}
                      onClick={() => handleMicroQuizClick('lesson3', 2, 0)}
                      disabled={microQuizzes.lesson3 !== null}
                    >
                      Neither
                    </button>
                  </div>
                  {microQuizzes.lesson3 && (
                    <div className={`micro-feedback-box ${microQuizzes.lesson3.correct ? 'correct' : 'incorrect'}`}>
                      {microQuizzes.lesson3.correct 
                        ? "Correct! Home needs only 2 hours of labor compared to Foreign's 4 hours, so Home is absolutely more productive."
                        : "Not quite. Compare the labor requirements for Agri: Home is 2, Foreign is 4. Since Home takes less labor, Home is faster and has absolute advantage."}
                    </div>
                  )}
                </div>
              </div>

              {/* Lesson 4 */}
              <div className="lesson-card" id="lesson4">
                <h3>Lesson 4: Opportunity Cost and Comparative Advantage</h3>
                <p>
                  Opportunity cost measures what you give up. To produce one unit of Manufacturing (which takes <em>a₁</em> hours of labor), Home must redirect labor from Agriculture, meaning it gives up:
                </p>
                <div className="math-formula">
                  Home opportunity cost of Manufacturing = a₁ / a₂ (units of Agriculture given up)
                </div>
                <div className="math-formula" style={{ marginLeft: '12px' }}>
                  Foreign opportunity cost of Manufacturing = a₁* / a₂* (units of Agriculture given up)
                </div>
                <p>
                  Similarly, to produce one unit of Agriculture, the opportunity cost in terms of Manufacturing given up is:
                </p>
                <div className="math-formula">
                  Home opportunity cost of Agriculture = a₂ / a₁ (units of Manufacturing given up)
                </div>
                <div className="math-formula" style={{ marginLeft: '12px' }}>
                  Foreign opportunity cost of Agriculture = a₂* / a₁* (units of Manufacturing given up)
                </div>

                {/* Interactive Sliders Panel */}
                <div className="sliders-container">
                  <h4 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--accent-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Adjust Parameter Sliders</span>
                    <button onClick={reset2x2} className="reset-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <RefreshCw size={12} />
                      <span>Reset</span>
                    </button>
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div className="control-item">
                      <div className="control-label">
                        <span>Home a₁ (Mfg): {homeA1.toFixed(1)}</span>
                      </div>
                      <input type="range" min="0.5" max="8.0" step="0.1" value={homeA1} onChange={(e) => setHomeA1(Number(e.target.value))} className="control-slider" />
                    </div>
                    <div className="control-item">
                      <div className="control-label">
                        <span>Home a₂ (Agri): {homeA2.toFixed(1)}</span>
                      </div>
                      <input type="range" min="0.5" max="8.0" step="0.1" value={homeA2} onChange={(e) => setHomeA2(Number(e.target.value))} className="control-slider" />
                    </div>
                    <div className="control-item">
                      <div className="control-label">
                        <span>Foreign a₁* (Mfg): {foreignA1.toFixed(1)}</span>
                      </div>
                      <input type="range" min="0.5" max="8.0" step="0.1" value={foreignA1} onChange={(e) => setForeignA1(Number(e.target.value))} className="control-slider" />
                    </div>
                    <div className="control-item">
                      <div className="control-label">
                        <span>Foreign a₂* (Agri): {foreignA2.toFixed(1)}</span>
                      </div>
                      <input type="range" min="0.5" max="8.0" step="0.1" value={foreignA2} onChange={(e) => setForeignA2(Number(e.target.value))} className="control-slider" />
                    </div>
                  </div>
                  <div className="try-this-box">
                    <strong>💡 Try This:</strong> Increase Home's <em>a₁</em> to 4.0 and decrease <em>a₂</em> to 1.0. Notice how the opportunity cost ratio shifts and comparative advantage swings.
                  </div>
                </div>

                {/* CA determination box */}
                <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 'var(--border-radius-md)' }}>
                  <h5 style={{ color: 'var(--accent-success)', marginBottom: '8px' }}>Comparative Advantage Results (Dynamic)</h5>
                  <ul style={{ listStyleType: 'none', paddingLeft: 0, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li>• Home opportunity cost of Manufacturing (a₁/a₂): <strong>{oppH.toFixed(2)}</strong> units of Agri</li>
                    <li>• Foreign opportunity cost of Manufacturing (a₁*/a₂*): <strong>{oppF.toFixed(2)}</strong> units of Agri</li>
                    <li>• Home opportunity cost of Agriculture (a₂/a₁): <strong>{(1/oppH).toFixed(2)}</strong> units of Mfg</li>
                    <li>• Foreign opportunity cost of Agriculture (a₂*/a₁*): <strong>{(1/oppF).toFixed(2)}</strong> units of Mfg</li>
                    <li style={{ marginTop: '8px', fontWeight: '600' }}>
                      👉 {oppH < oppF 
                        ? "Home has comparative advantage in Manufacturing, Foreign has comparative advantage in Agriculture."
                        : oppH > oppF 
                          ? "Foreign has comparative advantage in Manufacturing, Home has comparative advantage in Agriculture."
                          : "Both countries have equal opportunity costs; neither holds a comparative advantage."}
                    </li>
                  </ul>
                  
                  <div style={{ marginTop: '12px', padding: '8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '6px', fontSize: '0.85rem' }}>
                    <strong>💡 What to notice:</strong> The country with the lower opportunity cost has comparative advantage in that good.
                  </div>
                </div>
              </div>

              {/* Lesson 5 */}
              <div className="lesson-card" id="lesson5">
                <h3>Lesson 5: Production Possibility Frontier</h3>
                <p>
                  The PPF represents all output combinations that a country can produce using its limited labor force. 
                  For a workforce <em>L</em>, the intercepts are:
                </p>
                <div className="math-formula">
                  Max Mfg intercept = L / a₁ | Max Agri intercept = L / a₂
                </div>
                <p>
                  The slope of the PPF is constant, representing the opportunity cost of Manufacturing:
                </p>
                <div className="math-formula">
                  PPF Slope = -a₁ / a₂
                </div>

                {/* Sliders for PPF */}
                <div className="sliders-container">
                  <h4 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--accent-primary)', display: 'flex', justify: 'space-between', alignItems: 'center' }}>
                    <span>Adjust PPF Parameters</span>
                    <button onClick={reset2x2} className="reset-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <RefreshCw size={12} />
                      <span>Reset</span>
                    </button>
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div className="control-item">
                      <div className="control-label">
                        <span>Home Labor (L): {homeL}</span>
                      </div>
                      <input type="range" min="30" max="300" step="5" value={homeL} onChange={(e) => setHomeL(Number(e.target.value))} className="control-slider" />
                    </div>
                    <div className="control-item">
                      <div className="control-label">
                        <span>Foreign Labor (L*): {foreignL}</span>
                      </div>
                      <input type="range" min="30" max="300" step="5" value={foreignL} onChange={(e) => setForeignL(Number(e.target.value))} className="control-slider" />
                    </div>
                  </div>
                </div>

                {/* Side-by-side graphs */}
                <div className="graph-side-by-side">
                  <PPFGraph country="Home" L={homeL} a1={homeA1} a2={homeA2} theme={theme} />
                  <PPFGraph country="Foreign" L={foreignL} a1={foreignA1} a2={foreignA2} theme={theme} />
                </div>

                <div className="notice-box">
                  <h5>🔎 What to notice in the graphs</h5>
                  <p>
                    Observe how changing the labor supply (L or L*) shifts the PPF line outward in parallel, increasing both intercepts but keeping the slope constant. 
                    Changing unit requirements (a₁, a₂) rotates the line, altering opportunity cost.
                  </p>
                </div>
              </div>

              {/* Lesson 6 */}
              <div className="lesson-card" id="lesson6">
                <h3>Lesson 6: Specialization and Relative Price</h3>
                <p>
                  In a competitive market economy, labor flows to the sector that pays the higher wage. 
                  Since markets are competitive, the price of a good matches its production cost: <strong>P<sub>i</sub> = a<sub>i</sub> w<sub>i</sub></strong>. 
                  This implies wages are: <strong>w₁ = P₁/a₁</strong> and <strong>w₂ = P₂/a₂</strong>.
                </p>
                <p>
                  Comparing these wages leads to clear specialization rules based on the world relative price <strong>P₁/P₂</strong>:
                </p>
                <div className="means-box">
                  If <strong>P₁/P₂ &gt; a₁/a₂</strong>, Mfg pays higher wages; Home specializes in Manufacturing. <br />
                  If <strong>P₁/P₂ &lt; a₁/a₂</strong>, Agri pays higher wages; Home specializes in Agriculture. <br />
                  If equal, wages match; workers can produce both.
                </div>

                {/* Price slider */}
                <div className="sliders-container">
                  <div className="control-item">
                    <div className="control-label">
                      <span style={{ color: 'var(--accent-warning)', fontWeight: 600 }}>World Relative Price (P₁/P₂): {worldPrice.toFixed(2)}</span>
                    </div>
                    <input type="range" min="0.2" max="4.0" step="0.05" value={worldPrice} onChange={(e) => setWorldPrice(Number(e.target.value))} className="control-slider" />
                  </div>
                </div>

                {/* Side-by-side Specialization axes */}
                <div className="graph-side-by-side">
                  <SpecializationPanel country="Home" a1={homeA1} a2={homeA2} worldPrice={worldPrice} theme={theme} />
                  <SpecializationPanel country="Foreign" a1={foreignA1} a2={foreignA2} worldPrice={worldPrice} theme={theme} />
                </div>

                {/* Check your understanding */}
                <div className="micro-quiz-card">
                  <h4>💡 Check Your Understanding</h4>
                  <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>
                    If the world relative price P₁/P₂ is 1.5, and Home's opportunity cost of Manufacturing (a₁/a₂) is 2.0, what will Home produce?
                  </p>
                  <div className="micro-quiz-options">
                    <button 
                      className={`micro-quiz-option ${microQuizzes.lesson6?.selected === 0 ? 'incorrect' : ''}`}
                      onClick={() => handleMicroQuizClick('lesson6', 0, 1)}
                      disabled={microQuizzes.lesson6 !== null}
                    >
                      Manufacturing only
                    </button>
                    <button 
                      className={`micro-quiz-option ${microQuizzes.lesson6?.selected === 1 ? 'correct' : ''}`}
                      onClick={() => handleMicroQuizClick('lesson6', 1, 1)}
                      disabled={microQuizzes.lesson6 !== null}
                    >
                      Agriculture only
                    </button>
                    <button 
                      className={`micro-quiz-option ${microQuizzes.lesson6?.selected === 2 ? 'incorrect' : ''}`}
                      onClick={() => handleMicroQuizClick('lesson6', 2, 1)}
                      disabled={microQuizzes.lesson6 !== null}
                    >
                      Both goods
                    </button>
                  </div>
                  {microQuizzes.lesson6 && (
                    <div className={`micro-feedback-box ${microQuizzes.lesson6.correct ? 'correct' : 'incorrect'}`}>
                      {microQuizzes.lesson6.correct 
                        ? "Correct! Since P₁/P₂ (1.5) < 2.0, the world price of Mfg is less than Home's opportunity cost. Home specializes in Agri."
                        : "Not quite. Compare P₁/P₂ (1.5) with a₁/a₂ (2.0). Since the price is less than the opportunity cost, Mfg pays less, meaning workers choose Agri."}
                    </div>
                  )}
                </div>
              </div>

              {/* Lesson 7 */}
              <div className="lesson-card" id="lesson7">
                <h3>Lesson 7: Autarky vs. Free Trade</h3>
                <p>
                  **Autarky** is a closed state where no international trade happens. 
                  A country is forced to produce both goods locally to satisfy its consumers, and its consumption possibilities are strictly limited to its PPF.
                </p>
                <p>
                  **Free Trade** opens borders. By allowing countries to specialize in their comparative advantage sectors and exchange goods at the world relative price ratio, both countries gain.
                </p>
                <TutorTip tip="In autarky, you can only consume what you produce. Opening to trade breaks this lock by allowing specialization and exchange at world prices." />
              </div>

              {/* Lesson 8 */}
              <div className="lesson-card" id="lesson8">
                <h3>Lesson 8: Consumption Possibility Frontier</h3>
                <p>
                  The **CPF** shows all consumption bundles available to consumers. 
                  By specializing and trading at the world relative price, the CPF pivots outward relative to the PPF, with a slope equal to <strong>-P₁/P₂</strong>.
                </p>
                
                {/* Side-by-side PPF + CPF Graphs */}
                <div className="graph-side-by-side">
                  <CPFGraph country="Home" L={homeL} a1={homeA1} a2={homeA2} worldPrice={worldPrice} theme={theme} />
                  <CPFGraph country="Foreign" L={foreignL} a1={foreignA1} a2={foreignA2} worldPrice={worldPrice} theme={theme} />
                </div>

                <div className="notice-box">
                  <h5>🔎 What to notice in the graphs</h5>
                  <p>
                    When the world relative price is different from the domestic opportunity cost, the green CPF line lies strictly above the red PPF line, illustrating that trade allows a country to consume more total goods than it can produce locally.
                  </p>
                </div>
              </div>

              {/* Lesson 9 */}
              <div className="lesson-card" id="lesson9">
                <h3>Lesson 9: Gains from Trade</h3>
                <p>
                  Trade increases consumer welfare because it permits consumers to achieve consumption bundles that are physically impossible to produce domestically.
                </p>
                <div style={{ margin: '20px 0', padding: '16px', background: 'rgba(var(--bg-color), 0.3)', border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)' }}>
                  <h5 style={{ marginBottom: '8px', color: 'var(--accent-primary)' }}>Autarky vs. Free Trade Bundle Comparison</h5>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    - <strong>A (Autarky bundle)</strong>: The country splits labor between both sectors and consumes exactly what it produces. It is restricted to the PPF boundary.<br />
                    - <strong>B (Free Trade bundle)</strong>: The country specializes in its comparative advantage sector and trades at world prices P₁/P₂. The free trade bundle B lies outside the PPF on the higher CPF curve, yielding more total consumption.
                  </p>
                </div>

                <div className="graph-side-by-side" style={{ gridTemplateColumns: '1fr' }}>
                  <GainsFromTradeGraph L={homeL} a1={homeA1} a2={homeA2} worldPrice={worldPrice} theme={theme} />
                </div>
              </div>

              {/* Lesson 10 */}
              <div className="lesson-card" id="lesson10">
                <h3>Lesson 10: Free Trade Equilibrium</h3>
                <p>
                  The world relative price P₁/P₂ is set by the intersection of **World Relative Supply (RS)** and **World Relative Demand (RD)**. 
                  Because countries specialize at opportunity cost thresholds, the RS curve is a stair-step shape.
                </p>
                
                <div className="graph-side-by-side" style={{ gridTemplateColumns: '1fr' }}>
                  <RSEquilibriumGraph 
                    homeL={homeL} foreignL={foreignL} 
                    homeA1={homeA1} homeA2={homeA2} 
                    foreignA1={foreignA1} foreignA2={foreignA2} 
                    worldPrice={worldPrice} theme={theme} 
                  />
                </div>

                <div className="notice-box">
                  <h5>🔎 What to notice in the graph</h5>
                  <p>
                    The RS curve has flat steps at the opportunity costs of Home (a₁/a₂) and Foreign (a₁*/a₂*). 
                    The vertical segment represents complete specialization by both countries. 
                    Adjusting labor or technology coefficients shifts the width of the step or changes the heights of the opportunity cost steps.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submodule 1.2 Contents */}
          {moduleTab === 'theory2' && (
            <div>
              {/* Overview */}
              <div className="lesson-card" style={{ borderLeft: '4px solid var(--accent-secondary)' }}>
                <h3>Continuum Model Overview</h3>
                <p>
                  Real economies do not trade only two goods. To model a realistic market, Dornbusch, Fischer, and Samuelson (DFS, 1977) 
                  extended the Ricardian framework to an infinite number of goods. Below, we study this continuum model in eight lessons.
                </p>
              </div>

              {/* Lesson 1 */}
              <div className="lesson-card" id="dfs1">
                <h3>Lesson 1: Why Move from Two Goods to Many Goods?</h3>
                <p>
                  While the two-good model yields clear comparative advantage insights, it results in a jagged, step-like Relative Supply curve. 
                  By expanding the model to an infinite number of goods, these steps smooth out, making it mathematically elegant and allowing economists to evaluate policies like tariffs and transport costs.
                </p>
              </div>

              {/* Lesson 2 */}
              <div className="lesson-card" id="dfs2">
                <h3>Lesson 2: Continuum of Goods and z</h3>
                <p>
                  Instead of indexing goods discretely (1, 2, 3), we index them continuously by <strong>z</strong> on the interval <strong>[0, 1]</strong>. 
                  Every point on this line represents a unique good:
                </p>
                
                {/* Timeline visual */}
                <div className="dfs-timeline-container" style={{ margin: '24px 0' }}>
                  <div className="dfs-timeline-bar">
                    <div style={{ width: '50%', backgroundColor: 'rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '2px solid var(--accent-warning)' }}>
                      z = 0 (Strong Home CA)
                    </div>
                    <div style={{ width: '50%', backgroundColor: 'rgba(139, 92, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      z = 1 (Strong Foreign CA)
                    </div>
                  </div>
                  <div className="dfs-timeline-label-row">
                    <span>z = 0.0</span>
                    <span>z = 0.5</span>
                    <span>z = 1.0</span>
                  </div>
                </div>
              </div>

              {/* Lesson 3 */}
              <div className="lesson-card" id="dfs3">
                <h3>Lesson 3: Relative Productivity Schedule A(z)</h3>
                <p>
                  Let <em>a(z)</em> and <em>a*(z)</em> be the unit labor requirements in Home and Foreign. 
                  We define the relative labor productivity schedule as:
                </p>
                <div className="math-formula">
                  A(z) = a*(z) / a(z)
                </div>
                <p>
                  Goods are ordered on [0, 1] such that A(z) is strictly decreasing. 
                  At low z, Home has a massive relative productivity advantage; at high z, Foreign is relatively more productive.
                </p>

                {/* Slider and Graph */}
                <div className="sliders-container">
                  <h4 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--accent-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Adjust DFS Parameters</span>
                    <button onClick={resetDFS} className="reset-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <RefreshCw size={12} />
                      <span>Reset</span>
                    </button>
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div className="control-item">
                      <div className="control-label">
                        <span>Home a(z) Base: {homeBase.toFixed(1)}</span>
                      </div>
                      <input type="range" min="0.5" max="3.0" step="0.1" value={homeBase} onChange={(e) => setHomeBase(Number(e.target.value))} className="control-slider" />
                    </div>
                    <div className="control-item">
                      <div className="control-label">
                        <span>Home a(z) Slope: {homeSlope.toFixed(1)}</span>
                      </div>
                      <input type="range" min="1.0" max="8.0" step="0.1" value={homeSlope} onChange={(e) => setHomeSlope(Number(e.target.value))} className="control-slider" />
                    </div>
                    <div className="control-item">
                      <div className="control-label">
                        <span>Foreign a*(z) Base: {foreignBase.toFixed(1)}</span>
                      </div>
                      <input type="range" min="1.0" max="6.0" step="0.1" value={foreignBase} onChange={(e) => setForeignBase(Number(e.target.value))} className="control-slider" />
                    </div>
                    <div className="control-item">
                      <div className="control-label">
                        <span>Foreign a*(z) Slope: {foreignSlope.toFixed(1)}</span>
                      </div>
                      <input type="range" min="-2.0" max="4.0" step="0.1" value={foreignSlope} onChange={(e) => setForeignSlope(Number(e.target.value))} className="control-slider" />
                    </div>
                  </div>
                </div>

                <div className="graph-side-by-side" style={{ gridTemplateColumns: '1fr' }}>
                  <DFSGraph 
                    homeL={dfsL} foreignL={dfsLStar} 
                    homeBase={homeBase} homeSlope={homeSlope} 
                    foreignBase={foreignBase} foreignSlope={foreignSlope} 
                    theme={theme} 
                  />
                </div>
              </div>

              {/* Lesson 4 */}
              <div className="lesson-card" id="dfs4">
                <h3>Lesson 4: Relative Wage</h3>
                <p>
                  Let <strong>ω = w / w*</strong> denote the relative wage of Home workers to Foreign workers. 
                  A good z is cheaper to produce in Home if the relative wage is less than or equal to relative productivity:
                </p>
                <div className="math-formula">
                  Production Cost at Home ≤ Production Cost in Foreign ⇒ w a(z) ≤ w* a*(z) ⇒ ω ≤ A(z)
                </div>
                <TutorTip tip="Even if Home is extremely productive at a good, a high relative wage (ω > A(z)) can make the good cheaper to produce in Foreign. Wages and productivity must align!" />

                {/* Micro quiz */}
                <div className="micro-quiz-card">
                  <h4>💡 Check Your Understanding</h4>
                  <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>
                    If Home's relative labor productivity A(z) is 1.5 for a specific good, and the relative wage ω = w/w* is 1.8, where will the good be produced?
                  </p>
                  <div className="micro-quiz-options">
                    <button 
                      className={`micro-quiz-option ${microQuizzes.dfsLesson4?.selected === 0 ? 'incorrect' : ''}`}
                      onClick={() => handleMicroQuizClick('dfsLesson4', 0, 1)}
                      disabled={microQuizzes.dfsLesson4 !== null}
                    >
                      Home
                    </button>
                    <button 
                      className={`micro-quiz-option ${microQuizzes.dfsLesson4?.selected === 1 ? 'correct' : ''}`}
                      onClick={() => handleMicroQuizClick('dfsLesson4', 1, 1)}
                      disabled={microQuizzes.dfsLesson4 !== null}
                    >
                      Foreign
                    </button>
                  </div>
                  {microQuizzes.dfsLesson4 && (
                    <div className={`micro-feedback-box ${microQuizzes.dfsLesson4.correct ? 'correct' : 'incorrect'}`}>
                      {microQuizzes.dfsLesson4.correct 
                        ? "Correct! Since relative wage ω (1.8) > relative productivity A(z) (1.5), Home's wage is too high to compete, so the good is produced in Foreign."
                        : "Not quite. Since Home's relative wage (1.8) exceeds its productivity advantage (1.5), production cost is cheaper in Foreign."}
                    </div>
                  )}
                </div>
              </div>

              {/* Lesson 5 */}
              <div className="lesson-card" id="dfs5">
                <h3>Lesson 5: Marginal Good z₀</h3>
                <p>
                  The threshold good <strong>z₀</strong> satisfies:
                </p>
                <div className="math-formula">
                  A(z₀) = ω
                </div>
                <p>
                  This marginal good separates the continuum of production:
                </p>
                <div className="means-box">
                  Home produces goods: <strong>[0, z₀]</strong> <br />
                  Foreign produces goods: <strong>(z₀, 1]</strong>
                </div>

                {/* Timeline display responding to sliders */}
                <div className="dfs-timeline-container">
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', color: 'var(--accent-secondary)' }}>Production Ranges (Live Visual)</h4>
                  
                  {/* Solve z0 numerically */}
                  {(() => {
                    let low = 0.0001;
                    let high = 0.9999;
                    let valZ0 = 0.5;
                    const A = (z) => (foreignBase + foreignSlope * z) / (homeBase + homeSlope * z);
                    const B = (z) => (dfsLStar / dfsL) * (z / (1 - z));
                    for (let i = 0; i < 50; i++) {
                      valZ0 = (low + high) / 2;
                      if (A(valZ0) > B(valZ0)) {
                        low = valZ0;
                      } else {
                        high = valZ0;
                      }
                    }
                    const homeWidth = (valZ0 * 100).toFixed(1);
                    const foreignWidth = ((1 - valZ0) * 100).toFixed(1);
                    return (
                      <>
                        <div className="dfs-timeline-bar">
                          <div className="dfs-home-region" style={{ width: `${homeWidth}%` }}>
                            Home Goods [0 to {valZ0.toFixed(3)}]
                          </div>
                          <div className="dfs-foreign-region" style={{ width: `${foreignWidth}%` }}>
                            Foreign Goods ({valZ0.toFixed(3)} to 1]
                          </div>
                        </div>
                        <div className="dfs-timeline-label-row">
                          <span>z = 0.0</span>
                          <span>Marginal Good z₀ = {valZ0.toFixed(3)}</span>
                          <span>z = 1.0</span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Lesson 6 */}
              <div className="lesson-card" id="dfs6">
                <h3>Lesson 6: Demand Side and B(z)</h3>
                <p>
                  To clear labor markets, we define <em>v(z)</em> as the share of world income spent on goods produced in Home:
                </p>
                <div className="math-formula">
                  v(z₀) = ∫ [0 to z₀] b(z) dz
                </div>
                <p style={{ fontStyle: 'italic', color: 'var(--accent-primary)', fontSize: '0.9rem' }}>
                  💡 "An integral is like adding many tiny pieces together." Here, we integrate the expenditure share b(z) of all goods produced in Home.
                </p>
                <p style={{ marginTop: '14px' }}>
                  Under uniform Cobb-Douglas preferences, this simplifies to <strong>v(z) = z</strong>. 
                  Trade balance requires Home income to match world spending on Home goods:
                </p>
                <div className="math-formula">
                  ω = B(z) = (L* / L) × z / (1 - z)
                </div>
              </div>

              {/* Lesson 7 */}
              <div className="lesson-card" id="dfs7">
                <h3>Lesson 7: DFS Equilibrium</h3>
                <p>
                  General equilibrium relative wage and the marginal good are jointly solved where the cost schedule A(z) intersects the demand-clearing schedule B(z):
                </p>
                <div className="math-formula">
                  A(z₀) = B(z₀)
                </div>
                <p>
                  Look at the chart in Lesson 3 to observe this intersection point live!
                </p>
              </div>

              {/* Lesson 8 */}
              <div className="lesson-card" id="dfs8">
                <h3>Lesson 8: Comparative Statics</h3>
                <p>
                  When the Foreign population <strong>L*</strong> increases, the relative supply of Foreign labor expands, shifting the schedule <strong>B(z) upward</strong>. 
                  This increases the relative wage of Home (ω) and contracts Home's production range (z₀ decreases).
                </p>

                {/* Slider for L* */}
                <div className="sliders-container">
                  <div className="control-item">
                    <div className="control-label">
                      <span style={{ color: 'var(--accent-warning)', fontWeight: 600 }}>Foreign Population (L*): {dfsLStar}</span>
                    </div>
                    <input type="range" min="50" max="400" step="10" value={dfsLStar} onChange={(e) => setDfsLStar(Number(e.target.value))} className="control-slider" />
                  </div>
                  <div className="try-this-box">
                    <strong>💡 Try This:</strong> Slide L* from 200 up to 400. Observe the dotted original B(z) schedule and watch how the equilibrium shifts live.
                  </div>
                </div>

                <div className="graph-side-by-side" style={{ gridTemplateColumns: '1fr' }}>
                  <ComparativeStaticsGraph 
                    homeL={dfsL} foreignL={dfsLStar} 
                    homeBase={homeBase} homeSlope={homeSlope} 
                    foreignBase={foreignBase} foreignSlope={foreignSlope} 
                    theme={theme} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submodule 1.3 Contents */}
          {moduleTab === 'theory3' && (
            <Module1Section3 theme={theme} />
          )}

          {/* Submodule 1.4 Contents */}
          {moduleTab === 'theory4' && (
            <Module1Section4 theme={theme} />
          )}

          {/* Main Quiz Assessment Tab */}
          {moduleTab === 'quiz' && (
            <div className="quiz-section">
              <Quiz />
            </div>
          )}

        </div>
      )}

      {activeTab === 'module2' && (
        <Module2 theme={theme} setActiveTab={setActiveTab} />
      )}

      {activeTab === 'module3' && (
        <ErrorBoundary moduleName="Module 3">
          <Module3 theme={theme} setActiveTab={setActiveTab} />
        </ErrorBoundary>
      )}

      {activeTab === 'module4' && (
        <ErrorBoundary moduleName="Module 4">
          <Module4 theme={theme} setActiveTab={setActiveTab} />
        </ErrorBoundary>
      )}

      <footer>
        <div className="container">
          <p>© 2026 Gravity with AI. A professional Economics Trade Course curriculum. Built with React, Vite & Plotly.</p>
        </div>
      </footer>
    </div>
  );
}
