import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface IContext {
  favorites?: Array<string>;
  setFavorites: Dispatch<SetStateAction<Array<string> | undefined>>;
}

const Context = createContext<IContext>({
  favorites: undefined,
  setFavorites: () => {},
});

const useAppContext = () => useContext(Context);

export { Context, useAppContext };
