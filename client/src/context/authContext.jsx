import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    // Add the following prop type validation
    AuthContextProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    // Add the following state
    const [ user, setUser ] = useState(null);
    const [ registerInfo, setRegisterInfo ] = useState(null);
    return (
        <AuthContext.Provider value={{  user  }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };