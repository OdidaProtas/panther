import * as React from "react";
import WelcomeScreen from "./WelcomeScreen";
import {Platform, SafeAreaView, StatusBar, StyleSheet} from "react-native";
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";
import PasswordResetScreen from "./PasswordResetScreen";

const Auth = () => {

    const [state, setState] = React.useState({
        screen: "welcome"
    });

    const handleScreenChange = (screen: string) => {
        setState({...state, screen: screen})
    }

    return (
        <SafeAreaView style={styles.root}>
            {state.screen === "welcome" ?
                <WelcomeScreen handleScreenChange={handleScreenChange}/>
                : state.screen === "login" ?
                    <LoginScreen handleScreenChange={handleScreenChange}/>
                    :
                    state.screen === "register" ?
                        <RegistrationScreen handleScreenChange={handleScreenChange}/>
                        :
                        state.screen === "reset_pass" ?
                            <PasswordResetScreen handleScreenChange={handleScreenChange}/>
                            : null
            }
        </SafeAreaView>
    )
}

export default Auth;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#BEEF9E"
    }
})
