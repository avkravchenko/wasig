import { TextInput, View } from "react-native";
import { styles } from "@/shared/ui/TextField/TextFieldStyle";

type TextFieldPropsType = {
  type?: "primary" | "secondary";
  keyBoardType?: "default" | "numeric";
  placeholder?: string;
  onChange: (text: string) => void;
  value: string;
};

const TextField = ({
  type = "primary",
  keyBoardType = "default",
  placeholder = "useless placeholder",
  onChange,
  value,
}: TextFieldPropsType) => {
  return (
    <TextInput
      style={(styles.input, styles[type])}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      keyboardType={keyBoardType}
    />
  );
};

export default TextField;
