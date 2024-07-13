import { useLocalSearchParams, useRouter } from "expo-router";

export default function PokemonDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const router = useRouter();
}
