import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

export default function SpecializationPanel({ country, a1, a2, worldPrice, theme }) {
  const plotRef = useRef(null);
  const threshold = a1 / a2;

  let outcome = '';
  let color = '';
  if (worldPrice > threshold) {
    outcome = 'Manufacturing (Complete Specialization)';
    color = 'var(--accent-primary)';
  } else if (worldPrice < threshold) {
    outcome = 'Agriculture (Complete Specialization)';
    color = 'var(--accent-success)';
  } else {
    outcome = 'Both Sectors (Indifferent)';
    color = 'var(--accent-warning)';
  }

  useEffect(() => {
    if (!plotRef.current) return;

    const isDark = theme === 'dark';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const lineColor = isDark ? '#475569' : '#cbd5e1';

    // We plot a 1D line where x goes from 0 to threshold * 2 or worldPrice * 1.5
    const limit = Math.max(threshold * 1.8, worldPrice * 1.2);
    
    // Background regions
    const traceTimeline = {
      x: [0, limit],
      y: [0, 0],
      type: 'scatter',
      mode: 'lines',
      name: 'Price Line',
      line: { color: lineColor, width: 6 },
      hoverinfo: 'none'
    };

    // Threshold point
    const traceThreshold = {
      x: [threshold],
      y: [0],
      type: 'scatter',
      mode: 'markers+text',
      name: 'Opportunity Cost',
      text: [`Threshold: ${threshold.toFixed(2)}`],
      textposition: 'bottom center',
      textfont: { color: country === 'Home' ? '#3b82f6' : '#8b5cf6', size: 10, weight: 'bold' },
      marker: {
        size: 12,
        color: country === 'Home' ? '#3b82f6' : '#8b5cf6',
        symbol: 'diamond'
      }
    };

    // Current price point
    const tracePrice = {
      x: [worldPrice],
      y: [0],
      type: 'scatter',
      mode: 'markers+text',
      name: 'World Price',
      text: [`P₁/P₂ = ${worldPrice.toFixed(2)}`],
      textposition: 'top center',
      textfont: { color: '#f59e0b', size: 11, weight: 'bold' },
      marker: {
        size: 14,
        color: '#f59e0b',
        symbol: 'circle'
      }
    };

    const layout = {
      title: {
        text: `<b>${country} Specialization</b>`,
        font: { color: textColor, family: 'Poppins', size: 13 }
      },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 20, r: 20, t: 35, b: 35 },
      showlegend: false,
      xaxis: {
        showgrid: false,
        zeroline: false,
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
    <div style={{ border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', padding: '16px', backgroundColor: 'rgba(var(--bg-color), 0.15)' }}>
      <div className="plotly-container" ref={plotRef} style={{ height: '140px', minHeight: '140px' }}></div>
      <div style={{ marginTop: '10px' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Opportunity Cost (a₁/a₂): <strong>{threshold.toFixed(2)}</strong>
        </p>
        <p style={{ fontSize: '0.875rem', fontWeight: '600', color: color, marginTop: '4px' }}>
          Outcome: {outcome}
        </p>
      </div>
    </div>
  );
}
