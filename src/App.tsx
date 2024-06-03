import {DishesList} from './components/DishesList.tsx';
import {useEffect, useState} from 'react';
import {Dish, sheetToDishes} from './model/Dish.ts';
import {loadSheet} from './model/Sheet.ts';

const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/1qoO9sBU7qr8JbIJwPUruF-k27JiaQI8zFRcYi1pyMkY/gviz/tq?tqx=out:json&tq&gid=0';

function App() {
  const  [dishes, setDishes] = useState<Dish[] | undefined>();
  useEffect(() => {
    loadSheet(googleSheetUrl).then((sheet) => {
      setDishes(sheetToDishes(sheet));
    });
  }, []);

  return (
    <>
      {
        dishes ?
          <DishesList dishes={dishes} /> :
          <img src="./icons/pwa-512x512.png" alt="loading" />
      }
    </>
  )
}

export default App
