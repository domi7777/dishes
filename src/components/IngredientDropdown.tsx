import React, { useEffect, useRef } from 'react';

interface IngredientDropdownProps {
  ingredients: string[];
  isOpen: boolean;
  onSelect: (ingredient: string) => void;
  onToggle: () => void;
}

export const IngredientDropdown: React.FC<IngredientDropdownProps> = ({
  ingredients,
  isOpen,
  onSelect,
  onToggle,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="w-12 h-12 rounded-md bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-lg"
      >
        🥗
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 max-h-96 overflow-y-auto bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10">
          {ingredients.map((ingredient, index) => (
            <button
              key={index}
              onClick={() => onSelect(ingredient)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
            >
              {ingredient}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
