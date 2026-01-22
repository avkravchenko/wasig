import { TextInput, View, Text } from "react-native";
import { styles } from "@/shared/ui/TextField/TextFieldStyle";
import MaskInput, { Mask } from "react-native-mask-input";

type TextFieldPropsType = {
  editable?: boolean;
  ref?: any;
  value: string;
  type?: "primary" | "secondary";
  mask?: Mask;
  size?: "sm" | "lg";
  maxLength?: number;
  backgroundColor?: "primary" | "confirmed" | "invalid";
  keyBoardType?: "default" | "numeric" | "number-pad" | "phone-pad";
  placeholderPlacement?: "center" | "left";
  placeholder?: string;
  autoFocus?: boolean;
  rules?: [() => boolean, string][];
  readonly?: boolean;
  onFocus?: () => void;
  onChange: (text: string) => void;
  onPress?: () => void;
  onKeyPress?: (params: { nativeEvent: { key: string } }) => void;
};

const TextField = ({
  mask,
  readonly = false,
  ref,
  value,
  size = "lg",
  maxLength,
  backgroundColor = "primary",
  keyBoardType = "default",
  placeholder = "useless placeholder",
  placeholderPlacement = "left",
  autoFocus = false,
  onFocus,
  onPress,
  onChange,
  onKeyPress,
}: TextFieldPropsType) => {
  return (
    <>
      <MaskInput
        ref={ref}
        style={[
          styles.input,
          styles.primary,
          styles[backgroundColor],
          styles[size],
          styles[placeholderPlacement],
        ]}
        value={value}
        placeholder={placeholder}
        keyboardType={keyBoardType}
        maxLength={maxLength}
        autoFocus={autoFocus}
        readOnly={readonly}
        onKeyPress={onKeyPress}
        onChangeText={onChange}
        onPress={onPress}
        onFocus={onFocus}
        mask={mask}
      />
    </>
  );
};

export default TextField;
