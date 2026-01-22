import { useEffect, useRef } from "react";

const useFocus = () => {
  const inputRef = useRef<any>(null);

  const requestFocus = () => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    requestFocus();
  }, []);

  return { inputRef };
};

export default useFocus;
