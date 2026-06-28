import React from 'react';
import { Lock, Unlock, Play } from 'lucide-react';

export default function Roadmap({ activeModule, onSelectModule }) {
  const modules = [
    {
      id: 1,
      title: "Module 1: Ricardian Foundations of Trade",
      description: "Learn how technological differences generate comparative advantages, explore trade equilibrium, and study the Dornbusch-Fischer-Samuelson (DFS) continuum of goods model.",
      active: true,
      status: "Active"
    },
    ...Array.from({ length: 7 }, (_, i) => ({
      id: i + 2,
      title: `Module ${i + 2}: Coming Soon`,
      description: "This module will be added later.",
      active: false,
      status: "Future Module"
    }))
  ];

  return (
    <section className="roadmap-section">
      <div className="container">
        <h2 className="section-title">Course Roadmap</h2>
        <p className="section-subtitle">
          Master international economics step by step, from foundational classical theories to advanced models.
        </p>
        
        <div className="roadmap-grid">
          {modules.map((mod) => (
            <div 
              key={mod.id} 
              className={`roadmap-card ${mod.active ? 'active' : 'locked'}`}
              onClick={() => mod.active && onSelectModule(mod.id)}
            >
              <div>
                <span className={`module-badge ${mod.active ? 'active-badge' : 'locked-badge'}`}>
                  {mod.status}
                </span>
                <h3>{mod.title}</h3>
                <p>{mod.description}</p>
              </div>
              <div className="card-footer-action">
                {mod.active ? (
                  <>
                    <span>Enter Module</span>
                    <Play size={14} />
                  </>
                ) : (
                  <>
                    <span>Locked</span>
                    <Lock size={14} />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
