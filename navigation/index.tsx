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
import Setup from "../screens/setup";
import jwt_decode from "jwt-decode";
import Scanner from "../screens/shop/widgets/Scanner";
import useScans from "../hooks/shops/useScans";


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

    const scannerApi = useScans();

    const [state, setState] = React.useState({
        isLoggedIn: false,
        user: {
            shops: 0
        },
        isSetUp: false,
        token: ""
    });

    React.useEffect(() => {
        const existingToken = async () => {
            try {
                const token = await AsyncStorage.getItem('@access_token');
                const isSetUp = await AsyncStorage.getItem("@is_set_up")
                if (token != null) {
                    const user: any = jwt_decode(token);
                    setState(
                        prevState => ({
                            ...prevState,
                            isLoggedIn: true,
                            token: token,
                            user: user,
                        }));
                    if (user.shops != null || isSetUp != null) {
                        await handleSetUp();
                    }
                }
            } catch (e) {
                e.toString();
            } finally {
            }
        }
        existingToken();
    }, []);


    const handleLoggedIn = async (token: string) => {
        try {
            await AsyncStorage.setItem('@access_token', token);
            const user: any = jwt_decode(token);
            setState(prevState => ({
                ...prevState,
                user: user,
                isLoggedIn: true,
                token: token,
            }));
            if (user.shops != null) {
                await handleSetUp();
            }
        } catch (e) {
            e.toString();
        }
    }

    const handleSetUp = async () => {
        setState(prevState => ({...prevState, isSetUp: true}));
        await AsyncStorage.setItem("@is_set_up", JSON.stringify(true))
    }


    return (
        <AuthContext.Provider
            value={{
                context: state,
                handleLoggedIn: handleLoggedIn,
                handleSetUp: handleSetUp,
                scannerApi: scannerApi
            }}
        >
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {state.isLoggedIn ?
                    <>
                        {state.isSetUp ?
                            <>
                                <Stack.Screen name="Root" component={BottomTabNavigator}/>
                                <Stack.Screen name="Scanner" component={Scanner}/>
                            </>
                            :
                            <Stack.Screen name="Setup" component={Setup}/>
                        }
                    </>

                    :
                    <Stack.Screen name="Auth" component={Auth}/>
                }
                <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            </Stack.Navigator>
        </AuthContext.Provider>
    );
}
