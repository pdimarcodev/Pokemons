import useSWR from "swr";
import { Pokemon } from "@/interfaces";
import { POKEMON_API } from "@/constants";

interface UseGetPokemonByName {
  name: string;
}

export const useGetPokemonByName = ({ name }: UseGetPokemonByName) => {
  const { data, error, isLoading, isValidating } = useSWR<Pokemon>(
    `${POKEMON_API}/pokemon/${name}`
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
  };
};
