import { memo, useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import { PokemonCard } from "@/components/PokemonCard";
import ErrorMessage from "@/components/Error";
import { useGetPokemons } from "@/hooks/useGetPokemons";
import { useAppContext } from "@/context/AppContext";
import { PokemonResult } from "@/interfaces";

const PAGE_SIZE = 20;

interface ItemProps {
  name: string;
  index: number;
  isFavorite?: boolean;
}

const Item = memo(({ name, index, isFavorite }: ItemProps) => (
  <PokemonCard name={name} index={index % PAGE_SIZE} isFavorite={isFavorite} />
));

export default function Pokemons() {
  const { favorites } = useAppContext();
  const { data, error, mutate, fetchNextPage } = useGetPokemons({
    limit: PAGE_SIZE,
  });

  const retry = useCallback(() => {
    mutate?.();
  }, [mutate]);

  const renderItem = useCallback(
    ({ item: { name }, index }: { item: PokemonResult; index: number }) => (
      <Item
        name={name}
        index={index % PAGE_SIZE}
        isFavorite={favorites?.includes(name)}
      />
    ),
    [favorites]
  );

  if (error) return <ErrorMessage retry={retry} />;

  return (
    <FlatList
      data={data?.pages?.flatMap((page) => page.results)}
      numColumns={2}
      keyExtractor={({ name }) => name}
      style={styles.container}
      contentContainerStyle={styles.flatlistContainer}
      columnWrapperStyle={styles.flatlistColumn}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={0.1}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
