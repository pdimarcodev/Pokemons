import { render, screen, waitFor } from "../../../../../test";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Pokemons from "..";

const KEY = "favorites";

describe("Pokemons", () => {
  beforeEach(async () => {
    await AsyncStorage.setItem(KEY, JSON.stringify(["bulbasaur"]));
    render(<Pokemons />);
  });

  it("should get stored favorites", async () => {
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(KEY);
    });

    await waitFor(async () => {
      const storedFavorites = await AsyncStorage.getItem(KEY);
      expect(storedFavorites).toEqual(JSON.stringify(["bulbasaur"]));
    });
  });

  it("should render snapshot and Pokemons names", async () => {
    const textOne = await screen.findByText(/Bulbasaur/);
    const textTwo = screen.getByText(/Ivysaur/);

    expect(textOne).toBeDefined();
    expect(textTwo).toBeDefined();

    expect(screen).toMatchSnapshot();
  });
});
