import {
  SPRITE_BASE_URL,
  FAVORITES_STORAGE_KEY,
} from "./config.js";

export function getIdFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getSpriteUrl(id) {
  return `${SPRITE_BASE_URL}/${id}.png`;
}

export function getFavoritePokemon() {
  try {
    const favorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

    return favorites ? JSON.parse(favorites) : [];
  } catch {
    return [];
  }
}

export function saveFavoritePokemon(favorites) {
  localStorage.setItem(
    FAVORITES_STORAGE_KEY,
    JSON.stringify(favorites)
  );
}