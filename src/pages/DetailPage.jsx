import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config.js";
import {
  capitalize,
  getFavoritePokemon,
  saveFavoritePokemon,
} from "../utils.js";
import FavoriteButton from "../components/FavoriteButton.jsx";
import StatBar from "../components/StatBar.jsx";

function DetailPage() {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [favorites, setFavorites] = useState(
    getFavoritePokemon
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadPokemon() {
      setIsLoading(true);
      setError(null);
      setPokemon(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/pokemon/${name}`
        );

        if (!response.ok) {
          throw new Error(
            `No Pokémon named "${name}" was found.`
          );
        }

        const data = await response.json();

        if (isCurrent) {
          setPokemon(data);
        }
      } catch (err) {
        if (isCurrent) {
          setError(err.message);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      isCurrent = false;
    };
  }, [name]);

  useEffect(() => {
    if (pokemon) {
      document.title = `${capitalize(pokemon.name)} · PokéDex`;
    } else {
      document.title = "PokéDex";
    }

    return () => {
      document.title = "PokéDex";
    };
  }, [pokemon]);

  function toggleFavorite() {
    const updatedFavorites = favorites.includes(name)
      ? favorites.filter((favorite) => favorite !== name)
      : [...favorites, name];

    setFavorites(updatedFavorites);
    saveFavoritePokemon(updatedFavorites);
  }

  if (isLoading) {
    return (
      <div className="detail-status">
        <div className="loading-spinner"></div>
        <p>Loading {name}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-status error-page">
        <div className="error-pokeball">?</div>

        <h2>Pokémon not found</h2>

        <p>{error}</p>

        <Link to="/" className="back-button">
          ← Back to Pokédex
        </Link>
      </div>
    );
  }

  const artwork =
    pokemon.sprites.other["official-artwork"].front_default;

  return (
    <section className="detail-page">
      <Link to="/" className="back-button">
        ← Back to Pokédex
      </Link>

      <div className="detail-card">
        <div className="detail-top">
          <div className="detail-image-wrapper">
            <img
              src={artwork}
              alt={pokemon.name}
              className="detail-image"
            />
          </div>

          <div className="detail-summary">
            <p className="detail-id">
              #{String(pokemon.id).padStart(3, "0")}
            </p>

            <h2>{capitalize(pokemon.name)}</h2>

            <div className="type-list">
              {pokemon.types.map((typeInfo) => (
                <span
                  key={typeInfo.type.name}
                  className={`type-badge type-${typeInfo.type.name}`}
                >
                  {capitalize(typeInfo.type.name)}
                </span>
              ))}
            </div>

            <FavoriteButton
              isFavorite={favorites.includes(name)}
              onToggle={toggleFavorite}
            />
          </div>
        </div>

        <div className="detail-divider"></div>

        <div className="stats-section">
          <div className="stats-heading">
            <p className="section-label">BASE STATS</p>
            <h3>Battle statistics</h3>
          </div>

          <div className="stats-list">
            {pokemon.stats.map((stat) => (
              <StatBar
                key={stat.stat.name}
                name={stat.stat.name}
                value={stat.base_stat}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailPage;