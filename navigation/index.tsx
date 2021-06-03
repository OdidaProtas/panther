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

import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const [state, setState] = React.useState({
        isLoggedIn: false,
        user: {}
    });

    React.useEffect(() => {
        const existingToken = async () => {
            try {
                const token = await AsyncStorage.getItem('@access_token');
                if (token != null) {
                    // setState(prevState => ({...prevState, isLoggedIn: true}));
                }
            } catch (e) {
                console.log(e)
            }
        }
        existingToken();
    }, []);


    const handleLoggedIn = async (user: any) => {
        try {
            await AsyncStorage.setItem('@access_token', user.token);
            setState(prevState => ({...prevState, user: user, isLoggedIn: true}))
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <AuthContext.Provider
            value={{isLogged: state.isLoggedIn, handleLoggedIn: handleLoggedIn, user: state.user}}
        >
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {state.isLoggedIn ?
                    <Stack.Screen name="Root" component={BottomTabNavigator}/>

                    :
                    <Stack.Screen name="Auth" component={Auth}/>
                }
                <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            </Stack.Navigator>
        </AuthContext.Provider>
    );
}
