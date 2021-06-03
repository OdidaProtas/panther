/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    Home: {
                        screens: {
                            HomeScreen: 'home',
                        },
                    },
                    Profile: {
                        screens: {
                            ProfileScreen: 'profile',
                        },
                    },
                    Inventory: {
                        screens: {
                            InventoryScreen: 'inventory'
                        }
                    },
                    Orders: {
                        screens: {
                            OrdersScreen: 'orders'
                        }
                    },
                    Sales: {
                        screens: {
                            SalesScreen: 'sales'
                        }
                    }
                },
            },
            Auth: {
                screens: {
                    Auth: "Auth"
                }
            },
            NotFound: '*',
        },
    },
};
