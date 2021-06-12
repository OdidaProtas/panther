import React from "react";
import {Text, View} from "../../components/Themed";
import {Platform, ScrollView, StyleSheet} from "react-native";
import {Caption, Colors, Paragraph, Switch} from "react-native-paper";
import {List} from 'react-native-paper';
import SetupContext from "../../context/SetupContext";
import {StepPropTypes} from "./StepOneScreen";

const StepTwoScreen: React.FC<StepPropTypes> = ({title}) => {

    const {context, handleChange, errors} = React.useContext(SetupContext) as any;

    React.useEffect(() => {
    }, [])


    return (
        <View style={styles.root}>
            <ScrollView style={styles.container}>
                {title()}
                <Paragraph style={styles.title}>
                    <Text lightColor={"#fff"}>Sales Information</Text>
                </Paragraph>
                <List.Section style={styles.list}>
                    <List.Subheader>
                        <Text lightColor="#BEEF9E">Sales channels</Text>
                    </List.Subheader>
                    <List.Item
                        title={<Text lightColor="#fff">Social media</Text>}
                        left={() => <List.Icon color="#fff" icon="facebook"/>}
                        right={
                            () => <Switch
                                style={styles.switch}
                                value={context.social_media}
                                onValueChange={() => handleChange("social_media", !context.social_media)}
                            />
                        }
                    />
                    <List.Item
                        title={<Text lightColor="#fff">Artik</Text>}
                        left={() => <List.Icon color="#E7DFC6" icon="web"/>}
                        right={
                            () => <Switch
                                style={styles.switch}
                                value={context.artik}
                                onValueChange={() => handleChange("artik", !context.artik)}
                            />
                        }
                    />
                    <List.Item
                        title={<Text lightColor="#fff">Store</Text>}
                        left={() => <List.Icon color="#E7DFC6" icon="store"/>}
                        right={
                            () => <Switch
                                style={styles.switch}
                                value={context.store}
                                onValueChange={() => handleChange("store", !context.store)}
                            />
                        }
                    />
                </List.Section>
                {errors.locationInformation.errorPresent ?
                    <Caption style={styles.helper}>
                        <Text lightColor={Colors.redA200}>Select at least one option</Text>
                    </Caption>
                    :
                    null
                }
            </ScrollView>
        </View>
    )
}

export default StepTwoScreen;

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#1E352F",
        flex: 1,
        alignItems: "center",
        padding: 18,
    },
    container: {
        width: 360,
        backgroundColor: "#1E352F",
        marginTop: 18
    },
    title: {
        alignSelf: "center"
    },
    label: {
        marginTop: 18
    },
    switch: {
        marginTop: Platform.OS === "web" ? 18 : 0,
    },
    list: {
        marginTop: 36
    },
    helper: {
        alignSelf: "center"
    }
})
