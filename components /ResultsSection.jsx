import React from 'react';

export default function ResultsSection() {
  // In Week 4, you’ll add: status, recipes, error state
  // For now: static UI matching Week 1–2

  return (
    <section id="results-section" className="results-section" aria-labelledby="results-heading">
      <h2 id="results-heading" className="section-title">Recipe Results</h2>
      <div id="results-status" className="sr-only" aria-live="polite"></div>

      <div id="recipe-list" className="recipe-grid" role="list">
        {/* Empty state (will be conditionally rendered in Week 4) */}
        <div id="empty-state" className="result-card empty-state" role="status">
          <h3>No recipes yet</h3>
          <p>Use the search bar above to discover delicious recipes.</p>
        </div>

        {/* Loading & error states ready for Week 4 */}
        {/* 
        <div id="loading-state" className="result-card loading-state" hidden>
          <h3>Loading…</h3>
          <p>Fetching recipes for you 🍳</p>
        </div>
        <div id="error-state" className="result-card error-state" hidden>
          <h3>Oops! Something went wrong</h3>
          <p>Could not load recipes. Please try again.</p>
        </div>
        */}
      </div>
    </section>
  );
}