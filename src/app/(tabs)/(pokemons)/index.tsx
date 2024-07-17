import { useCallback, useRef, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { PokemonCard } from "@/components/PokemonCard";
import Loader from "@/components/Loader";
import { useGetPokemons } from "@/hooks/useGetPokemons";
import { useAppContext } from "@/context/AppContext";
import ErrorMessage from "@/components/Error";

export default function Pokemons() {
  const [nextUrl, setNextUrl] = useState<string>();
  const { data, error, isValidating, mutate } = useGetPokemons({ nextUrl });
  const { favorites } = useAppContext();

  const ref = useRef<FlatList>(null);
  const onEndReachedCalledDuringMomentum = useRef<boolean>(true);

  const loadMore = useCallback(() => {
    if (!onEndReachedCalledDuringMomentum.current && data?.next) {
      setNextUrl(data?.next);
      onEndReachedCalledDuringMomentum.current = true;
      ref?.current?.scrollToIndex({
        index: 0,
        animated: true,
      });
    }
  }, [data?.next]);

  const onMomentumScrollBegin = () => {
    onEndReachedCalledDuringMomentum.current = false;
  };

  const onRefresh = () => {
    setNextUrl(data?.previous || "");
  };

  const retry = useCallback(() => {
    mutate?.();
  }, [mutate]);

  if (isValidating) return <Loader size="large" />;
  if (error) return <ErrorMessage retry={retry} />;

  return (
    <FlatList
      ref={ref}
      data={data?.results}
      numColumns={2}
      keyExtractor={({ name }) => name}
      style={styles.container}
      contentContainerStyle={styles.flatlistContainer}
      columnWrapperStyle={styles.flatlistColumn}
      decelerationRate={0.5}
      onScrollBeginDrag={onMomentumScrollBegin}
      showsVerticalScrollIndicator={false}
      renderItem={({ item: { name }, index }) => (
        <PokemonCard
          name={name}
          index={index}
          isFavorite={favorites?.includes(name)}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={isValidating} onRefresh={onRefresh} />
      }
      onEndReached={loadMore}
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
