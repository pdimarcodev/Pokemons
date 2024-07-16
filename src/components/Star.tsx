import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  isFavorite?: boolean;
  size: number;
}

export function Star({ isFavorite, size }: Props) {
  return (
    <Animated.View entering={ZoomIn} exiting={ZoomOut}>
      <AntDesign
        name={isFavorite ? "star" : "staro"}
        size={size}
        color="#ff4d6d"
      />
    </Animated.View>
  );
}
