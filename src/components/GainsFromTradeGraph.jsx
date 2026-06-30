import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

export default function GainsFromTradeGraph({ L, a1, a2, worldPrice, theme }) {
  const plotRef = useRef(null);

  const maxMfgPPF = L / a1;
  const maxAgriPPF = L / a2;
  const oppCost = a1 / a2;

  // Let's assume a Cobb-Douglas utility where consumers spend 50% on Mfg and 50% on Agri
  // Autarky consumption = production
  const autarkyMfg = maxMfgPPF / 2;
  const autarkyAgri = maxAgriPPF / 2;

  // Free trade consumption
  let freeTradeMfg = 0;
  let freeTradeAgri = 0;
  let maxMfgCPF = 0;
  let maxAgriCPF = 0;

  if (worldPrice > oppCost) {
    // Specializes in Manufacturing (produces maxMfgPPF Mfg)
    maxMfgCPF = maxMfgPPF;
    maxAgriCPF = maxMfgPPF * worldPrice;
    // Consumes 50% of value
    freeTradeMfg = maxMfgCPF / 2;
    freeTradeAgri = (maxMfgCPF / 2) * worldPrice;
  } else {
    // Specializes in Agriculture (produces maxAgriPPF Agri)
    maxMfgCPF = maxAgriPPF / worldPrice;
    maxAgriCPF = maxAgriPPF;
    // Consumes 50% of value
    freeTradeMfg = (maxAgriCPF / 2) / worldPrice;
    freeTradeAgri = maxAgriCPF / 2;
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
      mode: 'lines',
      name: 'PPF (Production Frontier)',
      line: { color: '#ef4444', width: 2, dash: 'dot' }
    };

    const traceCPF = {
      x: [0, maxMfgCPF],
      y: [maxAgriCPF, 0],
      type: 'scatter',
      mode: 'lines',
      name: 'CPF (Consumption Frontier)',
      line: { color: '#10b981', width: 3 }
    };

    const traceA = {
      x: [autarkyMfg],
      y: [autarkyAgri],
      type: 'scatter',
      mode: 'markers+text',
      name: 'A: Autarky Bundle',
      text: ['A (Autarky)'],
      textposition: 'bottom left',
      textfont: { color: '#f59e0b', size: 11, weight: 'bold' },
      marker: { size: 12, color: '#f59e0b', symbol: 'circle' },
      hovertemplate: `<b>A: Autarky Bundle</b><br>` +
                     `Mfg consumption: %{x:.1f} units<br>` +
                     `Agri consumption: %{y:.1f} units<br>` +
                     `Welfare: WA = %{x:.1f} P₁ + %{y:.1f} P₂<br>` +
                     `<extra></extra>`
    };

    const traceB = {
      x: [freeTradeMfg],
      y: [freeTradeAgri],
      type: 'scatter',
      mode: 'markers+text',
      name: 'B: Free Trade Bundle',
      text: ['B (Free Trade)'],
      textposition: 'top right',
      textfont: { color: '#10b981', size: 12, weight: 'bold' },
      marker: { size: 14, color: '#10b981', symbol: 'diamond' },
      hovertemplate: `<b>B: Free Trade Bundle</b><br>` +
                     `Mfg consumption: %{x:.1f} units<br>` +
                     `Agri consumption: %{y:.1f} units<br>` +
                     `Welfare: WB = %{x:.1f} P₁ + %{y:.1f} P₂<br>` +
                     `Status: Higher welfare after trade<br>` +
                     `<extra></extra>`
    };

    const layout = {
      title: {
        text: '<b>Gains from Trade: Autarky vs Free Trade</b>',
        font: { color: textColor, family: 'Poppins', size: 14 }
      },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 60, r: 40, t: 55, b: 55 },
      showlegend: true,
      legend: {
        x: 0.3,
        y: 1.15,
        orientation: 'h',
        font: { color: textColor, size: 8 }
      },
      xaxis: {
        title: 'Manufacturing Consumption (units of Mfg)',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor, size: 9 },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, Math.max(maxMfgPPF, maxMfgCPF) * 1.25]
      },
      yaxis: {
        title: 'Agriculture Consumption (units of Agri)',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor, size: 9 },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, Math.max(maxAgriPPF, maxAgriCPF) * 1.25]
      }
    };

    const config = { responsive: true, displayModeBar: false };

    Plotly.newPlot(plotRef.current, [tracePPF, traceCPF, traceA, traceB], layout, config);
  }, [L, a1, a2, worldPrice, theme, maxMfgPPF, maxAgriPPF, maxMfgCPF, maxAgriCPF, autarkyMfg, autarkyAgri, freeTradeMfg, freeTradeAgri, oppCost]);

  return (
    <div style={{ border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', padding: '16px', backgroundColor: 'var(--card-bg)' }}>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px', fontStyle: 'italic' }}>
        <strong>📊 What this graph shows:</strong> This graph displays the gains from trade. In autarky, consumption point A is restricted to the PPF boundary. Free trade shifts consumption to point B on the higher CPF curve, yielding higher consumer satisfaction.
      </p>
      <div className="plotly-container" ref={plotRef} style={{ height: '280px', minHeight: '280px' }}></div>
      <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <strong>💡 What to notice:</strong> Trade can move the country from a lower consumption possibility (point A) to a higher one (point B), which lies strictly outside the PPF production frontier.
      </div>
    </div>
  );
}
