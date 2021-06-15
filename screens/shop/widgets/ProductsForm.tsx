import React, {useState} from "react";
import {View, Text} from "../../../components/Themed";
import {Avatar, Button, TextInput, Title} from "react-native-paper";
import {Platform, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import ShopContext from "../../../context/ShopContext";
import * as ImagePicker from "expo-image-picker";
import AuthContext from "../../../context/AuthContext";
import axios from "axios"
import {AUTH_URL} from "../../../constants/AxiosInstance";
import DateTimePicker from '@react-native-community/datetimepicker';
import InventoryContext from "../../../context/InventoryContext";


const ProductsForm: React.FC = () => {

    const navigation = useNavigation();

    const {context} = React.useContext(AuthContext) as any;
    const {shopApi} = React.useContext(ShopContext) as any;

    const {shops} = shopApi;
    const shop = shops[0];

    const [logoUri, setLogoUri] = React.useState("");

    const [uploading, setUploading] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate: any): void => {
        const currentDate = selectedDate || state.expiryDate;
        setShow(Platform.OS === 'ios');
        setState(prevState => ({...prevState, expiryDate: currentDate}));
    };

    const showDatepicker = () => {
        setShow(false);
    };


    const [errors, setErrors] = React.useState({
        nameError: "",
        retailPriceError: "",
        expiryDate: "",
    });

    const [state, setState] = React.useState({
        name: "",
        purchasePrice: "",
        retailPrice: "",
        quantity: "",
        expiryDate: new Date(),
        barcode: "",
        imageUrl: "",
        shop: shop?.id
    });

    const purchasePriceInput = React.useRef() as any;
    const retailPriceInput = React.useRef() as any;
    const quantityInput = React.useRef() as any;

    const {actionSheetRef} = React.useContext(InventoryContext) as any;

    const openScanner = () => {
        navigation.navigate("Scanner");
    }

    let openImagePickerAsync = async () => {
        setUploading(true);
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Permission to access camera roll is required!");
            setUploading(false);
            return;
        }

        let pickerResult: any = await ImagePicker.launchImageLibraryAsync({allowsEditing: true});
        if (pickerResult.cancelled === true) {
            setUploading(false);
            return;
        }

        setLogoUri(pickerResult.uri);
        handleUpload(pickerResult);
    }

    const handleSubmit = async () => {
        setLoading(true)
        if (validateFields(state)) {
            try {
                let res = await axios.post(`${AUTH_URL}products/save`, state,
                    {
                        headers: {
                            access_token: context.token
                        }
                    });
                if (res.status === 200) {
                    setLoading(false);
                    actionSheetRef.current?.setModalVisible(false);
                }
            } catch (e) {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }

    const validateFields = (data: any): boolean => {
        if (data.name.trim() === "") {
            setErrors(prevState => ({...prevState, name: "Name is required"}));
            return false;
        } else if (data.purchasePrice.trim === "") {
            setErrors(prevState => ({...prevState, name: "Name is required"}));
            return false;
        }
        return true;
    }


    const handleUpload = (image: any): void => {

        image["type"] = `test/${image.uri.split(".")[1]}`
        image["name"] = `test.${image.uri.split(".")[1]}`

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "dreamner");
        formData.append("cloud_name", "artik");

        fetch("https://api.cloudinary.com/v1_1/dreamner/image/upload", {
            method: "post",
            body: formData
        }).then(res => res.json())
            .then(data => {
                setUploading(false);
                setLogoUri(data.url);
            });
    }


    const handleChange = (text: string, value: string): void => {
        setState(prevState => ({...prevState, [text]: value}))
    }

    const handleCancel = () => {
        actionSheetRef.current?.setModalVisible(false);
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
                autoFocus
                value={state.name}
                returnKeyType={"next"}
                theme={{roundness: 10}}
                style={styles.textInput}
                label="Product/Service Name *"
                onChangeText={text => handleChange("name", text)}
                onSubmitEditing={() => purchasePriceInput.current.focus()}

            />
            <View style={styles.gridContainer}>
                <View style={[styles.gridItem, {paddingRight: 9}]}>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="numeric"
                        theme={{roundness: 10}}
                        label="Purchase Price"
                        ref={purchasePriceInput}
                        style={styles.textInput}
                        value={state.purchasePrice}
                        onChangeText={text => handleChange("purchasePrice", text)}
                        onSubmitEditing={() => retailPriceInput.current.focus()}
                    />
                </View>
                <View style={[styles.gridItem, {paddingLeft: 9}]}>
                    <TextInput
                        label="Retail Price *"
                        keyboardType="numeric"
                        returnKeyType="next"
                        ref={retailPriceInput}
                        theme={{roundness: 10}}
                        style={styles.textInput}
                        value={state.retailPrice}
                        onChangeText={text => handleChange("retailPrice", text)}
                        onSubmitEditing={() => quantityInput.current.focus()}
                    />
                </View>
            </View>
            <TextInput
                label="Quantity"
                keyboardType="numeric"
                returnKeyType="next"
                ref={quantityInput}
                theme={{roundness: 10}}
                style={styles.textInput}
                value={state.quantity}
                onChangeText={text => handleChange("quantity", text)}
                onSubmitEditing={showDatepicker}
            />
            <View>
                <Button
                    uppercase={false}
                    icon="calendar-remove"
                    style={styles.barcodeScanner}
                    onPress={showDatepicker}
                >Expiry</Button>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={state.expiryDate}
                    display="spinner"
                    style={styles.picker}
                    onChange={onChange}
                    textColor="yellow"
                />
            )}
            <Button
                onPress={openScanner}
                uppercase={false}
                icon="barcode"
                style={styles.barcodeScanner}
            >Scan Barcode</Button>
            <Button
                uppercase={false}
                style={styles.uploadBtn}
                loading={uploading}
                disabled={uploading}
                onPress={openImagePickerAsync}
                icon="image">Upload Images *</Button>
            <View style={styles.footer}>
                <Button
                    uppercase={false}
                    onPress={handleCancel}
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
                    loading={loading}
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
    footer: {
        marginTop: 18,
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
    },
    picker: {
        borderRadius: 24
    }
})
