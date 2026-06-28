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
      line: { color: '#3b82f6', width: 3.5 }
    };

    // 2. Relative Demand (RD) Curve (Cobb-Douglas Hyperbola: RD = constant / Price)
    // We calibrate constant so it intersects the vertical step of RS at qStep
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
      line: { color: '#ef4444', width: 2.5, dash: 'dash' }
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
      mode: 'markers',
      name: 'Current Price Position',
      marker: { size: 12, color: '#f59e0b', symbol: 'circle' }
    };

    const layout = {
      title: {
        text: '<b>2x2 World Trade Equilibrium</b>',
        font: { color: textColor, family: 'Poppins', size: 14 }
      },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 50, r: 25, t: 40, b: 45 },
      showlegend: true,
      legend: {
        x: 0.4,
        y: 0.95,
        font: { color: textColor, size: 9 }
      },
      xaxis: {
        title: 'Relative Quantity Mfg / Agri (Q₁/Q₂)',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor, size: 9 },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, qStep * 2.2]
      },
      yaxis: {
        title: 'Relative Price P₁ / P₂',
        titlefont: { color: textColor, size: 11 },
        tickfont: { color: textColor, size: 9 },
        gridcolor: gridColor,
        zerolinecolor: textColor,
        range: [0, oppHigh * 1.5]
      }
    };

    const config = { responsive: true, displayModeBar: false };

    Plotly.newPlot(plotRef.current, [traceRS, traceRD, traceCurrentPrice], layout, config);
  }, [homeL, foreignL, homeA1, homeA2, foreignA1, foreignA2, worldPrice, theme, oppLow, oppHigh, qStep]);

  return (
    <div style={{ border: '1px solid var(--card-border)', borderRadius: 'var(--border-radius-md)', padding: '16px', backgroundColor: 'rgba(var(--bg-color), 0.15)' }}>
      <div className="plotly-container" ref={plotRef} style={{ height: '280px', minHeight: '280px' }}></div>
      <div style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <li>• Home opportunity cost (a₁/a₂): <strong>{oppH.toFixed(2)}</strong></li>
          <li>• Foreign opportunity cost (a₁*/a₂*): <strong>{oppF.toFixed(2)}</strong></li>
          <li>• Complete specialization range limit: <strong>Q₁/Q₂ = {qStep.toFixed(2)}</strong></li>
          <li>• Current Price (P₁/P₂): <strong>{worldPrice.toFixed(2)}</strong></li>
        </ul>
      </div>
    </div>
  );
}
