import { useState, useCallback } from "react";

const useToggleState = (initialVal = false) => {
  const [value, setValue] = useState(initialVal);
  const toggle = useCallback(() => setValue(value => !value), []);
  return [value, toggle];
};

export default useToggleState;
