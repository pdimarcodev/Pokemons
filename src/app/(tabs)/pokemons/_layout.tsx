import { Stack } from "expo-router";
import { View } from "react-native";

const PokemonsScreenLayout = () => {
  return (
    // <View style={defaultStyles.container}>
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Pokemons",
        }}
      />
    </Stack>
    // </View>
  );
};

export default PokemonsScreenLayout;
