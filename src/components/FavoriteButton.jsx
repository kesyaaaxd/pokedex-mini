function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <button
      type="button"
      className={`favorite-button ${
        isFavorite ? "is-favorite" : ""
      }`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onToggle();
      }}
      aria-label={
        isFavorite
          ? "Remove from favorites"
          : "Add to favorites"
      }
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}

export default FavoriteButton;