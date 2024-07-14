import { Image, StyleSheet, View } from "react-native";

interface Props {
  imagesUri: Array<{
    key: string;
    uri: string | undefined;
  }>;
}

export default function PokemonsImages({ imagesUri }: Props) {
  if (!imagesUri?.length) return null;

  return (
    <View style={styles.imagesContainer}>
      {imagesUri.map(
        ({ key, uri }) =>
          uri && (
            <View key={key} style={styles.imageContainer}>
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
