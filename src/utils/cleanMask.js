export default function CleanMask(value) {
  return (
    value.replace(/\D/g, '')
  );
}
