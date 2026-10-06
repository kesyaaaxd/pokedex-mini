import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const name = query.trim().toLowerCase();

    if (name === "") {
      setError("Please enter a Pokémon name.");
      return;
    }

    setError(null);
    navigate(`/pokemon/${name}`);
  }

  function handleChange(event) {
    setQuery(event.target.value);

    if (error) {
      setError(null);
    }
  }

  return (
    <section className="hero-section">
      <div className="hero-content">
        <p className="hero-label">WELCOME, TRAINER!</p>

        <h2>Gotta catch them all.</h2>

        <p className="hero-description">
          Search for any Pokémon and discover its stats,
          types, and more.
        </p>

        <form
          onSubmit={handleSubmit}
          className="search-form"
        >
          <div className="search-input-wrapper">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search Pokémon by name..."
              className="search-input"
              aria-label="Search Pokémon"
            />
          </div>

          <button
            type="submit"
            className="search-button"
          >
            Search
          </button>
        </form>

        {error && (
          <p className="search-error">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}

export default SearchForm;