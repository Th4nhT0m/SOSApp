import { Animated, Platform, ViewStyle } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store-provider';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { io } from 'socket.io-client';
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

export const useCurrentGPSPosition = () => {
    const [error, setError] = useState<string>();
    const [location, setLocation] = useState<GeolocationResponse>();

    const handleSuccess = (position: GeolocationResponse) => {
        setLocation(position);
    };

    const handleError = (errorMsg: any) => {
        setError(errorMsg.message);
    };

    React.useEffect(() => {
        if (!Geolocation.getCurrentPosition) {
            setError('Geolocation is not supported.');
            return;
        }
        Geolocation.getCurrentPosition(handleSuccess, handleError, {
            enableHighAccuracy: Platform.OS !== 'android',
            timeout: 20000,
        });
    }, []);

    return { location, error };
};

export const useWatchLocation = (options = {}) => {
    // store location in state
    const [location, setLocation] = useState<GeolocationResponse>();
    // store error message in state
    const [error, setError] = useState<string>();
    // save the returned id from the geolocation's `watchPosition` to be able to cancel the watch instance
    const locationWatchId = useRef<any>(null);

    // Success handler for geolocation's `watchPosition` method
    const handleSuccess = (pos: GeolocationResponse) => {
        setLocation(pos);
    };

    // Error handler for geolocation's `watchPosition` method
    const handleError = (errorMsg: any) => {
        setError(errorMsg.message);
    };

    // Clears the watch instance based on the saved watch id
    const cancelLocationWatch = () => {
        const { geolocation } = navigator;

        if (locationWatchId.current && geolocation) {
            geolocation.clearWatch(locationWatchId.current);
        }
    };

    useEffect(() => {
        const { geolocation } = navigator;

        // If the geolocation is not defined in the used browser we handle it as an error
        if (!Geolocation.getCurrentPosition) {
            setError('Geolocation is not supported.');
            return;
        }

        // Start to watch the location with the Geolocation API
        locationWatchId.current = geolocation.watchPosition(handleSuccess, handleError, options);

        // Clear the location watch instance when React unmounts the used component
        return cancelLocationWatch;
    }, [options]);

    return { location, cancelLocationWatch, error };
};
export const useSocket = () => {
    const socket = io('http://192.168.1.6:3000');
    socket.on('connect', () => {
        console.log('Connect Socket and ID : ' + socket.id);
    });
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
