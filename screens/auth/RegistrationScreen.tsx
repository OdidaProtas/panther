import React from 'react';
import {View, Text} from "../../components/Themed";
import {Platform, ScrollView, StyleSheet} from "react-native";
import {Button, TextInput, Title} from "react-native-paper";

interface RegistrationScreenInterface {
    handleScreenChange: any
}

const RegistrationScreen: React.FC<RegistrationScreenInterface> = ({handleScreenChange}) => {

    return (
        <ScrollView style={{flex: 1, backgroundColor: "#1E352F"}}>
            <View style={styles.root}>
                <Title>
                    <Text lightColor={"#BEEF9E"} darkColor={"#BEEF9E"}>Create Account</Text>
                </Title>
                <View style={styles.form}>
                    <View style={styles.gridContainer}>
                        <View style={styles.gridItem}>
                            <TextInput
                                theme={{roundness: 9}}
                                style={[styles.textInput, {width: "100%"}]}
                                label="First Name"
                                // value={state.text}
                                // onChangeText={text => setState({...state, text: text})}
                            />
                        </View>
                        <View style={styles.gridItem}>
                            <TextInput
                                theme={{roundness: 9}}
                                style={[styles.textInput, {width: "100%"}]}
                                label="Last Name"
                                // value={state.text}
                                // onChangeText={text => setState({...state, text: text})}
                            />
                        </View>
                    </View>
                    <TextInput
                        theme={{roundness: 9}}
                        style={styles.textInput}
                        keyboardType="numeric"
                        label="Phone Number"
                        // value={state.text}
                        // onChangeText={text => setState({...state, text: text})}
                    />
                    <TextInput
                        theme={{roundness: 9}}
                        style={styles.textInput}
                        keyboardType="email-address"
                        label="Email address"
                        // value={state.text}
                        // onChangeText={text => setState({...state, text: text})}
                    />
                    <TextInput
                        theme={{roundness: 9}}
                        style={styles.textInput}
                        label="Password"
                        // value={state.text}
                        // onChangeText={text => setState({...state, text: text})}
                    />
                </View>
                <Button
                    style={styles.register}
                    mode="contained"
                    color={"#335145"}
                    onPress={() => console.log("pressed")}
                    uppercase={false}>Submit</Button>
                <Button
                    onPress={() => handleScreenChange("login")}
                    style={styles.login}
                    color={"#BEEF9E"} uppercase={false}
                >
                    Already Registered? Log in</Button>
            </View>
        </ScrollView>
    );
}

export default RegistrationScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#1E352F",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
        marginTop: 36
    },
    form: {
        marginTop: 18,
        backgroundColor: "#1E352F",
        width: 360,
        paddingHorizontal: 12,
    },
    textInput: {
        marginTop: 36,
        backgroundColor: "#6E9075"
    },
    register: {
        marginTop: 36,
    },
    login: {
        marginTop: 18
    },
    gridContainer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#1E352F",

    },
    gridItem: {
        width: "50%",
        paddingHorizontal: 6,
        backgroundColor: "#1E352F",
    }
})
