import { Component } from "react";
import { Question } from "../../models/Question";
import { Navigate } from "react-router-dom";
import { fetchClosedPolls } from "../../services/api";
import Loader from "../Loader/Loader";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import ChartComponent from "../ChartComponent/ChartComponent";
import LinkComponent from "../LinkComponent/LinkComponent";

type ClosedPollState = {
    pollTitle: string,
    pollQuestions: Question[],
    transformedData: any[],
    showLoader: boolean
}
class ClosedPoll extends Component<any, ClosedPollState>{

    constructor(props: any) {
        super(props);
        this.state = {
            pollTitle: "",
            pollQuestions: [{ label: "", options: ["", ""] }],
            transformedData: [],
            showLoader: true
        }
    }
    componentDidMount() {
        if (window.history.state.usr === undefined && window.location.pathname.includes("closedpoll")) {
            <Navigate to="/admindashboard" replace={true} />
        }
        else {
            let sampleData: any[] = [];
            if (window.history.state.usr && window.history.state.usr.pollData && window.location.pathname.includes("closedpoll")) {
                window.history.state.usr.pollData.questions.forEach((question: Question, index: number) => {
                    sampleData.push({ "key": question.label, "value": [] });
                    question.options.forEach((option: string) => {
                        sampleData[index]["value"].push({ "label": option, count: 0 });
                    });
                })
                this.setState({ pollTitle: window.history.state.usr.pollData.title, pollQuestions: window.history.state.usr.pollData.questions });
                fetchClosedPolls(window.history.state.usr.pollData.id).then((userSubmittedOptions) => {
                    if (userSubmittedOptions !== "error" && userSubmittedOptions.length !== 0) {
                        userSubmittedOptions.forEach((value) => {
                            value.selectedOptions.forEach((selectedOption: any, index: number) => {
                                sampleData[index]["value"][selectedOption].count++;
                            });
                        });
                        this.setState({ transformedData: sampleData });
                    }
                    this.setState({ showLoader: false });

                })

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
                        <Row className="justify-content-center" style={{ marginTop: "20px" }}>
                            <Col md={2}></Col>
                            <Col md={8}>
                                <Form>
                                    <Row className="mb-3 align-items-center">

                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            {this.state.pollQuestions.map((question, index) => {
                                                return (
                                                    <Row key={index}>
                                                        <Col xs={12} sm={12} md={9} lg={9} xl={9} xxl={9} >
                                                            <Form.Label>
                                                                <strong>{`${index + 1}) ${question.label}`}</strong>
                                                            </Form.Label>
                                                        </Col>
                                                        <Row>
                                                            {this.state.transformedData.length === 0 ?
                                                                <Col xs={12} sm={12} md={9} lg={9} xl={9} xxl={9} >
                                                                    <Form.Label className="text-center" style={{ color: "red" }}>
                                                                        data not available
                                                                    </Form.Label>
                                                                </Col>
                                                                :
                                                                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} style={{ marginTop: "10px" }}>
                                                                    <ChartComponent chartData={this.state.transformedData[index]["value"]} />
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
                                            <LinkComponent to={"/admindashboard"} className="btn btn-outline-primary" state={null}>
                                                Go Back
                                            </LinkComponent>
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

}


export default ClosedPoll;
