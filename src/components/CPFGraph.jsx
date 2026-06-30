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
      name: `${country} PPF (Production Limits)`,
      line: { color: '#ef4444', width: 2, dash: 'dot' },
      marker: { size: 6 },
      hovertemplate: `<b>PPF Point (${country})</b><br>` +
                     `Mfg output: %{x:.1f} units<br>` +
                     `Agri output: %{y:.1f} units<br>` +
                     `Slope = -a₁/a₂ = -${oppCost.toFixed(2)}<br>` +
                     `<extra></extra>`
    };

    const traceCPF = {
      x: [0, maxMfgCPF],
      y: [maxAgriCPF, 0],
      type: 'scatter',
      mode: 'lines+markers',
      name: `${country} CPF under Free Trade`,
      line: { color: '#10b981', width: 3 },
      marker: { size: 8 },
      hovertemplate: `<b>CPF Point (${country})</b><br>` +
                     `Mfg consumption: %{x:.1f} units<br>` +
                     `Agri consumption: %{y:.1f} units<br>` +
                     `Slope = -P₁/P₂ = -${worldPrice.toFixed(2)}<br>` +
                     `<extra></extra>`
    };

    // Specialization point
    const specX = worldPrice > oppCost ? maxMfgPPF : (worldPrice < oppCost ? 0 : 0);
    const specY = worldPrice > oppCost ? 0 : (worldPrice < oppCost ? maxAgriPPF : 0);

    const traceSpecPoint = {
      x: [specX],
      y: [specY],
      type: 'scatter',
      mode: 'markers+text',
      name: `${country} Specialization Point`,
      text: ['Specialization Production Point'],
      textposition: 'top right',
      textfont: { color: textColor, size: 10, weight: 'bold' },
      marker: { size: 12, color: '#f59e0b', symbol: 'star' },
      hovertemplate: `<b>Production Point (${country})</b><br>` +
                     `Mfg Output: ${specX.toFixed(1)} units<br>` +
                     `Agri Output: ${specY.toFixed(1)} units<br>` +
                     `<extra></extra>`
    };

    // Possible Free Trade consumption point (e.g. at middle of CPF range)
    const midX = maxMfgCPF / 2;
    const midY = maxAgriCPF / 2;
    const traceConsPoint = {
      x: [midX],
      y: [midY],
      type: 'scatter',
      mode: 'markers+text',
      name: 'Possible Consumption Point',
      text: ['Possible Consumption Point (Free Trade)'],
      textposition: 'bottom left',
      textfont: { color: '#10b981', size: 9, weight: 'bold' },
      marker: { size: 10, color: '#10b981', symbol: 'diamond' },
      hovertemplate: `<b>Consumption Point (${country})</b><br>` +
                     `Mfg Consumption: ${midX.toFixed(1)} units<br>` +
                     `Agri Consumption: ${midY.toFixed(1)} units<br>` +
                     `Outside PPF: ${midX > (maxMfgPPF - (midY / oppCost)) ? 'Yes (Gain from Trade)' : 'No'}<br>` +
                     `<extra></extra>`
    };

    const layout = {
      title: {
        text: `<b>${country} Consumption Possibility Frontier under Free Trade</b>`,
        font: { color: textColor, family: 'Poppins', size: 13 }
      },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 60, r: 40, t: 50, b: 50 },
      showlegend: true,
      legend: {
        x: 0.35,
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
        range: [0, Math.max(maxMfgPPF, maxMfgCPF) * 1.3]
      },
      yaxis: {
        title: 'Agriculture Consumption (units of Agri)',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor, size: 9 },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, Math.max(maxAgriPPF, maxAgriCPF) * 1.3]
      },
      annotations: [
        {
          x: maxMfgPPF / 3,
          y: maxAgriPPF / 2.5,
          text: `PPF Slope = -a₁/a₂ = -${oppCost.toFixed(2)}`,
          showarrow: false,
          font: { color: '#ef4444', size: 9, weight: 'bold' }
        },
        {
          x: maxMfgCPF / 1.5,
          y: maxAgriCPF / 4,
          text: `CPF Slope = -P₁/P₂ = -${worldPrice.toFixed(2)}`,
          showarrow: false,
          font: { color: '#10b981', size: 10, weight: 'bold' }
        }
      ]
    };

    const config = { responsive: true, displayModeBar: false };

    Plotly.newPlot(plotRef.current, [tracePPF, traceCPF, traceSpecPoint, traceConsPoint], layout, config);
  }, [country, L, a1, a2, worldPrice, theme, maxMfgPPF, maxAgriPPF, maxMfgCPF, maxAgriCPF, oppCost]);

  const gainAgri = Math.max(0, maxAgriCPF - maxAgriPPF);
  const gainMfg = Math.max(0, maxMfgCPF - maxMfgPPF);

  return (
    <div style={{ border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', padding: '16px', backgroundColor: 'var(--card-bg)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px', fontStyle: 'italic' }}>
          <strong>📊 What this graph shows:</strong> The PPF (dotted red line) shows what {country} can produce by itself. The CPF (solid green line) shows what {country} can consume after specializing in its comparative advantage sector ({specialization}) and trading at the world relative price P₁/P₂ ({worldPrice.toFixed(2)}).
        </p>
        <div className="plotly-container" ref={plotRef} style={{ height: '260px', minHeight: '260px' }}></div>
      </div>
      <div style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <li>• Specialized Production: <strong>{specialization} Only</strong></li>
          <li>• Opportunity Cost Slope (PPF): <strong>-{oppCost.toFixed(2)}</strong></li>
          <li>• World Relative Price Slope (CPF): <strong>-{worldPrice.toFixed(2)}</strong></li>
          {worldPrice > oppCost && (
            <li>• Maximum Potential Gain: <strong style={{ color: 'var(--accent-success)' }}>+{gainAgri.toFixed(1)} Agri</strong> (at max Mfg production)</li>
          )}
          {worldPrice < oppCost && (
            <li>• Maximum Potential Gain: <strong style={{ color: 'var(--accent-success)' }}>+{gainMfg.toFixed(1)} Mfg</strong> (at max Agri production)</li>
          )}
          {worldPrice === oppCost && (
            <li>• No trade gains (CPF is identical to PPF)</li>
          )}
        </ul>
        <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)', borderRadius: '6px', fontSize: '0.8rem' }}>
          <strong>💡 What to notice:</strong> {country} can consume beyond its own production possibilities (represented by any point on the green CPF line that is outside the red PPF area) by specializing and trading.
        </div>
      </div>
    </div>
  );
}
