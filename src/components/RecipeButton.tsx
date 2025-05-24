export function RecipeButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-2 text-sm text-indigo-600 dark:text-indigo-300 hover:underline"
    >
      {isOpen ? 'Masquer la recette' : 'Voir la recette'}
    </button>
  );
}
