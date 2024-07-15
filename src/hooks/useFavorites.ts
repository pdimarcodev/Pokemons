import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "@/context/AppContext";

interface UseFavorites {
  getStoredFavorites: () => Promise<Array<string>>;
  addFavorite: (item: string) => void;
  removeFavorite: (item: string) => void;
}

const KEY = "favorites";

export const useFavorites = (): UseFavorites => {
  const { setFavorites } = useAppContext();

  const getStoredFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(KEY);
      console.log("FAVORITOS", stored ? JSON.parse(stored) : []);

      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error getting stored favorites!", error);
    }
  };

  const addFavorite = async (item: string) => {
    if (typeof item !== "string") return;

    try {
      let favorites = await getStoredFavorites();
      if (favorites.includes(item)) return;
      favorites.push(item);

      await AsyncStorage.setItem(KEY, JSON.stringify(favorites));
      setFavorites(favorites);
    } catch (error) {
      console.error("Error adding favorite!", error);
    }
  };

  const removeFavorite = async (item: string) => {
    if (typeof item !== "string") return;

    try {
      let favorites = await getStoredFavorites();
      const index = favorites.findIndex(
        (favorite: string) => favorite === item
      );
      if (index === -1) return;
      favorites.splice(index, 1);

      await AsyncStorage.setItem(KEY, JSON.stringify(favorites));
      setFavorites(favorites);
    } catch (error) {
      console.error("Error removing favorite!", error);
    }
  };

  return { getStoredFavorites, addFavorite, removeFavorite };
};
