import { useContext } from "react";
import { ChatContext } from "../../context/chatContext";
import { Stack } from "react-bootstrap";
import { AuthContext } from "../../context/authContext";

const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat } = useContext(ChatContext);
    return <Stack direction="vertical" className="flex-grow-0 stack2" gap={2}>
        {potentialChats && potentialChats.map((usr, index) => (
            <div className="single-user" key={index} onClick={() => {createChat(usr._id, user._id)}}>
                {usr.name}
                <span className="user-online"></span>
            </div>
        ))}
    </Stack>;
}
 
export default PotentialChats;