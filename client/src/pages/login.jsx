import { Form, Row, Col, Stack, Alert, Button } from "react-bootstrap";

const Login = () => {
    return (
    <>
    <Form>
        <Row style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%"
        }}>
            <Col xs={6}>
                <Stack gap={3}>
                    <h2>Log In</h2>

                    <Form.Control type="email" placeholder="Email"/>
                    <Form.Control type="password" placeholder="Password"/>
                    <Button variant="primary" type="submit">Login</Button>
                    <Alert variant="info">Have not created an account yet? <Alert.Link href="/login">Register Now!</Alert.Link></Alert>
                </Stack>
            </Col>
        </Row>
    </Form>
    </>
    );
}
 
export default Login;