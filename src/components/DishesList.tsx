import React, { useState } from 'react';
import { removeAccents } from '../utils/utils.ts';
import { Dish } from '../model/Dish.ts';

const highlightText = (text: string, wordToHighlight: string) => {
  if (wordToHighlight.length < 3) {
    return text;
  }

  const regex = new RegExp(`(${wordToHighlight})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    wordToHighlight.toLowerCase().includes(part.toLowerCase()) ? (
      <span key={index} className="text-green-600 font-semibold">{part}</span>
    ) : (
      part
    )
  );
};

export function DishesList({ dishes }: { dishes: Dish[] }) {
  const [filterText, setFilterText] = useState('');

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const filteredDishes = dishes.filter((dish) =>
    [dish.name, ...dish.ingredients]
      .some((text) => removeAccents(text.toLowerCase()).includes(
        removeAccents(filterText.toLowerCase()))
      )
  );
  
  function setRandomDish() {
    const randomIndex = Math.floor(Math.random() * dishes.length);
    setFilterText(dishes[randomIndex].name);
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">🍽️ Liste des plats</h1>

      <div className="flex gap-2 mb-6 sticky top-0 bg-gray-50 dark:bg-zinc-900 py-2 z-10">
        <input
          type="text"
          placeholder="Rechercher un plat ou ingrédient…"
          value={filterText}
          onChange={handleSearchTextChange}
          className="flex-grow p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => setFilterText('')}
          className="w-12 h-12 rounded-md bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-lg"
        >
          ✖️
        </button>
        <button
          onClick={setRandomDish}
          className="w-12 h-12 rounded-md bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-lg"
        >
          🎲
        </button>
      </div>

      <ol className="grid gap-4">
        {filteredDishes.map((dish, index) => (
          <li
            key={index}
            className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow border border-gray-200 dark:border-zinc-700"
          >
            <p className="text-lg font-semibold">
              {index + 1}. {highlightText(dish.name, filterText)}
            </p>
            {dish.ingredients?.length > 0 && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 italic">
                ({highlightText(dish.ingredients.join(', '), filterText)})
              </p>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}
