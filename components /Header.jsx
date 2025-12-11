import React from 'react';

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="site-header" role="banner">
      <div className="container">
        <h1 className="site-title"> Recipe Finder</h1>
        <button
          className="theme-toggle"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Toggle ${theme === 'light' ? 'dark' : 'light'} theme`}
          onClick={toggleTheme}
          aria-pressed={theme === 'dark'}
        >
          <span className="theme-icon" aria-hidden="true"></span>
        </button>
      </div>
    </header>
  );
}