import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Recipe Finder. Built with care.</p>
        <nav className="footer-nav" aria-label="Footer links">
          <a href="#privacy" className="footer-link">Privacy</a>
          <a href="#terms" className="footer-link">Terms</a>
          <a
            href="https://github.com/your-username/recipe-finder"
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