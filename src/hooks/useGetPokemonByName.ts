import { useQuery } from "@tanstack/react-query";
import { BasicPokemon, Pokemon } from "@/interfaces";
import { POKEMON_API, STALE_TIME } from "@/constants";
import { PokemonMapper } from "@/utils/pokemonMapper";

interface UseGetPokemonByName {
  name?: string;
}

export const useGetPokemonByName = ({ name }: UseGetPokemonByName) => {
  if (!name) return {};

  const getPokemon = async () => {
    try {
      const response = await fetch(`${POKEMON_API}/pokemon/${name}`);
      const pokemon: Pokemon = await response.json();
      const mappedPokemon = await PokemonMapper.apiToEntity(pokemon);
      return mappedPokemon;
    } catch (error) {
      throw new Error("Failed to fetch");
    }
  };

  const { data, error, isLoading, isFetching, refetch } =
    useQuery<BasicPokemon>({
      queryKey: ["pokemon", name],
      queryFn: getPokemon,
      staleTime: STALE_TIME,
    });

  return {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
  };
};
