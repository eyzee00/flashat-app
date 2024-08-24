import { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import { AuthContext } from "../../context/authContext";
import { ChatContext } from "../../context/chatContext";

const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat } = useContext(ChatContext);
    const [showTable, setShowTable] = useState(false);

    const toggleTable = () => {
        setShowTable(!showTable);
    };

    return (
        <div className="table-wrapper">
            <button className="potential-users-button" onClick={toggleTable}>Start Chat</button>
            {showTable && (
                <Table className="potential-users-table" hover bordered striped style={{ "--bs-table-bg": "none" }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {potentialChats && potentialChats?.map((u, index) => (
                            <tr
                                key={index}
                                onClick={() => {
                                    createChat(u._id, user._id);
                                }}
                            >
                                <td>{u?.name}</td>
                                <td>
                                    <span className="user-online1"></span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default PotentialChats;
/*import { ChatContext } from "../../context/chatContext";
import { Stack } from "react-bootstrap";
import { AuthContext } from "../../context/authContext";

const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat } = useContext(ChatContext);

    return <Stack direction="vertical" className="flex-grow-0 stack2" gap={2}>
        {potentialChats && potentialChats.map((usr, index) => {
            return (<div className="single-user" key={index} onClick={() => {createChat(usr._id, user._id)}}>
                        {usr?.name}
                        <span className="user-online"></span>
                    </div>);
        })}
    </Stack>;
}
 
export default PotentialChats;*/