export type XlsSheetRow = {
    c: { v: string }[];
}

export type XlsSheet = {
    table: {
        rows: XlsSheetRow[];
    };
}

export async function loadSheet(googleSheetUrl: string) {
  const rep = await fetch(googleSheetUrl)
  const text = await rep.text();
  // console.log({text});
  const json = text.slice(47, -2)
  return JSON.parse(json) as XlsSheet;
}
