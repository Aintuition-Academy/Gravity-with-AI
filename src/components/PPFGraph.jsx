import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

export default function PPFGraph({ country, L, a1, a2, theme }) {
  const plotRef = useRef(null);

  const maxMfg = L / a1;
  const maxAgri = L / a2;
  const oppCostMfg = a1 / a2;

  useEffect(() => {
    if (!plotRef.current) return;

    const isDark = theme === 'dark';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const gridColor = isDark ? '#1e293b' : '#e2e8f0';

    const tracePPF = {
      x: [0, maxMfg],
      y: [maxAgri, 0],
      type: 'scatter',
      mode: 'lines+markers+text',
      name: `${country} PPF`,
      line: { 
        color: country === 'Home' ? '#3b82f6' : '#8b5cf6', 
        width: 3 
      },
      marker: { size: 8 },
      text: [
        `(${maxAgri.toFixed(1)} Agri)`,
        `(${maxMfg.toFixed(1)} Mfg)`
      ],
      textposition: ['top right', 'bottom left'],
      textfont: { color: textColor, size: 10 }
    };

    const layout = {
      title: {
        text: `<b>${country} PPF</b>`,
        font: { color: textColor, family: 'Poppins', size: 14 }
      },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 45, r: 25, t: 40, b: 45 },
      showlegend: false,
      xaxis: {
        title: 'Manufacturing (Q₁)',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor, size: 9 },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, maxMfg * 1.25]
      },
      yaxis: {
        title: 'Agriculture (Q₂)',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor, size: 9 },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, maxAgri * 1.25]
      }
    };

    const config = { responsive: true, displayModeBar: false };

    Plotly.newPlot(plotRef.current, [tracePPF], layout, config);
  }, [country, L, a1, a2, theme, maxMfg, maxAgri]);

  return (
    <div style={{ border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', padding: '16px', backgroundColor: 'rgba(var(--bg-color), 0.15)' }}>
      <div className="plotly-container" ref={plotRef} style={{ height: '260px', minHeight: '260px' }}></div>
      <div style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <li>• Labor Endowment (L): <strong>{L}</strong> workers</li>
          <li>• Unit Labor Requirements: <strong>a₁ = {a1.toFixed(1)}</strong>, <strong>a₂ = {a2.toFixed(1)}</strong></li>
          <li>• Max Production: <strong>{maxMfg.toFixed(1)} Mfg</strong> or <strong>{maxAgri.toFixed(1)} Agri</strong></li>
          <li>• Opp. Cost of Mfg (a₁/a₂): <strong>{oppCostMfg.toFixed(2)}</strong> units of Agriculture</li>
          <li>• Slope of PPF: <strong>-{oppCostMfg.toFixed(2)}</strong></li>
        </ul>
      </div>
    </div>
  );
}
