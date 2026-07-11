import React, { useState, useEffect } from 'react';

const quizQuestions = [
  {
    id: 1,
    question: `Which of the following represents the core driver of trade in Krugman's (1979) variable markup model?`,
    options: [
      `Option A: Comparative advantage based on differences in technology states (T_i) across countries.`,
      `Option B: Inter-industry specialization driven by factor endowment abundance differences (K/L).`,
      `Option C: Internal economies of scale combined with consumers' love of variety (increasing returns to scale).`,
      `Option D: External spatial agglomeration forces that reduce unit resource shipping costs.`
    ],
    correct: 2,
    explanation: `Correct! Under Krugman's framework, firms face internal economies of scale ($v' > 0, v'' < 0$), meaning average costs decline with output. Households have a 'love of variety' utility function. Trade allows firms to expand their production scale while offering a wider set of varieties globally.`
  },
  {
    id: 2,
    question: `In the Krugman (1979) model, why does opening to trade (which increases market size L) lead to a reduction in the equilibrium price-to-wage ratio $p/w$?`,
    options: [
      `Option A: Trade costs compress wages, forcing firms to lower prices to clear inventory.`,
      `Option B: Per-capita consumption of each variety falls, which increases the elasticity of demand, thereby compressing firm markups.`,
      `Option C: Absolute productivity rises due to learning-by-doing, lowering marginal production cost.`,
      `Option D: Large capital inflows subsidize fixed production fees, offsetting nominal prices.`
    ],
    correct: 1,
    explanation: `Correct! In Krugman (1979), the elasticity of demand $\\epsilon(c)$ satisfies $\\epsilon'(c) < 0$. Opening trade increases the market space, raising output $q$ but shrinking individual variety consumption $c = q/L$. Lower variety consumption drives up demand elasticity, which compresses the optimal markup: $\\frac{p}{w} = \\frac{1}{\\varphi}\\frac{\\epsilon}{\\epsilon-1}$.`
  },
  {
    id: 3,
    question: `Which variable is endogenously determined in Krugman's (1980) monopolistic competition framework but is treated as completely exogenous in the Armington model?`,
    options: [
      `Option A: The nominal factory gate wage rate ($w_i$).`,
      `Option B: The set and mass of varieties produced ($M_i$).`,
      `Option C: Bilateral iceberg shipping costs ($d_{ij}$).`,
      `Option D: The elasticity of substitution between goods ($\\sigma$).`
    ],
    correct: 1,
    explanation: `Correct! The Armington model assumes that each country is exogenously endowed with a fixed variety of goods. In Krugman (1980), the variety count $M_i = \\frac{L_i}{\\sigma f_i}$ is endogenously pinned down by free-entry zero-profit conditions.`
  },
  {
    id: 4,
    question: `In Krugman (1980), what are the equilibrium firm-level output ($q_i$) implications of an increase in the fixed operating cost $f_i$?`,
    options: [
      `Option A: Smaller firms and more of them.`,
      `Option B: Larger firms and a smaller total number of them.`,
      `Option C: Firm output remains unchanged, but wages rise.`,
      `Option D: Output drops to zero, shutting down the industry.`
    ],
    correct: 1,
    explanation: `Correct! Under constant CES markups, free entry forces firm revenue to balance operational cost: $\\pi = pq - w(f + q/\\varphi) = 0$. Since markup is constant, this resolves to a fixed equilibrium output: $q_i = (\\sigma - 1)\\varphi_i f_i$. An increase in $f_i$ directly requires firms to expand their output scale to break even, reducing the number of surviving varieties.`
  },
  {
    id: 5,
    question: `What is the economic mechanism behind the Population Scale Welfare Effect in the Krugman (1980) model: $\\frac{w_i}{P_i} = A_i L_i^{\\frac{1}{\\sigma - 1}}\\pi_{ii}^{-\\frac{1}{\\sigma - 1}}$?`,
    options: [
      `Option A: Larger populations experience lower wages, which drives down the consumer price index.`,
      `Option B: Larger population size supports a wider variety of domestic goods, which directly increases utility due to love of variety.`,
      `Option C: Iceberg costs decline as the domestic workforce grows, raising trade efficiency.`,
      `Option D: Perfect competition forces prices to marginal cost, eliminating welfare distortions.`
    ],
    correct: 1,
    explanation: `Correct! Because consumers value variety, having a larger home market size ($L_i$) supports more firms ($M_i = L_i / \\sigma f$). Access to a larger pool of varieties directly raises real wages/welfare by expanding the utility aggregator.`
  },
  {
    id: 6,
    question: `Which of the following best summarizes the stylized empirical facts that motivated Melitz (2003) to introduce firm-level heterogeneity?`,
    options: [
      `Option A: Exporters are typically smaller, less productive, and employ more temporary labor.`,
      `Option B: Only a small minority of firms export; they are systematically larger, more productive, pay higher wages, and are more capital/skill intensive.`,
      `Option C: All domestic firms export a fraction of their goods to minimize risk.`,
      `Option D: Exporters and non-exporters have identical productivity profiles, differing only by location.`
    ],
    correct: 1,
    explanation: `Correct! Micro-data consistently shows that exporting is rare. Exporting firms are elite plants: they have higher productivity, larger employment scale, higher capital intensity, and pay premium wages compared to non-exporters.`
  },
  {
    id: 7,
    question: `The general equilibrium of the Melitz (2003) closed economy is pinned down by the intersection of which two curves?`,
    options: [
      `Option A: The Zero Cutoff Profit (ZCP) curve and the Free Entry (FE) curve, which determine $(\\varphi^*, \\bar{\\pi})$.`,
      `Option B: The Labor Supply curve and the Wage Pricing curve, which determine $(L, w)$.`,
      `Option C: The Iceberg Trade cost frontier and the Gravity curve, which determine $(\\tau, X_{ij})$.`,
      `Option D: The Pareto density tail and the Weibull cost index, which determine $(\\theta, \\Phi_j)$.`
    ],
    correct: 0,
    explanation: `Correct! The Melitz closed economy equilibrium resolves at the intersection of the downward-sloping ZCP curve ($\\bar{\\pi} = f \\cdot k(\\varphi^*)$) and the upward-sloping FE curve ($\\bar{\\pi} = \\frac{\\delta f_e}{1 - G(\\varphi^*)}$) to determine the cutoff survival threshold $\\varphi^*$ and average profit $\\bar{\\pi}$.`
  },
  {
    id: 8,
    question: `Which parameters increase the self-selection threshold of exporting in the Melitz model, making exporting rarer among active firms?`,
    options: [
      `Option A: Iceberg trade cost $\\tau$ is higher, or fixed export fee $f_x$ is higher.`,
      `Option B: Sunk entry fee $f_e$ is lower, or fixed operational fee $f$ is lower.`,
      `Option C: The elasticity of substitution $\\sigma$ approaches infinity.`,
      `Option D: Population $L$ increases, or domestic fixed cost $f$ increases.`
    ],
    correct: 0,
    explanation: `Correct! The export productivity cutoff is given by $\\varphi^*_x = \\varphi^* \\tau (f_x/f)^{\\frac{1}{\\sigma-1}}$. Increasing iceberg costs $\\tau$ or fixed export fees $f_x$ directly shifts the export cutoff rightward, restricting export status to a smaller elite subset of firms.`
  },
  {
    id: 9,
    question: `Why does opening to trade in the Melitz model increase aggregate welfare, even for consumers who only buy domestic varieties?`,
    options: [
      `Option A: Domestic firms receive government export subsidies, lowering home price levels.`,
      `Option B: The survival cutoff $\\varphi^*$ rises: low-productivity firms exit, and labor reallocates to highly productive exporters, raising real wages.`,
      `Option C: Opening trade lowers fixed entry fees, increasing total variety count.`,
      `Option D: Domestic firms face lower interest rates due to global financial integration.`
    ],
    correct: 1,
    explanation: `Correct! Trade integration raises the survival cutoff ($\\varphi^* > \\varphi^*_a$) because foreign exporters compete in the home market. Highly productive domestic firms expand into exporting, bid up the real wage, and force low-productivity firms to exit. Labor reallocates toward more productive plants, raising average productivity and real income: $W = \\frac{\\sigma-1}{\\sigma}\\left(\\frac{L}{\\sigma f}\\right)^{\\frac{1}{\\sigma-1}}\\varphi^*$.`
  },
  {
    id: 10,
    question: `Under a Pareto productivity distribution $G(\\varphi) = 1 - (\\varphi/a_i)^{-\\theta}$, what fraction of total sales revenue constitutes aggregate net profit in the Melitz-Pareto framework?`,
    options: [
      `Option A: $1 / \\sigma$.`,
      `Option B: $(\\gamma - 1) / (\\theta \\gamma)$.`,
      `Option C: $f_e / (f + f_x)$.`,
      `Option D: $(\\sigma - 1) / \\theta$.`
    ],
    correct: 1,
    explanation: `Correct! With a Pareto distribution, the constant markup pricing and free-entry lottery conditions imply that aggregate fixed marketing and operational costs collapse into constant shares of sales, leaving the net profit share as exactly $\\frac{\\gamma-1}{\\theta\\gamma}$ of total revenue.`
  },
  {
    id: 11,
    question: `In the Melitz-Pareto model with symmetric elasticities $\\sigma = \\gamma$, what is the value of the aggregate trade elasticity $\\epsilon$, and how does it relate to the substitution elasticity $\\sigma$?`,
    options: [
      `Option A: The elasticity is $\\sigma - 1$; the Pareto parameter $\\theta$ plays no role.`,
      `Option B: The elasticity is $\\theta$; substitution elasticity $\\sigma$ plays no role in the aggregate elasticity.`,
      `Option C: The elasticity is $\\theta \\times \\sigma$, showing strong synergistic coupling.`,
      `Option D: The elasticity is zero, indicating trade flows are completely inelastic.`
    ],
    correct: 1,
    explanation: `Correct! Chaney (2008) showed that when $\\sigma = \\gamma$, the aggregate trade elasticity is determined entirely by the Pareto shape parameter $\\theta$ (governing firm heterogeneity). Any change in substitution elasticity $\\sigma$ has exactly offsetting intensive and extensive margin effects, leaving the aggregate elasticity flat at $\\theta$.`
  },
  {
    id: 12,
    question: `How do the trade elasticity parameters compare across different quantitative trade frameworks?`,
    options: [
      `Option A: Elasticity is $\\theta$ in Armington/Krugman, and $\\sigma - 1$ in Eaton-Kortum.`,
      `Option B: Elasticity is zero in all frameworks except Melitz.`,
      `Option C: Elasticity is driven by taste ($\\sigma - 1$) in Armington/Krugman, and by technology/productivity heterogeneity (Pareto $\\theta$) in Eaton-Kortum and Melitz-Pareto.`,
      `Option D: Elasticity is governed strictly by fixed entry fees across all models.`
    ],
    correct: 2,
    explanation: `Correct! In models with homogenous firms (Armington, Krugman), the trade elasticity is determined by preference substitution ($\\sigma - 1$). In models with firm-level heterogeneity (Eaton-Kortum, Melitz-Pareto), trade elasticity is determined by the productivity distribution's tail index (Pareto $\\theta$).`
  },
  {
    id: 13,
    question: `What is the core message of the Arkolakis, Costinor, and Rodríguez-Clare (2012) (ACR) Sufficient-Statistic Paradigm?`,
    options: [
      `Option A: Heterogeneous firm models always predict significantly larger trade gains than homogenous firm models.`,
      `Option B: Diverse trade models yield identical aggregate gains from trade if they share the same trade elasticity ($\\epsilon$) and domestic trade share ($\\lambda_{ii}$).`,
      `Option C: Gains from trade can only be measured by tracking micro-level firm imports.`,
      `Option D: Iceberg costs are the only statistic required to calculate absolute trade volumes.`
    ],
    correct: 1,
    explanation: `Correct! ACR (2012) proved that a broad class of trade models (including Armington, Krugman, Eaton-Kortum, and Melitz-Pareto) deliver the exact same aggregate gains from trade, calculated using just two macro statistics: the share of domestic spending ($\\lambda_{ii}$) and the trade elasticity ($\\epsilon$), via: $\\widehat{W} = \\widehat{\\lambda}_{ii}^{-1/\\epsilon}$.`
  },
  {
    id: 14,
    question: `Why does the trade elasticity in the Melitz-Pareto model remain flat at $\\theta$ even as the elasticity of substitution $\\sigma \\to \\infty$?`,
    options: [
      `Option A: High substitution drives all firms to export, eliminating the selection margin.`,
      `Option B: A strong intensive response (consumers switching rapidly) is exactly offset by a weak extensive response (new marginal exporters entering at an extremely small scale).`,
      `Option C: Wages absorb all pricing shocks, neutralizing consumer substitution options.`,
      `Option D: The Pareto bounds shift dynamically to freeze the market share allocation.`
    ],
    correct: 1,
    explanation: `Correct! As $\\sigma \\to \\infty$, existing exporters respond aggressively to trade cost cuts (strong intensive margin). However, the new firms that enter exporting are marginal, low-productivity firms that enter at a negligible scale (weak extensive margin). These margins sum to $\\epsilon = (\\sigma - 1) + (\\theta - (\\sigma - 1)) = \\theta$, perfectly neutralizing the impact of $\\sigma$.`
  }
];

