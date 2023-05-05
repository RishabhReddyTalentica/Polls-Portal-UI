import { Component } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Question } from "../../models/Question";
import { toast } from "react-toastify";
import AuthContext from "../../store/user-context";
import { userPollSubmitted } from "../../services/api";
import Loader from "../Loader/Loader";
import LinkComponent from "../LinkComponent/LinkComponent";
import UserPollQuestionComponent from "../UserPollQuestionComponent/UserPollQuestionComponent";
import withRouter, { withRouterProps } from "../../services/withRouter";

type UserPollFormProps = {};
type UserPollFormState = {
    pollTitle: string,
    pollQuestions: Question[],
    selectedOptions: any[],
    canEdit: boolean,
    showLoader: boolean
}
class UserPollForm extends Component<UserPollFormProps & withRouterProps, UserPollFormState>{
    static contextType: React.Context<any> = AuthContext;
    context!: React.ContextType<typeof AuthContext>;
    constructor(props: UserPollFormProps & withRouterProps) {
        super(props);
        this.state = {
            pollTitle: "",
            pollQuestions: [{ label: "", options: ["", ""] }],
            selectedOptions: [],
            canEdit: true,
            showLoader: false
        }
    }
    onChangeOptionHandler = (optionIndex: number, questionIndex: number, event: any) => {
        const selected = [...this.state.selectedOptions];
        selected[questionIndex] = optionIndex;
        this.setState({ selectedOptions: selected });
    }

    onCheckSelected = (optionIndex: number, questionIndex: number) => {
        if (window.history.state.usr.filledData[0].selectedOptions[questionIndex] === optionIndex) {
            return true;
        }
        return false;
    }

    onFormSubmitHandler = (event: any) => {
        event.preventDefault();
        this.setState({ showLoader: true });
        let value = this.state.selectedOptions.findIndex((option: any) => option === undefined);
        if (value !== -1) {
            this.setState({ showLoader: false });
            toast.info("please answer all questions");
            return;
        }
        else {
            let submitObject: any = {
                poll: window.history.state.usr.pollData.id,
                user: this.context.userData?.id,
                selectedOptions: this.state.selectedOptions
            }
            userPollSubmitted(submitObject).then((data) => {
                this.setState({ showLoader: false });
                if (data === "error") {
                    toast.error("Error occured unable to submit poll");
                }
                else {
                    toast.success("Poll successfully submitted");
                    this.props.navigate("/userdashboard", { replace: true });
                }

            })
        }
    }
    componentDidMount() {
        if (window.history.state.usr === undefined) {
            this.props.navigate("/user", { replace: true });
        }
        else {
            if (window.history.state.usr && window.history.state.usr.pollData && window.location.pathname.includes("userpollform") && window.history.state.usr.mode === "NEW") {
                let optionsSelected: any[] = [];
                window.history.state.usr.pollData.questions.forEach(() => {
                    optionsSelected.push(undefined);
                })
                this.setState({ pollTitle: window.history.state.usr.pollData.title, pollQuestions: window.history.state.usr.pollData.questions, canEdit: true, selectedOptions: optionsSelected })

            }
            else if (window.history.state.usr && window.history.state.usr.pollData && window.location.pathname.includes("userpollform") && window.history.state.usr.mode === "VIEW") {
                let optionsSelected: any[] = [];
                window.history.state.usr.pollData.questions.forEach(() => {
                    optionsSelected.push(undefined);
                })
                this.setState({ pollTitle: window.history.state.usr.pollData.title, pollQuestions: window.history.state.usr.pollData.questions, canEdit: false, selectedOptions: optionsSelected })
            }
        }
    }
    render() {
        return (
            <Container>
                {this.state.showLoader && <Loader />}
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <h4 className={`text-center`}>
                                <strong>{this.state.pollTitle}</strong>
                            </h4>
                        </Card.Title>
                        <Row className="justify-content-center">
                            <Col md={2}></Col>
                            <Col md={8}>
                                <Form onSubmit={this.onFormSubmitHandler}>
                                    <Row className="mb-3 align-items-center">

                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            {this.state.pollQuestions.map((question, index) => {
                                                return (
                                                    <UserPollQuestionComponent key={index} index={index} question={question} canEdit={this.state.canEdit} onChangeOptionHandler={this.onChangeOptionHandler} onCheckSelected={this.onCheckSelected} />
                                                )

                                            })}
                                        </Col>

                                    </Row>


                                    <Row className="mb-3 align-items-center">
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="text-start">
                                            <LinkComponent to={"/userdashboard"} className="btn btn-outline-primary" state={null}>
                                                Cancel
                                            </LinkComponent>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="text-end">
                                            {this.state.canEdit && <Button variant="outline-primary" type="submit">
                                                Submit Poll
                                            </Button>}
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                            <Col md={2}>
                            </Col>

                        </Row>
                    </Card.Body>
                </Card>
            </Container>

        );
    }

}


export default withRouter(UserPollForm);
