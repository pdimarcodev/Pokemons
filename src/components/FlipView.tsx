import { ReactNode } from "react";
import { StyleProp, StyleSheet } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";

interface Props {
  containerStyle: StyleProp<Object>;
  RegularContent: ReactNode;
  FlippedContent: ReactNode;
}

export default function FlipCard({
  containerStyle,
  RegularContent,
  FlippedContent,
}: Props) {
  const rotation = useSharedValue(0);

  const toggleFlip = () => {
    rotation.value = withTiming(rotation.value + 180, {
      duration: 500,
      easing: Easing.ease,
    });
  };

  const onTap = ({
    nativeEvent,
  }: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
    if (nativeEvent.state === State.END) {
      toggleFlip();
    }
  };

  const frontCardStyle = useAnimatedStyle(() => {
    const interpolatedRotateY = interpolate(
      rotation.value,
      [0, 180, 360],
      [0, 180, 0]
    );
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${interpolatedRotateY}deg` },
      ],
    };
  });

  const backCardStyle = useAnimatedStyle(() => {
    const interpolatedRotateY = interpolate(
      rotation.value,
      [0, 180, 360],
      [180, 360, 180]
    );
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${interpolatedRotateY}deg` },
      ],
    };
  });

  return (
    <GestureHandlerRootView>
      <TapGestureHandler onHandlerStateChange={onTap}>
        <Animated.View
          style={[containerStyle, frontCardStyle, styles.cardContainer]}
        >
          {RegularContent}
        </Animated.View>
      </TapGestureHandler>
      <TapGestureHandler onHandlerStateChange={onTap}>
        <Animated.View
          style={[
            containerStyle,
            backCardStyle,
            styles.cardContainer,
            styles.cardBack,
          ]}
        >
          {FlippedContent}
        </Animated.View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backfaceVisibility: "hidden",
  },
  cardBack: {
    position: "absolute",
  },
});
