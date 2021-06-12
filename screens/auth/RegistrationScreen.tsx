import React from 'react';
import {View, Text} from "../../components/Themed";
import {ScrollView, StyleSheet} from "react-native";
import {Button, Caption, Colors, TextInput, Title} from "react-native-paper";
import {formatPhoneNumber, numberIsValid} from "./LoginScreen";
import axiosInstance from "../../constants/AxiosInstance";

interface RegistrationScreenInterface {
    handleScreenChange: any
}

const RegistrationScreen: React.FC<RegistrationScreenInterface> = ({handleScreenChange}) => {

    const [loading, setLoading] = React.useState(false);

    const [state, setState] = React.useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailAddress: "",
        password: "",
        role: "merchant"
    });

    const [errors, setErrors] = React.useState({
        firstName: {
            errorPresent: false,
            desc: ""
        },
        lastName: {
            errorPresent: false,
            desc: ""
        },
        phoneNumber: {
            errorPresent: false,
            desc: ""
        },
        emailAddress: {
            errorPresent: false,
            desc: ""
        },
        password: {
            errorPresent: false,
            desc: ""
        }
    });

    React.useEffect(() => {
        return () => {
            setLoading(prevState => false);
        }
    })


    const handleChange = (name: string, value: string) => {
        setState(prevState => ({...prevState, [name]: value}));
        setErrors(prevState => ({...prevState, [name]: {errorPresent: false, desc: ""}}));
        if (name === "lastName") {
            setErrors(prevState => ({...prevState, firstName: {errorPresent: false, desc: ""}}));
        }
    }

    const handleSubmit = async () => {
        toggleLoading();

        const validated = isValidData(state);

        if (validated.errorPresent) {
            setErrors(prevState => ({...prevState, [validated.name]: validated}));
            toggleLoading();
            return;
        }

        try {
            let res = await axiosInstance.post('/signup', state);
            if (res.status === 200) {
                toggleLoading();
                handleScreenChange('login');
            }

        } catch (e) {
            console.log(e)
        }

    }

    const toggleLoading = () => {
        setLoading(!loading);
    }


    return (
        <ScrollView style={{flex: 1, backgroundColor: "#1E352F"}}>
            <View style={styles.root}>
                <Title style={styles.title}>
                    <Text lightColor={"#BEEF9E"} darkColor={"#BEEF9E"}>Create Account</Text>
                </Title>
                <View style={styles.form}>
                    <View style={styles.gridContainer}>
                        <View style={[styles.gridItem]}>
                            <TextInput
                                theme={{roundness: 9}}
                                style={[styles.textInput, {marginRight:3}]}
                                label="First Name"
                                value={state.firstName}
                                error={errors.firstName.errorPresent}
                                onChangeText={text => handleChange("firstName", text)}
                            />
                            {errors.firstName.errorPresent ?
                                <Caption>
                                    <Text
                                        darkColor={Colors.redA200}
                                        lightColor={Colors.redA200}
                                    >{errors.firstName.desc}</Text>
                                </Caption>
                                :
                                null
                            }
                        </View>
                        <View style={[styles.gridItem]}>
                            <TextInput
                                theme={{roundness: 9}}
                                style={[styles.textInput, {marginLeft: 3}]}
                                label="Last Name"
                                error={errors.firstName.errorPresent}
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
                        error={errors.phoneNumber.errorPresent}
                        onChangeText={text => handleChange("phoneNumber", text)}
                    />
                    {errors.phoneNumber.errorPresent ?
                        <Caption>
                            <Text
                                darkColor={Colors.redA200}
                                lightColor={Colors.redA200}
                            >{errors.phoneNumber.desc}</Text>
                        </Caption>
                        :
                        null
                    }
                    <TextInput
                        theme={{roundness: 9}}
                        style={styles.textInput}
                        keyboardType="email-address"
                        label="Email address"
                        value={state.emailAddress}
                        error={errors.emailAddress.errorPresent}
                        onChangeText={text => handleChange("emailAddress", text)}
                    />
                    {errors.emailAddress.errorPresent ?
                        <Caption>
                            <Text
                                darkColor={Colors.redA200}
                                lightColor={Colors.redA200}
                            >{errors.emailAddress.desc}</Text>
                        </Caption>
                        :
                        null
                    }
                    <TextInput
                        theme={{roundness: 9}}
                        style={styles.textInput}
                        label="Password"
                        secureTextEntry={true}
                        returnKeyType="go"
                        value={state.password}
                        error={errors.password.errorPresent}
                        onChangeText={text => handleChange("password", text)}
                    />
                    {errors.password.errorPresent ?
                        <Caption>
                            <Text darkColor={Colors.redA200} lightColor={Colors.redA200}>{errors.password.desc}</Text>
                        </Caption>
                        :
                        null
                    }
                </View>
                <Button
                    style={styles.register}
                    mode="contained"
                    color={"#335145"}
                    loading={loading}
                    onPress={handleSubmit}
                    uppercase={false}>{loading ? "Processing..." : "Submit"}</Button>
                <Button
                    onPress={() => handleScreenChange("login")}
                    style={styles.login}
                    color={"#BEEF9E"} uppercase={false}
                >
                    Log in</Button>
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

    if (!validateName(`${state.firstName} ${state.lastName}`)) {
        return ({
            errorPresent: true,
            name: "firstName",
            desc: "Please enter a valid name"
        });
    }

    if (!numberIsValid(formatPhoneNumber(state.phoneNumber))) {
        return ({
            errorPresent: true,
            name: "phoneNumber",
            desc: "Invalid phone number."
        });
    }

    if (!isValidateEmail(state.emailAddress)) {
        return ({
            errorPresent: true,
            name: "emailAddress",
            desc: "Please provide a valid email address"
        });
    }

    if (!testPasswordStrength(state.password)) {
        return ({
            errorPresent: true,
            name: "password",
            desc: "Please set a stronger password"
        });
    }
    return ({
        errorPresent: false,
        name: "firstName",
        desc: "this is a name"
    });
}

const isValidateEmail = (email: string): boolean => {
    let _pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return _pattern.test(String(email).toLocaleLowerCase());
}

const testPasswordStrength = (password: string): boolean => {
    let _pattern = /^[A-Za-z]\w{7,14}$/;
    return _pattern.test(password);
}

export const validateName = (name: string): boolean => {
    let _pattern = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)$/;
    return _pattern.test(name);
}


export default RegistrationScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#1E352F",
        padding: 3,
        marginTop: 36
    },
    form: {
        marginTop: 18,
        backgroundColor: "#1E352F",
        paddingHorizontal: 12,
    },
    textInput: {
        marginTop: 18,
        backgroundColor: "#6E9075"
    },
    register: {
        marginTop: 36,
        alignSelf: "center",
    },
    login: {
        marginTop: 18,
        alignSelf: "center",
    },
    gridContainer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#1E352F",

    },
    gridItem: {
        width: "50%",
        backgroundColor: "#1E352F",
    },
    title: {
        alignSelf: "center"
    }
})
