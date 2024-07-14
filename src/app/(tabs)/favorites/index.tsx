import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFavorites } from "@/hooks/useFavorites";

export default function Favorites() {
  const { storedFavorites } = useFavorites();

  useEffect(() => {
    console.log("PANTALLA FAVORITOS", storedFavorites);
  }, [storedFavorites]);

  return (
    <View style={styles.container}>
      {storedFavorites?.map((favorite, index) => (
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
