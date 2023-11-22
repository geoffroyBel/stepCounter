import { View, Text } from "react-native";
import Svg, { Circle, CircleProps, Rect } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
type CircularProgressProps = {
  radius?: number;
  strokeWidth?: number;
  progress: number;
};
const stroke = "#EE0F55";

export default ({
  radius = 100,
  strokeWidth = 30,
  progress,
}: CircularProgressProps) => {
  const innerWidth = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerWidth;
  const fill = useSharedValue(0);

  useEffect(() => {
    fill.value = progress;
  }, [progress]);
  const fillValue = useDerivedValue(() =>
    withTiming(fill.value, { duration: 3000 })
  );

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [circumference * fillValue.value, circumference],
  }));
  const circleProps: CircleProps = {
    cx: radius,
    cy: radius,
    r: innerWidth,
    strokeWidth,
    stroke,
    originX: radius,
    originY: radius,
    strokeLinecap: "round",
    rotation: -90,
  };
  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: "center",
      }}
    >
      <Svg>
        <Circle
          cx={radius}
          cy={radius}
          r={innerWidth}
          {...{ strokeWidth }}
          {...{ stroke }}
          strokeLinecap="round"
          opacity={0.2}
        />

        <AnimatedCircle animatedProps={animatedProps} {...circleProps} />
      </Svg>
      <AntDesign
        size={strokeWidth * 0.8}
        name="arrowright"
        color="black"
        style={{
          position: "absolute",
          alignSelf: "center",
          top: strokeWidth * 0.1,
        }}
      />
    </View>
  );
};
