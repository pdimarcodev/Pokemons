import Reactotron, { asyncStorage } from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    host: "localhost", // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
    name: "Pokemons", // would you like to see your app's name?
  })
  .useReactNative()
  .use(asyncStorage())
  .connect();
