import { useEffect, useState } from "react";

const useTimer = (initialSeconds: number) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [seconds]);

  return {
    seconds,
    setSeconds,
  };
};

export default useTimer;