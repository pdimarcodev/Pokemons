import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export type Params = {
  name: string;
  formattedPokemonsName: string;
};

export default function DetailsLayout() {
  const { formattedPokemonsName } = useLocalSearchParams<Params>();

  return (
    <Stack>
      <Stack.Screen
        name="[name]"
        options={{
          title: formattedPokemonsName || "",
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontSize: 26,
    fontWeight: "700",
    color: "white",
  },
  headerStyle: {
    backgroundColor: "#111111",
  },
});
