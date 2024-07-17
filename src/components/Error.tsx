import { StyleSheet, View, Text, Button } from "react-native";

interface Props {
  retry: () => void;
}

export default function ErrorMessage({ retry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>An error occurred.</Text>
      <Button title="Retry" onPress={retry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "red",
    fontSize: 20,
  },
});
