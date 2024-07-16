import { FlatList, StyleSheet } from "react-native";
import { useAppContext } from "@/context/AppContext";
import { PokemonCard } from "@/components/PokemonCard";

export default function Favorites() {
  const { favorites } = useAppContext();

  return (
    <FlatList
      data={favorites}
      numColumns={2}
      keyExtractor={(favorite) => favorite}
      style={styles.container}
      contentContainerStyle={styles.flatlistContainer}
      columnWrapperStyle={styles.flatlistColumn}
      decelerationRate={0.5}
      showsVerticalScrollIndicator={false}
      renderItem={({ item: favorite, index }) => (
        <PokemonCard name={favorite} index={index} isFavorite />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  flatlistContainer: {
    backgroundColor: "black",
    paddingTop: 50,
    paddingBottom: 150,
    paddingHorizontal: 20,
    gap: 20,
  },
  flatlistColumn: { gap: 20 },
});
