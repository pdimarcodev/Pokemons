import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
} from "react-native";

interface Props extends ActivityIndicatorProps {}

export default function Loader(props: Props) {
  return (
    <View style={styles.loader}>
      <ActivityIndicator {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111111",
  },
});
