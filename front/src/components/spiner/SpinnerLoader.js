import React, { useRef, useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Animated,
    Easing,
    Dimensions
} from 'react-native';

const SpinnerLoader = ({ size = 120, logoSize = 50, backgroundColor = 'rgba(255, 255, 255, 0.9)' }) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Rotation animation
        const rotateAnimation = Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );

        // Pulse animation for logo
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1,
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );

        rotateAnimation.start();
        pulseAnimation.start();

        return () => {
            rotateAnimation.stop();
            pulseAnimation.stop();
        };
    }, [rotateAnim, scaleAnim]);

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={[styles.spinnerBackdrop, { backgroundColor }]}>
            <View style={[styles.spinner, { width: size, height: size }]}>
                {/* Animated Spinner Border */}
                <Animated.View 
                    style={[
                        styles.spinnerBorder,
                        { 
                            width: size - 40, 
                            height: size - 40,
                            transform: [{ rotate: rotateInterpolate }]
                        }
                    ]} 
                />
                
                {/* Pulsing Logo */}
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <Image 
                        source={require('../../assets/images/mtaani-default.png')}
                        style={[styles.spinnerImage, { width: logoSize, height: logoSize }]}
                        resizeMode="contain"
                    />
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerBackdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
       
    },
    spinner: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinnerBorder: {
        position: 'absolute',
        borderWidth: 4,
        borderColor: '#007AFF',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderRadius: 50,
    },
    spinnerImage: {
        borderRadius: 8,
    },
});

export default SpinnerLoader;