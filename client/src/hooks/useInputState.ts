import { useState } from "react";

const useInputState = (
  init?: string
): {
  value: string;
  handleChange: (e: any) => void;
  handleReset: () => void;
} => {
  const initialState = init || "";

  const [value, setValue] = useState<string>(initialState);

  const handleChange = (e: any): void => {
    setValue(e.target.value);
  };

  const handleReset = (): void => {
    setValue(initialState);
  };

  return { value, handleChange, handleReset };
};

export default useInputState;
