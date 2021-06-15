import React from 'react';
import {View, Text} from "../../components/Themed";
import {Platform, StyleSheet} from "react-native";
import {Button, Caption, FAB, Searchbar, Title} from "react-native-paper";
import CustomActionSheet from "../../components/CustomActionSheet";
import LottieView from 'lottie-react-native';
import ProductsForm from "./widgets/ProductsForm";
import InventoryContext from "../../context/InventoryContext";
import InventoryIndex from "../inventory";
import ActionButtons from "../inventory/ActionButtons";


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

    const actionSheetRef = React.createRef() as any;
    const [searchQuery, setSearchQuery] = React.useState('');

    const toggleProductForm = (): void => {
        actionSheetRef.current?.setModalVisible();
    }

    const onChangeSearch = (query: string) => setSearchQuery(query);

    return (
        <InventoryContext.Provider value={{
            actionSheetRef: actionSheetRef
        }}>
            <View style={styles.root}>
                <View style={styles.grid}>
                    <View style={{width: "40%"}}>
                        <Title style={styles.title}>
                            <Text lightColor={"#1E352F"}>Catalog</Text>
                        </Title>
                    </View>
                    <View style={{
                        width: "60%"
                    }}>
                        <Searchbar
                            placeholder="Search"
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                            style={styles.searchBar}
                        />

                    </View>
                </View>
                {true ?
                    <InventoryIndex/>
                    :
                    <>
                        <EmptyWidget/>
                        <Button
                            icon="plus"
                            uppercase={false}
                            style={styles.fab}
                            theme={{roundness: 24}}
                            onPress={() => toggleProductForm()}
                        >
                            Add
                        </Button>
                    </>
                }
                <CustomActionSheet actionSheetRef={actionSheetRef} Context={ProductsForm}/>
                <ActionButtons/>
            </View>
        </InventoryContext.Provider>
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
        marginTop: 9,
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
    },
    grid: {
        display: "flex",
        flexDirection: "row",
        marginTop: 36,
        paddingHorizontal: 9
    },
    gridItem: {
        width: "50%"
    },
    searchBar: {
        elevation: 1
    }
})
