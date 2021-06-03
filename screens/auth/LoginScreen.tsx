import React from 'react';
import {View, Text} from "../../components/Themed";
import {Button, Caption, Colors, TextInput, Title} from "react-native-paper";
import {StyleSheet} from "react-native";
import AuthContext from "../../context/AuthContext";
import axiosInstance from "../../constants/AxiosInstance";

interface LoginScreenInterface {
    handleScreenChange: any
}

const LoginScreen: React.FC<LoginScreenInterface> = ({handleScreenChange}) => {

    const {handleLoggedIn} = React.useContext(AuthContext) as any;

    const [state, setState] = React.useState({
        phoneNumber: "",
        password: "",
        loading: false
    });

    const [errors, setErrors] = React.useState({
        phoneNumber: {
            present: false,
            desc: ""
        },
        password: {
            present: false,
            desc: ""
        },
        credentials: false,
    });

    const handleChange = (name: string, text: string) => {
        setState((prev) => ({...prev, [name]: text}));
        if (errors.phoneNumber.present || errors.password.present || errors.credentials) {
            setErrors(prevState => ({...prevState, [name]: {present: false, desc: ""}}))
            setErrors(prevState => ({...prevState, credentials: false}))
        }
    }

    const handleSubmit = async () => {

        toggleLoading();

        if (!isPassValid(state.password).present && !isPhoneValid(state.phoneNumber).present) {

            try {
                let res = await axiosInstance.post('/login', state);
                if (res.status === 200) {
                    toggleLoading();
                    handleLoggedIn(res.data);
                }
            } catch (e) {
                toggleLoading();
                setErrors(prevState => ({...prevState, credentials: true}));
            }
            return;
        }
        if (isPhoneValid(state.phoneNumber).present) {
            setErrors(prevState => ({...prevState, phoneNumber: isPhoneValid(state.phoneNumber)}));
            toggleLoading();
            return;
        }
        if (isPassValid(state.password).present) {
            setErrors(prevState => ({...prevState, password: isPassValid(state.password)}));
            toggleLoading();
            return;
        }
    }

    const toggleLoading = () => {
        setState(prevState => ({...prevState, loading: !prevState.loading}));
    }

    const handleNull = () => {

    }


    return (
        <View style={styles.root}>
            <Title>
                <Text
                    darkColor={"#BEEF9E"}
                    lightColor={"#BEEF9E"}
                >Welcome back</Text>
            </Title>
            <View style={styles.form}>
                <TextInput
                    theme={{roundness: 10}}
                    style={styles.textInput}
                    keyboardType="numeric"
                    label="Phone Number"
                    value={state.phoneNumber}
                    onChangeText={text => handleChange("phoneNumber", text)}
                    error={errors.phoneNumber.present}
                />
                {errors.phoneNumber.present ?
                    <Caption
                        style={{paddingLeft: 9}}
                    >
                        <Text
                            lightColor={Colors.redA200}
                            darkColor={Colors.redA200}
                        >{errors.phoneNumber.desc}
                        </Text>
                    </Caption>
                    : null
                }
                <TextInput
                    theme={{roundness: 10}}
                    textContentType="password"
                    style={styles.textInput}
                    label="Password"
                    value={state.password}
                    secureTextEntry={true}
                    autoCorrect={false}
                    returnKeyType="go"
                    onChangeText={text => handleChange("password", text)}
                    error={errors.password.present}
                />
                {errors.password.present ?
                    <Caption style={{marginLeft: 9}}>
                        <Text darkColor={Colors.redA200} lightColor={Colors.redA200}>{errors.password.desc}</Text>
                    </Caption>
                    :
                    null
                }
            </View>
            {errors.credentials ?
                <Caption>
                    <Text darkColor={Colors.redA200} lightColor={Colors.redA200}>Invalid username or password</Text>
                </Caption>
                : null
            }

            <Button
                onPress={!state.loading ? handleSubmit : handleNull}
                style={styles.login}
                mode="contained"
                uppercase={false}
                color="#335145"
                loading={state.loading}
            >
                {state.loading ? "" : "Login"}</Button>
            <Button
                onPress={() => handleScreenChange("register")}
                color={"#BEEF9E"}
                uppercase={false}
            >
                Register</Button>
            <Button
                onPress={() => handleScreenChange("reset_pass")}
                color={"#BEEF9E"}
                uppercase={false}
            >
                Reset password</Button>
        </View>
    );
}

export default LoginScreen;


interface ValidInterface {
    present: boolean;
    desc: string;
}

const isPhoneValid = (phoneNumber: string): ValidInterface => {
    if (phoneNumber == "") return ({
        present: true,
        desc: "Phone number cannot be empty"
    });
    if (!numberIsValid(formatPhoneNumber(phoneNumber))) {
        return ({
            present: true,
            desc: "Invalid phone number"
        })
    }
    return ({
        present: false,
        desc: ""
    });
}

const isPassValid = (password: string): ValidInterface => {
    if (password === "") return ({
        present: true,
        desc: "Password cannot be empty"
    });
    return ({
        present: false,
        desc: ""
    });
}

export const formatPhoneNumber = (phoneNumber: string): number => {
    let formatted = parseInt(`254${phoneNumber.substring(1)}`);
    return formatted;
}


export const numberIsValid = (formatted: number): boolean => {
    let _pattern = /^(?:254|\+254|0)?((?:7|1)(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/;
    return _pattern.test(String(formatted));
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#1E352F",
        justifyContent: "center",
        alignItems: "center"
    },
    login: {
        marginTop: 72,
        marginHorizontal: 36,
        marginBottom: 48,
        width: 144
    },
    textInput: {
        marginTop: 18,
        marginHorizontal: 9,
        backgroundColor: "#6E9075"
    },
    form: {
        width: 360,
        backgroundColor: "#1E352F",
        marginTop: 72
    }

})
