import { useCallback, useState } from 'react';

interface Error {
  field: string;
  message: string;
}
export default function useErrors() {
  const [errors, setErrors] = useState<Error[]>([]);

  const setError = useCallback(({ field, message }: {field: string, message: string}) => {
    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }, []);

  const removeError = useCallback((fieldName: string) => {
    setErrors((prevState) => prevState.filter((error) => error.field !== fieldName));
  }, []);

  const getErrorMessageFieldName = useCallback((fieldName: string) => (
    errors.find((error) => error.field === fieldName)?.message
  ), [errors]);

  return {
    errors, setError, removeError, getErrorMessageFieldName,
  };
}
