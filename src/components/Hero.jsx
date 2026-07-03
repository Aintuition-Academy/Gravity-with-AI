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
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 24px auto' }}>
            Our curriculum covers <strong>Module 1: Trade and Technology</strong>, <strong>Module 2: Trade and Resources</strong>, and <strong>Module 3: GRAVITY with Gravitas</strong> — with more modules coming soon.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onStartModule(1)} className="hero-btn">
              <span>Module 1</span>
              <ArrowRight size={18} />
            </button>
            <button onClick={() => onStartModule(2)} className="hero-btn" style={{ background: 'linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-primary) 100%)' }}>
              <span>Module 2</span>
              <ArrowRight size={18} />
            </button>
            <button onClick={() => onStartModule(3)} className="hero-btn" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)' }}>
              <span>Module 3</span>
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
