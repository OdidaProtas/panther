import React from 'react';
import {View, Text} from "../../components/Themed"
import {ScrollView, StyleSheet} from "react-native";
import {Button, TextInput, Title} from "react-native-paper";

interface PasswordResetScreenInterface {
    handleScreenChange: any
}

const PasswordResetScreen: React.FC<PasswordResetScreenInterface> = ({handleScreenChange}) => {

    const [state, setState] = React.useState({
        verification: false,
        loading: false
    })

    const handleSubmit = () => {
        setState({...state, loading: true});
        setTimeout(()=>{
            setState({...state, loading: false, verification: true})
        }, 2000)
    }

    return (
        <ScrollView style={{flex: 1, backgroundColor: "#1E352F"}}>
            <View style={styles.root}>
                <Title>
                    <Text lightColor="#BEEF9E" darkColor="#BEEF9E">Reset password</Text>
                </Title>

                {state.verification ?

                    <TextInput
                        theme={{roundness: 10}}
                        style={styles.textInput}
                        keyboardType="numeric"
                        label="Verification Code"
                        // value={state.text}
                        // onChangeText={text => setState({...state, text: text})}
                    />
                    :
                    <TextInput
                        theme={{roundness: 10}}
                        style={styles.textInput}
                        keyboardType="email-address"
                        label="Email Address"
                        // value={state.text}
                        // onChangeText={text => setState({...state, text: text})}
                    />

                }

                <Button
                    onPress={handleSubmit}
                    uppercase={false}
                    color="#335145"
                    mode={"contained"}
                    loading={state.loading}
                    style={styles.submitButton}
                >
                    {state.verification ? "Submit": "Next"}
                </Button>
                <Button
                    onPress={() => handleScreenChange("login")}
                    color="#BEEF9E" uppercase={false}
                >Login</Button>
                <Button
                    onPress={() => handleScreenChange("register")}
                    color="#BEEF9E"
                    uppercase={false}
                >Create account</Button>
            </View>
        </ScrollView>
    );
}

export default PasswordResetScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#1E352F",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 72
    },
    submitButton: {
        marginTop: 72,
        marginBottom: 90,
        width: 144
    },
    textInput: {
        backgroundColor: "#6E9075",
        width: 360,
        marginTop: 108
    },
})
