import Animated, { StyleProps, ZoomIn, ZoomOut } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  size: number;
  style?: StyleProps;
}

export function Star({ size, style }: Props) {
  return (
    <Animated.View entering={ZoomIn} exiting={ZoomOut} style={style}>
      <AntDesign name="star" size={size} color="#ff4d6d" />
    </Animated.View>
  );
}
