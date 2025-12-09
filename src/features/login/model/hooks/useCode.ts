import { useEffect, useState } from "react";

const MOCK_CODE = "1234";

const useCode = () => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [isCodeFilled, setIsCodeFilled] = useState(false);

  useEffect(() => {
    setIsCodeFilled(code.every((item) => item !== ""));
    setIsCodeConfirmed(code.join("") === MOCK_CODE);
  }, [code]);

  const handleCodeChange = (text: string, index: number) => {
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = text;
      return newCode;
    });
  };

  return {
    code,
    isCodeConfirmed,
    isCodeFilled,
    handleCodeChange,
  };
};

export default useCode;
