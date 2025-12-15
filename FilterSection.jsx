
import React from 'react';
import { useRecipe } from '../context/RecipeContext';

const filterOptions = [
  { key: 'vegetarian', label: 'Vegetarian' },
  { key: 'vegan', label: 'Vegan' },
  { key: 'glutenFree', label: ' Gluten Free' },
  { key: 'dairyFree', label: ' Dairy Free' },
  { key: 'nutFree', label: 'Nut Free' },
];

export default function FilterSection() {
  const { state, dispatch } = useRecipe();

  const toggleFilter = (key) => {
    dispatch({ type: 'TOGGLE_FILTER', payload: key });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const activeCount = Object.values(state.filters).filter(Boolean).length;

  return (
    <section className="filter-section" aria-labelledby="filter-heading">
      <div className="filter-header">
        <h2 id="filter-heading" className="section-title">Diet & Intolerance Filters</h2>
        {activeCount > 0 && (
          <button
            type="button"
            className="reset-filters"
            onClick={resetFilters}
            aria-label={`Reset ${activeCount} active filters`}
          >
            Reset ({activeCount})
          </button>
        )}
      </div>

      <div className="filter-chips">
        {filterOptions.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={`filter-chip ${state.filters[key] ? 'active' : ''}`}
            onClick={() => toggleFilter(key)}
            aria-pressed={state.filters[key]}
            aria-label={`${state.filters[key] ? 'Remove' : 'Apply'} ${label} filter`}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}