import useSWR from "swr";
import { PokemonsResponse } from "@/interfaces";
import { POKEMON_API } from "@/constants";

interface UseGetPokemons {
  limit?: number;
  offset?: number;
  nextUrl?: string;
}

export const useGetPokemons = ({
  limit = 20,
  offset = 0,
  nextUrl,
}: UseGetPokemons = {}) => {
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<PokemonsResponse>(
      nextUrl || `${POKEMON_API}/pokemon?limit=${limit}&offset=${offset}`
    );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};
