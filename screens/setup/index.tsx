import React from "react";
import {View, Text} from "../../components/Themed";
import {StyleSheet, Platform, StatusBar} from "react-native";
import StepOneScreen from "./StepOneScreen";
import ControlWidgets from "./widgets/ControlWidgets";
import {Avatar, Colors, Title} from "react-native-paper";
import SetupContext from "../../context/SetupContext";
import StepTwoScreen from "./StepTwoScreen";
import StepFourScreen from "./StepFourScreen";
import {validateName} from "../auth/RegistrationScreen";
import {formatPhoneNumber, numberIsValid} from "../auth/LoginScreen";
import {AUTH_URL} from "../../constants/AxiosInstance";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Setup: React.FC = () => {

    const {handleSetUp, context} = React.useContext(AuthContext) as any;

    const [activeStep, setActiveStep] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [skipped, setSkipped] = React.useState(false);

    const [state, setState] = React.useState({
        name: "",
        tagLine: "",
        businessPhoneNumber: "",
        category: "general",
        logoUri: "",
        social_media: false,
        artik: false,
        store: false,
        isCoordinates: false,
        longitude: "",
        latitude: "",
        isDelivery: false,
        tc: false
    });

    const [errors, setErrors] = React.useState({
        name: {
            title: "name",
            desc: "",
            errorPresent: false
        },
        businessPhoneNumber: {
            title: "businessPhoneNumber",
            desc: "",
            errorPresent: false
        },
        locationInformation: {
            title: "locationInformation",
            desc: "",
            errorPresent: false
        }
    });


    const handleStepChange = (screen: number): void => {
        if (screen > activeStep) {
            let validator = isValid(state, activeStep);
            if (!validator.errorPresent) {
                setActiveStep(screen);
            } else {
                setErrors(prevState => ({...prevState, [validator.title]: validator}))
            }
        } else {
            setActiveStep(screen);
        }
    }

    const handleChange = (text: string, value: string): void => {
        setState(prevState => ({...prevState, [text]: value}));
        setErrors(prevState => ({...prevState, [text]: {title: "", desc: "", errorPresent: false}}));
        if (text === "artik" || text === "social_media" || text === "store") {
            setErrors(prevState => ({...prevState, locationInformation: {title: "", desc: "", errorPresent: false}}));
        }
    }


    const handleSubmit = async () => {
        if (!skipped) {
            setLoading(true)
            try {
                let res = await axios.post(`${AUTH_URL}shops/save`, state, {headers: {access_token: context.token}});
                if (res.status === 200) {
                    setLoading(false);
                    handleSetUp();
                }
                setLoading(false);
            } catch (e) {
                setLoading(false)
            }
        } else {
            handleSetUp();
        }
    }

    const titleProps = () => (
        <>
            <Title style={styles.title}>
                <Text lightColor="#BEEF9E" darkColor="#BEEF9E">Setup</Text>
            </Title>
            {state.logoUri !== "" ?
                <Avatar.Image
                    style={styles.thumbnail}
                    source={{uri: state.logoUri}}
                />
                :
                <Avatar.Text
                    size={50}
                    color={Colors.greenA200}
                    style={styles.thumbnail}
                    theme={{colors: {primary: "#335145"}}}
                    label={state.name !== "" ? state.name[0].toUpperCase() : "N"}
                />
            }
        </>

    );

    const handleSkipToLast = async () => {
        setErrors({
            name: {title: "name", desc: "", errorPresent: false},
            businessPhoneNumber: {desc: "", errorPresent: false, title: ""},
            locationInformation: {desc: "", errorPresent: false, title: ""}
        });
        setSkipped(true);
        setActiveStep(3);
        await AsyncStorage.setItem("@skip_set_up", JSON.stringify(true))
    }


    return (
        <SetupContext.Provider
            value={{
                context: state,
                errors: errors,
                activeStep: activeStep,
                loading: loading,
                handleSubmit: handleSubmit,
                handleChange: handleChange,
                handleStepChange: handleStepChange,
                handleSkipToLast: handleSkipToLast,
            }}>
            <View style={styles.root}>
                <View style={styles.container}>
                    {activeStep === 1 ?
                        <StepOneScreen title={titleProps}/>
                        :
                        activeStep === 2 ?
                            <StepTwoScreen title={titleProps}/>
                            :
                            <StepFourScreen title={titleProps}/>
                    }
                    <View>
                        <ControlWidgets/>
                    </View>
                </View>
            </View>
        </SetupContext.Provider>
    )
}

export default Setup;

interface isValidReturn {
    title: string;
    desc: string;
    errorPresent: boolean;
}

const isValid = (data: any, step: number): isValidReturn => {

    switch (step) {
        case 1:
            if (!validateName(`${data.name} artik`)) {
                return ({
                    title: "name",
                    desc: "Please use a valid name",
                    errorPresent: true
                });
            }
            if (!numberIsValid(formatPhoneNumber(data.businessPhoneNumber))) {
                return ({
                    title: "businessPhoneNumber",
                    desc: "Please use a valid phone number",
                    errorPresent: true
                });
            }

            return ({
                title: "",
                desc: "",
                errorPresent: false
            });
        case 2:
            if (data.social_media || data.artik || data.store) {
                return ({
                    title: "",
                    desc: "",
                    errorPresent: false
                });
            } else {
                return ({
                    title: "locationInformation",
                    desc: "Select at least one option",
                    errorPresent: true
                });
            }
        case 3:

    }
    return ({
        title: "",
        desc: "",
        errorPresent: false
    });
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#BEEF9E",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        backgroundColor: "#1E352F",
        flex: 1.5
    },
    title: {
        alignSelf: "center"
    },
    thumbnail: {
        alignSelf: 'center',
        marginTop: 18,
        marginBottom: 18
    }
})
