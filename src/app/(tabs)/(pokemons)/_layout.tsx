import { Stack } from "expo-router";

const PokemonsScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default PokemonsScreenLayout;
