export default function formatDate(date) {
  const dateObj = new Date(date);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('pt-BR', options);

  return formattedDate;
}
