import React from "react";
import {Text, View} from "../../components/Themed";
import {StyleSheet} from "react-native";
import {List, Paragraph, Switch} from "react-native-paper";
import {StepPropTypes} from "./StepOneScreen";
import SetupContext from "../../context/SetupContext";

const StepFourScreen: React.FC<StepPropTypes> = ({title}) => {

    const {context, handleChange} = React.useContext(SetupContext) as any;

    return (
        <View style={styles.root}>
            {title()}
            <Paragraph>
                <Text lightColor={"#fff"}>Terms and conditions</Text>
            </Paragraph>
            <Paragraph style={styles.tc}>
                <Text lightColor={"#fff"}>
                    Please read the terms and conditions available on our website on
                    http://www.dreamner.herokuapp.com/t&c
                </Text>
            </Paragraph>
            <View style={styles.container}>
                <List.Section>
                    <List.Item
                        title={<Text lightColor="#fff">Accept terms and conditions</Text>}
                        left={() => <List.Icon color="#E7DFC6" icon="store"/>}
                        right={
                            () => <Switch
                                value={context.tc}
                                onValueChange={() => handleChange("tc", !context.tc)}
                            />
                        }
                    />
                </List.Section>
            </View>
        </View>
    )
}

export default StepFourScreen;

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#1E352F",
        flex: 1,
        alignItems: "center",
        padding: 18,
        marginTop: 18
    },
    tc: {
        marginTop: 36
    },
    container: {
        width: 360,
        marginTop: 36,
        backgroundColor: "#1E352F"
    },
    checkbox: {
        marginTop: 60,
        marginLeft: 9
    }
})
