import { useRef, useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserData } from "../../models/UserData";
import { userSignUp } from "../../services/api";
import Loader from "../Loader/Loader";


const SignUpPage: React.FC = (props) => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const firstNameInputRef = useRef<HTMLInputElement>(null);
    const lastNameInputRef = useRef<HTMLInputElement>(null);
    const [role, setRole] = useState<string>("");
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const navigate = useNavigate();

    const changeRoleHandler = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setRole(event.target.value);
    };

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setShowLoader(true);

        const enteredEmail = emailInputRef.current!.value.toLowerCase();
        const enteredPassword = passwordInputRef.current!.value;
        const enteredFirstName = firstNameInputRef.current!.value;
        const enteredLastName = lastNameInputRef.current!.value;
        const enteredRole = role;
        const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/;

        if (enteredEmail.trim().length === 0) {
            toast.info("Please enter email id");
            setShowLoader(false);
            return;
        } else if (emailPattern.test(enteredEmail) === false) {
            toast.info("Please enter a valid email id");
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
        } else if (passwordPattern.test(enteredPassword) === false) {
            toast.info("Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
            setShowLoader(false);
            return;
        } else if (enteredFirstName.trim().length === 0) {
            toast.info("Please enter first name");
            setShowLoader(false);
            return;
        } else if (enteredLastName.trim().length === 0) {
            toast.info("Please enter last name");
            setShowLoader(false);
            return;
        } else if (enteredRole === "" || enteredRole === "role") {
            toast.info("Please select role");
            setShowLoader(false);
            return;
        }
        let signUpObject: UserData = {
            email: enteredEmail,
            password: enteredPassword,
            firstName: enteredFirstName,
            lastName: enteredLastName,
            role: enteredRole,
        };

        userSignUp(signUpObject).then((data) => {
            setShowLoader(false);
            if (data === "exists") {
                toast.error("Email address already exists");
            }
            else if (data === "error") {
                toast.error("Could not create user");
            }
            else if (data === "success") {
                toast.success("User created successfully");
                navigate("/login", { replace: true });
            }
        });

    };
    return (
        <Container>
            {showLoader && <Loader />}
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h4 className={`text-center`}>
                            <strong>New User Sign Up</strong>
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
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="firstName">
                                        <strong>
                                            <span style={{ color: "red" }}>
                                                *
                                            </span> First Name
                                        </strong>
                                    </Form.Label>
                                    <Form.Control type="text" id="firstName" placeholder="Enter first name" ref={firstNameInputRef} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="lastName">
                                        <strong>
                                            <span style={{ color: "red" }}>
                                                *
                                            </span> Last Name
                                        </strong>
                                    </Form.Label>
                                    <Form.Control type="text" id="lastName" placeholder="Enter last name" ref={lastNameInputRef} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="role">
                                        <strong>
                                            <span style={{ color: "red" }}>
                                                *
                                            </span> Role
                                        </strong>
                                    </Form.Label>
                                    <Form.Select id="role" onChange={changeRoleHandler}>
                                        <option value="role">--- select role ---</option>
                                        <option value="Admin">Admin</option>
                                        <option value="User">User</option>
                                    </Form.Select>
                                </Form.Group>
                                <Row className="mb-3 align-items-center">
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} className="text-start">
                                        <Link to={"/"} className="btn btn-outline-primary" replace={true}>
                                            Cancel
                                        </Link>
                                    </Col>
                                    <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}></Col>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} className="text-end">
                                        <Button variant="outline-primary" type="submit">
                                            Submit
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

export default SignUpPage;
