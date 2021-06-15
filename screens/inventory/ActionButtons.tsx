import * as React from 'react';
import {FAB, Portal, Provider} from 'react-native-paper';

const ActionButtons = () => {

    return (
        <Provider>
            <Portal>
                <FAB
                    visible
                    icon="plus"
                    theme={{colors: {accent:"#1E352F"}}}
                    style={{
                        position: "absolute",
                        bottom: 9,
                        right:9
                    }}
                />
            </Portal>
        </Provider>
    );
};

export default ActionButtons;
