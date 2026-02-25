import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { View, TextInput, Pressable, Platform } from "react-native";
import TextField from "../TextField";
import styles from "./InputsChainStyle";

const CODE_LENGTH = 4;
const normalizeCode = (text: string) => text.replace(/\D/g, "").slice(0, CODE_LENGTH);

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
    for (let i = 0; i < CODE_LENGTH; i++) {
      buffer.push(hiddenInput[i] || "-");
    }
    return buffer;
  }, [hiddenInput]);

  useEffect(() => {
    setHiddenInput(normalizeCode(value));
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
    if (hiddenInput.length === CODE_LENGTH) {
      onCodeFilled(hiddenInput);
    }
  }, [hiddenInput, onCodeFilled]);

  const focusHiddenInput = () => {
    hiddenInputRef.current?.focus();
  };

  const scheduleFocus = useCallback(() => {
    // OTP autofill appears only for the currently focused input.
    const timeoutId = setTimeout(() => {
      hiddenInputRef.current?.focus();
    }, 250);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const clearFocusTimeout = scheduleFocus();
    return clearFocusTimeout;
  }, [scheduleFocus]);

  return (
    <Pressable onPress={focusHiddenInput}>
      <TextInput
        ref={hiddenInputRef}
        value={hiddenInput}
        style={styles.hiddenInput}
        keyboardType={keyBoardType}
        inputMode="numeric"
        textContentType="oneTimeCode"
        autoComplete={Platform.OS === "ios" ? "one-time-code" : "sms-otp"}
        importantForAutofill="yes"
        maxLength={CODE_LENGTH}
        autoCorrect={false}
        autoCapitalize="none"
        spellCheck={false}
        autoFocus={true}
        onBlur={focusHiddenInput}
        onChangeText={(text) => {
          setHiddenInput(normalizeCode(text));
        }}
      />
      <View style={styles.container} pointerEvents="none">
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
    </Pressable>
  );
};

export default InputsChain;
