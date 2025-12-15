
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  query: '',
  filters: {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
  },
};

// Reducer
function recipeReducer(state, action) {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'TOGGLE_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload]: !state.filters[action.payload],
        },
      };
    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters };
    case 'LOAD_FROM_URL':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// Context
const RecipeContext = createContext();

// Provider
export function RecipeProvider({ children }) {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  // Sync filters to URL (optional but pro)
  useEffect(() => {
    const params = new URLSearchParams();
    if (state.query) params.set('q', state.query);
    
    const activeFilters = Object.keys(state.filters).filter(
      key => state.filters[key]
    );
    if (activeFilters.length) {
      params.set('diet', activeFilters.join(','));
    }

    // Update URL without reloading
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState(null, '', newUrl);
  }, [state.query, state.filters]);

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
}

// Custom hook
export function useRecipe() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
}