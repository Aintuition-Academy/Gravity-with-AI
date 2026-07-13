import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Compass, ChevronDown } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const modulesList = [
    { id: 'module1', name: 'Module 1: Trade and Technology' },
    { id: 'module2', name: 'Module 2: Trade and Resources' },
    { id: 'module3', name: 'Module 3: GRAVITY with Gravitas' },
    { id: 'module4', name: 'Module 4: Monopolistic Competition & Heterogeneous Firms' },
    { id: 'module5', name: 'Module 5: Trade Policy & Welfare' },
    { id: 'module6', name: 'Module 6: The Structural Gravity Model' },
    { id: 'module7', name: 'Module 7: General Equilibrium Structural Gravity' },
    { id: 'module8', name: 'Module 8: Trade, Climate Change, and Agricultural/Environmental Economics' }
  ];

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isModuleActive = activeTab.startsWith('module');
  const activeModule = modulesList.find(m => m.id === activeTab);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <button onClick={() => { setActiveTab('home'); setIsOpen(false); }} className="logo">
          <Compass size={24} />
          <span>Gravity with AI</span>
        </button>
        <div className="nav-links">
          <button 
            onClick={() => { setActiveTab('home'); setIsOpen(false); }} 
            className={`nav-link-btn ${activeTab === 'home' ? 'active' : ''}`}
          >
            Home
          </button>
          
          <div className="modules-dropdown-container" ref={dropdownRef}>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`nav-link-btn ${isModuleActive ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {isModuleActive ? (activeModule ? activeModule.name.split(':')[0] : 'Modules') : 'Modules'}
              <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            
            {isOpen && (
              <div className="modules-dropdown-menu">
                {modulesList.map(mod => (
                  <button
                    key={mod.id}
                    className={`dropdown-item ${activeTab === mod.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(mod.id);
                      setIsOpen(false);
                    }}
                  >
                    <span>{mod.name}</span>
                    {activeTab === mod.id && <span style={{ fontSize: '0.8rem', marginLeft: '6px' }}>●</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
