import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type FeedListStateProps = {
  children: ReactNode;
  contentBottomPadding: number;
  contentTopPadding: number;
};

const FeedListState = ({
  children,
  contentBottomPadding,
  contentTopPadding,
}: FeedListStateProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: contentTopPadding,
          paddingBottom: contentBottomPadding,
        },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});

export default FeedListState;
