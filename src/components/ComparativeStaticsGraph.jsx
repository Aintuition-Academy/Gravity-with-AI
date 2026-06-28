import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import TutorTip from './TutorTip';

export default function ComparativeStaticsGraph({ homeL, foreignL, homeBase, homeSlope, foreignBase, foreignSlope, theme }) {
  const plotRef = useRef(null);

  // Baseline L* is fixed at 200 for comparative statics reference
  const baselineLStar = 200;

  const solveEquilibrium = (targetLStar) => {
    let low = 0.0001;
    let high = 0.9999;
    let z0 = 0.5;
    
    const A = (z) => (foreignBase + foreignSlope * z) / (homeBase + homeSlope * z);
    const B = (z) => (targetLStar / homeL) * (z / (1 - z));

    for (let i = 0; i < 60; i++) {
      z0 = (low + high) / 2;
      if (A(z0) > B(z0)) {
        low = z0;
      } else {
        high = z0;
      }
    }
    const wage = A(z0);
    return { z0, wage };
  };

  const oldEquil = solveEquilibrium(baselineLStar);
  const newEquil = solveEquilibrium(foreignL);

  useEffect(() => {
    if (!plotRef.current) return;

    const isDark = theme === 'dark';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const gridColor = isDark ? '#1e293b' : '#e2e8f0';

    const zPoints = [];
    const aPoints = [];
    const bOldPoints = [];
    const bNewPoints = [];

    for (let i = 1; i < 100; i++) {
      const z = i / 100;
      zPoints.push(z);
      aPoints.push((foreignBase + foreignSlope * z) / (homeBase + homeSlope * z));
      bOldPoints.push((baselineLStar / homeL) * (z / (1 - z)));
      bNewPoints.push((foreignL / homeL) * (z / (1 - z)));
    }

    const traceA = {
      x: zPoints,
      y: aPoints,
      type: 'scatter',
      mode: 'lines',
      name: 'A(z) (Relative Productivity)',
      line: { color: '#3b82f6', width: 3 }
    };

    const traceBOld = {
      x: zPoints,
      y: bOldPoints,
      type: 'scatter',
      mode: 'lines',
      name: `Original B(z) (L* = ${baselineLStar})`,
      line: { color: 'rgba(239, 68, 68, 0.4)', width: 2, dash: 'dash' }
    };

    const traceBNew = {
      x: zPoints,
      y: bNewPoints,
      type: 'scatter',
      mode: 'lines',
      name: `New B(z) (L* = ${foreignL})`,
      line: { color: '#ef4444', width: 3 }
    };

    const traceOldEquil = {
      x: [oldEquil.z0],
      y: [oldEquil.wage],
      type: 'scatter',
      mode: 'markers',
      name: 'Old Equilibrium',
      marker: { size: 10, color: '#94a3b8', symbol: 'triangle-up' }
    };

    const traceNewEquil = {
      x: [newEquil.z0],
      y: [newEquil.wage],
      type: 'scatter',
      mode: 'markers',
      name: 'New Equilibrium',
      marker: { size: 12, color: '#f59e0b', symbol: 'circle' }
    };

    const layout = {
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 50, r: 20, t: 30, b: 50 },
      showlegend: true,
      legend: {
        x: 0.05,
        y: 0.95,
        font: { color: textColor, size: 10 }
      },
      xaxis: {
        title: 'Goods Index z',
        titlefont: { color: textColor, size: 12 },
        tickfont: { color: textColor },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, 1]
      },
      yaxis: {
        title: 'Relative Wage ω',
        titlefont: { color: textColor, size: 12 },
        tickfont: { color: textColor },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, Math.max(oldEquil.wage * 2.2, newEquil.wage * 2.2, 5)]
      }
    };

    const config = { responsive: true, displayModeBar: false };

    Plotly.newPlot(plotRef.current, [traceA, traceBOld, traceBNew, traceOldEquil, traceNewEquil], layout, config);
  }, [homeL, foreignL, homeBase, homeSlope, foreignBase, foreignSlope, theme, oldEquil, newEquil]);

  return (
    <div>
      <div className="lab-explanation">
        <h4 style={{ color: 'var(--accent-primary)' }}>Comparative Statics: Population Shifts</h4>
        <p style={{ marginTop: '8px' }}>
          When the Foreign population (L*) increases, the relative supply of Foreign labor rises. 
          This shifts the demand curve <strong>B(z) upward</strong>.
        </p>
      </div>

      <div style={{ padding: '16px', background: 'rgba(var(--bg-color), 0.3)', border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', margin: '20px 0' }}>
        <h5 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>Comparison Table</h5>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--card-border)', textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '6px 0' }}>Metric</th>
              <th>Original (L* = {baselineLStar})</th>
              <th>New (L* = {foreignL})</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
              <td style={{ padding: '8px 0', fontWeight: '500' }}>Marginal Good (z₀)</td>
              <td>{oldEquil.z0.toFixed(3)}</td>
              <td>{newEquil.z0.toFixed(3)}</td>
              <td style={{ color: newEquil.z0 < oldEquil.z0 ? 'var(--accent-error)' : 'var(--accent-success)' }}>
                {(newEquil.z0 - oldEquil.z0).toFixed(3)} ({(newEquil.z0 < oldEquil.z0 ? 'Contraction' : 'Expansion')})
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: '500' }}>Relative Wage (ω)</td>
              <td>{oldEquil.wage.toFixed(3)}</td>
              <td>{newEquil.wage.toFixed(3)}</td>
              <td style={{ color: newEquil.wage > oldEquil.wage ? 'var(--accent-success)' : 'var(--accent-error)' }}>
                +{(newEquil.wage - oldEquil.wage).toFixed(3)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="plotly-container" ref={plotRef}></div>

      <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(59, 130, 246, 0.06)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: 'var(--border-radius-md)' }}>
        <h5 style={{ color: 'var(--accent-primary)', marginBottom: '4px' }}>Intuitive Economic Explanation</h5>
        <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-secondary)' }}>
          An increase in Foreign population expands the relative supply of Foreign labor, lowering their relative wages. 
          To restore balance, Home's relative wage (ω) rises. Because Home labor is now relatively more expensive, 
          Foreign takes over the production of marginal goods, causing Home's production range to contract from 
          <strong>[0, {oldEquil.z0.toFixed(3)}]</strong> to <strong>[0, {newEquil.z0.toFixed(3)}]</strong>.
        </p>
      </div>

      <TutorTip tip="When Foreign population increases, B(z) shifts up. This bids up Home's relative wage and reduces the range of goods produced by Home (z₀ decreases), but increases Home's consumer purchasing power!" />
    </div>
  );
}
