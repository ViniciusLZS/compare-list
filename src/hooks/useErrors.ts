import { useState } from 'react';

interface Error {
  field: string;
  message: string;
}
export default function useErrors() {
  const [errors, setErrors] = useState<Error[]>([]);

  function setError({ field, message }: {field: string, message: string}) {
    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function removeError(fieldName: string) {
    setErrors((prevState) => prevState.filter((error) => error.field !== fieldName));
  }

  function getErrorMessageFieldName(fieldName: string) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return {
    errors, setError, removeError, getErrorMessageFieldName,
  };
}
