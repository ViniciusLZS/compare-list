export default function passwordConfirmation(value: string) {
  const level = {
    size: false,
    number: false,
    letter: false,
    capitalLetter: false,
    special: false,
  };

  if (value.length >= 8) {
    level.size = true;
  }

  if (/[0-9]/.test(value)) {
    level.number = true;
  }

  if (/[a-z]/.test(value)) {
    level.letter = true;
  }

  if (/[A-Z]/.test(value)) {
    level.capitalLetter = true;
  }

  if (/[^A-Za-z0-9]/.test(value)) {
    level.special = true;
  }

  return level;
}
