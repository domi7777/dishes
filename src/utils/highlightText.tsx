export const highlightText = (text: string, query: string) => {
  if (query.length < 3) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  return text.split(regex).map((part, index) =>
    query.toLowerCase().includes(part.toLowerCase()) ? (
      <span key={index} className="text-green-600 font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
};
