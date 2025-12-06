import { TextInput, View, Text } from "react-native";
import { styles } from "@/shared/ui/TextField/TextFieldStyle";

type TextFieldPropsType = {
  ref?: any;
  value: string;
  type?: "primary" | "secondary";
  keyBoardType?: "default" | "numeric";
  placeholder?: string;
  rules?: [() => boolean, string][];
  onChange: (text: string) => void;
  onPress?: () => void;
};

const TextField = ({
  ref,
  value,
  type = "primary",
  keyBoardType = "default",
  placeholder = "useless placeholder",
  rules,
  onChange,
  onPress,
}: TextFieldPropsType) => {
  return (
    <>
      <TextInput
        ref={ref}
        style={(styles.input, styles[type])}
        value={value}
        placeholder={placeholder}
        keyboardType={keyBoardType}
        onChangeText={onChange}
        onPress={onPress}
      />
      {rules?.map((rule, index) => (
        <Text key={index}>{rule[1]}</Text>
      ))}
    </>
  );
};

export default TextField;
