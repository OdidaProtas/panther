import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {
    BottomTabParamList,
    HomeParamList,
    OrdersParamList,
    SalesParamList,
    ProfileParamList,
    InventoryParamList
} from '../types';
import InventoryScreen from "../screens/shop/InventoryScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import SalesScreen from "../screens/shop/SalesScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
            <BottomTab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-home" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Inventory"
                component={InventoryNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-list" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Orders"
                component={OrdersNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-cart" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Sales"
                component={SalesNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="cash" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-person" color={color}/>,
                }}
            />
        </BottomTab.Navigator>
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


const SalesStack = createStackNavigator<SalesParamList>();

const SalesNavigator = () => (
    <SalesStack.Navigator
        screenOptions={{headerShown: false}}
    >
        <SalesStack.Screen
            name="SalesScreen"
            component={SalesScreen}
            options={{headerTitle: 'Sales'}}
        />
    </SalesStack.Navigator>
);

const ProfileStack = createStackNavigator<ProfileParamList>();

const ProfileNavigator = () => (
    <ProfileStack.Navigator
        screenOptions={{headerShown: false}}
    >
        <ProfileStack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{headerTitle: "Profile"}}
        />
    </ProfileStack.Navigator>
);
