import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton.jsx";
import {
  capitalize,
  getIdFromUrl,
  getSpriteUrl,
} from "../utils.js";

function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite,
}) {
  const id = getIdFromUrl(pokemon.url);

  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className="pokemon-card"
    >
      <div className="pokemon-card-top">
        <span className="pokemon-id">
          #{id.padStart(3, "0")}
        </span>

        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={onToggleFavorite}
        />
      </div>

      <div className="pokemon-image-wrapper">
        <img
          className="pokemon-image"
          src={getSpriteUrl(id)}
          alt={pokemon.name}
          width={120}
          height={120}
        />
      </div>

      <div className="pokemon-card-info">
        <p className="pokemon-number">
          Pokémon #{id.padStart(3, "0")}
        </p>

        <h2>{capitalize(pokemon.name)}</h2>

        <span className="view-details">
          View details →
        </span>
      </div>
    </Link>
  );
}

export default PokemonCard;