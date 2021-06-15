import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import StorageContext from "./context/StorageInstance";

const theme = {
    ...DefaultTheme,
    roundness: 24,
    colors: {
        ...DefaultTheme.colors,
        notification: "#9893DA",
        primary: "#1E352F",
        text: "#1E352F"
    },
};

const App = () => {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <StorageContext.Provider value={{cos: ""}}>
                <PaperProvider theme={theme}>
                    <SafeAreaProvider>
                        <Navigation colorScheme={colorScheme}/>
                        <StatusBar/>
                    </SafeAreaProvider>
                </PaperProvider>
            </StorageContext.Provider>
        );
    }
}

export default App;
