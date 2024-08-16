import { Form, Row, Col, Stack, Alert, Button } from "react-bootstrap";

const Register = () => {
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
                    <h2>Register Now And Start Chatting!</h2>

                    <Form.Control type="text" placeholder="Name"/>
                    <Form.Control type="email" placeholder="Email"/>
                    <Form.Control type="password" placeholder="Password"/>
                    <Button variant="primary" type="submit">Register</Button>
                    <Alert variant="info">Already have an account? <Alert.Link href="/login">Login Now!</Alert.Link></Alert>
                </Stack>
            </Col>
        </Row>
    </Form>
    </>
    );
}
 
export default Register;