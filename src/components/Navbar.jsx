import React from 'react';
import { Sun, Moon, Compass } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <button onClick={() => setActiveTab('home')} className="logo">
          <Compass size={24} />
          <span>Gravity with AI</span>
        </button>
        <div className="nav-links">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`nav-link-btn ${activeTab === 'home' ? 'active' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('module1')} 
            className={`nav-link-btn ${activeTab === 'module1' ? 'active' : ''}`}
          >
            Module 1
          </button>
          <button 
            onClick={() => setActiveTab('module2')} 
            className={`nav-link-btn ${activeTab === 'module2' ? 'active' : ''}`}
          >
            Module 2
          </button>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
