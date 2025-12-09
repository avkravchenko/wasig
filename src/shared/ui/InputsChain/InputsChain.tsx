import { useRef } from "react";
import { View } from "react-native";
import TextField from "../TextField";
import styles from "./InputsChainStyle";
import { Text, TextInput } from "react-native";

type TextFieldPropsType = {
  value: string[];
  isCodeConfirmed: boolean;
  isCodeFilled: boolean;
  placeholder: string;
  keyBoardType: "numeric";
  placeholderPlacement?: "center" | "left";
  onPress: () => void;
  onChange: (value: string, index: number) => void;
};

const InputsChain = ({
  value = [],
  isCodeConfirmed,
  isCodeFilled,
  placeholder,
  keyBoardType,
  placeholderPlacement,
  onPress,
  onChange,
}: TextFieldPropsType) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const handleTextFieldChange = (text: string, index: number) => {
    onChange(text, index);

    if (index >= 0 && !text.length) {
      inputRefs.current[index]?.blur();
      inputRefs.current[index - 1]?.focus();

      return;
    }

    if (index < value.length - 1 && text.length) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  return (
    <View style={styles.container}>
      {value.map((item, index) => (
        <TextField
          ref={(ref: TextInput | null) => {
            if (ref) {
              inputRefs.current[index] = ref;
            }
          }}
          maxLength={1}
          key={index}
          value={item}
          isCodeFilled={isCodeFilled}
          isCodeConfirmed={isCodeConfirmed}
          size="sm"
          placeholder={placeholder}
          keyBoardType={keyBoardType}
          placeholderPlacement={placeholderPlacement}
          onChange={(text) => handleTextFieldChange(text, index)}
        />
      ))}
    </View>
  );
};

export default InputsChain;
