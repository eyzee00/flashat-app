/**
 * Description: Chat context to manage user chats and potential chats
 */

// Import necessary modules
import { createContext, useState, useEffect, useCallback } from 'react';
import { getRequest, baseUrl, postRequest } from '../utils/services';
import PropTypes from 'prop-types';

// Create context
export const ChatContext = createContext();

// Create context provider
export const ChatContextProvider = ({ children, user }) => {
    // Add 'children' to props validation
    ChatContextProvider.propTypes = {
        children: PropTypes.node.isRequired,
        user: PropTypes.object.isRequired,
    };

    // Initialize state variables
    const [ userChats, setUserChats ] = useState(null);
    const [ isUserChatsLoading, setIsUserChatsLoading ] = useState(false);
    const [ userChatsError, setUserChatsError ] = useState(null);

    const [ potentialChats, setPotentialChats ] = useState([]);

    const [ currentChat, setCurrentChat ] = useState(null);

    const [ messages, setMessages ] = useState([]);
    const [ isMessagesLoading, setIsMessagesLoading ] = useState(false);
    const [ messagesError, setMessagesError ] = useState(null);

    // Fetch potential chats
    useEffect(() => {
        const getPotentialChats = async () => {
            // Fetch all users
            const response = await getRequest(`${baseUrl}/users`);

            // Check if fetching users was successful
            if (response.error) {
                return console.log("Fetching Users Was Unsuccessful");
            }

            // Filter out users that are already in chats
            const filteredUsers = response.filter((usr) => {
                let isPotentialChat = true;

                // Check if user is the same as the current user
                if (usr._id === user?._id) {
                    return false;
                }

                // Check if user is already in a chat
                if (userChats) {
                    isPotentialChat = !userChats?.some((chat) => {
                        return chat.members[0] === usr._id || chat.members[1] === usr._id;
                    });
                }

                return isPotentialChat;
            });

            // Set potential chats to state
            setPotentialChats(filteredUsers);
        };
        getPotentialChats();
    }, [userChats, user]);


    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    // Fetch messages
    useEffect(() => {
        const getMessages = async () => {
            // Check if there is a current chat
            if (currentChat) {
                setIsMessagesLoading(true);
                setMessagesError(null);

                // Fetch messages for current chat
                const response = await getRequest(`${baseUrl}/messages/${currentChat._id}`);

                // Check if fetching messages was successful
                if (response.error) {
                    return setMessagesError(response);
                }

                // Set messages to state
                setIsMessagesLoading(false);
                setMessages(response);
            }
        };
        getMessages();
    }, [currentChat]);

    const createChat = useCallback(async (firstUser, secondUser) => {

    
        // Check if users are the same
        if (firstUser === secondUser) {
            return console.log("Cannot Create Chat With Yourself");
        }

        // Check if chat already exists

        if (userChats) {
            const chatExists = userChats.some((chat) => {
                return chat.members[0] === firstUser && chat.members[1] === secondUser;
            });

            if (chatExists) {
                return console.log("Chat Already Exists");
            }
        }
        // Create chat between two users
        const response = await postRequest(`${baseUrl}/chats/`, JSON.stringify({ firstUser, secondUser }));

        // Check if creating chat was successful
        if (response.error) {
            return console.log("Creating Chat Was Unsuccessful");
        }

        // Add chat to user chats
        setUserChats((prev) => { return [...prev, response] });
    }, []);
    // Fetch user chats
    useEffect(() => {
        const getUserChats = async () => {

            // Check if user is logged in
            if (user?._id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);

                // Fetch user chats
                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

                // Check if fetching user chats was successful
                if (response.error) {
                    return setUserChatsError(response);
                };

                // Set user chats to state
                setIsUserChatsLoading(false);
                setUserChats(response);
            };
        };
        getUserChats();
    }, [user]);

    // Return provider with state variables and functions to be used by children
    return (
        <ChatContext.Provider value={{ userChats, isUserChatsLoading, userChatsError,
          potentialChats, createChat, updateCurrentChat }}>
            { children }
        </ChatContext.Provider>
    );
};