import { StyleSheet, View, Text, Image } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useGetPokemonByName } from "@/hooks/useGetPokemonByName";
import Loader from "@/components/Loader";

type Params = {
  name: string;
  formattedPokemonsName: string;
};

export default function PokemonDetailsScreen() {
  const { name, formattedPokemonsName } = useLocalSearchParams<Params>();
  const { data, error, isValidating } = useGetPokemonByName({
    name,
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: formattedPokemonsName || "",
          headerBackTitleVisible: false,
          gestureEnabled: true,
        }}
      />
      <View style={styles.container}>
        {isValidating ? (
          <Loader size="large" />
        ) : (
          <>
            <Text style={styles.text}>{formattedPokemonsName}</Text>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: data?.sprites?.front_shiny }}
                style={styles.image}
                resizeMode="stretch"
              />
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },

  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },
  imageContainer: {
    width: 90,
    height: 90,
    alignSelf: "center",
  },
});
