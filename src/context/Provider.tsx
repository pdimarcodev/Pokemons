import { ReactNode, useEffect, useState } from "react";
import { Context } from "./AppContext";
import { useFavorites } from "@/hooks/useFavorites";

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const { getStoredFavorites } = useFavorites();
  const [favorites, setFavorites] = useState<Array<string>>();

  const getInitialFavorites = async () => {
    try {
      const stored = await getStoredFavorites();
      setFavorites(stored);
    } catch (error) {
      console.error("Error getting initial favorites!", error);
    }
  };

  useEffect(() => {
    getInitialFavorites();
  }, []);

  return (
    <Context.Provider value={{ favorites, setFavorites }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
