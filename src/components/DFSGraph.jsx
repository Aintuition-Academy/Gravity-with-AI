import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import TutorTip from './TutorTip';

export default function DFSGraph({ homeL, foreignL, homeBase, homeSlope, foreignBase, foreignSlope, theme }) {
  const plotRef = useRef(null);

  // Solves for z0 where A(z) = B(z)
  // A(z) = (foreignBase + foreignSlope * z) / (homeBase + homeSlope * z)
  // B(z) = (foreignL / homeL) * (z / (1 - z))
  const solveEquilibrium = () => {
    let low = 0.0001;
    let high = 0.9999;
    let z0 = 0.5;
    
    const A = (z) => (foreignBase + foreignSlope * z) / (homeBase + homeSlope * z);
    const B = (z) => (foreignL / homeL) * (z / (1 - z));

    for (let i = 0; i < 60; i++) {
      z0 = (low + high) / 2;
      if (A(z0) > B(z0)) {
        low = z0; // Since A is decreasing and B is increasing, if A > B, z needs to be larger to intersect
      } else {
        high = z0;
      }
    }
    const wage = A(z0);
    return { z0, wage };
  };

  const { z0, wage } = solveEquilibrium();

  useEffect(() => {
    if (!plotRef.current) return;

    const isDark = theme === 'dark';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const gridColor = isDark ? '#1e293b' : '#e2e8f0';

    // Generate curve points
    const zPoints = [];
    const aPoints = [];
    const bPoints = [];

    for (let i = 1; i < 100; i++) {
      const z = i / 100;
      zPoints.push(z);
      aPoints.push((foreignBase + foreignSlope * z) / (homeBase + homeSlope * z));
      bPoints.push((foreignL / homeL) * (z / (1 - z)));
    }

    const traceA = {
      x: zPoints,
      y: aPoints,
      type: 'scatter',
      mode: 'lines',
      name: 'A(z) = a*(z)/a(z) (Supply)',
      line: { color: '#3b82f6', width: 3 }
    };

    const traceB = {
      x: zPoints,
      y: bPoints,
      type: 'scatter',
      mode: 'lines',
      name: 'B(z) = (L*/L)*(z/(1-z)) (Demand)',
      line: { color: '#ef4444', width: 3 }
    };

    const traceEquil = {
      x: [z0],
      y: [wage],
      type: 'scatter',
      mode: 'markers',
      name: 'Equilibrium (z₀, ω)',
      marker: { size: 12, color: '#f59e0b', symbol: 'circle' }
    };

    const layout = {
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 50, r: 20, t: 30, b: 50 },
      showlegend: true,
      legend: {
        x: 0.5,
        y: 0.95,
        font: { color: textColor }
      },
      xaxis: {
        title: 'Goods Index z (from 0 to 1)',
        titlefont: { color: textColor, size: 12 },
        tickfont: { color: textColor },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, 1]
      },
      yaxis: {
        title: 'Relative Wage ω = w / w*',
        titlefont: { color: textColor, size: 12 },
        tickfont: { color: textColor },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, Math.max(wage * 2.2, 5)]
      },
      annotations: [
        {
          x: z0,
          y: wage,
          text: `z₀ = ${z0.toFixed(3)}<br>ω = ${wage.toFixed(3)}`,
          showarrow: true,
          arrowhead: 2,
          arrowcolor: '#f59e0b',
          font: { color: '#f59e0b', size: 11 },
          ax: 40,
          ay: -40
        }
      ]
    };

    const config = { responsive: true, displayModeBar: false };

    Plotly.newPlot(plotRef.current, [traceA, traceB, traceEquil], layout, config);
  }, [homeL, foreignL, homeBase, homeSlope, foreignBase, foreignSlope, theme, z0, wage]);

  return (
    <div>
      <div className="lab-explanation">
        <h4 style={{ color: 'var(--accent-primary)' }}>General Equilibrium in the DFS Continuum</h4>
        <p style={{ marginTop: '8px' }}>
          <strong>A(z)</strong> represents the relative labor productivity. Since goods are ordered by Home's comparative advantage, A(z) decreases as z increases.
        </p>
        <p>
          <strong>B(z)</strong> is derived from Cobb-Douglas expenditure shares and labor market clearing. As z increases, B(z) increases because Home produces a wider range of goods, which increases world demand for Home labor and bids up the relative wage.
        </p>
      </div>

      <div style={{ padding: '16px', background: 'rgba(var(--bg-color), 0.3)', border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', margin: '20px 0' }}>
        <h5 style={{ color: 'var(--accent-warning)', marginBottom: '8px' }}>Equilibrium Output</h5>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li>• Marginal Good (z₀): <strong>{z0.toFixed(3)}</strong></li>
          <li>• Equilibrium Relative Wage (ω = w/w*): <strong>{wage.toFixed(3)}</strong></li>
          <li>• Home Produces: Goods range <strong>[0, {z0.toFixed(3)}]</strong> (where production cost is lower at Home)</li>
          <li>• Foreign Produces: Goods range <strong>({z0.toFixed(3)}, 1]</strong> (where production cost is lower in Foreign)</li>
        </ul>
      </div>

      <div className="plotly-container" ref={plotRef}></div>

      <TutorTip tip="z₀ is the border between goods made by Home and goods made by Foreign. At z₀, the relative cost of production in both countries is exactly equal to the relative wage!" />
    </div>
  );
}
