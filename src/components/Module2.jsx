import React, { useState, useCallback } from 'react';
import TutorTip from './TutorTip';
import Module2Quiz from './Module2Quiz';
import { RefreshCw, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import Plotly from 'plotly.js-dist-min';

/* ─── tiny helper: render a Plotly chart into a div ref ─── */
function PlotlyChart({ data, layout, style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) {
      Plotly.react(ref.current, data, layout, { responsive: true, displayModeBar: false });
    }
  }, [data, layout]);
  return <div ref={ref} style={style || { width: '100%', height: '340px' }} />;
}

export default function Module2({ theme, setActiveTab }) {
  const [moduleTab, setModuleTab] = useState('sub1');

  /* ═══════════════ Submodule 2.1 State ═══════════════ */
  // Lesson 3 — Factor Abundance
  const [homeLabor, setHomeLabor] = useState(500);
  const [homeCapital, setHomeCapital] = useState(200);
  const [foreignLabor, setForeignLabor] = useState(300);
  const [foreignCapital, setForeignCapital] = useState(300);

  // Lesson 4 — Factor Intensity
  const [g1Labor, setG1Labor] = useState(10);
  const [g1Capital, setG1Capital] = useState(2);
  const [g2Labor, setG2Labor] = useState(4);
  const [g2Capital, setG2Capital] = useState(8);

  /* ═══════════════ Submodule 2.2 State ═══════════════ */
  // Lesson 7 — Cost Shares
  const [csWage, setCsWage] = useState(10);
  const [csRent, setCsRent] = useState(20);
  const [csLabor, setCsLabor] = useState(4);
  const [csCapitalAmt, setCsCapitalAmt] = useState(2);

  // Lesson 8 — Hat Algebra
  const [hatThetaK, setHatThetaK] = useState(0.40);
  const [hatRentChange, setHatRentChange] = useState(10);
  const [hatWageChange, setHatWageChange] = useState(5);
  const hatThetaL = 1 - hatThetaK;

  /* ═══════════════ Submodule 2.3 State ═══════════════ */
  // Lesson 11 — Stolper-Samuelson
  const [ssPriceChange1, setSsPriceChange1] = useState(10);
  const [ssPriceChange2, setSsPriceChange2] = useState(5);
  const [ssThetaU1, setSsThetaU1] = useState(0.25);
  const [ssThetaU2, setSsThetaU2] = useState(0.50);
  const ssThetaS1 = 1 - ssThetaU1;
  const ssThetaS2 = 1 - ssThetaU2;

  // Lesson 12 — Real Earnings
  const [realWageGrowth, setRealWageGrowth] = useState(3);
  const [realPriceGrowth, setRealPriceGrowth] = useState(7);

  /* ═══════════════ Submodule 2.4 State ═══════════════ */
  // Lesson 14 — Rybczynski
  const [rybKhat, setRybKhat] = useState(10);
  const [rybLhat, setRybLhat] = useState(0);
  const [rybAlphaKF, setRybAlphaKF] = useState(0.60);
  const [rybAlphaLF, setRybAlphaLF] = useState(0.40);
  const rybAlphaKC = 1 - rybAlphaKF;
  const rybAlphaLC = 1 - rybAlphaLF;

  /* ═══════════════ Submodule 2.5 State ═══════════════ */
  // Lesson 17 — Welfare Change
  const [wfPA1, setWfPA1] = useState(10);
  const [wfPA2, setWfPA2] = useState(8);
  const [wfCA1, setWfCA1] = useState(30);
  const [wfCA2, setWfCA2] = useState(40);
  const [wfCB1, setWfCB1] = useState(45);
  const [wfCB2, setWfCB2] = useState(50);

  // Lesson 18 — Gains with Trade Data
  const [gftGoods, setGftGoods] = useState([
    { name: 'Good 1', price: 10, netImports: 5, prodChange: 2 },
    { name: 'Good 2', price: 8, netImports: -3, prodChange: 4 },
    { name: 'Good 3', price: 12, netImports: 2, prodChange: -1 }
  ]);

  /* ═══════════════ Micro Quizzes ═══════════════ */
  const [microQuizzes, setMicroQuizzes] = useState({});
  const handleMicroQuiz = (key, selected, correct) => {
    setMicroQuizzes(prev => ({ ...prev, [key]: { selected, correct: selected === correct } }));
  };

  /* ═══════════════ Reset Functions ═══════════════ */
  const resetAbundance = () => { setHomeLabor(500); setHomeCapital(200); setForeignLabor(300); setForeignCapital(300); };
  const resetIntensity = () => { setG1Labor(10); setG1Capital(2); setG2Labor(4); setG2Capital(8); };
  const resetCostShares = () => { setCsWage(10); setCsRent(20); setCsLabor(4); setCsCapitalAmt(2); };
  const resetHatAlgebra = () => { setHatThetaK(0.40); setHatRentChange(10); setHatWageChange(5); };
  const resetSS = () => { setSsPriceChange1(10); setSsPriceChange2(5); setSsThetaU1(0.25); setSsThetaU2(0.50); };
  const resetReal = () => { setRealWageGrowth(3); setRealPriceGrowth(7); };
  const resetRyb = () => { setRybKhat(10); setRybLhat(0); setRybAlphaKF(0.60); setRybAlphaLF(0.40); };
  const resetWelfare = () => { setWfPA1(10); setWfPA2(8); setWfCA1(30); setWfCA2(40); setWfCB1(45); setWfCB2(50); };
  const resetGFT = () => { setGftGoods([
    { name: 'Good 1', price: 10, netImports: 5, prodChange: 2 },
    { name: 'Good 2', price: 8, netImports: -3, prodChange: 4 },
    { name: 'Good 3', price: 12, netImports: 2, prodChange: -1 }
  ]); };

  /* ═══════════════ Computed values ═══════════════ */
  // Abundance
  const homeKL = homeLabor > 0 ? homeCapital / homeLabor : 0;
  const foreignKL = foreignLabor > 0 ? foreignCapital / foreignLabor : 0;
  const laborAbundant = homeKL < foreignKL ? 'Home' : homeKL > foreignKL ? 'Foreign' : 'Neither';
  const capitalAbundant = homeKL > foreignKL ? 'Home' : homeKL < foreignKL ? 'Foreign' : 'Neither';

  // Intensity
  const g1KL = g1Labor > 0 ? g1Capital / g1Labor : 0;
  const g2KL = g2Labor > 0 ? g2Capital / g2Labor : 0;
  const laborIntensive = g1KL < g2KL ? 'Good 1' : g1KL > g2KL ? 'Good 2' : 'Neither';
  const capitalIntensive = g1KL > g2KL ? 'Good 1' : g1KL < g2KL ? 'Good 2' : 'Neither';

  // Cost shares
  const csTotalCost = csWage * csLabor + csRent * csCapitalAmt;
  const csLaborShare = csTotalCost > 0 ? (csWage * csLabor) / csTotalCost : 0;
  const csCapitalShare = csTotalCost > 0 ? (csRent * csCapitalAmt) / csTotalCost : 0;

  // Hat Algebra
  const hatCostChange = hatThetaK * hatRentChange + hatThetaL * hatWageChange;

  // Stolper-Samuelson Solver
  const ssD = ssThetaS1 * ssThetaU2 - ssThetaU1 * ssThetaS2;
  const ssP1 = ssPriceChange1 / 100;
  const ssP2 = ssPriceChange2 / 100;
  const ssSkilledChange = ssD !== 0 ? ((ssThetaU2 * ssP1 - ssThetaU1 * ssP2) / ssD) * 100 : 0;
  const ssUnskilledChange = ssD !== 0 ? ((ssThetaS1 * ssP2 - ssThetaS2 * ssP1) / ssD) * 100 : 0;

  // Real earnings
  const realWageChange = realWageGrowth - realPriceGrowth;

  // Rybczynski
  const rybD = rybAlphaKF - rybAlphaLF;
  const rybQF = rybD !== 0 ? rybKhat + (rybAlphaKC / rybD) * (rybKhat - rybLhat) : 0;
  const rybQC = rybD !== 0 ? rybLhat - (rybAlphaLF / rybD) * (rybKhat - rybLhat) : 0;

  // Welfare
  const wfWA = wfPA1 * wfCA1 + wfPA2 * wfCA2;
  const wfWB = wfPA1 * wfCB1 + wfPA2 * wfCB2;
  const wfDeltaW = wfWB - wfWA;

  // Gains from trade table
  const gftTotal = gftGoods.reduce((sum, g) => sum + g.price * g.netImports + g.price * g.prodChange, 0);

  /* ═══════════════ Plotly theme helper ═══════════════ */
  const plotBg = theme === 'dark' ? '#131b2e' : '#ffffff';
  const plotGridColor = theme === 'dark' ? '#1e293b' : '#e2e8f0';
  const plotTextColor = theme === 'dark' ? '#f8fafc' : '#0f172a';
  const plotFont = { family: 'Inter, sans-serif', color: plotTextColor };
  const baseLayout = {
    paper_bgcolor: plotBg,
    plot_bgcolor: plotBg,
    font: plotFont,
    margin: { t: 40, r: 20, b: 50, l: 50 },
    xaxis: { gridcolor: plotGridColor, zerolinecolor: plotGridColor },
    yaxis: { gridcolor: plotGridColor, zerolinecolor: plotGridColor },
  };

  /* ─── Submodule tab labels ─── */
  const tabs = [
    { key: 'sub1', label: '2.1 Heckscher-Ohlin (1–5)' },
    { key: 'sub2', label: '2.2 Costs & Hat Algebra (6–8)' },
    { key: 'sub3', label: '2.3 Stolper-Samuelson (9–12)' },
    { key: 'sub4', label: '2.4 Rybczynski (13–14)' },
    { key: 'sub5', label: '2.5 Gains from Trade (15–18)' },
    { key: 'quiz', label: 'Module 2 Quiz' },
  ];

  const updateGftGood = (idx, field, value) => {
    setGftGoods(prev => prev.map((g, i) => i === idx ? { ...g, [field]: Number(value) } : g));
  };

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      {/* Header */}
      <div className="module-header">
        <button onClick={() => setActiveTab('home')} className="back-btn">
          <span>← Back to Course Path</span>
        </button>
        <div className="module-title-row">
          <div>
            <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Module 2
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '4px' }}>Trade and Resources</h2>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="module-sections-nav">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setModuleTab(t.key)}
            className={`tab-btn ${moduleTab === t.key ? 'active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══════════════ SUBMODULE 2.1 ═══════════════ */}
      {moduleTab === 'sub1' && (
        <div>
          {/* Opening */}
          <div className="lesson-card" style={{ borderLeft: '4px solid var(--accent-secondary)' }}>
            <h3>Module Overview</h3>
            <p>
              In Module 1, we learned that <strong>technology differences</strong> cause trade — countries specialize where they are relatively more productive.
              Now we introduce a second powerful reason for trade: <strong>differences in resources</strong>.
            </p>
            <p>
              Countries have different amounts of labor, capital, land, and skills. These resource differences shape what countries produce and export.
              This is the core idea behind the <strong>Heckscher-Ohlin (HO) model</strong>.
            </p>
            <div className="means-box" style={{ borderColor: 'var(--accent-secondary)', marginTop: '16px' }}>
              <strong>Opening Question:</strong> "What happens when one country has many workers while another country has many machines?"
            </div>
            <TutorTip tip="Ricardian trade comes from technology differences. Heckscher-Ohlin trade comes from resource differences." />
          </div>

          {/* ─── Lesson 1: Why Resources Matter ─── */}
          <div className="lesson-card" id="m2-lesson1">
            <h3>Lesson 1: Why Resources Matter in Trade</h3>
            <p>
              Countries do not only differ in technology — they also differ in the <strong>resources</strong> they have.
              A country with many workers may be good at producing labor-intensive goods like cloth or garments.
              A country with many machines or capital may be good at producing capital-intensive goods like machinery.
            </p>
            <p>
              The Heckscher-Ohlin model says: <strong>Countries export goods that use their abundant resources intensively.</strong>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '16px 0' }}>
              <div className="means-box">
                <strong>Example — Home:</strong> Many workers, few machines → likely exports cloth or garments (labor-intensive goods).
              </div>
              <div className="means-box" style={{ borderColor: 'var(--accent-warning)' }}>
                <strong>Example — Foreign:</strong> Many machines, lots of capital → likely exports machinery (capital-intensive goods).
              </div>
            </div>
            <div className="means-box" style={{ borderColor: 'var(--accent-success)' }}>
              <strong>What this means:</strong> Trade patterns are connected to what a country has more of.
            </div>
          </div>

          {/* ─── Lesson 2: Factors of Production ─── */}
          <div className="lesson-card" id="m2-lesson2">
            <h3>Lesson 2: Factors of Production</h3>
            <p>
              A <strong>factor of production</strong> is an input used to produce goods. Workers, machines, land, and skills are all factors.
              Each factor earns a <strong>payment</strong> for its contribution to production.
            </p>
            <div className="factor-table-wrapper">
              <table className="factor-table">
                <thead>
                  <tr>
                    <th>Factor</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Labor</td><td>Wage (w)</td></tr>
                  <tr><td>Capital</td><td>Rental rate (r)</td></tr>
                  <tr><td>Land</td><td>Rent</td></tr>
                  <tr><td>Skilled labor</td><td>Skilled wage</td></tr>
                  <tr><td>Unskilled labor</td><td>Unskilled wage</td></tr>
                </tbody>
              </table>
            </div>
            <TutorTip tip="A factor is not the final product. It is what helps produce the final product." />
          </div>

          {/* ─── Lesson 3: Factor Abundance ─── */}
          <div className="lesson-card" id="m2-lesson3">
            <h3>Lesson 3: Factor Abundance</h3>
            <p>
              Factor abundance means a country has <strong>relatively more</strong> of one factor compared to another country.
              We do not just count absolute amounts — we compare <strong>ratios</strong>.
            </p>
            <div className="math-formula">Capital-Labor Ratio = K / L</div>
            <p>
              If Home has a <strong>lower</strong> K/L ratio than Foreign, Home is <strong>relatively labor-abundant</strong>.
              If Foreign has a <strong>higher</strong> K/L ratio than Home, Foreign is <strong>relatively capital-abundant</strong>.
            </p>

            {/* Interactive Calculator */}
            <div className="interactive-calc">
              <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--accent-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🧭 Interactive Calculator: Factor Abundance</span>
                <button onClick={resetAbundance} className="reset-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <RefreshCw size={12} /><span>Reset</span>
                </button>
              </h4>
              <div className="calc-row">
                <div className="calc-input-wrapper">
                  <label>Home Labor (L):</label>
                  <input type="number" className="calc-input" value={homeLabor} min="1" onChange={e => setHomeLabor(Math.max(1, Number(e.target.value)))} />
                </div>
                <div className="calc-input-wrapper">
                  <label>Home Capital (K):</label>
                  <input type="number" className="calc-input" value={homeCapital} min="0" onChange={e => setHomeCapital(Math.max(0, Number(e.target.value)))} />
                </div>
                <div className="calc-input-wrapper">
                  <label>Foreign Labor (L*):</label>
                  <input type="number" className="calc-input" value={foreignLabor} min="1" onChange={e => setForeignLabor(Math.max(1, Number(e.target.value)))} />
                </div>
                <div className="calc-input-wrapper">
                  <label>Foreign Capital (K*):</label>
                  <input type="number" className="calc-input" value={foreignCapital} min="0" onChange={e => setForeignCapital(Math.max(0, Number(e.target.value)))} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                <div className="calc-result">Home K/L: <strong>{homeKL.toFixed(3)}</strong></div>
                <div className="calc-result" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-warning)' }}>
                  Foreign K/L: <strong>{foreignKL.toFixed(3)}</strong>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
                <div className="calc-result" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-success)' }}>
                  Labor-abundant: <strong>{laborAbundant}</strong>
                </div>
                <div className="calc-result" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent-secondary)' }}>
                  Capital-abundant: <strong>{capitalAbundant}</strong>
                </div>
              </div>

              {/* Bar Chart */}
              <PlotlyChart
                data={[
                  { x: ['Home K/L', 'Foreign K/L'], y: [homeKL, foreignKL], type: 'bar', marker: { color: ['#3b82f6', '#f59e0b'] } }
                ]}
                layout={{ ...baseLayout, title: { text: 'Capital-Labor Ratios', font: { size: 14, ...plotFont } }, yaxis: { ...baseLayout.yaxis, title: 'K/L Ratio' }, height: 300 }}
                style={{ width: '100%', height: '300px', marginTop: '12px' }}
              />
            </div>

            <div className="means-box" style={{ borderColor: 'var(--accent-success)', marginTop: '16px' }}>
              <strong>What to notice:</strong> A country can have more capital in total but still not be capital-abundant if it also has a very large labor force. Abundance is relative.
            </div>
          </div>

          {/* ─── Lesson 4: Factor Intensity ─── */}
          <div className="lesson-card" id="m2-lesson4">
            <h3>Lesson 4: Factor Intensity</h3>
            <p>
              Factor intensity describes which factor a good uses <strong>more heavily</strong>.
              Cloth or garments can be <strong>labor-intensive</strong>. Machinery or chemicals can be <strong>capital-intensive</strong>.
            </p>
            <p>
              A good is <strong>labor-intensive</strong> if it uses more labor relative to capital (lower K/L).
              A good is <strong>capital-intensive</strong> if it uses more capital relative to labor (higher K/L).
              Factor intensity is based on <strong>ratios</strong>, not absolute amounts.
            </p>

            <div className="interactive-calc">
              <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--accent-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🧭 Interactive Calculator: Factor Intensity</span>
                <button onClick={resetIntensity} className="reset-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <RefreshCw size={12} /><span>Reset</span>
                </button>
              </h4>
              <div className="calc-row">
                <div className="calc-input-wrapper">
                  <label>Good 1 — Labor:</label>
                  <input type="number" className="calc-input" value={g1Labor} min="1" onChange={e => setG1Labor(Math.max(1, Number(e.target.value)))} />
                </div>
                <div className="calc-input-wrapper">
                  <label>Good 1 — Capital:</label>
                  <input type="number" className="calc-input" value={g1Capital} min="0" onChange={e => setG1Capital(Math.max(0, Number(e.target.value)))} />
                </div>
                <div className="calc-input-wrapper">
                  <label>Good 2 — Labor:</label>
                  <input type="number" className="calc-input" value={g2Labor} min="1" onChange={e => setG2Labor(Math.max(1, Number(e.target.value)))} />
                </div>
                <div className="calc-input-wrapper">
                  <label>Good 2 — Capital:</label>
                  <input type="number" className="calc-input" value={g2Capital} min="0" onChange={e => setG2Capital(Math.max(0, Number(e.target.value)))} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                <div className="calc-result">Good 1 K/L: <strong>{g1KL.toFixed(3)}</strong></div>
                <div className="calc-result" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-warning)' }}>
                  Good 2 K/L: <strong>{g2KL.toFixed(3)}</strong>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
                <div className="calc-result" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-success)' }}>
                  Labor-intensive: <strong>{laborIntensive}</strong>
                </div>
                <div className="calc-result" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent-secondary)' }}>
                  Capital-intensive: <strong>{capitalIntensive}</strong>
                </div>
              </div>

              <PlotlyChart
                data={[
                  { x: ['Good 1 K/L', 'Good 2 K/L'], y: [g1KL, g2KL], type: 'bar', marker: { color: ['#10b981', '#8b5cf6'] } }
                ]}
                layout={{ ...baseLayout, title: { text: 'Factor Intensity Comparison', font: { size: 14, ...plotFont } }, yaxis: { ...baseLayout.yaxis, title: 'K/L Ratio' }, height: 300 }}
                style={{ width: '100%', height: '300px', marginTop: '12px' }}
              />
            </div>

            <div className="means-box" style={{ borderColor: 'var(--accent-success)', marginTop: '16px' }}>
              <strong>What to notice:</strong> The good with the lower K/L ratio is more labor-intensive. The good with the higher K/L ratio is more capital-intensive.
            </div>
          </div>

          {/* ─── Lesson 5: HO Trade Prediction ─── */}
          <div className="lesson-card" id="m2-lesson5">
            <h3>Lesson 5: Heckscher-Ohlin Trade Prediction</h3>
            <p>
              The Heckscher-Ohlin prediction is: <strong>A country exports the good that uses its abundant factor intensively.</strong>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '16px 0' }}>
              <div className="math-formula">Labor-abundant country → exports labor-intensive good</div>
              <div className="math-formula">Capital-abundant country → exports capital-intensive good</div>
            </div>

            <div className="prediction-box">
              <h4 style={{ marginBottom: '12px' }}>🔮 HO Prediction (from your calculator values)</h4>
              <p>
                <strong>{laborAbundant}</strong> is labor-abundant and <strong>{laborIntensive}</strong> is labor-intensive → <strong>{laborAbundant}</strong> is predicted to export <strong>{laborIntensive}</strong>.
              </p>
              <p>
                <strong>{capitalAbundant}</strong> is capital-abundant and <strong>{capitalIntensive}</strong> is capital-intensive → <strong>{capitalAbundant}</strong> is predicted to export <strong>{capitalIntensive}</strong>.
              </p>
            </div>
            <TutorTip tip="Match the country's abundant resource with the good that uses that resource most heavily." />

            {/* Micro Quiz */}
            <div className="micro-quiz-card">
              <h4>💡 Check Your Understanding</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>
                If Country A has a K/L ratio of 0.5 and Country B has a K/L ratio of 2.0, which country is labor-abundant?
              </p>
              <div className="micro-quiz-options">
                <button className={`micro-quiz-option ${microQuizzes.ho1?.selected === 0 ? 'correct' : ''}`} onClick={() => handleMicroQuiz('ho1', 0, 0)} disabled={microQuizzes.ho1 != null}>
                  Country A (lower K/L means more labor per capital)
                </button>
                <button className={`micro-quiz-option ${microQuizzes.ho1?.selected === 1 ? 'incorrect' : ''}`} onClick={() => handleMicroQuiz('ho1', 1, 0)} disabled={microQuizzes.ho1 != null}>
                  Country B
                </button>
              </div>
              {microQuizzes.ho1 && (
                <div className={`micro-feedback-box ${microQuizzes.ho1.correct ? 'correct' : 'incorrect'}`}>
                  {microQuizzes.ho1.correct
                    ? "Correct! A lower K/L ratio means the country has relatively more labor per unit of capital."
                    : "Not quite. A lower K/L ratio means relatively more labor. Country A (K/L = 0.5) is labor-abundant."}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ SUBMODULE 2.2 ═══════════════ */}
      {moduleTab === 'sub2' && (
        <div>
          <div className="lesson-card" style={{ borderLeft: '4px solid var(--accent-secondary)' }}>
            <h3>Submodule 2.2: Unit Cost, Cost Shares, and Hat Algebra</h3>
            <p>Before studying how trade affects earnings, we need to understand how production costs work and how economists express changes in compact formulas.</p>
          </div>

          {/* ─── Lesson 6: Unit Cost ─── */}
          <div className="lesson-card" id="m2-lesson6">
            <h3>Lesson 6: Unit Cost of Production</h3>
            <p>
              Firms use labor and capital to produce goods. The <strong>unit cost</strong> of producing one unit of output combines what firms pay to each factor:
            </p>
            <div className="math-formula">c = wL + rK</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '12px 0' }}>
              <div className="means-box"><strong>w</strong> = wage paid to labor<br/><strong>L</strong> = labor used per unit</div>
              <div className="means-box" style={{ borderColor: 'var(--accent-warning)' }}><strong>r</strong> = rental rate of capital<br/><strong>K</strong> = capital used per unit</div>
            </div>
            <p>If wages rise, labor becomes more expensive. If rent rises, capital becomes more expensive.</p>
            <div className="means-box" style={{ borderColor: 'var(--accent-success)', marginTop: '12px' }}>
              <strong>Example:</strong> If wage = 10, labor used = 4, rent = 20, capital used = 2:<br/>
              c = 10 × 4 + 20 × 2 = 40 + 40 = <strong>80</strong>
            </div>
            <TutorTip tip="Unit cost is just the total bill for all inputs needed to make one unit of output." />
          </div>

          {/* ─── Lesson 7: Cost Shares ─── */}
          <div className="lesson-card" id="m2-lesson7">
            <h3>Lesson 7: Cost Shares</h3>
            <p>
              Cost share tells us <strong>how much of total cost</strong> goes to each factor. It is the fraction of the unit cost that goes to labor or capital.
            </p>
            <div className="math-formula">Labor cost share: θ<sub>L</sub> = wL / c</div>
            <div className="math-formula">Capital cost share: θ<sub>K</sub> = rK / c</div>
            <div className="math-formula">θ<sub>L</sub> + θ<sub>K</sub> = 1</div>

            <div className="interactive-calc">
              <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--accent-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🧭 Interactive Calculator: Cost Shares</span>
                <button onClick={resetCostShares} className="reset-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <RefreshCw size={12} /><span>Reset</span>
                </button>
              </h4>
              <div className="calc-row">
                <div className="calc-input-wrapper"><label>Wage (w):</label><input type="number" className="calc-input" value={csWage} min="0.1" step="1" onChange={e => setCsWage(Math.max(0.1, Number(e.target.value)))} /></div>
                <div className="calc-input-wrapper"><label>Rental rate (r):</label><input type="number" className="calc-input" value={csRent} min="0.1" step="1" onChange={e => setCsRent(Math.max(0.1, Number(e.target.value)))} /></div>
                <div className="calc-input-wrapper"><label>Labor used (L):</label><input type="number" className="calc-input" value={csLabor} min="0.1" step="0.5" onChange={e => setCsLabor(Math.max(0.1, Number(e.target.value)))} /></div>
                <div className="calc-input-wrapper"><label>Capital used (K):</label><input type="number" className="calc-input" value={csCapitalAmt} min="0.1" step="0.5" onChange={e => setCsCapitalAmt(Math.max(0.1, Number(e.target.value)))} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '12px' }}>
                <div className="calc-result">Total cost c: <strong>{csTotalCost.toFixed(2)}</strong></div>
                <div className="calc-result">Labor payment wL: <strong>{(csWage * csLabor).toFixed(2)}</strong></div>
                <div className="calc-result">Capital payment rK: <strong>{(csRent * csCapitalAmt).toFixed(2)}</strong></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
                <div className="calc-result" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-primary)' }}>
                  θ<sub>L</sub> (Labor share): <strong>{(csLaborShare * 100).toFixed(1)}%</strong>
                </div>
                <div className="calc-result" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent-secondary)' }}>
                  θ<sub>K</sub> (Capital share): <strong>{(csCapitalShare * 100).toFixed(1)}%</strong>
                </div>
              </div>

              {/* Pie chart */}
              <PlotlyChart
                data={[{
                  values: [csLaborShare, csCapitalShare],
                  labels: ['Labor Share (θL)', 'Capital Share (θK)'],
                  type: 'pie',
                  marker: { colors: ['#3b82f6', '#8b5cf6'] },
                  textinfo: 'label+percent',
                  textfont: { color: '#fff', size: 13 },
                  hole: 0.4
                }]}
                layout={{ ...baseLayout, title: { text: 'Cost Share Breakdown', font: { size: 14, ...plotFont } }, height: 320, showlegend: false }}
                style={{ width: '100%', height: '320px', marginTop: '12px' }}
              />
            </div>

            <div className="means-box" style={{ borderColor: 'var(--accent-success)', marginTop: '16px' }}>
              <strong>What to notice:</strong> If most of the cost goes to labor, the industry is more sensitive to wage changes. If most of the cost goes to capital, it is more sensitive to rent changes.
            </div>
          </div>

          {/* ─── Lesson 8: Hat Algebra ─── */}
          <div className="lesson-card" id="m2-lesson8">
            <h3>Lesson 8: Hat Algebra in Simple Words</h3>
            <p>
              <strong>Hat algebra</strong> means working with <strong>percentage changes</strong> instead of absolute levels.
              If wage rises from 100 to 110, wage increased by 10%.
            </p>
            <div className="math-formula">x̂ = Δx / x (percentage change in x)</div>
            <p>The key formula connects percentage changes in costs to percentage changes in factor prices:</p>
            <div className="math-formula">ĉ = θ<sub>K</sub> × r̂ + θ<sub>L</sub> × ŵ</div>
            <p>
              The percentage change in unit cost is a <strong>weighted average</strong> of the percentage changes in factor prices. The weights are cost shares.
            </p>

            <div className="interactive-calc">
              <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--accent-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🧭 Interactive Calculator: Hat Algebra</span>
                <button onClick={resetHatAlgebra} className="reset-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <RefreshCw size={12} /><span>Reset</span>
                </button>
              </h4>
              <div className="calc-row">
                <div className="calc-input-wrapper">
                  <label>θ<sub>K</sub> (Capital share):</label>
                  <input type="range" className="control-slider" min="0.01" max="0.99" step="0.01" value={hatThetaK} onChange={e => setHatThetaK(Number(e.target.value))} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{(hatThetaK * 100).toFixed(0)}% → θ<sub>L</sub> = {(hatThetaL * 100).toFixed(0)}%</span>
                </div>
                <div className="calc-input-wrapper">
                  <label>r̂ (Rent change %):</label>
                  <input type="number" className="calc-input" value={hatRentChange} step="1" onChange={e => setHatRentChange(Number(e.target.value))} />
                </div>
                <div className="calc-input-wrapper">
                  <label>ŵ (Wage change %):</label>
                  <input type="number" className="calc-input" value={hatWageChange} step="1" onChange={e => setHatWageChange(Number(e.target.value))} />
                </div>
              </div>
              <div className="calc-result" style={{ marginTop: '12px', fontSize: '1.05rem', textAlign: 'center' }}>
                ĉ = {(hatThetaK * 100).toFixed(0)}% × {hatRentChange}% + {(hatThetaL * 100).toFixed(0)}% × {hatWageChange}% = <strong>{hatCostChange.toFixed(2)}%</strong>
              </div>
            </div>

            <div className="means-box" style={{ borderColor: 'var(--accent-success)', marginTop: '16px' }}>
              <strong>What to notice:</strong> If labor has a larger cost share, wage changes affect unit cost more strongly.
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ SUBMODULE 2.3 ═══════════════ */}
      {moduleTab === 'sub3' && (
        <div>
          <div className="lesson-card" style={{ borderLeft: '4px solid var(--accent-secondary)' }}>
            <h3>Submodule 2.3: Stolper-Samuelson Theorem</h3>
            <p>How do changes in goods prices affect who gains and who loses inside a country?</p>
          </div>

          {/* ─── Lesson 9: What SS Explains ─── */}
          <div className="lesson-card" id="m2-lesson9">
            <h3>Lesson 9: What Stolper-Samuelson Explains</h3>
            <p>
              Stolper-Samuelson explains how <strong>changes in goods prices</strong> affect <strong>factor earnings</strong>.
              When trade changes the price of goods, it also changes who gains and who loses inside a country.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '16px 0' }}>
              <div className="means-box">
                If the price of a <strong>capital-intensive</strong> good rises → <strong>capital owners gain</strong> in real terms.
              </div>
              <div className="means-box" style={{ borderColor: 'var(--accent-warning)' }}>
                If the price of a <strong>labor-intensive</strong> good rises → <strong>workers gain</strong> in real terms.
              </div>
            </div>
            <p>
              The factor used intensively in the rising-price industry gains. The other factor can <strong>lose</strong> in real terms — even though total national income may rise.
            </p>
            <TutorTip tip="Trade can increase total gains but still create winners and losers." />
          </div>

          {/* ─── Lesson 10: Two-Good Setup ─── */}
          <div className="lesson-card" id="m2-lesson10">
            <h3>Lesson 10: Two Goods and Two Factors Setup</h3>
            <p>We set up the model with:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '16px 0' }}>
              <div className="means-box">
                <strong>Industry 1:</strong> Manufacturing<br/>
                <strong>Industry 2:</strong> Agriculture
              </div>
              <div className="means-box" style={{ borderColor: 'var(--accent-warning)' }}>
                <strong>Factor U:</strong> Unskilled labor<br/>
                <strong>Factor S:</strong> Skilled labor
              </div>
            </div>
            <p>Each industry has sales revenue and pays earnings to skilled and unskilled workers. The <strong>cost shares</strong> describe how much of revenue goes to each factor:</p>
            <div className="math-formula">
              ΔP₁/P₁ = θ<sub>U1</sub> × Δw<sub>U</sub>/w<sub>U</sub> + θ<sub>S1</sub> × Δw<sub>S</sub>/w<sub>S</sub>
            </div>
            <div className="math-formula">
              ΔP₂/P₂ = θ<sub>U2</sub> × Δw<sub>U</sub>/w<sub>U</sub> + θ<sub>S2</sub> × Δw<sub>S</sub>/w<sub>S</sub>
            </div>
            <div className="factor-table-wrapper" style={{ marginTop: '12px' }}>
              <table className="factor-table">
                <thead>
                  <tr><th>Symbol</th><th>Meaning</th></tr>
                </thead>
                <tbody>
                  <tr><td>ΔP₁/P₁</td><td>Percentage change in price of manufacturing</td></tr>
                  <tr><td>ΔP₂/P₂</td><td>Percentage change in price of agriculture</td></tr>
                  <tr><td>Δw<sub>U</sub>/w<sub>U</sub></td><td>Percentage change in unskilled wage</td></tr>
                  <tr><td>Δw<sub>S</sub>/w<sub>S</sub></td><td>Percentage change in skilled wage</td></tr>
                  <tr><td>θ</td><td>Cost share of a factor in an industry</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ─── Lesson 11: Numerical SS ─── */}
          <div className="lesson-card" id="m2-lesson11">
            <h3>Lesson 11: Numerical Stolper-Samuelson Example</h3>
            <p>Using the default values from the practice problem:</p>
            <div className="factor-table-wrapper">
              <table className="factor-table">
                <thead>
                  <tr><th></th><th>Sales Revenue</th><th>Unskilled Earnings</th><th>Skilled Earnings</th></tr>
                </thead>
                <tbody>
                  <tr><td><strong>Manufacturing</strong></td><td>100</td><td>25</td><td>75</td></tr>
                  <tr><td><strong>Agriculture</strong></td><td>200</td><td>100</td><td>100</td></tr>
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: '12px' }}>
              The system of equations to solve:<br/>
              <code>p̂₁ = θ<sub>U1</sub> × ŵ<sub>U</sub> + θ<sub>S1</sub> × ŵ<sub>S</sub></code><br/>
              <code>p̂₂ = θ<sub>U2</sub> × ŵ<sub>U</sub> + θ<sub>S2</sub> × ŵ<sub>S</sub></code>
            </p>

            <div className="interactive-calc">
              <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--accent-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🧭 Interactive Calculator: Stolper-Samuelson</span>
                <button onClick={resetSS} className="reset-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <RefreshCw size={12} /><span>Reset</span>
                </button>
              </h4>
              <div className="calc-row">
                <div className="calc-input-wrapper">
                  <label>Mfg price change (%):</label>
                  <input type="number" className="calc-input" value={ssPriceChange1} step="1" onChange={e => setSsPriceChange1(Number(e.target.value))} />
                </div>
                <div className="calc-input-wrapper">
                  <label>Agri price change (%):</label>
                  <input type="number" className="calc-input" value={ssPriceChange2} step="1" onChange={e => setSsPriceChange2(Number(e.target.value))} />
                </div>
              </div>
              <div className="calc-row" style={{ marginTop: '12px' }}>
                <div className="calc-input-wrapper">
                  <label>θ<sub>U1</sub> (Mfg unskilled share):</label>
                  <input type="range" className="control-slider" min="0.01" max="0.99" step="0.01" value={ssThetaU1} onChange={e => setSsThetaU1(Number(e.target.value))} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>θ<sub>U1</sub>={ssThetaU1.toFixed(2)}, θ<sub>S1</sub>={ssThetaS1.toFixed(2)}</span>
                </div>
                <div className="calc-input-wrapper">
                  <label>θ<sub>U2</sub> (Agri unskilled share):</label>
                  <input type="range" className="control-slider" min="0.01" max="0.99" step="0.01" value={ssThetaU2} onChange={e => setSsThetaU2(Number(e.target.value))} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>θ<sub>U2</sub>={ssThetaU2.toFixed(2)}, θ<sub>S2</sub>={ssThetaS2.toFixed(2)}</span>
                </div>
              </div>

              <div className="try-this-box" style={{ marginTop: '12px' }}>
                <strong>💡 Try This:</strong> The defaults give Manufacturing price +10%, Agriculture price +5%, with θ<sub>U1</sub>=0.25, θ<sub>S1</sub>=0.75, θ<sub>U2</sub>=0.50, θ<sub>S2</sub>=0.50. Verify that skilled wage rises +15% and unskilled wage falls −5%.
              </div>

              {/* Results */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
                <div className="calc-result" style={{
                  backgroundColor: ssSkilledChange >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  borderColor: ssSkilledChange >= 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                  color: ssSkilledChange >= 0 ? 'var(--accent-success)' : 'var(--accent-error)',
                  fontSize: '1.1rem'
                }}>
                  Skilled wage change (ŵ<sub>S</sub>): <strong>{ssSkilledChange.toFixed(1)}%</strong>
                </div>
                <div className="calc-result" style={{
                  backgroundColor: ssUnskilledChange >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  borderColor: ssUnskilledChange >= 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                  color: ssUnskilledChange >= 0 ? 'var(--accent-success)' : 'var(--accent-error)',
                  fontSize: '1.1rem'
                }}>
                  Unskilled wage change (ŵ<sub>U</sub>): <strong>{ssUnskilledChange.toFixed(1)}%</strong>
                </div>
              </div>

              {/* Ranking */}
              <div className="calc-result" style={{ marginTop: '8px', textAlign: 'center' }}>
                <strong>Ranking:</strong> ŵ<sub>S</sub> ({ssSkilledChange.toFixed(1)}%) {ssSkilledChange >= ssPriceChange1 ? '>' : '<'} p̂₁ ({ssPriceChange1}%) {ssPriceChange1 >= ssPriceChange2 ? '>' : '<'} p̂₂ ({ssPriceChange2}%) {ssPriceChange2 >= ssUnskilledChange ? '>' : '<'} ŵ<sub>U</sub> ({ssUnskilledChange.toFixed(1)}%)
              </div>

              {/* Bar Chart */}
              <PlotlyChart
                data={[{
                  x: ['Skilled Wage', 'Mfg Price', 'Agri Price', 'Unskilled Wage'],
                  y: [ssSkilledChange, ssPriceChange1, ssPriceChange2, ssUnskilledChange],
                  type: 'bar',
                  marker: {
                    color: [
                      ssSkilledChange >= 0 ? '#10b981' : '#ef4444',
                      '#3b82f6',
                      '#f59e0b',
                      ssUnskilledChange >= 0 ? '#10b981' : '#ef4444'
                    ]
                  }
                }]}
                layout={{ ...baseLayout, title: { text: 'Stolper-Samuelson: Price & Wage Changes (%)', font: { size: 14, ...plotFont } }, yaxis: { ...baseLayout.yaxis, title: '% Change' }, height: 340 }}
                style={{ width: '100%', height: '340px', marginTop: '12px' }}
              />
            </div>

            <div className="means-box" style={{ borderColor: 'var(--accent-success)', marginTop: '16px' }}>
              <strong>What to notice:</strong> The skilled wage rises more than both goods prices, so skilled workers' real purchasing power rises. The unskilled wage falls while goods prices rise, so unskilled workers' real purchasing power falls.
            </div>
            <TutorTip tip="Real income means what your wage can buy, not just the number written on your paycheck." />
          </div>

          {/* ─── Lesson 12: Real Earnings ─── */}
          <div className="lesson-card" id="m2-lesson12">
            <h3>Lesson 12: Real Earnings and Purchasing Power</h3>
            <p>
              A wage can rise in <strong>nominal terms</strong> but still fall in <strong>real terms</strong> if prices rise more.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '12px 0' }}>
              <div className="means-box" style={{ borderColor: 'var(--accent-success)' }}>
                If wage growth &gt; price growth → real purchasing power <strong>rises</strong>.
              </div>
              <div className="means-box" style={{ borderColor: 'var(--accent-error)' }}>
                If wage growth &lt; price growth → real purchasing power <strong>falls</strong>.
              </div>
            </div>

            <div className="interactive-calc">
              <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--accent-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🧭 Mini Calculator: Real Wage</span>
                <button onClick={resetReal} className="reset-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <RefreshCw size={12} /><span>Reset</span>
                </button>
              </h4>
              <div className="calc-row">
                <div className="calc-input-wrapper">
                  <label>Wage growth (%):</label>
                  <input type="number" className="calc-input" value={realWageGrowth} step="1" onChange={e => setRealWageGrowth(Number(e.target.value))} />
                </div>
                <div className="calc-input-wrapper">
                  <label>Price growth (%):</label>
                  <input type="number" className="calc-input" value={realPriceGrowth} step="1" onChange={e => setRealPriceGrowth(Number(e.target.value))} />
                </div>
              </div>
              <div className="calc-result" style={{
                marginTop: '12px', textAlign: 'center', fontSize: '1.1rem',
                backgroundColor: realWageChange >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                borderColor: realWageChange >= 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                color: realWageChange >= 0 ? 'var(--accent-success)' : 'var(--accent-error)'
              }}>
                Real wage change ≈ {realWageGrowth}% − {realPriceGrowth}% = <strong>{realWageChange}%</strong>
                {realWageChange >= 0 ? ' → Worker is better off ✅' : ' → Worker is worse off ❌'}
              </div>
            </div>

            {/* Micro Quiz */}
            <div className="micro-quiz-card">
              <h4>💡 Check Your Understanding</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>
                If a worker's wage rises by 5% but the prices of all goods rise by 8%, is the worker better or worse off?
              </p>
              <div className="micro-quiz-options">
                <button className={`micro-quiz-option ${microQuizzes.real1?.selected === 0 ? 'incorrect' : ''}`} onClick={() => handleMicroQuiz('real1', 0, 1)} disabled={microQuizzes.real1 != null}>
                  Better off — wages went up
                </button>
                <button className={`micro-quiz-option ${microQuizzes.real1?.selected === 1 ? 'correct' : ''}`} onClick={() => handleMicroQuiz('real1', 1, 1)} disabled={microQuizzes.real1 != null}>
                  Worse off — prices rose faster than wages
                </button>
              </div>
              {microQuizzes.real1 && (
                <div className={`micro-feedback-box ${microQuizzes.real1.correct ? 'correct' : 'incorrect'}`}>
                  {microQuizzes.real1.correct
                    ? "Correct! Real wage ≈ 5% − 8% = −3%. The worker can buy less than before."
                    : "Not quite. Even though the wage went up, prices went up faster (8% > 5%), so purchasing power actually fell."}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ SUBMODULE 2.4 ═══════════════ */}
      {moduleTab === 'sub4' && (
        <div>
          <div className="lesson-card" style={{ borderLeft: '4px solid var(--accent-secondary)' }}>
            <h3>Submodule 2.4: Rybczynski Theorem</h3>
            <p>What happens to production when a country's resource supply changes?</p>
          </div>

          {/* ─── Lesson 13: What Rybczynski Explains ─── */}
          <div className="lesson-card" id="m2-lesson13">
            <h3>Lesson 13: What Rybczynski Explains</h3>
            <p>
              Stolper-Samuelson studies <strong>goods price changes</strong>.
              Rybczynski studies <strong>resource supply changes</strong>.
            </p>
            <div className="means-box" style={{ borderColor: 'var(--accent-secondary)', marginBottom: '16px' }}>
              <strong>Main Question:</strong> "What happens to production if a country gets more of one factor, such as more capital, while goods prices stay fixed?"
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="means-box" style={{ borderColor: 'var(--accent-success)' }}>
                If <strong>capital increases</strong> → capital-intensive sector <strong>expands</strong>, labor-intensive sector may <strong>contract</strong>.
              </div>
              <div className="means-box" style={{ borderColor: 'var(--accent-warning)' }}>
                If <strong>labor increases</strong> → labor-intensive sector <strong>expands</strong>, capital-intensive sector may <strong>contract</strong>.
              </div>
            </div>
            <TutorTip tip="Stolper-Samuelson is about price changes. Rybczynski is about resource changes." />
          </div>

          {/* ─── Lesson 14: Output Effects ─── */}
          <div className="lesson-card" id="m2-lesson14">
            <h3>Lesson 14: Output Effects of Resource Growth</h3>
            <p>
              Suppose <strong>Food is capital-intensive</strong> and <strong>Cloth is labor-intensive</strong>.
              If capital supply increases while labor stays fixed:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '16px 0' }}>
              <div className="means-box" style={{ borderColor: 'var(--accent-success)' }}>
                Food output <strong>rises</strong>
              </div>
              <div className="means-box" style={{ borderColor: 'var(--accent-error)' }}>
                Cloth output <strong>falls</strong>
              </div>
            </div>
            <div className="math-formula">Q̂<sub>F</sub> = K̂ + (α<sub>KC</sub> / D) × (K̂ − L̂)</div>
            <div className="math-formula">Q̂<sub>C</sub> = L̂ − (α<sub>LF</sub> / D) × (K̂ − L̂)</div>
            <div className="math-formula">where D = α<sub>KF</sub> − α<sub>LF</sub></div>
            <div className="factor-table-wrapper" style={{ margin: '12px 0' }}>
              <table className="factor-table">
                <thead><tr><th>Symbol</th><th>Meaning</th></tr></thead>
                <tbody>
                  <tr><td>Q̂<sub>F</sub></td><td>% change in food output</td></tr>
                  <tr><td>Q̂<sub>C</sub></td><td>% change in cloth output</td></tr>
                  <tr><td>K̂</td><td>% change in capital supply</td></tr>
                  <tr><td>L̂</td><td>% change in labor supply</td></tr>
                  <tr><td>α<sub>KF</sub></td><td>Share of capital used in food</td></tr>
                  <tr><td>α<sub>LF</sub></td><td>Share of labor used in food</td></tr>
                </tbody>
              </table>
            </div>

            <div className="interactive-calc">
              <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--accent-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🧭 Interactive Calculator: Rybczynski</span>
                <button onClick={resetRyb} className="reset-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <RefreshCw size={12} /><span>Reset</span>
                </button>
              </h4>
              <div className="calc-row">
                <div className="calc-input-wrapper">
                  <label>Capital growth K̂ (%):</label>
                  <input type="number" className="calc-input" value={rybKhat} step="1" onChange={e => setRybKhat(Number(e.target.value))} />
                </div>
                <div className="calc-input-wrapper">
                  <label>Labor growth L̂ (%):</label>
                  <input type="number" className="calc-input" value={rybLhat} step="1" onChange={e => setRybLhat(Number(e.target.value))} />
                </div>
              </div>
              <div className="calc-row" style={{ marginTop: '12px' }}>
                <div className="calc-input-wrapper">
                  <label>α<sub>KF</sub> (Capital share in Food):</label>
                  <input type="range" className="control-slider" min="0.01" max="0.99" step="0.01" value={rybAlphaKF} onChange={e => setRybAlphaKF(Number(e.target.value))} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>α<sub>KF</sub>={rybAlphaKF.toFixed(2)}, α<sub>KC</sub>={rybAlphaKC.toFixed(2)}</span>
                </div>
                <div className="calc-input-wrapper">
                  <label>α<sub>LF</sub> (Labor share in Food):</label>
                  <input type="range" className="control-slider" min="0.01" max="0.99" step="0.01" value={rybAlphaLF} onChange={e => setRybAlphaLF(Number(e.target.value))} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>α<sub>LF</sub>={rybAlphaLF.toFixed(2)}, α<sub>LC</sub>={rybAlphaLC.toFixed(2)}</span>
                </div>
              </div>
              {rybD <= 0 && (
                <div className="means-box" style={{ borderColor: 'var(--accent-error)', marginTop: '12px' }}>
                  ⚠️ For food to be capital-intensive, α<sub>KF</sub> must be greater than α<sub>LF</sub>. Current D = {rybD.toFixed(2)} ≤ 0. Please adjust the sliders.
                </div>
              )}
              {rybD > 0 && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
                    <div className="calc-result" style={{
                      backgroundColor: rybQF >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      borderColor: rybQF >= 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                      color: rybQF >= 0 ? 'var(--accent-success)' : 'var(--accent-error)',
                      fontSize: '1.05rem'
                    }}>
                      Food output change (Q̂<sub>F</sub>): <strong>{rybQF.toFixed(1)}%</strong>
                    </div>
                    <div className="calc-result" style={{
                      backgroundColor: rybQC >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      borderColor: rybQC >= 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                      color: rybQC >= 0 ? 'var(--accent-success)' : 'var(--accent-error)',
                      fontSize: '1.05rem'
                    }}>
                      Cloth output change (Q̂<sub>C</sub>): <strong>{rybQC.toFixed(1)}%</strong>
                    </div>
                  </div>

                  <PlotlyChart
                    data={[{
                      x: ['Food Output (Q̂F)', 'Cloth Output (Q̂C)'],
                      y: [rybQF, rybQC],
                      type: 'bar',
                      marker: { color: [rybQF >= 0 ? '#10b981' : '#ef4444', rybQC >= 0 ? '#10b981' : '#ef4444'] }
                    }]}
                    layout={{ ...baseLayout, title: { text: 'Rybczynski: Output Changes (%)', font: { size: 14, ...plotFont } }, yaxis: { ...baseLayout.yaxis, title: '% Change' }, height: 300 }}
                    style={{ width: '100%', height: '300px', marginTop: '12px' }}
                  />
                </>
              )}
            </div>

            <div className="means-box" style={{ borderColor: 'var(--accent-success)', marginTop: '16px' }}>
              <strong>What to notice:</strong> When capital grows more than labor, the capital-intensive sector expands more strongly. The labor-intensive sector may shrink.
            </div>

            {/* Micro Quiz */}
            <div className="micro-quiz-card">
              <h4>💡 Check Your Understanding</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>
                If labor supply increases by 20% and capital stays fixed, and cloth is labor-intensive, what happens to cloth output?
              </p>
              <div className="micro-quiz-options">
                <button className={`micro-quiz-option ${microQuizzes.ryb1?.selected === 0 ? 'correct' : ''}`} onClick={() => handleMicroQuiz('ryb1', 0, 0)} disabled={microQuizzes.ryb1 != null}>
                  Cloth output rises — the abundant factor's sector expands
                </button>
                <button className={`micro-quiz-option ${microQuizzes.ryb1?.selected === 1 ? 'incorrect' : ''}`} onClick={() => handleMicroQuiz('ryb1', 1, 0)} disabled={microQuizzes.ryb1 != null}>
                  Cloth output falls
                </button>
              </div>
              {microQuizzes.ryb1 && (
                <div className={`micro-feedback-box ${microQuizzes.ryb1.correct ? 'correct' : 'incorrect'}`}>
                  {microQuizzes.ryb1.correct
                    ? "Correct! More labor → the labor-intensive sector (cloth) expands, by Rybczynski."
                    : "Not quite. The Rybczynski theorem says more of a factor expands the sector that uses it intensively."}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ SUBMODULE 2.5 ═══════════════ */}
      {moduleTab === 'sub5' && (
        <div>
          <div className="lesson-card" style={{ borderLeft: '4px solid var(--accent-secondary)' }}>
            <h3>Submodule 2.5: Measuring Gains from Trade</h3>
            <p>It is not enough to say trade creates gains. Economists also want to measure how large those gains are.</p>
          </div>

          {/* ─── Lesson 15: Why Measure? ─── */}
          <div className="lesson-card" id="m2-lesson15">
            <h3>Lesson 15: Why Measure Gains from Trade?</h3>
            <p>
              <strong>Autarky</strong> means no trade — the country is completely self-sufficient.
              <strong>Free trade</strong> means the country can trade with the rest of the world.
            </p>
            <p>
              <strong>Gains from trade</strong> compare welfare before and after trade. The key question is:
              how much better off is the country under free trade compared to autarky?
            </p>
            <TutorTip tip="Measuring gains from trade turns the abstract idea of 'trade is good' into a concrete number economists can compare across countries and time periods." />
          </div>

          {/* ─── Lesson 16: Autarky vs Free Trade ─── */}
          <div className="lesson-card" id="m2-lesson16">
            <h3>Lesson 16: Autarky and Free Trade Welfare</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '12px 0' }}>
              <div className="means-box">
                <strong>A</strong> = autarky outcome<br/>
                <strong>U<sub>A</sub></strong> = utility in autarky<br/>
                In autarky, consumption = production
              </div>
              <div className="means-box" style={{ borderColor: 'var(--accent-success)' }}>
                <strong>B</strong> = free trade outcome<br/>
                <strong>U<sub>B</sub></strong> = utility in free trade<br/>
                Free trade lets the country consume beyond its PPF
              </div>
            </div>
            <p>
              Gains from trade means <strong>U<sub>B</sub> &gt; U<sub>A</sub></strong>. The free trade bundle is a better consumption possibility than the autarky bundle.
            </p>

            {/* Simple PPF diagram with A and B */}
            <PlotlyChart
              data={[
                { x: [0, 40, 80], y: [100, 60, 0], mode: 'lines', name: 'PPF', line: { color: '#3b82f6', width: 3 } },
                { x: [30], y: [55], mode: 'markers+text', name: 'A (Autarky)', text: ['A'], textposition: 'top right', marker: { size: 14, color: '#f59e0b', symbol: 'circle' }, textfont: { size: 14, color: '#f59e0b' } },
                { x: [50], y: [65], mode: 'markers+text', name: 'B (Free Trade)', text: ['B'], textposition: 'top right', marker: { size: 14, color: '#10b981', symbol: 'diamond' }, textfont: { size: 14, color: '#10b981' } },
              ]}
              layout={{
                ...baseLayout,
                title: { text: 'Gains from Trade: Autarky (A) vs Free Trade (B)', font: { size: 14, ...plotFont } },
                xaxis: { ...baseLayout.xaxis, title: 'Manufacturing' },
                yaxis: { ...baseLayout.yaxis, title: 'Agriculture' },
                height: 360,
                showlegend: true,
                legend: { font: plotFont, bgcolor: 'transparent' }
              }}
              style={{ width: '100%', height: '360px' }}
            />
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '4px' }}>
              Point B lies <strong>outside</strong> the PPF — free trade lets the country consume beyond what it can produce alone.
            </p>
          </div>

          {/* ─── Lesson 17: Welfare Change ─── */}
          <div className="lesson-card" id="m2-lesson17">
            <h3>Lesson 17: Measuring Welfare Change with Prices and Consumption</h3>
            <div className="math-formula">W<sub>A</sub> = P<sub>A1</sub> × C<sub>A1</sub> + P<sub>A2</sub> × C<sub>A2</sub></div>
            <div className="math-formula">W<sub>B</sub> = P<sub>A1</sub> × C<sub>B1</sub> + P<sub>A2</sub> × C<sub>B2</sub></div>
            <div className="math-formula">ΔW = W<sub>B</sub> − W<sub>A</sub> = P<sub>A1</sub>(C<sub>B1</sub> − C<sub>A1</sub>) + P<sub>A2</sub>(C<sub>B2</sub> − C<sub>A2</sub>)</div>
            <p>
              We evaluate <strong>both baskets at autarky prices</strong> to compare them on the same scale. If the free trade consumption basket is worth more than the autarky basket at autarky prices, welfare has increased.
            </p>

            <div className="interactive-calc">
              <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--accent-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🧭 Interactive Calculator: Welfare Change</span>
                <button onClick={resetWelfare} className="reset-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <RefreshCw size={12} /><span>Reset</span>
                </button>
              </h4>
              <div className="calc-row">
                <div className="calc-input-wrapper"><label>P<sub>A1</sub> (Autarky price, Good 1):</label><input type="number" className="calc-input" value={wfPA1} step="1" onChange={e => setWfPA1(Number(e.target.value))} /></div>
                <div className="calc-input-wrapper"><label>P<sub>A2</sub> (Autarky price, Good 2):</label><input type="number" className="calc-input" value={wfPA2} step="1" onChange={e => setWfPA2(Number(e.target.value))} /></div>
              </div>
              <div className="calc-row" style={{ marginTop: '8px' }}>
                <div className="calc-input-wrapper"><label>C<sub>A1</sub> (Autarky consump., G1):</label><input type="number" className="calc-input" value={wfCA1} step="1" onChange={e => setWfCA1(Number(e.target.value))} /></div>
                <div className="calc-input-wrapper"><label>C<sub>A2</sub> (Autarky consump., G2):</label><input type="number" className="calc-input" value={wfCA2} step="1" onChange={e => setWfCA2(Number(e.target.value))} /></div>
              </div>
              <div className="calc-row" style={{ marginTop: '8px' }}>
                <div className="calc-input-wrapper"><label>C<sub>B1</sub> (Free trade consump., G1):</label><input type="number" className="calc-input" value={wfCB1} step="1" onChange={e => setWfCB1(Number(e.target.value))} /></div>
                <div className="calc-input-wrapper"><label>C<sub>B2</sub> (Free trade consump., G2):</label><input type="number" className="calc-input" value={wfCB2} step="1" onChange={e => setWfCB2(Number(e.target.value))} /></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '16px' }}>
                <div className="calc-result">W<sub>A</sub>: <strong>{wfWA.toFixed(0)}</strong></div>
                <div className="calc-result">W<sub>B</sub>: <strong>{wfWB.toFixed(0)}</strong></div>
                <div className="calc-result" style={{
                  backgroundColor: wfDeltaW >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  borderColor: wfDeltaW >= 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                  color: wfDeltaW >= 0 ? 'var(--accent-success)' : 'var(--accent-error)',
                  fontSize: '1.1rem'
                }}>
                  ΔW: <strong>{wfDeltaW >= 0 ? '+' : ''}{wfDeltaW.toFixed(0)}</strong>
                  {wfDeltaW >= 0 ? ' ✅' : ' ❌'}
                </div>
              </div>
            </div>

            <div className="means-box" style={{ borderColor: 'var(--accent-success)', marginTop: '16px' }}>
              <strong>What to notice:</strong> If the free trade consumption basket is worth more than the autarky basket at autarky prices, measured welfare has increased.
            </div>
          </div>

          {/* ─── Lesson 18: Gains with Trade Data ─── */}
          <div className="lesson-card" id="m2-lesson18">
            <h3>Lesson 18: Measuring Gains with Trade and Production Data</h3>
            <p>
              Economists may not always have direct consumption data. So they rewrite gains from trade using <strong>trade and production data</strong>:
            </p>
            <div className="math-formula">ΔW = P<sub>A</sub> · (C<sub>B</sub> − Q<sub>B</sub>) + P<sub>A</sub> · (Q<sub>B</sub> − Q<sub>A</sub>)</div>
            <p>
              <strong>C<sub>B</sub> − Q<sub>B</sub></strong> = net imports under free trade (trade data)<br/>
              <strong>Q<sub>B</sub> − Q<sub>A</sub></strong> = change in production from autarky to free trade<br/>
              This is practical because trade and production data are often easier to find than consumption data.
            </p>

            <div className="interactive-calc">
              <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--accent-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🧭 Interactive Table: Gains from Trade (3 Goods)</span>
                <button onClick={resetGFT} className="reset-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <RefreshCw size={12} /><span>Reset</span>
                </button>
              </h4>
              <div className="factor-table-wrapper">
                <table className="factor-table" style={{ textAlign: 'center' }}>
                  <thead>
                    <tr>
                      <th>Good</th>
                      <th>Autarky Price (P<sub>A</sub>)</th>
                      <th>Net Imports</th>
                      <th>Prod. Change</th>
                      <th>Trade Contrib.</th>
                      <th>Prod. Contrib.</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gftGoods.map((g, i) => {
                      const tradeCont = g.price * g.netImports;
                      const prodCont = g.price * g.prodChange;
                      return (
                        <tr key={i}>
                          <td style={{ fontWeight: 600 }}>{g.name}</td>
                          <td><input type="number" className="calc-input" style={{ width: '70px', textAlign: 'center' }} value={g.price} onChange={e => updateGftGood(i, 'price', e.target.value)} /></td>
                          <td><input type="number" className="calc-input" style={{ width: '70px', textAlign: 'center' }} value={g.netImports} onChange={e => updateGftGood(i, 'netImports', e.target.value)} /></td>
                          <td><input type="number" className="calc-input" style={{ width: '70px', textAlign: 'center' }} value={g.prodChange} onChange={e => updateGftGood(i, 'prodChange', e.target.value)} /></td>
                          <td>{tradeCont.toFixed(0)}</td>
                          <td>{prodCont.toFixed(0)}</td>
                          <td style={{ fontWeight: 600 }}>{(tradeCont + prodCont).toFixed(0)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr style={{ borderTop: '2px solid var(--accent-primary)' }}>
                      <td colSpan="6" style={{ fontWeight: 700, textAlign: 'right', paddingRight: '12px' }}>Total ΔW:</td>
                      <td style={{
                        fontWeight: 700, fontSize: '1.1rem',
                        color: gftTotal >= 0 ? 'var(--accent-success)' : 'var(--accent-error)'
                      }}>
                        {gftTotal >= 0 ? '+' : ''}{gftTotal.toFixed(0)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="means-box" style={{ borderColor: 'var(--accent-success)', marginTop: '16px' }}>
              <strong>What to notice:</strong> This method lets researchers measure gains from trade even when direct consumption data are difficult to collect.
            </div>
            <TutorTip tip="Positive net imports mean the country is importing that good. Negative means exporting. Both contribute to gains from trade when evaluated at autarky prices." />
          </div>
        </div>
      )}

      {/* ═══════════════ QUIZ TAB ═══════════════ */}
      {moduleTab === 'quiz' && (
        <div className="quiz-section">
          <Module2Quiz />
        </div>
      )}
    </div>
  );
}
