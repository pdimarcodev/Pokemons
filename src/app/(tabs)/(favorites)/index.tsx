import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAppContext } from "@/context/AppContext";
import { PokemonCard } from "@/components/PokemonCard";

const EmptyState = () => (
  <View style={styles.emptyStateContainer}>
    <Text style={styles.emptyStateText}>There are no favorites yet!</Text>
    <Text style={styles.emptyStateText}>Go and choose one!</Text>
  </View>
);

export default function Favorites() {
  const { favorites } = useAppContext();

  if (typeof favorites === undefined) return null;
  if (!favorites?.length) return <EmptyState />;

  const sortedFavorites = favorites.sort();

  return (
    <FlatList
      data={sortedFavorites}
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
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  emptyStateText: {
    color: "yellow",
    fontSize: 20,
    textAlign: "center",
  },
});
