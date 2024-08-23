import { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import { AuthContext } from "../../context/authContext";
import { ChatContext } from "../../context/chatContext";

const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat } = useContext(ChatContext);
    const [showTable, setShowTable] = useState(false);

    console.log(potentialChats);
    const toggleTable = () => {
        setShowTable(!showTable);
    };

    return (
        <div>
            <button className="potential-users-button" onClick={toggleTable}>Toggle Table</button>
            {showTable && (
                <Table hover bordered striped>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {potentialChats?.map((usr, index) => (
                                <tr
                                    key={index}
                                    onClick={() => {
                                        createChat(usr._id, user._id);
                                    }}

                                >
                                    <td>{usr?.name}</td>
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