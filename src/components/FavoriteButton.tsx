export function FavoriteButton({ isFavorite, onClick }: { isFavorite: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 text-2xl focus:outline-none"
      title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      aria-label="Favori"
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
}
