import { useState } from "react";

const useModal = () => {
  const [visible, setVisible] = useState(false);

  return {
    visible,
    setVisible,
  };
};

export default useModal;
