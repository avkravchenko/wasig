import { Control, Controller, FieldValues, Path } from "react-hook-form";
import MaskInput, { Mask } from "react-native-mask-input";
import { Text, View, StyleSheet } from "react-native";

interface ControlledProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  mask?: Mask;
  placeholder?: string;
  autoFocus?: boolean;
  keyboardType?: "default" | "numeric" | "number-pad";
  renderError?: (error: string) => React.ReactNode;
}

const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  mask,
  renderError,
  ...rest
}: ControlledProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error, invalid },
      }) => (
        <View style={styles.container}>
          <MaskInput
            {...rest}
            ref={ref}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            mask={mask}
            style={[
              styles.input,
              styles.primary,
              styles.lg,
              invalid && styles.inputInvalid,
            ]}
          />

          {error?.message &&
            (renderError ? (
              renderError(error.message)
            ) : (
              <Text style={styles.errorText}>{error.message}</Text>
            ))}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 100,
    width: "100%",
  },
  primary: {
    borderColor: "#F3F5F7",
    backgroundColor: "#F3F5F7",
    height: 48,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  inputInvalid: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  lg: {
    minWidth: "100%",
  },
});

export default ControlledTextField;
