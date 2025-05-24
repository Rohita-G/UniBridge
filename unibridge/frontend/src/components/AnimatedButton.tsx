// components/AnimatedButton.tsx
import React, { useRef } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {
      onPress();
      animation.setValue(0);
    });
  };

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', '#3e5c7e'], // blue fill on press
  });

  const textColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#3e5c7e', 'white'],
  });

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn}>
      <Animated.View style={[styles.button, { backgroundColor }, style]}>
        <Animated.Text style={[styles.text, { color: textColor }, textStyle]}>
          {title}
        </Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: '#3e5c7e',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 50,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AnimatedButton;
