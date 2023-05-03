import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Question } from "../../models/Question";
import { toast } from "react-toastify";
import AuthContext from "../../store/user-context";
import { userPollSubmitted } from "../../services/api";
import Loader from "../Loader/Loader";
import LinkComponent from "../LinkComponent/LinkComponent";
import UserPollQuestionComponent from "../UserPollQuestionComponent/UserPollQuestionComponent";


const UserPollForm: React.FC = (props) => {
    const [pollTitle, setPollTitle] = useState<string>("");
    const [pollQuestions, setPollQuestions] = useState<Question[]>([{ label: "", options: ["", ""] }]);
    const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
    const [canEdit, setCanEdit] = useState<boolean>(true);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const authCtx = useContext(AuthContext);

    const onChangeOptionHandler = (optionIndex: number, questionIndex: number, event: any) => {
        const selected = [...selectedOptions];
        selected[questionIndex] = optionIndex;
        setSelectedOptions(selected);
    }

    const onCheckSelected = (optionIndex: number, questionIndex: number) => {

        if (location.state.filledData[0].selectedOptions[questionIndex] === optionIndex) {
            return true;
        }
        return false;
    }

    const onFormSubmitHandler = (event: any) => {
        event.preventDefault();
        setShowLoader(true);
        let value = selectedOptions.findIndex((option: any) => option === undefined);
        if (value !== -1) {
            setShowLoader(false);
            toast.info("please answer all questions");
            return;
        }
        else {
            let submitObject: any = {
                poll: location.state.pollData.id,
                user: authCtx.userData?.id,
                selectedOptions
            }
            userPollSubmitted(submitObject).then((data) => {
                setShowLoader(false);
                if (data === "error") {
                    toast.error("Error occured unable to submit poll");
                }
                else {
                    toast.success("Poll successfully submitted");
                    navigate("/userdashboard", { replace: true })
                }

            })
        }


    }

    useEffect(() => {
        if (location.state === null && location.pathname.includes("userpollform")) {
            navigate("/userdashboard", { replace: true });
        }
        else {
            if (location.state && location.state.pollData && location.pathname.includes("userpollform") && location.state.mode === "NEW") {
                let optionsSelected: any[] = [];
                location.state.pollData.questions.forEach(() => {
                    optionsSelected.push(undefined);
                })
                setPollTitle(location.state.pollData.title);
                setPollQuestions(location.state.pollData.questions);
                setCanEdit(true);
                setSelectedOptions(optionsSelected);
            }
            else if (location.state && location.state.pollData && location.pathname.includes("userpollform") && location.state.mode === "VIEW") {
                let optionsSelected: any[] = [];
                location.state.pollData.questions.forEach(() => {
                    optionsSelected.push(undefined);
                })
                setPollTitle(location.state.pollData.title);
                setPollQuestions(location.state.pollData.questions);
                setCanEdit(false);
                setSelectedOptions(optionsSelected);
            }
        }
    }, [location, navigate]);
    return (
        <Container>
            {showLoader && <Loader />}
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h4 className={`text-center`}>
                            <strong>{pollTitle}</strong>
                        </h4>
                    </Card.Title>
                    <Row className="justify-content-center">
                        <Col md={2}></Col>
                        <Col md={8}>
                            <Form onSubmit={onFormSubmitHandler}>
                                <Row className="mb-3 align-items-center">

                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        {pollQuestions.map((question, index) => {
                                            return (
                                                <UserPollQuestionComponent key={index} index={index} question={question} canEdit={canEdit} onChangeOptionHandler={onChangeOptionHandler} onCheckSelected={onCheckSelected} />
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
                                        {canEdit && <Button variant="outline-primary" type="submit">
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

export default UserPollForm;
