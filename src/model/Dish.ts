import {XlsSheet} from './Sheet.ts';

export type Dish = {
    name: string;
    ingredients: string[];
    recipe?: string;
};

export function sheetToDishes(sheet: XlsSheet): Dish[] {
  return sheet.table.rows
    .filter((row, index) => row.c[0].v && index > 0)  // first row = row title
    .map((row) => {
      const dish = row.c[0].v;
      let ingredients = row.c[1]?.v?.split(', ') ?? [];
      // Capitalize and sort ingredients for each dish
      ingredients = ingredients
        .map((ingredient: string) => ingredient.charAt(0).toUpperCase() + ingredient.slice(1))
        .sort();
      const recipe = row.c[2]?.v;
      return {name: dish, ingredients, recipe};
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
