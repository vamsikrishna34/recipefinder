import React, { useState } from 'react';

export default function SearchSection({ onSearch, currentQuery }) {
  const [query, setQuery] = useState(currentQuery || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length < 2) return;
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <section id="search-section" className="search-section" aria-labelledby="search-heading">
      <h2 id="search-heading" className="section-title">Find Your Next Favorite Recipe</h2>
      <form id="search-form" className="search-form" role="search" onSubmit={handleSubmit}>
        <label htmlFor="search-input" className="form-label">
          Search by dish, ingredient, or cuisine
        </label>
        <div className="input-group">
          <input
            type="text"
            id="search-input"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., creamy mushroom pasta, vegan cookies"
            aria-describedby="search-hint"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-button"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          <button type="submit" className="search-button" aria-label="Search recipes">
            Search
          </button>
        </div>
        <p id="search-hint" className="hint-text">
          Try: “chicken curry”, “gluten free”, or “quick dinner”
        </p>
      </form>
    </section>
  );



}