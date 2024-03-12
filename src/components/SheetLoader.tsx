import React, {useEffect, useState} from 'react';
import {removeAccents} from '../utils/utils.ts';
import {loadSheet, XlsSheet} from '../utils/XlsSheet.ts';

const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/1qoO9sBU7qr8JbIJwPUruF-k27JiaQI8zFRcYi1pyMkY/gviz/tq?tqx=out:json&tq&gid=0';

type Dish = {
    name: string;
    ingredients: string[];
}

function sheetToDishes(sheet: XlsSheet) {
  return sheet.table.rows
    .filter((row, index) => row.c[0].v && index > 0)  // first row = row title
    .map((row) => {
      const dish = row.c[0].v;
      const ingredients = row.c[1]?.v?.split(', ') ?? [];
      return {name: dish, ingredients};
    });
}

export function SheetsLoader() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    loadSheet(googleSheetUrl).then((sheet) => {
      setDishes(sheetToDishes(sheet));
    });
  }, []);

  console.log({dishes});

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
        fontSize: '1.5rem'
      }} placeholder="Enter text to filter"
      value={filterText}
      onChange={handleSearchTextChange}
    />

    <ol>{filteredDishes.map((dish, index) =>
      <li key={index}>
        {dish.name} - <i>({dish.ingredients.join(', ')})</i>
      </li>
    )}</ol>
    <a href="https://github.com/domi7777/dishes">code</a>

  </div>
}
