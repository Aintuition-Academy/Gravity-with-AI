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
  const wageIterRatioGraphRef = useRef(null);
  const dampGraphRef = useRef(null);
  const newtonGraphRef = useRef(null);
  const policySharesGraphRef = useRef(null);
  const policyPricesGraphRef = useRef(null);
  const policyWelfareGraphRef = useRef(null);
  const gftGraphRef = useRef(null);

  // ── 3.1 Basic Gravity State ───────────────────────────────────────────────
  const [gravGDPi, setGravGDPi] = useState(500);
  const [gravGDPj, setGravGDPj] = useState(300);
  const [gravDist, setGravDist] = useState(2000);
  const [gravAlpha, setGravAlpha] = useState(1.0);
  const [gravBeta, setGravBeta] = useState(1.0);
  const [gravGamma, setGravGamma] = useState(1.0);

  const gravPred = (gravGDPi ** gravAlpha) * (gravGDPj ** gravBeta) / (gravDist ** gravGamma);

  const resetBasicGravity = () => {
    setGravGDPi(500);
    setGravGDPj(300);
    setGravDist(2000);
    setGravAlpha(1.0);
    setGravBeta(1.0);
    setGravGamma(1.0);
  };

  // ── Naive Gravity State ────────────────────────────────────────────────────
  const [naiveAlpha, setNaiveAlpha] = useState(1.0);
  const [naiveBeta, setNaiveBeta] = useState(0.9);
  const [naiveGamma, setNaiveGamma] = useState(-1.0);
  const [naiveGDPi, setNaiveGDPi] = useState(500);
  const [naiveGDPj, setNaiveGDPj] = useState(300);
  const [naiveDist, setNaiveDist] = useState(2000);

  const naiveLnX = naiveAlpha * Math.log(naiveGDPi) + naiveBeta * Math.log(naiveGDPj) + naiveGamma * Math.log(naiveDist);
  const naiveX = Math.exp(naiveLnX);

  const resetNaiveGravity = () => {
    setNaiveAlpha(1.0);
    setNaiveBeta(0.9);
    setNaiveGamma(-1.0);
    setNaiveGDPi(500);
    setNaiveGDPj(300);
    setNaiveDist(2000);
  };

  // ── 3.2 Multilateral Resistance State ──────────────────────────────────────
  const [mrHomeFgn, setMrHomeFgn] = useState(1.2);
  const [mrHomeWorld, setMrHomeWorld] = useState(1.5);
  const [mrFgnWorld, setMrFgnWorld] = useState(1.1);
  const bilateralAttractive = (1 / mrHomeFgn) / ((mrHomeWorld + mrFgnWorld) / 2);

  const resetMR = () => {
    setMrHomeFgn(1.2);
    setMrHomeWorld(1.5);
    setMrFgnWorld(1.1);
  };

  // ── 3.3 Armington State ───────────────────────────────────────────────────
  // Iceberg
  const [iceArrival, setIceArrival] = useState(100);
  const [iceDij, setIceDij] = useState(1.3);
  const iceShipped = iceArrival * iceDij;
  const iceLost = iceShipped - iceArrival;
  const icePctLoss = ((iceLost / iceShipped) * 100).toFixed(1);

  const resetIceberg = () => {
    setIceArrival(100);
    setIceDij(1.3);
  };

  // Delivered price
  const [dpWage, setDpWage] = useState(10);
  const [dpProd, setDpProd] = useState(2);
  const [dpDij, setDpDij] = useState(1.25);
  const dpPi = dpWage / dpProd;
  const dpPij = dpPi * dpDij;

  const resetDeliveredPrice = () => {
    setDpWage(10);
    setDpProd(2);
    setDpDij(1.25);
  };

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

  const resetCES = () => {
    setCesWh(10);
    setCesWf(12);
    setCesBh(1.0);
    setCesBf(1.0);
    setCesSigma(4);
    setCesDh(1.0);
    setCesDf(1.0);
  };

  // Price index (3 origins)
  const [piW1, setPiW1] = useState(10); const [piA1, setPiA1] = useState(2); const [piD1, setPiD1] = useState(1.0); const [piB1, setPiB1] = useState(1.0);
  const [piW2, setPiW2] = useState(12); const [piA2, setPiA2] = useState(1.5); const [piD2, setPiD2] = useState(1.3); const [piB2, setPiB2] = useState(1.0);
  const [piW3, setPiW3] = useState(8);  const [piA3, setPiA3] = useState(1.8); const [piD3, setPiD3] = useState(1.5); const [piB3, setPiB3] = useState(0.8);
  const [piSigma, setPiSigma] = useState(4);

  const piTerm = (w, a, d, b) => b * (d ** (1 - piSigma)) * ((w / a) ** (1 - piSigma));
  const piSum = piTerm(piW1, piA1, piD1, piB1) + piTerm(piW2, piA2, piD2, piB2) + piTerm(piW3, piA3, piD3, piB3);
  const priceIndex = piSum > 0 ? Math.pow(piSum, 1 / (1 - piSigma)) : 0;

  const resetPriceIndex = () => {
    setPiW1(10); setPiA1(2); setPiD1(1.0); setPiB1(1.0);
    setPiW2(12); setPiA2(1.5); setPiD2(1.3); setPiB2(1.0);
    setPiW3(8);  setPiA3(1.8); setPiD3(1.5); setPiB3(0.8);
    setPiSigma(4);
  };

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

  const resetTradeShares = () => {
    setTsW1(10); setTsA1(2); setTsD1(1.0); setTsB1(1.0);
    setTsW2(12); setTsA2(1.5); setTsD2(1.3); setTsB2(1.0);
    setTsW3(8);  setTsA3(1.8); setTsD3(1.5); setTsB3(0.8);
    setTsSigma(4);
  };

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

  const resetMarketClearing = () => {
    setMcW1(10);
    setMcW2(12);
    setMcL1(100);
    setMcL2(150);
    setMcA1(2);
    setMcA2(1.5);
    setMcD12(1.3);
    setMcD21(1.3);
    setMcSigma(4);
  };

  // ── 3.5 Wage Iteration State ──────────────────────────────────────────────
  const [wIterSigma, setWIterSigma] = useState(4);
  const [wIterL1, setWIterL1] = useState(100); const [wIterL2, setWIterL2] = useState(150);
  const [wIterA1, setWIterA1] = useState(2.0); const [wIterA2, setWIterA2] = useState(1.5);
  const [wIterD12, setWIterD12] = useState(1.3); const [wIterD21, setWIterD21] = useState(1.3);
  const [wIterW1Init, setWIterW1Init] = useState(1.0); const [wIterW2Init, setWIterW2Init] = useState(0.8);
  const [wIterMu, setWIterMu] = useState(0.5);
  const [wIterTol, setWIterTol] = useState(1e-5);
  const [wIterMaxIt, setWIterMaxIt] = useState(30);

  const [wIterHistory, setWIterHistory] = useState([]);
  const [wIterDone, setWIterDone] = useState(false);
  const [wStepW, setWStepW] = useState([1.0, 0.8]);
  const [wStepDone, setWStepDone] = useState(false);

  const runWageIter = useCallback(() => {
    const sigma = wIterSigma;
    const L = [wIterL1, wIterL2];
    const a = [wIterA1, wIterA2];
    const d = [[1, wIterD12], [wIterD21, 1]];
    let w = [wIterW1Init, wIterW2Init];
    const hist = [];
    const mu = wIterMu;
    const tol = wIterTol;
    const maxIt = wIterMaxIt;

    for (let t = 0; t <= maxIt; t++) {
      const norm = w[0];
      const wNorm = w.map(wi => wi / norm);
      
      const pi = Array.from({ length: 2 }, (_, i) =>
        Array.from({ length: 2 }, (_, j) => {
          const numer = (d[i][j] ** (1 - sigma)) * ((wNorm[i] / a[i]) ** (1 - sigma));
          let denom = 0;
          for (let l = 0; l < 2; l++) denom += (d[l][j] ** (1 - sigma)) * ((wNorm[l] / a[l]) ** (1 - sigma));
          return denom > 0 ? numer / denom : 0;
        })
      );
      
      const S = wNorm.map((wi, i) => wi * L[i]);
      const D = wNorm.map((_, i) => {
        let d_ = 0;
        for (let j = 0; j < 2; j++) d_ += pi[i][j] * wNorm[j] * L[j];
        return d_;
      });
      
      const err = Math.max(...D.map((di, i) => Math.abs(di / S[i] - 1)));
      hist.push({
        t, 
        w1: wNorm[0].toFixed(4), 
        w2: wNorm[1].toFixed(4),
        S1: S[0].toFixed(2), 
        D1: D[0].toFixed(2),
        S2: S[1].toFixed(2), 
        D2: D[1].toFixed(2),
        ratio1: S[0] > 0 ? (D[0] / S[0]).toFixed(4) : '0', 
        ratio2: S[1] > 0 ? (D[1] / S[1]).toFixed(4) : '0',
        err: err.toFixed(6)
      });

      if (err < tol) break;
      if (t === maxIt) break;

      const wNew = wNorm.map((wi, i) => {
        const proposed = S[i] > 0 ? (D[i] / S[i]) * wi : wi;
        return (1 - mu) * wi + mu * proposed;
      });
      w = wNew;
    }
    setWIterHistory(hist);
    setWIterDone(true);
  }, [wIterSigma, wIterL1, wIterL2, wIterA1, wIterA2, wIterD12, wIterD21, wIterW1Init, wIterW2Init, wIterMu, wIterTol, wIterMaxIt]);

  const startWStep = () => {
    setWStepHistory([]);
    setWStepW([wIterW1Init, wIterW2Init]);
    setWStepDone(false);
  };

  const nextWStep = () => {
    const sigma = wIterSigma;
    const L = [wIterL1, wIterL2];
    const a = [wIterA1, wIterA2];
    const dMat = [[1, wIterD12], [wIterD21, 1]];
    const mu = wIterMu;
    const tol = wIterTol;
    let w = [...wStepW];
    const norm = w[0];
    w = w.map(wi => wi / norm);

    const pi = Array.from({ length: 2 }, (_, i) =>
      Array.from({ length: 2 }, (_, j) => {
        const numer = (dMat[i][j] ** (1 - sigma)) * ((w[i] / a[i]) ** (1 - sigma));
        let denom = 0;
        for (let l = 0; l < 2; l++) denom += (dMat[l][j] ** (1 - sigma)) * ((w[l] / a[l]) ** (1 - sigma));
        return denom > 0 ? numer / denom : 0;
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
      w1: w[0].toFixed(4), 
      w2: w[1].toFixed(4),
      S1: S[0].toFixed(2), 
      D1: D[0].toFixed(2), 
      ratio1: S[0] > 0 ? (D[0] / S[0]).toFixed(4) : '0',
      S2: S[1].toFixed(2), 
      D2: D[1].toFixed(2), 
      ratio2: S[1] > 0 ? (D[1] / S[1]).toFixed(4) : '0',
      err: err.toFixed(6)
    };

    const newHist = [...wStepHistory, newEntry];
    setWStepHistory(newHist);
    setWIterHistory(newHist);

    if (err < tol || wStepHistory.length >= wIterMaxIt) { 
      setWStepDone(true); 
      setWIterDone(true);
      return; 
    }

    const wNew = w.map((wi, i) => {
      const proposed = S[i] > 0 ? (D[i] / S[i]) * wi : wi;
      return (1 - mu) * wi + mu * proposed;
    });
    setWStepW(wNew);
  };

  const resetWageIter = () => {
    setWIterSigma(4);
    setWIterL1(100);
    setWIterL2(150);
    setWIterA1(2.0);
    setWIterA2(1.5);
    setWIterD12(1.3);
    setWIterD21(1.3);
    setWIterW1Init(1.0);
    setWIterW2Init(0.8);
    setWIterMu(0.5);
    setWIterTol(1e-5);
    setWIterMaxIt(30);
    setWIterHistory([]);
    setWIterDone(false);
    setWStepHistory([]);
    setWStepW([1.0, 0.8]);
    setWStepDone(false);
  };

  // ── 3.5 Dampening Parameter State ─────────────────────────────────────────
  const [dampCurWage, setDampCurWage] = useState(1.0);
  const [dampPropWage, setDampPropWage] = useState(1.8);
  const [dampVal, setDampVal] = useState(0.4);

  const updatedDampWage = (1 - dampVal) * dampCurWage + dampVal * dampPropWage;
  const dampDistance = Math.abs(updatedDampWage - dampCurWage);
  const dampPct = (dampVal * 100).toFixed(0);

  const resetDampening = () => {
    setDampCurWage(1.0);
    setDampPropWage(1.8);
    setDampVal(0.4);
  };

  // ── 3.6 Exact Hat Algebra State ───────────────────────────────────────────
  // Separate states for the 4 categories
  const [hatWageBase, setHatWageBase] = useState(10.0);
  const [hatWageNew, setHatWageNew] = useState(11.5);
  const hatWageVal = hatWageNew / hatWageBase;
  const hatWagePct = ((hatWageVal - 1) * 100).toFixed(1);

  const [hatCostBase, setHatCostBase] = useState(1.20);
  const [hatCostNew, setHatCostNew] = useState(1.02);
  const hatCostVal = hatCostNew / hatCostBase;
  const hatCostPct = ((hatCostVal - 1) * 100).toFixed(1);

  const [hatPriceBase, setHatPriceBase] = useState(5.0);
  const [hatPriceNew, setHatPriceNew] = useState(4.5);
  const hatPriceVal = hatPriceNew / hatPriceBase;
  const hatPricePct = ((hatPriceVal - 1) * 100).toFixed(1);

  const [hatWelfareBase, setHatWelfareBase] = useState(2.0);
  const [hatWelfareNew, setHatWelfareNew] = useState(2.2);
  const hatWelfareVal = hatWelfareNew / hatWelfareBase;
  const hatWelfarePct = ((hatWelfareVal - 1) * 100).toFixed(1);

  const resetExactHat = () => {
    setHatWageBase(10.0); setHatWageNew(11.5);
    setHatCostBase(1.20); setHatCostNew(1.02);
    setHatPriceBase(5.0); setHatPriceNew(4.5);
    setHatWelfareBase(2.0); setHatWelfareNew(2.2);
  };

  // ── 3.6 Policy Shock Simulation State ─────────────────────────────────────
  const [psDhat12, setPsDhat12] = useState(0.85); // Home to Foreign trade cost shock
  const [psDhat21, setPsDhat21] = useState(1.00); // Foreign to Home trade cost shock
  const [psSigma, setPsSigma] = useState(4.0);
  
  // Baselines
  const [psPi11Base, setPsPi11Base] = useState(0.60); // Home domestic expenditure share
  const [psPi22Base, setPsPi22Base] = useState(0.70); // Foreign domestic expenditure share
  const [psPi21Base, setPsPi21Base] = useState(0.25); // Home's baseline import share from Foreign
  const [psPi12Base, setPsPi12Base] = useState(0.20); // Foreign's baseline import share from Home
  
  // Wage hats
  const [psWhatH, setPsWhatH] = useState(1.02);
  const [psWhatF, setPsWhatF] = useState(0.98);

  // Derived shares/expenditure
  const psPi31Base = Math.max(0, 1 - psPi11Base - psPi21Base);
  const psPi32Base = Math.max(0, 1 - psPi22Base - psPi12Base);

  // Price hats
  // P̂_j = [Σ_n π_nj d̂_nj^(1-σ) ŵ_n^(1-σ)]^(1/(1-σ))
  const psPhatH_pow = psPi11Base * Math.pow(1.0, 1 - psSigma) * Math.pow(psWhatH, 1 - psSigma)
                    + psPi21Base * Math.pow(psDhat21, 1 - psSigma) * Math.pow(psWhatF, 1 - psSigma)
                    + psPi31Base * Math.pow(1.0, 1 - psSigma) * Math.pow(1.0, 1 - psSigma);
  const psPhatH = Math.pow(psPhatH_pow, 1 / (1 - psSigma));

  const psPhatF_pow = psPi12Base * Math.pow(psDhat12, 1 - psSigma) * Math.pow(psWhatH, 1 - psSigma)
                    + psPi22Base * Math.pow(1.0, 1 - psSigma) * Math.pow(psWhatF, 1 - psSigma)
                    + psPi32Base * Math.pow(1.0, 1 - psSigma) * Math.pow(1.0, 1 - psSigma);
  const psPhatF = Math.pow(psPhatF_pow, 1 / (1 - psSigma));

  // Welfare hats: Û_i = ŵ_i / P̂_i
  const psUhatH = psWhatH / psPhatH;
  const psUhatF = psWhatF / psPhatF;

  // New Shares: π′_ij = π_ij * d̂_ij^(1-σ) * ŵ_i^(1-σ) / P̂_j^(1-σ)
  const psNewPi11 = psPi11Base * Math.pow(1.0, 1 - psSigma) * Math.pow(psWhatH, 1 - psSigma) / Math.pow(psPhatH, 1 - psSigma);
  const psNewPi21 = psPi21Base * Math.pow(psDhat21, 1 - psSigma) * Math.pow(psWhatF, 1 - psSigma) / Math.pow(psPhatH, 1 - psSigma);
  const psNewPi31 = psPi31Base * Math.pow(1.0, 1 - psSigma) * Math.pow(1.0, 1 - psSigma) / Math.pow(psPhatH, 1 - psSigma);

  const psNewPi12 = psPi12Base * Math.pow(psDhat12, 1 - psSigma) * Math.pow(psWhatH, 1 - psSigma) / Math.pow(psPhatF, 1 - psSigma);
  const psNewPi22 = psPi22Base * Math.pow(1.0, 1 - psSigma) * Math.pow(psWhatF, 1 - psSigma) / Math.pow(psPhatF, 1 - psSigma);
  const psNewPi32 = psPi32Base * Math.pow(1.0, 1 - psSigma) * Math.pow(1.0, 1 - psSigma) / Math.pow(psPhatF, 1 - psSigma);

  const resetPolicyShock = () => {
    setPsDhat12(0.85);
    setPsDhat21(1.00);
    setPsSigma(4.0);
    setPsPi11Base(0.60);
    setPsPi22Base(0.70);
    setPsPi21Base(0.25);
    setPsPi12Base(0.20);
    setPsWhatH(1.02);
    setPsWhatF(0.98);
  };

  // ── 3.7 GFT State ─────────────────────────────────────────────────────────
  const resetGFT = () => {
    setGftPiNN(0.70);
    setGftSigma(5);
  };

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
        hovertemplate: '<b>Distance:</b> %{x} km<br><b>Trade Index:</b> %{y:.1f}<extra></extra>'
      };

      const layout = {
        title: { text: '<b>Gravity Prediction: Trade Falls with Distance</b>', font: { color: textColor, size: 14 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 70, r: 40, t: 50, b: 60 },
        xaxis: { title: 'Distance between countries (km)', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
        yaxis: { title: 'Predicted Trade Index', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor }
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
        title: { text: '<b>Economic Size Pulls Trade Upward</b>', font: { color: textColor, size: 14 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 70, r: 40, t: 50, b: 60 },
        xaxis: { title: 'Trade Pair Type', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
        yaxis: { title: 'Predicted Trade Index', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor }
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
        name: 'Current Setting',
        marker: { size: 14, color: '#f59e0b', symbol: 'star' },
        hovertemplate: `<b>d_ij: ${iceDij}</b><br>Ship ${iceDij} for 1 delivered<extra></extra>`
      };

      const layout = {
        title: { text: '<b>Iceberg Trade Costs: Units Shipped per Unit Arrived</b>', font: { color: textColor, size: 14 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 70, r: 40, t: 50, b: 60 },
        xaxis: { title: 'Trade cost d_ij', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
        yaxis: { title: 'Units shipped for 1 unit to arrive', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
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
        title: { text: '<b>CES Demand: Spending Shares by Origin</b>', font: { color: textColor, size: 14 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 70, r: 40, t: 50, b: 60 },
        xaxis: { title: 'Origin Variety', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 } },
        yaxis: { title: 'Spending Share (%)', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, range: [0, 100], gridcolor: gridColor }
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
        title: { text: '<b>Destination Spending Shares by Origin</b>', font: { color: textColor, size: 14 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 70, r: 40, t: 50, b: 60 },
        xaxis: { title: 'Origin Country', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 } },
        yaxis: { title: 'Spending Share (%)', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, range: [0, 100], gridcolor: gridColor }
      };

      Plotly.newPlot(tsGraphRef.current, [trace], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, tsPi1, tsPi2, tsPi3, textColor, gridColor]);

  // --- Rebuild Wage Iteration Graphs reactively ---
  useEffect(() => {
    if (moduleTab === 'sub5' && wageIterGraphRef.current && wIterHistory.length > 0) {
      const traceW1 = {
        x: wIterHistory.map(r => r.t),
        y: wIterHistory.map(r => Number(r.w1)),
        mode: 'lines+markers',
        name: 'Home wage w₁',
        line: { color: '#3b82f6', width: 2.5 },
        marker: { size: 6 },
        hovertemplate: 'Iter %{x}<br>w₁ = %{y:.4f}<extra></extra>'
      };

      const traceW2 = {
        x: wIterHistory.map(r => r.t),
        y: wIterHistory.map(r => Number(r.w2)),
        mode: 'lines+markers',
        name: 'Foreign wage w₂',
        line: { color: '#7c3aed', width: 2.5 },
        marker: { size: 6 },
        hovertemplate: 'Iter %{x}<br>w₂ = %{y:.4f}<extra></extra>'
      };

      const traceErr = {
        x: wIterHistory.map(r => r.t),
        y: wIterHistory.map(r => Number(r.err)),
        mode: 'lines+markers',
        name: 'Max Equilibrium Error',
        line: { color: '#ef4444', width: 2, dash: 'dot' },
        marker: { size: 6, symbol: 'square' },
        yaxis: 'y2',
        hovertemplate: 'Iter %{x}<br>Error = %{y:.6f}<extra></extra>'
      };

      const layout = {
        title: { text: '<b>Wage Convergence Toward Equilibrium</b>', font: { color: textColor, size: 14 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 70, r: 70, t: 50, b: 60 },
        xaxis: { title: 'Iteration Number', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
        yaxis: { title: 'Normalized Wage index (Home = 1)', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
        yaxis2: { title: 'Absolute Excess Demand Error', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, overlaying: 'y', side: 'right', gridcolor: 'transparent', type: 'linear' },
        showlegend: true,
        legend: { font: { color: textColor, size: 10 }, bgcolor: 'transparent', x: 0.5, y: 1.15, orientation: 'h', xanchor: 'center' }
      };

      Plotly.newPlot(wageIterGraphRef.current, [traceW1, traceW2, traceErr], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, wIterHistory, textColor, gridColor]);

  useEffect(() => {
    if (moduleTab === 'sub5' && wageIterRatioGraphRef.current && wIterHistory.length > 0) {
      const traceRatio1 = {
        x: wIterHistory.map(r => r.t),
        y: wIterHistory.map(r => Number(r.ratio1)),
        mode: 'lines+markers',
        name: 'Home Demand/Supply Ratio',
        line: { color: '#3b82f6', width: 2 },
        marker: { size: 5 },
        hovertemplate: 'Iter %{x}<br>Home D/S: %{y:.4f}<extra></extra>'
      };

      const traceRatio2 = {
        x: wIterHistory.map(r => r.t),
        y: wIterHistory.map(r => Number(r.ratio2)),
        mode: 'lines+markers',
        name: 'Foreign Demand/Supply Ratio',
        line: { color: '#7c3aed', width: 2 },
        marker: { size: 5 },
        hovertemplate: 'Iter %{x}<br>Foreign D/S: %{y:.4f}<extra></extra>'
      };

      const traceTarget = {
        x: [0, Math.max(5, wIterHistory.length - 1)],
        y: [1.0, 1.0],
        mode: 'lines',
        name: 'Equilibrium target: D/S = 1',
        line: { color: '#10b981', width: 1.5, dash: 'dash' },
        hoverinfo: 'skip'
      };

      const layout = {
        title: { text: '<b>Labor Demand/Supply Ratio by Iteration</b>', font: { color: textColor, size: 14 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 70, r: 40, t: 50, b: 60 },
        xaxis: { title: 'Iteration Number', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
        yaxis: { title: 'Demand / Supply Ratio', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
        showlegend: true,
        legend: { font: { color: textColor, size: 9 }, bgcolor: 'transparent', x: 0.5, y: 1.15, orientation: 'h', xanchor: 'center' }
      };

      Plotly.newPlot(wageIterRatioGraphRef.current, [traceRatio1, traceRatio2, traceTarget], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, wIterHistory, textColor, gridColor]);

  // --- Rebuild Dampening Graph reactively ---
  useEffect(() => {
    if (moduleTab === 'sub5' && dampGraphRef.current) {
      const muValues = Array.from({ length: 21 }, (_, i) => i * 0.05);
      const updatedWages = muValues.map(mu => (1 - mu) * dampCurWage + mu * dampPropWage);

      const traceLine = {
        x: muValues,
        y: updatedWages,
        mode: 'lines',
        name: 'Updated Wage Path',
        line: { color: '#3b82f6', width: 3 },
        hovertemplate: 'Dampening μ = %{x:.2f}<br>Updated Wage = %{y:.3f}<extra></extra>'
      };

      const traceCurrent = {
        x: [0],
        y: [dampCurWage],
        mode: 'markers',
        name: 'Current Wage (μ = 0)',
        marker: { size: 10, color: '#94a3b8', symbol: 'circle' },
        hovertemplate: 'Current Wage: %{y:.2f}<extra></extra>'
      };

      const traceProposed = {
        x: [1],
        y: [dampPropWage],
        mode: 'markers',
        name: 'Proposed Wage (μ = 1)',
        marker: { size: 10, color: '#ef4444', symbol: 'circle' },
        hovertemplate: 'Proposed Wage: %{y:.2f}<extra></extra>'
      };

      const traceSelected = {
        x: [dampVal],
        y: [updatedDampWage],
        mode: 'markers',
        name: 'Selected Dampened Update',
        marker: { size: 14, color: '#10b981', symbol: 'star' },
        hovertemplate: 'Selected μ: %{x:.2f}<br>Wage: %{y:.3f}<extra></extra>'
      };

      const layout = {
        title: { text: '<b>How Dampening Changes the Wage Update</b>', font: { color: textColor, size: 14 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 70, r: 40, t: 50, b: 60 },
        xaxis: { title: 'Dampening Parameter μ', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
        yaxis: { title: 'Updated Wage index', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
        showlegend: true,
        legend: { font: { color: textColor, size: 9 }, bgcolor: 'transparent', x: 0.5, y: 1.15, orientation: 'h', xanchor: 'center' }
      };

      Plotly.newPlot(dampGraphRef.current, [traceLine, traceCurrent, traceProposed, traceSelected], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, dampCurWage, dampPropWage, dampVal, updatedDampWage, textColor, gridColor]);

  // --- Rebuild Newton Graph reactively ---
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
        name: 'Tangent line at x(t)',
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
        title: { text: "<b>Newton's Method Tangency Step</b>", font: { color: textColor, size: 14 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 70, r: 40, t: 50, b: 60 },
        xaxis: { title: 'x', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
        yaxis: { title: 'f(x)', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
        showlegend: true,
        legend: { font: { color: textColor, size: 9 }, bgcolor: 'transparent', x: 0.02, y: 0.98 }
      };

      Plotly.newPlot(newtonGraphRef.current, [traceF, traceZero, traceTangent, traceCurrent, traceNext], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, newtonX, newtonIter, newtonCurrent, newtonNext, tangentX, tangentY, textColor, gridColor, isDark]);

  // --- Rebuild Policy Shock Graphs reactively ---
  useEffect(() => {
    if (moduleTab === 'sub6' && policySharesGraphRef.current) {
      const traceBefore = {
        x: ['Home (Domestic)', 'Imports from Foreign', 'Imports from ROW'],
        y: [psPi11Base * 100, psPi21Base * 100, psPi31Base * 100],
        type: 'bar',
        name: 'Before Shock (Baseline)',
        marker: { color: 'rgba(59,130,246,0.6)' },
        hovertemplate: 'Before: %{y:.1f}%<extra></extra>'
      };

      const traceAfter = {
        x: ['Home (Domestic)', 'Imports from Foreign', 'Imports from ROW'],
        y: [psNewPi11 * 100, psNewPi21 * 100, psNewPi31 * 100],
        type: 'bar',
        name: 'After Trade Agreement',
        marker: { color: 'rgba(124,58,237,0.95)' },
        hovertemplate: 'After: %{y:.1f}%<extra></extra>'
      };

      const layout = {
        title: { text: '<b>Home Spending Shares by Origin</b>', font: { color: textColor, size: 13 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 70, r: 40, t: 50, b: 60 },
        xaxis: { tickfont: { color: textColor, size: 9 } },
        yaxis: { title: 'Spending Share (%)', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
        barmode: 'group',
        showlegend: true,
        legend: { font: { color: textColor, size: 9 }, bgcolor: 'transparent', x: 0.5, y: 1.15, orientation: 'h', xanchor: 'center' }
      };

      Plotly.newPlot(policySharesGraphRef.current, [traceBefore, traceAfter], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, psPi11Base, psPi21Base, psPi31Base, psNewPi11, psNewPi21, psNewPi31, textColor, gridColor]);

  useEffect(() => {
    if (moduleTab === 'sub6' && policyPricesGraphRef.current) {
      const trace = {
        x: ['Home Price Index P̂_H', 'Foreign Price Index P̂_F'],
        y: [(psPhatH - 1) * 100, (psPhatF - 1) * 100],
        type: 'bar',
        marker: { color: ['#3b82f6', '#7c3aed'], opacity: 0.85 },
        hovertemplate: '<b>%{x}</b><br>Price Index Change: %{y:.2f}%<extra></extra>'
      };

      const layout = {
        title: { text: '<b>Price Index Change after Shock</b>', font: { color: textColor, size: 13 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 70, r: 40, t: 50, b: 60 },
        xaxis: { tickfont: { color: textColor, size: 9 } },
        yaxis: { title: 'Change in Price Index P̂ (%)', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor }
      };

      Plotly.newPlot(policyPricesGraphRef.current, [trace], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, psPhatH, psPhatF, textColor, gridColor]);

  useEffect(() => {
    if (moduleTab === 'sub6' && policyWelfareGraphRef.current) {
      const trace = {
        x: ['Home Welfare Û_H', 'Foreign Welfare Û_F'],
        y: [(psUhatH - 1) * 100, (psUhatF - 1) * 100],
        type: 'bar',
        marker: { color: ['#10b981', '#10b981'], opacity: 0.85 },
        hovertemplate: '<b>%{x}</b><br>Welfare Change: %{y:.2f}%<extra></extra>'
      };

      const layout = {
        title: { text: '<b>Real Welfare Change after Shock</b>', font: { color: textColor, size: 13 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 70, r: 40, t: 50, b: 60 },
        xaxis: { tickfont: { color: textColor, size: 9 } },
        yaxis: { title: 'Welfare Change (%)', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor }
      };

      Plotly.newPlot(policyWelfareGraphRef.current, [trace], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, psUhatH, psUhatF, textColor, gridColor]);

  // --- Rebuild GFT Graph reactively ---
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
        name: 'Current Openness',
        marker: { size: 14, color: '#f59e0b', symbol: 'star' },
        hovertemplate: `π_nn = ${gftPiNN.toFixed(2)}<br>GFT = ${gftGFT}%<extra></extra>`
      };

      const layout = {
        title: { text: '<b>Gains from Trade and Domestic Expenditure Share</b>', font: { color: textColor, size: 14 } },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 70, r: 40, t: 50, b: 60 },
        xaxis: { title: 'Domestic expenditure share π_nn', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, range: [0.05, 0.99], gridcolor: gridColor },
        yaxis: { title: 'Gains from trade (%)', titlefont: { color: textColor, size: 11 }, tickfont: { color: textColor, size: 10 }, gridcolor: gridColor },
        showlegend: false
      };

      Plotly.newPlot(gftGraphRef.current, [traceLine, traceMarker], layout, { displayModeBar: false, responsive: true });
    }
  }, [moduleTab, gftPiNN, gftSigma, gftGFT, textColor, gridColor]);

  // ── CSS Style mappings ──
  const card = { marginBottom: '32px', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '16px' };
  const controlCard = { padding: '16px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' };
  const formulaBox = { padding: '14px 18px', borderRadius: '8px', background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)', fontFamily: 'monospace', fontSize: '1rem', margin: '12px 0', lineHeight: 1.7 };
  const beforeTouchBox = { padding: '14px 18px', borderRadius: '8px', background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.25)', fontSize: '0.9rem', color: 'var(--text-secondary)' };
  const tryThisBox = { padding: '14px 18px', borderRadius: '8px', background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '14px', fontSize: '0.9rem' };
  const dynamicBox = { padding: '14px 18px', borderRadius: '8px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)', fontSize: '0.9rem', marginTop: '14px' };
  const whyItMattersBox = { padding: '14px 18px', borderRadius: '8px', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', fontSize: '0.9rem', marginTop: '14px' };
  const graphDesc = { fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '8px' };
  const sliderRow = { display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.92rem' };
  const sliderLabelRow = { display: 'flex', justifyContent: 'space-between', fontWeight: 500, color: 'var(--text-primary)' };
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
              How do we explain actual trade flows? 
              <strong> Module 1: Trade and Technology</strong> taught us how technological differences generate comparative advantage (classical trade theory).
              <strong> Module 2: Trade and Resources</strong> showed how differences in resource endowments drive specialization (neoclassical trade theory).
              Now, <strong>Module 3</strong> introduces one of the most powerful empirical laws in economics: <strong>the gravity model of trade</strong>.
            </p>
            <p>
              In classical models, trade is driven by differences. In the real world, the volume of trade is dominated by two massive factors: 
              <strong>economic size</strong> and <strong>proximity</strong>.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', margin: '16px 0' }}>
              <div style={meansBox}><strong>📦 Size pulls trade:</strong><br/>Big economies produce more and buy more.</div>
              <div style={meansBox}><strong>📏 Distance dampens trade:</strong><br/>Physical distance and shipping costs reduce flows.</div>
              <div style={meansBox}><strong>🌐 Trade costs matter:</strong><br/>Tariffs, borders, and language differences act like extra distance.</div>
            </div>
            <p>
              <strong>Opening question:</strong> Why does Bangladesh trade more with Germany than with a geographically closer small nation like Nepal? 
              Nepal is closer, but Germany's economic mass (GDP) is vastly larger, generating a stronger economic attraction that overcomes the physical distance.
            </p>
            <TutorTip tip="Gravity in trade is not about planets. It is about economic size pulling trade flows, while distance and barriers weaken them." />
          </div>

          {/* Lesson 1 */}
          <div className="lesson-card" id="m3-lesson1">
            <h3>Lesson 1: What Is the Gravity Equation?</h3>
            <p>
              The basic gravity equation states that trade between country <em>i</em> and country <em>j</em> is proportional to the product of their GDPs, and decreases with the distance between them:
            </p>
            <div style={formulaBox}>
              <strong>Trade<sub>ij</sub> = (GDP<sub>i</sub>)<sup>α</sup> × (GDP<sub>j</sub>)<sup>β</sup> / (Distance<sub>ij</sub>)<sup>γ</sup></strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))', gap: '10px', margin: '12px 0' }}>
              {[
                ['Trade_ij', 'Bilateral trade volume from exporter i to importer j'],
                ['GDP_i', 'Economic size (supply capacity) of the exporter'],
                ['GDP_j', 'Economic size (market demand) of the importer'],
                ['Distance_ij', 'Geographic distance between exporter i and importer j'],
                ['α, β', 'Elasticities of trade with respect to exporter/importer size'],
                ['γ', 'Elasticity of trade with respect to distance'],
              ].map(([sym, def]) => (
                <div key={sym} style={meansBox}><strong>{sym}</strong><br/><span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{def}</span></div>
              ))}
            </div>

            <div style={card}>
              <h4>🧮 Interactive Lab: Basic Gravity Prediction</h4>
              
              <div style={beforeTouchBox}>
                <strong>💡 Before you touch the sliders, understand this:</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  Raising Exporter or Importer GDP increases the trade index. Raising the distance or the distance elasticity (γ) decreases it.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Exporter GDP (GDP_i)</span>
                        <span>{gravGDPi} units</span>
                      </div>
                      <input type="range" min="50" max="2000" step="50" value={gravGDPi} onChange={e => setGravGDPi(Number(e.target.value))} />
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Min: 50 | Max: 2000</span>
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Importer GDP (GDP_j)</span>
                        <span>{gravGDPj} units</span>
                      </div>
                      <input type="range" min="50" max="2000" step="50" value={gravGDPj} onChange={e => setGravGDPj(Number(e.target.value))} />
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Min: 50 | Max: 2000</span>
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Distance (km)</span>
                        <span>{gravDist} km</span>
                      </div>
                      <input type="range" min="100" max="15000" step="100" value={gravDist} onChange={e => setGravDist(Number(e.target.value))} />
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Min: 100 | Max: 15000</span>
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Distance Elasticity (γ)</span>
                        <span>{gravGamma.toFixed(1)}</span>
                      </div>
                      <input type="range" min="0.1" max="2.5" step="0.1" value={gravGamma} onChange={e => setGravGamma(Number(e.target.value))} />
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Min: 0.1 | Max: 2.5</span>
                    </div>
                  </div>
                  
                  <button onClick={resetBasicGravity} className="tab-btn" style={{ marginTop: '8px', alignSelf: 'flex-start' }}>Reset Sliders</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div ref={distGraphRef} style={{ height: '300px', width: '100%' }}></div>
                  <div style={resultBox}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Predicted Bilateral Trade Index:</span>
                    <h3 style={{ fontSize: '2.2rem', color: 'var(--accent-success)', margin: '4px 0' }}>{gravPred.toFixed(0)}</h3>
                  </div>
                </div>
              </div>

              <div style={dynamicBox}>
                <strong>💡 What happened?</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  With an exporter GDP of {gravGDPi} and importer GDP of {gravGDPj} separated by {gravDist} km, the model predicts a trade index of <strong>{gravPred.toFixed(0)}</strong>.
                  {gravDist > 8000 ? ' Because distance is large, trade flows are significantly penalised.' : ' Because distance is relatively close, trade flows remain strong.'}
                  {gravGamma > 1.5 ? ' The high distance elasticity (γ) means trade drops extremely fast as you move countries apart.' : ''}
                </p>
              </div>

              <div style={tryThisBox}>
                <strong>🎯 Try this experiment:</strong>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                  <li>Slide <strong>Distance</strong> up to 12,000 km. Notice how fast predicted trade collapses.</li>
                  <li>Set <strong>Distance Elasticity (γ)</strong> to 0.5. Notice that trade doesn't collapse as quickly when distance rises.</li>
                </ul>
              </div>

              <div style={whyItMattersBox}>
                <strong>🌍 Why it matters in trade theory:</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  If γ is high, transport costs act as a severe friction. Policies that lower γ (e.g. building better shipping terminals or containerization) mitigate the penalty of geographic isolation.
                </p>
              </div>
            </div>
          </div>

          {/* Lesson 2 */}
          <div className="lesson-card" id="m3-lesson2">
            <h3>Lesson 2: Economic Size of Origin and Destination</h3>
            <p>
              Large origin countries produce a wider variety of goods and in larger quantities, meaning they have a high capacity to export. 
              Large destination countries possess higher aggregate incomes, meaning they have a high capacity to import.
            </p>

            <div style={card}>
              <h4>📊 Size and Trade Analysis</h4>
              <div style={beforeTouchBox}>
                <strong>💡 Before you touch the sliders, understand this:</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  Adjusting the size parameters shifts the relative heights of the bars. Large-large pairs are always the absolute height of bilateral trade.
                </p>
              </div>
              <div ref={sizeGraphRef} style={{ height: '300px', width: '100%' }}></div>
              <div style={noticeBox}>
                <strong>🔎 What to notice:</strong> When both countries are large, trade increases exponentially because the supply capacity of the exporter matches the demand capacity of the importer.
              </div>
            </div>
          </div>

          {/* Lesson 3 */}
          <div className="lesson-card" id="m3-lesson3">
            <h3>Lesson 3: Distance and Trade Barriers</h3>
            <p>
              Bilateral trade friction is composed of both physical distance (freight costs, transit times) and policy/cultural barriers (tariffs, customs clearance, language differences).
            </p>
            <TutorTip tip="Gravity models often include dummy variables for common border, common language, and free trade agreements to capture these non-distance barriers." />
          </div>

          {/* Lesson 4 */}
          <div className="lesson-card" id="m3-lesson4">
            <h3>Lesson 4: Naive Gravity Regression</h3>
            <p>
              To run an OLS regression on gravity, economists take logs to linearize the equation:
            </p>
            <div style={formulaBox}>
              <strong>ln X<sub>ij</sub> = α ln Y<sub>i</sub> + β ln Y<sub>j</sub> + γ ln distance<sub>ij</sub> + ε<sub>ij</sub></strong>
            </div>

            <div style={card}>
              <h4>🧮 Naive Gravity Regression Calculator</h4>
              <div style={beforeTouchBox}>
                <strong>💡 Before you touch the sliders, understand this:</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  This calculator takes the log-linear parameters and computes the resulting log trade level and absolute level.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '12px' }}>
                <div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Distance Coefficient (γ)</span>
                        <span>{naiveGamma.toFixed(1)}</span>
                      </div>
                      <input type="range" min="-2.0" max="-0.2" step="0.1" value={naiveGamma} onChange={e => setNaiveGamma(Number(e.target.value))} />
                    </div>
                  </div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Exporter GDP (Y_i)</span>
                        <span>{naiveGDPi}</span>
                      </div>
                      <input type="range" min="100" max="1000" step="50" value={naiveGDPi} onChange={e => setNaiveGDPi(Number(e.target.value))} />
                    </div>
                  </div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Distance</span>
                        <span>{naiveDist} km</span>
                      </div>
                      <input type="range" min="500" max="10000" step="500" value={naiveDist} onChange={e => setNaiveDist(Number(e.target.value))} />
                    </div>
                  </div>
                  <button onClick={resetNaiveGravity} className="tab-btn" style={{ marginTop: '8px' }}>Reset</button>
                </div>
                <div style={resultBox}>
                  <p>Predicted Log Trade (ln X): <strong>{naiveLnX.toFixed(3)}</strong></p>
                  <p>Predicted Trade Level (X): <strong>{naiveX.toFixed(1)}</strong></p>
                </div>
              </div>
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

            <div style={card}>
              <h4>🧮 Interactive Thought Experiment</h4>
              <div style={beforeTouchBox}>
                <strong>💡 Before you touch the sliders, understand this:</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  If the average trade cost of Home and Foreign to the rest of the world is high, it isolates them, making their bilateral link look relatively more attractive!
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '12px' }}>
                <div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Home-Foreign Bilateral Cost</span>
                        <span>{mrHomeFgn.toFixed(2)}</span>
                      </div>
                      <input type="range" min="1.0" max="3.0" step="0.1" value={mrHomeFgn} onChange={e => setMrHomeFgn(Number(e.target.value))} />
                    </div>
                  </div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Home's Avg Cost to World</span>
                        <span>{mrHomeWorld.toFixed(2)}</span>
                      </div>
                      <input type="range" min="1.0" max="3.0" step="0.1" value={mrHomeWorld} onChange={e => setMrHomeWorld(Number(e.target.value))} />
                    </div>
                  </div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Foreign's Avg Cost to World</span>
                        <span>{mrFgnWorld.toFixed(2)}</span>
                      </div>
                      <input type="range" min="1.0" max="3.0" step="0.1" value={mrFgnWorld} onChange={e => setMrFgnWorld(Number(e.target.value))} />
                    </div>
                  </div>
                  <button onClick={resetMR} className="tab-btn" style={{ marginTop: '8px' }}>Reset</button>
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

            <div style={card}>
              <h4>🧮 Iceberg Costs Calculator</h4>
              <div style={beforeTouchBox}>
                <strong>💡 Before you touch the sliders, understand this:</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  Varying the iceberg parameter dij scales the multiplier of units that must be shipped.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '12px' }}>
                <div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Desired arrival quantity</span>
                        <span>{iceArrival}</span>
                      </div>
                      <input type="range" min="50" max="500" step="10" value={iceArrival} onChange={e => setIceArrival(Number(e.target.value))} />
                    </div>
                  </div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Iceberg cost d_ij</span>
                        <span>{iceDij.toFixed(2)}</span>
                      </div>
                      <input type="range" min="1.0" max="3.0" step="0.1" value={iceDij} onChange={e => setIceDij(Number(e.target.value))} />
                    </div>
                  </div>
                  <button onClick={resetIceberg} className="tab-btn" style={{ marginTop: '8px' }}>Reset</button>
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
          </div>

          {/* Lesson 10 */}
          <div className="lesson-card" id="m3-lesson10">
            <h3>Lesson 10: Delivered Price</h3>
            <p>
              The consumer cares about the delivered price: p<sub>ij</sub> = p<sub>i</sub> × d<sub>ij</sub>.
              Since p<sub>i</sub> = w<sub>i</sub> / a<sub>i</sub>, productivity and wages directly determine the baseline price.
            </p>

            <div style={card}>
              <h4>🧮 Delivered Price Calculator</h4>
              <div style={beforeTouchBox}>
                <strong>💡 Before you touch the sliders, understand this:</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  Wages increase price, productivity decreases price, and trade costs act as a straight markup.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '12px' }}>
                <div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Wage w_i</span>
                        <span>{dpWage}</span>
                      </div>
                      <input type="range" min="5" max="25" value={dpWage} onChange={e => setDpWage(Number(e.target.value))} />
                    </div>
                  </div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Productivity a_i</span>
                        <span>{dpProd.toFixed(1)}</span>
                      </div>
                      <input type="range" min="0.5" max="4.0" step="0.1" value={dpProd} onChange={e => setDpProd(Number(e.target.value))} />
                    </div>
                  </div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Trade cost d_ij</span>
                        <span>{dpDij.toFixed(2)}</span>
                      </div>
                      <input type="range" min="1.0" max="2.5" step="0.05" value={dpDij} onChange={e => setDpDij(Number(e.target.value))} />
                    </div>
                  </div>
                  <button onClick={resetDeliveredPrice} className="tab-btn" style={{ marginTop: '8px' }}>Reset</button>
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

            <div style={card}>
              <h4>🧮 Spending Shares under CES</h4>
              <div style={beforeTouchBox}>
                <strong>💡 Before you touch the sliders, understand this:</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  A higher elasticity parameter σ means consumers substitute varieties more aggressively.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '12px' }}>
                <div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Home wage</span>
                        <span>{cesWh}</span>
                      </div>
                      <input type="range" min="5" max="25" value={cesWh} onChange={e => setCesWh(Number(e.target.value))} />
                    </div>
                  </div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Foreign wage</span>
                        <span>{cesWf}</span>
                      </div>
                      <input type="range" min="5" max="25" value={cesWf} onChange={e => setCesWf(Number(e.target.value))} />
                    </div>
                  </div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Elasticity σ</span>
                        <span>{cesSigma.toFixed(1)}</span>
                      </div>
                      <input type="range" min="1.5" max="8.0" step="0.5" value={cesSigma} onChange={e => setCesSigma(Number(e.target.value))} />
                    </div>
                  </div>
                  <button onClick={resetCES} className="tab-btn" style={{ marginTop: '8px' }}>Reset</button>
                </div>
                <div ref={cesGraphRef} style={{ height: '280px', width: '100%' }}></div>
              </div>
              <div style={noticeBox}>
                <strong>🔎 What to notice:</strong> When σ is high, a small price advantage can create a large spending-share advantage.
              </div>
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

            <div style={card}>
              <h4>🧮 CES Price Index Calculator (3 Origins)</h4>
              <div style={beforeTouchBox}>
                <strong>💡 Before you touch the sliders, understand this:</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  This index is the cost of living. Higher trade costs and wages push it up. High productivity pushes it down.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '12px' }}>
                <div style={controlCard}>
                  <h5>Home</h5>
                  <div style={sliderRow}>
                    <span>Wage: {piW1}</span>
                    <input type="range" min="5" max="25" value={piW1} onChange={e => setPiW1(Number(e.target.value))} />
                  </div>
                  <div style={sliderRow}>
                    <span>Cost d: {piD1.toFixed(1)}</span>
                    <input type="range" min="1" max="3" step="0.1" value={piD1} onChange={e => setPiD1(Number(e.target.value))} />
                  </div>
                </div>
                <div style={controlCard}>
                  <h5>Foreign</h5>
                  <div style={sliderRow}>
                    <span>Wage: {piW2}</span>
                    <input type="range" min="5" max="25" value={piW2} onChange={e => setPiW2(Number(e.target.value))} />
                  </div>
                  <div style={sliderRow}>
                    <span>Cost d: {piD2.toFixed(1)}</span>
                    <input type="range" min="1" max="3" step="0.1" value={piD2} onChange={e => setPiD2(Number(e.target.value))} />
                  </div>
                </div>
                <div style={controlCard}>
                  <h5>Rest of World</h5>
                  <div style={sliderRow}>
                    <span>Wage: {piW3}</span>
                    <input type="range" min="5" max="25" value={piW3} onChange={e => setPiW3(Number(e.target.value))} />
                  </div>
                  <div style={sliderRow}>
                    <span>Cost d: {piD3.toFixed(1)}</span>
                    <input type="range" min="1" max="3" step="0.1" value={piD3} onChange={e => setPiD3(Number(e.target.value))} />
                  </div>
                </div>
              </div>
              <button onClick={resetPriceIndex} className="tab-btn" style={{ alignSelf: 'flex-start' }}>Reset</button>
              <div style={resultBox}>
                <p>Price Index P_j: <strong>{priceIndex.toFixed(3)}</strong></p>
              </div>
              <div style={noticeBox}>
                <strong>🔎 What to notice:</strong> The price index summarizes the cost of the whole consumption basket.
              </div>
            </div>
          </div>

          {/* Lesson 13 */}
          <div className="lesson-card" id="m3-lesson13">
            <h3>Lesson 13: Trade Shares</h3>
            <p>
              The trade share π<sub>ij</sub> depends on productivity, wages, trade costs, and preferences relative to other suppliers.
            </p>

            <div style={card}>
              <h4>📊 Spending Shares</h4>
              <div ref={tsGraphRef} style={{ height: '300px', width: '100%' }}></div>
              <div style={noticeBox}>
                <strong>🔎 What to notice:</strong> Trade shares are relative. One origin’s share depends on all origins’ delivered prices.
              </div>
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

            <div style={card}>
              <h4>🧮 Interactive Simulation</h4>
              <div style={beforeTouchBox}>
                <strong>💡 Before you touch the sliders, understand this:</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  If wages are in equilibrium, the ratio of Demand to Supply should be exactly 1.0.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '12px' }}>
                <div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Home Wage guess w₁</span>
                        <span>{mcW1}</span>
                      </div>
                      <input type="range" min="5" max="25" value={mcW1} onChange={e => setMcW1(Number(e.target.value))} />
                    </div>
                  </div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Foreign Wage guess w₂</span>
                        <span>{mcW2}</span>
                      </div>
                      <input type="range" min="5" max="25" value={mcW2} onChange={e => setMcW2(Number(e.target.value))} />
                    </div>
                  </div>
                  <button onClick={resetMarketClearing} className="tab-btn" style={{ marginTop: '8px' }}>Reset</button>
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
            
            <p style={{ fontSize: '1.02rem', lineHeight: '1.6', marginBottom: '16px' }}>
              In the Armington model, general equilibrium wages are not known immediately. Since they are interlinked across countries,
              we must solve for them using a computer algorithm. We start with an initial guess for wages and calculate the labor supply and demand values. 
              If labor demand is higher than supply, the wage rises; if it is lower, it falls. The algorithm repeats this process until supply matches demand.
            </p>

            <div style={formulaBox}>
              <strong>Supply:</strong> S<sub>i</sub> = w<sub>i</sub> L<sub>i</sub> <br/>
              <strong>Demand:</strong> D<sub>i</sub> = Σ<sub>j</sub> π<sub>ij</sub> w<sub>j</sub> L<sub>j</sub> <br/>
              <strong>Wage Update rule:</strong> w<sub>i</sub><sup>(next)</sup> = (D<sub>i</sub> / S<sub>i</sub>) × w<sub>i</sub><sup>(current)</sup>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', margin: '16px 0' }}>
              <div style={meansBox}><strong>w<sub>i</sub></strong><br/>wage in country i</div>
              <div style={meansBox}><strong>L<sub>i</sub></strong><br/>labor force in country i</div>
              <div style={meansBox}><strong>S<sub>i</sub></strong><br/>labor supply value (income)</div>
              <div style={meansBox}><strong>D<sub>i</sub></strong><br/>labor demand value (sales)</div>
              <div style={meansBox}><strong>π<sub>ij</sub></strong><br/>share of j's spending on i</div>
            </div>

            <div style={card}>
              <h4>⚙️ Interactive Wage Iteration Lab</h4>
              
              <div style={beforeTouchBox}>
                <strong>💡 Before you touch the sliders, understand this:</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  This simulation computes wages dynamically step-by-step. If you choose an initial guess far from equilibrium, 
                  you will see the errors adjust and correct. If you increase the trade costs or elasticity, you will make the market clear differently.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '12px' }}>
                <div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Home Labor (L_H)</span>
                        <span>{wIterL1}</span>
                      </div>
                      <input type="range" min="50" max="300" step="10" value={wIterL1} onChange={e => setWIterL1(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Foreign Labor (L_F)</span>
                        <span>{wIterL2}</span>
                      </div>
                      <input type="range" min="50" max="300" step="10" value={wIterL2} onChange={e => setWIterL2(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Home Productivity (a_H)</span>
                        <span>{wIterA1.toFixed(1)}</span>
                      </div>
                      <input type="range" min="0.5" max="4.0" step="0.1" value={wIterA1} onChange={e => setWIterA1(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Foreign Productivity (a_F)</span>
                        <span>{wIterA2.toFixed(1)}</span>
                      </div>
                      <input type="range" min="0.5" max="4.0" step="0.1" value={wIterA2} onChange={e => setWIterA2(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Home-to-Foreign Cost (d_HF)</span>
                        <span>{wIterD12.toFixed(2)}</span>
                      </div>
                      <input type="range" min="1.0" max="3.0" step="0.05" value={wIterD12} onChange={e => setWIterD12(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Foreign-to-Home Cost (d_FH)</span>
                        <span>{wIterD21.toFixed(2)}</span>
                      </div>
                      <input type="range" min="1.0" max="3.0" step="0.05" value={wIterD21} onChange={e => setWIterD21(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Elasticity of Substitution (σ)</span>
                        <span>{wIterSigma.toFixed(1)}</span>
                      </div>
                      <input type="range" min="1.5" max="8.0" step="0.5" value={wIterSigma} onChange={e => setWIterSigma(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Initial Home Wage guess</span>
                        <span>{wIterW1Init.toFixed(2)}</span>
                      </div>
                      <input type="range" min="0.2" max="3.0" step="0.1" value={wIterW1Init} onChange={e => setWIterW1Init(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Initial Foreign Wage guess</span>
                        <span>{wIterW2Init.toFixed(2)}</span>
                      </div>
                      <input type="range" min="0.2" max="3.0" step="0.1" value={wIterW2Init} onChange={e => setWIterW2Init(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Dampening parameter (μ)</span>
                        <span>{wIterMu.toFixed(2)}</span>
                      </div>
                      <input type="range" min="0.1" max="1.0" step="0.05" value={wIterMu} onChange={e => setWIterMu(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Max Iterations</span>
                        <span>{wIterMaxIt}</span>
                      </div>
                      <input type="range" min="5" max="50" step="1" value={wIterMaxIt} onChange={e => setWIterMaxIt(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                    <button onClick={startWStep} className="tab-btn" style={{ background: 'var(--accent-primary)', color: 'white' }}>Start Step-by-step</button>
                    <button onClick={nextWStep} disabled={wStepDone} className="tab-btn" style={{ background: wStepDone ? 'transparent' : 'var(--accent-secondary)', color: wStepDone ? 'var(--text-secondary)' : 'white' }}>Next Iteration</button>
                    <button onClick={runWageIter} className="tab-btn" style={{ background: '#10b981', color: 'white' }}>Run Full Sim</button>
                    <button onClick={resetWageIter} className="tab-btn">Reset</button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div ref={wageIterGraphRef} style={{ height: '320px', width: '100%' }}></div>
                  <div ref={wageIterRatioGraphRef} style={{ height: '320px', width: '100%' }}></div>
                </div>
              </div>

              {wIterHistory.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <h5>📝 Iteration Logs Table</h5>
                  <div style={{ overflowX: 'auto', maxHeight: '250px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                      <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border)' }}>
                          <th style={{ padding: '6px', textAlign: 'center' }}>Iter</th>
                          <th style={{ padding: '6px', textAlign: 'right' }}>w₁ (Home)</th>
                          <th style={{ padding: '6px', textAlign: 'right' }}>w₂ (Fgn)</th>
                          <th style={{ padding: '6px', textAlign: 'right' }}>Home Demand</th>
                          <th style={{ padding: '6px', textAlign: 'right' }}>Home Supply</th>
                          <th style={{ padding: '6px', textAlign: 'right' }}>Home D/S</th>
                          <th style={{ padding: '6px', textAlign: 'right' }}>Fgn Demand</th>
                          <th style={{ padding: '6px', textAlign: 'right' }}>Fgn Supply</th>
                          <th style={{ padding: '6px', textAlign: 'right' }}>Fgn D/S</th>
                          <th style={{ padding: '6px', textAlign: 'right' }}>Max Error</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wIterHistory.map((row, index) => (
                          <tr key={index} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ padding: '6px', textAlign: 'center' }}>{row.t}</td>
                            <td style={{ padding: '6px', textAlign: 'right', fontFamily: 'monospace' }}>{row.w1}</td>
                            <td style={{ padding: '6px', textAlign: 'right', fontFamily: 'monospace' }}>{row.w2}</td>
                            <td style={{ padding: '6px', textAlign: 'right', fontFamily: 'monospace' }}>{row.D1}</td>
                            <td style={{ padding: '6px', textAlign: 'right', fontFamily: 'monospace' }}>{row.S1}</td>
                            <td style={{ padding: '6px', textAlign: 'right', fontFamily: 'monospace' }}>{row.ratio1}</td>
                            <td style={{ padding: '6px', textAlign: 'right', fontFamily: 'monospace' }}>{row.D2}</td>
                            <td style={{ padding: '6px', textAlign: 'right', fontFamily: 'monospace' }}>{row.S2}</td>
                            <td style={{ padding: '6px', textAlign: 'right', fontFamily: 'monospace' }}>{row.ratio2}</td>
                            <td style={{ padding: '6px', textAlign: 'right', fontFamily: 'monospace', color: Number(row.err) < 1e-4 ? 'var(--accent-success)' : 'var(--text-primary)' }}>{row.err}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    • If D/S &gt; 1, demand is greater than supply, so wage tends to increase.<br/>
                    • If D/S &lt; 1, demand is lower than supply, so wage tends to decrease.<br/>
                    • If D/S is close to 1, that country is close to equilibrium.
                  </div>
                </div>
              )}

              <div style={dynamicBox}>
                <strong>💡 What happened?</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  {wIterHistory.length === 0 ? 'Start the simulation to analyze convergence behavior.' : (
                    <>
                      The algorithm ran and reached iteration {wIterHistory[wIterHistory.length - 1].t} with a final error of{' '}
                      <strong>{wIterHistory[wIterHistory.length - 1].err}</strong>. 
                      {Number(wIterHistory[wIterHistory.length - 1].err) < wIterTol ? (
                        <span style={{ color: 'var(--accent-success)' }}> The algorithm is successfully converging because the maximum error is getting smaller.</span>
                      ) : (
                        <span style={{ color: 'var(--accent-error)' }}> The algorithm has not fully converged. It may be unstable. Try lowering the dampening parameter μ.</span>
                      )}
                    </>
                  )}
                </p>
              </div>

              <div style={tryThisBox}>
                <strong>🎯 Try this experiment:</strong>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                  <li>Increase <strong>Home-to-Foreign Cost (d_HF)</strong> to 2.2 and run the simulation again. Observe the new equilibrium Foreign wage.</li>
                  <li>Increase <strong>Elasticity (σ)</strong> to 7.0 with a high dampening parameter (μ = 0.9). Observe if the system oscillates or fails to converge.</li>
                  <li>Lower the <strong>Dampening parameter (μ)</strong> to 0.2 and notice how the error convergence path becomes much smoother, albeit slower.</li>
                </ul>
              </div>

              <div style={whyItMattersBox}>
                <strong>🌍 Why it matters in trade theory:</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  Solving for wages is the core of general equilibrium. Without matching supply and demand, we cannot compute how wages adapt to tariff cuts or productivity growth.
                </p>
              </div>
            </div>
          </div>

          {/* Lesson 17 */}
          <div className="lesson-card" id="m3-lesson17">
            <h3>Lesson 17: Dampening Parameter</h3>
            
            <p style={{ fontSize: '1.02rem', lineHeight: '1.6', marginBottom: '16px' }}>
              Dampening is like taking a smaller, more cautious step toward the proposed wage update. 
              Without dampening, the algorithm may jump too far, overshoot the equilibrium point, and start oscillating wildly or diverge. 
              With dampening, it moves more carefully.
            </p>

            <div style={formulaBox}>
              <strong>w<sup>(t+1)</sup> = (1 − μ) w<sup>(t)</sup> + μ × w<sub>proposed</sub></strong>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', margin: '16px 0' }}>
              <div style={meansBox}><strong>w<sup>(t)</sup></strong><br/>current wage</div>
              <div style={meansBox}><strong>w<sub>proposed</sub></strong><br/>wage suggested by the update rule</div>
              <div style={meansBox}><strong>μ</strong><br/>dampening parameter (between 0 and 1)</div>
            </div>

            <div style={card}>
              <h4>⚙️ Interactive Dampening Analysis</h4>
              
              <div style={beforeTouchBox}>
                <strong>💡 Before you touch the sliders, understand this:</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  μ = 1 means take the full proposed update (highly aggressive). μ = 0 means do not move at all.
                  Smaller μ means safer but slower adjustment.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '12px' }}>
                <div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Current Wage w(t)</span>
                        <span>{dampCurWage.toFixed(2)}</span>
                      </div>
                      <input type="range" min="0.5" max="3.0" step="0.05" value={dampCurWage} onChange={e => setDampCurWage(Number(e.target.value))} />
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Min: 0.5 | Max: 3.0</span>
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Proposed Wage w_proposed</span>
                        <span>{dampPropWage.toFixed(2)}</span>
                      </div>
                      <input type="range" min="0.5" max="3.0" step="0.05" value={dampPropWage} onChange={e => setDampPropWage(Number(e.target.value))} />
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Min: 0.5 | Max: 3.0</span>
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Dampening Parameter (μ)</span>
                        <span>{dampVal.toFixed(2)}</span>
                      </div>
                      <input type="range" min="0.0" max="1.0" step="0.05" value={dampVal} onChange={e => setDampVal(Number(e.target.value))} />
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Min: 0.0 | Max: 1.0</span>
                    </div>
                  </div>
                  
                  <button onClick={resetDampening} className="tab-btn" style={{ marginTop: '8px' }}>Reset Sliders</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div ref={dampGraphRef} style={{ height: '300px', width: '100%' }}></div>
                  <div style={resultBox}>
                    <p>Updated wage w(t+1): <strong>{updatedDampWage.toFixed(3)}</strong></p>
                    <p>Distance moved: <strong>{dampDistance.toFixed(3)}</strong></p>
                    <p>Percentage of proposed movement used: <strong>{dampPct}%</strong></p>
                  </div>
                </div>
              </div>

              <div style={dynamicBox}>
                <strong>💡 What happened?</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  By setting μ to {dampVal.toFixed(2)}, the updated wage index shifts to <strong>{updatedDampWage.toFixed(3)}</strong>. 
                  This is a <strong>{dampVal > 0.7 ? 'highly aggressive' : dampVal > 0.3 ? 'moderate' : 'cautious'} update</strong>, taking {dampPct}% of the proposed adjustment path.
                </p>
              </div>

              <div style={tryThisBox}>
                <strong>🎯 Try this experiment:</strong>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                  <li>Set <strong>μ</strong> close to 1 and see the update point move extremely close to the proposed wage.</li>
                  <li>Set <strong>μ</strong> close to 0 and see the update point remain virtually stagnant near the current wage.</li>
                </ul>
              </div>
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
            
            <p style={{ fontSize: '1.02rem', lineHeight: '1.6', marginBottom: '16px' }}>
              Exact hat algebra compares a baseline equilibrium with a new equilibrium after a policy shock. 
              Instead of solving all structural levels again, it focuses on proportional changes.
            </p>

            <div style={formulaBox}>
              <strong>x̂ = x′ / x</strong>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', margin: '16px 0' }}>
              <div style={meansBox}><strong>x</strong><br/>baseline value</div>
              <div style={meansBox}><strong>x′</strong><br/>new value after policy</div>
              <div style={meansBox}><strong>x̂</strong><br/>proportional change</div>
              <div style={meansBox}><strong>x̂ &gt; 1</strong><br/>variable increased</div>
              <div style={meansBox}><strong>x̂ &lt; 1</strong><br/>variable decreased</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              
              {/* Wage Hat Card */}
              <div style={card}>
                <h5>💵 1. Wage Hat (ŵ)</h5>
                <div style={controlCard}>
                  <div style={sliderRow}>
                    <div style={sliderLabelRow}>
                      <span>Baseline Wage</span>
                      <span>{hatWageBase.toFixed(2)}</span>
                    </div>
                    <input type="range" min="5.0" max="25.0" step="0.5" value={hatWageBase} onChange={e => setHatWageBase(Number(e.target.value))} />
                  </div>
                </div>
                <div style={controlCard}>
                  <div style={sliderRow}>
                    <div style={sliderLabelRow}>
                      <span>New Wage</span>
                      <span>{hatWageNew.toFixed(2)}</span>
                    </div>
                    <input type="range" min="5.0" max="25.0" step="0.5" value={hatWageNew} onChange={e => setHatWageNew(Number(e.target.value))} />
                  </div>
                </div>
                <div style={resultBox}>
                  <p>Hat Wage ŵ: <strong>{hatWageVal.toFixed(3)}</strong> ({hatWagePct > 0 ? `+${hatWagePct}` : hatWagePct}%)</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {hatWageVal > 1 ? 'This wage increased after the policy shock.' : hatWageVal < 1 ? 'This wage decreased after the policy shock.' : 'This wage did not change.'}
                  </p>
                </div>
              </div>

              {/* Trade Cost Hat Card */}
              <div style={card}>
                <h5>🚢 2. Trade Cost Hat (d̂)</h5>
                <div style={controlCard}>
                  <div style={sliderRow}>
                    <div style={sliderLabelRow}>
                      <span>Baseline Cost</span>
                      <span>{hatCostBase.toFixed(2)}</span>
                    </div>
                    <input type="range" min="1.0" max="2.5" step="0.05" value={hatCostBase} onChange={e => setHatCostBase(Number(e.target.value))} />
                  </div>
                </div>
                <div style={controlCard}>
                  <div style={sliderRow}>
                    <div style={sliderLabelRow}>
                      <span>New Cost</span>
                      <span>{hatCostNew.toFixed(2)}</span>
                    </div>
                    <input type="range" min="1.0" max="2.5" step="0.05" value={hatCostNew} onChange={e => setHatCostNew(Number(e.target.value))} />
                  </div>
                </div>
                <div style={resultBox}>
                  <p>Hat Cost d̂: <strong>{hatCostVal.toFixed(3)}</strong> ({hatCostPct > 0 ? `+${hatCostPct}` : hatCostPct}%)</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {hatCostVal > 1 ? 'This cost increased after the policy shock.' : hatCostVal < 1 ? 'This cost decreased after the policy shock.' : 'This cost did not change.'}
                  </p>
                </div>
              </div>

              {/* Price Index Hat Card */}
              <div style={card}>
                <h5>📈 3. Price Index Hat (P̂)</h5>
                <div style={controlCard}>
                  <div style={sliderRow}>
                    <div style={sliderLabelRow}>
                      <span>Baseline Price Index</span>
                      <span>{hatPriceBase.toFixed(2)}</span>
                    </div>
                    <input type="range" min="2.0" max="10.0" step="0.2" value={hatPriceBase} onChange={e => setHatPriceBase(Number(e.target.value))} />
                  </div>
                </div>
                <div style={controlCard}>
                  <div style={sliderRow}>
                    <div style={sliderLabelRow}>
                      <span>New Price Index</span>
                      <span>{hatPriceNew.toFixed(2)}</span>
                    </div>
                    <input type="range" min="2.0" max="10.0" step="0.2" value={hatPriceNew} onChange={e => setHatPriceNew(Number(e.target.value))} />
                  </div>
                </div>
                <div style={resultBox}>
                  <p>Hat Price Index P̂: <strong>{hatPriceVal.toFixed(3)}</strong> ({hatPricePct > 0 ? `+${hatPricePct}` : hatPricePct}%)</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {hatPriceVal > 1 ? 'This price index increased after the policy shock.' : hatPriceVal < 1 ? 'This price index decreased after the policy shock.' : 'This price index did not change.'}
                  </p>
                </div>
              </div>

              {/* Welfare Hat Card */}
              <div style={card}>
                <h5>🌟 4. Welfare Hat (Û)</h5>
                <div style={controlCard}>
                  <div style={sliderRow}>
                    <div style={sliderLabelRow}>
                      <span>Baseline Welfare</span>
                      <span>{hatWelfareBase.toFixed(2)}</span>
                    </div>
                    <input type="range" min="1.0" max="5.0" step="0.1" value={hatWelfareBase} onChange={e => setHatWelfareBase(Number(e.target.value))} />
                  </div>
                </div>
                <div style={controlCard}>
                  <div style={sliderRow}>
                    <div style={sliderLabelRow}>
                      <span>New Welfare</span>
                      <span>{hatWelfareNew.toFixed(2)}</span>
                    </div>
                    <input type="range" min="1.0" max="5.0" step="0.1" value={hatWelfareNew} onChange={e => setHatWelfareNew(Number(e.target.value))} />
                  </div>
                </div>
                <div style={resultBox}>
                  <p>Hat Welfare Û: <strong>{hatWelfareVal.toFixed(3)}</strong> ({hatWelfarePct > 0 ? `+${hatWelfarePct}` : hatWelfarePct}%)</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {hatWelfareVal > 1 ? 'This welfare increased after the policy shock.' : hatWelfareVal < 1 ? 'This welfare decreased after the policy shock.' : 'This welfare did not change.'}
                  </p>
                </div>
              </div>

            </div>
            <button onClick={resetExactHat} className="tab-btn" style={{ marginTop: '16px' }}>Reset All Hat Cards</button>

            <div style={whyItMattersBox}>
              <strong>🌍 Why it matters:</strong>
              <p style={{ margin: '4px 0 0 0' }}>
                Hat algebra is useful because trade policy usually asks about changes: How much did trade rise? How much did welfare change? How much did the price index fall?
              </p>
            </div>
          </div>

          {/* Lesson 25 */}
          <div className="lesson-card" id="m3-lesson25">
            <h3>Lesson 25: Policy Shock Simulation</h3>
            
            <p style={{ fontSize: '1.02rem', lineHeight: '1.6', marginBottom: '16px' }}>
              Let's simulate a trade agreement that lowers trade costs between Home and Foreign. 
              This initiates a chain of general equilibrium responses:
            </p>
            
            <div style={beforeTouchBox}>
              <strong>🔗 The General Equilibrium Chain:</strong>
              <p style={{ margin: '4px 0 0 0' }}>
                Trade cost falls (d̂<sub>HF</sub> &lt; 1) → Delivered prices fall → Consumers shift spending toward the cheaper imported variety → Trade shares change → Price index falls → Welfare rises because consumers can buy more with the same income.
              </p>
            </div>

            <div style={formulaBox}>
              <strong>Price Index Hat:</strong> P̂<sub>j</sub> = [Σ<sub>n</sub> π<sub>nj</sub> d̂<sub>nj</sub><sup>1−σ</sup> ŵ<sub>n</sub><sup>1−σ</sup>]<sup>1/(1−σ)</sup> <br/>
              <strong>Trade Share Hat:</strong> π̂<sub>ij</sub> = d̂<sub>ij</sub><sup>1−σ</sup> ŵ<sub>i</sub><sup>1−σ</sup> / P̂<sub>j</sub><sup>1−σ</sup> <br/>
              <strong>Welfare Hat:</strong> Û<sub>i</sub> = ŵ<sub>i</sub> / P̂<sub>i</sub>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', margin: '14px 0', fontSize: '0.85rem' }}>
              <div style={meansBox}><strong>P̂<sub>j</sub>:</strong> Price index change. If P̂<sub>j</sub> &lt; 1, consumer cost of living fell.</div>
              <div style={meansBox}><strong>π̂<sub>ij</sub>:</strong> Proportional change in trade share. If &gt; 1, trade share increased.</div>
              <div style={meansBox}><strong>Û<sub>i</sub>:</strong> Welfare change (real wage). If Û<sub>i</sub> &gt; 1, real wage and purchasing power rose.</div>
            </div>

            <div style={card}>
              <h4>⚙️ Policy Shock Simulator</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Home-to-Foreign Cost Shock (d̂_HF)</span>
                        <span>{psDhat12.toFixed(2)}</span>
                      </div>
                      <input type="range" min="0.5" max="1.5" step="0.05" value={psDhat12} onChange={e => setPsDhat12(Number(e.target.value))} />
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>d̂_HF &lt; 1: Trade cost cut (liberalization)</span>
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Foreign-to-Home Cost Shock (d̂_FH)</span>
                        <span>{psDhat21.toFixed(2)}</span>
                      </div>
                      <input type="range" min="0.5" max="1.5" step="0.05" value={psDhat21} onChange={e => setPsDhat21(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Elasticity of Substitution (σ)</span>
                        <span>{psSigma.toFixed(1)}</span>
                      </div>
                      <input type="range" min="1.5" max="8.0" step="0.5" value={psSigma} onChange={e => setPsSigma(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Home Domestic Spend Share (π_HH)</span>
                        <span>{psPi11Base.toFixed(2)}</span>
                      </div>
                      <input type="range" min="0.1" max="0.9" step="0.05" value={psPi11Base} onChange={e => setPsPi11Base(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Home import share from Foreign (π_FH)</span>
                        <span>{psPi21Base.toFixed(2)}</span>
                      </div>
                      <input type="range" min="0.05" max="0.5" step="0.05" value={psPi21Base} onChange={e => setPsPi21Base(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Home Wage change (ŵ_H)</span>
                        <span>{psWhatH.toFixed(2)}</span>
                      </div>
                      <input type="range" min="0.8" max="1.2" step="0.01" value={psWhatH} onChange={e => setPsWhatH(Number(e.target.value))} />
                    </div>
                  </div>

                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Foreign Wage change (ŵ_F)</span>
                        <span>{psWhatF.toFixed(2)}</span>
                      </div>
                      <input type="range" min="0.8" max="1.2" step="0.01" value={psWhatF} onChange={e => setPsWhatF(Number(e.target.value))} />
                    </div>
                  </div>

                  <button onClick={resetPolicyShock} className="tab-btn" style={{ marginTop: '8px' }}>Reset Simulator</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div ref={policySharesGraphRef} style={{ height: '240px', width: '100%' }}></div>
                  <div ref={policyPricesGraphRef} style={{ height: '200px', width: '100%' }}></div>
                  <div ref={policyWelfareGraphRef} style={{ height: '200px', width: '100%' }}></div>
                </div>
              </div>

              <div style={dynamicBox}>
                <strong>💡 What happened?</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  When Home tariff falls to {psDhat12.toFixed(2)}, Home consumers switch spending. 
                  Home's price index changes by <strong>{((psPhatH - 1) * 100).toFixed(2)}%</strong> and Foreign price index changes by <strong>{((psPhatF - 1) * 100).toFixed(2)}%</strong>. 
                  As a result, Home welfare changes by <strong>{((psUhatH - 1) * 100).toFixed(2)}%</strong> and Foreign welfare by <strong>{((psUhatF - 1) * 100).toFixed(2)}%</strong>.
                  {psUhatH > 1 ? (
                    <span style={{ color: 'var(--accent-success)' }}> Lower trade costs reduce delivered prices, which lowers the price index and raises real welfare in Home.</span>
                  ) : (
                    <span style={{ color: 'var(--accent-error)' }}> Welfare falls here because wage changes or price index changes dominate the direct benefit from lower trade costs.</span>
                  )}
                </p>
              </div>

              <div style={tryThisBox}>
                <strong>🎯 Try this experiment:</strong>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                  <li>Lower <strong>d̂_HF</strong> from 1.00 to 0.70 and observe the Home spending shares shift toward Foreign.</li>
                  <li>Increase <strong>σ</strong> to 7.0 and observe how spending shares switch much more aggressively toward Foreign when you cut costs.</li>
                  <li>Increase <strong>Home Domestic Spend Share (π_HH)</strong> to 0.85 and observe how the percentage welfare gains become smaller.</li>
                </ul>
              </div>
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

            <div style={card}>
              <h4>🧮 GFT Calculator</h4>
              <div style={beforeTouchBox}>
                <strong>💡 Before you touch the sliders, understand this:</strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  π_nn is the share of spending on domestic goods. Lower domestic share means more openness, implying larger trade gains.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '12px' }}>
                <div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Domestic share π<sub>nn</sub></span>
                        <span>{gftPiNN.toFixed(2)}</span>
                      </div>
                      <input type="range" min="0.1" max="0.99" step="0.01" value={gftPiNN} onChange={e => setGftPiNN(Number(e.target.value))} />
                    </div>
                  </div>
                  <div style={controlCard}>
                    <div style={sliderRow}>
                      <div style={sliderLabelRow}>
                        <span>Elasticity σ</span>
                        <span>{gftSigma.toFixed(1)}</span>
                      </div>
                      <input type="range" min="2.0" max="10.0" step="0.5" value={gftSigma} onChange={e => setGftSigma(Number(e.target.value))} />
                    </div>
                  </div>
                  <button onClick={resetGFT} className="tab-btn" style={{ marginTop: '8px' }}>Reset</button>
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
        </div>
      )}

      {/* ═══ QUIZ TAB ═══════════════════════════════════════════════════ */}
      {moduleTab === 'quiz' && (
        <Module3Quiz />
      )}

    </div>
  );
}
