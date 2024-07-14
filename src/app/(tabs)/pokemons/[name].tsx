import { StyleSheet, ScrollView, Text } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import Loader from "@/components/Loader";
import PokemonsImages from "@/components/PokemonsImages";
import { useGetPokemonByName } from "@/hooks/useGetPokemonByName";

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
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: formattedPokemonsName || "",
          headerTitleStyle: styles.headerTitleStyle,
          headerBackTitleVisible: false,
          gestureEnabled: true,
        }}
      />
      {isValidating ? (
        <Loader size="large" />
      ) : (
        <>
          <Text style={styles.text}>#{data?.id}</Text>
          <PokemonsImages
            imagesUri={[
              { uri: data?.sprites?.front_default },
              { uri: data?.sprites?.back_default },
            ]}
          />
          <PokemonsImages
            imagesUri={[
              { uri: data?.sprites?.front_shiny },
              { uri: data?.sprites?.back_shiny },
            ]}
          />
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
  headerTitleStyle: {
    fontSize: 30,
    fontWeight: "700",
  },
  container: {
    backgroundColor: "black",
    flex: 1,
    padding: 10,
    alignItems: "center",
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
});
