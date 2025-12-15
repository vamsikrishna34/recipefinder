// src/App.jsx
import React, { useState, useEffect } from 'react';
import { useRecipe } from './context/RecipeContext';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import FilterSection from './components/FilterSection'; 
import ResultsSection from './components/ResultsSection';
import Footer from './components/Footer';

function App() {
  const { state } = useRecipe();
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main id="main-content" className="main-content" role="main">
        <div className="container">
          <SearchSection />
          <FilterSection /> {/* ← Inserted here */}
          <ResultsSection 
            query={state.query} 
            filters={state.filters} 
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;