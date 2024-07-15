import { StyleSheet, Text, View } from "react-native";
import { useAppContext } from "@/context/AppContext";

export default function Favorites() {
  const { favorites } = useAppContext();

  return (
    <View style={styles.container}>
      {favorites?.map((favorite, index) => (
        <Text style={styles.title} key={index}>
          {favorite}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
