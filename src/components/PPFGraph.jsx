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
      marker: { size: 10, color: country === 'Home' ? '#1d4ed8' : '#6d28d9' },
      text: [
        `Max Agriculture = L/${country === 'Home' ? 'a₂' : 'a₂*'} (${maxAgri.toFixed(1)} units)`,
        `Max Manufacturing = L/${country === 'Home' ? 'a₁' : 'a₁*'} (${maxMfg.toFixed(1)} units)`
      ],
      textposition: ['top right', 'bottom left'],
      textfont: { color: textColor, size: 10, weight: 'bold' },
      hovertemplate: `<b>${country} PPF Point</b><br>` +
                     `Manufacturing Output: %{x:.1f} units of Mfg<br>` +
                     `Agriculture Output: %{y:.1f} units of Agri<br>` +
                     `Labor pool (L): ${L} units<br>` +
                     `a₁ (${country === 'Home' ? 'Mfg' : 'Mfg*'} labor requirement): ${a1.toFixed(1)} hours/unit<br>` +
                     `a₂ (${country === 'Home' ? 'Agri' : 'Agri*'} labor requirement): ${a2.toFixed(1)} hours/unit<br>` +
                     `<extra></extra>`
    };

    const layout = {
      title: {
        text: `<b>${country} Production Possibility Frontier</b>`,
        font: { color: textColor, family: 'Poppins', size: 14 }
      },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 60, r: 40, t: 50, b: 50 },
      showlegend: false,
      xaxis: {
        title: 'Manufacturing Output (units of Mfg)',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor, size: 9 },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, maxMfg * 1.3]
      },
      yaxis: {
        title: 'Agriculture Output (units of Agri)',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor, size: 9 },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, maxAgri * 1.3]
      },
      annotations: [
        {
          x: maxMfg / 2,
          y: maxAgri / 2,
          text: `Slope = -a₁/a₂ = -${oppCostMfg.toFixed(2)}<br>(Opportunity Cost of Mfg)`,
          showarrow: true,
          arrowhead: 1,
          ax: 40,
          ay: -40,
          font: { color: country === 'Home' ? '#3b82f6' : '#8b5cf6', size: 11, weight: 'bold' },
          bgcolor: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          bordercolor: country === 'Home' ? '#3b82f6' : '#8b5cf6',
          borderwidth: 1,
          borderpad: 4
        }
      ]
    };

    const config = { responsive: true, displayModeBar: false };

    Plotly.newPlot(plotRef.current, [tracePPF], layout, config);
  }, [country, L, a1, a2, theme, maxMfg, maxAgri, oppCostMfg]);

  return (
    <div style={{ border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', padding: '16px', backgroundColor: 'var(--card-bg)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px', fontStyle: 'italic' }}>
          <strong>📊 What this graph shows:</strong> The PPF shows all maximum output combinations of Manufacturing and Agriculture that {country} can produce using its limited labor force ({L} workers) and technology.
        </p>
        <div className="plotly-container" ref={plotRef} style={{ height: '260px', minHeight: '260px' }}></div>
      </div>
      <div style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <li>• Total Labor Pool (L): <strong>{L}</strong> workers</li>
          <li>• Unit Labor Requirements: <strong>a₁ = {a1.toFixed(1)}</strong> hr(s)/Mfg, <strong>a₂ = {a2.toFixed(1)}</strong> hr(s)/Agri</li>
          <li>• Maximum Output: <strong>{maxMfg.toFixed(1)} Mfg</strong> (if all labor makes Mfg) or <strong>{maxAgri.toFixed(1)} Agri</strong> (if all labor makes Agri)</li>
          <li>• Opportunity Cost of Mfg (a₁/a₂): <strong>{oppCostMfg.toFixed(2)}</strong> units of Agriculture given up per unit of Mfg</li>
          <li>• Frontier Slope: <strong>-{oppCostMfg.toFixed(2)}</strong></li>
        </ul>
        <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)', borderRadius: '6px', fontSize: '0.8rem' }}>
          <strong>💡 What to notice:</strong> The {country} PPF shows all production combinations {country} can make with its available labor. Changing the labor pool (L) shifts the PPF in parallel, while changing labor requirements (a₁ or a₂) rotates it by changing opportunity costs.
        </div>
      </div>
    </div>
  );
}
