import { useEffect, useState, useRef } from "react";
import { View, TextInput } from "react-native";
import TextField from "../TextField";
import styles from "./InputsChainStyle";

type TextFieldPropsType = {
  isCodeConfirmed: boolean;
  placeholder: string;
  keyBoardType: "numeric" | "number-pad";
  placeholderPlacement?: "center" | "left";
  onCodeFilled: (code: string) => void;
};

const InputsChain = ({
  isCodeConfirmed,
  placeholder,
  keyBoardType = "numeric",
  placeholderPlacement = "center",
  onCodeFilled,
}: TextFieldPropsType) => {
  const [arrayBuffer, setArrayBuffer] = useState<string[]>([
    "-",
    "-",
    "-",
    "-",
  ]);

  const [hiddenInput, setHiddenInput] = useState("");
  const hiddenInputRef = useRef<TextInput>(null);
  const [backgroundColor, setBackgroundColor] = useState<
    "primary" | "confirmed" | "invalid"
  >("primary");

  useEffect(() => {
    if (!hiddenInput.length) {
      setBackgroundColor("primary");
      return;
    }

    if (isCodeConfirmed) {
      setBackgroundColor("confirmed");
    } else {
      setBackgroundColor("invalid");
    }
  }, [isCodeConfirmed, hiddenInput]);

  useEffect(() => {
    setArrayBuffer((prev) => {
      const newArray = [...prev];

      for (let i = 0; i < newArray.length; i++) {
        newArray[i] = hiddenInput[i] ?? "-";
      }

      return newArray;
    });
  }, [hiddenInput]);

  useEffect(() => {
    if (hiddenInput.length === 4) {
      onCodeFilled(hiddenInput);
    }
  }, [hiddenInput]);

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
        {arrayBuffer.map((item, index) => (
          <TextField
            maxLength={1}
            key={index}
            value={item}
            backgroundColor={backgroundColor}
            size="sm"
            readonly={true}
            placeholder={placeholder}
            keyBoardType={keyBoardType}
            placeholderPlacement={placeholderPlacement}
            onChange={() => {}}
            onPress={() => {
              hiddenInputRef.current?.focus();
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default InputsChain;
