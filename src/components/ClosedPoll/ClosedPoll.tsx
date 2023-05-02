import { useEffect, useState } from "react";
import { Question } from "../../models/Question";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchClosedPolls } from "../../services/api";
import Loader from "../Loader/Loader";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import ChartComponent from "../ChartComponent/ChartComponent";




const ClosedPoll: React.FC = (props) => {
    const [pollTitle, setPollTitle] = useState<string>("");
    const [pollQuestions, setPollQuestions] = useState<Question[]>([{ label: "", options: ["", ""] }]);
    const [transformedData, setTransformedData] = useState<any[]>([]);
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        if (location.state === null && location.pathname.includes("closedpoll")) {
            navigate("/adminDashboard", { replace: true });
        }
        else {
            let sampleData: any[] = [];
            if (location.state && location.state.pollData && location.pathname.includes("closedpoll")) {
                location.state.pollData.questions.forEach((question: Question, index: number) => {
                    sampleData.push({ "key": question.label, "value": [] });
                    question.options.forEach((option: string) => {
                        sampleData[index]["value"].push({ "label": option, count: 0 });
                    });
                })
                setPollTitle(location.state.pollData.title);
                setPollQuestions(location.state.pollData.questions);
                fetchClosedPolls(location.state.pollData.id).then((userSubmittedOptions) => {
                    if (userSubmittedOptions !== "error" && userSubmittedOptions.length !== 0) {
                        userSubmittedOptions.forEach((value) => {
                            value.selectedOptions.forEach((selectedOption: any, index: number) => {
                                sampleData[index]["value"][selectedOption].count++;
                            });
                        });
                        setTransformedData(sampleData);
                    }
                    setShowLoader(false);

                })

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
                    <Row className="justify-content-center" style={{ marginTop: "20px" }}>
                        <Col md={2}></Col>
                        <Col md={8}>
                            <Form>
                                <Row className="mb-3 align-items-center">

                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        {pollQuestions.map((question, index) => {
                                            return (
                                                <Row key={index}>
                                                    <Col xs={12} sm={12} md={9} lg={9} xl={9} xxl={9} >
                                                        <Form.Label>
                                                            <strong>{`${index + 1}) ${question.label}`}</strong>
                                                        </Form.Label>
                                                    </Col>
                                                    <Row>
                                                        {transformedData.length === 0 ?
                                                            <Col xs={12} sm={12} md={9} lg={9} xl={9} xxl={9} >
                                                                <Form.Label className="text-center" style={{ color: "red" }}>
                                                                    data not available
                                                                </Form.Label>
                                                            </Col>
                                                            :
                                                            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} style={{ marginTop: "10px" }}>
                                                                <ChartComponent chartData={transformedData[index]["value"]} />
                                                            </Col>
                                                        }

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
                                            Go Back
                                        </Link>
                                    </Col>
                                    {/*<Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}></Col> */}
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="text-end">

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
    )
}

export default ClosedPoll;
