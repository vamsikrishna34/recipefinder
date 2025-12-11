import React, { useState, useEffect } from 'react';
import './styles.css';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
  const [query, setQuery] = useState('');

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
          <SearchSection onSearch={setQuery} currentQuery={query} />
          <ResultsSection query={query} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;