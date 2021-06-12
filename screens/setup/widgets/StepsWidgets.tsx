import React from "react";
import {StyleSheet, View, Animated} from "react-native";
import {Badge} from "react-native-paper";
import SetupContext from "../../../context/SetupContext";

const StepsWidgets = () => {

    const {activeStep} = React.useContext(SetupContext) as any;
    const anim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        fadeIn();

        return () => fadeOut();
    }, [activeStep])

    const fadeIn = () => {
        Animated.timing(anim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(anim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true
        }).start();
    };


    return (
        <View style={styles.root}>
            <Animated.View style={{opacity: anim}}>
                <Badge
                    theme={{colors: {notification: activeStep === 1 ? "#BEEF9E" : "#9893DA"}}}
                    size={10}
                    style={[styles.bull, activeStep === 1 ? {width: 30} : {}]}
                />
            </Animated.View>

            <Animated.View style={{opacity: anim}}>
                <Badge
                    theme={{colors: {notification: activeStep === 2 ? "#BEEF9E" : "#9893DA"}}}
                    size={10}
                    style={[styles.bull, activeStep === 2 ? {width: 30} : {}]}
                />
            </Animated.View>

            <Animated.View style={{opacity: anim}}>
                <Badge
                    theme={{colors: {notification: activeStep === 3 ? "#BEEF9E" : "#9893DA"}}}
                    size={10}
                    style={[styles.bull, activeStep === 3 ? {width: 30} : {}]}
                />
            </Animated.View>
        </View>
    )
}

export default StepsWidgets;

const styles = StyleSheet.create({
    root: {
        justifyContent: "center",
        display: "flex",
        backgroundColor: "#1E352F",
        marginTop: -3,
        marginBottom: -3,
        alignItems: "center",
        flexDirection: "row",
        padding: 5
    },
    bull: {
        marginHorizontal: 6
    }
})
