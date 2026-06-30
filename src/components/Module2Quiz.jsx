import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';

export default function Module2Quiz() {
  const questions = [
    {
      id: 1,
      topic: "Factor Abundance",
      question: "Home has 500 workers and 200 machines. Foreign has 300 workers and 300 machines. Which country is labor-abundant?",
      options: [
        "Home — its K/L ratio (0.4) is lower than Foreign's (1.0)",
        "Foreign — it has more machines per worker",
        "Neither — both countries have the same total resources"
      ],
      correctAnswer: 0,
      explanation: "Home's K/L ratio is 200/500 = 0.4. Foreign's K/L ratio is 300/300 = 1.0. A lower K/L ratio means relatively more labor per unit of capital, making Home labor-abundant."
    },
    {
      id: 2,
      topic: "Factor Intensity",
      question: "Good A uses 10 units of labor and 2 units of capital. Good B uses 4 units of labor and 8 units of capital. Which good is capital-intensive?",
      options: [
        "Good A — it uses more labor",
        "Good B — its K/L ratio (2.0) is higher than Good A's (0.2)",
        "Both goods are equally capital-intensive"
      ],
      correctAnswer: 1,
      explanation: "Good A has K/L = 2/10 = 0.2. Good B has K/L = 8/4 = 2.0. Since Good B uses relatively more capital per unit of labor, it is capital-intensive."
    },
    {
      id: 3,
      topic: "Heckscher-Ohlin Prediction",
      question: "If Home is labor-abundant and Good X is labor-intensive, what does the Heckscher-Ohlin model predict?",
      options: [
        "Home exports Good X",
        "Home imports Good X",
        "Home produces both goods equally"
      ],
      correctAnswer: 0,
      explanation: "The HO model predicts that a country exports the good that uses its abundant factor intensively. Since Home is labor-abundant and Good X is labor-intensive, Home exports Good X."
    },
    {
      id: 4,
      topic: "Cost Shares",
      question: "A firm pays wages of $60 and capital rent of $40 to produce one unit of output. What is the labor cost share?",
      options: [
        "0.40",
        "0.60",
        "1.50"
      ],
      correctAnswer: 1,
      explanation: "Total unit cost = 60 + 40 = 100. Labor cost share θL = wL/c = 60/100 = 0.60. This means 60% of total cost goes to labor."
    },
    {
      id: 5,
      topic: "Hat Algebra",
      question: "If θK = 0.3, θL = 0.7, rent rises by 10% (r̂ = 0.10), and wage rises by 2% (ŵ = 0.02), what is the percentage change in unit cost?",
      options: [
        "ĉ = 0.044 (4.4%)",
        "ĉ = 0.12 (12%)",
        "ĉ = 0.06 (6%)"
      ],
      correctAnswer: 0,
      explanation: "ĉ = θK × r̂ + θL × ŵ = 0.3 × 0.10 + 0.7 × 0.02 = 0.03 + 0.014 = 0.044 or 4.4%. The unit cost change is a weighted average of factor price changes."
    },
    {
      id: 6,
      topic: "Stolper-Samuelson Effect",
      question: "In the Stolper-Samuelson model, if the price of the skilled-intensive good rises, what happens to skilled workers' real earnings?",
      options: [
        "Skilled workers' real earnings rise — their wage increases more than all goods prices",
        "Skilled workers' real earnings fall",
        "Skilled workers' earnings stay the same"
      ],
      correctAnswer: 0,
      explanation: "The Stolper-Samuelson theorem says the factor used intensively in the rising-price industry sees its real earnings rise. If the skilled-intensive good's price rises, skilled wages rise more than both goods prices, increasing purchasing power."
    },
    {
      id: 7,
      topic: "Real Wage & Purchasing Power",
      question: "A worker's wage rises by 3%, but the price of goods rises by 7%. Is the worker better or worse off in real terms?",
      options: [
        "Better off — any wage increase is good",
        "Worse off — prices rose faster than wages, reducing purchasing power",
        "Unchanged — wages and prices both rose"
      ],
      correctAnswer: 1,
      explanation: "Real wage change ≈ wage growth − price growth = 3% − 7% = −4%. Since prices rose faster than the worker's wage, the worker can buy less than before and is worse off."
    },
    {
      id: 8,
      topic: "Rybczynski Theorem",
      question: "If capital supply increases while labor stays fixed, and food is capital-intensive, what does the Rybczynski theorem predict?",
      options: [
        "Food output rises and cloth output falls",
        "Both food and cloth output rise",
        "Food output falls and cloth output rises"
      ],
      correctAnswer: 0,
      explanation: "The Rybczynski theorem says that an increase in a factor's supply expands production of the good that uses that factor intensively and contracts the other sector. More capital → more food (capital-intensive), less cloth (labor-intensive)."
    },
    {
      id: 9,
      topic: "Measuring Gains from Trade",
      question: "When measuring welfare change from autarky to free trade, why do economists evaluate both baskets at autarky prices?",
      options: [
        "Because autarky prices reflect the opportunity cost of goods before trade opens",
        "Because free trade prices are always lower",
        "Because autarky prices are easier to calculate"
      ],
      correctAnswer: 0,
      explanation: "By evaluating both the autarky and free trade consumption baskets at autarky prices, we measure whether the new basket is worth more in terms of what the country was giving up before trade. This reflects the true welfare gain."
    },
    {
      id: 10,
      topic: "Net Imports & Production Change",
      question: "In the formula ΔW = PA·(CB − QB) + PA·(QB − QA), what does the term (CB − QB) represent?",
      options: [
        "The change in production from autarky to free trade",
        "Net imports under free trade",
        "Total consumption under autarky"
      ],
      correctAnswer: 1,
      explanation: "CB − QB is consumption minus production under free trade. When consumption exceeds production for a good, the country is importing it. This term represents the vector of net imports, which is readily available from trade data."
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (optIdx) => {
    if (isAnswered) return;
    setSelectedOpt(optIdx);
    setIsAnswered(true);
    if (optIdx === questions[currentIdx].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextClick = () => {
    setSelectedOpt(null);
    setIsAnswered(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  const activeQuestion = questions[currentIdx];

  if (showResult) {
    return (
      <div className="quiz-result-card">
        <div className="quiz-score-circle">
          <span className="quiz-score-num">{score}</span>
          <span className="quiz-score-label">out of {questions.length}</span>
        </div>
        <h3>Module 2 Quiz Completed!</h3>
        <p>
          {score === questions.length 
            ? "Outstanding! You have fully mastered Trade and Resources."
            : score >= 7 
              ? "Great work! You understand most concepts well. Review the calculators and tips to perfect your score."
              : score >= 4
                ? "Good effort! Go back through the lessons and try the interactive calculators to strengthen your understanding."
                : "Keep studying! Interact with the sliders and calculators in each lesson to build deeper intuition."}
        </p>
        <button onClick={handleRestart} className="quiz-next-btn" style={{ margin: '0 auto' }}>
          <RotateCcw size={16} />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="quiz-header">
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            {activeQuestion.topic}
          </span>
          <h4 style={{ fontSize: '1.1rem', marginTop: '4px' }}>Question {currentIdx + 1}</h4>
        </div>
        <span className="quiz-progress">
          Progress: {currentIdx + 1} / {questions.length}
        </span>
      </div>

      <div className="quiz-question-card">
        <h3>{activeQuestion.question}</h3>
        
        <div className="quiz-options">
          {activeQuestion.options.map((opt, idx) => {
            let className = 'quiz-option-btn';
            if (isAnswered) {
              className += ' disabled';
              if (idx === activeQuestion.correctAnswer) {
                className += ' correct';
              } else if (idx === selectedOpt) {
                className += ' incorrect';
              }
            } else if (idx === selectedOpt) {
              className += ' selected';
            }

            return (
              <button 
                key={idx} 
                className={className}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`quiz-feedback ${selectedOpt === activeQuestion.correctAnswer ? 'correct-feedback' : 'incorrect-feedback'}`}>
            <div style={{ marginTop: '2px' }}>
              {selectedOpt === activeQuestion.correctAnswer 
                ? <CheckCircle2 size={20} style={{ color: 'var(--accent-success)' }} /> 
                : <XCircle size={20} style={{ color: 'var(--accent-error)' }} />}
            </div>
            <div>
              <h4>{selectedOpt === activeQuestion.correctAnswer ? 'Correct Answer!' : 'Incorrect'}</h4>
              <p>{activeQuestion.explanation}</p>
            </div>
          </div>
        )}

        {isAnswered && (
          <div className="quiz-action-row">
            <button onClick={handleNextClick} className="quiz-next-btn">
              <span>{currentIdx === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
