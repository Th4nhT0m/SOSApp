import { Animated, ViewStyle } from 'react-native';
import React from 'react';

export const useVisibilityAnimation = (visible: boolean): ViewStyle => {
    const animation = React.useRef<Animated.Value>(new Animated.Value(visible ? 1 : 0));

    React.useEffect(() => {
        Animated.timing(animation.current, {
            duration: 200,
            toValue: visible ? 1 : 0,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    return {
        // @ts-ignore
        transform: [{ translateY: animation.current.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }],
        ...(visible && { position: 'absolute' }),
    };
};
