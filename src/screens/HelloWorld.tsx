import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {PageContainer} from '../components';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  useDerivedValue,
  withSpring,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const HelloWorldApp = () => {
  const whiteContainerScale = useSharedValue(1);
  const whiteContainerRadius = useDerivedValue(
    () => whiteContainerScale.value * 0.25,
  );

  const whiteContainerAnimatedStyles = useAnimatedStyle(() => ({
    borderRadius: whiteContainerRadius.value,
    transform: [
      ...styles.whiteContainer.transform,
      {scale: whiteContainerScale.value},
    ],
  }));

  const [hasGrownWhiteContainer, setHasGrownWhiteContainer] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    whiteContainerScale.value = withSpring(
      15,
      {
        damping: 10,
        stiffness: 50,
        mass: 1.2,
      },
      () => runOnJS(setHasGrownWhiteContainer)(true),
    );
  }, []);

  const middlePinkCircleScale = useSharedValue(1);
  const hTextScale = useDerivedValue(() => middlePinkCircleScale.value * 0.01);

  const middlePinkCircleStyles = useAnimatedStyle(() => ({
    transform: [{scale: middlePinkCircleScale.value}],
  }));

  const htextStyles = useAnimatedStyle(() => ({
    transform: [{scale: hTextScale.value}],
  }));

  if (hasGrownWhiteContainer) {
    middlePinkCircleScale.value = withDelay(
      1000,
      withTiming(180, {
        duration: 2000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    );
  }

  return (
    <PageContainer>
      <View style={styles.container}>
        <Animated.View
          style={[styles.whiteContainer, whiteContainerAnimatedStyles]}
        />

        <View style={[styles.whiteContainer, styles.lilDotsContainer]}>
          {Array.from({length: 6}).map((_, index) => (
            <AnimatedPinkDots
              index={index}
              key={index}
              shouldAnimate={hasGrownWhiteContainer}
            />
          ))}

          <Animated.View style={[styles.lilPink, middlePinkCircleStyles]} />
          <Animated.Text style={[styles.hText, htextStyles]}>H</Animated.Text>
        </View>
      </View>
    </PageContainer>
  );
};

const AnimatedPinkDots: React.FC<{
  index: number;
  shouldAnimate: boolean;
}> = ({index, shouldAnimate}) => {
  const radius = useSharedValue(110);

  const deg = index * 60;
  const angle = useSharedValue(deg);

  const x = useDerivedValue(() =>
    Math.round(radius.value * Math.sin(angle.value * (Math.PI / 180))),
  );

  const y = useDerivedValue(() =>
    Math.round(radius.value * Math.cos(angle.value * (Math.PI / 180))),
  );

  const pinkDotScale = useSharedValue(1);

  let indexToPosition = {
    0: 1,
    2: 2,
    4: 3,
    1: 4,
    3: 5,
    5: 6,
  };

  if (shouldAnimate) {
    pinkDotScale.value = withDelay(
      indexToPosition[index] * 200,
      withTiming(45, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    );

    angle.value = withTiming(deg + 300, {
      duration: 3000,
      easing: Easing.cubic,
    });

    radius.value = withDelay(
      indexToPosition[index] * 200 + 1200,
      withTiming(0, {
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        duration: 1000,
      }),
    );
  }

  const animatedDotStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: x.value},
      {translateY: y.value},
      {scale: pinkDotScale.value},
    ],
  }));

  //   const pinkDotStyle = useAnimatedStyle(() => ({
  //     opacity: pinkDotOpacity.value,
  //     transform: [{scale: pinkDotScale.value}],
  //   }));

  // if (shouldAnimate) {
  //   pinkDotScale.value = withTiming(3, {duration: 4000});
  // }

  return <Animated.View style={[styles.lilPink, animatedDotStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fb6b8b',
    position: 'relative',
  },
  whiteContainer: {
    position: 'absolute',
    height: 20,
    width: 20,
    backgroundColor: 'white',
    top: '50%',
    left: '50%',
    borderRadius: 200,
    transform: [{translateX: -10}, {translateY: -10}],
  },
  lilDotsContainer: {
    position: 'relative',
    backgroundColor: 'transparent',
    height: 220,
    width: 220,
    transform: [{translateX: -110}, {translateY: -110}],
  },
  lilPink: {
    position: 'absolute',
    backgroundColor: '#fb6b8b',
    height: 1,
    width: 1,
    borderRadius: 99,
    top: '50%',
    left: '50%',
  },
  hText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -5}, {translateY: -5}],
    color: 'white',
  },
});

export default HelloWorldApp;
