import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Award } from 'lucide-react';

export default function Quiz() {
  const questions = [
    {
      id: 1,
      topic: "Comparative Advantage",
      question: "If Home's opportunity cost of producing manufacturing is 0.5 units of agriculture and Foreign's is 1.5 units, who has the comparative advantage in manufacturing?",
      options: [
        "Home",
        "Foreign",
        "Neither"
      ],
      correctAnswer: 0,
      explanation: "Home has a lower opportunity cost (0.5 < 1.5) and thus has the comparative advantage in manufacturing. A country has a comparative advantage in a good if its opportunity cost of producing that good is lower than its trading partner's."
    },
    {
      id: 2,
      topic: "Opportunity Cost",
      question: "What does opportunity cost mean in the context of trade theory?",
      options: [
        "The total financial cost of hiring workers.",
        "The quantity of other goods you must give up to produce one unit of a good.",
        "The maximum amount of absolute labor productivity a country possesses."
      ],
      correctAnswer: 1,
      explanation: "Opportunity cost represents what you give up (in terms of other products) to produce something else. In a 2-good model, to produce 1 unit of Mfg, Home must give up a₁/a₂ units of Agri."
    },
    {
      id: 3,
      topic: "Unit Labor Requirement",
      question: "If a country has a unit labor requirement of 4 for Agriculture (a₂ = 4), how many hours of labor are needed to produce one unit of Agriculture?",
      options: [
        "0.25 hours",
        "4 hours",
        "8 hours"
      ],
      correctAnswer: 1,
      explanation: "The unit labor requirement represents the number of units of labor (e.g. hours or workers) required to produce exactly one unit of output. Since a₂ = 4, it takes 4 hours of labor."
    },
    {
      id: 4,
      topic: "Labor Productivity",
      question: "If the unit labor requirement for Manufacturing is 2 (a₁ = 2), what is the labor productivity in Manufacturing?",
      options: [
        "2 units of Manufacturing per unit of labor.",
        "0.5 units of Manufacturing per unit of labor.",
        "4 units of Manufacturing per unit of labor."
      ],
      correctAnswer: 1,
      explanation: "Labor productivity is the inverse of the unit labor requirement (1/a₁). If it takes 2 hours of labor to produce 1 unit of Mfg, then 1 hour of labor can produce 1/2 = 0.5 units of Mfg."
    },
    {
      id: 5,
      topic: "Production Possibility Frontier (PPF)",
      question: "A change in equilibrium outcomes, such as moving from autarky to free trade, does what to a country's PPF?",
      options: [
        "It shifts the PPF outward.",
        "It rotates the PPF inward.",
        "It does not change the PPF at all."
      ],
      correctAnswer: 2,
      explanation: "The PPF is constructed using exogenously given labor endowments (L) and productivity parameters (a₁, a₂). Changing trade policy or prices affects consumption and production locations, but doesn't change the underlying PPF boundary."
    },
    {
      id: 6,
      topic: "Consumption Possibility Frontier (CPF)",
      question: "How does the Consumption Possibility Frontier (CPF) compare to the PPF in autarky (a closed economy)?",
      options: [
        "The CPF lies strictly outside the PPF.",
        "The CPF is identical to the PPF.",
        "The CPF lies strictly inside the PPF."
      ],
      correctAnswer: 1,
      explanation: "In autarky (closed economy), a country can only consume what it produces domestically. Therefore, its consumption possibilities are strictly limited to its production possibilities, making the CPF and PPF identical."
    },
    {
      id: 7,
      topic: "Gains from Trade",
      question: "Why does free trade allow a country to consume at a point outside its PPF?",
      options: [
        "Trade increases the total amount of domestic labor available.",
        "Trade allows countries to specialize in their comparative advantage sectors and import the other good at a cheaper relative price.",
        "Trade shifts the unit labor requirements downward."
      ],
      correctAnswer: 1,
      explanation: "Trade does not alter domestic resources (L) or technology coefficients (a₁). Instead, by allowing countries to specialize in what they do relatively best and trade at world prices, they can import goods at a lower opportunity cost than producing them at home."
    },
    {
      id: 8,
      topic: "DFS Continuum Model",
      question: "In the Dornbusch-Fischer-Samuelson (DFS) continuum model, how is the marginal good z₀ determined in general equilibrium?",
      options: [
        "At the intersection of the relative productivity schedule A(z) and the demand-side schedule B(z).",
        "At the point where unit labor requirements are equal (a(z) = a*(z)).",
        "At the point where the world relative wage is exactly equal to 1 (ω = 1)."
      ],
      correctAnswer: 0,
      explanation: "The marginal good z₀ and relative wage ω are jointly pinned down where supply-side productivity ratios A(z) match the demand-side labor market-clearing curve B(z), so A(z₀) = B(z₀)."
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
        <h3>Module 1 Quiz Completed!</h3>
        <p>
          {score === questions.length 
            ? "Outstanding! You have fully mastered the Ricardian foundations of trade theory."
            : score >= 5 
              ? "Good job! You understand the core concepts. Review the graphs and tips to get a perfect score."
              : "Keep studying! Try interacting with the sliders in the lab to see how opportunity costs and populations affect the equilibrium."}
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
