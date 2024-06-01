import React, {useState} from 'react';
import {removeAccents} from '../utils/utils.ts';
import {Dish} from '../model/Dish.ts';

export function DishesList({dishes}: {dishes: Dish[]}) {
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
        {dish.name}
        {dish.ingredients?.length && (
          <i> ({dish.ingredients.join(', ')})</i>
        )}
      </li>
    )}</ol>
    <a href="https://github.com/domi7777/dishes">code</a>

  </div>
}
