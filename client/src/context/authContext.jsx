import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { baseUrl, registerRequest } from "../utils/services";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    // Add the following prop type validation for the children prop
    AuthContextProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    // Add the following state variables
    const [ user, setUser ] = useState(null);
    const [ registerError, setRegisterError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ registerInfo, setRegisterInfo ] = useState({
        name: "",
        email: "",
        password: "",
    });

    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setRegisterError(null);

        const response = await registerRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
        if (response.error) {
            setIsLoading(false);
            return setRegisterError(response);
        }
        setIsLoading(false);

        localStorage.setItem("user", JSON.stringify(response));
        setUser(response);
    }, [registerInfo]);

    // Add the following function
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    return (
        <AuthContext.Provider value={{  user, registerInfo, updateRegisterInfo, registerUser, registerError, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };