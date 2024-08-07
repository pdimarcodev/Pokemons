import { useInfiniteQuery } from "@tanstack/react-query";
import { PokemonsResponse } from "@/interfaces";
import { POKEMON_API, STALE_TIME } from "@/constants";

interface UseGetPokemons {
  limit?: number;
}

export const useGetPokemons = ({ limit = 20 }: UseGetPokemons = {}) => {
  const getPokemons = async (page: number) => {
    try {
      const response = await fetch(
        `${POKEMON_API}/pokemon?limit=${limit}&offset=${page * limit}`
      );
      const pokemons: PokemonsResponse = await response.json();
      return pokemons;
    } catch (error) {
      throw new Error("Failed to fetch");
    }
  };

  const { isLoading, isFetching, data, fetchNextPage, error, refetch } =
    useInfiniteQuery({
      queryKey: ["pokemons"],
      queryFn: ({ pageParam }) => getPokemons(pageParam),
      initialPageParam: 0,
      staleTime: STALE_TIME,
      getNextPageParam: (_, pages) => pages.length,
    });

  return {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
    fetchNextPage,
  };
};
