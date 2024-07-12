import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useGetPokemonByUrl } from "@/hooks/useGetPokemonByUrl";

interface Props {
  url: string;
  index: number;
}

const DELAY_FACTOR = 100;

const { width: screenWidth } = Dimensions.get("window");

export const PokemonCard = ({ url, index }: Props) => {
  const { data, error, isValidating } = useGetPokemonByUrl({ url });

  if (isValidating) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeInUp.delay(DELAY_FACTOR * index).springify()}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: data?.sprites?.front_shiny }}
          style={styles.image}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={styles.name}
        >{`${data?.name.charAt(0).toUpperCase()}${data?.name?.slice(1)}`}</Text>
        <Text style={styles.id}>#{`${data?.id}`}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 130,
    width: screenWidth / 2 - 30,
    borderRadius: 5,
    borderColor: "#0077B6",
    borderWidth: 1,
    borderBottomWidth: 2,
    paddingBottom: 10,
    backgroundColor: "#003566",
  },
  imageContainer: {
    width: 90,
    height: 90,
    alignSelf: "center",
  },
  image: {
    flex: 1,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  name: {
    flexShrink: 1,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 2,
  },
  id: {
    color: "#fff",
    fontSize: 11,
  },
});
