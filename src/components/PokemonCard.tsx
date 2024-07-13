import { useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  Easing,
  FadeInUp,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Loader from "./Loader";
import { useGetPokemonByUrl } from "@/hooks/useGetPokemonByUrl";
import { capitalize } from "@/utils/capitalize";

interface Props {
  name: string;
  url: string;
  index: number;
}

const DELAY_FACTOR = 100;
const PressableAnimated = Animated.createAnimatedComponent(Pressable);

export const PokemonCard = ({ name, url, index }: Props) => {
  const { data, error, isValidating } = useGetPokemonByUrl({ url });
  const router = useRouter();
  const scale = useSharedValue(1);
  const formattedPokemonsName = useMemo(() => capitalize(name), [name]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  function goToDetails() {
    router.navigate({
      pathname: `/pokemons/${name}`,
      params: { formattedPokemonsName },
    });
  }

  function onPress() {
    scale.value = withSequence(
      withTiming(1.1, { easing: Easing.bounce, duration: 500 }),
      withSpring(1, undefined, (isFinished) => {
        if (isFinished) {
          runOnJS(goToDetails)();
        }
      })
    );
  }

  return (
    <PressableAnimated
      onPress={onPress}
      style={[styles.card, animatedContainerStyle]}
    >
      {isValidating ? (
        <Loader size="small" />
      ) : (
        <Animated.View
          entering={FadeInUp.delay(DELAY_FACTOR * index).springify()}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: data?.sprites?.front_shiny }}
              style={styles.image}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.name}>
              {formattedPokemonsName}
            </Text>
            <Text style={styles.id}>#{`${data?.id}`}</Text>
          </View>
        </Animated.View>
      )}
    </PressableAnimated>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
