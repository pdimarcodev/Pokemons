import { useCallback, useMemo } from "react";
import { StyleSheet, ScrollView, Text, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Loader from "@/components/Loader";
import { Star } from "@/components/Star";
import PokemonsImages from "@/components/PokemonsImages";
import ErrorMessage from "@/components/Error";
import { useGetPokemonByName } from "@/hooks/useGetPokemonByName";
import { useAppContext } from "@/context/AppContext";
import { useFavorites } from "@/hooks/useFavorites";
import { Params } from "./_layout";

export default function PokemonDetailsScreen() {
  const { name } = useLocalSearchParams<Params>();
  const { favorites } = useAppContext();
  const { data, error, isValidating, mutate } = useGetPokemonByName({
    name,
  });
  const isFavorite = useMemo(
    () => favorites?.includes(name ?? ""),
    [favorites, name]
  );
  const { toggleFavorite } = useFavorites({ name, isFavorite });

  const onLongPress = useCallback(() => {
    toggleFavorite();
  }, []);

  const retry = useCallback(() => {
    mutate?.();
  }, [mutate]);

  if (error) return <ErrorMessage retry={retry} />;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContainer}
    >
      {isValidating || typeof favorites === undefined ? (
        <Loader size="large" />
      ) : (
        <>
          <Pressable onLongPress={onLongPress} style={styles.star}>
            <Star isFavorite={isFavorite} size={50} />
          </Pressable>
          <Text style={styles.text}>#{data?.id}</Text>
          <PokemonsImages imageType="default" sprites={data?.sprites} />
          <PokemonsImages imageType="shiny" sprites={data?.sprites} />
          <Text style={styles.caption}>Tap image to flip</Text>
          <Text style={styles.title}>Type</Text>
          <Text style={styles.text}>{data?.types?.[0].type?.name}</Text>
          <Text style={styles.title}>Abilities</Text>
          {data?.abilities?.map((ability, index) => (
            <Text key={index} style={styles.text}>
              {ability?.ability?.name}
            </Text>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  scrollViewContainer: {
    backgroundColor: "black",
    padding: 10,
    alignItems: "center",
    position: "relative",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "lightblue",
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },
  caption: {
    fontSize: 14,
    fontWeight: "500",
    color: "yellow",
  },
  star: {
    position: "absolute",
    top: 5,
    right: 20,
    zIndex: 10,
  },
});
