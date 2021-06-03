import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList} from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import Auth from "../screens/auth";
import AuthContext from "../context/AuthContext";

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    return (
        <AuthContext.Provider
            value={{isLogged: isLoggedIn, setIsLoggedIn: setIsLoggedIn}}
        >
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {isLoggedIn ?
                    <Stack.Screen name="Root" component={BottomTabNavigator}/>

                    :
                    <Stack.Screen name="Auth" component={Auth}/>
                }
                <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            </Stack.Navigator>
        </AuthContext.Provider>
    );
}
