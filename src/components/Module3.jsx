import React, { useState, useEffect, useRef, useCallback } from 'react';
import Plotly from 'plotly.js-dist-min';
import TutorTip from './TutorTip';
import Module3Quiz from './Module3Quiz';

export default function Module3({ theme, setActiveTab }) {
  const [moduleTab, setModuleTab] = useState('sub1');

  // --- Theme helper colors ---
  const isDark = theme === 'dark';
  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const gridColor = isDark ? '#1e293b' : '#e2e8f0';

  // --- Graph Refs ---
  const distGraphRef = useRef(null);
  const sizeGraphRef = useRef(null);
  const icebergGraphRef = useRef(null);
  const cesGraphRef = useRef(null);
  const tsGraphRef = useRef(null);
  const wageIterGraphRef = useRef(null);
  const newtonGraphRef = useRef(null);
  const policyGraphRef = useRef(null);
  const gftGraphRef = useRef(null);

  // ── 3.1 Basic Gravity State ───────────────────────────────────────────────
  const [gravGDPi, setGravGDPi] = useState(500);
  const [gravGDPj, setGravGDPj] = useState(300);
  const [gravDist, setGravDist] = useState(2000);
  const [gravAlpha, setGravAlpha] = useState(1.0);
  const [gravBeta, setGravBeta] = useState(1.0);
  const [gravGamma, setGravGamma] = useState(1.0);

  const gravPred = (gravGDPi ** gravAlpha) * (gravGDPj ** gravBeta) / (gravDist ** gravGamma);

  // ── Naive Gravity State ────────────────────────────────────────────────────
  const [naiveAlpha, setNaiveAlpha] = useState(1.0);
  const [naiveBeta, setNaiveBeta] = useState(0.9);
  const [naiveGamma, setNaiveGamma] = useState(-1.0);
  const [naiveGDPi, setNaiveGDPi] = useState(500);
  const [naiveGDPj, setNaiveGDPj] = useState(300);
  const [naiveDist, setNaiveDist] = useState(2000);

  const naiveLnX = naiveAlpha * Math.log(naiveGDPi) + naiveBeta * Math.log(naiveGDPj) + naiveGamma * Math.log(naiveDist);
  const naiveX = Math.exp(naiveLnX);

  // ── 3.2 Multilateral Resistance State ──────────────────────────────────────
  const [mrHomeFgn, setMrHomeFgn] = useState(1.2);
  const [mrHomeWorld, setMrHomeWorld] = useState(1.5);
  const [mrFgnWorld, setMrFgnWorld] = useState(1.1);
  const bilateralAttractive = (1 / mrHomeFgn) / ((mrHomeWorld + mrFgnWorld) / 2);

  // ── 3.3 Armington State ───────────────────────────────────────────────────
  // Iceberg
  const [iceArrival, setIceArrival] = useState(100);
  const [iceDij, setIceDij] = useState(1.3);
  const iceShipped = iceArrival * iceDij;
  const iceLost = iceShipped - iceArrival;
  const icePctLoss = ((iceLost / iceShipped) * 100).toFixed(1);

  // Delivered price
  const [dpWage, setDpWage] = useState(10);
  const [dpProd, setDpProd] = useState(2);
  const [dpDij, setDpDij] = useState(1.25);
  const dpPi = dpWage / dpProd;
  const dpPij = dpPi * dpDij;

  // CES demand
  const [cesWh, setCesWh] = useState(10);
  const [cesWf, setCesWf] = useState(12);
  const [cesBh, setCesBh] = useState(1.0);
  const [cesBf, setCesBf] = useState(1.0);
  const [cesSigma, setCesSigma] = useState(4);
  const [cesDh, setCesDh] = useState(1.0);
  const [cesDf, setCesDf] = useState(1.0);

  const numerH = cesBh * (cesDh ** (1 - cesSigma)) * (cesWh ** (1 - cesSigma));
  const numerF = cesBf * (cesDf ** (1 - cesSigma)) * (cesWf ** (1 - cesSigma));
  const cesDenom = numerH + numerF;
  const cesShareH = cesDenom > 0 ? (numerH / cesDenom * 100).toFixed(1) : 0;
  const cesShareF = cesDenom > 0 ? (numerF / cesDenom * 100).toFixed(1) : 0;

  // Price index (3 origins)
  const [piW1, setPiW1] = useState(10); const [piA1, setPiA1] = useState(2); const [piD1, setPiD1] = useState(1.0); const [piB1, setPiB1] = useState(1.0);
  const [piW2, setPiW2] = useState(12); const [piA2, setPiA2] = useState(1.5); const [piD2, setPiD2] = useState(1.3); const [piB2, setPiB2] = useState(1.0);
  const [piW3, setPiW3] = useState(8);  const [piA3, setPiA3] = useState(1.8); const [piD3, setPiD3] = useState(1.5); const [piB3, setPiB3] = useState(0.8);
  const [piSigma, setPiSigma] = useState(4);

  const piTerm = (w, a, d, b) => b * (d ** (1 - piSigma)) * ((w / a) ** (1 - piSigma));
  const piSum = piTerm(piW1, piA1, piD1, piB1) + piTerm(piW2, piA2, piD2, piB2) + piTerm(piW3, piA3, piD3, piB3);
  const priceIndex = piSum > 0 ? Math.pow(piSum, 1 / (1 - piSigma)) : 0;

  // Trade shares (3 origins)
  const [tsW1, setTsW1] = useState(10); const [tsA1, setTsA1] = useState(2); const [tsD1, setTsD1] = useState(1.0); const [tsB1, setTsB1] = useState(1.0);
  const [tsW2, setTsW2] = useState(12); const [tsA2, setTsA2] = useState(1.5); const [tsD2, setTsD2] = useState(1.3); const [tsB2, setTsB2] = useState(1.0);
  const [tsW3, setTsW3] = useState(8);  const [tsA3, setTsA3] = useState(1.8); const [tsD3, setTsD3] = useState(1.5); const [tsB3, setTsB3] = useState(0.8);
  const [tsSigma, setTsSigma] = useState(4);

  const tsTerm = (w, a, d, b) => b * (d ** (1 - tsSigma)) * ((w / a) ** (1 - tsSigma));
  const tsN1 = tsTerm(tsW1, tsA1, tsD1, tsB1);
  const tsN2 = tsTerm(tsW2, tsA2, tsD2, tsB2);
  const tsN3 = tsTerm(tsW3, tsA3, tsD3, tsB3);
  const tsTotal = tsN1 + tsN2 + tsN3;
  const tsPi1 = tsTotal > 0 ? (tsN1 / tsTotal * 100).toFixed(1) : 0;
  const tsPi2 = tsTotal > 0 ? (tsN2 / tsTotal * 100).toFixed(1) : 0;
  const tsPi3 = tsTotal > 0 ? (tsN3 / tsTotal * 100).toFixed(1) : 0;

  // ── 3.4 Market Clearing / Labor Supply-Demand ─────────────────────────────
  const [mcW1, setMcW1] = useState(10); const [mcW2, setMcW2] = useState(12);
  const [mcL1, setMcL1] = useState(100); const [mcL2, setMcL2] = useState(150);
  const [mcA1, setMcA1] = useState(2); const [mcA2, setMcA2] = useState(1.5);
  const [mcD12, setMcD12] = useState(1.3); const [mcD21, setMcD21] = useState(1.3);
  const [mcSigma, setMcSigma] = useState(4);

  const mcPi = (wi, ai, di, wl1, al1, dl1, wl2, al2, dl2, sigma) => {
    const n = (di ** (1 - sigma)) * ((wi / ai) ** (1 - sigma));
    const d1 = (dl1 ** (1 - sigma)) * ((wl1 / al1) ** (1 - sigma));
    const d2 = (dl2 ** (1 - sigma)) * ((wl2 / al2) ** (1 - sigma));
    return n / (d1 + d2);
  };

  const pi11 = mcPi(mcW1, mcA1, 1.0, mcW1, mcA1, 1.0, mcW2, mcA2, mcD21, mcSigma);
  const pi21 = mcPi(mcW2, mcA2, mcD21, mcW1, mcA1, 1.0, mcW2, mcA2, mcD21, mcSigma);
  const pi12 = mcPi(mcW1, mcA1, mcD12, mcW1, mcA1, mcD12, mcW2, mcA2, 1.0, mcSigma);
  const pi22 = mcPi(mcW2, mcA2, 1.0, mcW1, mcA1, mcD12, mcW2, mcA2, 1.0, mcSigma);

  const mcSupply1 = mcW1 * mcL1;
  const mcSupply2 = mcW2 * mcL2;
  const mcDemand1 = pi11 * mcW1 * mcL1 + pi12 * mcW2 * mcL2;
  const mcDemand2 = pi21 * mcW1 * mcL1 + pi22 * mcW2 * mcL2;
  const mcRatio1 = mcSupply1 > 0 ? (mcDemand1 / mcSupply1).toFixed(3) : 'N/A';
  const mcRatio2 = mcSupply2 > 0 ? (mcDemand2 / mcSupply2).toFixed(3) : 'N/A';

  // ── 3.5 Wage Iteration State ──────────────────────────────────────────────
  const [wIterSigma, setWIterSigma] = useState(4);
  const [wIterL1, setWIterL1] = useState(100); const [wIterL2, setWIterL2] = useState(150);
  const [wIterA1, setWIterA1] = useState(2); const [wIterA2, setWIterA2] = useState(1.5);
  const [wIterD12, setWIterD12] = useState(1.3); const [wIterD21, setWIterD21] = useState(1.3);
  const [wIterHistory, setWIterHistory] = useState([]);
  const [wIterDone, setWIterDone] = useState(false);

  const runWageIter = useCallback(() => {
    const sigma = wIterSigma;
    const L = [wIterL1, wIterL2];
    const a = [wIterA1, wIterA2];
    const d = [[1, wIterD12], [wIterD21, 1]];
    let w = [1.0, 0.8];
    const hist = [];
    const mu = 0.5;
    for (let t = 0; t < 50; t++) {
      const norm = w[0];
      w = w.map(wi => wi / norm);
      const pi = Array.from({ length: 2 }, (_, i) =>
        Array.from({ length: 2 }, (_, j) => {
          const numer = (d[i][j] ** (1 - sigma)) * ((w[i] / a[i]) ** (1 - sigma));
          let denom = 0;
          for (let l = 0; l < 2; l++) denom += (d[l][j] ** (1 - sigma)) * ((w[l] / a[l]) ** (1 - sigma));
          return numer / denom;
        })
      );
      const S = w.map((wi, i) => wi * L[i]);
      const D = w.map((_, i) => {
        let d_ = 0;
        for (let j = 0; j < 2; j++) d_ += pi[i][j] * w[j] * L[j];
        return d_;
      });
      const err = Math.max(...D.map((di, i) => Math.abs(di / S[i] - 1)));
      hist.push({
        t, w1: w[0].toFixed(4), w2: w[1].toFixed(4),
        S1: S[0].toFixed(1), D1: D[0].toFixed(1),
        S2: S[1].toFixed(1), D2: D[1].toFixed(1),
        ratio1: (D[0] / S[0]).toFixed(4), ratio2: (D[1] / S[1]).toFixed(4),
        err: err.toFixed(6)
      });
      if (err < 1e-6) break;
      const wNew = w.map((wi, i) => {
        const proposed = (D[i] / S[i]) * wi;
        return (1 - mu) * wi + mu * proposed;
      });
      w = wNew;
    }
    setWIterHistory(hist);
    setWIterDone(true);
  }, [wIterSigma, wIterL1, wIterL2, wIterA1, wIterA2, wIterD12, wIterD21]);

  // Step-by-step iteration
  const [wStepHistory, setWStepHistory] = useState([]);
  const [wStepW, setWStepW] = useState([1.0, 0.8]);
  const [wStepDone, setWStepDone] = useState(false);

  const startWStep = () => {
    setWStepHistory([]);
    setWStepW([1.0, 0.8]);
    setWStepDone(false);
  };

  const nextWStep = () => {
    const sigma = wIterSigma;
    const L = [wIterL1, wIterL2];
    const a = [wIterA1, wIterA2];
    const dMat = [[1, wIterD12], [wIterD21, 1]];
    const mu = 0.5;
    let w = [...wStepW];
    const norm = w[0];
    w = w.map(wi => wi / norm);
    const pi = Array.from({ length: 2 }, (_, i) =>
      Array.from({ length: 2 }, (_, j) => {
        const numer = (dMat[i][j] ** (1 - sigma)) * ((w[i] / a[i]) ** (1 - sigma));
        let denom = 0;
        for (let l = 0; l < 2; l++) denom += (dMat[l][j] ** (1 - sigma)) * ((w[l] / a[l]) ** (1 - sigma));
        return numer / denom;
      })
    );
    const S = w.map((wi, i) => wi * L[i]);
    const D = w.map((_, i) => {
      let d_ = 0;
      for (let j = 0; j < 2; j++) d_ += pi[i][j] * w[j] * L[j];
      return d_;
    });
    const err = Math.max(...D.map((di, i) => Math.abs(di / S[i] - 1)));
    const newEntry = {
      t: wStepHistory.length,
      w1: w[0].toFixed(4), w2: w[1].toFixed(4),
      S1: S[0].toFixed(1), D1: D[0].toFixed(1), ratio1: (D[0] / S[0]).toFixed(4),
      S2: S[1].toFixed(1), D2: D[1].toFixed(1), ratio2: (D[1] / S[1]).toFixed(4),
      err: err.toFixed(6)
    };
    setWStepHistory(prev => [...prev, newEntry]);
    if (err < 1e-6) { setWStepDone(true); return; }
    const wNew = w.map((wi, i) => {
      const proposed = (D[i] / S[i]) * wi;
      return (1 - mu) * wi + mu * proposed;
    });
    setWStepW(wNew);
  };

  // Dampening calculator
  const [dampCurrent, setDampCurrent] = useState(1.0);
  const [dampProposed, setDampProposed] = useState(1.15);
  const [dampMu, setDampMu] = useState(0.5);
  const dampResult = (1 - dampMu) * dampCurrent + dampMu * dampProposed;

  // Newton's method
  const [newtonX, setNewtonX] = useState(3.5);
  const [newtonIter, setNewtonIter] = useState(0);
  const newtonF = x => -1 + 0.1 * Math.pow(x, 3);
  const newtonFp = x => 0.3 * Math.pow(x, 2);
  const xRange = Array.from({ length: 100 }, (_, i) => -4 + i * 0.12);
  const fVals = xRange.map(newtonF);
  let newtonCurrent = newtonX;
  for (let i = 0; i < newtonIter; i++) {
    newtonCurrent = newtonCurrent - newtonF(newtonCurrent) / newtonFp(newtonCurrent);
  }
  const newtonNext = newtonCurrent - newtonF(newtonCurrent) / newtonFp(newtonCurrent);
  const tangentX = [newtonCurrent - 2, newtonCurrent + 2];
  const tangentY = tangentX.map(x => newtonF(newtonCurrent) + newtonFp(newtonCurrent) * (x - newtonCurrent));

  // ── 3.6 Hat Algebra State ─────────────────────────────────────────────────
  const [hatBaseline, setHatBaseline] = useState(1.2);
  const [hatNew, setHatNew] = useState(1.08);
  const hatVal = hatNew / hatBaseline;
  const hatPct = ((hatVal - 1) * 100).toFixed(1);

  // Hat price index (3 origins)
  const [hpiPi1, setHpiPi1] = useState(0.5); const [hpiDhat1, setHpiDhat1] = useState(0.9); const [hpiWhat1, setHpiWhat1] = useState(1.0);
  const [hpiPi2, setHpiPi2] = useState(0.3); const [hpiDhat2, setHpiDhat2] = useState(1.0); const [hpiWhat2, setHpiWhat2] = useState(1.05);
  const [hpiPi3, setHpiPi3] = useState(0.2); const [hpiDhat3, setHpiDhat3] = useState(1.0); const [hpiWhat3, setHpiWhat3] = useState(1.02);
  const [hpiSigma, setHpiSigma] = useState(4);

  const hpiSum = hpiPi1 * Math.pow(hpiDhat1 * hpiWhat1, 1 - hpiSigma)
              + hpiPi2 * Math.pow(hpiDhat2 * hpiWhat2, 1 - hpiSigma)
              + hpiPi3 * Math.pow(hpiDhat3 * hpiWhat3, 1 - hpiSigma);
  const hpiPhat = hpiSum > 0 ? Math.pow(hpiSum, 1 / (1 - hpiSigma)) : 0;

  // Hat trade share
  const [htsDhat, setHtsDhat] = useState(0.9);
  const [htsWhat, setHtsWhat] = useState(1.0);
  const [htsPhat, setHtsPhat] = useState(0.95);
  const [htsSigma, setHtsSigma] = useState(4);
  const htsPiHat = Math.pow(htsDhat * htsWhat, 1 - htsSigma) / Math.pow(htsPhat, 1 - htsSigma);

  // Policy shock (before/after)
  const [psBasePi11, setPsBasePi11] = useState(0.60);
  const [psBasePi21, setPsBasePi21] = useState(0.25);
  const [psBasePi31, setPsBasePi31] = useState(0.15);
  const [psDhatHF, setPsDhatHF] = useState(0.85);
  const [psSigmaPs, setPsSigmaPs] = useState(4);

  const psDhat = [psDhatHF, 1.0, 1.0];
  const psNewPiSum = psBasePi11 * Math.pow(psDhat[0], 1 - psSigmaPs)
                   + psBasePi21 * Math.pow(psDhat[1], 1 - psSigmaPs)
                   + psBasePi31 * Math.pow(psDhat[2], 1 - psSigmaPs);
  const psPhat = Math.pow(psNewPiSum, 1 / (1 - psSigmaPs));
  const psNewPi1 = psBasePi11 * Math.pow(psDhat[0], 1 - psSigmaPs) / psNewPiSum;
  const psNewPi2 = psBasePi21 / psNewPiSum;
  const psNewPi3 = psBasePi31 / psNewPiSum;

  // ── 3.7 GFT State ─────────────────────────────────────────────────────────
  const [gftWhat, setGftWage] = useState(1.05);
  const [gftPhat, setGftPrice] = useState(1.02);
  const gftUhat = gftWhat / gftPhat;

  const [gftPiNN, setGftPiNN] = useState(0.70);
  const [gftSigma, setGftSigma] = useState(5);
  const gftGFT = gftPiNN > 0 && gftPiNN < 1
    ? ((1 - Math.pow(gftPiNN, 1 / (1 - gftSigma))) * 100).toFixed(2)
    : '0.00';

  // ── Effects to rebuild Plotly graphs reactively ──
  useEffect(() => {
    if (moduleTab === 'sub1' && distGraphRef.current) {
      const distRange = Array.from({ length: 50 }, (_, i) => 200 + i * 200);
      const tradePredLine = distRange.map(d => (gravGDPi ** gravAlpha) * (gravGDPj ** gravBeta) / (d ** gravGamma));
      
      const trace = {
        x: distRange,
        y: tradePredLine,
        mode: 'lines',
        name: 'Predicted Trade',
        line: { color: '#7c3aed', width: 3 },
        hovertemplate: '<b>Distance:</b> %{x} km<br><b>Trade:</b> %{y:.0f}<extra></extra>'
      };

      const layout = {
        title: { text: '<b>Gravity Prediction: Trade Falls with Distance</b>', font: { color: textColor, size: 13 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 60, r: 40, t: 40, b: 50 },
        xaxis: { title: 'Distance between countries (km)', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, gridcolor: gridColor },
        yaxis: { title: 'Predicted trade index', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, gridcolor: gridColor }
      };

      Plotly.newPlot(distGraphRef.current, [trace], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, gravGDPi, gravGDPj, gravAlpha, gravBeta, gravGamma, textColor, gridColor]);

  useEffect(() => {
    if (moduleTab === 'sub1' && sizeGraphRef.current) {
      const sizeGDPs = [
        { label: 'Small × Small', gdpi: 100, gdpj: 100 },
        { label: 'Large × Small', gdpi: 1000, gdpj: 100 },
        { label: 'Small × Large', gdpi: 100, gdpj: 1000 },
        { label: 'Large × Large', gdpi: 1000, gdpj: 1000 },
      ];
      const sizeVals = sizeGDPs.map(s => (s.gdpi ** gravAlpha) * (s.gdpj ** gravBeta) / (gravDist ** gravGamma));

      const trace = {
        x: sizeGDPs.map(s => s.label),
        y: sizeVals,
        type: 'bar',
        marker: { color: ['#94a3b8', '#3b82f6', '#3b82f6', '#7c3aed'], opacity: 0.85 },
        hovertemplate: '<b>%{x}</b><br>Trade Index: %{y:.0f}<extra></extra>'
      };

      const layout = {
        title: { text: '<b>Economic Size Pulls Trade Upward</b>', font: { color: textColor, size: 13 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 60, r: 40, t: 40, b: 50 },
        xaxis: { title: 'Trade Pair Type', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, gridcolor: gridColor },
        yaxis: { title: 'Predicted trade index', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, gridcolor: gridColor }
      };

      Plotly.newPlot(sizeGraphRef.current, [trace], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, gravAlpha, gravBeta, gravDist, textColor, gridColor]);

  useEffect(() => {
    if (moduleTab === 'sub3' && icebergGraphRef.current) {
      const iceRange = Array.from({ length: 30 }, (_, i) => 1 + i * 0.1);
      const iceShipLine = iceRange.map(d => d);

      const traceLine = {
        x: iceRange,
        y: iceShipLine,
        mode: 'lines',
        name: 'Requirement',
        line: { color: '#7c3aed', width: 2.5 },
        hovertemplate: '<b>d_ij:</b> %{x:.2f}<br><b>Units to Ship:</b> %{y:.2f}<extra></extra>'
      };

      const traceMarker = {
        x: [iceDij],
        y: [iceDij],
        mode: 'markers',
        name: 'Current setting',
        marker: { size: 12, color: '#f59e0b', symbol: 'star' },
        hovertemplate: `<b>d_ij: ${iceDij}</b><br>Ship ${iceDij} for 1 delivered<extra></extra>`
      };

      const layout = {
        title: { text: '<b>Iceberg Trade Costs: Units Shipped per Unit Arrived</b>', font: { color: textColor, size: 13 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 60, r: 40, t: 40, b: 50 },
        xaxis: { title: 'Trade cost d_ij', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, gridcolor: gridColor },
        yaxis: { title: 'Units shipped for 1 unit to arrive', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, gridcolor: gridColor },
        showlegend: false
      };

      Plotly.newPlot(icebergGraphRef.current, [traceLine, traceMarker], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, iceDij, textColor, gridColor]);

  useEffect(() => {
    if (moduleTab === 'sub3' && cesGraphRef.current) {
      const trace = {
        x: ['Home variety', 'Foreign variety'],
        y: [Number(cesShareH), Number(cesShareF)],
        type: 'bar',
        marker: { color: ['#3b82f6', '#7c3aed'], opacity: 0.85 },
        hovertemplate: '<b>%{x}</b><br>Spending share: %{y:.1f}%<extra></extra>'
      };

      const layout = {
        title: { text: '<b>CES Demand: Spending Shares by Origin</b>', font: { color: textColor, size: 13 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 60, r: 40, t: 40, b: 50 },
        xaxis: { title: 'Origin Variety', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 } },
        yaxis: { title: 'Spending share (%)', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, range: [0, 100], gridcolor: gridColor }
      };

      Plotly.newPlot(cesGraphRef.current, [trace], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, cesShareH, cesShareF, textColor, gridColor]);

  useEffect(() => {
    if (moduleTab === 'sub3' && tsGraphRef.current) {
      const trace = {
        x: ['Home', 'Foreign', 'Rest of World'],
        y: [Number(tsPi1), Number(tsPi2), Number(tsPi3)],
        type: 'bar',
        marker: { color: ['#3b82f6', '#7c3aed', '#10b981'], opacity: 0.85 },
        hovertemplate: '<b>%{x}</b><br>Trade share: %{y:.1f}%<extra></extra>'
      };

      const layout = {
        title: { text: '<b>Destination Spending Shares by Origin</b>', font: { color: textColor, size: 13 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 60, r: 40, t: 40, b: 50 },
        xaxis: { title: 'Origin country', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 } },
        yaxis: { title: 'Spending share (%)', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, range: [0, 100], gridcolor: gridColor }
      };

      Plotly.newPlot(tsGraphRef.current, [trace], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, tsPi1, tsPi2, tsPi3, textColor, gridColor]);

  useEffect(() => {
    if (moduleTab === 'sub5' && wageIterGraphRef.current && wIterHistory.length > 1) {
      const traceWage = {
        x: wIterHistory.map(r => r.t),
        y: wIterHistory.map(r => Number(r.w2)),
        mode: 'lines+markers',
        name: 'w₂ (Foreign)',
        line: { color: '#7c3aed', width: 2 },
        marker: { size: 5 },
        hovertemplate: 'Iter %{x}<br>w₂ = %{y:.4f}<extra></extra>'
      };

      const traceErr = {
        x: wIterHistory.map(r => r.t),
        y: wIterHistory.map(r => Number(r.err)),
        mode: 'lines+markers',
        name: 'Max error',
        line: { color: '#f59e0b', width: 2 },
        marker: { size: 5 },
        yaxis: 'y2',
        hovertemplate: 'Iter %{x}<br>Error = %{y:.6f}<extra></extra>'
      };

      const layout = {
        title: { text: '<b>Wage Iteration Toward Equilibrium</b>', font: { color: textColor, size: 13 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 60, r: 60, t: 40, b: 50 },
        xaxis: { title: 'Iteration', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, gridcolor: gridColor },
        yaxis: { title: 'Foreign wage w₂ (Home = 1)', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, gridcolor: gridColor },
        yaxis2: { title: 'Max error', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, overlaying: 'y', side: 'right', gridcolor: 'transparent' },
        showlegend: true,
        legend: { font: { color: textColor, size: 9 }, bgcolor: 'transparent', x: 0.5, y: 1.1, orientation: 'h' }
      };

      Plotly.newPlot(wageIterGraphRef.current, [traceWage, traceErr], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, wIterHistory, textColor, gridColor]);

  useEffect(() => {
    if (moduleTab === 'sub5' && newtonGraphRef.current) {
      const traceF = {
        x: xRange,
        y: fVals,
        mode: 'lines',
        name: 'f(x) = −1 + 0.1x³',
        line: { color: '#3b82f6', width: 2.5 },
        hovertemplate: 'x = %{x:.2f}<br>f(x) = %{y:.3f}<extra></extra>'
      };

      const traceZero = {
        x: [Math.min(...xRange), Math.max(...xRange)],
        y: [0, 0],
        mode: 'lines',
        name: 'y = 0',
        line: { color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', width: 1, dash: 'dot' },
        hoverinfo: 'skip'
      };

      const traceTangent = {
        x: tangentX,
        y: tangentY,
        mode: 'lines',
        name: 'Tangent',
        line: { color: '#f59e0b', width: 2, dash: 'dash' },
        hovertemplate: 'Tangent: y = %{y:.3f}<extra></extra>'
      };

      const traceCurrent = {
        x: [newtonCurrent],
        y: [newtonF(newtonCurrent)],
        mode: 'markers',
        name: 'Current guess x(t)',
        marker: { size: 12, color: '#f59e0b', symbol: 'star' },
        hovertemplate: `x(t) = ${newtonCurrent.toFixed(4)}<extra></extra>`
      };

      const traceNext = {
        x: [newtonNext],
        y: [0],
        mode: 'markers',
        name: 'Next guess x(t+1)',
        marker: { size: 10, color: '#10b981', symbol: 'diamond' },
        hovertemplate: `x(t+1) = ${newtonNext.toFixed(4)}<extra></extra>`
      };

      const layout = {
        title: { text: "<b>Newton's Method: Tangent Step</b>", font: { color: textColor, size: 13 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 60, r: 40, t: 40, b: 50 },
        xaxis: { title: 'x', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, gridcolor: gridColor },
        yaxis: { title: 'f(x)', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, gridcolor: gridColor },
        showlegend: true,
        legend: { font: { color: textColor, size: 9 }, bgcolor: 'transparent', x: 0.02, y: 0.98 }
      };

      Plotly.newPlot(newtonGraphRef.current, [traceF, traceZero, traceTangent, traceCurrent, traceNext], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, newtonX, newtonIter, newtonCurrent, newtonNext, tangentX, tangentY, textColor, gridColor, isDark]);

  useEffect(() => {
    if (moduleTab === 'sub6' && policyGraphRef.current) {
      const traceBefore = {
        x: ['Home', 'Foreign', 'Rest of World'],
        y: [psBasePi11 * 100, psBasePi21 * 100, psBasePi31 * 100],
        type: 'bar',
        name: 'Before shock',
        marker: { color: 'rgba(59,130,246,0.6)' },
        hovertemplate: 'Before: %{y:.1f}%<extra></extra>'
      };

      const traceAfter = {
        x: ['Home', 'Foreign', 'Rest of World'],
        y: [psNewPi1 * 100, psNewPi2 * 100, psNewPi3 * 100],
        type: 'bar',
        name: 'After shock',
        marker: { color: 'rgba(124,58,237,0.95)' },
        hovertemplate: 'After: %{y:.1f}%<extra></extra>'
      };

      const layout = {
        title: { text: '<b>Bilateral Policy Shock Trade Share Effects</b>', font: { color: textColor, size: 13 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 60, r: 40, t: 40, b: 50 },
        xaxis: { title: 'Origin country', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 } },
        yaxis: { title: 'Trade Share (%)', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, gridcolor: gridColor },
        barmode: 'group',
        showlegend: true,
        legend: { font: { color: textColor, size: 9 }, bgcolor: 'transparent', x: 0.6, y: 0.98 }
      };

      Plotly.newPlot(policyGraphRef.current, [traceBefore, traceAfter], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, psBasePi11, psBasePi21, psBasePi31, psNewPi1, psNewPi2, psNewPi3, textColor, gridColor]);

  useEffect(() => {
    if (moduleTab === 'sub7' && gftGraphRef.current) {
      const piNNRange = Array.from({ length: 50 }, (_, i) => 0.05 + i * 0.018);
      const gftCurve = piNNRange.map(pnn => (1 - Math.pow(pnn, 1 / (1 - gftSigma))) * 100);

      const traceLine = {
        x: piNNRange,
        y: gftCurve,
        mode: 'lines',
        name: 'GFT curve',
        line: { color: '#7c3aed', width: 3 },
        hovertemplate: 'π_nn = %{x:.2f}<br>GFT = %{y:.2f}%<extra></extra>'
      };

      const traceMarker = {
        x: [gftPiNN],
        y: [Number(gftGFT)],
        mode: 'markers',
        name: 'Current openness',
        marker: { size: 12, color: '#f59e0b', symbol: 'star' },
        hovertemplate: `π_nn = ${gftPiNN.toFixed(2)}<br>GFT = ${gftGFT}%<extra></extra>`
      };

      const layout = {
        title: { text: '<b>Gains from Trade and Domestic Expenditure Share</b>', font: { color: textColor, size: 13 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 60, r: 40, t: 40, b: 50 },
        xaxis: { title: 'Domestic expenditure share π_nn', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, range: [0.05, 0.99], gridcolor: gridColor },
        yaxis: { title: 'Gains from trade (%)', titlefont: { color: textColor, size: 10 }, tickfont: { color: textColor, size: 9 }, gridcolor: gridColor },
        showlegend: false
      };

      Plotly.newPlot(gftGraphRef.current, [traceLine, traceMarker], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, gftPiNN, gftSigma, gftGFT, textColor, gridColor]);

  // ── CSS Style mappings ──
  const card = { marginBottom: '32px', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)' };
  const formulaBox = { padding: '14px 18px', borderRadius: '8px', background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)', fontFamily: 'monospace', fontSize: '1rem', margin: '12px 0', lineHeight: 1.7 };
  const noticeBox = { padding: '14px 18px', borderRadius: '8px', background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '14px', fontSize: '0.9rem' };
  const graphDesc = { fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '8px' };
  const sliderRow = { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', fontSize: '0.9rem' };
  const sliderLabel = { minWidth: '200px', color: 'var(--text-secondary)' };
  const resultBox = { padding: '14px 18px', borderRadius: '8px', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', marginTop: '12px' };
  const meansBox = { padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', fontSize: '0.88rem', lineHeight: 1.8 };

  return (
    <div className="container" style={{ padding: '40px 24px' }}>

      {/* ── Header ── */}
      <div className="module-header">
        <button onClick={() => setActiveTab('home')} className="back-btn">
          <span>← Back to Course Path</span>
        </button>
        <div className="module-title-row">
          <div>
            <span style={{ color: '#7c3aed', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Module 3
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '4px' }}>GRAVITY with Gravitas</h2>
          </div>
        </div>
      </div>

      {/* ── Submodule Navigation ── */}
      <div className="module-sections-nav" style={{ overflowX: 'auto' }}>
        {[
          ['sub1', '3.1 Basic Gravity'],
          ['sub2', '3.2 Structural Gravity'],
          ['sub3', '3.3 Armington Model'],
          ['sub4', '3.4 General Equilibrium'],
          ['sub5', '3.5 Numerical Simulation'],
          ['sub6', '3.6 Hat Algebra'],
          ['sub7', '3.7 Gains from Trade'],
          ['quiz', 'Final Quiz'],
        ].map(([key, label]) => (
          <button key={key} onClick={() => setModuleTab(key)}
            className={`tab-btn ${moduleTab === key ? 'active' : ''}`}>
            {label}
          </button>
        ))}
      </div>

      {/* ═══ SUBMODULE 3.1: The Basic Gravity Equation ═══════════════════ */}
      {moduleTab === 'sub1' && (
        <div>
          {/* Opening Intro */}
          <div className="lesson-card" style={{ borderLeft: '4px solid #7c3aed' }}>
            <h3 style={{ color: '#7c3aed' }}>Why Gravity Matters</h3>
            <p>
              <strong>Module 1: Trade and Technology</strong> showed how technology differences create comparative advantage.
              <strong> Module 2: Trade and Resources</strong> showed how resource differences drive trade.
              Now, <strong>Module 3</strong> introduces one of the most robust empirical patterns in all of economics: <strong>the gravity model of trade</strong>.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', margin: '16px 0' }}>
              <div style={meansBox}><strong>📦 Size matters:</strong><br/>Big economies trade more</div>
              <div style={meansBox}><strong>📏 Distance matters:</strong><br/>Farther apart = less trade</div>
              <div style={meansBox}><strong>🌐 Policy matters:</strong><br/>Tariffs and borders reduce trade</div>
              <div style={meansBox}><strong>📊 Welfare matters:</strong><br/>Trade gains can be measured</div>
            </div>
            <p>
              <strong>Opening question:</strong> Why does Bangladesh trade more with some countries than others?
            </p>
            <p>
              In physics, bigger objects exert a stronger pull, and distance weakens that pull. In trade,
              the same logic holds: <em>bigger economies trade more, and distance or trade barriers weaken trade.</em>
            </p>
            <TutorTip tip="Gravity in trade is not about planets. It is about economic size pulling trade flows, while distance and barriers weaken them." />
          </div>

          {/* Lesson 1 */}
          <div className="lesson-card" id="m3-lesson1">
            <h3>Lesson 1: What Is the Gravity Equation?</h3>
            <p>
              The gravity equation predicts that trade between two countries is proportional to their economic sizes and inversely proportional to the distance between them.
            </p>
            <div style={formulaBox}>
              <strong>Trade<sub>ij</sub> = (GDP<sub>i</sub>)<sup>α</sup> × (GDP<sub>j</sub>)<sup>β</sup> / (Distance<sub>ij</sub>)<sup>γ</sup></strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', margin: '12px 0' }}>
              {[
                ['Trade_ij', 'Trade from country i to country j'],
                ['GDP_i', 'Economic size of exporter'],
                ['GDP_j', 'Economic size of importer'],
                ['Distance_ij', 'Distance between the two countries'],
                ['α, β, γ', 'Elasticities (typically estimated to be close to 1)'],
              ].map(([sym, def]) => (
                <div key={sym} style={meansBox}><strong>{sym}</strong><br/><span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{def}</span></div>
              ))}
            </div>

            <h4 style={{ marginTop: '20px' }}>🧮 Interactive Calculator: Basic Gravity Prediction</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', margin: '12px 0' }}>
              <div>
                {[
                  ['Exporter GDP (GDP_i)', gravGDPi, setGravGDPi, 50, 2000, 10],
                  ['Importer GDP (GDP_j)', gravGDPj, setGravGDPj, 50, 2000, 10],
                  ['Distance (km)', gravDist, setGravDist, 100, 15000, 100],
                  ['Exporter elasticity α', gravAlpha, setGravAlpha, 0.1, 2.0, 0.1],
                  ['Importer elasticity β', gravBeta, setGravBeta, 0.1, 2.0, 0.1],
                  ['Distance elasticity γ', gravGamma, setGravGamma, 0.1, 2.5, 0.1],
                ].map(([label, val, setter, min, max, step]) => (
                  <div key={label} style={sliderRow}>
                    <span style={sliderLabel}>{label}:</span>
                    <input type="range" min={min} max={max} step={step} value={val} onChange={e => setter(Number(e.target.value))} style={{ flex: 1 }} />
                    <span style={{ minWidth: '60px', textAlign: 'right', fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={resultBox}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Predicted trade index:</p>
                <p style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--accent-success)' }}>{gravPred.toFixed(0)}</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  A larger exporter or importer GDP pulls trade up, while larger distance pushes it down.
                </p>
              </div>
            </div>

            <h4 style={{ marginTop: '20px' }}>📊 Gravity Prediction: Trade Falls with Distance</h4>
            <p style={graphDesc}><strong>What this graph shows:</strong> This graph keeps economic size fixed and shows what happens when distance changes.</p>
            <div ref={distGraphRef} style={{ height: '300px', width: '100%' }}></div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> Trade falls as distance increases. The larger γ is, the faster trade falls.
            </div>
          </div>

          {/* Lesson 2 */}
          <div className="lesson-card" id="m3-lesson2">
            <h3>Lesson 2: Economic Size of Origin and Destination</h3>
            <p>
              Trade has two sides: the exporter must be able to produce and sell (production capacity), and the importer must be able to buy and spend (spending capacity).
            </p>

            <h4 style={{ marginTop: '20px' }}>📊 Size and Trade</h4>
            <p style={graphDesc}><strong>What this graph shows:</strong> Predicted trade levels for different combinations of small and large country pairs.</p>
            <div ref={sizeGraphRef} style={{ height: '300px', width: '100%' }}></div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> Trade is highest when both the exporter and importer are economically large.
            </div>
          </div>

          {/* Lesson 3 */}
          <div className="lesson-card" id="m3-lesson3">
            <h3>Lesson 3: Distance and Trade Barriers</h3>
            <p>
              Distance reduces trade because of shipping costs, delivery times, risks, and communication barriers.
              Friction is not just physical distance; it also includes tariffs, border checks, language differences, and currency barriers.
            </p>
            <TutorTip tip="Gravity models often include dummy variables for common border, common language, and free trade agreements to capture these non-distance barriers." />

            <div className="micro-quiz-card" style={{ marginTop: '16px' }}>
              <h4>💡 Check Your Understanding</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '8px' }}>
                Why does Bangladesh trade more with India than with Brazil, even though Brazil's GDP is larger?
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                Answer: Geographic proximity. India shares a massive land border with Bangladesh, reducing transport costs and time, whereas Brazil is geographically very distant.
              </p>
            </div>
          </div>

          {/* Lesson 4 */}
          <div className="lesson-card" id="m3-lesson4">
            <h3>Lesson 4: Naive Gravity Regression</h3>
            <p>
              Naive gravity is the standard log-linear regression used to estimate gravity elasticities before structural corrections were introduced.
            </p>
            <div style={formulaBox}>
              <strong>ln X<sub>ij</sub> = α ln Y<sub>i</sub> + β ln Y<sub>j</sub> + γ ln distance<sub>ij</sub> + ε<sub>ij</sub></strong>
            </div>

            <h4 style={{ marginTop: '16px' }}>🧮 Naive Gravity Regression Calculator</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', margin: '12px 0' }}>
              <div>
                {[
                  ['α (Exporter GDP elasticity)', naiveAlpha, setNaiveAlpha, 0.5, 1.5, 0.1],
                  ['β (Importer GDP elasticity)', naiveBeta, setNaiveBeta, 0.5, 1.5, 0.1],
                  ['γ (Distance elasticity)', naiveGamma, setNaiveGamma, -2.0, -0.2, 0.1],
                  ['Exporter GDP Y_i', naiveGDPi, setNaiveGDPi, 100, 1000, 50],
                  ['Importer GDP Y_j', naiveGDPj, setNaiveGDPj, 100, 1000, 50],
                  ['Distance', naiveDist, setNaiveDist, 500, 10000, 500],
                ].map(([label, val, setter, min, max, step]) => (
                  <div key={label} style={sliderRow}>
                    <span style={sliderLabel}>{label}:</span>
                    <input type="range" min={min} max={max} step={step} value={val} onChange={e => setter(Number(e.target.value))} style={{ flex: 1 }} />
                    <span style={{ minWidth: '60px', textAlign: 'right', fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={resultBox}>
                <p>Predicted Log Trade (ln X): <strong>{naiveLnX.toFixed(3)}</strong></p>
                <p>Predicted Trade Level: <strong>{naiveX.toFixed(1)}</strong></p>
              </div>
            </div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> If γ is negative, increasing distance lowers predicted trade. Using logs lets economists interpret coefficients as percentage elasticities.
            </div>
          </div>
        </div>
      )}

      {/* ═══ SUBMODULE 3.2: From Naive Gravity to Structural Gravity ════ */}
      {moduleTab === 'sub2' && (
        <div>
          <div className="lesson-card" style={{ borderLeft: '4px solid #7c3aed' }}>
            <h3 style={{ color: '#7c3aed' }}>Submodule 3.2: From Naive Gravity to Structural Gravity</h3>
            <p>
              Naive gravity is useful but theoretically incomplete. Bilateral trade between two countries depends on their options relative to the rest of the world.
            </p>
          </div>

          {/* Lesson 5 */}
          <div className="lesson-card" id="m3-lesson5">
            <h3>Lesson 5: Why Naive Gravity Is Not Enough</h3>
            <p>
              Bilateral trade depends not just on the distance between Home and Foreign, but on how easily Home can sell to everyone else,
              and how easily Foreign can buy from everyone else.
            </p>
            <TutorTip tip="Bilateral trade depends on the pair, but also on everyone else around the pair. Ignoring these options causes severe biases in policy simulations." />
          </div>

          {/* Lesson 6 */}
          <div className="lesson-card" id="m3-lesson6">
            <h3>Lesson 6: Structural Gravity Equation</h3>
            <p>
              The structural gravity equation derived by Anderson &amp; van Wincoop (2003) corrects this by adding multilateral resistance terms:
            </p>
            <div style={formulaBox}>
              <strong>X<sub>ij</sub> = (Y<sub>i</sub> / Ω<sub>i</sub>) × (X<sub>j</sub> / Φ<sub>j</sub>) × δ<sub>ij</sub></strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={meansBox}><strong>δ<sub>ij</sub>:</strong> Bilateral trade cost/accessibility</div>
              <div style={meansBox}><strong>Ω<sub>i</sub>:</strong> Outward resistance (how hard it is for exporter i to sell to all markets)</div>
              <div style={meansBox}><strong>Φ<sub>j</sub>:</strong> Inward resistance (how hard it is for importer j to buy from all sources)</div>
            </div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> Structural gravity keeps the direct exporter-importer link but also includes the rest of the world.
            </div>
          </div>

          {/* Lesson 7 */}
          <div className="lesson-card" id="m3-lesson7">
            <h3>Lesson 7: Multilateral Resistance in Plain Language</h3>
            <p>
              Multilateral resistance means trade between two countries depends on their alternatives.
              If Foreign is close to Home but even closer to a massive alternative market, Foreign may buy more from that alternative, reducing trade with Home.
            </p>

            <h4 style={{ marginTop: '16px' }}>🧮 Interactive Thought Experiment</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', margin: '12px 0' }}>
              <div>
                {[
                  ['Home-Foreign bilateral cost', mrHomeFgn, setMrHomeFgn, 1.0, 3.0, 0.1],
                  ["Home's avg trade cost to world", mrHomeWorld, setMrHomeWorld, 1.0, 3.0, 0.1],
                  ["Foreign's avg trade cost to world", mrFgnWorld, setMrFgnWorld, 1.0, 3.0, 0.1],
                ].map(([label, val, setter, min, max, step]) => (
                  <div key={label} style={sliderRow}>
                    <span style={sliderLabel}>{label}:</span>
                    <input type="range" min={min} max={max} step={step} value={val} onChange={e => setter(Number(e.target.value))} style={{ flex: 1 }} />
                    <span style={{ minWidth: '60px', textAlign: 'right', fontWeight: 600 }}>{val.toFixed(1)}</span>
                  </div>
                ))}
              </div>
              <div style={resultBox}>
                <p>Structural trade attractiveness: <strong>{bilateralAttractive.toFixed(3)}</strong></p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  {bilateralAttractive > 0.6 ? 'High relative appeal' : 'Low relative appeal due to better external options'}
                </p>
              </div>
            </div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> A country pair may trade less if one side has better trading alternatives elsewhere.
            </div>
          </div>
        </div>
      )}

      {/* ═══ SUBMODULE 3.3: Armington Model Foundation ══════════════════ */}
      {moduleTab === 'sub3' && (
        <div>
          <div className="lesson-card" style={{ borderLeft: '4px solid #7c3aed' }}>
            <h3 style={{ color: '#7c3aed' }}>Submodule 3.3: Armington Model Foundation</h3>
            <p>
              The Armington model provides a clean microfoundation for structural gravity using origin-differentiated goods and CES consumer demand.
            </p>
          </div>

          {/* Lesson 8 */}
          <div className="lesson-card" id="m3-lesson8">
            <h3>Lesson 8: What Is the Armington Assumption?</h3>
            <p>
              The Armington assumption states that goods are differentiated by country of origin.
              French cheese, Swiss cheese, and American cheese are all cheese, but consumers treat them as different varieties.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', margin: '12px 0' }}>
              <div style={meansBox}>🧀 Home variety</div>
              <div style={meansBox}>🧀 Foreign variety</div>
              <div style={meansBox}>🧀 ROW variety</div>
            </div>
            <TutorTip tip="Armington means the country label matters. The origin of the good makes it a different variety in utility." />
          </div>

          {/* Lesson 9 */}
          <div className="lesson-card" id="m3-lesson9">
            <h3>Lesson 9: Iceberg Trade Costs</h3>
            <p>
              Iceberg trade cost is a visual way to represent transport loss. If d<sub>ij</sub> = 1.25, the exporter must ship 1.25 units for 1 unit to arrive.
              The extra 0.25 units melt away in transit.
            </p>

            <h4 style={{ marginTop: '16px' }}>🧮 Iceberg Costs Calculator</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', margin: '12px 0' }}>
              <div>
                {[
                  ['Desired arrival quantity', iceArrival, setIceArrival, 50, 500, 10],
                  ['Iceberg cost d_ij', iceDij, setIceDij, 1.0, 3.0, 0.1],
                ].map(([label, val, setter, min, max, step]) => (
                  <div key={label} style={sliderRow}>
                    <span style={sliderLabel}>{label}:</span>
                    <input type="range" min={min} max={max} step={step} value={val} onChange={e => setter(Number(e.target.value))} style={{ flex: 1 }} />
                    <span style={{ minWidth: '60px', textAlign: 'right', fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={resultBox}>
                <p>Units to ship: <strong>{iceShipped.toFixed(1)}</strong></p>
                <p>Units lost: <strong>{iceLost.toFixed(1)} ({icePctLoss}%)</strong></p>
              </div>
            </div>

            <h4 style={{ marginTop: '16px' }}>📊 Iceberg Trade Costs: Shipped vs Cost</h4>
            <div ref={icebergGraphRef} style={{ height: '300px', width: '100%' }}></div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> When d<sub>ij</sub> rises, the exporter must ship more for the same delivered amount.
            </div>
          </div>

          {/* Lesson 10 */}
          <div className="lesson-card" id="m3-lesson10">
            <h3>Lesson 10: Delivered Price</h3>
            <p>
              The consumer cares about the delivered price: p<sub>ij</sub> = p<sub>i</sub> × d<sub>ij</sub>.
              Since p<sub>i</sub> = w<sub>i</sub> / a<sub>i</sub>, productivity and wages directly determine the baseline price.
            </p>

            <h4 style={{ marginTop: '16px' }}>🧮 Delivered Price Calculator</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', margin: '12px 0' }}>
              <div>
                {[
                  ['Wage w_i', dpWage, setDpWage, 5, 25, 1],
                  ['Productivity a_i', dpProd, setDpProd, 0.5, 4.0, 0.1],
                  ['Trade cost d_ij', dpDij, setDpDij, 1.0, 2.5, 0.05],
                ].map(([label, val, setter, min, max, step]) => (
                  <div key={label} style={sliderRow}>
                    <span style={sliderLabel}>{label}:</span>
                    <input type="range" min={min} max={max} step={step} value={val} onChange={e => setter(Number(e.target.value))} style={{ flex: 1 }} />
                    <span style={{ minWidth: '60px', textAlign: 'right', fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={resultBox}>
                <p>Producer price p_i: <strong>{dpPi.toFixed(2)}</strong></p>
                <p>Delivered price p_ij: <strong>{dpPij.toFixed(2)}</strong></p>
              </div>
            </div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> A country can be productive, but high trade costs can still make its goods expensive in a destination.
            </div>
          </div>

          {/* Lesson 11 */}
          <div className="lesson-card" id="m3-lesson11">
            <h3>Lesson 11: CES Demand</h3>
            <p>
              CES (Constant Elasticity of Substitution) demand describes variety substitution:
            </p>
            <div style={formulaBox}>
              <strong>U<sub>j</sub> = [Σ<sub>i</sub> b<sub>ij</sub><sup>1/σ</sup> q<sub>ij</sub><sup>(σ-1)/σ</sup>]<sup>σ/(σ-1)</sup></strong>
            </div>

            <h4 style={{ marginTop: '16px' }}>🧮 Spending Shares under CES</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', margin: '12px 0' }}>
              <div>
                {[
                  ['Home wage', cesWh, setCesWh, 5, 25, 1],
                  ['Foreign wage', cesWf, setCesWf, 5, 25, 1],
                  ['Elasticity σ', cesSigma, setCesSigma, 1.5, 8.0, 0.5],
                ].map(([label, val, setter, min, max, step]) => (
                  <div key={label} style={sliderRow}>
                    <span style={sliderLabel}>{label}:</span>
                    <input type="range" min={min} max={max} step={step} value={val} onChange={e => setter(Number(e.target.value))} style={{ flex: 1 }} />
                    <span style={{ minWidth: '60px', textAlign: 'right', fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
              </div>
              <div ref={cesGraphRef} style={{ height: '280px', width: '100%' }}></div>
            </div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> When σ is high, a small price advantage can create a large spending-share advantage.
            </div>
          </div>

          {/* Lesson 12 */}
          <div className="lesson-card" id="m3-lesson12">
            <h3>Lesson 12: Price Index</h3>
            <p>
              The price index P<sub>j</sub> is the overall cost of accessing all available varieties in destination j:
            </p>
            <div style={formulaBox}>
              <strong>P<sub>j</sub> = [Σ<sub>i</sub> b<sub>ij</sub> p<sub>ij</sub><sup>1-σ</sup>]<sup>1/(1-σ)</sup></strong>
            </div>

            <h4 style={{ marginTop: '16px' }}>🧮 CES Price Index Calculator (3 Origins)</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div>
                <h5>Home</h5>
                <label>Wage: <input type="range" min={5} max={25} value={piW1} onChange={e => setPiW1(Number(e.target.value))} /></label>
                <label>Cost d: <input type="range" min={1} max={3} step={0.1} value={piD1} onChange={e => setPiD1(Number(e.target.value))} /></label>
              </div>
              <div>
                <h5>Foreign</h5>
                <label>Wage: <input type="range" min={5} max={25} value={piW2} onChange={e => setPiW2(Number(e.target.value))} /></label>
                <label>Cost d: <input type="range" min={1} max={3} step={0.1} value={piD2} onChange={e => setPiD2(Number(e.target.value))} /></label>
              </div>
              <div>
                <h5>Rest of World</h5>
                <label>Wage: <input type="range" min={5} max={25} value={piW3} onChange={e => setPiW3(Number(e.target.value))} /></label>
                <label>Cost d: <input type="range" min={1} max={3} step={0.1} value={piD3} onChange={e => setPiD3(Number(e.target.value))} /></label>
              </div>
            </div>
            <div style={resultBox}>
              <p>Price Index P_j: <strong>{priceIndex.toFixed(3)}</strong></p>
            </div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> The price index summarizes the cost of the whole consumption basket.
            </div>
          </div>

          {/* Lesson 13 */}
          <div className="lesson-card" id="m3-lesson13">
            <h3>Lesson 13: Trade Shares</h3>
            <p>
              The trade share π<sub>ij</sub> depends on productivity, wages, trade costs, and preferences relative to other suppliers.
            </p>

            <h4 style={{ marginTop: '16px' }}>📊 Spending Shares</h4>
            <div ref={tsGraphRef} style={{ height: '300px', width: '100%' }}></div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> Trade shares are relative. One origin’s share depends on all origins’ delivered prices.
            </div>
          </div>
        </div>
      )}

      {/* ═══ SUBMODULE 3.4: General Equilibrium in the Armington Model ══ */}
      {moduleTab === 'sub4' && (
        <div>
          <div className="lesson-card" style={{ borderLeft: '4px solid #7c3aed' }}>
            <h3 style={{ color: '#7c3aed' }}>Submodule 3.4: General Equilibrium in the Armington Model</h3>
            <p>
              In GE, wages adjust to clear labor markets worldwide.
            </p>
          </div>

          {/* Lesson 14 */}
          <div className="lesson-card" id="m3-lesson14">
            <h3>Lesson 14: Market Clearing</h3>
            <p>
              Market clearing requires that a country's total income matches total spending on its goods:
            </p>
            <div style={formulaBox}>
              <strong>w<sub>i</sub>L<sub>i</sub> = Σ<sub>j</sub> π<sub>ij</sub> w<sub>j</sub>L<sub>j</sub></strong>
            </div>
            <TutorTip tip="Market clearing asks whether world demand for a country's goods matches the income paid to its workers." />
          </div>

          {/* Lesson 15 */}
          <div className="lesson-card" id="m3-lesson15">
            <h3>Lesson 15: Labor Supply and Labor Demand</h3>
            <p>
              We can represent the labor market clearing as S<sub>i</sub>(w) = D<sub>i</sub>(w).
            </p>

            <h4 style={{ marginTop: '16px' }}>🧮 Interactive Simulation</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label>Home Wage guess w₁: <input type="range" min={5} max={25} value={mcW1} onChange={e => setMcW1(Number(e.target.value))} /></label>
                <label>Foreign Wage guess w₂: <input type="range" min={5} max={25} value={mcW2} onChange={e => setMcW2(Number(e.target.value))} /></label>
              </div>
              <div style={resultBox}>
                <p>Home Demand/Supply Ratio: <strong>{mcRatio1}</strong></p>
                <p>Foreign Demand/Supply Ratio: <strong>{mcRatio2}</strong></p>
              </div>
            </div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> Wages adjust because demand and supply are not automatically equal.
            </div>
          </div>
        </div>
      )}

      {/* ═══ SUBMODULE 3.5: Numerical Simulation and Newton's Method ═══ */}
      {moduleTab === 'sub5' && (
        <div>
          <div className="lesson-card" style={{ borderLeft: '4px solid #7c3aed' }}>
            <h3 style={{ color: '#7c3aed' }}>Submodule 3.5: Numerical Simulation and Newton's Method</h3>
            <p>
              Solving general equilibrium models requires numerical root-finding algorithms when analytical solutions are not possible.
            </p>
          </div>

          {/* Lesson 16 */}
          <div className="lesson-card" id="m3-lesson16">
            <h3>Lesson 16: Wage Iteration Algorithm</h3>
            <p>
              Wages are adjusted step-by-step using a contraction mapping iteration until excess labor demand disappears.
            </p>

            <div style={{ display: 'flex', gap: '12px', margin: '12px 0' }}>
              <button onClick={startWStep} className="hero-btn">Start Step-by-step</button>
              <button onClick={nextWStep} disabled={wStepDone} className="hero-btn" style={{ background: 'linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-primary) 100%)' }}>Next step</button>
              <button onClick={runWageIter} className="hero-btn" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>Run Full Sim</button>
            </div>

            <div ref={wageIterGraphRef} style={{ height: '320px', width: '100%' }}></div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> The algorithm keeps adjusting wages until labor demand and labor supply nearly match.
            </div>
          </div>

          {/* Lesson 17 */}
          <div className="lesson-card" id="m3-lesson17">
            <h3>Lesson 17: Dampening Parameter</h3>
            <p>
              Dampening prevents convergence oscillation by combining new proposed wages with old guesses:
              w(t+1) = (1 - μ)w(t) + μ × proposed update.
            </p>

            <h4 style={{ marginTop: '16px' }}>🧮 Dampening updates</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label>Proposed update: <input type="range" min={0.5} max={2.0} step={0.05} value={dampProposed} onChange={e => setDampProposed(Number(e.target.value))} /></label>
                <label>Dampening μ: <input type="range" min={0.1} max={1.0} step={0.05} value={dampMu} onChange={e => setDampMu(Number(e.target.value))} /></label>
              </div>
              <div style={resultBox}>
                <p>Updated wage: <strong>{dampResult.toFixed(3)}</strong></p>
              </div>
            </div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> Dampening reduces the chance that the algorithm jumps too far.
            </div>
          </div>

          {/* Lesson 18 & 19 */}
          <div className="lesson-card" id="m3-lesson19">
            <h3>Lesson 19: Newton's Method in Simple Words</h3>
            <p>
              Newton's method uses derivative slopes to search for function roots: x(t+1) = x(t) - f(x(t)) / f'(x(t)).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label>Starting guess: <input type="range" min={1.5} max={4.0} step={0.1} value={newtonX} onChange={e => { setNewtonX(Number(e.target.value)); setNewtonIter(0); }} /></label>
                <label>Iterations: <input type="range" min={0} max={5} step={1} value={newtonIter} onChange={e => setNewtonIter(Number(e.target.value))} /></label>
              </div>
              <div ref={newtonGraphRef} style={{ height: '340px', width: '100%' }}></div>
            </div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> Newton’s method uses the slope to choose a smarter next guess.
            </div>
          </div>
        </div>
      )}

      {/* ═══ SUBMODULE 3.6: Exact Hat Algebra ═══════════════════════════ */}
      {moduleTab === 'sub6' && (
        <div>
          <div className="lesson-card" style={{ borderLeft: '4px solid #7c3aed' }}>
            <h3 style={{ color: '#7c3aed' }}>Submodule 3.6: Exact Hat Algebra</h3>
            <p>
              Exact Hat Algebra allows economists to simulate policy changes using baseline trade shares without estimating all model levels.
            </p>
          </div>

          {/* Lesson 21 */}
          <div className="lesson-card" id="m3-lesson21">
            <h3>Lesson 21: What Is Exact Hat Algebra?</h3>
            <p>
              We define proportional changes using the hat notation: x̂ = x′ / x.
            </p>

            <h4 style={{ marginTop: '16px' }}>🧮 Hat value converter</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label>Baseline value: <input type="range" min={1.0} max={2.0} step={0.05} value={hatBaseline} onChange={e => setHatBaseline(Number(e.target.value))} /></label>
                <label>New value: <input type="range" min={0.8} max={1.5} step={0.05} value={hatNew} onChange={e => setHatNew(Number(e.target.value))} /></label>
              </div>
              <div style={resultBox}>
                <p>Proportional change x̂: <strong>{hatVal.toFixed(3)}</strong> ({hatPct}%)</p>
              </div>
            </div>
          </div>

          {/* Lesson 25 */}
          <div className="lesson-card" id="m3-lesson25">
            <h3>Lesson 25: Policy Shock Simulation</h3>
            <p>
              A trade agreement lowers Home's trade cost to Foreign (d̂<sub>HF</sub> &lt; 1).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label>Trade cost reduction d̂<sub>HF</sub>: <input type="range" min={0.5} max={1.0} step={0.05} value={psDhatHF} onChange={e => setPsDhatHF(Number(e.target.value))} /></label>
              </div>
              <div ref={policyGraphRef} style={{ height: '300px', width: '100%' }}></div>
            </div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> Trade cost reductions can change prices, trade shares, wages, and welfare at the same time.
            </div>
          </div>
        </div>
      )}

      {/* ═══ SUBMODULE 3.7: Gains from Trade in Gravity ══════════════════ */}
      {moduleTab === 'sub7' && (
        <div>
          <div className="lesson-card" style={{ borderLeft: '4px solid #7c3aed' }}>
            <h3 style={{ color: '#7c3aed' }}>Submodule 3.7: Gains from Trade in Gravity</h3>
            <p>
              The welfare benefits of trade can be measured using simple sufficient statistics.
            </p>
          </div>

          {/* Lesson 27 */}
          <div className="lesson-card" id="m3-lesson27">
            <h3>Lesson 27: Domestic Expenditure Share and Gains from Trade</h3>
            <p>
              The Arkolakis, Costinot, and Rodríguez-Clare (2012) formula proves that welfare gains are determined solely by
              the domestic expenditure share π<sub>nn</sub> and the elasticity of substitution σ:
            </p>
            <div style={formulaBox}>
              <strong>GFT<sub>n</sub> = 1 − π<sub>nn</sub><sup>1/(1-σ)</sup></strong>
            </div>

            <h4 style={{ marginTop: '16px' }}>🧮 GFT Calculator</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label>Domestic share π<sub>nn</sub>: <input type="range" min={0.1} max={0.99} step={0.01} value={gftPiNN} onChange={e => setGftPiNN(Number(e.target.value))} /></label>
                <label>Elasticity σ: <input type="range" min={2.0} max={10.0} step={0.5} value={gftSigma} onChange={e => setGftSigma(Number(e.target.value))} /></label>
              </div>
              <div style={resultBox}>
                <p>Gains from Trade: <strong>{gftGFT}%</strong></p>
              </div>
            </div>

            <div ref={gftGraphRef} style={{ height: '340px', width: '100%' }}></div>
            <div style={noticeBox}>
              <strong>🔎 What to notice:</strong> A lower domestic expenditure share usually means larger measured gains from trade.
            </div>
          </div>
        </div>
      )}

      {/* ═══ QUIZ TAB ═══════════════════════════════════════════════════ */}
      {moduleTab === 'quiz' && (
        <Module3Quiz />
      )}

    </div>
  );
}
