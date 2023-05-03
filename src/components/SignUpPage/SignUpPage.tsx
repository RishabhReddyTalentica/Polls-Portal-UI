import { useRef, useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserData } from "../../models/UserData";
import { userSignUp } from "../../services/api";
import Loader from "../Loader/Loader";
import LinkComponent from "../LinkComponent/LinkComponent";
import FormGroupComponent from "../FormGroupComponent/FormGroupComponent";



export const validation = (value: string, type: string, inputName: string, pattern?: any) => {
    if (type === "email" || type === "password") {
        if (value.trim().length === 0) {
            toast.info(`Please enter ${inputName}`)
            return false;
        }
        else if (pattern && pattern.test(value) === false) {
            if (type === "password") {
                toast.info("Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
            }
            else {
                toast.info(`Please enter a valid ${inputName}`);
            }

            return false;
        }
        else if (type === "email" && value.includes("@talentica.com") === false) {
            toast.info(`Please enter talentica email id`);
            return false;
        }
    }
    else {
        if (type === "dropdown" && inputName === "role") {
            if (value === "" || value === "role") {
                toast.info(`Please select ${inputName}`);
                return false;
            }
        }
        else {
            if (value.trim().length === 0) {
                toast.info(`Please enter ${inputName}`)
                return false;
            }
        }

    }
    return true;
}

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

        if (validation(enteredEmail, "email", "email id", emailPattern) === false ||
            validation(enteredPassword, "password", "password", passwordPattern) === false ||
            validation(enteredFirstName, "text", "first name") === false ||
            validation(enteredLastName, "text", "last name") === false ||
            validation(enteredRole, "dropdown", "role") === false
        ) {
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
                                <FormGroupComponent type="email" id="email" placeholder="Enter email" label="Email address" ref={emailInputRef} />
                                <FormGroupComponent type="password" id="password" placeholder="Enter password" label="Password" ref={passwordInputRef} />
                                <FormGroupComponent type="text" id="firstName" placeholder="Enter first name" label="First Name" ref={firstNameInputRef} />
                                <FormGroupComponent type="text" id="lastName" placeholder="Enter last name" label="Last Name" ref={lastNameInputRef} />
                                <FormGroupComponent type="dropdown" id="role" placeholder="--- select role ---" label="Role" onChange={changeRoleHandler} />

                                <Row className="mb-3 align-items-center">
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} className="text-start">
                                        <LinkComponent to={"/"} className="btn btn-outline-primary" state={null}>
                                            Cancel
                                        </LinkComponent>
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
