import {XlsSheet} from './Sheet.ts';

export type Dish = {
    name: string;
    ingredients: string[];
};

export function sheetToDishes(sheet: XlsSheet): Dish[] {
  return sheet.table.rows
    .filter((row, index) => row.c[0].v && index > 0)  // first row = row title
    .map((row) => {
      const dish = row.c[0].v;
      const ingredients = row.c[1]?.v?.split(', ') ?? [];
      return {name: dish, ingredients};
    });
}
