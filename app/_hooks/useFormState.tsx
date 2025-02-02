import { useState } from 'react';

export function useFormState<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);

  const handleChange = <K extends keyof T>(field: K, value: T[K]) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return [state, handleChange] as const;
}