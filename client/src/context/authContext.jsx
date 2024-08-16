import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    // Add the following prop type validation for the children prop
    AuthContextProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    // Add the following state variables
    const [ user, setUser ] = useState(null);
    const [ registerInfo, setRegisterInfo ] = useState({
        name: "",
        email: "",
        password: "",
    });

    console.log(registerInfo);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    return (
        <AuthContext.Provider value={{  user, registerInfo, updateRegisterInfo  }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };