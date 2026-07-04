import React, { useState, useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import TutorTip from './TutorTip';
import Module4Quiz from './Module4Quiz';

export default function Module4({ theme, setActiveTab }) {
  const [moduleTab, setModuleTab] = useState('sub1');

  // ── Theme helpers ──
  const isDark = theme === 'dark';
  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const gridColor = isDark ? '#1e293b' : '#e2e8f0';

  // ── Graph refs ──
  const krugWelfareRef = useRef(null);
  const krugHomeMarketRef = useRef(null);
  const dsMarkupRef = useRef(null);
  const dsFirmCountRef = useRef(null);
  const melitzThreshRef = useRef(null);
  const melitzDistRef = useRef(null);
  const paretoRef = useRef(null);

  // ══════════════════════════════════════════════════════════════
  // 4.1  KRUGMAN STATE
  // ══════════════════════════════════════════════════════════════
  const [krugL, setKrugL] = useState(100);
  const [krugLStar, setKrugLStar] = useState(100);
  const [krugSigma, setKrugSigma] = useState(4);
  const [krugF, setKrugF] = useState(5);

  const krugNH = krugL / (krugSigma * krugF);
  const krugNF = krugLStar / (krugSigma * krugF);
  const krugNWorld = krugNH + krugNF;

  const krugUH_auto  = Math.pow(krugNH, 1 / (krugSigma - 1));
  const krugUH_trade = Math.pow(krugNWorld, 1 / (krugSigma - 1));
  const krugGainPct  = ((krugUH_trade / krugUH_auto - 1) * 100).toFixed(1);

  const resetKrug = () => { setKrugL(100); setKrugLStar(100); setKrugSigma(4); setKrugF(5); };

  // Home market effect
  const [hmeSH, setHmeSH] = useState(0.6);
  const [hmeSigmaHME, setHmeSigmaHME] = useState(4);
  const hmeScaleFactor = (hmeSH - 0.5) * (hmeSigmaHME / (hmeSigmaHME - 1));
  const hmeShareH = Math.min(1, Math.max(0, 0.5 + hmeScaleFactor)).toFixed(3);

  // ══════════════════════════════════════════════════════════════
  // 4.2  DIXIT-STIGLITZ STATE
  // ══════════════════════════════════════════════════════════════
  const [dsSigma, setDsSigma] = useState(4);
  const [dsW, setDsW] = useState(10);
  const [dsA, setDsA] = useState(2);
  const [dsF, setDsF] = useState(5);
  const [dsL, setDsL] = useState(100);

  const dsMC     = dsW / dsA;
  const dsP      = (dsSigma / (dsSigma - 1)) * dsMC;
  const dsMarkup = (dsP - dsMC).toFixed(2);
  const dsN      = (dsL / (dsSigma * dsF)).toFixed(2);

  const resetDS = () => { setDsSigma(4); setDsW(10); setDsA(2); setDsF(5); setDsL(100); };

  // ══════════════════════════════════════════════════════════════
  // 4.3  MELITZ STATE
  // ══════════════════════════════════════════════════════════════
  const [melSigma, setMelSigma] = useState(4);
  const [melFd, setMelFd]   = useState(5);
  const [melFx, setMelFx]   = useState(20);
  const [melTau, setMelTau] = useState(1.4);

  const melPhiD = 1.0;
  const melPhiX = melTau * Math.pow(melFx / melFd, 1 / (melSigma - 1));

  const resetMelitz = () => { setMelSigma(4); setMelFd(5); setMelFx(20); setMelTau(1.4); };

  // ══════════════════════════════════════════════════════════════
  // 4.4  MELITZ-PARETO STATE
  // ══════════════════════════════════════════════════════════════
  const [parK, setParK]         = useState(3.5);
  const [parSigma, setParSigma] = useState(4);
  const [parFd, setParFd]       = useState(5);
  const [parFx, setParFx]       = useState(20);
  const [parTau, setParTau]     = useState(1.4);

  const parCondition  = parK > parSigma - 1;
  const parRaw        = parCondition ? Math.pow(parTau, -parK) * Math.pow(parFx / parFd, 1 - parK / (parSigma - 1)) : 0;
  const parExportFrac = parCondition ? Math.min(1, Math.max(0, parRaw)).toFixed(4) : 'N/A (k <= sigma-1)';
  const parGFT        = parCondition ? ((Math.pow(parTau, -(parK - (parSigma - 1))) - 1) * 100).toFixed(2) : 'N/A';

  const resetPareto = () => { setParK(3.5); setParSigma(4); setParFd(5); setParFx(20); setParTau(1.4); };

  // ══════════════════════════════════════════════════════════════
  // PLOTLY EFFECTS
  // ══════════════════════════════════════════════════════════════

  // 4.1 Krugman welfare
  useEffect(() => {
    if (moduleTab === 'sub1' && krugWelfareRef.current) {
      try {
        const sigmaRange = Array.from({ length: 30 }, (_, i) => 2.1 + i * 0.3);
        const gains = sigmaRange.map(sig =>
          ((Math.pow((krugNH + krugNF) / krugNH, 1 / (sig - 1)) - 1) * 100)
        );
        Plotly.newPlot(krugWelfareRef.current, [{
          x: sigmaRange, y: gains, mode: 'lines',
          line: { color: '#6366f1', width: 3 }, fill: 'tozeroy', fillcolor: 'rgba(99,102,241,0.08)',
          hovertemplate: 'sigma=%{x:.1f}<br>Gain=%{y:.1f}%<extra></extra>'
        }], {
          title: { text: '<b>Welfare Gain from Trade (Love of Variety)</b>', font: { color: textColor, size: 13 } },
          paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
          margin: { l: 70, r: 30, t: 50, b: 60 },
          xaxis: { title: 'Elasticity sigma', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
          yaxis: { title: 'Welfare gain (%)', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor }
        }, { displayModeBar: false, responsive: true });
      } catch (e) { console.warn('Plotly:', e); }
    }
  }, [moduleTab, krugNH, krugNF, textColor, gridColor]);

  // 4.1 Home market effect
  useEffect(() => {
    if (moduleTab === 'sub1' && krugHomeMarketRef.current) {
      try {
        const sRange = Array.from({ length: 50 }, (_, i) => 0.01 + i * 0.02);
        const shareH = sRange.map(s => {
          const sf = (s - 0.5) * (hmeSigmaHME / (hmeSigmaHME - 1));
          return Math.min(1, Math.max(0, 0.5 + sf));
        });
        Plotly.newPlot(krugHomeMarketRef.current, [
          { x: [0, 1], y: [0, 1], mode: 'lines', line: { color: '#64748b', dash: 'dash', width: 1.5 }, name: '45 deg' },
          { x: sRange, y: shareH, mode: 'lines', line: { color: '#f59e0b', width: 3 }, name: 'Home prod. share', hovertemplate: 'Spending=%{x:.2f}<br>Production=%{y:.2f}<extra></extra>' }
        ], {
          title: { text: '<b>Home Market Effect</b>', font: { color: textColor, size: 13 } },
          paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
          margin: { l: 70, r: 30, t: 50, b: 60 },
          xaxis: { title: 'Home spending share', range: [0, 1], titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
          yaxis: { title: 'Home production share', range: [0, 1], titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
          legend: { font: { color: textColor, size: 10 }, bgcolor: 'transparent' }
        }, { displayModeBar: false, responsive: true });
      } catch (e) { console.warn('Plotly:', e); }
    }
  }, [moduleTab, hmeSigmaHME, textColor, gridColor]);

  // 4.2 DS markup
  useEffect(() => {
    if (moduleTab === 'sub2' && dsMarkupRef.current) {
      try {
        const sigmaVals = Array.from({ length: 30 }, (_, i) => 1.5 + i * 0.5);
        const markups = sigmaVals.map(sig => {
          const mc = dsW / dsA;
          const p  = (sig / (sig - 1)) * mc;
          return (p - mc) / mc * 100;
        });
        Plotly.newPlot(dsMarkupRef.current, [
          { x: sigmaVals, y: markups, mode: 'lines', line: { color: '#10b981', width: 3 }, hovertemplate: 'sigma=%{x:.1f}<br>Markup=%{y:.1f}%<extra></extra>' },
          { x: [dsSigma], y: [((dsSigma / (dsSigma - 1)) * dsMC - dsMC) / dsMC * 100], mode: 'markers', marker: { size: 12, color: '#f59e0b', symbol: 'star' }, name: 'Current sigma' }
        ], {
          title: { text: '<b>Monopolistic Markup vs. Substitutability</b>', font: { color: textColor, size: 13 } },
          paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
          margin: { l: 70, r: 30, t: 50, b: 60 },
          xaxis: { title: 'Elasticity sigma', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
          yaxis: { title: 'Markup over MC (%)', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
          showlegend: false
        }, { displayModeBar: false, responsive: true });
      } catch (e) { console.warn('Plotly:', e); }
    }
  }, [moduleTab, dsSigma, dsW, dsA, dsMC, textColor, gridColor]);

  // 4.2 Firm count
  useEffect(() => {
    if (moduleTab === 'sub2' && dsFirmCountRef.current) {
      try {
        const labVals = Array.from({ length: 30 }, (_, i) => 50 + i * 10);
        const nVals = labVals.map(l => l / (dsSigma * dsF));
        Plotly.newPlot(dsFirmCountRef.current, [
          { x: labVals, y: nVals, mode: 'lines', line: { color: '#6366f1', width: 3 }, hovertemplate: 'L=%{x}<br>n=%{y:.2f} firms<extra></extra>' },
          { x: [dsL], y: [dsL / (dsSigma * dsF)], mode: 'markers', marker: { size: 12, color: '#f59e0b', symbol: 'star' }, name: 'Current' }
        ], {
          title: { text: '<b>Number of Firms vs. Market Size</b>', font: { color: textColor, size: 13 } },
          paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
          margin: { l: 70, r: 30, t: 50, b: 60 },
          xaxis: { title: 'Labour supply L', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
          yaxis: { title: 'Number of firms n', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
          showlegend: false
        }, { displayModeBar: false, responsive: true });
      } catch (e) { console.warn('Plotly:', e); }
    }
  }, [moduleTab, dsSigma, dsF, dsL, textColor, gridColor]);

  // 4.3 Melitz threshold
  useEffect(() => {
    if (moduleTab === 'sub3' && melitzThreshRef.current) {
      try {
        const phiRange = Array.from({ length: 60 }, (_, i) => 0.2 + i * 0.07);
        const piD = phiRange.map(phi => Math.pow(phi, melSigma - 1) - melFd / 10);
        const piX = phiRange.map(phi => Math.pow(melTau, 1 - melSigma) * Math.pow(phi, melSigma - 1) - melFx / 10);
        const capPhi = Math.min(melPhiX, 4.2);
        Plotly.newPlot(melitzThreshRef.current, [
          { x: [0.2, 4.2], y: [0, 0], mode: 'lines', line: { color: '#64748b', dash: 'dash', width: 1 }, showlegend: false },
          { x: phiRange, y: piD, mode: 'lines', line: { color: '#3b82f6', width: 2.5 }, name: 'Domestic profit', hovertemplate: 'phi=%{x:.2f}<br>pi_d=%{y:.2f}<extra></extra>' },
          { x: phiRange, y: piX, mode: 'lines', line: { color: '#7c3aed', width: 2.5 }, name: 'Export profit', hovertemplate: 'phi=%{x:.2f}<br>pi_x=%{y:.2f}<extra></extra>' }
        ], {
          title: { text: '<b>Firm Profit by Productivity (Melitz Cutoffs)</b>', font: { color: textColor, size: 13 } },
          paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
          margin: { l: 70, r: 30, t: 50, b: 60 },
          xaxis: { title: 'Firm productivity phi', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
          yaxis: { title: 'Profit', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor, zeroline: true, zerolinecolor: gridColor },
          legend: { font: { color: textColor, size: 10 }, bgcolor: 'transparent' },
          annotations: [
            { x: melPhiD, y: 0, text: 'phi*_d', showarrow: true, arrowcolor: '#3b82f6', font: { color: '#3b82f6', size: 12 }, ay: -30 },
            { x: capPhi, y: 0, text: 'phi*_x', showarrow: true, arrowcolor: '#7c3aed', font: { color: '#7c3aed', size: 12 }, ay: -50 }
          ]
        }, { displayModeBar: false, responsive: true });
      } catch (e) { console.warn('Plotly:', e); }
    }
  }, [moduleTab, melSigma, melTau, melFd, melFx, melPhiD, melPhiX, textColor, gridColor]);

  // 4.3 Melitz distribution
  useEffect(() => {
    if (moduleTab === 'sub3' && melitzDistRef.current) {
      try {
        const phiRange = Array.from({ length: 50 }, (_, i) => 0.5 + i * 0.06);
        const density = phiRange.map(phi => 2 * Math.exp(-2 * (phi - 0.5)));
        const phiSurv = phiRange.filter(phi => phi >= melPhiD);
        const phiExp  = phiRange.filter(phi => phi >= Math.min(melPhiX, 3.4));
        Plotly.newPlot(melitzDistRef.current, [
          { x: phiRange, y: density, mode: 'lines', fill: 'tozeroy', fillcolor: 'rgba(148,163,184,0.12)', line: { color: '#94a3b8', width: 2 }, name: 'All entrants' },
          { x: phiSurv,  y: phiSurv.map(phi => 2 * Math.exp(-2 * (phi - 0.5))),  mode: 'lines', fill: 'tozeroy', fillcolor: 'rgba(59,130,246,0.2)',   line: { color: '#3b82f6', width: 2 }, name: 'Domestic producers' },
          { x: phiExp,   y: phiExp.map(phi => 2 * Math.exp(-2 * (phi - 0.5))),   mode: 'lines', fill: 'tozeroy', fillcolor: 'rgba(124,58,237,0.25)',  line: { color: '#7c3aed', width: 2 }, name: 'Exporters' }
        ], {
          title: { text: '<b>Firm Selection: Who Produces and Who Exports</b>', font: { color: textColor, size: 13 } },
          paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
          margin: { l: 70, r: 30, t: 50, b: 60 },
          xaxis: { title: 'Productivity phi', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
          yaxis: { title: 'Density of firms', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
          legend: { font: { color: textColor, size: 10 }, bgcolor: 'transparent', x: 0.6, y: 0.95 }
        }, { displayModeBar: false, responsive: true });
      } catch (e) { console.warn('Plotly:', e); }
    }
  }, [moduleTab, melPhiD, melPhiX, textColor, gridColor]);

  // 4.4 Pareto
  useEffect(() => {
    if (moduleTab === 'sub4' && paretoRef.current) {
      try {
        const tauRange = Array.from({ length: 30 }, (_, i) => 1.01 + i * 0.1);
        const fracVals = tauRange.map(tau => {
          if (!parCondition) return 0;
          return Math.min(1, Math.max(0, Math.pow(tau, -parK) * Math.pow(parFx / parFd, 1 - parK / (parSigma - 1)))) * 100;
        });
        const currentFrac = parCondition ? Math.min(1, Math.max(0, Math.pow(parTau, -parK) * Math.pow(parFx / parFd, 1 - parK / (parSigma - 1)))) * 100 : 0;
        Plotly.newPlot(paretoRef.current, [
          { x: tauRange, y: fracVals, mode: 'lines', line: { color: '#6366f1', width: 3 }, fill: 'tozeroy', fillcolor: 'rgba(99,102,241,0.08)', hovertemplate: 'tau=%{x:.2f}<br>Export frac=%{y:.2f}%<extra></extra>' },
          { x: [parTau], y: [currentFrac], mode: 'markers', marker: { size: 12, color: '#f59e0b', symbol: 'star' }, showlegend: false }
        ], {
          title: { text: '<b>Melitz-Pareto: Export Fraction vs. Trade Cost</b>', font: { color: textColor, size: 13 } },
          paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
          margin: { l: 70, r: 30, t: 50, b: 60 },
          xaxis: { title: 'Iceberg trade cost tau', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
          yaxis: { title: 'Firms exporting (%)', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
          showlegend: false
        }, { displayModeBar: false, responsive: true });
      } catch (e) { console.warn('Plotly:', e); }
    }
  }, [moduleTab, parK, parSigma, parFd, parFx, parTau, parCondition, textColor, gridColor]);

  // ══════════════════════════════════════════════════════════════
  // CSS STYLE HELPERS
  // ══════════════════════════════════════════════════════════════
  const card           = { marginBottom: '32px', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '16px' };
  const controlCard    = { padding: '16px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' };
  const formulaBox     = { padding: '14px 18px', borderRadius: '8px', background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)', fontFamily: 'monospace', fontSize: '0.97rem', margin: '12px 0', lineHeight: 1.7 };
  const beforeTouchBox = { padding: '14px 18px', borderRadius: '8px', background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.25)', fontSize: '0.9rem', color: 'var(--text-secondary)' };
  const tryThisBox     = { padding: '14px 18px', borderRadius: '8px', background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '14px', fontSize: '0.9rem' };
  const resultBox      = { padding: '14px 18px', borderRadius: '8px', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', marginTop: '12px' };
  const meansBox       = { padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', fontSize: '0.88rem', lineHeight: 1.8 };
  const noticeBox      = { padding: '14px 18px', borderRadius: '8px', background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.2)', fontSize: '0.9rem', marginTop: '14px' };
  const sliderRow      = { display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.92rem' };
  const sliderLabelRow = { display: 'flex', justifyContent: 'space-between', fontWeight: 500, color: 'var(--text-primary)' };
  const accent         = '#6366f1';

  // Slider helper
  const Slider = ({ label, value, setter, min, max, step }) => (
    <div style={controlCard}>
      <div style={sliderRow}>
        <div style={sliderLabelRow}>
          <span>{label}</span>
          <span>{step < 1 ? value.toFixed(2) : value}</span>
        </div>
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => setter(Number(e.target.value))} />
      </div>
    </div>
  );

  return (
    <div className="container" style={{ padding: '40px 24px' }}>

      {/* ── Header ── */}
      <div className="module-header">
        <button onClick={() => setActiveTab('home')} className="back-btn">
          <span>← Back to Course Path</span>
        </button>
        <div className="module-title-row">
          <div>
            <span style={{ color: accent, fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Module 4</span>
            <h2 style={{ fontSize: '2.1rem', marginTop: '4px' }}>Monopolistic Competition &amp; Heterogeneous Firms</h2>
          </div>
        </div>
      </div>

      {/* ── Submodule tabs ── */}
      <div className="module-sections-nav" style={{ overflowX: 'auto' }}>
        {[
          ['sub1', '4.1 Krugman (1980)'],
          ['sub2', '4.2 Dixit-Stiglitz'],
          ['sub3', '4.3 Melitz (2003)'],
          ['sub4', '4.4 Melitz-Pareto'],
          ['quiz',  'Final Quiz'],
        ].map(([key, label]) => (
          <button key={key} onClick={() => setModuleTab(key)}
            className={`tab-btn ${moduleTab === key ? 'active' : ''}`}>{label}</button>
        ))}
      </div>

      {/* ════════════════════ SUB 4.1: KRUGMAN ════════════════════ */}
      {moduleTab === 'sub1' && (
        <div>
          <div className="lesson-card" style={{ borderLeft: `4px solid ${accent}` }}>
            <h3 style={{ color: accent }}>Why a New Theory of Trade?</h3>
            <p>Classical models (Modules 1–2) explain trade through <strong>differences</strong> in technology or resources. But most trade occurs between <em>similar</em> rich countries and is <strong>intra-industry</strong>. Krugman (1980) solved this with increasing returns, monopolistic competition, and a <strong>love of variety</strong>.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', margin: '16px 0' }}>
              <div style={meansBox}><strong>📈 Increasing Returns:</strong><br />Production costs fall as output rises — specialization is efficient even without differences.</div>
              <div style={meansBox}><strong>❤️ Love of Variety:</strong><br />Consumers value diversity; access to foreign varieties raises welfare directly.</div>
              <div style={meansBox}><strong>🔄 Intra-Industry Trade:</strong><br />Germany exports BMWs to Japan while Japan exports Toyotas to Germany.</div>
            </div>
            <TutorTip tip="Krugman's insight: trade doesn't need comparative advantage. Two identical countries still gain from trade by specializing in different varieties and accessing each other's products." />
          </div>

          <div className="lesson-card" id="m4-lesson1">
            <h3>Lesson 1: The Krugman Setup</h3>
            <p>One sector with differentiated goods. Each firm produces a unique variety under economies of scale. Technology: <strong>labour = F + c·q</strong> (fixed cost + variable cost). Free entry drives profit to zero.</p>
            <div style={formulaBox}>
              <strong>U = [Sum_i  q_i^((sigma-1)/sigma)]^(sigma/(sigma-1))</strong><br />
              sigma &gt; 1: elasticity of substitution between varieties.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))', gap: '10px', margin: '12px 0' }}>
              {[['sigma', 'Substitutability between varieties'], ['F', 'Fixed overhead — generates increasing returns'], ['c', 'Marginal cost per unit'], ['n', 'Number of varieties = number of firms'], ['L', 'Labour supply (economy size)']].map(([s, d]) => (
                <div key={s} style={meansBox}><strong>{s}</strong><br /><span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{d}</span></div>
              ))}
            </div>
          </div>

          <div className="lesson-card" id="m4-lesson2">
            <h3>Lesson 2: Equilibrium — Markup Pricing and Free Entry</h3>
            <div style={formulaBox}>
              <strong>p* = (sigma / (sigma-1)) x w·c</strong> (markup pricing)<br />
              <strong>n  = L / (sigma x F)</strong> (free entry: zero profit)<br />
              <strong>q  = (sigma-1) x F / c</strong> (per-firm output)
            </div>
            <p>Larger economies have <strong>more firms</strong> — not bigger firms. Trade is like expanding the market — consumers access more varieties.</p>
            <TutorTip tip="In Krugman's world, trade is like making the market bigger. If Home and Foreign each have n firms, trade gives consumers access to 2n varieties — a welfare gain even without any price changes." />
          </div>

          <div className="lesson-card" id="m4-lesson3">
            <h3>Lesson 3: Gains from Trade — Love of Variety</h3>
            <div style={formulaBox}>
              <strong>Welfare Gain = (n_World / n_H)^(1/(sigma-1)) - 1</strong>
            </div>
            <p>Larger when sigma is small (varieties are poor substitutes — each variety is uniquely valued) and when the foreign market is large.</p>

            <div style={card}>
              <h4>Interactive Lab: Welfare Gain from Variety</h4>
              <div style={beforeTouchBox}><strong>Before moving sliders:</strong> See how the gain depends on market sizes and sigma. Try making one country much larger.</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '20px', marginTop: '12px' }}>
                <div>
                  <Slider label="Home Labour (L)" value={krugL} setter={setKrugL} min={50} max={500} step={10} />
                  <Slider label="Foreign Labour (L*)" value={krugLStar} setter={setKrugLStar} min={50} max={500} step={10} />
                  <Slider label="Elasticity sigma" value={krugSigma} setter={setKrugSigma} min={1.5} max={10} step={0.5} />
                  <Slider label="Fixed Cost F" value={krugF} setter={setKrugF} min={1} max={20} step={1} />
                  <button onClick={resetKrug} className="tab-btn" style={{ marginTop: '4px' }}>Reset</button>
                </div>
                <div>
                  <div style={resultBox}>
                    <p>Autarky varieties (n_H): <strong>{krugNH.toFixed(2)}</strong></p>
                    <p>Trade varieties (n_World): <strong>{krugNWorld.toFixed(2)}</strong></p>
                    <p>Welfare gain from trade: <span style={{ fontSize: '1.4rem', color: '#10b981', fontWeight: 700 }}>{krugGainPct}%</span></p>
                  </div>
                  <div ref={krugWelfareRef} style={{ height: '280px', width: '100%', marginTop: '16px' }} />
                </div>
              </div>
              <div style={tryThisBox}><strong>Try this:</strong> Raise sigma to 8. The welfare gain falls sharply — when varieties are nearly perfect substitutes, extra variety doesn't matter much. Lower sigma (say 2) makes each variety precious.</div>
            </div>
          </div>

          <div className="lesson-card" id="m4-lesson4">
            <h3>Lesson 4: The Home Market Effect</h3>
            <p>One of Krugman's most famous predictions: <strong>large countries produce more than proportionally</strong> in scale-intensive sectors.</p>
            <div style={formulaBox}>
              <strong>Production share_H = s_H + (s_H - 0.5) x sigma/(sigma-1)</strong><br />
              s_H = Home share of world spending.
            </div>
            <div style={card}>
              <h4>Interactive Lab: Home Market Effect</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '20px' }}>
                <div>
                  <Slider label="Home spending share (s_H)" value={hmeSH} setter={setHmeSH} min={0.1} max={0.9} step={0.01} />
                  <Slider label="Elasticity sigma" value={hmeSigmaHME} setter={setHmeSigmaHME} min={1.5} max={10} step={0.5} />
                  <div style={resultBox}>
                    <p>Home spending share: <strong>{(hmeSH * 100).toFixed(1)}%</strong></p>
                    <p>Home production share: <strong>{(Number(hmeShareH) * 100).toFixed(1)}%</strong></p>
                    <p>Amplification: <strong>{hmeSH > 0 ? (Number(hmeShareH) / hmeSH).toFixed(2) : 'N/A'}x</strong></p>
                  </div>
                </div>
                <div>
                  <div ref={krugHomeMarketRef} style={{ height: '320px', width: '100%' }} />
                  <div style={noticeBox}><strong>Notice:</strong> The HME curve lies above the 45-degree line — production share exceeds spending share whenever s_H &gt; 0.5.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════ SUB 4.2: DIXIT-STIGLITZ ════════════════════ */}
      {moduleTab === 'sub2' && (
        <div>
          <div className="lesson-card" style={{ borderLeft: `4px solid ${accent}` }}>
            <h3 style={{ color: accent }}>The Formal Engine: Dixit-Stiglitz (1977)</h3>
            <p>Krugman's model is built on the <strong>Dixit-Stiglitz (DS) framework</strong> — a tractable model of monopolistic competition that generates clean closed-form solutions. It is the workhorse of New Trade Theory and New Economic Geography.</p>
            <TutorTip tip="Dixit-Stiglitz (1977) was written as a microeconomics paper. Krugman (1980) realized it was the perfect engine for a new trade theory, giving monopolistic competition with love-of-variety utility and constant elasticity of demand." />
          </div>

          <div className="lesson-card" id="m4-ds1">
            <h3>Lesson 1: CES Utility and Optimal Demand</h3>
            <div style={formulaBox}>
              <strong>U = [integral q(omega)^((sigma-1)/sigma) d_omega]^(sigma/(sigma-1))</strong><br />
              sigma &gt; 1: elasticity of substitution
            </div>
            <p>Maximising subject to budget gives <strong>constant-elasticity demand</strong>:</p>
            <div style={formulaBox}>
              <strong>q(omega) = p(omega)^(-sigma) x (E / P^(1-sigma))</strong>
            </div>
            <p>Each firm faces a constant price elasticity of demand equal to sigma.</p>
          </div>

          <div className="lesson-card" id="m4-ds2">
            <h3>Lesson 2: Markup Pricing</h3>
            <div style={formulaBox}>
              <strong>p* = (sigma / (sigma-1)) x w/a</strong><br />
              Markup = p* - MC = MC / (sigma - 1)
            </div>
            <ul style={{ lineHeight: 2, paddingLeft: '20px' }}>
              <li>Markup is <strong>constant</strong>, depends only on sigma</li>
              <li><strong>Higher sigma</strong> (more substitutable) → lower markup</li>
              <li><strong>Lower sigma</strong> (unique varieties) → higher markup</li>
            </ul>

            <div style={card}>
              <h4>Interactive Lab: Markup Calculator</h4>
              <div style={beforeTouchBox}><strong>Before moving sliders:</strong> At sigma=2, markup = 100% of MC. At sigma=10, markup = only 11%.</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '20px', marginTop: '12px' }}>
                <div>
                  <Slider label="Elasticity sigma" value={dsSigma} setter={setDsSigma} min={1.5} max={10} step={0.5} />
                  <Slider label="Wage w" value={dsW} setter={setDsW} min={5} max={30} step={1} />
                  <Slider label="Productivity a" value={dsA} setter={setDsA} min={0.5} max={5} step={0.5} />
                  <Slider label="Fixed Cost F" value={dsF} setter={setDsF} min={1} max={20} step={1} />
                  <Slider label="Labour Supply L" value={dsL} setter={setDsL} min={50} max={500} step={10} />
                  <button onClick={resetDS} className="tab-btn" style={{ marginTop: '8px' }}>Reset</button>
                </div>
                <div>
                  <div style={resultBox}>
                    <p>Marginal cost MC = w/a: <strong>{dsMC.toFixed(2)}</strong></p>
                    <p>Optimal price p*: <strong>{dsP.toFixed(2)}</strong></p>
                    <p>Markup (p* - MC): <strong>{dsMarkup}</strong> ({((Number(dsMarkup) / dsMC) * 100).toFixed(1)}% of MC)</p>
                    <p>Equilibrium # firms n: <strong>{dsN}</strong></p>
                    <p>Profit per firm: <strong>0</strong> (free entry)</p>
                  </div>
                  <div ref={dsMarkupRef} style={{ height: '260px', width: '100%', marginTop: '16px' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="lesson-card" id="m4-ds3">
            <h3>Lesson 3: Free Entry and Number of Firms</h3>
            <div style={formulaBox}>
              <strong>n = L / (sigma x F)</strong>
            </div>
            <p>Larger markets → more firms, not larger firms. Average firm size is independent of L — a key prediction of monopolistic competition models.</p>
            <div ref={dsFirmCountRef} style={{ height: '300px', width: '100%', margin: '16px 0' }} />
            <div style={noticeBox}><strong>Key insight:</strong> Varieties scale linearly with market size. Bigger markets create more variety — the source of gains from economic integration.</div>
          </div>
        </div>
      )}

      {/* ════════════════════ SUB 4.3: MELITZ ════════════════════ */}
      {moduleTab === 'sub3' && (
        <div>
          <div className="lesson-card" style={{ borderLeft: `4px solid ${accent}` }}>
            <h3 style={{ color: accent }}>Firm Heterogeneity: Melitz (2003)</h3>
            <p>Krugman assumed all firms are <strong>identical</strong>. In reality firms vary enormously in productivity — and <strong>only the most productive firms export</strong>. Melitz (2003) introduced firm heterogeneity, generating predictions about <em>who trades and who gains</em>.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', margin: '16px 0' }}>
              <div style={meansBox}><strong>Productivity draws:</strong><br />Firms draw productivity phi from G(phi) upon entry.</div>
              <div style={meansBox}><strong>Fixed export costs:</strong><br />Exporting requires a sunk fixed cost f_x (learning regulations, building distribution).</div>
              <div style={meansBox}><strong>Selection:</strong><br />Only firms above cutoff phi*_x can profitably export. Others serve only domestic.</div>
            </div>
            <TutorTip tip="Melitz's key insight: trade liberalisation forces low-productivity firms to exit while expanding the most productive exporters. Average productivity rises — a new source of welfare gain beyond Krugman's love-of-variety gains." />
          </div>

          <div className="lesson-card" id="m4-mel1">
            <h3>Lesson 1: Productivity Cutoffs</h3>
            <ul style={{ lineHeight: 2.2, paddingLeft: '20px' }}>
              <li>phi &lt; phi*_d: <strong>Exit</strong></li>
              <li>phi*_d &le; phi &lt; phi*_x: <strong>Domestic only</strong></li>
              <li>phi &ge; phi*_x: <strong>Produce and export</strong></li>
            </ul>
            <div style={formulaBox}>
              <strong>phi*_x = tau x (f_x / f_d)^(1/(sigma-1)) x phi*_d</strong>
            </div>
            <p>Since tau &gt; 1 and f_x &gt; f_d, we always have phi*_x &gt; phi*_d — <strong>exporters are more productive</strong> than non-exporters.</p>
          </div>

          <div className="lesson-card" id="m4-mel2">
            <h3>Lesson 2: Interactive Threshold Lab</h3>
            <div style={card}>
              <div style={beforeTouchBox}><strong>Watch the cutoffs:</strong> phi*_d stays fixed (normalised = 1). phi*_x moves with trade costs and cost ratios.</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '20px', marginTop: '12px' }}>
                <div>
                  <Slider label="Elasticity sigma" value={melSigma} setter={setMelSigma} min={1.5} max={8} step={0.5} />
                  <Slider label="Domestic fixed cost f_d" value={melFd} setter={setMelFd} min={1} max={20} step={1} />
                  <Slider label="Export fixed cost f_x" value={melFx} setter={setMelFx} min={2} max={50} step={1} />
                  <Slider label="Trade cost tau" value={melTau} setter={setMelTau} min={1.01} max={2.5} step={0.05} />
                  <button onClick={resetMelitz} className="tab-btn" style={{ marginTop: '8px' }}>Reset</button>
                  <div style={resultBox}>
                    <p>Domestic cutoff phi*_d: <strong>1.00</strong> (normalised)</p>
                    <p>Export cutoff phi*_x: <strong>{melPhiX.toFixed(3)}</strong></p>
                    <p>Exporters are <strong>{melPhiX.toFixed(1)}x</strong> more productive than minimum firms</p>
                  </div>
                </div>
                <div>
                  <div ref={melitzThreshRef} style={{ height: '280px', width: '100%' }} />
                  <div ref={melitzDistRef} style={{ height: '260px', width: '100%', marginTop: '16px' }} />
                </div>
              </div>
              <div style={tryThisBox}><strong>Try this:</strong> Raise tau (trade cost) from 1.4 to 2.2. phi*_x rises sharply — fewer firms can profitably export. This shows how trade liberalisation (lower tau) induces firm selection.</div>
            </div>
          </div>

          <div className="lesson-card" id="m4-mel3">
            <h3>Lesson 3: Aggregate Productivity and Welfare</h3>
            <p>Trade liberalisation raises <strong>average industry productivity</strong>. The most productive exporters expand; least productive firms exit. Average productivity rises — a <em>productivity selection effect</em> on top of variety gains.</p>
            <div style={formulaBox}>
              <strong>Aggregate welfare gain = Variety gains + Productivity selection gains</strong>
            </div>
            <div style={noticeBox}><strong>Empirical prediction:</strong> Exporters are larger, more productive, pay higher wages, and employ more workers than non-exporters — robustly confirmed in data from all countries.</div>
          </div>
        </div>
      )}

      {/* ════════════════════ SUB 4.4: MELITZ-PARETO ════════════════════ */}
      {moduleTab === 'sub4' && (
        <div>
          <div className="lesson-card" style={{ borderLeft: `4px solid ${accent}` }}>
            <h3 style={{ color: accent }}>Tractable Melitz: Pareto Productivity</h3>
            <p>General Melitz has no closed-form solution for trade flows. But with a <strong>Pareto productivity distribution</strong>, everything collapses to a gravity equation — connecting New Trade Theory directly to Module 3's empirical framework.</p>
            <TutorTip tip="Chaney (2008) showed that Pareto-distributed productivity in the Melitz framework generates a gravity equation with the Pareto shape k as the trade elasticity. This bridges the micro theory of firms to the macro empirics of gravity." />
          </div>

          <div className="lesson-card" id="m4-par1">
            <h3>Lesson 1: Pareto Distribution of Productivity</h3>
            <div style={formulaBox}>
              <strong>G(phi) = 1 - (phi_min / phi)^k</strong>, &nbsp; phi &ge; phi_min<br />
              k &gt; 0: shape parameter (higher k = less dispersion)
            </div>
            <p>Required shape condition for finite average productivity:</p>
            <div style={formulaBox}><strong>k &gt; sigma - 1</strong></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))', gap: '10px', margin: '12px 0' }}>
              {[['k', 'Pareto shape — governs firm productivity dispersion'], ['sigma', 'CES elasticity of substitution'], ['k/(sigma-1)', 'Key ratio: governs selection intensity'], ['tau', 'Iceberg trade cost'], ['f_x/f_d', 'Ratio of export to domestic fixed costs']].map(([s, d]) => (
                <div key={s} style={meansBox}><strong>{s}</strong><br /><span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{d}</span></div>
              ))}
            </div>
          </div>

          <div className="lesson-card" id="m4-par2">
            <h3>Lesson 2: Gravity from Firm Heterogeneity</h3>
            <div style={formulaBox}>
              <strong>chi_x = tau^(-k) x (f_x/f_d)^(1 - k/(sigma-1))</strong><br />
              <strong>X_ij proportional to Y_i x Y_j / tau^k</strong>
            </div>
            <p>The Pareto shape parameter <strong>k</strong> acts as the trade elasticity — replacing sigma from the Armington gravity of Module 3. Here k also governs the extent of firm selection.</p>

            <div style={card}>
              <h4>Interactive Lab: Melitz-Pareto Simulator</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '20px' }}>
                <div>
                  <Slider label="Pareto shape k" value={parK} setter={setParK} min={2} max={8} step={0.5} />
                  <Slider label="Elasticity sigma" value={parSigma} setter={setParSigma} min={1.5} max={7} step={0.5} />
                  <Slider label="Domestic fixed cost f_d" value={parFd} setter={setParFd} min={1} max={20} step={1} />
                  <Slider label="Export fixed cost f_x" value={parFx} setter={setParFx} min={2} max={50} step={1} />
                  <Slider label="Trade cost tau" value={parTau} setter={setParTau} min={1.01} max={3.0} step={0.05} />
                  <button onClick={resetPareto} className="tab-btn" style={{ marginTop: '8px' }}>Reset</button>
                </div>
                <div>
                  <div style={resultBox}>
                    <p>Shape condition (k &gt; sigma-1): <strong style={{ color: parCondition ? '#10b981' : '#ef4444' }}>{parCondition ? `Met (k=${parK} > ${parSigma - 1})` : `Not met (k=${parK} <= ${parSigma - 1})`}</strong></p>
                    <p>Export fraction chi_x: <strong>{parExportFrac}</strong></p>
                    <p>Trade elasticity w.r.t. tau: <strong>-{parK.toFixed(1)}</strong></p>
                    <p>Gains from trade (%): <strong>{parGFT}</strong></p>
                  </div>
                  <div ref={paretoRef} style={{ height: '300px', width: '100%', marginTop: '16px' }} />
                  <div style={noticeBox}><strong>Notice:</strong> Higher trade cost tau dramatically reduces the export fraction. Higher k (less dispersion) amplifies this — trade liberalisation has larger selection effects with more dispersed firms.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lesson-card" id="m4-par3">
            <h3>Lesson 3: Connecting Modules 3 and 4</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', margin: '12px 0' }}>
              <div style={meansBox}><strong>Armington (Module 3)</strong><br />Trade elasticity = sigma<br />All firms are symmetric<br />Domestic share pi_nn drives gains</div>
              <div style={meansBox}><strong>Melitz-Pareto (Module 4)</strong><br />Trade elasticity = k (Pareto shape)<br />Firms differ in productivity phi<br />Selection + variety both drive gains</div>
              <div style={meansBox}><strong>Shared prediction</strong><br />Both generate gravity: X_ij proportional to Y_i Y_j / d_ij^theta<br />Different structural interpretations of theta</div>
            </div>
            <TutorTip tip="The gravity equation is remarkably robust — it arises from Armington, Krugman, and Melitz microfoundations. This is why gravity is the empirical workhorse of trade economics, connecting theory in Modules 3 and 4 to data." />
          </div>
        </div>
      )}

      {/* ════════════════════ QUIZ ════════════════════ */}
      {moduleTab === 'quiz' && <Module4Quiz />}

    </div>
  );
}
