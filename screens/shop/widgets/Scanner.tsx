import React from "react";
import {View, Text} from "../../../components/Themed";
import {StyleSheet} from "react-native";
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Button} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import AuthContext from "../../../context/AuthContext";

const Scanner = () => {

    const navigation = useNavigation();

    const [hasPermission, setHasPermission] = React.useState(false);
    const [scanned, setScanned] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    const {scannerApi} = React.useContext(AuthContext) as any;
    const {setScans} = scannerApi;


    const handleBarCodeScanned = ({type, data}: any) => {
        setScanned(true);
        setScans(data);
        navigation.goBack();
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.root}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned &&
            <Button
                theme={{roundness: 24}}
                mode="contained"
                style={styles.reScan}
                onPress={() => setScanned(false)}
            >Scan Again
            </Button>}
        </View>
    )
}

export default Scanner;

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    reScan: {
        position: "absolute",
        bottom: 18,
        alignSelf: "center"
    }
})
