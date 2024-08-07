import { BasicPokemon, Pokemon } from "@/interfaces";

export class PokemonMapper {
  static async apiToEntity(data: Pokemon): Promise<BasicPokemon> {
    return {
      id: data.id,
      name: data.name,
      avatar: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      types: data.types.map((type) => type.type.name),
      abilities: data.abilities.map((ability) => ability.ability.name),
      sprites: data.sprites,
    };
  }
}
