import { useState } from "react";

const useSelectAuthWay = () => {
  const [authWay, setAuthWay] = useState<"phone" | "app" | null>(null);

  const selectAuthWay = (way: "phone" | "app") => {
    setAuthWay(way);
  };

  return {
    authWay,
    selectAuthWay,
  };
};

export default useSelectAuthWay;
