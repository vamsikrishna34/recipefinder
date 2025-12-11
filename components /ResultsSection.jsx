import React, { useState, useEffect } from 'react';

export default function ResultsSection({ query }) {
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState('idle'); 
  const [error, setError] = useState(null);

  
  useEffect(() => {
    
    if (!query.trim()) {
      setRecipes([]);
      setStatus('idle');
      return;
    }

    setStatus('loading');
    setError(null);

    
    const timer = setTimeout(() => {
      const fetchRecipes = async () => {
        try {
         
          const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
          const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${encodeURIComponent(query)}&number=9&addRecipeInformation=true`;

          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();
          setRecipes(data.results || []);
          setStatus('success');
        } catch (err) {
          console.error('Fetch error:', err);
          setError(err.message || 'Failed to load recipes.');
          setStatus('error');
        }
      };

      fetchRecipes();
    }, 300);

   
    return () => clearTimeout(timer);
  }, [query]);

  
  if (status === 'loading') {
    return (
      <section id="results-section" className="results-section" aria-labelledby="results-heading">
        <h2 id="results-heading" className="section-title">Searching…</h2>
        <div className="recipe-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="recipe-card skeleton-card" aria-hidden="true">
              <div className="skeleton recipe-image"></div>
              <div className="recipe-content">
                <div className="skeleton title"></div>
                <div className="skeleton meta"></div>
                <div className="skeleton summary"></div>
                <div className="skeleton link"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section id="results-section" className="results-section" aria-labelledby="results-heading">
        <h2 id="results-heading" className="section-title">Oops!</h2>
        <div className="result-card error-state" role="alert">
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <p>Check your internet or try again later.</p>
        </div>
      </section>
    );
  }

  if (status === 'success' && recipes.length === 0) {
    return (
      <section id="results-section" className="results-section" aria-labelledby="results-heading">
        <h2 id="results-heading" className="section-title">No Matches</h2>
        <div className="result-card empty-state" role="status">
          <h3>No recipes found for “{query}”</h3>
          <p>Try a different ingredient or dish name.</p>
        </div>
      </section>
    );
  }

 
  return (
    <section id="results-section" className="results-section" aria-labelledby="results-heading">
      <h2 id="results-heading" className="section-title">
        {recipes.length} Recipe{recipes.length !== 1 ? 's' : ''} for “{query}”
      </h2>
      <div id="recipe-list" className="recipe-grid" role="list">
        {recipes.map(recipe => (
          <article key={recipe.id} className="recipe-card" role="listitem">
            <img
              src={recipe.image || 'https://spoonacular.com/recipeImages/default.jpg'}
              alt={recipe.title}
              className="recipe-image"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://placehold.co/300x180/e2e8f0/64748b?text=No+Image';
              }}
            />
            <div className="recipe-content">
              <h3>{recipe.title}</h3>
              <div className="recipe-meta">
                <span>{recipe.readyInMinutes} min</span>
                <span>{recipe.servings} servings</span>
              </div>
              <p className="recipe-summary">
                {recipe.summary
                  ? recipe.summary.replace(/<[^>]*>/g, '').substring(0, 120) + '…'
                  : 'Delicious recipe waiting to be discovered.'}
              </p>
              <a
                href={recipe.sourceUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="recipe-link"
                aria-label={`View recipe: ${recipe.title}`}
              >
                View Recipe →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}