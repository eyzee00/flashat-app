import { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import { ChatContext } from "../context/chatContext";
import { AuthContext } from "../context/authContext";
import  UserChat from "../components/chat/userChat";
import PotentialChats from "../components/chat/potentialChat";

const Chat = () => {
    const user = useContext(AuthContext);
    const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);
    return (
    <>
        <Container>
            {(
                <Stack direction="horizontal" className="align-items-start" gap={6}>
                    <PotentialChats/>
                    <Stack direction="vertical" className="messages-box flex-grow-0 pe-3" gap={3}>
                        {isUserChatsLoading && <p>Loading chats...</p>}
                        {userChats?.map(( chat, index ) => (
                            <div key={index} onClick={() => { updateCurrentChat(chat) }}>
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