import React from "react";
import {Text, View} from "../../../components/Themed";
import {Avatar, Button, Caption, List, IconButton, Paragraph, Title, Switch} from "react-native-paper";
import {StyleSheet} from "react-native";
import AuthContext from "../../../context/AuthContext";
import ShopContext from "../../../context/ShopContext";

const ProfileWidget = () => {

    const {context} = React.useContext(AuthContext) as any;
    const {user} = context

    const {shopApi} = React.useContext(ShopContext) as any;

    const {shops, setShops, errors, loading, refresh} = shopApi;

    const shop = shops[0];

    return (
        <>
            <Avatar.Text
                size={72}
                style={styles.thumbnail}
                theme={{colors: {primary: "#335145"}}}
                label={`${shop.name[0].toUpperCase()}`}
            />
            <Title style={styles.title}>
                <Text>
                    {`${shop.name[0].toUpperCase()}${shop.name.substring(1)}`}
                </Text>
            </Title>
            <Button
                uppercase={false}
                icon="map-marker"
                style={styles.location}
                color={"#A2ABB5"}
            >
                Nairobi, Kenya
            </Button>
            <Paragraph style={styles.tagline}>
                <Text>{shop.tagLine}</Text>
            </Paragraph>
            <Caption style={styles.fieldTitle}>
                <Text>Phone Number</Text>
            </Caption>
            <Title style={styles.desc}>
                <Text>{shop.businessPhoneNumber}</Text>
            </Title>
            <Caption style={styles.fieldTitle}>
                <Text>Category</Text>
            </Caption>
            <Title style={styles.desc}>
                <Text>General Items</Text>
            </Title>
            <Caption style={styles.fieldTitle}>
                <Text>Delivery</Text>
            </Caption>
            <List.Item
                title="Goods/Services Delivery"
                style={styles.deliveryField}
                left={props => <List.Icon {...props} icon="bike"/>}
                right={props => <Switch
                    value={context.social_media}
                    onValueChange={() => console.log("delivery")}
                />}
            />
            <View style={styles.grid}>
                <Button
                    color={"#1E352F"}
                    style={styles.update}
                    theme={{roundness: 24}}
                    uppercase={false}
                    icon="logout"
                >Logout</Button>
                <Button
                    mode="contained"
                    color={"#1E352F"}
                    uppercase={false}
                    theme={{roundness: 24}}
                    style={[styles.update, {marginLeft: 9}]}
                    icon="pencil-circle">Edit</Button>
            </View>

        </>
    )
}

export default ProfileWidget;


const styles = StyleSheet.create({
    thumbnail: {
        alignSelf: "center",
        marginTop: -36
    },
    title: {
        alignSelf: "center",
        marginTop: 18
    },
    location: {
        alignSelf: "center",
        marginTop: 6
    },
    tagline: {
        alignSelf: "center",
        marginTop: 18
    },
    fieldTitle: {
        marginHorizontal: 36,
        marginTop: 36
    },
    desc: {
        marginLeft: 36,
        marginTop: 18
    },
    update: {
        marginTop: 18,
        marginBottom: 9,
        alignSelf: "center",
    },
    deliveryField: {
        marginLeft: 24,
        marginRight: 20
    },
    grid: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 36,
        marginBottom: 9
    },
})
