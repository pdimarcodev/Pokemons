import { http, HttpResponse } from "msw";
import { POKEMON_API } from "../src/constants";

const pokemonsMock = {
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1",
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2",
    },
  ],
};

const bulbasaurMock = {
  id: 1,
  sprites: {
    front_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
};

const ivysaurMock = {
  id: 2,
  sprites: {
    front_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
  },
};

export const handlers = [
  http.get(`${POKEMON_API}/pokemon`, () => HttpResponse.json(pokemonsMock)),
  http.get(`${POKEMON_API}/pokemon/bulbasaur`, () =>
    HttpResponse.json(bulbasaurMock)
  ),
  http.get(`${POKEMON_API}/pokemon/ivysaur`, () =>
    HttpResponse.json(ivysaurMock)
  ),
];
