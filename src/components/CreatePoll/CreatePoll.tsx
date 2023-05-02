import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Navbar } from "react-bootstrap";
import { Question } from "../../models/Question";
import { toast } from "react-toastify";
import { Poll } from "../../models/Poll";
import { createPoll, updatePoll } from "../../services/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useDispatch } from "react-redux";
import { fetchPollData } from "../../store/polls-actions";



const CreatePoll: React.FC = (props) => {
    const [pollTitle, setPollTitle] = useState<string>("");
    const [pollQuestions, setPollQuestions] = useState<Question[]>([{ label: "", options: ["", ""] }]);
    const [canEdit, setCanEdit] = useState<boolean>(true);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const location = useLocation();
    const onPollTitleChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPollTitle(event.target.value);
    };

    const onAddQuestionClickHandler = () => {
        setPollQuestions([...pollQuestions, { label: "", options: ["", ""] }]);
    }

    const onQuestionLabelChangeHandler = (index: number, event: any) => {
        const questions = [...pollQuestions];
        questions[index].label = event.target.value;
        setPollQuestions(questions);
    };

    const onAddNewOptionHandler = (index: number) => {
        const questions = [...pollQuestions];
        questions[index].options = [...questions[index].options, ""];
        setPollQuestions(questions);
    }

    const onChangeOptionHandler = (optionIndex: number, questionIndex: number, event: any) => {
        const questions = [...pollQuestions];
        questions[questionIndex].options[optionIndex] = event.target.value;
        setPollQuestions(questions);
    }

    const onRemoveOptionHandler = (optionIndex: number, questionIndex: number, event: any) => {
        const questions = [...pollQuestions];
        questions[questionIndex].options.splice(optionIndex, 1);
        setPollQuestions(questions);
    }

    const onPollSubmitHandler = async (event: any) => {
        event.preventDefault();
        setShowLoader(true);
        let error: boolean = false;
        if (pollTitle.trim().length === 0) {
            toast.info("Please enter poll name");
            setShowLoader(false);
            return;
        }
        else if (pollTitle.trim().length !== 0) {
            if (pollQuestions.length === 0) {
                toast.info("Poll must contain atleast one question");
                setShowLoader(false);
                return;
            }
            pollQuestions.forEach((question, index) => {
                if (question.label.trim().length === 0) {
                    toast.info(`Please enter question ${index + 1}`);
                    setShowLoader(false);
                    error = true;
                    return;
                }
                else {
                    question.options.forEach((option, i) => {
                        if (option.trim().length === 0) {
                            toast.info(`Please enter question ${index + 1}'s option ${i + 1}`);
                            setShowLoader(false);
                            error = true;
                            return;
                        }
                    })
                }

            });

        }
        if (error === false) {

            let pollSubmitObject: Poll = {
                title: pollTitle,
                questions: pollQuestions,
                status: "online"
            }
            createPoll(pollSubmitObject).then((data) => {
                setShowLoader(false);
                if (data === "error") {
                    toast.error("could not create poll error occured");
                }
                else {
                    toast.success("Poll created successfully");
                    dispatch(fetchPollData());
                    navigate("/adminDashboard", { replace: true });
                }
            });
        }

    }

    const onClosePollClickHandler = () => {
        setShowLoader(true);
        let pollSubmitObject: Poll = {
            title: pollTitle,
            questions: pollQuestions,
            status: "closed",
            id: location.state.pollData.id
        }
        updatePoll(pollSubmitObject).then((data) => {
            setShowLoader(false);
            if (data === "error") {
                toast.error("could not close poll error occured");
            }
            else {
                toast.success("Poll updated successfully");
                dispatch(fetchPollData());
                navigate("/adminDashboard", { replace: true });
            }
        })
    }

    useEffect(() => {
        if (location.state === null && location.pathname.includes("openpoll")) {
            navigate("/adminDashboard", { replace: true });
        }
        else {
            if (location.state && location.state.pollData && location.pathname.includes("openpoll")) {
                setPollTitle(location.state.pollData.title);
                setPollQuestions(location.state.pollData.questions);
                setCanEdit(false);
            }
        }
    }, [navigate, location]);

    return (
        <Container>
            {showLoader && <Loader />}
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
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="pollname">
                                        <strong><span style={{ color: "red" }}>*</span> Poll Name</strong>
                                    </Form.Label>
                                    <Form.Control type="text" id="pollname" placeholder="Enter poll name" value={pollTitle}
                                        onChange={onPollTitleChangeHandler} disabled={!canEdit} />
                                </Form.Group>

                                <Row className="mb-3 align-items-center">
                                    <Navbar sticky="top">
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="text-end">
                                            {canEdit ? <Button variant="primary" type="button" onClick={onAddQuestionClickHandler}>
                                                Add Question
                                            </Button>
                                                :
                                                <Button variant="primary" type="button" onClick={onClosePollClickHandler}>
                                                    Close Poll
                                                </Button>
                                            }
                                        </Col>
                                    </Navbar>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        {pollQuestions.map((question, index) => {
                                            return (
                                                <Row key={index}>
                                                    <Col xs={12} sm={12} md={9} lg={9} xl={9} xxl={9} >
                                                        <Form.Label>
                                                            <strong><span style={{ color: "red" }}>*</span> {`Q)${index + 1}`}</strong>
                                                        </Form.Label>

                                                        <Form.Control type="text" placeholder="Enter question" defaultValue={question.label}
                                                            onChange={(event) => { onQuestionLabelChangeHandler(index, event) }} disabled={!canEdit}
                                                        />
                                                    </Col>

                                                    <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} className="text-end" style={{ marginTop: "20px" }}>
                                                        {canEdit && <Button variant="outline-primary" type="button" onClick={(e) => { onAddNewOptionHandler(index) }}>
                                                            Add Option
                                                        </Button>}
                                                    </Col>
                                                    <Row>
                                                        {question.options.map((option, i) => {
                                                            return (
                                                                <Row key={index + i}>
                                                                    <Col xs={10} sm={10} md={6} lg={6} xl={6} xxl={6} style={{ marginTop: "10px" }}>
                                                                        <Form.Control type="text" placeholder={`Enter option ${i + 1}`} value={option} onChange={(e) => { onChangeOptionHandler(i, index, e) }}
                                                                            disabled={!canEdit} />
                                                                    </Col>
                                                                    {i !== 0 && i !== 1 && canEdit ? <Col xs={2} sm={2} md={6} lg={6} xl={6} xxl={6} style={{ marginTop: "10px" }}>
                                                                        <Button variant="outline-danger" type="button" onClick={(e) => { onRemoveOptionHandler(i, index, e) }}>
                                                                            X
                                                                        </Button>
                                                                    </Col> : ""}

                                                                </Row>
                                                            );
                                                        })}
                                                    </Row>

                                                    <Row style={{ marginTop: "20px" }}></Row>

                                                </Row>
                                            )

                                        })}
                                    </Col>

                                </Row>


                                <Row className="mb-3 align-items-center">
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="text-start">
                                        <Link to={"/adminDashboard"} className="btn btn-outline-primary" replace={true}>
                                            Cancel
                                        </Link>
                                    </Col>
                                    {/*<Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}></Col> */}
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="text-end">
                                        {canEdit && <Button variant="outline-primary" type="submit" onClick={onPollSubmitHandler}>
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

export default CreatePoll;
