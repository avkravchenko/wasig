import { TextInput, View, Text } from "react-native";
import { styles } from "@/shared/ui/TextField/TextFieldStyle";

type TextFieldPropsType = {
  ref?: any;
  value: string;
  type?: "primary" | "secondary";
  size?: "sm" | "lg";
  maxLength?: number;
  isCodeFilled?: boolean;
  isCodeConfirmed?: boolean;
  isValid?: boolean;
  keyBoardType?: "default" | "numeric";
  placeholderPlacement?: "center" | "left";
  placeholder?: string;
  autoFocus?: boolean;
  rules?: [() => boolean, string][];
  readonly?: boolean;
  onChange: (text: string) => void;
  onPress?: () => void;
};

const TextField = ({
  readonly = false,
  ref,
  value,
  size = "lg",
  maxLength,
  isValid = true,
  isCodeFilled = false,
  isCodeConfirmed,
  keyBoardType = "default",
  placeholder = "useless placeholder",
  placeholderPlacement = "left",
  autoFocus = false,
  onChange,
  onPress,
}: TextFieldPropsType) => {
  return (
    <>
      <TextInput
        ref={ref}
        style={[
          styles.input,
          styles.primary,
          styles[size],
          styles[placeholderPlacement],
          isCodeFilled && isCodeConfirmed && styles.confirmed,
          isCodeFilled && !isCodeConfirmed && styles.invalid,
          isValid ? "" : styles.invalid,
        ]}
        value={value}
        placeholder={placeholder}
        keyboardType={keyBoardType}
        maxLength={maxLength}
        onChangeText={onChange}
        onPress={onPress}
        autoFocus={autoFocus}
        readOnly={readonly}
      />
    </>
  );
};

export default TextField;
