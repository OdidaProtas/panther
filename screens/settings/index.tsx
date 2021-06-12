import React from "react";
import {Text, View} from "../../components/Themed";
import {
    Avatar,
    List,
    Colors,
    Title,
} from "react-native-paper";
import {ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import AuthContext from "../../context/AuthContext";
import ShopContext from "../../context/ShopContext";
import CustomActionSheet from "../../components/CustomActionSheet";
import ProfileWidget from "./widgets/ProfileWidget";


const SettingsScreen = () => {

    const actionSheetRef = React.createRef() as any;
    const {context} = React.useContext(AuthContext) as any;
    const {shopApi} = React.useContext(ShopContext) as any;

    const {shops, setShops, errors, loading, refresh} = shopApi;

    const shop = shops[0];

    const {user} = context;

    const toggle = () => {
        actionSheetRef.current?.setModalVisible();
    }


    return (
        <View style={{flex: 1}}>
            <CustomActionSheet
                actionSheetRef={actionSheetRef}
                Context={ProfileWidget}
            />
            <ScrollView style={styles.root}>
                <Avatar.Text
                    size={72}
                    color={Colors.greenA200}
                    style={styles.thumbnail}
                    theme={{colors: {primary: "#335145"}}}
                    label={`${shop.name[0].toUpperCase()}`}
                />
                <Title style={styles.title}>
                    {`${shop.name[0].toUpperCase()}${shop.name.substring(1)}`}
                </Title>
                <List.Section style={styles.list}>
                    <List.Item
                        title="Profile"
                        onPress={toggle}
                        left={() => <List.Icon icon="account"/>}
                    />
                    <List.Item
                        title="Notifications"
                        onPress={toggle}
                        left={() => <List.Icon color="#000" icon="bell"/>}
                    />
                    <List.Item
                        title="Support"
                        onPress={toggle}
                        left={() => <List.Icon color="#000" icon="help-circle"/>}
                    />
                </List.Section>

            </ScrollView>
        </View>
    )
}

export default SettingsScreen;

const styles = StyleSheet.create({
    thumbnail: {
        alignSelf: "center",
        marginTop: 48
    }, title: {
        alignSelf: "center",
        marginTop: 18
    },
    root: {
        padding: 18,
        paddingTop: 18,
        paddingBottom: 24,
    },
    logout: {
        alignSelf: "center",
    },
    list: {
        marginTop: 48
    },
})
