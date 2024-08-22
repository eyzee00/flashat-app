import { createContext, useState, useEffect } from 'react';
import { getRequest, baseUrl } from '../utils/services';
import PropTypes from 'prop-types';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    // Add 'children' to props validation
    ChatContextProvider.propTypes = {
        children: PropTypes.node.isRequired,
        user: PropTypes.object.isRequired,
    };
    const [ userChats, setUserChats ] = useState(null);
    const [ isUserChatsLoading, setIsUserChatsLoading ] = useState(false);
    const [ userChatsError, setUserChatsError ] = useState(null);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
                if (response.error) {
                    return setUserChatsError(response);
                };
                setIsUserChatsLoading(false);
                setUserChats(response);
            };
        };
        getUserChats();
    }, [user]);

    return (
        <ChatContext.Provider value={{ userChats, isUserChatsLoading, userChatsError }}>
            { children }
        </ChatContext.Provider>
    );
};