import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    setIsLoggedIn: undefined
});

export default AuthContext;
