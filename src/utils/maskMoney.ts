export default function maskMoney(value: string) {
  // Remove tudo o que não é dígito numérico
  let newValue = value.replace(/\D/g, '');

  // Converte para número e realiza a operação de divisão
  const numericValue = Number(newValue) / 100;

  // Formata o valor em moeda com duas casas decimais
  newValue = numericValue.toFixed(2).replace('.', ',');

  // Adiciona o símbolo de real
  newValue = `R$ ${newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

  return newValue;
}
