import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import TutorTip from './TutorTip';

export default function SpecializationGraph({ worldPrice, homeA1, homeA2, foreignA1, foreignA2, theme }) {
  const plotRef = useRef(null);

  const oppCostHome = homeA1 / homeA2;
  const oppCostForeign = foreignA1 / foreignA2;

  // Specialization Logic
  let homeProd = '';
  let homeExplain = '';
  if (worldPrice > oppCostHome) {
    homeProd = 'Manufacturing Only';
    homeExplain = `The world relative price of Manufacturing (${worldPrice.toFixed(2)}) exceeds Home's opportunity cost (${oppCostHome.toFixed(2)}). Home workers earn higher wages in Manufacturing (w₁ = P₁/a₁ > w₂ = P₂/a₂).`;
  } else if (worldPrice < oppCostHome) {
    homeProd = 'Agriculture Only';
    homeExplain = `The world relative price of Manufacturing (${worldPrice.toFixed(2)}) is below Home's opportunity cost (${oppCostHome.toFixed(2)}). Home workers earn higher wages in Agriculture (w₂ = P₂/a₂ > w₁ = P₁/a₁).`;
  } else {
    homeProd = 'Both Goods (Indifferent)';
    homeExplain = `The world relative price exactly matches Home's opportunity cost. Workers are indifferent between sectors.`;
  }

  let foreignProd = '';
  let foreignExplain = '';
  if (worldPrice > oppCostForeign) {
    foreignProd = 'Manufacturing Only';
    foreignExplain = `The world relative price of Manufacturing (${worldPrice.toFixed(2)}) exceeds Foreign's opportunity cost (${oppCostForeign.toFixed(2)}). Foreign workers earn higher wages in Manufacturing (w₁* = P₁/a₁* > w₂* = P₂/a₂*).`;
  } else if (worldPrice < oppCostForeign) {
    foreignProd = 'Agriculture Only';
    foreignExplain = `The world relative price of Manufacturing (${worldPrice.toFixed(2)}) is below Foreign's opportunity cost (${oppCostForeign.toFixed(2)}). Foreign workers earn higher wages in Agriculture (w₂* = P₂/a₂* > w₁* = P₁/a₁*).`;
  } else {
    foreignProd = 'Both Goods (Indifferent)';
    foreignExplain = `The world relative price exactly matches Foreign's opportunity cost. Workers are indifferent between sectors.`;
  }

  useEffect(() => {
    if (!plotRef.current) return;

    const isDark = theme === 'dark';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const gridColor = isDark ? '#1e293b' : '#e2e8f0';

    // Order opportunity costs for drawing intervals
    const c1 = Math.min(oppCostHome, oppCostForeign);
    const c2 = Math.max(oppCostHome, oppCostForeign);

    // We will build a 1D line chart representing the price timeline
    const traceTimeline = {
      x: [0, c1, c2, c2 * 1.5],
      y: [0, 0, 0, 0],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Opportunity Cost Thresholds',
      line: { color: isDark ? '#475569' : '#94a3b8', width: 4 },
      marker: {
        size: 14,
        color: ['#64748b', '#3b82f6', '#8b5cf6', '#64748b'],
        symbol: 'diamond'
      },
      hoverinfo: 'none'
    };

    const tracePrice = {
      x: [worldPrice],
      y: [0],
      type: 'scatter',
      mode: 'markers+text',
      name: 'Current World Relative Price (P₁/P₂)',
      text: [`Current World Price P₁/P₂ = ${worldPrice.toFixed(2)}`],
      textposition: 'top center',
      textfont: { color: '#f59e0b', size: 12, weight: 'bold' },
      marker: { size: 18, color: '#f59e0b', symbol: 'circle' },
      hovertemplate: `<b>Current World Relative Price</b><br>P₁/P₂ = ${worldPrice.toFixed(2)}<extra></extra>`
    };

    const layout = {
      title: {
        text: '<b>Specialization and Relative Price: Both Countries</b>',
        font: { color: textColor, family: 'Poppins', size: 14 }
      },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 20, r: 20, t: 60, b: 30 },
      showlegend: false,
      xaxis: {
        title: 'World Relative Price P₁ / P₂ (Manufacturing relative to Agriculture)',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor },
        gridcolor: 'transparent',
        zeroline: false,
        range: [0, Math.max(c2 * 1.4, worldPrice * 1.2)]
      },
      yaxis: {
        showgrid: false,
        zeroline: false,
        showticklabels: false,
        range: [-0.5, 0.5]
      },
      annotations: [
        {
          x: oppCostHome,
          y: -0.15,
          text: `Home threshold:<br>a₁/a₂ = ${oppCostHome.toFixed(2)}`,
          showarrow: true,
          arrowhead: 2,
          arrowcolor: '#3b82f6',
          font: { color: '#3b82f6', size: 11 },
          ax: 0,
          ay: 40
        },
        {
          x: oppCostForeign,
          y: -0.15,
          text: `Foreign threshold:<br>a₁*/a₂* = ${oppCostForeign.toFixed(2)}`,
          showarrow: true,
          arrowhead: 2,
          arrowcolor: '#8b5cf6',
          font: { color: '#8b5cf6', size: 11 },
          ax: 0,
          ay: 40
        }
      ]
    };

    const config = { responsive: true, displayModeBar: false };

    Plotly.newPlot(plotRef.current, [traceTimeline, tracePrice], layout, config);
  }, [worldPrice, homeA1, homeA2, foreignA1, foreignA2, theme, oppCostHome, oppCostForeign]);

  return (
    <div>
      <div className="lab-explanation">
        <h4 style={{ color: 'var(--accent-primary)' }}>Specialization and Relative Price</h4>
        <p style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <strong>📊 What this graph shows:</strong> This timeline displays the opportunity cost thresholds for both countries as diamond markers and the current world relative price as a circle. Workers choose the sector that pays a higher wage.
        </p>
        <p style={{ marginTop: '8px' }}>
          Workers choose to work in the industry that offers the higher wage:
        </p>
        <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <li>Home Mfg Wage: <strong>w₁ = P₁ / a₁</strong> | Home Agri Wage: <strong>w₂ = P₂ / a₂</strong></li>
          <li>Foreign Mfg Wage: <strong>w₁* = P₁ / a₁*</strong> | Foreign Agri Wage: <strong>w₂* = P₂ / a₂*</strong></li>
        </ul>
      </div>

      <div className="plotly-container" ref={plotRef} style={{ height: '220px', minHeight: '220px' }}></div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', background: 'rgba(59, 130, 246, 0.04)' }}>
          <h5 style={{ color: '#3b82f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Home Specialization Decision</span>
            <span style={{ fontSize: '0.8rem', padding: '4px 8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '20px' }}>{homeProd}</span>
          </h5>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
            {homeExplain}
          </p>
          <div style={{ marginTop: '8px', fontSize: '0.8rem', padding: '6px', borderLeft: '3px solid #3b82f6', paddingLeft: '10px' }}>
            <strong>Decision Rules:</strong><br/>
            • If P₁/P₂ &gt; a₁/a₂ → Home produces Manufacturing<br/>
            • If P₁/P₂ &lt; a₁/a₂ → Home produces Agriculture<br/>
            • If P₁/P₂ = a₁/a₂ → Home can produce both
          </div>
        </div>

        <div style={{ padding: '20px', border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', background: 'rgba(139, 92, 246, 0.04)' }}>
          <h5 style={{ color: '#8b5cf6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Foreign Specialization Decision</span>
            <span style={{ fontSize: '0.8rem', padding: '4px 8px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '20px' }}>{foreignProd}</span>
          </h5>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
            {foreignExplain}
          </p>
          <div style={{ marginTop: '8px', fontSize: '0.8rem', padding: '6px', borderLeft: '3px solid #8b5cf6', paddingLeft: '10px' }}>
            <strong>Decision Rules:</strong><br/>
            • If P₁/P₂ &gt; a₁*/a₂* → Foreign produces Manufacturing<br/>
            • If P₁/P₂ &lt; a₁*/a₂* → Foreign produces Agriculture<br/>
            • If P₁/P₂ = a₁*/a₂* → Foreign can produce both
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: 'var(--border-radius-md)' }}>
        <h5 style={{ color: 'var(--accent-warning)', marginBottom: '4px' }}>Complete vs Partial Specialization</h5>
        <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-secondary)' }}>
          If the relative price falls strictly <strong>between</strong> the opportunity costs of the two countries 
          (i.e., {Math.min(oppCostHome, oppCostForeign).toFixed(2)} &lt; P₁/P₂ &lt; {Math.max(oppCostHome, oppCostForeign).toFixed(2)}), 
          both countries will specialize completely in their comparative advantage sectors. This leads to the largest possible gains from trade!
        </p>
      </div>

      <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        <strong>💡 What to notice:</strong> Each country compares the world relative price with its own opportunity cost. The country with the lower opportunity cost of Manufacturing has comparative advantage there and will specialize in Manufacturing when the world price exceeds its threshold.
      </div>

      <TutorTip tip="If P₁/P₂ > a₁/a₂, Home specializes in Manufacturing. If P₁/P₂ < a₁/a₂, Home specializes in Agriculture. If they are equal, wages are identical in both sectors and workers can produce both!" />
    </div>
  );
}
