export default function CleanMask(value: string) {
  const newValue = value.replace(/\D/g, '');

  return newValue;
}
