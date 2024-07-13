import { View, Text } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";

export default function PokemonDetailsScreen() {
  const { name } = useLocalSearchParams();

  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}
