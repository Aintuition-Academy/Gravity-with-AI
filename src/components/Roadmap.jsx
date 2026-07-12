import React from 'react';
import { Lock, Play } from 'lucide-react';

export default function Roadmap({ onSelectModule }) {
  const modules = [
    {
      id: 1,
      title: "Module 1: Trade and Technology",
      description: "Learn how technological differences generate comparative advantages, explore trade equilibrium, and study the Dornbusch-Fischer-Samuelson (DFS) continuum of goods model.",
      active: true,
      status: "Active"
    },
    {
      id: 2,
      title: "Module 2: Trade and Resources",
      description: "Explore how differences in resources drive trade through the Heckscher-Ohlin model, Stolper-Samuelson effects, Rybczynski theorem, and measuring gains from trade.",
      active: true,
      status: "Active"
    },
    {
      id: 3,
      title: "Module 3: GRAVITY with Gravitas",
      description: "Discover the gravity model of trade — why big economies trade more, why distance reduces trade, and how the Armington model generates structural gravity, multilateral resistance, and welfare gains.",
      active: true,
      status: "Active"
    },
    {
      id: 4,
      title: "Module 4: Monopolistic Competition & Heterogeneous Firms",
      description: "Explore New Trade Theory: Krugman's love-of-variety gains, Dixit-Stiglitz monopolistic competition, Melitz's firm heterogeneity and selection, and the Melitz-Pareto gravity connection.",
      active: true,
      status: "Active"
    },
    {
      id: 5,
      title: "Module 5: Trade Policy & Welfare",
      description: "Examine the welfare effects of trade interventions: tariffs, quotas, terms-of-trade gains, strategic export subsidies, duopoly profit shifting, retaliation wars, and political-economy models of protection.",
      active: true,
      status: "Active"
    },
    {
      id: 6,
      title: "Module 6: The Structural Gravity Model",
      description: "Master structural gravity: Armington and Eaton-Kortum derivations, inward/outward multilateral resistances, estimation challenges (PPML, zeros, heteroscedasticity, RTAs, endogeneity), the distance puzzle, and RTA effects.",
      active: true,
      status: "Active"
    },
    {
      id: 7,
      title: "Module 7: General Equilibrium Structural Gravity",
      description: "Perform counterfactual analysis: conditional vs. full general equilibrium, dynamic capital accumulation gravity, normalisation-free indexes, GEPPML loops, Trade Without Borders, and NAFTA models.",
      active: true,
      status: "Active"
    },
    ...Array.from({ length: 1 }, (_, i) => ({
      id: i + 8,
      title: `Module ${i + 8}: Coming Soon`,
      description: "This module is under development and will be added later.",
      active: false,
      status: "Coming Soon"
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
