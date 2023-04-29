export default function maskMoney(money) {
  return money
    .replace(/\D/g, '')
    .replace(/(\d{1})(\d{3})(\d{2})/, '$1.$2,$3');
}
