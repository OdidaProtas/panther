import React from "react";
import {Text, View} from "../../components/Themed";
import {ScrollView, StyleSheet, Image} from "react-native";
import {Title, Card, Caption, IconButton, Paragraph} from "react-native-paper";
import ShopContext from "../../context/ShopContext";


const InventoryIndex = () => {

    const {productsApi} = React.useContext(ShopContext) as any;
    const {products} = productsApi;

    return (
        <>
            <ScrollView style={styles.root}>
                {products.map((item: any) => (
                    <Card
                        theme={{colors: {surface: "#A8C686"}}}
                        key={item}
                        style={styles.card}
                    >
                        <Image
                            style={styles.image}
                            source={{
                                height: 100,
                                width: 100,
                                uri: "https://res.cloudinary.com/dreamner/image/upload/v1623520495/sample.jpg"
                            }}
                        />
                        <View style={styles.content}>
                            <Title><Text>Product Name</Text></Title>
                            <Paragraph style={styles.desc}>Kes. 200</Paragraph>
                            <Caption style={styles.desc}>Quantity</Caption>
                            <Title style={{marginTop: -6}}>100/ 200</Title>
                        </View>
                        <View
                            style={{
                                position: "absolute",
                                right: 9
                            }}
                        >
                            <IconButton icon="share"/>
                            <IconButton icon="shopping"/>
                        </View>
                    </Card>
                ))}

            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    root: {
        paddingVertical: 24,
        paddingHorizontal: 6,
        marginTop: 15,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    card: {
        margin: 3,
        marginVertical: 15,
        height: 130,
    },
    chip: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    }
    , textInput: {
        marginTop: 9,
        marginHorizontal: 3,
        marginBottom: 24,
        elevation: 1
    },
    productTitle: {
        marginBottom: 9
    },
    content: {
        position: "absolute",
        top: 9,
        left: 130
    },
    image: {
        marginLeft: 9,
        marginTop: 15,
        borderRadius: 10
    },
    desc: {
        marginTop: 3
    }

})

export default InventoryIndex;
