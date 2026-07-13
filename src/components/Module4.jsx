import React, { useState, useEffect } from 'react';
import './Module4.css';
import TutorTip from './TutorTip';
import Module4Quiz from './Module4Quiz';
import { BookOpen, Lightbulb, ArrowRight } from 'lucide-react';

function DefinitionBox({ title, children }) {
  return (
    <div className="tutor-tip-box" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
      <div className="tutor-icon" style={{ color: 'var(--accent-primary)' }}>
        <BookOpen size={20} />
      </div>
      <div className="tutor-content">
        <h4 style={{ color: 'var(--accent-primary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em', margin: 0 }}>
          Definition: {title}
        </h4>
        <div style={{ margin: '6px 0 0 0', fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function IntuitionBox({ title, children }) {
  return (
    <div className="tutor-tip-box" style={{ borderLeft: '4px solid #eab308' }}>
      <div className="tutor-icon" style={{ color: '#eab308' }}>
        <Lightbulb size={20} />
      </div>
      <div className="tutor-content">
        <h4 style={{ color: '#eab308', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em', margin: 0 }}>
          Intuition: {title}
        </h4>
        <div style={{ margin: '6px 0 0 0', fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Module4({ theme, setActiveTab }) {
  const tabsList = [
    "4.1 Krugman 1979: Variable Markups",
    "4.2 Krugman 1980: CES & Gravity",
    "4.3 Melitz Model: Closed Economy",
    "4.4 Melitz Model: Open Economy",
    "4.5 Melitz-Pareto: Distorted Gravity",
    "4.6 Module 4 Final Exam"
  ];
  const [moduleTab, setModuleTab] = useState("4.1 Krugman 1979: Variable Markups");
  const [activeMathStep, setActiveMathStep] = useState(1);

  // Trigger MathJax typesetting when stepper tabs or steps change
  useEffect(() => {
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [moduleTab, activeMathStep]);

  // Whenever we switch tabs, reset step to 1
  const handleTabChange = (newTab) => {
    setModuleTab(newTab);
    setActiveMathStep(1);
  };

  // ==========================================
  // TAB 1: KRUGMAN 1979 - STATE & SOLVER
  // ==========================================
  const [krugL, setKrugL] = useState(100); // population L
  const [krugF, setKrugF] = useState(4.0);   // fixed cost f
  const [isScaling, setIsScaling] = useState(false);

  // Krugman 1979 G.E. Solver
  // Assume: phi = 1.0
  // Demand elasticity function: epsilon(c) = 2.0 + 0.5 / c
  // Closed-form solution to: c^2 - k*c - 0.5*k = 0 where k = f / L (since phi = 1)
  const solveKrugman79 = (L, f) => {
    const k = f / L;
    const c = (k + Math.sqrt(k * k + 2 * k)) / 2;
    const q = L * c;
    const epsilon = 2.0 + 0.5 / c;
    const pw = epsilon / (epsilon - 1); // p/w ratio
    const M = L / (epsilon * f); // variety mass
    return { c, q, pw, M };
  };

  const krug79Data = solveKrugman79(krugL, krugF);

  // Animation trigger for population scaling L -> 2L
  const handleScalePopulation = () => {
    if (isScaling) return;
    setIsScaling(true);
    let startL = krugL;
    const targetL = krugL * 2;
    const duration = 800; // ms
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quadratic
      const currentL = startL + (targetL - startL) * progress;
      setKrugL(currentL);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsScaling(false);
      }
    };
    requestAnimationFrame(animate);
  };

  // ==========================================
  // TAB 2: KRUGMAN 1980 - STATE & SOLVER
  // ==========================================
  const [krug80LH, setKrug80LH] = useState(120); // population L_H
  const [krug80LF, setKrug80LF] = useState(80);  // population L_F
  const [krug80D, setKrug80D] = useState(1.3);   // iceberg trade cost d
  const [krug80Sigma, setKrug80Sigma] = useState(3.0); // sigma

  // Krugman 1980 Bilateral gravity wage solver
  const solveKrugman80 = (LH, LF, d, sigma) => {
    let wH = 1.0; // Home wage relative to w_F = 1.0
    const wF = 1.0;
    const maxIters = 40;
    const tol = 1e-6;

    for (let i = 0; i < maxIters; i++) {
      const piHH = LH * Math.pow(wH, 1 - sigma) / (LH * Math.pow(wH, 1 - sigma) + LF * Math.pow(d * wF, 1 - sigma));
      const piHF = LH * Math.pow(d * wH, 1 - sigma) / (LH * Math.pow(d * wH, 1 - sigma) + LF * Math.pow(wF, 1 - sigma));
      
      const newWH = (piHH * wH * LH + piHF * wF * LF) / LH;
      if (Math.abs(newWH - wH) < tol) {
        wH = newWH;
        break;
      }
      wH = 0.8 * wH + 0.2 * newWH; // Dampening
    }

    const piHH = LH * Math.pow(wH, 1 - sigma) / (LH * Math.pow(wH, 1 - sigma) + LF * Math.pow(d * wF, 1 - sigma));
    const piFH = LF * Math.pow(d * wF, 1 - sigma) / (LH * Math.pow(wH, 1 - sigma) + LF * Math.pow(d * wF, 1 - sigma));
    const piHF = LH * Math.pow(d * wH, 1 - sigma) / (LH * Math.pow(d * wH, 1 - sigma) + LF * Math.pow(wF, 1 - sigma));
    const piFF = LF * Math.pow(wF, 1 - sigma) / (LH * Math.pow(d * wH, 1 - sigma) + LF * Math.pow(wF, 1 - sigma));

    const MH = LH / (sigma * 1.0); // variety count (f = 1.0)
    const MF = LF / (sigma * 1.0);

    const pH = (sigma / (sigma - 1)) * wH;
    const pF = (sigma / (sigma - 1)) * wF;

    const PH = Math.pow(MH * Math.pow(pH, 1 - sigma) + MF * Math.pow(d * pF, 1 - sigma), 1 / (1 - sigma));
    const PF = Math.pow(MH * Math.pow(d * pH, 1 - sigma) + MF * Math.pow(pF, 1 - sigma), 1 / (1 - sigma));

    const welfareH = wH / PH;
    const welfareF = wF / PF;

    return { wH, wF, piHH, piFH, piHF, piFF, welfareH, welfareF };
  };

  const krug80Data = solveKrugman80(krug80LH, krug80LF, krug80D, krug80Sigma);

  // ==========================================
  // TAB 3: MELITZ 2003 CLOSED ECONOMY - STATE & SOLVER
  // ==========================================
  const [melFe, setMelFe] = useState(2.0); // entry cost f_e
  const [melF, setMelF] = useState(1.5);   // fixed cost f
  const [melDelta, setMelDelta] = useState(0.1); // death rate delta
  const [melSigma, setMelSigma] = useState(3.0); // sigma

  // Assume Pareto productivity distribution G(phi) = 1 - phi^(-theta) for phi >= 1.0
  const theta = 4.0;
  const a = 1.0;

  // Closed form solver for Melitz Autarky
  // phi* = [ (f / (delta * fe)) * (sigma - 1) / (theta - sigma + 1) ]^(1/theta)
  const solveMelitzAutarky = (fe, f, delta, sigma) => {
    const k = (sigma - 1) / (theta - sigma + 1);
    const phiVal = Math.pow((f / (delta * fe)) * k, 1 / theta);
    const phiStar = Math.max(a, phiVal);
    const avgProfit = f * k;
    return { phiStar, avgProfit };
  };

  const melAutData = solveMelitzAutarky(melFe, melF, melDelta, melSigma);

  // ==========================================
  // TAB 4: MELITZ 2003 OPEN ECONOMY - STATE & SOLVER
  // ==========================================
  const [melTau, setMelTau] = useState(1.3); // iceberg cost tau
  const [melFx, setMelFx] = useState(1.2);   // export fixed fee f_x
  const melN = 1; // 1 symmetric foreign partner

  // Closed form solver for open economy
  const solveMelitzOpen = (fe, f, delta, sigma, tau, fx) => {
    const k = (sigma - 1) / (theta - sigma + 1);
    const tradeComp = melN * fx * Math.pow(tau, -theta) * Math.pow(fx / f, -theta / (sigma - 1));
    const phiVal = Math.pow((k / (delta * fe)) * (f + tradeComp), 1 / theta);
    const phiStar = Math.max(a, phiVal);
    const phiX = phiStar * tau * Math.pow(fx / f, 1 / (sigma - 1));
    const avgProfit = f * k + tradeComp * k;
    const welfare = ((sigma - 1) / sigma) * Math.pow(100 / (sigma * f), 1 / (sigma - 1)) * phiStar; // L = 100
    return { phiStar, phiX, avgProfit, welfare };
  };

  const melOpenData = solveMelitzOpen(melFe, melF, melDelta, melSigma, melTau, melFx);

  // ==========================================
  // TAB 5: CHANEY & DISTORTED GRAVITY - STATE
  // ==========================================
  const [chaneySigma, setChaneySigma] = useState(3.0);
  const [chaneyTheta, setChaneyTheta] = useState(4.0);

  // Constrain theta > sigma - 1
  useEffect(() => {
    if (chaneyTheta <= chaneySigma - 1) {
      setChaneyTheta(chaneySigma - 1 + 0.1);
    }
  }, [chaneySigma]);

  const handleThetaChange = (val) => {
    const minTheta = chaneySigma - 1;
    if (val > minTheta) {
      setChaneyTheta(val);
    }
  };

  // Stacked chart margin sizes
  const intensiveMargin = chaneySigma - 1;
  const extensiveMargin = chaneyTheta - (chaneySigma - 1);
  const totalElasticity = chaneyTheta;
  const intensivePct = (intensiveMargin / totalElasticity) * 100;
  const extensivePct = (extensiveMargin / totalElasticity) * 100;

  return (
    <div className="container module4-container" style={{ padding: '40px 24px' }}>
      {/* Header */}
      <div className="module-header">
        <button onClick={() => setActiveTab('home')} className="back-btn">
          <span>← Back to Course Path</span>
        </button>
        <div className="module-title-row">
          <div>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Module 4
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '4px' }}>Monopolistic Competition &amp; Heterogeneous Firms</h2>
          </div>
        </div>
      </div>

      {/* Horizontal tab-based stepper header */}
      <div className="tabs-header">
        <button 
          className={`tab-btn ${moduleTab === "4.1 Krugman 1979: Variable Markups" ? 'active' : ''}`}
          onClick={() => handleTabChange("4.1 Krugman 1979: Variable Markups")}
        >
          4.1 Variable Markups
        </button>
        <button 
          className={`tab-btn ${moduleTab === "4.2 Krugman 1980: CES & Gravity" ? 'active' : ''}`}
          onClick={() => handleTabChange("4.2 Krugman 1980: CES & Gravity")}
        >
          4.2 CES &amp; Gravity
        </button>
        <button 
          className={`tab-btn ${moduleTab === "4.3 Melitz Model: Closed Economy" ? 'active' : ''}`}
          onClick={() => handleTabChange("4.3 Melitz Model: Closed Economy")}
        >
          4.3 Melitz Closed
        </button>
        <button 
          className={`tab-btn ${moduleTab === "4.4 Melitz Model: Open Economy" ? 'active' : ''}`}
          onClick={() => handleTabChange("4.4 Melitz Model: Open Economy")}
        >
          4.4 Melitz Open
        </button>
        <button 
          className={`tab-btn sub-tab-purple ${moduleTab === "4.5 Melitz-Pareto: Distorted Gravity" ? 'active' : ''}`}
          onClick={() => handleTabChange("4.5 Melitz-Pareto: Distorted Gravity")}
        >
          4.5 Pareto &amp; Distorted Gravity
        </button>
        <button 
          className={`tab-btn ${moduleTab === "4.6 Module 4 Final Exam" ? 'active' : ''}`}
          onClick={() => handleTabChange("4.6 Module 4 Final Exam")}
        >
          ✏️ 4.6 Final Exam
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 4.1: KRUGMAN 1979 - VARIABLE MARKUPS */}
      {/* ======================================================== */}
      {moduleTab === "4.1 Krugman 1979: Variable Markups" && (
        <div className="lesson-step-content">
          <div className="stepper-section-title">
            4.1 Krugman 1979: Variable Markups &amp; Closed Economy
          </div>

          {/* Stepper Wizard Indicator */}
          <div className="stepper-header">
            <button className={`step-indicator-btn ${activeMathStep === 1 ? 'active' : ''}`} onClick={() => setActiveMathStep(1)}>
              <span className="step-num-badge">1</span> Step 1: Pricing Curve (PP)
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 2 ? 'active' : ''}`} onClick={() => setActiveMathStep(2)}>
              <span className="step-num-badge">2</span> Step 2: Free Entry Curve (ZZ)
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 3 ? 'active' : ''}`} onClick={() => setActiveMathStep(3)}>
              <span className="step-num-badge">3</span> Step 3: Solving the Closed Economy
            </button>
          </div>

          <div className="stepper-card-body">
            {activeMathStep === 1 && (
              <div>
                <h4>Setup, Assumptions, &amp; The Pricing Curve (PP)</h4>
                <DefinitionBox title="Monopolistic competition">
                  {`A market structure with two halves: monopolistic — each firm is the sole producer of its own differentiated variety, so it faces a downward-sloping demand curve and charges a markup over marginal cost; competitive — entry is free, so profits are driven to zero in equilibrium. The number (mass) of varieties is endogenous: determined by how many firms the market can sustain at zero profit.`}
                </DefinitionBox>
                <p>
                  {`Krugman (1979) models trade driven by internal economies of scale. Households consume a continuum of varieties $\\omega \\in \\Omega$, with additively separable preferences:`}
                </p>
                {`$$U = \\int_{\\omega\\in\\Omega} v(c(\\omega))d\\omega, \\quad v' > 0, \\quad v'' < 0$$`}
                <p>
                  {`Define the price elasticity of demand for variety $\\omega$ as:`}
                </p>
                {`$$\\epsilon(\\omega) = -\\frac{\\partial \\ln c(\\omega)}{\\partial \\ln p(\\omega)} > 0$$`}
                <p>
                  {`Under the variable markup condition, elasticity of demand falls as variety consumption increases:`}
                  {`$$\\frac{\\partial \\epsilon(\\omega)}{\\partial c(\\omega)} < 0$$`}
                </p>
                <IntuitionBox title="Why assume ε falls with c?">
                  {`Think of the first unit of a new good versus the tenth: when you consume little of something, small price changes easily push you toward substitutes (high elasticity); when it is a staple, you are less price-sensitive. This single assumption is what makes markups respond to market size in Krugman-1979 — and it is exactly what CES preferences will shut down in Krugman-1980, where $\\epsilon$ is constant by construction.`}
                </IntuitionBox>
                <p>
                  {`Firms require labor $l(\\omega) = f + \\frac{1}{\\varphi}q(\\omega)$, where $f$ is the fixed cost and $\\varphi$ is productivity. Internal economies of scale are verified via average cost:`}
                  {`$$AC = w\\left(\\frac{f}{q} + \\frac{1}{\\varphi}\\right)$$`}
                </p>
                <IntuitionBox title="Where are the increasing returns?">
                  {`Average cost is $w(f/q + 1/\\varphi)$, which falls with output: the fixed cost is spread over more units — that is internal economies of scale, the engine of the whole model. It also explains why each variety is made by exactly one firm: two firms splitting a variety would duplicate the fixed cost pointlessly.`}
                </IntuitionBox>
                <div className="sub-step-box">
                  <span className="sub-step-title">📈 Step 1 Derivation: The Pricing Curve (PP)</span>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {`Maximize firm profit $\\max p(q)q - w(f + q/\\varphi)$. Writing output as $q = Lc$ and differentiating with respect to price yields the first-order condition:`}
                    {`$$c + p\\frac{\\partial c}{\\partial p} - \\frac{w}{\\varphi}\\frac{\\partial c}{\\partial p} = 0$$`}
                    {`Dividing by $c$ yields the upward-sloping PP curve in $(c, p/w)$ space:`}
                    {`$$\\frac{p}{w} = \\frac{1}{\\varphi} \\frac{\\epsilon(c)}{\\epsilon(c)-1}$$`}
                    {`Because higher consumption compresses demand elasticity, the markup $\\mu(c) = \\frac{\\epsilon(c)}{\\epsilon(c)-1}$ inflates as $c$ rises.`}
                  </p>
                </div>
              </div>
            )}

            {activeMathStep === 2 && (
              <div>
                <h4>Step 2: The Free-Entry Curve (ZZ)</h4>
                <p>
                  {`Firms enter the industry until profits are completely squeezed to zero. Differentiating from the zero-profit condition yields:`}
                </p>
                {`$$\\pi = pq - w\\left(f + \\frac{q}{\\varphi}\\right) = 0$$`}
                <div className="sub-step-box">
                  <span className="sub-step-title">📉 Step 2 Derivation: ZZ Curve</span>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {`Substitute $q = Lc$ into the zero-profit condition and divide by $wLc$:`}
                    {`$$\\frac{p}{w}c - \\frac{f}{L} - \\frac{c}{\\varphi} = 0$$`}
                    {`Isolating the pricing ratio $p/w$ yields the downward-sloping Free-Entry Curve (ZZ):`}
                    {`$$\\frac{p}{w} = \\frac{1}{\\varphi} + \\frac{f}{Lc}$$`}
                  </p>
                </div>
              </div>
            )}

            {activeMathStep === 3 && (
              <div>
                <h4>Step 3: Solving the Closed Economy &amp; Variety Gains</h4>
                <p>
                  {`The intersection of the PP and ZZ curves ($PP = ZZ$) pins down the equilibrium consumption scale $c_0$ and price-to-wage ratio $(p/w)_0$.`}
                </p>
                <div className="sub-step-box">
                  <span className="sub-step-title">🏆 Step 3 Derivation: Closed Economy Equilibrium</span>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {`Equating the PP markup pricing to the ZZ average cost line solves for individual variety consumption $c$. Firm scale resolves to:`}
                    {`$$q = (\\epsilon - 1)\\varphi f$$`}
                    {`By labor market clearing, the variety mass $M$ matches:`}
                    {`$$M = \\frac{L}{\\epsilon f}$$`}
                  </p>
                </div>
                <IntuitionBox title="Reading the solution">
                  {`Firm size $q = (\\epsilon - 1)\\varphi f$ is pinned down by the tension between scale economies ($f$ pushes firms to be big) and market power (elasticity close to 1 lets firms survive while small). The variety count $M = L/(\\epsilon f)$ says a bigger economy supports more firms, not bigger ones in this closed equilibrium; cheaper entry (lower $f$) and less elastic demand also raise variety.`}
                </IntuitionBox>
                <div className="sub-step-box">
                  <span className="sub-step-title">🏆 Variety Gain Expansion Proof</span>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {`When population scales from $L \\to 2L$, the total variety mass in trade ($2M_1$) strictly exceeds autarky ($M_0$):`}
                    {`$$2M_1 > M_0 \\iff f + \\frac{2L}{\\varphi}(c_0 - c_1) > 0$$`}
                    {`Because ZZ shifts downward, variety consumption shrinks ($c_1 < c_0$), freeing up labor to sustain more varieties.`}
                  </p>
                </div>
                <IntuitionBox title="Two brand-new sources of gains from trade">
                  {`Neither channel exists in neoclassical models: 
                  (a) The pro-competitive effect: with a bigger market, each consumer buys less of each variety, demand becomes more elastic, and markups get squeezed, so the real wage rises — trade disciplines market power. 
                  (b) The variety effect: consumers value variety, so even though each country's own menu shrinks, the combined accessible menu more than doubles. 
                  Note the reallocation flavor already present here: fewer, bigger firms — trade rationalizes the industry, and Melitz will make this rationalization selective once firms differ.`}
                </IntuitionBox>
              </div>
            )}
          </div>

          {/* Tab 1 Interactive Sandbox */}
          <div className="sliders-grid">
            <div className="slider-card">
              <label>
                <span>Population Scale ($L$):</span>
                <span className="val-highlight">{krugL.toFixed(0)}</span>
              </label>
              <input 
                type="range" min="50" max="250" step="5"
                value={krugL} onChange={(e) => setKrugL(Number(e.target.value))} 
                className="range-slider"
                disabled={isScaling}
              />
            </div>
            <div className="slider-card">
              <label>
                <span>Fixed Operating Cost ($f$):</span>
                <span className="val-highlight">{krugF.toFixed(1)}</span>
              </label>
              <input 
                type="range" min="2.0" max="10.0" step="0.2"
                value={krugF} onChange={(e) => setKrugF(Number(e.target.value))} 
                className="range-slider"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button 
                className="quiz-btn quiz-btn-primary" 
                onClick={handleScalePopulation}
                disabled={isScaling}
                style={{ width: '100%', height: '40px' }}
              >
                Animate Population Scaling (L → 2L)
              </button>
            </div>
          </div>

          <div className="svg-canvas-row">
            <div className="svg-canvas-card">
              <div className="svg-title" style={{ color: 'var(--accent-primary)' }}>
                📈 Krugman 1979 G.E. Intersection
              </div>
              <div className="svg-wrapper">
                <svg viewBox="0 0 360 200" width="100%" height="100%">
                  {/* Axes */}
                  <line x1="40" y1="170" x2="340" y2="170" className="svg-axis" />
                  <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                  <text x="190" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Consumption c</text>
                  <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Price Index p/w</text>

                  {/* PP Curve: upward sloping. p/w = 1.0 * (2c + 0.5) / (c + 0.5) */}
                  <path 
                    d={Array.from({ length: 30 }, (_, idx) => {
                      const cVal = 0.05 + idx * 0.15;
                      const pwVal = (2 * cVal + 0.5) / (cVal + 0.5);
                      const x = 40 + (cVal / 5) * 300;
                      const y = 170 - (pwVal / 3) * 140;
                      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')} 
                    className="svg-curve" 
                    stroke="var(--accent-primary)" 
                  />

                  {/* ZZ Curve: downward sloping. p/w = 1.0 + f / (L * c) */}
                  <path 
                    d={Array.from({ length: 30 }, (_, idx) => {
                      const cVal = 0.05 + idx * 0.15;
                      const pwVal = 1.0 + krugF / (krugL * cVal);
                      const x = 40 + (cVal / 5) * 300;
                      const y = 170 - (Math.min(3.5, pwVal) / 3) * 140;
                      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')} 
                    className={`svg-curve ${isScaling ? 'curve-shifting' : ''}`}
                    stroke="var(--accent-secondary)" 
                  />

                  {/* Intersection Point */}
                  {(() => {
                    const xPt = 40 + (krug79Data.c / 5) * 300;
                    const yPt = 170 - (krug79Data.pw / 3) * 140;
                    return (
                      <>
                        <line x1={xPt} y1="170" x2={xPt} y2={yPt} className="svg-guide-line" stroke="var(--text-muted)" />
                        <line x1="40" y1={yPt} x2={xPt} y2={yPt} className="svg-guide-line" stroke="var(--text-muted)" />
                        <circle cx={xPt} cy={yPt} r="6" fill="var(--accent-warning)" className="svg-marker" />
                        <text x={xPt + 10} y={yPt - 10} className="svg-text-bold svg-text">E₀</text>
                      </>
                    );
                  })()}
                </svg>
              </div>
              <div className="svg-legend">
                <span><span style={{ color: 'var(--accent-primary)' }}>■</span> Pricing Curve (PP)</span>
                <span><span style={{ color: 'var(--accent-secondary)' }}>■</span> Free Entry Curve (ZZ)</span>
              </div>
            </div>

            <div className="svg-canvas-card">
              <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                📊 Closed Economy Outcomes
              </div>
              <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'space-around' }}>
                <div className="implications-grid">
                  <div className="implication-stat-card">
                    <div className="implication-stat-val">{(krug79Data.pw).toFixed(3)}</div>
                    <div className="implication-stat-lbl">Real Cost Index (p/w)</div>
                  </div>
                  <div className="implication-stat-card">
                    <div className="implication-stat-val">{(krug79Data.c).toFixed(3)}</div>
                    <div className="implication-stat-lbl">Variety Consumption (c)</div>
                  </div>
                  <div className="implication-stat-card">
                    <div className="implication-stat-val">{(krug79Data.q).toFixed(2)}</div>
                    <div className="implication-stat-lbl">Firm Output Scale (q)</div>
                  </div>
                  <div className="implication-stat-card">
                    <div className="implication-stat-val">{(krug79Data.M).toFixed(1)}</div>
                    <div className="implication-stat-lbl">Variety Count (M)</div>
                  </div>
                </div>
                <p style={{ margin: '12px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {`Pro-competitive Effect: scaling population L downward shifts the ZZ curve. It drives down variety consumption (c₁ < c₀), pushing up elasticity and compressing the pricing markup (p/w)₁ < (p/w)₀.`}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Stepper Controls */}
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
      {/* TAB 4.2: KRUGMAN 1980 - CES & GRAVITY */}
      {/* ======================================================== */}
      {moduleTab === "4.2 Krugman 1980: CES & Gravity" && (
        <div className="lesson-step-content">
          <div className="stepper-section-title">
            4.2 Krugman 1980: CES &amp; Gravity
          </div>

          <div className="stepper-header">
            <button className={`step-indicator-btn ${activeMathStep === 1 ? 'active' : ''}`} onClick={() => setActiveMathStep(1)}>
              <span className="step-num-badge">1</span> Step 1: CES Preferences
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 2 ? 'active' : ''}`} onClick={() => setActiveMathStep(2)}>
              <span className="step-num-badge">2</span> Step 2: Derivations
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 3 ? 'active' : ''}`} onClick={() => setActiveMathStep(3)}>
              <span className="step-num-badge">3</span> Step 3: Gravity &amp; Welfare
            </button>
          </div>

          <div className="stepper-card-body">
            {activeMathStep === 1 && (
              <div>
                <h4>Dixit-Stiglitz CES Preference Structure</h4>
                <p>
                  {`Krugman (1980) shifts preferences to standard CES with a constant elasticity parameter $\\sigma > 1$:`}
                </p>
                {`$$U_j = \\left[ \\sum_{i=1}^N \\int_{\\omega\\in\\Omega_i} c_{ij}(\\omega)^{\\frac{\\sigma-1}{\\sigma}} d\\omega \\right]^{\\frac{\\sigma}{\\sigma-1}}$$`}
                <p>
                  {`This preference structure implies that spending on a specific variety is given by:`}
                </p>
                {`$$x_{ij}(\\omega) = \\left( \\frac{p_{ij}(\\omega)}{P_j} \\right)^{1-\\sigma} X_j$$`}
              </div>
            )}

            {activeMathStep === 2 && (
              <div>
                <h4>Derivations &amp; Size Invariance</h4>
                <p>
                  {`Because the elasticity of demand is constant at $\\epsilon = \\sigma$, the pricing curve PP becomes completely horizontal:`}
                </p>
                {`$$p_i = \\frac{\\sigma}{\\sigma-1} \\frac{w_i}{\\varphi_i}$$`}
                <div className="sub-step-box">
                  <span className="sub-step-title">⚖️ Size Invariance Proof</span>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {`Free entry forces profit $\\pi = 0$. Substituting markup pricing pins down the firm output size as invariant to population:`}
                    {`$$q_i = (\\sigma - 1)\\varphi_i f_i$$`}
                    {`As a result, population scale shocks do not alter firm sizes. Instead, they map entirely into variety expansion:`}
                    {`$$M_i = \\frac{L_i}{\\sigma f_i}$$`}
                  </p>
                </div>
              </div>
            )}

            {activeMathStep === 3 && (
              <div>
                <h4>Structural Gravity &amp; Welfare Scaling</h4>
                <p>
                  {`Aggregating spending across varieties yields the structural gravity spending share model from origin $i$ to destination $j$:`}
                </p>
                {`$$\\pi_{ij} = \\frac{M_i p_{ij}^{1-\\sigma}}{\\sum_l M_l p_{lj}^{1-\\sigma}} = \\frac{\\frac{L_i}{f_i} \\varphi_i^{\\sigma-1} (w_i d_{ij})^{1-\\sigma}}{\\sum_l \\frac{L_l}{f_l} \\varphi_l^{\\sigma-1} (w_l d_{lj})^{1-\\sigma}}$$`}
                <IntuitionBox title="One gravity equation, three different stories">
                  {`Set the three workhorse models side by side: Krugman: $\\pi_{ij} \\propto \\frac{L_i}{f_i} \\varphi_i^{\\sigma - 1}(d_{ij}w_i)^{1-\\sigma}$, Eaton-Kortum: $\\pi_{ij} \\propto T_i (d_{ij}w_i)^{-\\theta}$, Armington: $\\pi_{ij} \\propto b_i a_i^{\\sigma-1}(d_{ij}w_i)^{1-\\sigma}$. All are "origin shifter × (cost)^-elasticity, normalized by destination competition" — they differ in what the shifter means and in what the elasticity represents (a taste parameter in Krugman/Armington vs. a technology-heterogeneity parameter in EK). Aggregate trade data alone cannot tell these stories apart — only micro data can.`}
                </IntuitionBox>
                <div className="sub-step-box">
                  <span className="sub-step-title">🏆 Population Scale Welfare Effect</span>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {`This share structure links home variety availability to real wages and welfare via:`}
                    {`$$\\frac{w_i}{P_i} = A_i L_i^{\\frac{1}{\\sigma - 1}} \\pi_{ii}^{-\\frac{1}{\\sigma - 1}}$$`}
                    {`Larger populations sustain more domestic varieties, directly lifting utility due to consumers' love of variety.`}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tab 2 Interactive Sandbox */}
          <div className="sliders-grid">
            <div className="slider-card">
              <label>
                <span>Home Population ($L_H$):</span>
                <span className="val-highlight">{krug80LH}</span>
              </label>
              <input 
                type="range" min="50" max="200" step="5"
                value={krug80LH} onChange={(e) => setKrug80LH(Number(e.target.value))} 
                className="range-slider"
              />
            </div>
            <div className="slider-card">
              <label>
                <span>Foreign Population ($L_F$):</span>
                <span className="val-highlight">{krug80LF}</span>
              </label>
              <input 
                type="range" min="50" max="200" step="5"
                value={krug80LF} onChange={(e) => setKrug80LF(Number(e.target.value))} 
                className="range-slider"
              />
            </div>
            <div className="slider-card">
              <label>
                <span>{`Iceberg Trade Cost ($d_{HF}$):`}</span>
                <span className="val-highlight">{krug80D.toFixed(2)}</span>
              </label>
              <input 
                type="range" min="1.0" max="2.0" step="0.05"
                value={krug80D} onChange={(e) => setKrug80D(Number(e.target.value))} 
                className="range-slider"
              />
            </div>
          </div>

          <div className="svg-canvas-row">
            <div className="svg-canvas-card">
              <div className="svg-title" style={{ color: 'var(--accent-primary)' }}>
                🏠 Home Market Access and Trade Shares
              </div>
              <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'space-around' }}>
                <div style={{ fontWeight: 600 }}>Bilateral Sales Allocation Matrix</div>
                <div className="implications-grid">
                  <div className="implication-stat-card">
                    <div className="implication-stat-val">{(krug80Data.piHH * 100).toFixed(1)}%</div>
                    <div className="implication-stat-lbl">{`Home Local Share ($\\pi_{HH}$)`}</div>
                  </div>
                  <div className="implication-stat-card">
                    <div className="implication-stat-val">{(krug80Data.piFH * 100).toFixed(1)}%</div>
                    <div className="implication-stat-lbl">{`Foreign Import Share ($\\pi_{FH}$)`}</div>
                  </div>
                  <div className="implication-stat-card">
                    <div className="implication-stat-val">{(krug80Data.piHF * 100).toFixed(1)}%</div>
                    <div className="implication-stat-lbl">{`Home Export Share ($\\pi_{HF}$)`}</div>
                  </div>
                  <div className="implication-stat-card">
                    <div className="implication-stat-val">{(krug80Data.piFF * 100).toFixed(1)}%</div>
                    <div className="implication-stat-lbl">{`Foreign Local Share ($\\pi_{FF}$)`}</div>
                  </div>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Home Demand Allocation:</span>
                  <div className="share-bar-container">
                    <div className="share-bar-segment" style={{ width: `${krug80Data.piHH * 100}%`, backgroundColor: 'var(--accent-primary)' }}>
                      Local
                    </div>
                    <div className="share-bar-segment" style={{ width: `${krug80Data.piFH * 100}%`, backgroundColor: 'var(--accent-secondary)' }}>
                      Imports
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="svg-canvas-card">
              <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                🌐 Endogenous General Equilibrium Dashboard
              </div>
              <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'space-around' }}>
                <div className="implications-grid">
                  <div className="implication-stat-card">
                    <div className="implication-stat-val purple-text">{(krug80Data.wH).toFixed(3)}</div>
                    <div className="implication-stat-lbl">{`Home Wage ($w_H$)`}</div>
                  </div>
                  <div className="implication-stat-card">
                    <div className="implication-stat-val purple-text">{(krug80Data.wF).toFixed(3)}</div>
                    <div className="implication-stat-lbl">{`Foreign Wage ($w_F$)`}</div>
                  </div>
                  <div className="implication-stat-card">
                    <div className="implication-stat-val">{(krug80Data.welfareH).toFixed(2)}</div>
                    <div className="implication-stat-lbl">{`Home Real Income ($w_H/P_H$)`}</div>
                  </div>
                  <div className="implication-stat-card">
                    <div className="implication-stat-val">{(krug80Data.welfareF).toFixed(2)}</div>
                    <div className="implication-stat-lbl">{`Foreign Real Income ($w_F/P_F$)`}</div>
                  </div>
                </div>
                <p style={{ margin: '12px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {`Home-Market Effect: A larger home population concentrates variety production locally. This raises the Home wage rate relative to Foreign ($w_H > 1.0$) and shields local buyers from trade transport costs.`}
                </p>
              </div>
            </div>
          </div>
          <IntuitionBox title="Home-market effect">
            {`Countries tend to export the goods for which they have large domestic demand. With scale economies, production wants to concentrate in one place; with trade costs, the profit-maximizing place is near the big market — produce where demand is, export to the rest. This reverses neoclassical logic, where large demand for a good makes you an importer of it.`}
          </IntuitionBox>

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
      {/* TAB 4.3: MELITZ CLOSED ECONOMY */}
      {/* ======================================================== */}
      {moduleTab === "4.3 Melitz Model: Closed Economy" && (
        <div className="lesson-step-content">
          <div className="stepper-section-title">
            4.3 Melitz Model: Closed Economy
          </div>

          <div className="stepper-header">
            <button className={`step-indicator-btn ${activeMathStep === 1 ? 'active' : ''}`} onClick={() => setActiveMathStep(1)}>
              <span className="step-num-badge">1</span> Step 1: Productivity draws
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 2 ? 'active' : ''}`} onClick={() => setActiveMathStep(2)}>
              <span className="step-num-badge">2</span> Step 2: ZCP &amp; FE Curves
            </button>
          </div>

          <div className="stepper-card-body">
            {activeMathStep === 1 && (
              <div>
                <h4>Firm-Level Productivity Heterogeneity</h4>
                <p>
                  {`Melitz (2003) introduces firm heterogeneity. Upon paying a sunk entry fee $f_e$, firms draw their productivity $\\varphi$ from a known density $g(\\varphi)$, where the wage is normalized to $w = 1$.`}
                </p>
                {`$$l(\\varphi) = f + \\frac{q}{\\varphi}$$`}
                <p>
                  {`Optimal firm-level pricing, sales, and profits are written as:`}
                </p>
                {`$$p(\\varphi) = \\frac{\\sigma}{\\sigma-1} \\frac{1}{\\varphi}, \\quad r(\\varphi) = R \\left( \\frac{p(\\varphi)}{P} \\right)^{1-\\sigma}, \\quad \\pi(\\varphi) = \\frac{r(\\varphi)}{\\sigma} - f$$`}
                <div className="sub-step-box">
                  <span className="sub-step-title">⚖️ Relative Success &amp; Average Productivity Index</span>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {`Comparing any two firms reveals the relative success identity:`}
                    {`$$\\frac{r(\\varphi_1)}{r(\\varphi_2)} = \\left( \\frac{\\varphi_1}{\\varphi_2} \\right)^{\\sigma - 1}$$`}
                    {`The representative productivity index aggregates the continuum of active firms:`}
                    {`$$\\tilde{\\varphi}(\\varphi^*) = \\left[ \\int_{\\varphi^*}^\\infty \\varphi^{\\sigma - 1} \\mu(\\varphi) d\\varphi \\right]^{\\frac{1}{\\sigma - 1}}$$`}
                    {`where the aggregate price index is represented by:`}
                    {`$$P = M^{\\frac{1}{1-\\sigma}} p(\\tilde{\\varphi})$$`}
                  </p>
                </div>
              </div>
            )}

            {activeMathStep === 2 && (
              <div>
                <h4>Cutoff Equilibrium (ZCP &amp; FE)</h4>
                <p>
                  {`The closed-economy equilibrium determines the survival cutoff $\\varphi^*$ (where $\\pi(\\varphi^*) = 0$) and average profit $\\bar{\\pi}$ using two equations:`}
                </p>
                <DefinitionBox title="Entry technology and the cutoff">
                  {`To enter, a prospective firm pays a sunk cost $f_e$ and then draws productivity $\\varphi$ from a known distribution (pdf $g$, cdf $G$) — entry is a lottery. A firm with $\\pi(\\varphi) < 0$ exits immediately; since profit increases with productivity, exit is a cutoff rule: stay iff $\\varphi \\ge \\varphi^*$, where profit at the cutoff equals zero. Each period, incumbents die with probability $\\delta$, so a survivor's expected value is expected profit divided by $\\delta$. The distribution of active firms is the entry distribution truncated at the cutoff.`}
                </DefinitionBox>
                <div className="sub-step-box">
                  <span className="sub-step-title">📉 Step 1: Zero Cutoff Profit (ZCP)</span>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {`Firms at the survival cutoff break even: $\\pi(\\varphi^*) = 0$. This defines the ZCP curve (downward-sloping):`}
                    {`$$\\bar{\\pi} = f \\cdot k(\\varphi^*), \\quad k(\\varphi^*) \\equiv \\left( \\frac{\\tilde{\\varphi}(\\varphi^*)}{\\varphi^*} \\right)^{\\sigma - 1} - 1$$`}
                  </p>
                </div>
                <div className="sub-step-box">
                  <span className="sub-step-title">📈 Step 2: Free Entry (FE) Curve</span>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {`Entrants pay a sunk entry fee $f_e$ and face an exogenous exit shock rate $\\delta$, yielding the FE curve (upward-sloping):`}
                    {`$$\\bar{\\pi} = \\frac{\\delta f_e}{1 - G(\\varphi^*)}$$`}
                  </p>
                </div>
                <IntuitionBox title="Closed economy: heterogeneity is invisible in aggregates">
                  {`Strikingly, the closed-economy aggregate predictions are those of Krugman-1980 with a representative firm $\\tilde{\\varphi}$: welfare is $W = P^{-1} = M^{\\frac{1}{\\sigma - 1}}\\frac{\\sigma - 1}{\\sigma}\\tilde{\\varphi}$. Heterogeneity only earns its keep when trade is costly and exporting has a fixed cost — then market access differs across firms, selection bites, and the distribution starts moving aggregates.`}
                </IntuitionBox>
              </div>
            )}
          </div>

          {/* Tab 3 Interactive Sandbox */}
          <div className="sliders-grid">
            <div className="slider-card">
              <label>
                <span>Sunk Entry Cost ($f_e$):</span>
                <span className="val-highlight">{melFe.toFixed(1)}</span>
              </label>
              <input 
                type="range" min="0.5" max="5.0" step="0.1"
                value={melFe} onChange={(e) => setMelFe(Number(e.target.value))} 
                className="range-slider"
              />
            </div>
            <div className="slider-card">
              <label>
                <span>Operating Fixed Cost ($f$):</span>
                <span className="val-highlight">{melF.toFixed(1)}</span>
              </label>
              <input 
                type="range" min="0.5" max="3.0" step="0.1"
                value={melF} onChange={(e) => setMelF(Number(e.target.value))} 
                className="range-slider"
              />
            </div>
            <div className="slider-card">
              <label>
                <span>Exit Shock Rate ($\delta$):</span>
                <span className="val-highlight">{melDelta.toFixed(2)}</span>
              </label>
              <input 
                type="range" min="0.05" max="0.30" step="0.01"
                value={melDelta} onChange={(e) => setMelDelta(Number(e.target.value))} 
                className="range-slider"
              />
            </div>
          </div>

          <div className="svg-canvas-row">
            <div className="svg-canvas-card">
              <div className="svg-title" style={{ color: 'var(--accent-primary)' }}>
                📈 Melitz Autarky Cutoff G.E.
              </div>
              <div className="svg-wrapper">
                <svg viewBox="0 0 360 200" width="100%" height="100%">
                  {/* Axes */}
                  <line x1="40" y1="170" x2="340" y2="170" className="svg-axis" />
                  <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                  <text x="190" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Cutoff φ*</text>
                  <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Avg Profit π</text>

                  {/* ZCP curve */}
                  {(() => {
                    const zcpY = 170 - (melAutData.avgProfit / 5) * 140;
                    return (
                      <line x1="40" y1={zcpY} x2="340" y2={zcpY} className="svg-curve" stroke="var(--accent-primary)" />
                    );
                  })()}

                  {/* FE curve */}
                  <path 
                    d={Array.from({ length: 30 }, (_, idx) => {
                      const phiVal = 1.0 + idx * 0.1;
                      const profitVal = melDelta * melFe * Math.pow(phiVal, theta);
                      const x = 40 + ((phiVal - 1.0) / 2.0) * 300;
                      const y = 170 - (Math.min(5.0, profitVal) / 5) * 140;
                      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')} 
                    className="svg-curve" 
                    stroke="var(--accent-secondary)" 
                  />

                  {/* Intersection point */}
                  {(() => {
                    const xPt = 40 + ((melAutData.phiStar - 1.0) / 2.0) * 300;
                    const yPt = 170 - (melAutData.avgProfit / 5) * 140;
                    return (
                      <>
                        <line x1={xPt} y1="170" x2={xPt} y2={yPt} className="svg-guide-line" stroke="var(--text-muted)" />
                        <circle cx={xPt} cy={yPt} r="6" fill="var(--accent-warning)" className="svg-marker" />
                        <text x={xPt - 5} y={yPt - 12} className="svg-text-bold svg-text">φ*</text>
                      </>
                    );
                  })()}
                </svg>
              </div>
              <div className="svg-legend">
                <span><span style={{ color: 'var(--accent-primary)' }}>■</span> Zero Cutoff Profit (ZCP)</span>
                <span><span style={{ color: 'var(--accent-secondary)' }}>■</span> Free Entry (FE)</span>
              </div>
            </div>

            <div className="svg-canvas-card">
              <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                📊 Selection cutoffs
              </div>
              <div className="implications-panel" style={{ margin: 0, height: '100%', justifyContent: 'space-around' }}>
                <div className="implications-grid">
                  <div className="implication-stat-card">
                    <div className="implication-stat-val">{(melAutData.phiStar).toFixed(3)}</div>
                    <div className="implication-stat-lbl">{`Survival Cutoff ($\\varphi^*$)`}</div>
                  </div>
                  <div className="implication-stat-card">
                    <div className="implication-stat-val">{(melAutData.avgProfit).toFixed(3)}</div>
                    <div className="implication-stat-lbl">{`Average Net Profit ($\\bar{\\pi}$)`}</div>
                  </div>
                </div>
                <p style={{ margin: '12px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {`Closed Economy Cutoff: The survival cutoff $\\varphi^*$ marks the boundary productivity level. Firms with productivity $\\varphi < \\varphi^*$ cannot cover fixed operational fees and must immediately exit. Sunk entry risk ($f_e$) shifts the FE curve, altering survival boundaries.`}
                </p>
              </div>
            </div>
          </div>

          <div className="stepper-nav-footer">
            <button className="quiz-btn quiz-btn-secondary" onClick={() => setActiveMathStep((prev) => Math.max(1, prev - 1))} disabled={activeMathStep === 1}>
              ← Back
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Step {activeMathStep} of 2</span>
            <button className="quiz-btn quiz-btn-primary" onClick={() => setActiveMathStep((prev) => Math.min(2, prev + 1))} disabled={activeMathStep === 2}>
              Next Step →
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4.4: MELITZ OPEN ECONOMY */}
      {/* ======================================================== */}
      {moduleTab === "4.4 Melitz Model: Open Economy" && (
        <div className="lesson-step-content">
          <div className="stepper-section-title">
            4.4 Melitz Model: Open Economy
          </div>

          <div className="stepper-header">
            <button className={`step-indicator-btn ${activeMathStep === 1 ? 'active' : ''}`} onClick={() => setActiveMathStep(1)}>
              <span className="step-num-badge">1</span> Step 1: Stylized Facts
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 2 ? 'active' : ''}`} onClick={() => setActiveMathStep(2)}>
              <span className="step-num-badge">2</span> Step 2: Sorting continuum
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 3 ? 'active' : ''}`} onClick={() => setActiveMathStep(3)}>
              <span className="step-num-badge">3</span> Step 3: Reallocation selection
            </button>
          </div>

          <div className="stepper-card-body">
            {activeMathStep === 1 && (
              <div>
                <h4>What Firm-Level Data Revealed (Stylized Facts)</h4>
                <p>
                  {`In Krugman's model, all firms are clones: every firm exports, and exports the same amount. When firm-level micro data became available in the 1990s, reality looked very different:`}
                </p>
                <DefinitionBox title="The stylized facts">
                  <strong>Exporting is rare:</strong> In 2000, only about 4% of U.S. firms exported at all; in manufacturing, only about 18% of firms exported, and even exporters shipped only ~14% of their output abroad.
                  <br /><br />
                  <strong>Exports are concentrated:</strong> The top 10% of exporters accounted for 96% of total U.S. exports; firms exporting 5+ products to 5+ countries were 11.9% of exporters but carried 92% of export value — strongly suggestive of a fat-tailed (Pareto-like) size distribution.
                  <br /><br />
                  <strong>Exporters are different ("export premia"):</strong> Compared with non-exporters in the same industry, exporters are larger (log employment premium $\approx 0.97$), more productive, pay higher wages, and are more capital- and skill-intensive.
                  <br /><br />
                  <strong>Both margins matter:</strong> Exporters make more products (extensive margin) and ship more per product (intensive margin).
                </DefinitionBox>
                <IntuitionBox title="Why this kills the representative firm">
                  {`If exporting were just a matter of shipping costs, firms would differ only in degree. Instead the data show selection: a small elite of exceptional firms does all the exporting. That pattern demands a model where firms differ in productivity and there's a fixed cost of exporting so only the best find it worthwhile — delivering a new gain from trade: reallocation of resources toward more productive firms, raising aggregate productivity.`}
                </IntuitionBox>
              </div>
            )}

            {activeMathStep === 2 && (
              <div>
                <h4>The Firm Sorting Continuum</h4>
                <p>
                  {`When trade opens across $n$ symmetric external partners, exporting requires paying an additional fixed cost $f_x > 0$ and iceberg friction $\\tau > 1$. Firms sort along the productivity axis $\\varphi$ based on the linkage equation:`}
                </p>
                {`$$\\varphi^*_x = \\varphi^* \\tau \\left( \\frac{f_x}{f} \\right)^{\\frac{1}{\\sigma - 1}}$$`}
                <div className="sub-step-box">
                  <span className="sub-step-title">⚡ Firm Partitioning Zones</span>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {`This sequence divides firms into three performance segments:`}
                    <br />
                    {`1. Exit Zone: $\\varphi < \\varphi^*$ (too unproductive to survive)`}
                    <br />
                    {`2. Domestic Market Only: $\\varphi^* \\le \\varphi < \\varphi_x^*$ (can survive locally but not export)`}
                    <br />
                    {`3. Exporting Elite: $\\varphi \\ge \\varphi_x^*$ (can profitably export)`}
                  </p>
                </div>
                <IntuitionBox title="The reallocation mechanism, told through the labor market">
                  {`Why should trade kill the weakest home-market firms, which do not even export? Follow the wage. Trade opens profitable foreign opportunities for the most productive firms; they expand, bidding up demand for labor. The real wage (relative to the price index) rises. Firms near the old cutoff, which broke even at the old factor costs, now make losses — they exit. Full employment then reallocates their workers to the expanding exporters — market shares move up the productivity ladder.`}
                </IntuitionBox>
              </div>
            )}

            {activeMathStep === 3 && (
              <div>
                <h4>Open Economy ZCP &amp; Welfare Selection Effect</h4>
                <p>
                  {`Bilateral export profits shift the open-economy ZCP curve upward:`}
                </p>
                {`$$\\bar{\\pi} = f \\cdot k(\\varphi^*) + p_x n f_x k(\\varphi^*_x), \\quad p_x \\equiv \\frac{1-G(\\varphi^*_x)}{1-G(\\varphi^*)}$$`}
                <div className="sub-step-box">
                  <span className="sub-step-title">📈 Trade Selection Welfare Proof</span>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {`Because the open-economy ZCP curve shifts up, it intersects the static Free Entry (FE) curve at a higher survival cutoff: $\\varphi^* > \\varphi^*_a$.`}
                    {`Expanding exporters bid up wages, crushing low-productivity domestic firms. This intra-industry reallocation of workers to elite plants directly lifts real wages and welfare:`}
                    {`$$W = \\frac{\\sigma-1}{\\sigma} \\left(\\frac{L}{\\sigma f}\\right)^{\\frac{1}{\\sigma-1}} \\varphi^*$$`}
                  </p>
                </div>
              </div>
            )}
          </div>

          {activeMathStep > 1 && (
            <>
              {/* Tab 4 Interactive Sandbox */}
              <div className="sliders-grid">
                <div className="slider-card">
                  <label>
                    <span>{`Iceberg Shipping Cost ($\\tau$):`}</span>
                    <span className="val-highlight">{melTau.toFixed(2)}</span>
                  </label>
                  <input 
                    type="range" min="1.1" max="2.0" step="0.05"
                    value={melTau} onChange={(e) => setMelTau(Number(e.target.value))} 
                    className="range-slider"
                  />
                </div>
                <div className="slider-card">
                  <label>
                    <span>Fixed Export Fee ($f_x$):</span>
                    <span className="val-highlight">{melFx.toFixed(1)}</span>
                  </label>
                  <input 
                    type="range" min="0.5" max="3.0" step="0.1"
                    value={melFx} onChange={(e) => setMelFx(Number(e.target.value))} 
                    className="range-slider"
                  />
                </div>
                <div className="slider-card">
                  <label>
                    <span>Domestic Fixed Cost ($f$):</span>
                    <span className="val-highlight">{melF.toFixed(1)}</span>
                  </label>
                  <input 
                    type="range" min="0.5" max="3.0" step="0.1"
                    value={melF} onChange={(e) => setMelF(Number(e.target.value))} 
                    className="range-slider"
                  />
                </div>
              </div>

              <div className="svg-canvas-row">
                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-primary)' }}>
                    📊 Firm Partition Continuum Axis
                  </div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 360 200" width="100%" height="100%">
                      {/* Sorting axis */}
                      <line x1="20" y1="100" x2="340" y2="100" stroke="var(--text-muted)" strokeWidth="3" />
                      <line x1="20" y1="90" x2="20" y2="110" stroke="var(--text-primary)" strokeWidth="2" />
                      <line x1="340" y1="90" x2="340" y2="110" stroke="var(--text-primary)" strokeWidth="2" />

                      {/* Cutoff markers */}
                      {(() => {
                        const startX = 20;
                        const endX = 340;
                        const mapX = (phi) => startX + ((phi - 1.0) / 2.0) * (endX - startX);
                        
                        const xDom = mapX(melOpenData.phiStar);
                        const xExp = mapX(melOpenData.phiX);

                        const wExit = xDom - 20;
                        const wDom = xExp - xDom;
                        const wExp = 340 - xExp;

                        const cxExit = 20 + wExit / 2;
                        const cxDom = xDom + wDom / 2;
                        const cxExp = xExp + wExp / 2;

                        const closeCutoffs = Math.abs(xExp - xDom) < 50;
                        const textXDom = closeCutoffs ? Math.max(30, xDom - 25) : xDom;
                        const textXExp = closeCutoffs ? Math.min(330, xExp + 25) : xExp;

                        return (
                          <>
                            {/* Zones coloring */}
                            {/* Exit Zone */}
                            <rect x="20" y="85" width={Math.max(0, xDom - 20)} height="30" fill="rgba(239, 68, 68, 0.2)" />
                            <text x={cxExit} y="75" textAnchor="middle" className="svg-text" fill="var(--accent-error)">
                              {wExit > 50 ? 'Exit' : ''}
                            </text>

                            {/* Domestic Zone */}
                            {xExp > xDom && (
                              <rect x={xDom} y="85" width={Math.max(0, xExp - xDom)} height="30" fill="rgba(59, 130, 246, 0.2)" />
                            )}
                            <text x={cxDom} y="75" textAnchor="middle" className="svg-text" fill="var(--accent-primary)">
                              {wDom > 80 ? 'Domestic Only' : wDom > 45 ? 'Dom.' : ''}
                            </text>

                            {/* Export Zone */}
                            {xExp < 340 && (
                              <rect x={xExp} y="85" width={Math.max(0, 340 - xExp)} height="30" fill="rgba(16, 185, 129, 0.2)" />
                            )}
                            <text x={cxExp} y="75" textAnchor="middle" className="svg-text" fill="var(--accent-success)">
                              {wExp > 65 ? 'Export Elite' : wExp > 40 ? 'Exp.' : ''}
                            </text>

                            {/* Survival Cutoff Divider on the Bar */}
                            <line x1={xDom} y1="85" x2={xDom} y2="115" stroke="var(--accent-primary)" strokeWidth="2" />
                            {/* Tick Line connecting to label */}
                            <line x1={xDom} y1="115" x2={textXDom} y2="135" stroke="var(--accent-primary)" strokeWidth="1" strokeDasharray="2 2" />
                            <text x={textXDom} y="150" className="svg-text-bold svg-text" textAnchor="middle" fill="var(--accent-primary)">
                              {`φ* (Survival)`}
                            </text>

                            {/* Export Cutoff Divider on the Bar */}
                            <line x1={xExp} y1="85" x2={xExp} y2="115" stroke="var(--accent-success)" strokeWidth="2" />
                            {/* Tick Line connecting to label */}
                            <line x1={xExp} y1="115" x2={textXExp} y2="135" stroke="var(--accent-success)" strokeWidth="1" strokeDasharray="2 2" />
                            <text x={textXExp} y="150" className="svg-text-bold svg-text" textAnchor="middle" fill="var(--accent-success)">
                              {`φ*_x (Export)`}
                            </text>
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                  <div className="svg-legend">
                    <span><span style={{ color: 'var(--accent-error)' }}>■</span> Exit</span>
                    <span><span style={{ color: 'var(--accent-primary)' }}>■</span> Domestic</span>
                    <span><span style={{ color: 'var(--accent-success)' }}>■</span> Exporter</span>
                  </div>
                </div>

                <div className="svg-canvas-card">
                  <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                    📈 Open Economy ZCP &amp; FE Selection Shift
                  </div>
                  <div className="svg-wrapper">
                    <svg viewBox="0 0 360 200" width="100%" height="100%">
                      {/* Axes */}
                      <line x1="40" y1="170" x2="340" y2="170" className="svg-axis" />
                      <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
                      <text x="190" y="195" className="svg-text" textAnchor="middle" style={{ fontWeight: 600 }}>Cutoff φ*</text>
                      <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{ fontWeight: 600 }}>Avg Profit π</text>

                      {/* FE curve (static) */}
                      <path 
                        d={Array.from({ length: 30 }, (_, idx) => {
                          const phiVal = 1.0 + idx * 0.1;
                          const profitVal = melDelta * melFe * Math.pow(phiVal, theta);
                          const x = 40 + ((phiVal - 1.0) / 2.0) * 300;
                          const y = 170 - (Math.min(5.0, profitVal) / 5) * 140;
                          return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')} 
                        className="svg-curve" 
                        stroke="var(--accent-secondary)" 
                      />

                      {/* Autarky ZCP reference curve (dashed) */}
                      {(() => {
                        const autY = 170 - (melAutData.avgProfit / 5) * 140;
                        return (
                          <line x1="40" y1={autY} x2="340" y2={autY} className="svg-curve-dashed" stroke="var(--text-muted)" />
                        );
                      })()}

                      {/* Open Economy ZCP line (solid shifting up) */}
                      {(() => {
                        const openY = 170 - (melOpenData.avgProfit / 5) * 140;
                        return (
                          <line x1="40" y1={openY} x2="340" y2={openY} className="svg-curve curve-shifting" stroke="var(--accent-primary)" />
                        );
                      })()}

                      {/* Intersection point - slides up along the static FE curve */}
                      {(() => {
                        const xPt = 40 + ((melOpenData.phiStar - 1.0) / 2.0) * 300;
                        const yPt = 170 - (melOpenData.avgProfit / 5) * 140;
                        return (
                          <>
                            <circle cx={xPt} cy={yPt} r="6" fill="var(--accent-warning)" className="svg-marker" />
                            <text x={xPt - 12} y={yPt - 8} textAnchor="end" className="svg-text-bold svg-text">E_open</text>
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                  <div className="svg-legend">
                    <span><span style={{ color: 'var(--accent-primary)' }}>■</span> ZCP (shifted)</span>
                    <span><span style={{ color: 'var(--accent-secondary)' }}>■</span> FE (static)</span>
                    <span><span style={{ color: 'var(--text-muted)' }}>--</span> ZCP (original)</span>
                    <span><span style={{ color: 'var(--accent-warning)' }}>●</span> E_open</span>
                  </div>
                  <div className="implications-panel" style={{ margin: 0 }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      {`Labor Channel Selection: Opening trade shifts the ZCP line upward due to exporting profits. The intersection point slides upward along the static FE curve. Exporters expand, bidding up wages and driving the cutoff threshold upward ($\\varphi^* > \\varphi^*_a$), which forces low-productivity domestic firms to exit.`}
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
      {/* TAB 4.5: MELITZ-PARETO & DISTORTED GRAVITY */}
      {/* ======================================================== */}
      {moduleTab === "4.5 Melitz-Pareto: Distorted Gravity" && (
        <div className="lesson-step-content">
          <div className="stepper-section-title">
            4.5 Melitz-Pareto: Distorted Gravity
          </div>

          <div className="stepper-header">
            <button className={`step-indicator-btn ${activeMathStep === 1 ? 'active' : ''}`} onClick={() => setActiveMathStep(1)}>
              <span className="step-num-badge">1</span> Step 1: Nested Preferences
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 2 ? 'active' : ''}`} onClick={() => setActiveMathStep(2)}>
              <span className="step-num-badge">2</span> Step 2: Integrations &amp; Margins
            </button>
            <button className={`step-indicator-btn ${activeMathStep === 3 ? 'active' : ''}`} onClick={() => setActiveMathStep(3)}>
              <span className="step-num-badge">3</span> Step 3: Gravity &amp; Chaney Margin
            </button>
          </div>

          <div className="stepper-card-body">
            {activeMathStep === 1 && (
              <div>
                <h4>Nested Preferences &amp; Bounded Pareto Draws</h4>
                <DefinitionBox title="Environment">
                  {`Countries $i, j = 1,\\dots,N$; labor endowments $L_i$; iceberg costs $d_{ij}$. Firms are heterogeneous in productivity $\\varphi$. Fixed costs: prospective entrants in $i$ pay a sunk entry cost (in domestic labor) to draw $\\varphi$; upon entry, selling to market $j$ (including the home market) costs a per-market fixed fee, paid in units of destination labor. Monopolistic competition throughout.`}
                </DefinitionBox>
                <p>
                  {`To represent gravity structurally, Melitz-Pareto nests preferences: an upper-tier substitution elasticity $\\sigma > 1$ between origins, and a lower-tier substitution elasticity $\\gamma > 1$ between individual varieties. Factory gate pricing matches:`}
                </p>
                {`$$p_{ij}(\\varphi) = \\bar{\\gamma} \\frac{d_{ij}w_i}{\\varphi}, \\quad \\bar{\\gamma} \\equiv \\frac{\\gamma}{\\gamma - 1}$$`}
                <DefinitionBox title="Nested CES preferences">
                  {`Upper tier (elasticity $\\sigma > 1$): substitution between country-of-origin composites — the Armington margin. Lower tier (elasticity $\\gamma > 1$): substitution between individual firms within an origin — the Krugman/Melitz margin. Often $\\gamma \\ge \\sigma$: two French firms' products are closer substitutes than "French goods" vs "German goods." Firm demand chains the two tiers:`}
                  {`$$x_{ij}(\\varphi) \\equiv p_{ij}(\\varphi)q_{ij}(\\varphi) = \\left( \\frac{p_{ij}(\\varphi)}{P_{ij}} \\right)^{1-\\gamma} \\left( \\frac{P_{ij}}{P_j} \\right)^{1-\\sigma} X_j$$`}
                  {`with bilateral index $P_{ij} = [ \\int p_{ij}(\\varphi)^{1-\\gamma} M_i dG_i(\\varphi) ]^{\\frac{1}{1-\\gamma}}$ and consumer index $P_j = [ \\sum_i P_{ij}^{1-\\sigma} ]^{\\frac{1}{1-\\sigma}}$.`}
                </DefinitionBox>
                <DefinitionBox title="Pareto productivity">
                  {`Productivity is drawn from a Pareto distribution with shape parameter $\\theta > 1$ (dispersion: higher $\\theta$ = more similar firms) and country scale $a_i$. The crucial property: a Pareto distribution truncated from below is still Pareto with the same shape $\\theta$. Since Melitz selection is exactly truncation from below at $\\varphi^*_{ij}$, the distribution of active firms stays Pareto — this is why everything integrates into clean power functions.`}
                </DefinitionBox>
                <p>
                  {`Productivity draws follow a Pareto distribution:`}
                </p>
                {`$$G_i(\\varphi) = 1 - \\left( \\frac{\\varphi}{a_i} \\right)^{-\\theta}, \\quad g_i(\\varphi) = \\theta a_i^{\\theta} \\varphi^{-\\theta-1}$$`}
                <div className="sub-step-box">
                  <span className="sub-step-title purple-title">🌟 Superstar Convergence Bound</span>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {`Integrating firm revenues requires that the tail of the productivity distribution declines faster than substitution scales. This establishes the superstar convergence bound:`}
                    {`$$\\theta > \\gamma - 1$$`}
                    {`If this condition is violated, the aggregate market size becomes infinite, and the largest superstar firm dominates the entire economy.`}
                  </p>
                </div>
                <IntuitionBox title="Why θ > γ − 1?">
                  {`Sales rise with productivity, but the Pareto density thins with productivity too. If firms are too heterogeneous relative to how strongly sales reward productivity, a handful of superstars would carry infinite sales. The convergence condition $\\theta > \\gamma - 1$ keeps the superstar tail integrable — the same tension as the analogous condition in Eaton-Kortum.`}
                </IntuitionBox>
                <IntuitionBox title="What each parameter will do">
                  {`Keep a scorecard: $\\gamma$ governs competition between firms (markups, firm-level demand curves); $\\sigma$ governs substitution between countries; $\\theta$ governs how heterogeneous firms are, hence how strong selection margins are. The punchline of this part is which combination of the three ends up as the aggregate trade elasticity — and it will not be the one Armington intuition suggests.`}
                </IntuitionBox>
              </div>
            )}

            {activeMathStep === 2 && (
              <div>
                <h4>Bilateral Marketing Access Fees &amp; Entry Mass</h4>
                <p>
                  {`Under Pareto, the aggregate marketing and access fees collapse into a constant share of total sales:`}
                </p>
                {`$$\\Gamma_{ij} = \\frac{\\theta - \\gamma + 1}{\\theta\\gamma} X_{ij}$$`}
                <div className="sub-step-box">
                  <span className="sub-step-title purple-title">⚖️ Endogenous Entry Mass</span>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {`This constant-share collapse pins down the endogenous entry mass parameter dynamically relative to market population and entry scale:`}
                    {`$$M_i = \\frac{\\gamma - 1}{\\theta\\gamma} \\frac{L_i}{f_i^{(e)}}$$`}
                  </p>
                </div>
              </div>
            )}

            {activeMathStep === 3 && (
              <div>
                <h4>Structural Gravity &amp; Chaney's Margin Decomposition</h4>
                <p>
                  {`Integrating bilateral trade yields the distorted gravity allocation equation:`}
                </p>
                {`$$\\pi_{ij} \\equiv \\frac{X_{ij}}{X_j} = \\frac{A_{ij}(d_{ij}w_i)^{-\\theta\\lambda}}{\\sum_l A_{lj}(d_{lj}w_l)^{-\\theta\\lambda}}$$`}
                <p>
                  {`where the distorted trade elasticity coefficient $\\lambda$ satisfies:`}
                </p>
                {`$$\\lambda \\equiv \\left[ 1 + \\theta \\left( \\frac{1}{\\sigma - 1} - \\frac{1}{\\gamma - 1} \\right) \\right]^{-1}$$`}
                <IntuitionBox title="Why 'distorted' gravity — and what the elasticity means">
                  {`The model looks exactly like Armington/EK gravity from the outside, but in the special case $\\sigma = \\gamma$, the substitution elasticities drop out of the aggregate trade elasticity entirely, leaving just $\\theta$. This is Chaney's margin decomposition: when trade costs fall, existing exporters sell more (intensive margin) and new, less productive firms start exporting (extensive margin) — with Pareto firms these are perfect complements, so the total is always $\\theta$ regardless of $\\sigma$.`}
                </IntuitionBox>
                <div className="sub-step-box">
                  <span className="sub-step-title purple-title">📊 Chaney's Margin Decomposition Panel</span>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {`When symmetric ($\\sigma = \\gamma$), the distorted elasticity coefficient resolves to $\\lambda = 1$, simplifying trade elasticity to $\\epsilon = \\theta$. Chaney (2008) decomposes this into two margins:`}
                    {`$$\\epsilon = \\underbrace{(\\sigma - 1)}_\\text{Intensive Margin} + \\underbrace{\\theta - (\\sigma - 1)}_\\text{Extensive Margin}$$`}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tab 5 Interactive Sandbox */}
          <div className="sliders-grid">
            <div className="slider-card">
              <label>
                <span>{`Substitution Elasticity ($\\sigma$):`}</span>
                <span className="val-highlight-purple">{chaneySigma.toFixed(1)}</span>
              </label>
              <input 
                type="range" min="1.5" max="6.0" step="0.1"
                value={chaneySigma} onChange={(e) => setChaneySigma(Number(e.target.value))} 
                className="range-slider slider-purple"
              />
            </div>
            <div className="slider-card">
              <label>
                <span>{`Pareto Dispersion Parameter ($\\theta$):`}</span>
                <span className="val-highlight-purple">{chaneyTheta.toFixed(1)}</span>
              </label>
              <input 
                type="range" min="2.0" max="8.0" step="0.1"
                value={chaneyTheta} onChange={(e) => handleThetaChange(Number(e.target.value))} 
                className="range-slider slider-purple"
              />
            </div>
          </div>

          <div className="svg-canvas-row">
            <div className="svg-canvas-card" style={{ gridColumn: 'span 2' }}>
              <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
                📊 Chaney's Stacked Trade Elasticity Margin Decomposition
              </div>
              <div className="chaney-chart-wrapper">
                <div className="stacked-bar-container">
                  <div 
                    className="stacked-bar-segment intensive" 
                    style={{ width: `${intensivePct}%` }}
                  >
                    {intensivePct > 15 && `Intensive: ${(chaneySigma - 1).toFixed(1)}`}
                  </div>
                  <div 
                    className="stacked-bar-segment extensive" 
                    style={{ width: `${extensivePct}%` }}
                  >
                    {extensivePct > 15 && `Extensive: ${extensiveMargin.toFixed(1)}`}
                  </div>
                </div>

                <div className="stacked-legend">
                  <div className="stacked-legend-item">
                    <span className="legend-color-dot dot-intensive"></span>
                    <span>{`Intensive Margin: $\\sigma - 1$ = ${(chaneySigma - 1).toFixed(1)}`}</span>
                  </div>
                  <div className="stacked-legend-item">
                    <span className="legend-color-dot dot-extensive"></span>
                    <span>{`Extensive Margin: $\\theta - (\\sigma - 1)$ = ${extensiveMargin.toFixed(1)}`}</span>
                  </div>
                  <div className="stacked-legend-item" style={{ fontWeight: 'bold' }}>
                    <span>{`Total Elasticity: $\\theta$ = ${chaneyTheta.toFixed(1)}`}</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                {`Margin Implication: Increase the preference substitution parameter $\\sigma$. Observe how the intensive margin expands as consumers respond aggressively to price changes, but the extensive margin shrinks correspondingly. Because marginal exporters enter the market at a negligible scale when goods are highly substitutable, the aggregate elasticity remains locked at $\\theta$.`}
              </p>
            </div>
          </div>

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
      {/* TAB 4.6: FINAL EXAM */}
      {/* ======================================================== */}
      {moduleTab === "4.6 Module 4 Final Exam" && <Module4Quiz />}

      {/* Next Lesson Navigation Button */}
      {(() => {
        const currentTabIdx = tabsList.indexOf(moduleTab);
        if (currentTabIdx === -1) return null;
        
        const isLastLesson = currentTabIdx === tabsList.length - 2;
        const isExamTab = currentTabIdx === tabsList.length - 1;
        
        let label = "Next Lesson";
        if (isLastLesson) {
          label = "Take the Final Exam";
        } else if (isExamTab) {
          label = "Next Module: Trade Policy & Welfare";
        } else {
          label = `Next Lesson: ${tabsList[currentTabIdx + 1].split(': ')[1] || tabsList[currentTabIdx + 1]}`;
        }

        return (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem', borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem' }}>
            <button
              onClick={() => {
                if (!isExamTab) {
                  handleTabChange(tabsList[currentTabIdx + 1]);
                } else {
                  setActiveTab('module5');
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
