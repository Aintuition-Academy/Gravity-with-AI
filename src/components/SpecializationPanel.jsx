import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

export default function SpecializationPanel({ country, a1, a2, worldPrice, theme }) {
  const plotRef = useRef(null);
  const threshold = a1 / a2;

  let outcome = '';
  let color = '';
  let ruleText = '';
  if (worldPrice > threshold) {
    outcome = 'Manufacturing Only (Complete Specialization)';
    color = 'var(--accent-primary)';
    ruleText = `Since P₁/P₂ (${worldPrice.toFixed(2)}) > opportunity cost (${threshold.toFixed(2)}), workers earn more in Manufacturing, leading to complete specialization.`;
  } else if (worldPrice < threshold) {
    outcome = 'Agriculture Only (Complete Specialization)';
    color = 'var(--accent-success)';
    ruleText = `Since P₁/P₂ (${worldPrice.toFixed(2)}) < opportunity cost (${threshold.toFixed(2)}), workers earn more in Agriculture, leading to complete specialization.`;
  } else {
    outcome = 'Both Sectors (Indifferent / Partial Specialization)';
    color = 'var(--accent-warning)';
    ruleText = `Since P₁/P₂ (${worldPrice.toFixed(2)}) = opportunity cost (${threshold.toFixed(2)}), wages are identical in both sectors and workers can produce both.`;
  }

  useEffect(() => {
    if (!plotRef.current) return;

    const isDark = theme === 'dark';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const lineColor = isDark ? '#475569' : '#cbd5e1';

    const limit = Math.max(threshold * 1.8, worldPrice * 1.2);
    
    const traceTimeline = {
      x: [0, limit],
      y: [0, 0],
      type: 'scatter',
      mode: 'lines',
      name: 'Price Timeline Ratio',
      line: { color: lineColor, width: 6 },
      hovertemplate: `Relative Price Timeline Scale (P₁/P₂)<extra></extra>`
    };

    const traceThreshold = {
      x: [threshold],
      y: [0],
      type: 'scatter',
      mode: 'markers+text',
      name: `${country} Opportunity Cost Threshold`,
      text: [`${country} Cost Threshold: ${threshold.toFixed(2)}`],
      textposition: 'bottom center',
      textfont: { color: country === 'Home' ? '#3b82f6' : '#8b5cf6', size: 10, weight: 'bold' },
      marker: {
        size: 14,
        color: country === 'Home' ? '#3b82f6' : '#8b5cf6',
        symbol: 'diamond'
      },
      hovertemplate: `<b>Opportunity Cost (a₁/a₂)</b><br>${country} Threshold price: ${threshold.toFixed(2)}<extra></extra>`
    };

    const tracePrice = {
      x: [worldPrice],
      y: [0],
      type: 'scatter',
      mode: 'markers+text',
      name: 'Current World Relative Price',
      text: [`Current Price P₁/P₂ = ${worldPrice.toFixed(2)}`],
      textposition: 'top center',
      textfont: { color: '#f59e0b', size: 11, weight: 'bold' },
      marker: {
        size: 16,
        color: '#f59e0b',
        symbol: 'circle'
      },
      hovertemplate: `<b>Current World Relative Price (P₁/P₂)</b><br>Price ratio: ${worldPrice.toFixed(2)}<extra></extra>`
    };

    const layout = {
      title: {
        text: `<b>${country} Specialization Decision</b>`,
        font: { color: textColor, family: 'Poppins', size: 13 }
      },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 20, r: 20, t: 40, b: 40 },
      showlegend: false,
      xaxis: {
        showgrid: false,
        zeroline: false,
        title: 'Price Ratio P₁ / P₂ (Manufacturing relative to Agriculture)',
        titlefont: { color: textColor, size: 9 },
        tickfont: { color: textColor, size: 9 },
        range: [0, limit]
      },
      yaxis: {
        showgrid: false,
        zeroline: false,
        showticklabels: false,
        range: [-0.4, 0.4]
      }
    };

    const config = { responsive: true, displayModeBar: false };

    Plotly.newPlot(plotRef.current, [traceTimeline, traceThreshold, tracePrice], layout, config);
  }, [country, a1, a2, worldPrice, theme, threshold]);

  return (
    <div style={{ border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', padding: '16px', backgroundColor: 'var(--card-bg)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontStyle: 'italic' }}>
          <strong>📊 What this shows:</strong> This panel shows how {country} decides what to produce. Workers compare the world relative price ratio P₁/P₂ with {country}'s internal opportunity cost threshold a₁/a₂.
        </p>
        <div className="plotly-container" ref={plotRef} style={{ height: '140px', minHeight: '140px' }}></div>
      </div>
      <div style={{ marginTop: '10px' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          • Opportunity Cost (a₁/a₂): <strong>{threshold.toFixed(2)}</strong> units of Agri<br/>
          • World Relative Price (P₁/P₂): <strong>{worldPrice.toFixed(2)}</strong>
        </p>
        
        <div style={{ margin: '8px 0', padding: '8px', backgroundColor: 'rgba(var(--bg-color), 0.1)', borderRadius: '6px', fontSize: '0.8rem', borderLeft: `3px solid ${color}` }}>
          <strong>Decision Rules:</strong>
          <ul style={{ paddingLeft: '14px', marginTop: '3px', listStyleType: 'disc' }}>
            <li>If P₁/P₂ &gt; a₁/a₂ → produce Manufacturing</li>
            <li>If P₁/P₂ &lt; a₁/a₂ → produce Agriculture</li>
            <li>If P₁/P₂ = a₁/a₂ → indifferent (produce both)</li>
          </ul>
        </div>

        <p style={{ fontSize: '0.85rem', fontWeight: '600', color: color, marginTop: '4px' }}>
          👉 Specialization: {outcome}
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          {ruleText}
        </p>
        <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)', borderRadius: '6px', fontSize: '0.8rem' }}>
          <strong>💡 What to notice:</strong> {country === 'Home' ? 'Home compares the world relative price with its own opportunity cost to decide what to produce.' : "Foreign makes the same type of comparison, but using Foreign's own opportunity cost."}
        </div>
      </div>
    </div>
  );
}
