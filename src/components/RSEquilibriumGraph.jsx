import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

export default function RSEquilibriumGraph({ homeL, foreignL, homeA1, homeA2, foreignA1, foreignA2, worldPrice, theme }) {
  const plotRef = useRef(null);

  const oppH = homeA1 / homeA2;
  const oppF = foreignA1 / foreignA2;

  const homeHasMfgCA = oppH <= oppF;
  const oppLow = homeHasMfgCA ? oppH : oppF;
  const oppHigh = homeHasMfgCA ? oppF : oppH;

  // Q_step is max Mfg production of CA country divided by max Agri production of other country
  const maxMfgCA = homeHasMfgCA ? (homeL / homeA1) : (foreignL / foreignA1);
  const maxAgriOther = homeHasMfgCA ? (foreignL / foreignA2) : (homeL / homeA2);
  const qStep = maxAgriOther > 0 ? (maxMfgCA / maxAgriOther) : 1;

  useEffect(() => {
    if (!plotRef.current) return;

    const isDark = theme === 'dark';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const gridColor = isDark ? '#1e293b' : '#e2e8f0';

    // 1. Relative Supply (RS) Curve
    const rsX = [0, 0, qStep, qStep, qStep * 2];
    const rsY = [0, oppLow, oppLow, oppHigh, oppHigh];

    const traceRS = {
      x: rsX,
      y: rsY,
      type: 'scatter',
      mode: 'lines',
      name: 'World Relative Supply (RS)',
      line: { color: '#3b82f6', width: 3.5 },
      hovertemplate: `<b>Relative Supply (RS)</b><br>Price ratio P₁/P₂: %{y:.2f}<br>Relative Q: %{x:.2f}<extra></extra>`
    };

    // 2. Relative Demand (RD) Curve (Cobb-Douglas Hyperbola: RD = constant / Price)
    const rdConst = qStep * ((oppLow + oppHigh) / 2);
    const rdX = [];
    const rdY = [];
    for (let q = 0.05 * qStep; q <= 2.2 * qStep; q += 0.05 * qStep) {
      rdX.push(q);
      rdY.push(rdConst / q);
    }

    const traceRD = {
      x: rdX,
      y: rdY,
      type: 'scatter',
      mode: 'lines',
      name: 'World Relative Demand (RD)',
      line: { color: '#ef4444', width: 2.5, dash: 'dash' },
      hovertemplate: `<b>Relative Demand (RD)</b><br>Price ratio P₁/P₂: %{y:.2f}<br>Relative Q: %{x:.2f}<extra></extra>`
    };

    // 3. Current price point intersection on RS
    let currentQ = 0;
    if (worldPrice < oppLow) {
      currentQ = 0;
    } else if (worldPrice === oppLow) {
      currentQ = qStep * 0.5; // Indifferent region
    } else if (worldPrice < oppHigh) {
      currentQ = qStep; // Specialization step
    } else if (worldPrice === oppHigh) {
      currentQ = qStep * 1.5;
    } else {
      currentQ = qStep * 2;
    }

    const traceCurrentPrice = {
      x: [currentQ],
      y: [worldPrice],
      type: 'scatter',
      mode: 'markers+text',
      name: 'Current Price Position',
      text: ['Current Price'],
      textposition: 'top left',
      textfont: { color: '#f59e0b', size: 10, weight: 'bold' },
      marker: { size: 12, color: '#f59e0b', symbol: 'circle' },
      hovertemplate: `<b>Price Position</b><br>Relative Price P₁/P₂: %{y:.2f}<br>Relative Quantity: %{x:.2f}<extra></extra>`
    };

    // 4. Equilibrium point (where RS and RD cross)
    // At the cross-section, price is between oppLow and oppHigh, and relative quantity is exactly qStep
    const eqPrice = rdConst / qStep; // (oppLow+oppHigh)/2
    const traceEquil = {
      x: [qStep],
      y: [eqPrice],
      type: 'scatter',
      mode: 'markers+text',
      name: 'Free Trade Equilibrium',
      text: ['Equilibrium'],
      textposition: 'top right',
      textfont: { color: '#10b981', size: 10, weight: 'bold' },
      marker: { size: 12, color: '#10b981', symbol: 'diamond' },
      hovertemplate: `<b>Equilibrium relative price</b><br>Relative Price P₁/P₂: ${eqPrice.toFixed(2)}<br>Relative Quantity Q₁/Q₂: ${qStep.toFixed(2)}<extra></extra>`
    };

    const layout = {
      title: {
        text: '<b>Free Trade Equilibrium: Relative Supply and Relative Demand</b>',
        font: { color: textColor, family: 'Poppins', size: 14 }
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
        title: 'Relative Quantity of Manufacturing to Agriculture (Q₁/Q₂)',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor, size: 9 },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, qStep * 2.2]
      },
      yaxis: {
        title: 'Relative World Price P₁ / P₂ (Price of Mfg / Price of Agri)',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor, size: 9 },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, oppHigh * 1.5]
      },
      annotations: [
        {
          x: qStep * 0.1,
          y: oppH,
          text: `Home cost a₁/a₂ = ${oppH.toFixed(2)}`,
          showarrow: false,
          font: { color: '#3b82f6', size: 9, weight: 'bold' },
          bgcolor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)'
        },
        {
          x: qStep * 0.1,
          y: oppF,
          text: `Foreign cost a₁*/a₂* = ${oppF.toFixed(2)}`,
          showarrow: false,
          font: { color: '#8b5cf6', size: 9, weight: 'bold' },
          bgcolor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)'
        }
      ]
    };

    const config = { responsive: true, displayModeBar: false };

    Plotly.newPlot(plotRef.current, [traceRS, traceRD, traceCurrentPrice, traceEquil], layout, config);
  }, [homeL, foreignL, homeA1, homeA2, foreignA1, foreignA2, worldPrice, theme, oppLow, oppHigh, qStep, oppH, oppF]);

  return (
    <div style={{ border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', padding: '16px', backgroundColor: 'var(--card-bg)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px', fontStyle: 'italic' }}>
          <strong>📊 What this graph shows:</strong> This graph shows the determination of the world relative price. The world relative price ratio P₁/P₂ is set by the intersection of World Relative Supply (RS, blue stair-step) and World Relative Demand (RD, red dashed line).
        </p>
        <div className="plotly-container" ref={plotRef} style={{ height: '280px', minHeight: '280px' }}></div>
      </div>
      <div style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <li>• Home opportunity cost (a₁/a₂): <strong>{oppH.toFixed(2)}</strong></li>
          <li>• Foreign opportunity cost (a₁*/a₂*): <strong>{oppF.toFixed(2)}</strong></li>
          <li>• Relative quantity threshold (Q₁/Q₂): <strong>{qStep.toFixed(2)}</strong></li>
          <li>• Selected World Price (P₁/P₂): <strong>{worldPrice.toFixed(2)}</strong></li>
        </ul>
        <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)', borderRadius: '6px', fontSize: '0.8rem' }}>
          <strong>💡 What to notice:</strong> The equilibrium price (marked by the green diamond) is where world relative supply and world relative demand meet. If the relative price lies on a horizontal step, that country is partially specialized; if it lies on a vertical segment, both countries specialize completely.
        </div>
      </div>
    </div>
  );
}
