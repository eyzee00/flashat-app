import PropTypes from "prop-types";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import profile_avatar from "../../assets/profile_avatar.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/chatContext";

const UserChat = ({chat, user}) => {
    const { recipientUser } = useFetchRecipient(chat, user);
    const { onlineUsers } = useContext(ChatContext);
    return (
    <>
        <Stack direction="horizontal" gap={3}
        className="user-card align-items-center p-2 justify-content-between" role="button">
            <div className="d-flex">
                <div className="me-2">
                    <img src={profile_avatar} alt="profile_avatar" height={35}/>
                </div>
                <div className="text-content">
                    <div className="name">{recipientUser?.name}</div>
                    <div className="text">Last Message Sent</div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">08/22/2024</div>
                <div className="this-user-notifications">2</div>
                <span className={
                    onlineUsers.some((user) => user.userId === recipientUser?._id)
                        ? "user-online"
                        : "user-offline"
                    }></span>
            </div>
        </Stack>
    </> );
}

UserChat.propTypes = {
    chat: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};
 
export default UserChat;