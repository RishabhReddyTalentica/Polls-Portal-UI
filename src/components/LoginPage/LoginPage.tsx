import { Component } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogin } from "../../services/api";
import AuthContext from "../../store/user-context";
import Loader from "../Loader/Loader";
import LinkComponent from "../LinkComponent/LinkComponent";
import { validation } from "../SignUpPage/SignUpPage";
import FormGroupComponent from "../FormGroupComponent/FormGroupComponent";
import React from "react";


type LoginPageProps = {}
type LoginPageState = {
    showLoader: boolean
}
class LoginPage extends Component<LoginPageProps, LoginPageState> {
    emailInputRef = React.createRef<any>();
    passwordInputRef = React.createRef<any>();
    static contextType: React.Context<any> = AuthContext;
    context!: React.ContextType<typeof AuthContext>;

    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            showLoader: false
        }
    }

    formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        this.setState({ showLoader: true });
        const enteredEmail = this.emailInputRef.current.getInput();
        const enteredPassword = this.passwordInputRef.current.getInput();

        if (validation(enteredEmail, "email", "email id") === false ||
            validation(enteredPassword, "password", "password") === false
        ) {
            this.setState({ showLoader: false });
            return;
        }

        let loginObject: {} = {
            email: enteredEmail,
            password: enteredPassword
        }

        userLogin(loginObject).then((data) => {
            this.setState({ showLoader: false });
            if (data === "not found") {
                toast.error("Incorrect email id or password");
            }
            else {
                this.context.login(data.userDataObject);
                toast.success("User Loggedin successfully");
                data.userDataObject.role === "Admin" ?
                    <Navigate to="/admindashboard" replace={true} />
                    :
                    <Navigate to="/userdashboard" replace={true} />
            }
        })
    };

    render() {
        return (
            <Container>
                {this.state.showLoader && <Loader />}
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
                                <Form onSubmit={this.formSubmitHandler}>
                                    <FormGroupComponent type="email" id="email" placeholder="Enter email" label="Email address" ref={this.emailInputRef} />
                                    <FormGroupComponent type="password" id="password" placeholder="Enter password" label="Password" ref={this.passwordInputRef} />
                                    <Row className="mb-3 align-items-center">
                                        <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} className="text-start">
                                            <LinkComponent to={"/signup"} className="btn btn-outline-primary" state={null}>
                                                SignUp
                                            </LinkComponent>
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

}


export default LoginPage;
