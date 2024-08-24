import { useContext, useState } from "react";
import { Stack } from "react-bootstrap";
import { ChatContext } from "../../context/chatContext";
import { AuthContext } from "../../context/authContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipient(currentChat, user);
    const { textMessage, setTextMessage } = useState("");

    if (!recipientUser) {
        return (
            <div>
                <p style={{ textAlign: "center", width: "100%" }}>
                    Select a chat to start messaging</p>
            </div>
        );
    }

    if (isMessagesLoading) {
        return (
            <div>
            <p style={{ textAlign: "center", width: "100%" }}>
                    Chat is loading...</p>
            </div>
        );
    }
    return ( <Stack gap={4} className="chat-box">
        <div className="chat-header">
            <strong>{recipientUser.name}</strong>
        </div>
        <Stack gap={3} className="messages" >
            {
                messages?.map((message, index) => {
                    return (
                    <Stack key={index} className={`${message?.senderId === user?._id ? 
                        "message self align-self-end flex-grow-0" : "message align-self-start flex-grow-0" }`}>
                        <span>{message.text}</span>
                        <span className="message-footer">{moment(message.createdAt).calendar()}</span>
                    </Stack>);
                })
            }
        </Stack>
        <Stack direction="horizontal" gap={2}>
            <InputEmoji/>
        </Stack>
    </Stack>);
}
 
export default ChatBox;