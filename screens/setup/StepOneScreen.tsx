import React from "react";
import {Text, View} from "../../components/Themed";
import {ScrollView, StyleSheet} from "react-native";
import {Button, Caption, Colors, Paragraph, TextInput} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import SelectWidget from "./widgets/SelectWidget";
import SetupContext from "../../context/SetupContext";

enum Category {
    BEAUTY_AND_FASHION = "beauty_and_fashion",
    FOOD_AND_BEVERAGES = "food_and_beverages",
    ELECTRONICS = "electronics",
    GENERAL = "general"
}

export interface StepOneStateInterface {
    widget: string
    name: string;
    tagline?: string;
    businessPhoneNumber: string;
    category: Category;
    logoUri?: string;
}

export interface StepPropTypes {
    title: any
}

const StepOneScreen: React.FC<StepPropTypes> = ({title}) => {

    const {
        handleChange,
        context,
        errors
    } = React.useContext(SetupContext) as any;

    const secondInput = React.useRef() as any;
    const thirdInput = React.useRef() as any;


    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult: any = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }

        handleChange("logoUri", pickerResult.uri);
    }

    const handleMenuPress = (value: string): void => {
        handleChange("category", value);
    }

    const menuItems = [
        {title: "Beauty and Fashion", value: Category.BEAUTY_AND_FASHION},
        {title: "Food and Beverages", value: Category.FOOD_AND_BEVERAGES},
        {title: "Electronics", value: Category.ELECTRONICS},
        {title: "General", value: Category.GENERAL}
    ]


    return (
        <View style={styles.root}>
            <ScrollView style={styles.form}>
                {title()}
                <Paragraph style={styles.title}>
                    <Text lightColor={"#fff"}>General Information</Text>
                </Paragraph>
                <TextInput
                    label="Name*"
                    style={styles.textInput}
                    theme={{roundness: 10}}
                    value={context.name}
                    error={errors.name.errorPresent}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    onSubmitEditing={() => secondInput.current.focus()}
                    onChangeText={text => handleChange("name", text)}
                />
                {errors.name.errorPresent ?
                    <Caption>
                        <Text lightColor={Colors.redA200}>{errors.name.desc}</Text>
                    </Caption>
                    :
                    null
                }
                <TextInput
                    label="Tagline"
                    ref={secondInput}
                    theme={{roundness: 10}}
                    value={context.tagline}
                    style={styles.textInput}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    onSubmitEditing={() => thirdInput.current.focus()}
                    onChangeText={text => handleChange("tagLine", text)}
                />
                <TextInput
                    label="Business phone number*"
                    ref={thirdInput}
                    keyboardType="numeric"
                    theme={{roundness: 10}}
                    value={context.businessPhoneNumber}
                    style={styles.textInput}
                    returnKeyType="next"
                    error={errors.businessPhoneNumber.errorPresent}
                    onChangeText={text => handleChange("businessPhoneNumber", text)}
                />
                {errors.businessPhoneNumber.errorPresent ?
                    <Caption>
                        <Text lightColor={Colors.redA200}>{errors.businessPhoneNumber.desc}</Text>
                    </Caption>
                    :
                    null
                }
                <SelectWidget
                    handlePress={handleMenuPress}
                    items={menuItems}
                    title={`Category* ${
                        context.category === Category.ELECTRONICS ? "(Electronics)"
                            :
                            context.category === Category.BEAUTY_AND_FASHION ? "(Beauty and fashion)"
                                :
                                context.category === Category.FOOD_AND_BEVERAGES ? "(Food and Beverages)"
                                    :
                                    "(General)"}`
                    }
                />
                <Button
                    icon="camera-image"
                    onPress={openImagePickerAsync}
                    style={styles.imagePicker}
                    color="#335145"
                    mode="contained"
                    uppercase={false}
                >
                    Logo
                </Button>
            </ScrollView>
        </View>
    )
}

export default StepOneScreen;

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#1E352F",
        flex: 1,
        padding: 18,
        paddingTop: 9
    },
    form: {
        paddingTop: 18,
        // width: 360,
    },
    title: {
        alignSelf: "center",
    },
    textInput: {
        backgroundColor: "#6E9075",
        marginTop: 9
    },
    imagePicker: {
        marginTop: 20,
        marginBottom: 18
    },
    menu: {
        paddingTop: 6,
    },
    menuButton: {
        marginTop: 24
    },
    anchor: {
        height: 64,
        marginTop: 24,
        backgroundColor: "#6E9075",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 18
    },
    caret: {
        position: "absolute",
        right: 24,
        top: 7
    },
    helper: {
        fontSize: 10,
    }
})
