import { useEffect, useState, useRef, useMemo } from "react";
import { View, TextInput } from "react-native";
import TextField from "../TextField";
import styles from "./InputsChainStyle";

type TextFieldPropsType = {
  value: string;
  isCodeConfirmed: boolean;
  isCodeError: boolean;
  placeholder: string;
  keyBoardType: "numeric" | "number-pad";
  placeholderPlacement?: "center" | "left";
  onCodeFilled: (code: string) => void;
};

const InputsChain = ({
  value,
  isCodeConfirmed,
  isCodeError,
  placeholder,
  keyBoardType = "numeric",
  placeholderPlacement = "center",
  onCodeFilled,
}: TextFieldPropsType) => {
  const [hiddenInput, setHiddenInput] = useState<string>("");
  const hiddenInputRef = useRef<TextInput>(null);
  const [backgroundColor, setBackgroundColor] = useState<
    "primary" | "confirmed" | "invalid"
  >("primary");

  const arrayBuffer = useMemo(() => {
    const buffer = [];
    for (let i = 0; i < 4; i++) {
      buffer.push(hiddenInput[i] || "-");
    }
    return buffer;
  }, [hiddenInput]);

  useEffect(() => {
    setHiddenInput(value);
  }, [value]);

  useEffect(() => {
    if (!hiddenInput.length) {
      setBackgroundColor("primary");
      return;
    }

    if (isCodeConfirmed) {
      setBackgroundColor("confirmed");
    } else if (isCodeError) {
      setBackgroundColor("invalid");
    } else {
      setBackgroundColor("primary");
    }
  }, [isCodeConfirmed, isCodeError, hiddenInput]);


  useEffect(() => {
    if (hiddenInput.length === 4) {
      onCodeFilled(hiddenInput);
    }
  }, [hiddenInput, onCodeFilled]);

  return (
    <View>
      <TextInput
        ref={hiddenInputRef}
        value={hiddenInput}
        style={styles.hiddenInput}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        maxLength={4}
        autoFocus={true}
        onChangeText={(text) => {
          setHiddenInput(text);
        }}
      />
      <View style={styles.container}>
        {arrayBuffer.map((_, index) => (
          <TextField
            maxLength={1}
            key={index}
            value={arrayBuffer[index] || "-"}
            backgroundColor={backgroundColor}
            size="sm"
            readonly={true}
            placeholder={placeholder}
            keyBoardType={keyBoardType}
            placeholderPlacement={placeholderPlacement}
            onChange={() => {}}
          />
        ))}
      </View>
    </View>
  );
};

export default InputsChain;
