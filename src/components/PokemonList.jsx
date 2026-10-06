import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config.js";
import {
  getFavoritePokemon,
  saveFavoritePokemon,
} from "../utils.js";
import PokemonCard from "./PokemonCard.jsx";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState(
    getFavoritePokemon
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPokemons() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/pokemon?limit=20`
        );

        if (!response.ok) {
          throw new Error(
            `Server responded with status ${response.status}`
          );
        }

        const data = await response.json();

        setPokemons(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadPokemons();
  }, []);

  function toggleFavorite(name) {
    const updatedFavorites = favorites.includes(name)
      ? favorites.filter((favorite) => favorite !== name)
      : [...favorites, name];

    setFavorites(updatedFavorites);
    saveFavoritePokemon(updatedFavorites);
  }

  if (isLoading) {
    return (
      <div className="status-card">
        <div className="loading-spinner"></div>
        <p>Loading Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-card status-error-card">
        <span className="status-icon">!</span>

        <h2>Oops!</h2>

        <p>
          Couldn't load the Pokémon list.
        </p>

        <small>{error}</small>
      </div>
    );
  }

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="section-label">POKÉDEX</p>
          <h2>First 20 Pokémon</h2>
        </div>

        <span className="pokemon-count">
          {pokemons.length} Pokémon
        </span>
      </div>

      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            isFavorite={favorites.includes(pokemon.name)}
            onToggleFavorite={() =>
              toggleFavorite(pokemon.name)
            }
          />
        ))}
      </div>
    </section>
  );
}

export default PokemonList;