import React, { useState, useEffect } from 'react';
import './Module1Section3.css';
import TutorTip from './TutorTip';

export default function Module1Section3({ theme }) {
  // Slider states
  const [TH, setTH] = useState(3.0);
  const [TF, setTF] = useState(2.0);
  const [theta, setTheta] = useState(2.5);
  const [z0, setZ0] = useState(1.0);

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
  }, [TH, TF, theta, z0, currentQuestion, selectedAnswer, quizSubmitted, activeMathStep]);

  // Quiz questions
  const quizQuestions = [
    {
      question: "Which of the following describes the role of the parameters $T$ and $\\theta$ in the Fréchet distribution $F(z) = e^{-T z^{-\\theta}}$?",
      options: [
        "Option A: $T$ is the elasticity of trade, and $\\theta$ is the iceberg transport cost coefficient.",
        "Option B: $T$ is the technological scale parameter (absolute advantage) shifting the distribution rightward, while $\\theta$ is the shape parameter (inverse dispersion) representing comparative advantage variation.",
        "Option C: $T$ represents the variance of the distribution, while $\\theta$ represents the scale of the labor force.",
        "Option D: $T$ represents the average wage rate, and $\\theta$ represents consumer taste parameter."
      ],
      correctIndex: 1,
      explanation: "Correct! The parameter $T$ (state of technology) governs the location of the distribution, meaning a higher $T$ shifts the entire frontier rightward (absolute advantage). The parameter $\\theta$ governs the shape, acting as an inverse dispersion parameter: a lower $\\theta$ indicates more variable/dispersed ideas, creating stronger forces for comparative advantage."
    },
    {
      question: "What is the economic and mathematical importance of 'Truncation Invariance' of the Pareto distribution in EK models?",
      options: [
        "Option A: It guarantees that trade costs only affect wages but do not shift the shape of productivity among surviving firms.",
        "Option B: It means that conditional on a firm's productivity exceeding a hurdle rate $z_1 \\ge z_0$, the distribution of productivity above that threshold remains Pareto with the same shape parameter $\\theta$.",
        "Option C: It implies that the average productivity is independent of the shape parameter $\\theta$.",
        "Option D: Both A and B are correct."
      ],
      correctIndex: 3,
      explanation: "Correct! Truncation invariance implies that conditional on productivity exceeding any high threshold $z_1$, the distribution of productivity above that threshold retains the Pareto shape with the exact same shape parameter $\\theta$. Economically, this is vital because trade costs act as a hurdle; this property ensures that the distribution of surviving exporters is still Pareto, making gravity models highly tractable."
    },
    {
      question: "Under the Poisson limit derivation, how does the state of technology $T$ relate to the underlying ideas database?",
      options: [
        "Option A: $T = z_0^\\theta N$, meaning it represents the combination of the size of the idea pool $N$ and the baseline quality scale $z_0$.",
        "Option B: $T = \\frac{\\theta}{\\theta-1} z_0$, representing the mean productivity of a single idea.",
        "Option C: $T = \\theta^2$, representing the variance of ideas.",
        "Option D: $T = 1 - (z/z_0)^{-\\theta}$, representing the CDF of a single idea."
      ],
      correctIndex: 0,
      explanation: "Correct! By modeling the idea generation process as drawing $N$ independent Pareto recipes, the Poisson rate of drawing recipes above a productivity threshold $z$ is $\\lambda_z = T z^{-\\theta}$, where $T \\equiv N z_0^\\theta$ measures the technology state or overall pool quality."
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

  // Helper to generate SVG path for Fréchet PDF
  // f(z) = theta * T * z^(-theta - 1) * e^(-T * z^-theta)
  const generateFrechetPath = (T, thetaVal) => {
    const points = [];
    const step = 0.05;
    const maxZ = 5.0;
    
    // Find peak value to scale graph dynamically
    let maxVal = 0.1;
    for (let z = 0.05; z <= maxZ; z += step) {
      const y = thetaVal * T * Math.pow(z, -thetaVal - 1) * Math.exp(-T * Math.pow(z, -thetaVal));
      if (y > maxVal) maxVal = y;
    }
    
    // Fixed scale limit to avoid excessive scaling jumps
    const yMax = Math.max(1.8, maxVal * 1.15);

    for (let z = 0.01; z <= maxZ; z += step) {
      const y = thetaVal * T * Math.pow(z, -thetaVal - 1) * Math.exp(-T * Math.pow(z, -thetaVal));
      
      // SVG coordinates: width=360, height=200
      // Margin: left=40, right=15, top=15, bottom=30
      const x = 40 + (z / maxZ) * 305;
      const svgY = 170 - (y / yMax) * 145;
      
      points.push(`${x.toFixed(1)},${svgY.toFixed(1)}`);
    }

    const pathData = `M ${points.join(' L ')}`;
    const areaData = `${pathData} L 345,170 L 40,170 Z`;
    
    // Compute peak coordinates for a guideline
    const peakZ = Math.pow(T * thetaVal / (thetaVal + 1), 1 / thetaVal);
    const peakY = thetaVal * T * Math.pow(peakZ, -thetaVal - 1) * Math.exp(-T * Math.pow(peakZ, -thetaVal));
    const peakX = 40 + (peakZ / maxZ) * 305;
    const peakSvgY = 170 - (peakY / yMax) * 145;

    return { pathData, areaData, yMax, peakX, peakSvgY, peakZ, peakY };
  };

  const pathH = generateFrechetPath(TH, theta);
  const pathF = generateFrechetPath(TF, theta);

  return (
    <div className="section3-container">
      {/* Overview & Intuition */}
      <div className="lesson-card" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
        <h3>1.3 Probabilistic Ideas & The Fréchet Frontier</h3>
        <p>
          In the classic 2-good and DFS continuum models, productivity coefficients are deterministic parameters. 
          The landmark framework of <strong>Eaton and Kortum (2002)</strong> introduces a probabilistic approach. 
          Rather than imagining a single fixed productivity coefficient for each good, we model a country's technology as a 
          {" "}<strong>lottery of ideas</strong>.
        </p>
        
        <div style={{ margin: '16px 0', padding: '16px', background: 'rgba(59, 130, 246, 0.03)', borderLeft: '4px solid var(--accent-primary)', borderRadius: '0 var(--border-radius-sm) var(--border-radius-sm) 0' }}>
          <h5>💡 The Global Recipe Book Analogy</h5>
          <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-secondary)' }}>
            Think of a country's technology as a giant library of cooking recipes (ideas). 
            For any given good, many recipes exist, each drawn with a random efficiency level $Z$ from a 
            probabilistic pool. The country does not use a mediocre recipe; it selects the {" "}<strong>absolute best recipe</strong> 
            {" "}(the maximum of the drawn efficiencies). This selection process defines the nation's {" "}<strong>technology frontier</strong>.
          </p>
        </div>
      </div>

      {/* Mathematical Derivations Stepper Wizard */}
      <div className="lesson-card">
        <h3>Mathematical Derivations Stepper Wizard</h3>
        <p style={{ marginBottom: '16px' }}>
          Follow the step-by-step interactive derivation of the Eaton-Kortum technological frontier.
        </p>

        {/* Stepper Header Navigation */}
        <div className="stepper-header">
          <button 
            className={`step-indicator-btn ${activeMathStep === 1 ? 'active' : ''}`}
            onClick={() => setActiveMathStep(1)}
          >
            <span className="step-num-badge">1</span>
            <span>Pareto Baseline</span>
          </button>
          <button 
            className={`step-indicator-btn ${activeMathStep === 2 ? 'active' : ''}`}
            onClick={() => setActiveMathStep(2)}
          >
            <span className="step-num-badge">2</span>
            <span>Moments Proof</span>
          </button>
          <button 
            className={`step-indicator-btn ${activeMathStep === 3 ? 'active' : ''}`}
            onClick={() => setActiveMathStep(3)}
          >
            <span className="step-num-badge">3</span>
            <span>Truncation Invariance</span>
          </button>
          <button 
            className={`step-indicator-btn ${activeMathStep === 4 ? 'active' : ''}`}
            onClick={() => setActiveMathStep(4)}
          >
            <span className="step-num-badge">4</span>
            <span>Fréchet Frontier</span>
          </button>
        </div>

        {/* Stepper Card Body */}
        <div className="stepper-card-body">
          {activeMathStep === 1 && (
            <div>
              <h4>Step 1: The Pareto Single-Idea Baseline</h4>
              <p>
                We model the quality of an individual idea $Z$ as drawing from a <strong>Pareto distribution</strong> starting at 
                {" "}a positive lower bound $z_0 &gt; 0$.
              </p>
              <p>
                The cumulative distribution function (CDF) for a single idea's productivity $Z$ is defined as:
                $$F(z) = Pr(Z \le z) = 1 - \left(\frac&#123;z&#125;&#123;z_0&#125;\right)^&#123;-\theta&#125;, \quad z \ge z_0$$
              </p>
              <div className="sub-step-box">
                <span className="sub-step-title">⚡ Differentiating to Find the PDF</span>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  To find the probability density function (PDF), we differentiate the CDF with respect to $z$:
                  $$f(z) = \frac&#123;d&#125;&#123;dz&#125;F(z) = \frac&#123;d&#125;&#123;dz&#125;\left[1 - z_0^\theta z^&#123;-\theta&#125;\right] = \theta z_0^\theta z^&#123;-\theta-1&#125;, \quad z \ge z_0$$
                </p>
              </div>
            </div>
          )}

          {activeMathStep === 2 && (
            <div>
              <h4>Step 2: Moments Proof (The Core Math Engine)</h4>
              <p>
                To understand the properties of the productivity draws, we derive the mathematical moments.
              </p>
              
              <div className="sub-step-box">
                <span className="sub-step-title">📊 Sub-Step A: Expected Value $\mathbb&#123;E&#125;[Z]$ (Mean)</span>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  The expected value measures the average quality of an idea. We integrate over the support $[z_0, \infty)$:
                  $$\mathbb&#123;E&#125;[Z] = \int_&#123;z_0&#125;^&#123;\infty&#125; z f(z) dz = \int_&#123;z_0&#125;^&#123;\infty&#125; z \left(\theta z_0^\theta z^&#123;-\theta-1&#125;\right) dz = \theta z_0^\theta \int_&#123;z_0&#125;^&#123;\infty&#125; z^&#123;-\theta&#125; dz$$
                  Evaluating this limit as $z \to \infty$ (requiring $\theta &gt; 1$ for convergence):
                  $$\mathbb&#123;E&#125;[Z] = \theta z_0^\theta \left[ \frac&#123;z^&#123;-\theta+1&#125;&#125;&#123;-\theta+1&#125; \right]_&#123;z_0&#125;^&#123;\infty&#125; = \theta z_0^\theta \left( 0 - \frac&#123;z_0^&#123;1-\theta&#125;&#125;&#123;1-\theta&#125; \right) = \frac&#123;\theta&#125;&#123;\theta-1&#125;z_0$$
                </p>
              </div>

              <div className="sub-step-box">
                <span className="sub-step-title">📈 Sub-Step B: Second Moment &amp; Variance $\mathbb&#123;V&#125;[Z]$</span>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  First, compute the second moment $\mathbb&#123;E&#125;[Z^2]$ (assuming $\theta &gt; 2$):
                  $$\mathbb&#123;E&#125;[Z^2] = \int_&#123;z_0&#125;^&#123;\infty&#125; z^2 f(z) dz = \theta z_0^\theta \int_&#123;z_0&#125;^&#123;\infty&#125; z^2 \left(\theta z_0^\theta z^&#123;-\theta-1&#125;\right) dz = \theta z_0^\theta \int_&#123;z_0&#125;^&#123;\infty&#125; z^2 z^1 z^&#123;-\theta-1&#125; dz$$
                  Wait, the simplified integral is:
                  $$\mathbb&#123;E&#125;[Z^2] = \int_&#123;z_0&#125;^&#123;\infty&#125; z^2 f(z) dz = \theta z_0^\theta \int_&#123;z_0&#125;^&#123;\infty&#125; z^&#123;1-\theta&#125; dz = \theta z_0^\theta \left[ \frac&#123;z^&#123;-\theta+2&#125;&#125;&#123;-\theta+2&#125; \right]_&#123;z_0&#125;^&#123;\infty&#125; = \frac&#123;\theta&#125;&#123;\theta-2&#125;z_0^2$$
                  Then apply the variance identity $\mathbb&#123;V&#125;[Z] = \mathbb&#123;E&#125;[Z^2] - (\mathbb&#123;E&#125;[Z])^2$:
                  $$\mathbb&#123;V&#125;[Z] = \frac&#123;\theta&#125;&#123;\theta-2&#125;z_0^2 - \left(\frac&#123;\theta&#125;&#123;\theta-1&#125;z_0\right)^2 = z_0^2 \theta \left[ \frac&#123;1&#125;&#123;\theta-2&#125; - \frac&#123;\theta&#125;&#123;(\theta-1)^2&#125; \right]$$
                  $$\mathbb&#123;V&#125;[Z] = z_0^2 \theta \left[ \frac&#123;(\theta-1)^2 - \theta(\theta-2)&#125;&#123;(\theta-2)(\theta-1)^2&#125; \right] = \frac&#123;\theta&#125;&#123;(\theta-1)^2(\theta-2)&#125;z_0^2$$
                </p>
              </div>

              <div className="sub-step-box">
                <span className="sub-step-title">🔍 Sub-Step C: Coefficient of Variation (CV)</span>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  The Coefficient of Variation is the ratio of standard deviation to mean:
                  $$CV = \frac&#123;\sqrt&#123;\mathbb&#123;V&#125;[Z]&#125;&#125;&#123;\mathbb&#123;E&#125;[Z]&#125; = \frac&#123;\sqrt&#123;\frac&#123;\theta&#125;&#123;(\theta-1)^2(\theta-2)&#125;&#125;z_0&#125;&#123;\frac&#123;\theta&#125;&#123;\theta-1&#125;z_0&#125; = \frac&#123;1&#125;&#123;\sqrt&#123;\theta(\theta-2)&#125;&#125; = [\theta(\theta-2)]^&#123;-1/2&#125;$$
                  <strong>Economic Takeaway:</strong> The parameter $z_0$ acts strictly as a scale parameter (shifting the mean). The shape parameter $\theta$ acts as an inverse dispersion parameter: a lower $\theta$ increases the $CV$ (spreading out the tail).
                </p>
              </div>
            </div>
          )}

          {activeMathStep === 3 && (
            <div>
              <h4>Step 3: Truncation Invariance Proof</h4>
              <p>
                In trade models, competition acts as a selection hurdle: only highly productive ideas survive. 
                Pareto is mathematically convenient because selection does not change the distribution's shape.
              </p>
              <p>
                Suppose a producer requires a minimum productivity $z_1 \ge z_0$ to survive. For any $z \ge z_1$, the conditional probability is:
                $$Pr(Z \ge z \mid Z \ge z_1) = \frac&#123;Pr(Z \ge z)&#125;&#123;Pr(Z \ge z_1)&#125; = \frac&#123;(z/z_0)^&#123;-\theta&#125;&#125;&#123;(z_1/z_0)^&#123;-\theta&#125;&#125; = \left(\frac&#123;z&#125;&#123;z_1&#125;\right)^&#123;-\theta&#125;$$
              </p>
              <p>
                <strong>Economic Importance:</strong> The conditional distribution is still a Pareto distribution with the same shape parameter $\theta$ and new scale parameter $z_1$. This means the productivity of surviving firms inherits the exact same distribution, resolving selection bias analytically.
              </p>
            </div>
          )}

          {activeMathStep === 4 && (
            <div>
              <h4>Step 4: The Poisson Limit &amp; The Ultimate Fréchet Frontier</h4>
              <p>
                Instead of one draw, countries draw $N$ potential ideas (the lottery of ideas). We derive the distribution of the absolute maximum of these draws.
              </p>
              
              <div className="sub-step-box">
                <span className="sub-step-title">Arrival of Ideas above z</span>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  The count of ideas $N_z$ exceeding a quality $z$ converges to a Poisson distribution with arrival rate:
                  $$\lambda_z = N p_z = N \left(\frac&#123;z&#125;&#123;z_0&#125;\right)^&#123;-\theta&#125; = (N z_0^\theta) z^&#123;-\theta&#125; = T z^&#123;-\theta&#125;$$
                  where we define the aggregate technology state $T \equiv \lim_&#123;N\to\infty&#125; N z_0^\theta$.
                </p>
              </div>

              <div className="sub-step-box">
                <span className="sub-step-title">The Extreme Value envelope (Fréchet)</span>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  The maximum productivity $Z_&#123;max&#125;$ is less than $z$ if and only if zero ideas exceed $z$:
                  $$F^&#123;(1)&#125;(z) = Pr(Z_&#123;max&#125; \le z) = Pr(N_z = 0) = \frac&#123;\lambda_z^0 e^&#123;-\lambda_z&#125;&#125;&#123;0!&#125; = e^&#123;-\lambda_z&#125; = e^&#123;-T z^&#123;-\theta&#125;&#125;$$
                  Differentiating gives the Fréchet PDF curve we plot below:
                  $$f^&#123;(1)&#125;(z) = \theta T z^&#123;-\theta-1&#125; e^&#123;-T z^&#123;-\theta&#125;&#125;$$
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
            Step {activeMathStep} of 4
          </span>
          <button 
            className="quiz-btn quiz-btn-primary"
            onClick={() => setActiveMathStep((prev) => Math.min(4, prev + 1))}
            disabled={activeMathStep === 4}
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
            <span className="symbol-math">Z</span>
            <span className="symbol-name">Productivity Draw</span>
            <span className="symbol-desc">The efficiency level of an individual idea.</span>
          </div>
          <div className="symbol-item">
            <span className="symbol-math">{"z\u2080"}</span>
            <span className="symbol-name">Pareto Lower Bound</span>
            <span className="symbol-desc">Minimum baseline quality parameter of individual draws.</span>
          </div>
          <div className="symbol-item">
            <span className="symbol-math">{"\u03B8"}</span>
            <span className="symbol-name">Shape Parameter</span>
            <span className="symbol-desc">Inverse dispersion. Lower value implies higher productivity variance.</span>
          </div>
          <div className="symbol-item">
            <span className="symbol-math">T</span>
            <span className="symbol-name">State of Technology</span>
            <span className="symbol-desc">{"The scale parameter ($T = N z_0^\\theta$) shifts the density peak rightward."}</span>
          </div>
          <div className="symbol-item">
            <span className="symbol-math">{"\u03BB"}</span>
            <span className="symbol-name">Poisson Arrival Rate</span>
            <span className="symbol-desc">{"Density of ideas above a cutoff: $\\lambda = T z^{-\\theta}$."}</span>
          </div>
        </div>
      </div>

      {/* Sliders Container */}
      <div className="sliders-grid">
        <div className="slider-card">
          <label>
            <span>{"Home Technology State ($T_H$):"}</span>
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
            <span>{"Foreign Technology State ($T_F$):"}</span>
            <span>{TF.toFixed(1)}</span>
          </label>
          <input 
            type="range" min="1.0" max="10.0" step="0.1" 
            value={TF} onChange={(e) => setTF(Number(e.target.value))} 
            className="range-slider"
          />
        </div>
        <div className="slider-card">
          <label>
            <span>{"Inverse Dispersion ($\\theta$):"}</span>
            <span>{theta.toFixed(1)}</span>
          </label>
          <input 
            type="range" min="1.5" max="6.0" step="0.1" 
            value={theta} onChange={(e) => setTheta(Number(e.target.value))} 
            className="range-slider"
          />
        </div>
      </div>

      {/* Side-by-side SVG Graph Panels */}
      <div className="svg-panels-row">
        {/* Home SVG Panel */}
        <div className="svg-panel-card">
          <div className="svg-title" style={{ color: 'var(--accent-primary)' }}>
            <span>🏠 Home Fréchet Density Curve</span>
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
              <text x="116.25" y="185" className="svg-text" textAnchor="middle">1.25</text>
              <text x="192.5" y="185" className="svg-text" textAnchor="middle">2.5</text>
              <text x="268.75" y="185" className="svg-text" textAnchor="middle">3.75</text>
              <text x="345" y="185" className="svg-text" textAnchor="middle">5.0</text>
              <text x="192.5" y="196" className="svg-text" textAnchor="middle" style={{fontWeight:600}}>Productivity z</text>
              <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{fontWeight:600}}>Density f(z)</text>

              {/* Area and Curve */}
              <path d={pathH.areaData} className="svg-area" fill="var(--accent-primary)" />
              <path d={pathH.pathData} className="svg-curve" stroke="var(--accent-primary)" />

              {/* Peak Indicator */}
              <circle cx={pathH.peakX} cy={pathH.peakSvgY} r="4" fill="var(--accent-warning)" />
              <line x1={pathH.peakX} y1={pathH.peakSvgY} x2={pathH.peakX} y2="170" stroke="var(--accent-warning)" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {"Peak Mode: $z^* \\approx$ "}<strong>{pathH.peakZ.toFixed(2)}</strong>{" (Density value: "}<strong>{pathH.peakY.toFixed(2)}</strong>{")"}
          </div>
        </div>

        {/* Foreign SVG Panel */}
        <div className="svg-panel-card">
          <div className="svg-title" style={{ color: 'var(--accent-secondary)' }}>
            <span>🌐 Foreign Fréchet Density Curve</span>
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
              <text x="116.25" y="185" className="svg-text" textAnchor="middle">1.25</text>
              <text x="192.5" y="185" className="svg-text" textAnchor="middle">2.5</text>
              <text x="268.75" y="185" className="svg-text" textAnchor="middle">3.75</text>
              <text x="345" y="185" className="svg-text" textAnchor="middle">5.0</text>
              <text x="192.5" y="196" className="svg-text" textAnchor="middle" style={{fontWeight:600}}>Productivity z</text>
              <text x="15" y="95" className="svg-text" textAnchor="middle" transform="rotate(-90 15 95)" style={{fontWeight:600}}>Density f(z)</text>

              {/* Area and Curve */}
              <path d={pathF.areaData} className="svg-area" fill="var(--accent-secondary)" />
              <path d={pathF.pathData} className="svg-curve" stroke="var(--accent-secondary)" />

              {/* Peak Indicator */}
              <circle cx={pathF.peakX} cy={pathF.peakSvgY} r="4" fill="var(--accent-warning)" />
              <line x1={pathF.peakX} y1={pathF.peakSvgY} x2={pathF.peakX} y2="170" stroke="var(--accent-warning)" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {"Peak Mode: $z^* \\approx$ "}<strong>{pathF.peakZ.toFixed(2)}</strong>{" (Density value: "}<strong>{pathF.peakY.toFixed(2)}</strong>{")"}
          </div>
        </div>
      </div>

      {/* Explanations */}
      <div className="lesson-card">
        <h4>📊 What these graphs show</h4>
        <p>
          These panels plot the Fréchet probability density function (PDF) for Home (blue) and Foreign (purple) technological frontiers:
          $$f(z) = \theta T_i z^&#123;-\theta-1&#125; e^&#123;-T_i z^&#123;-\theta&#125;&#125;$$
          This distribution is derived by evaluating the maximum efficiency level among a pool of generated ideas. The orange dot marks the modal peak (mode) of the distribution, occurring at:
          $$z^* = \left(\frac&#123;\theta T&#125;&#123;\theta + 1&#125;\right)^&#123;1/\theta&#125;$$
        </p>

        <h4>🧭 What to notice</h4>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.95rem' }}>
          <li>
            Adjusting $T_H$ or $T_F$: Notice that increasing a country's technology parameter ($T$) shifts its density curve rightward and lowers its height. This indicates that a larger idea pool increases the probability of drawing higher maximum productivities (absolute advantage).
          </li>
          <li>
            Adjusting $\theta$: Reducing $\theta$ flattens the curve, shifting the distribution peak leftward but stretching out the right-hand tail. This tail represents the probability of drawing rare, extremely high-productivity ideas, driving powerful forces for comparative advantage.
          </li>
        </ul>
      </div>

      {/* Tutor Tips & Common Mistakes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <TutorTip tip="A lower value of the shape parameter \theta represents higher variability in ideas. In general equilibrium, this means that comparative advantage is stronger because countries are more likely to have vast differences in relative productivities across goods." />
        
        <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.15)', borderLeft: '4px solid var(--accent-error)', padding: '16px', borderRadius: 'var(--border-radius-md)' }}>
          <h5 style={{ color: 'var(--accent-error)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            ⚠️ Common Mistakes
          </h5>
          <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-secondary)' }}>
            Do not confuse $T$ and $\theta$. $T$ is country-specific and indexes absolute advantage (a higher $T$ moves the whole distribution to the right). $\theta$ is a global structural parameter that indexes comparative advantage (a lower $\theta$ increases the thickness of the tail, making huge technology gaps more common).
          </p>
        </div>
      </div>

      {/* Interactive Quiz */}
      <div className="section-quiz-card">
        <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>
          📝 Section 1.3 Quick Assessment
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
