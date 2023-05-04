import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { Poll } from "../../models/Poll";
import LinkComponent from "../LinkComponent/LinkComponent";
import { Component } from "react";

const mapStateToProps = (state: RootState) => ({
    storePolls: state.polls.polls
});
class AdminDashboard extends Component<any, any>{
    render() {
        return (
            <Container>
                <Row>
                    <Col className="text-center">
                        <LinkComponent to={"/createnewpoll"} className="btn btn-outline-primary" state={null}>
                            Create new poll
                        </LinkComponent>
                    </Col>
                </Row>
                <Row style={{ columnGap: "20px" }}>
                    <Col xs={12} sm={12} md={12} lg={1} xl={1} xxl={1}></Col>
                    <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5} className="text-center" style={{ marginTop: "50px" }}>
                        <Row>
                            <h5><strong>Open Polls</strong></h5>
                        </Row>
                        <Row style={{ maxHeight: "50vh", overflowY: "scroll" }}>
                            {this.props.storePolls.map((storePoll: Poll) => {
                                if (storePoll.status === "online") {
                                    return <LinkComponent key={storePoll.id} to={`/openpoll/${storePoll.id}`} style={{ marginTop: "10px" }}
                                        state={{
                                            mode: 'VIEW',
                                            pollData: storePoll,
                                        }}>
                                        {storePoll.title}
                                    </LinkComponent>
                                }
                                return ""
                            })}
                        </Row>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5} className="text-center" style={{ marginTop: "50px" }}>
                        <Row>
                            <h5><strong>Closed Polls</strong></h5>
                        </Row>
                        <Row style={{ maxHeight: "50vh", overflowY: "scroll" }}>
                            {this.props.storePolls.map((storePoll: Poll) => {
                                if (storePoll.status === "closed") {
                                    return <LinkComponent key={storePoll.id} to={`/closedpoll/${storePoll.id}`} style={{ marginTop: "10px" }}
                                        state={{
                                            mode: 'VIEW',
                                            pollData: storePoll,
                                        }}
                                    >
                                        {storePoll.title}
                                    </LinkComponent>
                                }
                                return ""
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}



export default connect(mapStateToProps)(AdminDashboard);
