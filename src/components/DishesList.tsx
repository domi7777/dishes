import React, {useState} from 'react';
import {removeAccents} from '../utils/utils.ts';
import {Dish} from '../model/Dish.ts';

const highlightText = (text: string, wordToHighlight: string) => {
  if (wordToHighlight.length < 3) {
    return text;
  }

  const regex = new RegExp(`(${wordToHighlight})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    wordToHighlight.toLowerCase().includes(part.toLowerCase()) ? (
      <span key={index} style={{
        textDecoration: 'underline',
        textDecorationColor: 'yellow',
      }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

export function DishesList({dishes}: { dishes: Dish[] }) {
  const [filterText, setFilterText] = useState('');
  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const filteredDishes = dishes.filter((dish) =>
    [dish.name, ...dish.ingredients]
      .some((text) => removeAccents(text.toLowerCase()).includes(filterText.toLowerCase()))
  );

  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    textAlign: 'left'
  }}>
    <input type="text"
      style={{
        padding: '0.5rem',
        fontSize: '1.5rem',
        position: 'sticky',
        top: 0
      }}
      placeholder="Enter dish names or ingredients to filter"
      value={filterText}
      onChange={handleSearchTextChange}
    />

    <ol>{filteredDishes.map((dish, index) =>
      <li key={index}>
        {highlightText(dish.name, filterText)}
        {dish.ingredients?.length ? (
          <i> ({highlightText(dish.ingredients.join(', '), filterText)})</i>
        ) : null}
      </li>
    )}</ol>

  </div>
}
