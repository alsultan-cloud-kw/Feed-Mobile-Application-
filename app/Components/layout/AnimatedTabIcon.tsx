// components/AnimatedTabIcon.tsx
import React, { memo } from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { ICONS } from "../../constants/navigation";

interface AnimatedTabIconProps {
  icon: keyof typeof ICONS;
  name: any;
  color: any;
  focused: boolean;
}

export const AnimatedTabIcon = memo(
  ({ icon, name, color, focused }: AnimatedTabIconProps) => {
    const Icon = ICONS[icon];
    const scale = useSharedValue(1);

    const tapGesture = Gesture.Tap()
      .simultaneousWithExternalGesture(Gesture.Tap())
      .onBegin(() => {
        scale.value = withSpring(0.8, { damping: 15, stiffness: 200 });
      })
      .onEnd(() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 200 });
      });

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: scale.value },
        {
          scale: interpolate(
            scale.value,
            [0.8, 1],
            [1, 1.1],
            Extrapolation.CLAMP
          ),
        },
      ],
      opacity: interpolate(
        scale.value,
        [0.8, 1],
        [0.8, 1],
        Extrapolation.CLAMP
      ),
    }));

    return (
      <GestureDetector gesture={tapGesture}>
        <Animated.View style={animatedStyle}>
          <Icon name={name} size={24} color={color} />
        </Animated.View>
      </GestureDetector>
    );
  }
);
