export default function formatDate(date: string) {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('pt-BR', options);

  return formattedDate;
}
