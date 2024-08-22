import { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import { ChatContext } from "../context/chatContext";
import { AuthContext } from "../context/authContext";
import  UserChat from "../components/chat/userChat";

const Chat = () => {
    const user = useContext(AuthContext);
    const { userChats, isUserChatsLoading, userChatsError } = useContext(ChatContext);
    return (
    <>
        <Container>
            {userChats?.length < 1 ? null : (
                <Stack direction="horizontal" className="align-items-start" gap={6}>
                    <Stack direction="vertical" className="messages-box flex-grow-0 pe-3" gap={3}>
                        {isUserChatsLoading && <p>Loading chats...</p>}
                        {userChats?.map(( chat, index ) => (
                            <div key={index}>
                                <UserChat chat={chat} user={user}/>
                            </div>
                        ))}
                    </Stack>
                    <p>ChatBox</p>
                </Stack>
            )}
        </Container>
    </> );
}
 
export default Chat;