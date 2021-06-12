import React from "react";
import {View, Text} from "../../../components/Themed";
import {StyleSheet, TouchableOpacity} from "react-native";
import {IconButton, Menu, Paragraph} from "react-native-paper";


interface MenuIItemsInterface {
    title: string;
    value: string;
}


interface SelectWidgetInterface {
    title: string;
    items: MenuIItemsInterface[];
    handlePress: any;
}


const SelectWidget: React.FC<SelectWidgetInterface> = ({title, items, handlePress}) => {

    const [visible, setVisible] = React.useState(false);

    const toggle = (): void => setVisible(prevState => !prevState);

    const anchor = (
        <TouchableOpacity onPress={toggle}>
            <View style={styles.anchor}>
                <Paragraph>
                    <Text>{title}</Text>
                </Paragraph>
                <IconButton
                    onPress={toggle}
                    style={styles.caret}
                    icon="arrow-down-drop-circle"
                />
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={styles.root}>
            <Menu
                theme={{
                    roundness: 9,
                    colors: {surface: "#F7FFF6"}
                }}
                style={styles.menu}
                visible={visible}
                onDismiss={toggle}
                anchor={anchor}
            >
                {items.map(item => {
                    return (
                        <Menu.Item
                            key={item.value}
                            onPress={() => handlePress(item.value, toggle())}
                            title={item.title}/>
                    )
                })}
            </Menu>
        </View>
    )
}

export default SelectWidget;

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#1E352F"
    },
    anchor: {
        height: 64,
        marginTop: 9,
        backgroundColor: "#6E9075",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 18
    },
    caret: {
        position: "absolute",
        right: 0,
        top: 7
    },
    menu: {
        marginTop: 9
    }
})
