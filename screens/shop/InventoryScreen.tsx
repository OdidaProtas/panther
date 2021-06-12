import React from 'react';
import {View, Text} from "../../components/Themed";
import {Platform, StyleSheet} from "react-native";
import {Button, Caption, FAB, Title} from "react-native-paper";
import CustomActionSheet from "../../components/CustomActionSheet";
import ShopContext from "../../context/ShopContext";
import LottieView from 'lottie-react-native';
import ProductsForm from "./widgets/ProductsForm";


const EmptyWidget = () => {
    return (
        <View>
            {Platform.OS !== "web" ?
                <LottieView
                    source={require('./../../assets/animations/empty.json')}
                    colorFilters={[{
                        keypath: "button",
                        color: "#F00000"
                    }, {
                        keypath: "Sending Loader",
                        color: "#F00000"
                    }]}
                    style={{
                        height: 144,
                        width: 144,
                        alignSelf: "center",
                        marginBottom: 90,
                        marginTop: 18
                    }}
                    autoPlay
                    loop
                /> : null}
            <Caption style={styles.emptyCaption}><Text>Add Products/Services to manage</Text></Caption>
        </View>
    )
}

const InventoryScreen = () => {

    const {products} = React.useContext(ShopContext) as any;
    const actionSheetRef = React.createRef() as any;


    const toggleProductForm = (): void => {
        actionSheetRef.current?.setModalVisible();
    }

    return (
        <View style={styles.root}>
            <Title style={styles.title}><Text>Products</Text></Title>
            <CustomActionSheet actionSheetRef={actionSheetRef} Context={ProductsForm}/>
            {products.length > 0 ?
                null
                :
                <EmptyWidget/>
            }
            <Button
                style={styles.fab}
                icon="plus"
                theme={{roundness: 24}}
                onPress={() => toggleProductForm()}
            >Add Products</Button>
        </View>
    );
}

export default InventoryScreen;


const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: 6,
        paddingVertical: 18
    },
    title: {
        margin: 9,
        marginTop: 64,
        alignSelf: "center"
    },
    fab: {
        margin: 18,
        position: 'absolute',
        bottom: 18,
        alignSelf: "center"
    },
    emptyCaption: {
        alignSelf: "center",
        marginBottom: 144
    }
})
