import * as React from "react";
import {View, Text} from "../../components/Themed";
import {StyleSheet} from "react-native";
import {Button, Caption, Paragraph, Title} from "react-native-paper";


interface WelcomeScreenInterface {
    handleScreenChange: any
}

const WelcomeScreen: React.FC<WelcomeScreenInterface> = ({handleScreenChange}) => {

    return (
        <View style={styles.root}>
            <Title>
                <Text lightColor={"#BEEF9E"} darkColor={"#BEEF9E"}>Merchant</Text>
            </Title>
            <View style={styles.buttonHost}>
                <Button
                    onPress={() => handleScreenChange("login")}
                    mode={"contained"}
                    uppercase={false}
                    color={"#335145"}
                    theme={{roundness: 24}}
                >
                    Log In</Button>
                <Button
                    onPress={() => handleScreenChange("register")}
                    style={styles.signupButton}
                    uppercase={false}
                    color={"#BEEF9E"}
                    theme={{roundness: 24}}
                >
                    Register</Button>
            </View>
        </View>
    )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#1E352F",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 36
    },
    buttonHost: {
        flex: 0.9,
        backgroundColor: "#1E352F",
        justifyContent: "flex-end"
    },
    signupButton: {
        marginTop: 18
    }
})
