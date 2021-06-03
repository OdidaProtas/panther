import React from 'react';
import {View, Text} from "../../components/Themed";
import {ScrollView, StyleSheet} from "react-native";
import {Button, TextInput, Title} from "react-native-paper";

interface RegistrationScreenInterface {
    handleScreenChange: any
}

const RegistrationScreen: React.FC<RegistrationScreenInterface> = ({handleScreenChange}) => {

    const [state, setState] = React.useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailAddress: "",
        password: "",
        role: "merchant"
    });

    const [errors, setErrors] = React.useState();

    const handleChange = (name: string, value: string) => {
        setState(prevState => ({...prevState, [name]: value}));
    }

    const handleSubmit = () => {
        if (isValidData(state).errorPresent) {
            return;
        }
    }

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
                                value={state.firstName}
                                onChangeText={text => handleChange("firstName", text)}
                            />
                        </View>
                        <View style={styles.gridItem}>
                            <TextInput
                                theme={{roundness: 9}}
                                style={[styles.textInput, {width: "100%"}]}
                                label="Last Name"
                                value={state.lastName}
                                onChangeText={text => handleChange("lastName", text)}
                            />
                        </View>
                    </View>
                    <TextInput
                        theme={{roundness: 9}}
                        style={styles.textInput}
                        keyboardType="numeric"
                        label="Phone Number"
                        value={state.phoneNumber}
                        onChangeText={text => handleChange("phoneNumber", text)}
                    />
                    <TextInput
                        theme={{roundness: 9}}
                        style={styles.textInput}
                        keyboardType="email-address"
                        label="Email address"
                        value={state.emailAddress}
                        onChangeText={text => handleChange("emailAddress", text)}
                    />
                    <TextInput
                        theme={{roundness: 9}}
                        style={styles.textInput}
                        label="Password"
                        secureTextEntry={true}
                        returnKeyType="go"
                        value={state.password}
                        onChangeText={text => handleChange("password", text)}
                    />
                </View>
                <Button
                    style={styles.register}
                    mode="contained"
                    color={"#335145"}
                    onPress={handleSubmit}
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

interface IsValidDataInterface {
    errorPresent: boolean,
    name: string,
    desc: string
}

const isValidData = (state: any): IsValidDataInterface => {
    return ({
        errorPresent: false,
        name: "firstName",
        desc: "this is a name"
    });
}

const isValidateEmail = (email: string): boolean => {
    let _pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return _pattern.test(email);
}

const testPasswordStrength = (password: string) => {
    let _pattern = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})$/;
    return _pattern.test(password);
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
