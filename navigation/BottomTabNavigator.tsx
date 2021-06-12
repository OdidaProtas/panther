import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import {
    BottomTabParamList,
    HomeParamList,
    OrdersParamList,
    SalesParamList,
    SettingsParamList,
    InventoryParamList
} from '../types';
import InventoryScreen from "../screens/shop/InventoryScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import useShops from "../hooks/shops/useShops";
import AuthContext from "../context/AuthContext";
import ShopContext from "../context/ShopContext";
import SettingsScreen from "../screens/settings";
import {IconButton} from "react-native-paper";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();


export default function BottomTabNavigator() {

    const colorScheme = useColorScheme();

    const {context} = React.useContext(AuthContext) as any;

    const shopsApi = useShops(context.user.id, context.token);

    return (
        <ShopContext.Provider value={{
            shopApi: shopsApi,
            products: [],
        }}>
            <BottomTab.Navigator
                initialRouteName="Home"
                tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
                <BottomTab.Screen
                    name="Home"
                    component={HomeNavigator}
                    options={{
                        tabBarIcon: ({color}) => <IconButton icon="home" color={color}/>,
                    }}
                />
                <BottomTab.Screen
                    name="Inventory"
                    component={InventoryNavigator}
                    options={{
                        tabBarIcon: ({color}) => <IconButton icon="view-list" color={color}/>,
                    }}
                />
                <BottomTab.Screen
                    name="Sales & Orders"
                    component={OrdersNavigator}
                    options={{
                        tabBarIcon: ({color}) => <IconButton icon="shopping" color={color}/>,
                    }}
                />
                <BottomTab.Screen
                    name="Settings"
                    component={SettingsNavigator}
                    options={{
                        tabBarIcon: ({color}) => <IconButton icon="account-settings" color={color}/>,
                    }}
                />
            </BottomTab.Navigator>
        </ShopContext.Provider>
    );
}

const TabBarIcon = (props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) => {
    return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}

const HomeScreenStack = createStackNavigator<HomeParamList>();

const HomeNavigator = () => (
    <HomeScreenStack.Navigator
        screenOptions={{headerShown: false}}
    >
        <HomeScreenStack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerTitle: 'Home'}}
        />
    </HomeScreenStack.Navigator>
);


const InventoryStack = createStackNavigator<InventoryParamList>();

const InventoryNavigator = () => (
    <InventoryStack.Navigator
        screenOptions={{headerShown: false}}
    >
        <InventoryStack.Screen
            name="InventoryScreen"
            component={InventoryScreen}
            options={{headerTitle: 'Inventory'}}
        />
    </InventoryStack.Navigator>
);

const OrdersStack = createStackNavigator<OrdersParamList>();

const OrdersNavigator = () => (
    <OrdersStack.Navigator
        screenOptions={{headerShown: false}}
    >
        <OrdersStack.Screen
            name="OrdersScreen"
            component={OrdersScreen}
            options={{headerTitle: 'Orders'}}
        />
    </OrdersStack.Navigator>
);


const SettingsStack = createStackNavigator<SettingsParamList>();

const SettingsNavigator = () => (
    <SettingsStack.Navigator
        screenOptions={{headerShown: false}}
    >
        <SettingsStack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{headerTitle: "Profile"}}
        />
    </SettingsStack.Navigator>
);
