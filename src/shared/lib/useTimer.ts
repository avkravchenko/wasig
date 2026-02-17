import { useCallback, useEffect, useState } from "react";

const useTimer = (initialSeconds: number) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => Math.max(prevSeconds - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const resetTimer = useCallback(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  return {
    seconds,
    setSeconds,
    resetTimer,
  };
};

export default useTimer;
