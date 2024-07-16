import { memo } from "react";
import { Image, StyleSheet } from "react-native";
import FlipView from "./FlipView";
import { Sprites } from "@/interfaces";

type ImageType = "default" | "shiny" | "female" | "shiny_female";

interface PokemonsImagesProps {
  imageType: ImageType;
  sprites?: Sprites;
}

interface PokemonImageProps {
  uri: string;
}

const PokemonImage = memo(({ uri }: PokemonImageProps) => (
  <Image source={{ uri }} style={styles.image} resizeMode="stretch" />
));

export default function PokemonsImages({
  imageType,
  sprites,
}: PokemonsImagesProps) {
  if (!sprites) return null;

  return (
    <FlipView
      containerStyle={styles.cardContainer}
      RegularContent={
        <PokemonImage uri={sprites[`front_${imageType}`] as string} />
      }
      FlippedContent={
        <PokemonImage uri={sprites[`back_${imageType}`] as string} />
      }
    />
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 150,
    width: 150,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
