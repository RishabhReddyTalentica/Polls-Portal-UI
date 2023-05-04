import { Component } from "react";
import { Container, Row, Col, Card, Form, Button, Navbar } from "react-bootstrap";
import { Question } from "../../models/Question";
import { toast } from "react-toastify";
import { Poll } from "../../models/Poll";
import { createPoll, updatePoll } from "../../services/api";
import { Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { connect } from "react-redux";
import { fetchPollData } from "../../store/polls-actions";
import LinkComponent from "../LinkComponent/LinkComponent";
import CreatePollQuestionComponent from "../CreatePollQuestionComponent/CreatePollQuestionComponent";
import { validation } from "../SignUpPage/SignUpPage";
import FormGroupComponentWithoutRef from "../FormGroupComponentWithoutRef/FormGroupComponentWithoutRef";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/store";

type CreatePollState = {
    pollTitle: string,
    pollQuestions: Question[],
    canEdit: boolean,
    showLoader: boolean
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, any>) => ({
    fetchPollData: () => {
        dispatch(fetchPollData());
    },
});
const mapStateToProps = (state: RootState) => ({
    storePolls: state.polls.polls
});
class CreatePoll extends Component<any, CreatePollState>{
    constructor(props: any) {
        super(props);
        this.state = {
            pollTitle: "",
            pollQuestions: [{ label: "", options: ["", ""] }],
            canEdit: true,
            showLoader: false
        }
    }
    onPollTitleChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        this.setState({ pollTitle: event.target.value });
    };

    onAddQuestionClickHandler = () => {
        this.setState((prevState) => { return { pollQuestions: [...prevState.pollQuestions, { label: "", options: ["", ""] }] } })
    }

    onQuestionLabelChangeHandler = (index: number, event: any) => {
        const questions = [...this.state.pollQuestions];
        questions[index].label = event.target.value;
        this.setState({ pollQuestions: questions });
    };

    onAddNewOptionHandler = (index: number) => {
        const questions = [...this.state.pollQuestions];
        questions[index].options = [...questions[index].options, ""];
        this.setState({ pollQuestions: questions });
    }
    onChangeOptionHandler = (optionIndex: number, questionIndex: number, event: any) => {
        const questions = [...this.state.pollQuestions];
        questions[questionIndex].options[optionIndex] = event.target.value;
        this.setState({ pollQuestions: questions });
    }

    onRemoveOptionHandler = (optionIndex: number, questionIndex: number, event: any) => {
        const questions = [...this.state.pollQuestions];
        questions[questionIndex].options.splice(optionIndex, 1);
        this.setState({ pollQuestions: questions });
    }
    onPollSubmitHandler = async (event: any) => {
        event.preventDefault();
        this.setState({ showLoader: true });
        let error: boolean = false;

        if (validation(this.state.pollTitle, "text", "poll name") === false) {
            this.setState({ showLoader: false });
            return;
        }
        else {
            this.state.pollQuestions.forEach((question, index) => {
                if (validation(question.label, "text", `question ${index + 1}`) === false) {
                    this.setState({ showLoader: false });
                    error = true;
                    return;
                }
                else {
                    question.options.forEach((option, i) => {
                        if (validation(option, "text", `question ${index + 1}'s option ${i + 1}`) === false) {
                            this.setState({ showLoader: false });
                            error = true;
                            return;
                        }
                    })

                }
            })
        }

        if (error === false) {

            let pollSubmitObject: Poll = {
                title: this.state.pollTitle,
                questions: this.state.pollQuestions,
                status: "online"
            }
            createPoll(pollSubmitObject).then((data) => {
                this.setState({ showLoader: false });
                if (data === "error") {
                    toast.error("could not create poll error occured");
                }
                else {
                    toast.success("Poll created successfully");
                    this.props.fetchPollData();
                    <Navigate to={"/admindashboard"} replace={true} />
                }
            });
        }

    }
    onClosePollClickHandler = () => {
        this.setState({ showLoader: true });
        let pollSubmitObject: Poll = {
            title: this.state.pollTitle,
            questions: this.state.pollQuestions,
            status: "closed",
            id: window.history.state.usr.pollData.id
        }
        updatePoll(pollSubmitObject).then((data) => {
            this.setState({ showLoader: false });
            if (data === "error") {
                toast.error("could not close poll error occured");
            }
            else {
                toast.success("Poll updated successfully");
                this.props.fetchPollData();
                <Navigate to={"/admindashboard"} replace={true} />
            }
        })
    }
    componentDidMount(): void {
        if (window.history.state.usr === undefined && window.location.pathname.includes("openpoll")) {
            <Navigate to={"/admindashboard"} replace={true} />
        }
        else {
            if (window.history.state.usr && window.history.state.usr.pollData && window.location.pathname.includes("openpoll")) {
                this.setState({ pollTitle: window.history.state.usr.pollData.title, pollQuestions: window.history.state.usr.pollData.questions, canEdit: false });
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
                                <strong>Create New Poll</strong>
                            </h4>
                        </Card.Title>
                        <Row className="justify-content-center">
                            <Col md={2}></Col>
                            <Col md={8}>
                                <Form>
                                    <FormGroupComponentWithoutRef type="text" id="pollname" label="Poll Name" placeholder="Enter poll name"
                                        value={this.state.pollTitle} onChange={this.onPollTitleChangeHandler} disabled={!this.state.canEdit} />

                                    <Row className="mb-3 align-items-center">
                                        <Navbar sticky="top">
                                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="text-end">
                                                {this.state.canEdit ? <Button variant="primary" type="button" onClick={this.onAddQuestionClickHandler}>
                                                    Add Question
                                                </Button>
                                                    :
                                                    <Button variant="primary" type="button" onClick={this.onClosePollClickHandler}>
                                                        Close Poll
                                                    </Button>
                                                }
                                            </Col>
                                        </Navbar>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            {this.state.pollQuestions.map((question, index) => {
                                                return (
                                                    <CreatePollQuestionComponent key={index} question={question} index={index} canEdit={this.state.canEdit} onQuestionLabelChange={this.onQuestionLabelChangeHandler} onAddNewOption={this.onAddNewOptionHandler} onChangeOptionLabel={this.onChangeOptionHandler} onRemoveOption={this.onRemoveOptionHandler} />
                                                )

                                            })}
                                        </Col>

                                    </Row>


                                    <Row className="mb-3 align-items-center">
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="text-start">
                                            <LinkComponent to={"/admindashboard"} className="btn btn-outline-primary" state={null}>
                                                Cancel
                                            </LinkComponent>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="text-end">
                                            {this.state.canEdit && <Button variant="outline-primary" type="submit" onClick={this.onPollSubmitHandler}>
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

// const CreatePoll: React.FC = (props) => {
//     const [pollTitle, setPollTitle] = useState<string>("");
//     const [pollQuestions, setPollQuestions] = useState<Question[]>([{ label: "", options: ["", ""] }]);
//     const [canEdit, setCanEdit] = useState<boolean>(true);
//     const [showLoader, setShowLoader] = useState<boolean>(false);
//     const navigate = useNavigate();
//     const dispatch = useDispatch<any>();
//     const location = useLocation();
//     const onPollTitleChangeHandler = (
//         event: React.ChangeEvent<HTMLInputElement>
//     ) => {
//         setPollTitle(event.target.value);
//     };

//     const onAddQuestionClickHandler = () => {
//         setPollQuestions([...pollQuestions, { label: "", options: ["", ""] }]);
//     }

//     const onQuestionLabelChangeHandler = (index: number, event: any) => {
//         const questions = [...pollQuestions];
//         questions[index].label = event.target.value;
//         setPollQuestions(questions);
//     };

//     const onAddNewOptionHandler = (index: number) => {
//         const questions = [...pollQuestions];
//         questions[index].options = [...questions[index].options, ""];
//         setPollQuestions(questions);
//     }

//     const onChangeOptionHandler = (optionIndex: number, questionIndex: number, event: any) => {
//         const questions = [...pollQuestions];
//         questions[questionIndex].options[optionIndex] = event.target.value;
//         setPollQuestions(questions);
//     }

//     const onRemoveOptionHandler = (optionIndex: number, questionIndex: number, event: any) => {
//         const questions = [...pollQuestions];
//         questions[questionIndex].options.splice(optionIndex, 1);
//         setPollQuestions(questions);
//     }

//     const onPollSubmitHandler = async (event: any) => {
//         event.preventDefault();
//         setShowLoader(true);
//         let error: boolean = false;

//         if (validation(pollTitle, "text", "poll name") === false) {
//             setShowLoader(false);
//             return;
//         }
//         else {
//             pollQuestions.forEach((question, index) => {
//                 if (validation(question.label, "text", `question ${index + 1}`) === false) {
//                     setShowLoader(false);
//                     error = true;
//                     return;
//                 }
//                 else {
//                     question.options.forEach((option, i) => {
//                         if (validation(option, "text", `question ${index + 1}'s option ${i + 1}`) === false) {
//                             setShowLoader(false);
//                             error = true;
//                             return;
//                         }
//                     })

//                 }
//             })
//         }

//         if (error === false) {

//             let pollSubmitObject: Poll = {
//                 title: pollTitle,
//                 questions: pollQuestions,
//                 status: "online"
//             }
//             createPoll(pollSubmitObject).then((data) => {
//                 setShowLoader(false);
//                 if (data === "error") {
//                     toast.error("could not create poll error occured");
//                 }
//                 else {
//                     toast.success("Poll created successfully");
//                     dispatch(fetchPollData());
//                     navigate("/admindashboard", { replace: true });
//                 }
//             });
//         }

//     }

//     const onClosePollClickHandler = () => {
//         setShowLoader(true);
//         let pollSubmitObject: Poll = {
//             title: pollTitle,
//             questions: pollQuestions,
//             status: "closed",
//             id: location.state.pollData.id
//         }
//         updatePoll(pollSubmitObject).then((data) => {
//             setShowLoader(false);
//             if (data === "error") {
//                 toast.error("could not close poll error occured");
//             }
//             else {
//                 toast.success("Poll updated successfully");
//                 dispatch(fetchPollData());
//                 navigate("/admindashboard", { replace: true });
//             }
//         })
//     }

//     useEffect(() => {
//         if (location.state === null && location.pathname.includes("openpoll")) {
//             navigate("/admindashboard", { replace: true });
//         }
//         else {
//             if (location.state && location.state.pollData && location.pathname.includes("openpoll")) {
//                 setPollTitle(location.state.pollData.title);
//                 setPollQuestions(location.state.pollData.questions);
//                 setCanEdit(false);
//             }
//         }
//     }, [navigate, location]);

//     return (
//         <Container>
//             {showLoader && <Loader />}
//             <Card>
//                 <Card.Body>
//                     <Card.Title>
//                         <h4 className={`text-center`}>
//                             <strong>Create New Poll</strong>
//                         </h4>
//                     </Card.Title>
//                     <Row className="justify-content-center">
//                         <Col md={2}></Col>
//                         <Col md={8}>
//                             <Form>
//                                 <FormGroupComponentWithoutRef type="text" id="pollname" label="Poll Name" placeholder="Enter poll name"
//                                     value={pollTitle} onChange={onPollTitleChangeHandler} disabled={!canEdit} />

//                                 <Row className="mb-3 align-items-center">
//                                     <Navbar sticky="top">
//                                         <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="text-end">
//                                             {canEdit ? <Button variant="primary" type="button" onClick={onAddQuestionClickHandler}>
//                                                 Add Question
//                                             </Button>
//                                                 :
//                                                 <Button variant="primary" type="button" onClick={onClosePollClickHandler}>
//                                                     Close Poll
//                                                 </Button>
//                                             }
//                                         </Col>
//                                     </Navbar>
//                                     <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//                                         {pollQuestions.map((question, index) => {
//                                             return (
//                                                 <CreatePollQuestionComponent key={index} question={question} index={index} canEdit={canEdit} onQuestionLabelChange={onQuestionLabelChangeHandler} onAddNewOption={onAddNewOptionHandler} onChangeOptionLabel={onChangeOptionHandler} onRemoveOption={onRemoveOptionHandler} />
//                                             )

//                                         })}
//                                     </Col>

//                                 </Row>


//                                 <Row className="mb-3 align-items-center">
//                                     <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="text-start">
//                                         <LinkComponent to={"/admindashboard"} className="btn btn-outline-primary" state={null}>
//                                             Cancel
//                                         </LinkComponent>
//                                     </Col>
//                                     <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="text-end">
//                                         {canEdit && <Button variant="outline-primary" type="submit" onClick={onPollSubmitHandler}>
//                                             Submit Poll
//                                         </Button>}
//                                     </Col>
//                                 </Row>
//                             </Form>
//                         </Col>
//                         <Col md={2}>
//                         </Col>

//                     </Row>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );

// }

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
