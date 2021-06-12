import React from 'react';
import {StyleSheet} from "react-native";
import {Button, Colors, IconButton} from "react-native-paper";
import {View} from "../../../components/Themed";
import SetupContext from "../../../context/SetupContext";
import StepsWidgets from "./StepsWidgets";
import axiosInstance from "../../../constants/AxiosInstance";

const ControlWidgets = () => {

    const {
        activeStep,
        handleStepChange,
        handleSubmit,
        context,
        errors,
        handleSkipToLast,
        loading
    } = React.useContext(SetupContext) as any;

    return (
        <>
            <View style={styles.root}>
                <IconButton
                    size={18}
                    icon="arrow-left"
                    color={Colors.white}
                    theme={{roundness: 24}}
                    disabled={activeStep === 1}
                    onPress={() => handleStepChange(activeStep - 1)}
                />
                <StepsWidgets/>
                <Button
                    color="#335145"
                    mode="contained"
                    uppercase={false}
                    theme={{roundness: 24}}
                    loading={loading}
                    disabled={
                        activeStep === 3 && !context.tc
                        || errors.name.errorPresent
                        || errors.businessPhoneNumber.errorPresent
                        || errors.locationInformation.errorPresent
                    }
                    onPress={activeStep < 3 ? () => handleStepChange(activeStep + 1) : handleSubmit}
                >
                    {activeStep === 3 ? "Submit" : "Next"}
                </Button>
            </View>
        </>
    );
}

export default ControlWidgets;

const styles = StyleSheet.create({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#1E352F",
        paddingLeft: 72,
        paddingBottom: 12,
        paddingRight: 72,
    },
    skip: {
        alignSelf: "center"
    }

})
