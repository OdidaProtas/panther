import React from "react";
import {StyleSheet} from "react-native";
import {View} from "./Themed";
import ActionSheet from "react-native-actions-sheet";
import ShopContext from "../context/ShopContext";

interface ActionSheetRenderInterface {
    Context: React.FC,
    actionSheetRef: any
}

const CustomActionSheet: React.FC<ActionSheetRenderInterface> = ({Context, actionSheetRef}) => {


    return (
        <View
            style={styles.root}
        >
            <ActionSheet ref={actionSheetRef}>
                {<Context/>}
            </ActionSheet>
        </View>
    )
}

export default CustomActionSheet;

const styles = StyleSheet.create({
    root: {
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: 18
    },
})
