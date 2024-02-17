import {useEffect, useState} from 'react';

async function loadSheet() {
  const rep = await fetch('https://docs.google.com/spreadsheets/d/1qoO9sBU7qr8JbIJwPUruF-k27JiaQI8zFRcYi1pyMkY/gviz/tq?tqx=out:json&tq&gid=0')
  const text = await rep.text();
  // console.log({text});
  const json = text.slice(47, -2)
  return JSON.parse(json);
}

export function SheetsLoader() {
  const [table, setTable] = useState(null);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    loadSheet().then((sheet) => {
      setTable(sheet.table);
      // dish is there: table.rows[0].c[0].v
      setDishes(sheet.table.rows.map((row: any) => row.c[0].v));
    });
  }, []);

  console.log({table});

  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    textAlign: 'left'
  }}>
    <h3>Les petits plats</h3>
    {dishes && <ol>
      {dishes.map((dish: string, index: number) => <li key={index}>{dish}</li>)}
    </ol>}
  </div>
}
