import { useGetPokemonByUrl } from "@/hooks/useGetPokemonByUrl";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
  url: string;
  index: number;
}

export const PokemonCard = ({ url, index }: Props) => {
  const { data, error, isLoading } = useGetPokemonByUrl({ url });

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.spacing}>
        <View>
          <Text style={styles.num}>#{`${data?.id}`}</Text>
          <Text
            style={styles.name}
          >{`${data?.name.charAt(0).toUpperCase()}${data?.name?.slice(1)}`}</Text>
          <Image
            source={{ uri: data?.sprites?.front_shiny }}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },
  num: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "#fff",
    fontSize: 11,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 10,
  },
  image: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 90,
    height: 90,
  },
});
