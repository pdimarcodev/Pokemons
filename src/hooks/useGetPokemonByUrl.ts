import useSWR from "swr";
import { BasicPokemon, Pokemon, PokemonsResponse } from "@/interfaces";
import { fetcher } from "@/utils/fetcher";
import { POKEMON_API } from "@/constants";

interface UseGetPokemonByUrl {
  url: string;
}

export const useGetPokemonByUrl = ({ url }: UseGetPokemonByUrl) => {
  // const data: PokemonsResponse = await fetch(
  //   `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  // ).then((res) => res.json());

  const { data, error, isLoading } = useSWR<Pokemon>(url);

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
