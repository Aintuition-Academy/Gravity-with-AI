import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

export default function CPFGraph({ country, L, a1, a2, worldPrice, theme }) {
  const plotRef = useRef(null);

  const maxMfgPPF = L / a1;
  const maxAgriPPF = L / a2;
  const oppCost = a1 / a2;

  let maxMfgCPF = 0;
  let maxAgriCPF = 0;
  let specialization = '';

  if (worldPrice > oppCost) {
    // Specializes in Manufacturing
    specialization = 'Manufacturing';
    maxMfgCPF = maxMfgPPF;
    maxAgriCPF = maxMfgPPF * worldPrice;
  } else if (worldPrice < oppCost) {
    // Specializes in Agriculture
    specialization = 'Agriculture';
    maxMfgCPF = maxAgriPPF / worldPrice;
    maxAgriCPF = maxAgriPPF;
  } else {
    // Indifferent / Autarky equivalence
    specialization = 'Both / Indifferent';
    maxMfgCPF = maxMfgPPF;
    maxAgriCPF = maxAgriPPF;
  }

  useEffect(() => {
    if (!plotRef.current) return;

    const isDark = theme === 'dark';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const gridColor = isDark ? '#1e293b' : '#e2e8f0';

    const tracePPF = {
      x: [0, maxMfgPPF],
      y: [maxAgriPPF, 0],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'PPF (Production Limit)',
      line: { color: '#ef4444', width: 2 }
    };

    const traceCPF = {
      x: [0, maxMfgCPF],
      y: [maxAgriCPF, 0],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'CPF (Consumption Limit)',
      line: { color: '#10b981', width: 3 }
    };

    // Specialization point
    const specX = worldPrice > oppCost ? maxMfgPPF : 0;
    const specY = worldPrice > oppCost ? 0 : maxAgriPPF;

    const traceSpecPoint = {
      x: [specX],
      y: [specY],
      type: 'scatter',
      mode: 'markers+text',
      name: 'Specialization Point',
      text: ['Production Point'],
      textposition: 'top right',
      textfont: { color: textColor, size: 9 },
      marker: { size: 10, color: '#f59e0b', symbol: 'star' }
    };

    const layout = {
      title: {
        text: `<b>${country} PPF vs CPF</b>`,
        font: { color: textColor, family: 'Poppins', size: 14 }
      },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 45, r: 25, t: 40, b: 45 },
      showlegend: true,
      legend: {
        x: 0.45,
        y: 0.95,
        font: { color: textColor, size: 9 }
      },
      xaxis: {
        title: 'Manufacturing (Q₁)',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor, size: 9 },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, Math.max(maxMfgPPF, maxMfgCPF) * 1.25]
      },
      yaxis: {
        title: 'Agriculture (Q₂)',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor, size: 9 },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, Math.max(maxAgriPPF, maxAgriCPF) * 1.25]
      }
    };

    const config = { responsive: true, displayModeBar: false };

    Plotly.newPlot(plotRef.current, [tracePPF, traceCPF, traceSpecPoint], layout, config);
  }, [country, L, a1, a2, worldPrice, theme, maxMfgPPF, maxAgriPPF, maxMfgCPF, maxAgriCPF, oppCost]);

  const gainAgri = Math.max(0, maxAgriCPF - maxAgriPPF);
  const gainMfg = Math.max(0, maxMfgCPF - maxMfgPPF);

  return (
    <div style={{ border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', padding: '16px', backgroundColor: 'rgba(var(--bg-color), 0.15)' }}>
      <div className="plotly-container" ref={plotRef} style={{ height: '260px', minHeight: '260px' }}></div>
      <div style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <li>• Specialized Sector: <strong>{specialization}</strong></li>
          <li>• Opp. Cost Slope (PPF): <strong>-{oppCost.toFixed(2)}</strong></li>
          <li>• Trade Price Slope (CPF): <strong>-{worldPrice.toFixed(2)}</strong></li>
          {worldPrice > oppCost && (
            <li>• Trade expansion: <strong style={{ color: 'var(--accent-success)' }}>+{gainAgri.toFixed(1)} Agri</strong> (at max Mfg production)</li>
          )}
          {worldPrice < oppCost && (
            <li>• Trade expansion: <strong style={{ color: 'var(--accent-success)' }}>+{gainMfg.toFixed(1)} Mfg</strong> (at max Agri production)</li>
          )}
          {worldPrice === oppCost && (
            <li>• No trade gains (CPF equals PPF)</li>
          )}
        </ul>
      </div>
    </div>
  );
}
