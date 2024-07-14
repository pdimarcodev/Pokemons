import { Image, StyleSheet, View } from "react-native";

interface Props {
  imagesUri: Array<{
    uri: string | undefined;
  }>;
}

export default function PokemonsImages({ imagesUri }: Props) {
  if (!imagesUri?.length) return null;

  return (
    <View style={styles.imagesContainer}>
      {imagesUri.map(
        ({ uri }, index) =>
          uri && (
            <View key={index} style={styles.imageContainer}>
              <Image
                source={{ uri }}
                style={styles.image}
                resizeMode="stretch"
              />
            </View>
          )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  imageContainer: {
    width: 150,
    height: "auto",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
