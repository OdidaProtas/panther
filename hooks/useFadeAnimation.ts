import * as React from "react";
import {Animated} from "react-native";

const useFadeAnimation = () => {


    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        fadeIn();

        return () => {
            fadeOut();
        }
    }, [])

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true
        }).start();
    };

    return fadeAnim;

}

export default useFadeAnimation;