export default function Module4Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Trigger MathJax typeset on updates
  useEffect(() => {
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [currentQuestion, selectedAnswer, quizSubmitted, showResults]);

  const handleSelect = (idx) => {
    if (quizSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setQuizSubmitted(true);
    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="section-quiz-card">
        <h4 style={{ color: 'var(--accent-primary)', marginBottom: '16px' }}>
          📊 Final Quiz Assessment Results
        </h4>
        <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--card-border)', marginBottom: '20px' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0 0 10px 0' }}>
            Score: <span style={{ color: 'var(--accent-primary)' }}>{score}</span> / {quizQuestions.length}
          </p>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            {score === quizQuestions.length 
              ? 'Flawless! You have fully mastered Monopolistic Competition and Heterogeneous Firms!' 
              : score >= quizQuestions.length * 0.7 
              ? 'Great job! You have a strong grasp of variable markups, Melitz selection cutoffs, and gravity margins.' 
              : 'Review the mathematical steppers in the modules above and try again to solidify your understanding.'}
          </p>
        </div>
        <button className="quiz-btn quiz-btn-primary" onClick={handleRestart}>
          Restart Quiz Assessment
        </button>
      </div>
    );
  }

  const q = quizQuestions[currentQuestion];

  return (
    <div className="section-quiz-card">
      <h4 style={{ color: 'var(--accent-primary)', marginBottom: '4px' }}>
        📝 Module 4 Assessment Challenge
      </h4>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Question {currentQuestion + 1} of {quizQuestions.length}
      </span>

      <div className="quiz-question-box" style={{ marginTop: '20px' }}>
        <p style={{ fontWeight: 600, fontSize: '1.05rem', lineHeight: '1.4' }}>
          {q.question}
        </p>

        <div className="quiz-options-list">
          {q.options.map((option, idx) => {
            let itemClass = "";
            if (quizSubmitted) {
              if (idx === q.correct) {
                itemClass = "highlight-correct";
              }
              if (selectedAnswer === idx) {
                itemClass = idx === q.correct ? "selected-correct" : "selected-incorrect";
              }
            } else if (selectedAnswer === idx) {
              itemClass = "selected-answer";
            }

            return (
              <button
                key={idx}
                className={`quiz-option-item ${itemClass}`}
                onClick={() => handleSelect(idx)}
                disabled={quizSubmitted}
              >
                <span>{option}</span>
                {quizSubmitted && idx === q.correct && (
                  <span style={{ color: 'var(--accent-success)', fontWeight: 'bold' }}>✓</span>
                )}
                {quizSubmitted && selectedAnswer === idx && idx !== q.correct && (
                  <span style={{ color: 'var(--accent-error)', fontWeight: 'bold' }}>✗</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {quizSubmitted && (
        <div className={`quiz-feedback-box ${selectedAnswer === q.correct ? 'correct' : 'incorrect'}`}>
          <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>
            {selectedAnswer === q.correct ? '✓ Correct Answer' : '✗ Incorrect'}
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>
            {q.explanation}
          </p>
        </div>
      )}

      <div className="quiz-nav-row">
        <button
          className="quiz-btn quiz-btn-secondary"
          onClick={() => {
            if (currentQuestion > 0) {
              setCurrentQuestion((prev) => prev - 1);
              setSelectedAnswer(null);
              setQuizSubmitted(false);
            }
          }}
          disabled={currentQuestion === 0 || quizSubmitted}
        >
          ← Previous
        </button>

        {!quizSubmitted ? (
          <button
            className="quiz-btn quiz-btn-primary"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
          >
            Submit Answer
          </button>
        ) : (
          <button className="quiz-btn quiz-btn-primary" onClick={handleNext}>
            {currentQuestion === quizQuestions.length - 1 ? 'Finish Challenge' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  );
}
