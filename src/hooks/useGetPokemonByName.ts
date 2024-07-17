import useSWR from "swr";
import { Pokemon } from "@/interfaces";
import { POKEMON_API } from "@/constants";

interface UseGetPokemonByName {
  name?: string;
}

export const useGetPokemonByName = ({ name }: UseGetPokemonByName) => {
  if (!name) return {};

  const { data, error, isLoading, isValidating, mutate } = useSWR<Pokemon>(
    `${POKEMON_API}/pokemon/${name}`
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};
