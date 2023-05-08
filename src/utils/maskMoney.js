export default function maskMoney(value) {
  // Remove tudo o que não é dígito numérico
  let newValue = value.replace(/\D/g, '');

  // Formata o valor em moeda com duas casas decimais
  newValue = (newValue / 100).toFixed(2).replace('.', ',');

  // Adiciona o símbolo de real
  newValue = `R$ ${newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

  return newValue;
}
