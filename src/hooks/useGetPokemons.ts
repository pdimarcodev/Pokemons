import { useInfiniteQuery } from "@tanstack/react-query";
import { PokemonsResponse } from "@/interfaces";
import { POKEMON_API } from "@/constants";

interface UseGetPokemons {
  limit?: number;
}

const STALE_TIME = 1000 * 60 * 60;

export const useGetPokemons = ({ limit = 20 }: UseGetPokemons = {}) => {
  const getPokemons = async (page: number) => {
    try {
      const response = await fetch(
        `${POKEMON_API}/pokemon?limit=${limit}&offset=${page * limit}`
      );
      const data: PokemonsResponse = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch");
    }
  };

  const { isLoading, isFetching, data, fetchNextPage, error, refetch } =
    useInfiniteQuery({
      queryKey: ["pokemons", "infinite"],
      queryFn: ({ pageParam }) => getPokemons(pageParam),
      initialPageParam: 0,
      staleTime: STALE_TIME,
      getNextPageParam: (_, pages) => pages.length,
    });

  return {
    data,
    error,
    isLoading,
    isValidating: isFetching,
    mutate: refetch,
    fetchNextPage,
  };
};
