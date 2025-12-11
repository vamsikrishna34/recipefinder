import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Recipe Finder.</p>
        <nav className="footer-nav" aria-label="Footer links">
          <a
            href="https://github.com/vamsikrishna34/recipefinder"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}