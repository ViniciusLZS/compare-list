export default function CleanMask(value: string) {
  return (
    value.replace(/\D/g, '')
  );
}
