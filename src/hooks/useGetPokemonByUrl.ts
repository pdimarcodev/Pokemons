import useSWR from "swr";
import { Pokemon } from "@/interfaces";

interface UseGetPokemonByUrl {
  url: string;
}

export const useGetPokemonByUrl = ({ url }: UseGetPokemonByUrl) => {
  const { data, error, isLoading, isValidating } = useSWR<Pokemon>(url);

  return {
    data,
    error,
    isLoading,
    isValidating,
  };
};
