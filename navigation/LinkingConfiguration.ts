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
                            SettingsScreen: 'settings',
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
            Setup: {
                screens: {
                    Setup: "Setup"
                }
            },
            Scanner: {
                screens: {
                    Scanner: "Scanner"
                }
            },
            NotFound: '*',
        },
    },
};
