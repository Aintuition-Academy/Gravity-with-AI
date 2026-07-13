import React from 'react';
import { ArrowRight, BookOpen, BarChart3, Sliders, Cpu } from 'lucide-react';

export default function Hero({ onStartModule }) {
  const methods = [
    {
      icon: <BookOpen size={24} />,
      title: "Core Theory",
      description: "Beginner-friendly explanations of classic economics frameworks, broken down step-by-step."
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Dynamic Graphs",
      description: "Visualize production boundaries, consumption gains, gravity patterns, and multi-good trade equilibriums."
    },
    {
      icon: <Sliders size={24} />,
      title: "Interactive Labs",
      description: "Adjust populations, unit labor requirements, trade costs, and elasticities in real-time to watch the curves shift."
    },
    {
      icon: <Cpu size={24} />,
      title: "AI Guidance",
      description: "Learn with contextual AI Tutor Tips and explanatory feedback to master complex concepts."
    }
  ];

  return (
    <div className="hero">
      <div className="hero-glow"></div>
      <div className="container">
        <h1>Gravity with AI</h1>
        <p>
          Learn international trade theory through interactive models, graphs, and AI-guided explanations.
        </p>
        
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
            This course provides a modern, rigorous path through the core theories of international trade—ranging from classical Ricardian and resources models to modern firm heterogeneity, political tariff design, and general equilibrium climate economics.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => onStartModule(1)} className="hero-btn">
              <span>Start Learning</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="features-grid">
          {methods.map((method, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper">
                {method.icon}
              </div>
              <h3>{method.title}</h3>
              <p>{method.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
