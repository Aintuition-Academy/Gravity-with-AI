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
      name: 'A(z) = a*(z)/a(z) (Supply-side relative productivity)',
      line: { color: '#3b82f6', width: 3 },
      hovertemplate: `<b>Relative Productivity A(z)</b><br>Good index z: %{x:.2f}<br>Ratio: %{y:.2f}<br>Produced by: Home (if z ≤ ${z0.toFixed(2)})<extra></extra>`
    };

    const traceB = {
      x: zPoints,
      y: bPoints,
      type: 'scatter',
      mode: 'lines',
      name: 'B(z) = (L*/L)*(z/(1-z)) (Demand-side labor market-clearing)',
      line: { color: '#ef4444', width: 3 },
      hovertemplate: `<b>Labor Market Curve B(z)</b><br>Good index z: %{x:.2f}<br>Wage ratio: %{y:.2f}<extra></extra>`
    };

    const traceEquil = {
      x: [z0],
      y: [wage],
      type: 'scatter',
      mode: 'markers',
      name: 'Equilibrium (z₀, ω)',
      marker: { size: 14, color: '#f59e0b', symbol: 'circle' },
      hovertemplate: `<b>Equilibrium Intersection</b><br>z₀ (marginal good): ${z0.toFixed(3)}<br>ω (rel. wage w/w*): ${wage.toFixed(3)}<extra></extra>`
    };

    const yMax = Math.max(wage * 2.2, 5);

    const layout = {
      title: {
        text: '<b>DFS Equilibrium: A(z) and B(z) Schedules</b>',
        font: { color: textColor, family: 'Poppins', size: 14 }
      },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 60, r: 40, t: 60, b: 60 },
      showlegend: true,
      legend: {
        x: 0.25,
        y: 1.15,
        orientation: 'h',
        font: { color: textColor, size: 8 }
      },
      xaxis: {
        title: 'Goods index z (ordered from z = 0 to z = 1)',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor, size: 9 },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, 1]
      },
      yaxis: {
        title: 'Relative Wage ω = w / w* (Home wage / Foreign wage)',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor, size: 9 },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, yMax]
      },
      shapes: [
        // Shaded region for Home production
        {
          type: 'rect',
          xref: 'x',
          yref: 'paper',
          x0: 0,
          x1: z0,
          y0: 0,
          y1: 1,
          fillcolor: 'rgba(59, 130, 246, 0.08)',
          line: { width: 0 }
        },
        // Shaded region for Foreign production
        {
          type: 'rect',
          xref: 'x',
          yref: 'paper',
          x0: z0,
          x1: 1,
          y0: 0,
          y1: 1,
          fillcolor: 'rgba(239, 68, 68, 0.08)',
          line: { width: 0 }
        }
      ],
      annotations: [
        {
          x: z0,
          y: wage,
          text: `Equilibrium: z₀ = ${z0.toFixed(3)}, ω = ${wage.toFixed(3)}`,
          showarrow: true,
          arrowhead: 2,
          arrowcolor: '#f59e0b',
          font: { color: '#f59e0b', size: 11, weight: 'bold' },
          bgcolor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          bordercolor: '#f59e0b',
          ax: 50,
          ay: -50
        },
        {
          xref: 'x',
          yref: 'paper',
          x: z0 / 2,
          y: 0.9,
          text: 'Home Produces [0, z₀]',
          showarrow: false,
          font: { color: '#3b82f6', size: 10, weight: 'bold' }
        },
        {
          xref: 'x',
          yref: 'paper',
          x: (z0 + 1) / 2,
          y: 0.9,
          text: 'Foreign Produces (z₀, 1]',
          showarrow: false,
          font: { color: '#ef4444', size: 10, weight: 'bold' }
        }
      ]
    };

    const config = { responsive: true, displayModeBar: false };

    Plotly.newPlot(plotRef.current, [traceA, traceB, traceEquil], layout, config);
  }, [homeL, foreignL, homeBase, homeSlope, foreignBase, foreignSlope, theme, z0, wage]);

  return (
    <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', padding: '16px' }}>
      <div className="lab-explanation">
        <h4 style={{ color: 'var(--accent-primary)' }}>DFS Equilibrium: A(z) and B(z)</h4>
        <p style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <strong>📊 What this graph shows:</strong> This graph plots the Dornbusch-Fischer-Samuelson continuum of goods model. 
          The blue curve <strong>A(z) = a*(z)/a(z)</strong> is the relative productivity schedule of Home (ordered from strongest comparative advantage on the left to weakest on the right). 
          The red curve <strong>B(z) = (L*/L) × z/(1-z)</strong> is the relative wage schedule derived from labor market-clearing.
        </p>
      </div>

      <div style={{ padding: '12px', background: 'rgba(var(--bg-color), 0.3)', border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', margin: '15px 0', fontSize: '0.85rem' }}>
        <h5 style={{ color: 'var(--accent-warning)', marginBottom: '6px' }}>Equilibrium Ranges</h5>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <li>• Marginal Good (z₀): <strong>{z0.toFixed(3)}</strong></li>
          <li>• Equilibrium Relative Wage (ω = w/w*): <strong>{wage.toFixed(3)}</strong> (Home worker earns {wage.toFixed(2)}x Foreign worker's wage)</li>
          <li>• Home Produces: Goods range <strong>[0, {z0.toFixed(3)}]</strong> (shaded blue)</li>
          <li>• Foreign Produces: Goods range <strong>({z0.toFixed(3)}, 1]</strong> (shaded red)</li>
        </ul>
      </div>

      <div className="plotly-container" ref={plotRef} style={{ height: '340px', minHeight: '340px' }}></div>

      <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        <strong>💡 What to notice:</strong> The intersection point pins down the equilibrium relative wage ω and the border good z₀. If Home increases its relative labor pool (L rises), the B(z) curve shifts down, reducing Home's relative wage but expanding its production range.
      </div>
    </div>
  );
}
