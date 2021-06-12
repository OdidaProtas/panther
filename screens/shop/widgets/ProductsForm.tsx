import React from "react";
import {View, Text} from "../../../components/Themed";
import {Avatar, Button, TextInput, Title} from "react-native-paper";
import {StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import ShopContext from "../../../context/ShopContext";
import * as ImagePicker from "expo-image-picker";


const ProductsForm: React.FC = () => {

    const navigation = useNavigation();

    const {shopApi} = React.useContext(ShopContext) as any;
    const {shops} = shopApi;
    const shop = shops[0];

    const [logoUri, setLogoUri] = React.useState("");


    const openScanner = () => {
        navigation.navigate("Scanner");
    }

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

        setLogoUri(pickerResult.uri);
    }

    const handleSubmit = () => {
    }


    return (
        <View style={styles.root}>
            {logoUri !== "" ?
                <Avatar.Image
                    size={72}
                    style={styles.thumbnail}
                    source={{uri: logoUri}}
                />
                :
                <Avatar.Text
                    size={72}
                    style={styles.thumbnail}
                    theme={{colors: {primary: "#335145"}}}
                    label={`${shop.name[0].toUpperCase()}`}
                />
            }
            <Title style={styles.title}>
                <Text>Add Products</Text>
            </Title>
            <TextInput
                theme={{roundness: 10}}
                style={styles.textInput}
                label="Product/Service Name"
            />
            <View style={styles.gridContainer}>
                <View style={[styles.gridItem, {paddingRight: 9}]}>
                    <TextInput
                        theme={{roundness: 10}}
                        style={styles.textInput}
                        label="Purchase Price"
                    />
                </View>
                <View style={[styles.gridItem, {paddingLeft: 9}]}>
                    <TextInput
                        theme={{roundness: 10}}
                        style={styles.textInput}
                        label="Retail Price"
                    />
                </View>
            </View>
            <TextInput
                theme={{roundness: 10}}
                style={styles.textInput}
                label="Quantity"
            />
            <TextInput
                theme={{roundness: 10}}
                style={styles.textInput}
                label="Expiry Date"
            />
            <Button
                onPress={openScanner}
                uppercase={false}
                icon="barcode"
                style={styles.barcodeScanner}
            >Scan Barcode</Button>
            <Button
                uppercase={false}
                style={styles.uploadBtn}
                onPress={openImagePickerAsync}
                icon="image">Upload Image</Button>
            <View style={styles.btns}>
                <Button
                    uppercase={false}
                    style={styles.saveBtn}
                    theme={{roundness: 24}}
                >Cancel</Button>
                <Button
                    uppercase={false}
                    mode="contained"
                    icon="content-save"
                    style={styles.saveBtn}
                    theme={{roundness: 24}}
                    onPress={handleSubmit}
                >Save</Button>
            </View>

        </View>
    )
}

export default ProductsForm;


const styles = StyleSheet.create({
    root: {
        padding: 18,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24
    },
    title: {
        alignSelf: "center",
        marginVertical: 18
    },
    textInput: {
        marginTop: 9,
    },
    saveBtn: {
        alignSelf: "flex-end",
        marginTop: 9
    },
    btns: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    gridContainer: {
        display: "flex",
        flexDirection: "row"
    },
    gridItem: {
        width: "50%"
    },
    barcodeScanner: {
        alignSelf: "flex-start",
        marginTop: 18
    },
    uploadBtn: {
        alignSelf: "flex-start",
        marginVertical: 18
    },
    thumbnail: {
        alignSelf: "center",
        marginTop: -48
    }
})
