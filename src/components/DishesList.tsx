import React, { useEffect, useState } from 'react';
import { normalize } from '../utils/normalize.ts';
import { highlightText } from '../utils/highlightText.tsx';
import { Dish } from '../model/Dish';
import { IngredientDropdown } from './IngredientDropdown';
import { FavoriteButton } from './FavoriteButton.tsx';
import { IngredientTag } from './IngredientTag.tsx';
import { RecipeButton } from './RecipeButton.tsx';

export function DishesList({ dishes }: { dishes: Dish[] }) {
  const [filterText, setFilterText] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('favoriteDishes') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favoriteDishes', JSON.stringify(favorites));
  }, [favorites]);

  const normalizedFilter = normalize(filterText);

  const filteredDishes = dishes.filter((dish) =>
    [dish.name, ...dish.ingredients, dish.recipe]
      .filter((text): text is string => typeof text === 'string')
      .some((text) =>
        normalize(text).includes(normalizedFilter)
      )
  );

  // Sort: favorites first, then others
  const sortedDishes = [
    ...filteredDishes.filter((dish) => favorites.includes(dish.name)),
    ...filteredDishes.filter((dish) => !favorites.includes(dish.name)),
  ];

  const availableIngredients = Array.from(new Set(
    dishes.flatMap((dish) => dish.ingredients.map((ingredient) => ingredient.charAt(0).toUpperCase() + ingredient.slice(1)))
  ))
    .reduce((acc, ingredient) => {
      const singular = ingredient.endsWith('s') ? ingredient.slice(0, -1) : null;
      if (singular && acc.includes(singular)) {
        return acc;
      }
      return [...acc, ingredient];
    }, [] as string[])
    .sort();

  const handleIngredientFilter = (ingredient: string) => {
    setFilterText(ingredient);
    setIsDropdownOpen(false); // Close the dropdown when an ingredient is selected
  };

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const setRandomDish = () => {
    const random = dishes[Math.floor(Math.random() * dishes.length)];
    setFilterText(random.name);
  };

  const toggleRecipe = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleFavorite = (dishName: string) => {
    setFavorites((prev) =>
      prev.includes(dishName)
        ? prev.filter((name) => name !== dishName)
        : [...prev, dishName]
    );
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">🍽️ Liste des plats</h1>

      <div className="flex gap-2 mb-6 sticky top-0 bg-gray-50 dark:bg-zinc-900 py-2 z-10">
        <IngredientDropdown
          ingredients={availableIngredients}
          isOpen={isDropdownOpen}
          onSelect={handleIngredientFilter}
          onToggle={toggleDropdown}
        />
        <input
          type="text"
          placeholder="Rechercher un plat, ingrédient ou recette…"
          value={filterText}
          onChange={handleSearchTextChange}
          className="flex-grow p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => setFilterText('')}
          className="w-12 h-12 rounded-md bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-lg flex items-center justify-center"
          aria-label="Effacer la recherche"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="white" aria-hidden="true">
            <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"/>
          </svg>
        </button>
        <button
          onClick={setRandomDish}
          className="w-12 h-12 rounded-md bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-lg"
        >
          🎲
        </button>
      </div>

      <ul className="grid gap-4">
        {sortedDishes.map((dish, index) => (
          <li
            key={dish.name}
            className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow border border-gray-200 dark:border-zinc-700 flex flex-col relative"
          >
            <FavoriteButton
              isFavorite={favorites.includes(dish.name)}
              onClick={() => toggleFavorite(dish.name)}
            />
            <p className="text-lg font-semibold pr-8">{highlightText(dish.name, filterText)}</p>

            {dish.ingredients?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {dish.ingredients.map((ingredient, i) => (
                  <IngredientTag
                    key={i}
                    ingredient={ingredient}
                    filterText={filterText}
                    onClick={() => setFilterText(ingredient)}
                  />
                ))}
              </div>
            )}

            {dish.recipe && (
              <RecipeButton
                isOpen={openIndex === index}
                onClick={() => toggleRecipe(index)}
              />
            )}

            {openIndex === index && dish.recipe && (
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                {highlightText(dish.recipe, filterText)}
              </p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
