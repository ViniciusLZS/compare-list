export default function CleanMask(value: string) {
  let newValue = value.replace(/\D/g, '');

  // Converte para número e realiza a operação de divisão
  const numericValue = Number(newValue) / 100;

  // Formata o valor em moeda com duas casas decimais
  newValue = numericValue.toFixed(2).replace(',', '.');

  // Remover o símbolo de real
  newValue = `${newValue.toString()}`;

  return newValue;
}
