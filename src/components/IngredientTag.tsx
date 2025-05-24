import { highlightText } from '../utils/highlightText';
export function IngredientTag({ ingredient, filterText, onClick }: { ingredient: string; filterText: string; onClick: () => void }) {
  return (
    <span
      className="px-3 py-1 rounded-full bg-gray-200 dark:bg-zinc-700 text-sm text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-green-200 dark:hover:bg-green-600"
      onClick={onClick}
    >
      {highlightText(ingredient, filterText)}
    </span>
  );
}
