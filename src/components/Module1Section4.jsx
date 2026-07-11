import React, { useState, useEffect } from 'react';
import './Module1Section4.css';
import TutorTip from './TutorTip';

export default function Module1Section4({ theme }) {
  // Sliders state
  const [wRel, setWRel] = useState(1.5); // w_H / w_F
  const [dIce, setDIce] = useState(1.2); // d_HF = d_FH = d
  const [TH, setTH] = useState(3.0);
  const [TF, setTF] = useState(2.0);
  const [theta, setTheta] = useState(2.5);

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Stepper state
  const [activeMathStep, setActiveMathStep] = useState(1);

  // Trigger MathJax typesetting on render and state updates
  useEffect(() => {
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [wRel, dIce, TH, TF, theta, currentQuestion, selectedAnswer, quizSubmitted, activeMathStep]);

  // Quiz questions
  const quizQuestions = [
    {
      question: "In the Eaton-Kortum model, how does a country's market share $\\pi_{ij}$ in destination $j$ respond to its own wage $w_i$ and technology $T_i$?",
      options: [
        "Option A: It increases with both $w_i$ and $T_i$.",
        "Option B: It decreases with $w_i$ (higher cost) and increases with $T_i$ (better technology).",
        "Option C: It is independent of wages and only depends on iceberg costs.",
        "Option D: It increases with $w_i$ and decreases with $T_i$."
      ],
      correctIndex: 1,
      explanation: "Correct! The selection probability $\\pi_{ij} = T_i (d_{ij}w_i)^{-\\theta} / \\Phi_j$ shows that higher productivity $T_i$ makes the country more competitive (raising shares), while higher wages $w_i$ increase production costs (reducing shares)."
    },
    {
      question: "What is the distribution of the minimum delivered prices in a destination market $j$ under the Eaton-Kortum model?",
      options: [
        "Option A: Fréchet, because prices inherit the productivity distribution directly.",
        "Option B: Weibull, representing the minimum of extreme values.",
        "Option C: Pareto, because it has scale invariance.",
        "Option D: Gumbel, which models the difference between two variables."
      ],
      correctIndex: 1,
      explanation: "Correct! Since delivered prices are inversely proportional to productivity ($P_{ij} = d_{ij}w_i/Z_i$), the distribution of the minimum delivered price $P_j = \\min_i \\{P_{ij}\\}$ takes the Weibull distribution form: $F_j(p) = 1 - e^{-\\Phi_j p^\\theta}$."
    },
    {
      question: "If bilateral iceberg costs $d_{ij}$ increase between country $i$ and country $j$, what happens to the market-access statistic $\\Phi_j$ and the price distribution in country $j$?",
      options: [
        "Option A: $\\Phi_j$ increases, and prices fall.",
        "Option B: $\\Phi_j$ decreases, and prices rise (shifting the delivered price distribution to the right).",
        "Option C: $\\Phi_j$ remains constant, and prices do not change.",
        "Option D: $\\Phi_j$ drops to zero, and trade is unaffected."
      ],
      correctIndex: 1,
      explanation: "Correct! Iceberg costs reduce the market-access statistic $\\Phi_j = \\sum_i T_i (d_{ij}w_i)^{-\\theta}$. Since $\\Phi_j$ is the rate of low prices, a lower $\\Phi_j$ shifts the Weibull delivered price PDF rightward, leading to higher average prices in market $j$ due to reduced foreign competition."
    }
  ];

  const handleOptionSelect = (index) => {
    if (quizSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
  };

  const handleNextQuiz = () => {
    setCurrentQuestion((prev) => (prev + 1) % quizQuestions.length);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
  };

  // Wages: normalize w_F = 1.0, w_H = wRel
  const wH = wRel;
  const wF = 1.0;

  // Bilateral trade costs: symmetric d
  const d = dIce;

  // Compute market-access statistics Phi
  // Phi_H = T_H * (w_H)^(-theta) + T_F * (d * w_F)^(-theta)
  const PhiH = TH * Math.pow(wH, -theta) + TF * Math.pow(d * wF, -theta);
  // Phi_F = T_H * (d * w_H)^(-theta) + T_F * (w_F)^(-theta)
  const PhiF = TH * Math.pow(d * wH, -theta) + TF * Math.pow(wF, -theta);

  // Compute selection shares (probabilities)
  // Home market (j = H)
  const piHH = (TH * Math.pow(wH, -theta)) / PhiH;
  const piFH = (TF * Math.pow(d * wF, -theta)) / PhiH;

  // Foreign market (j = F)
  const piHF = (TH * Math.pow(d * wH, -theta)) / PhiF;
  const piFF = (TF * Math.pow(wF, -theta)) / PhiF;

  // Helper to generate SVG path for Weibull PDF
  // f_j(p) = theta * Phi_j * p^(theta - 1) * e^(-Phi_j * p^theta)
  const generateWeibullPath = (Phi, thetaVal) => {
    const points = [];
    const step = 0.03;
    const maxP = 4.0;
    
    // Find peak value to scale graph
    let maxVal = 0.1;
    for (let p = 0.02; p <= maxP; p += step) {
      const y = thetaVal * Phi * Math.pow(p, thetaVal - 1) * Math.exp(-Phi * Math.pow(p, thetaVal));
      if (y > maxVal) maxVal = y;
    }

    const yMax = Math.max(1.8, maxVal * 1.15);

    // Initial point at p = 0
    points.push(`40,170`);

    for (let p = 0.01; p <= maxP; p += step) {
      const y = thetaVal * Phi * Math.pow(p, thetaVal - 1) * Math.exp(-Phi * Math.pow(p, thetaVal));
      
      // SVG: width=360, height=200
      // Margin: left=40, right=15, top=15, bottom=30
      const x = 40 + (p / maxP) * 305;
      const svgY = 170 - (y / yMax) * 145;
      
      points.push(`${x.toFixed(1)},${svgY.toFixed(1)}`);
    }

    // End point at maxP
    const lastX = 40 + 305;
    points.push(`${lastX},170`);

    const pathData = `M ${points.join(' L ')}`;
    const areaData = `${pathData} L 345,170 L 40,170 Z`;

    // Compute expected price (analytical mean of Weibull)
    // E[P] = Phi^(-1/theta) * Gamma(1 + 1/theta)
    // Integrate numerically
    let sumP = 0;
    let sumW = 0;
    for (let p = 0.005; p <= maxP; p += 0.01) {
      const y = thetaVal * Phi * Math.pow(p, thetaVal - 1) * Math.exp(-Phi * Math.pow(p, thetaVal));
      sumP += p * y * 0.01;
      sumW += y * 0.01;
    }
    const meanP = sumW > 0 ? sumP / sumW : 0;
    const meanX = 40 + (meanP / maxP) * 305;

    return { pathData, areaData, yMax, meanP, meanX };
  };

  const pathH = generateWeibullPath(PhiH, theta);
  const pathF = generateWeibullPath(PhiF, theta);

  return (
    <div className="section4-container">
      {/* Overview & Intuition */}
      <div className="lesson-card" style={{ borderLeft: '4px solid var(--accent-secondary)' }}>
        <h3>1.4 The Probabilistic Ricardian Model: Integrating EK &amp; DFS</h3>
        <p>
          Now, we integrate the probabilistic technology frontier from <strong>Eaton-Kortum (2002)</strong> into a 
          multi-country Ricardian framework. 
          By combining the extreme value mathematics of the Fréchet frontier with wages and iceberg trade costs, 
          we resolve the Dornbusch-Fischer-Samuelson (DFS) continuum model for multiple countries in a highly elegant way.
        </p>

        <div style={{ margin: '16px 0', padding: '16px', background: 'rgba(139, 92, 246, 0.03)', borderLeft: '4px solid var(--accent-secondary)', borderRadius: '0 var(--border-radius-sm) var(--border-radius-sm) 0' }}>
          <h5>🎲 The Lottery of Global Competition</h5>
          <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-secondary)' }}>
            {"For each good, Home and Foreign draw their productivities $Z_H$ and $Z_F$ from their respective technology frontiers."} 
            {"Because trade incurs transport costs and wages differ, the delivered price from country $i$ to market $j$ is:"}
            {"$$P_{ij} = \\frac{d_{ij} w_i}{Z_i}$$"}
            {"Buyers in market $j$ buy from the cheapest supplier. Hence, the actual price in market $j$ is the minimum of all delivered prices: $P_j = \\min \\{P_{Hj}, P_{Fj}\\}$. The country that draws the highest relative productivity to offset its relative wage and trade costs wins the market!"}
          </p>
        </div>
      </div>

      {/* Mathematical Derivations Stepper Wizard */}
      <div className="lesson-card">
        <h3>Mathematical Derivations Stepper Wizard</h3>
        <p style={{ marginBottom: '16px' }}>
          Follow the step-by-step interactive integration of the Eaton-Kortum technology frontier into a Ricardian continuum framework.
        </p>

        {/* Stepper Header Navigation */}
        <div className="stepper-header">
          <button 
            className={`step-indicator-btn ${activeMathStep === 1 ? 'active' : ''}`}
            onClick={() => setActiveMathStep(1)}
          >
            <span className="step-num-badge">1</span>
            <span>Relative Productivity</span>
          </button>
          <button 
            className={`step-indicator-btn ${activeMathStep === 2 ? 'active' : ''}`}
            onClick={() => setActiveMathStep(2)}
          >
            <span className="step-num-badge">2</span>
            <span>Selection &amp; Gravity</span>
          </button>
          <button 
            className={`step-indicator-btn ${activeMathStep === 3 ? 'active' : ''}`}
            onClick={() => setActiveMathStep(3)}
          >
            <span className="step-num-badge">3</span>
            <span>Weibull Delivered Prices</span>
          </button>
        </div>

        {/* Stepper Card Body */}
        <div className="stepper-card-body">
          {activeMathStep === 1 && (
            <div>
              <h4>Step 1: Relative Productivity Derivation ($A = Z_H / Z_F$)</h4>
              <p>
                Let $Z_H \sim \text&#123;Fréchet&#125;(T_H, \theta)$ and $Z_F \sim \text&#123;Fréchet&#125;(T_F, \theta)$ be independent random variables representing country productivity frontiers.
              </p>
              <p>
                By the law of total probability, the probability that relative productivity $A = Z_H / Z_F$ is less than or equal to $a$ is:
                $$Pr(A \le a) = Pr(Z_H \le a Z_F) = \int_0^&#123;\infty&#125; Pr(Z_H \le a z) f_F(z) dz$$
                $$Pr(A \le a) = \int_0^&#123;\infty&#125; e^&#123;-T_H (a z)^&#123;-\theta&#125;&#125; \left( \theta T_F z^&#123;-\theta-1&#125; e^&#123;-T_F z^&#123;-\theta&#125;&#125; \right) dz$$
                $$Pr(A \le a) = \int_0^&#123;\infty&#125; \theta T_F z^&#123;-\theta-1&#125; e^&#123;-(T_H a^&#123;-\theta&#125; + T_F) z^&#123;-\theta&#125;&#125; dz$$
              </p>
              
              <div className="sub-step-box">
                <span className="sub-step-title">⚡ Substitution and Integration</span>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  Using the substitution $u = (T_H a^&#123;-\theta&#125; + T_F) z^&#123;-\theta&#125;$, we find:
                  $$du = -\theta (T_H a^&#123;-\theta&#125; + T_F) z^&#123;-\theta-1&#125; dz \implies \theta z^&#123;-\theta-1&#125; dz = -\frac&#123;1&#125;&#123;T_H a^&#123;-\theta&#125; + T_F&#125; du$$
                  Substituting the boundaries and integrating from $\infty$ to $0$:
                  $$Pr(A \le a) = \int_&#123;\infty&#125;^0 T_F e^&#123;-u&#125; \left( -\frac&#123;1&#125;&#123;T_H a^&#123;-\theta&#125; + T_F&#125; \right) du = \frac&#123;T_F&#125;&#123;T_H a^&#123;-\theta&#125; + T_F&#125; \int_0^&#123;\infty&#125; e^&#123;-u&#125; du = \frac&#123;T_F&#125;&#123;T_H a^&#123;-\theta&#125; + T_F&#125;$$
                  Dividing numerator and denominator by $T_F$ yields the final closed form:
                  $$Pr(A \le a) = \frac&#123;1&#125;&#123;1 + \frac&#123;T_H&#125;&#123;T_F&#125; a^&#123;-\theta&#125;&#125;$$
                </p>
              </div>
            </div>
          )}

          {activeMathStep === 2 && (
            <div>
              <h4>Step 2: Selection Shares &amp; Inward Multilateral Resistance</h4>
              <p>
                Under perfect competition, buyers in destination $j$ buy from the cheapest country. The probability that Home is the cheapest supplier to $j$ is:
                $$\pi_&#123;Hj&#125; = Pr\left( P_&#123;Hj&#125; \le P_&#123;Fj&#125; \right) = Pr\left( \frac&#123;w_H d_&#123;Hj&#125;&#125;&#123;Z_H&#125; \le \frac&#123;w_F d_&#123;Fj&#125;&#125;&#123;Z_F&#125; \right) = Pr\left( A \ge \frac&#123;w_H d_&#123;Hj&#125;&#125;&#123;w_F d_&#123;Fj&#125;&#125; \right) = 1 - Pr\left( A \le \frac&#123;w_H d_&#123;Hj&#125;&#125;&#123;w_F d_&#123;Fj&#125;&#125; \right)$$
              </p>

              <div className="sub-step-box">
                <span className="sub-step-title">🌐 The Structural Selection Formula</span>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  Evaluating the relative productivity CDF at $a = \frac&#123;w_H d_&#123;Hj&#125;&#125;&#123;w_F d_&#123;Fj&#125;&#125;$:
                  $$\pi_&#123;Hj&#125; = 1 - \frac&#123;T_F&#125;&#123;T_H \left( \frac&#123;w_H d_&#123;Hj&#125;&#125;&#123;w_F d_&#123;Fj&#125;&#125; \right)^&#123;-\theta&#125; + T_F&#125; = \frac&#123;T_H (w_H d_&#123;Hj&#125;)^&#123;-\theta&#125;&#125;&#123;T_H (w_H d_&#123;Hj&#125;)^&#123;-\theta&#125; + T_F (w_F d_&#123;Fj&#125;)^&#123;-\theta&#125;&#125;$$
                  In a general $N$-country model, the selection share of source $i$ in destination $j$ is:
                  $$\pi_&#123;ij&#125; = \frac&#123;T_i (d_&#123;ij&#125; w_i)^&#123;-\theta&#125;&#125;&#123;\Phi_j&#125;$$
                  where we define the market access (inward multilateral resistance) statistic $\Phi_j$:
                  $$\Phi_j = \sum_k T_k (d_&#123;kj&#125; w_k)^&#123;-\theta&#125;$$
                </p>
              </div>

              <div className="sub-step-box">
                <span className="sub-step-title">📊 Law of Large Numbers (LLN) Link</span>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  Because there is a continuum of goods indexed on $[0,1]$, the probability $\pi_&#123;ij&#125;$ of country $i$ being the cheapest supplier translates exactly into the fraction of goods categories imported from $i$. Hence, $\pi_&#123;ij&#125;$ matches the actual trade shares: $\frac&#123;X_&#123;ij&#125;&#125;&#123;X_j&#125; = \pi_&#123;ij&#125;$.
                </p>
              </div>
            </div>
          )}

          {activeMathStep === 3 && (
            <div>
              <h4>Step 3: Delivered Minimum Prices &amp; The Weibull Mirror</h4>
              <p>
                Let us analyze the final price paid by consumers in market $j$.
              </p>

              <div className="sub-step-box">
                <span className="sub-step-title">⚡ Delivered Price CDF for a Single Source</span>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  The delivered price from country $i$ to market $j$ has CDF:
                  $$F_&#123;P_&#123;ij&#125;&#125;(p) = Pr\left( \frac&#123;d_&#123;ij&#125; w_i&#125;&#123;Z_i&#125; \le p \right) = Pr\left( Z_i \ge \frac&#123;d_&#123;ij&#125; w_i&#125;&#123;p&#125; \right) = 1 - e^&#123;-T_i (d_&#123;ij&#125; w_i)^&#123;-\theta&#125; p^\theta&#125;$$
                </p>
              </div>

              <div className="sub-step-box">
                <span className="sub-step-title">🔗 Price Minima and independence complement trick</span>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  The actual price is the minimum of delivered prices. Using independence: 
                  $$F_j(p) = 1 - Pr(P_j &gt; p) = 1 - \prod_i Pr(P_&#123;ij&#125; &gt; p) = 1 - \prod_i e^&#123;-T_i (d_&#123;ij&#125; w_i)^&#123;-\theta&#125; p^\theta&#125; = 1 - e^&#123;-\Phi_j p^\theta&#125;$$
                  This is a <strong>Weibull distribution</strong> for prices in destination market $j$.
                </p>
              </div>

              <div className="sub-step-box">
                <span className="sub-step-title">📈 Delivered Price PDF Profile</span>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  Differentiating the CDF with respect to $p$ gives the density curve of prices:
                  $$f_j(p) = \frac&#123;d&#125;&#123;dp&#125; F_j(p) = \theta \Phi_j p^&#123;\theta-1&#125; e^&#123;-\Phi_j p^\theta&#125;$$
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stepper Controls Navigation */}
        <div className="stepper-controls">
          <button 
            className="quiz-btn quiz-btn-secondary"
            onClick={() => setActiveMathStep((prev) => Math.max(1, prev - 1))}
            disabled={activeMathStep === 1}
          >
            ← Previous Step
          </button>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Step {activeMathStep} of 3
          </span>
          <button 
            className="quiz-btn quiz-btn-primary"
            onClick={() => setActiveMathStep((prev) => Math.min(3, prev + 1))}
            disabled={activeMathStep === 3}
          >
            Next Step →
          </button>
        </div>
      </div>

      {/* Symbology Key */}
      <div className="lesson-card">
        <h3>Symbology Key</h3>
        <div className="symbology-grid">
          <div className="symbol-item">
            <span className="symbol-math">w_i</span>
            <span className="symbol-name">Wage Rate</span>
            <span className="symbol-desc">{"The labor cost in country $i$, representing the nominal cost base."}</span>
          </div>
          <div className="symbol-item">
            <span className="symbol-math">d_&#123;ij&#125;</span>
            <span className="symbol-name">Iceberg Trade Cost</span>
            <span className="symbol-desc">{"Transport costs ($d_{ij} \\ge 1$). Country $i$ must ship $d_{ij}$ units for 1 unit to arrive at $j$."}</span>
          </div>
          <div className="symbol-item">
            <span className="symbol-math">\pi_&#123;ij&#125;</span>
            <span className="symbol-name">Selection Share</span>
            <span className="symbol-desc">{"Probability that country $i$ is the cheapest supplier to $j$ (equals import share)."}</span>
          </div>
          <div className="symbol-item">
            <span className="symbol-math">\Phi_j</span>
            <span className="symbol-name">Market Access</span>
            <span className="symbol-desc">{"State index of market access. Measures the rate of low-price arrivals in market $j$."}</span>
          </div>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="sliders-grid">
        <div className="slider-card">
          <label>
            <span>{"Relative Wage ($w_H/w_F$):"}</span>
            <span>{wRel.toFixed(1)}</span>
          </label>
          <input 
            type="range" min="0.2" max="5.0" step="0.1" 
            value={wRel} onChange={(e) => setWRel(Number(e.target.value))} 
            className="range-slider"
          />
        </div>
        <div className="slider-card">
          <label>
            <span>{"Iceberg Trade Cost ($d_{HF}$):"}</span>
            <span>{dIce.toFixed(2)}</span>
          </label>
          <input 
            type="range" min="1.0" max="3.0" step="0.05" 
            value={dIce} onChange={(e) => setDIce(Number(e.target.value))} 
            className="range-slider"
          />
        </div>
        <div className="slider-card">
          <label>
            <span>{"Home Tech ($T_H$):"}</span>
            <span>{TH.toFixed(1)}</span>
          </label>
          <input 
            type="range" min="1.0" max="10.0" step="0.1" 
            value={TH} onChange={(e) => setTH(Number(e.target.value))} 
            className="range-slider"
          />
        </div>
        <div className="slider-card">
          <label>
            <span>{"Foreign Tech ($T_F$):"}</span>
            <span>{TF.toFixed(1)}</span>
          </label>
          <input 
            type="range" min="1.0" max="10.0" step="0.1" 
            value={TF} onChange={(e) => setTF(Number(e.target.value))} 
            className="range-slider"
          />
        </div>
      </div>

      {/* SVG panels */}
      <div className="svg-panels-row">
        {/* Home Market Panel */}
        <div className="svg-panel-card">
          <div className="svg-title" style={{ color: 'var(--accent-primary)' }}>
            <span>🏠 Home Market Prices ($j=H$)</span>
          </div>
          <div className="svg-wrapper">
            <svg viewBox="0 0 360 200" width="100%" height="100%">
              {/* Grid Lines */}
              <line x1="40" y1="170" x2="345" y2="170" className="svg-axis" />
              <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
              <line x1="116.25" y1="20" x2="116.25" y2="170" className="svg-grid-line" />
              <line x1="192.5" y1="20" x2="192.5" y2="170" className="svg-grid-line" />
              <line x1="268.75" y1="20" x2="268.75" y2="170" className="svg-grid-line" />
              <line x1="345" y1="20" x2="345" y2="170" className="svg-grid-line" />

              {/* Labels */}
              <text x="40" y="185" className="svg-text" textAnchor="middle">0</text>
              <text x="116.25" y="185" className="svg-text" textAnchor="middle">1.0</text>
              <text x="192.5" y="185" className="svg-text" textAnchor="middle">2.0</text>
              <text x="268.75" y="185" className="svg-text" textAnchor="middle">3.0</text>
              <text x="345" y="185" className="svg-text" textAnchor="middle">4.0</text>
              <text x="192.5" y="196" className="svg-text" textAnchor="middle" style={{fontWeight:600}}>Price p</text>
              <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{fontWeight:600}}>Density f(p)</text>

              {/* Area and curve */}
              <path d={pathH.areaData} className="svg-area" fill="var(--accent-primary)" />
              <path d={pathH.pathData} className="svg-curve" stroke="var(--accent-primary)" />

              {/* Mean Price Line */}
              <line x1={pathH.meanX} y1="20" x2={pathH.meanX} y2="170" stroke="var(--accent-warning)" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
          </div>
          <div className="svg-legend" style={{ marginBottom: '8px' }}>
            <span><span style={{ color: 'var(--accent-primary)' }}>■</span> Home Prices</span>
            <span><span style={{ color: 'var(--accent-warning)' }}>--</span> E[P_H] Mean</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Expected price $E[P_H] \approx$ <strong>{pathH.meanP.toFixed(2)}</strong>
          </div>

          <div style={{ marginTop: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Supplier Market Shares:</span>
            <div className="share-bar-container">
              <div className="share-bar-segment" style={{ width: `${piHH * 100}%`, backgroundColor: 'var(--accent-primary)' }}>
                {piHH > 0.15 && `${(piHH * 100).toFixed(0)}%`}
              </div>
              <div className="share-bar-segment" style={{ width: `${piFH * 100}%`, backgroundColor: 'var(--accent-secondary)' }}>
                {piFH > 0.15 && `${(piFH * 100).toFixed(0)}%`}
              </div>
            </div>
            <div className="share-legend-row">
              <span>🏠 Home Local: {(piHH * 100).toFixed(1)}%</span>
              <span>🌐 Foreign Imports: {(piFH * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Foreign Market Panel */}
        <div className="svg-panel-card">
          <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
            <span>🌐 Foreign Market Prices ($j=F$)</span>
          </div>
          <div className="svg-wrapper">
            <svg viewBox="0 0 360 200" width="100%" height="100%">
              {/* Grid Lines */}
              <line x1="40" y1="170" x2="345" y2="170" className="svg-axis" />
              <line x1="40" y1="20" x2="40" y2="170" className="svg-axis" />
              <line x1="116.25" y1="20" x2="116.25" y2="170" className="svg-grid-line" />
              <line x1="192.5" y1="20" x2="192.5" y2="170" className="svg-grid-line" />
              <line x1="268.75" y1="20" x2="268.75" y2="170" className="svg-grid-line" />
              <line x1="345" y1="20" x2="345" y2="170" className="svg-grid-line" />

              {/* Labels */}
              <text x="40" y="185" className="svg-text" textAnchor="middle">0</text>
              <text x="116.25" y="185" className="svg-text" textAnchor="middle">1.0</text>
              <text x="192.5" y="185" className="svg-text" textAnchor="middle">2.0</text>
              <text x="268.75" y="185" className="svg-text" textAnchor="middle">3.0</text>
              <text x="345" y="185" className="svg-text" textAnchor="middle">4.0</text>
              <text x="192.5" y="196" className="svg-text" textAnchor="middle" style={{fontWeight:600}}>Price p</text>
              <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{fontWeight:600}}>Density f(p)</text>

              {/* Area and curve */}
              <path d={pathF.areaData} className="svg-area" fill="var(--accent-secondary)" />
              <path d={pathF.pathData} className="svg-curve" stroke="var(--accent-secondary)" />

              {/* Mean Price Line */}
              <line x1={pathF.meanX} y1="20" x2={pathF.meanX} y2="170" stroke="var(--accent-warning)" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
          </div>
          <div className="svg-legend" style={{ marginBottom: '8px' }}>
            <span><span style={{ color: 'var(--accent-secondary)' }}>■</span> Foreign Prices</span>
            <span><span style={{ color: 'var(--accent-warning)' }}>--</span> E[P_F] Mean</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Expected price $E[P_F] \approx$ <strong>{pathF.meanP.toFixed(2)}</strong>
          </div>

          <div style={{ marginTop: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Supplier Market Shares:</span>
            <div className="share-bar-container">
              <div className="share-bar-segment" style={{ width: `${piHF * 100}%`, backgroundColor: 'var(--accent-primary)' }}>
                {piHF > 0.15 && `${(piHF * 100).toFixed(0)}%`}
              </div>
              <div className="share-bar-segment" style={{ width: `${piFF * 100}%`, backgroundColor: 'var(--accent-secondary)' }}>
                {piFF > 0.15 && `${(piFF * 100).toFixed(0)}%`}
              </div>
            </div>
            <div className="share-legend-row">
              <span>🏠 Home Exports: {(piHF * 100).toFixed(1)}%</span>
              <span>🌐 Foreign Local: {(piFF * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Text */}
      <div className="lesson-card">
        <h4>📊 What these graphs show</h4>
        <p>
          These panels plot the Weibull density distribution of actual prices paid by consumers in each market ($f_j(p) = \theta \Phi_j p^&#123;\theta-1&#125; e^&#123;-\Phi_j p^\theta&#125;$), along with the supplier shares. The dashed orange line indicates the average price. The color bars at the bottom show which country supplies the goods (blue for Home, purple for Foreign).
        </p>

        <h4>🧭 What to notice</h4>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.95rem' }}>
          <li>
            Increase Relative Wage ($w_H/w_F$): Slide $w_H/w_F$ upward. Observe that Home exports in Foreign drop (the blue segment in the right bar contracts), and local prices in Home shift rightward (higher average prices) because Home labor costs have risen.
          </li>
          <li>
            Increase Iceberg Trade Cost ($d_&#123;HF&#125;$): Slide $d_&#123;HF&#125;$ upward. Notice that the volume of trade contracts in both markets: Home buys less from Foreign (purple segment in Left bar contracts), and Foreign buys less from Home (blue segment in Right bar contracts). Additionally, both price distribution curves shift rightward, meaning average consumer prices rise everywhere due to reduced competition.
          </li>
          <li>
            Technology Improvement ($T_H$): Increasing $T_H$ shifts the price distributions leftward (lower prices) in both markets, but especially at Home, making Home exporters dominant globally.
          </li>
        </ul>
      </div>

      {/* Tutor Tips & Common Mistakes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <TutorTip tip="The market access statistic \Phi_j represents how easy it is for destination j to source cheap goods from the world. A higher \Phi_j shifts the Weibull price distribution to the left (towards zero), increasing overall real purchasing power and consumer welfare." />
        
        <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.15)', borderLeft: '4px solid var(--accent-error)', padding: '16px', borderRadius: 'var(--border-radius-md)' }}>
          <h5 style={{ color: 'var(--accent-error)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            ⚠️ Common Mistakes
          </h5>
          <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-secondary)' }}>
            {"Do not assume that trade shares $\\pi_{ij}$ represent physical quantities. By the Law of Large Numbers, $\\pi_{ij}$ is the fraction of goods categories that country $j$ imports from $i$. However, because of extreme value math, the average price of goods that country $j$ imports from country $i$ is exactly equal to the average price of goods it buys locally!"}
          </p>
        </div>
      </div>

      {/* Interactive Quiz */}
      <div className="section-quiz-card">
        <h4 style={{ color: 'var(--accent-secondary)', marginBottom: '8px' }}>
          📝 Section 1.4 Quick Assessment
        </h4>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Question {currentQuestion + 1} of {quizQuestions.length}
        </span>
        
        <div className="quiz-question-box" style={{ marginTop: '16px' }}>
          <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>
            {quizQuestions[currentQuestion].question}
          </p>
          
          <div className="quiz-options-list">
            {quizQuestions[currentQuestion].options.map((option, idx) => {
              let btnClass = "";
              if (quizSubmitted) {
                if (idx === quizQuestions[currentQuestion].correctIndex) {
                  btnClass = "highlight-correct";
                }
                if (selectedAnswer === idx) {
                  btnClass = idx === quizQuestions[currentQuestion].correctIndex 
                    ? "selected-correct" 
                    : "selected-incorrect";
                }
              } else if (selectedAnswer === idx) {
                btnClass = "selected-correct"; // generic selected look
              }
              
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={quizSubmitted}
                  className={`quiz-option-item ${btnClass}`}
                >
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {quizSubmitted && (
          <div className={`quiz-feedback-box ${selectedAnswer === quizQuestions[currentQuestion].correctIndex ? 'correct' : 'incorrect'}`}>
            <strong>{selectedAnswer === quizQuestions[currentQuestion].correctIndex ? "🎉 Correct!" : "❌ Incorrect"}</strong>
            <p style={{ marginTop: '6px', margin: 0 }}>
              {quizQuestions[currentQuestion].explanation}
            </p>
          </div>
        )}

        <div className="quiz-nav-row">
          {!quizSubmitted ? (
            <button 
              onClick={handleSubmitQuiz} 
              disabled={selectedAnswer === null}
              className="quiz-btn quiz-btn-primary"
            >
              Submit Answer
            </button>
          ) : (
            <button 
              onClick={handleNextQuiz} 
              className="quiz-btn quiz-btn-primary"
            >
              {currentQuestion === quizQuestions.length - 1 ? "Start Over" : "Next Question"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
