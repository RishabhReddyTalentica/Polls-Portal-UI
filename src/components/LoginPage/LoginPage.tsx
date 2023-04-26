import { useContext, useRef, useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogin } from "../../services/api";
import AuthContext from "../../store/user-context";
import Loader from "../Loader/Loader";


const LoginPage: React.FC = (props) => {

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setShowLoader(true);
        const enteredEmail = emailInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;

        if (enteredEmail.trim().length === 0) {
            toast.info("Please enter email id");
            setShowLoader(false);
            return;
        } else if (enteredEmail.includes("@talentica.com") === false) {
            toast.info("Please enter Talentica email id");
            setShowLoader(false);
            return;
        } else if (enteredPassword.trim().length === 0) {
            toast.info("Please enter password");
            setShowLoader(false);
            return;
        }

        let loginObject: {} = {
            email: enteredEmail,
            password: enteredPassword
        }

        userLogin(loginObject).then((data) => {
            setShowLoader(false);
            if (data === "not found") {
                toast.error("Incorrect email id or password");
            }
            else {
                authCtx.login(data.userDataObject);
                toast.success("User Loggedin successfully");
                navigate("/adminDashboard", { replace: true });
            }
        })
    };
    return (
        <Container>
            {showLoader && <Loader />}
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h4 className={`text-center`}>
                            <strong>User Login</strong>
                        </h4>
                    </Card.Title>
                    <Row className="justify-content-center">
                        <Col md={2}></Col>
                        <Col md={8}>
                            <Form onSubmit={formSubmitHandler}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="email">
                                        <strong>
                                            <span style={{ color: "red" }}>
                                                *
                                            </span> Email address
                                        </strong>
                                    </Form.Label>
                                    <Form.Control type="email" id="email" placeholder="Enter email" ref={emailInputRef} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="password">
                                        <strong>
                                            <span style={{ color: "red" }}>
                                                *
                                            </span> Password
                                        </strong>
                                    </Form.Label>
                                    <Form.Control type="password" id="password" placeholder="Enter password" ref={passwordInputRef} />
                                </Form.Group>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} className="text-start">
                                        <Link to={"/signup"} className="btn btn-outline-primary" replace={true}>
                                            SignUp
                                        </Link>
                                    </Col>
                                    <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}></Col>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} className="text-end">
                                        <Button variant="outline-primary" type="submit">
                                            Login
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>

                        </Col>
                        <Col md={2}></Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoginPage;
