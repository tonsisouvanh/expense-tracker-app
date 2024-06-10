import { useEffect, useRef } from "react";

const useFocus = () => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef) inputRef?.current?.focus();
  }, []);
  return inputRef;
};

export default useFocus;