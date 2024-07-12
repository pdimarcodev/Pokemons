import useSWR from "swr";
import { BasicPokemon, PokemonsResponse } from "@/interfaces";
import { fetcher } from "@/utils/fetcher";
import { POKEMON_API } from "@/constants";

interface UseGetPokemons {
  limit?: number;
  offset?: number;
}

export const useGetPokemons = ({
  limit = 20,
  offset = 0,
}: UseGetPokemons = {}) => {
  // const data: PokemonsResponse = await fetch(
  //   `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  // ).then((res) => res.json());

  const { data, error, isLoading } = useSWR<PokemonsResponse>(
    `${POKEMON_API}/pokemon?limit=${limit}&offset=${offset}`
  );

  // const pokemons = data.results.map(({ name, url }) => ({
  //   id: url.split("/").at(-2)!,
  //   name,
  // }));

  return {
    data,
    error,
    isLoading,
  };
};
