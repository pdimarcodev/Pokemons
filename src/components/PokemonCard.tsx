import { useCallback, useMemo } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter, useSegments } from "expo-router";
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
import { Star } from "./Star";
import { useGetPokemonByName } from "@/hooks/useGetPokemonByName";
import { useFavorites } from "@/hooks/useFavorites";
import { capitalize } from "@/utils/capitalize";

interface Props {
  name: string;
  index: number;
  isFavorite?: boolean;
}

const SEGMENT_INDEX = 1;
const DELAY_FACTOR = 100;
const PressableAnimated = Animated.createAnimatedComponent(Pressable);
const { width: screenWidth } = Dimensions.get("window");

export const PokemonCard = ({ name, index, isFavorite }: Props) => {
  const { data, error, isValidating } = useGetPokemonByName({ name });
  const { toggleFavorite } = useFavorites({ name, isFavorite });
  const router = useRouter();
  const segments = useSegments();

  const scale = useSharedValue(1);
  const formattedPokemonsName = useMemo(() => capitalize(name), [name]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  function goToDetails() {
    router.navigate({
      pathname: `/${segments[SEGMENT_INDEX]}/${name}`,
      params: { formattedPokemonsName },
    });
  }

  const onPress = useCallback(() => {
    scale.value = withSequence(
      withTiming(1.1, { easing: Easing.bounce, duration: 500 }),
      withSpring(1, undefined, (isFinished) => {
        if (isFinished) {
          runOnJS(goToDetails)();
        }
      })
    );
  }, []);

  const onLongPress = useCallback(() => {
    toggleFavorite();
  }, []);

  return (
    <PressableAnimated
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.card, animatedContainerStyle]}
    >
      {isValidating || typeof isFavorite === undefined ? (
        <Loader size="small" />
      ) : (
        <Animated.View
          entering={FadeInUp.delay(DELAY_FACTOR * index).springify()}
        >
          <View style={styles.star}>
            <Star isFavorite={isFavorite} size={24} />
          </View>
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
    width: screenWidth / 2 - 30,
    height: 130,
    borderRadius: 5,
    borderColor: "#0077B6",
    borderWidth: 1,
    borderBottomWidth: 2,
    paddingBottom: 10,
    backgroundColor: "#003566",
    position: "relative",
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
  star: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
});
