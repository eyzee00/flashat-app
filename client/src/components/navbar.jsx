import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const NavBar = () => {
    const { user, logOutUser } = useContext(AuthContext);

    return ( 
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
        <Container>
            <h2>
                <Link to="/" className="link-light text-decoration-none">FlaXhat</Link>
            </h2>
            <span className="text-warning">{user ? <p>Logged in as {user.name}</p> : 
            <p>Instant Messaging At Your Fingertips!</p>}</span>
            <Nav>
                <Stack direction="horizontal" gap={3}>
                    {
                        !user && (<>
                        <Link to="/login" className="link-light text-decoration-none">Login</Link>
                        <Link to="/register" className="link-light text-decoration-none">Register</Link>
                        </>)
                    }
                    {
                        user && (<><Link to="/login" className="link-light text-decoration-none" onClick={logOutUser}>
                            Logout
                            </Link></>)
                    }
                </Stack>
            </Nav>
        </Container>
    </Navbar> 
    );
}
 
export default NavBar;