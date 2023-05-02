import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Poll } from "../../models/Poll";


const AdminDashboard: React.FC = (props) => {
    const storePolls = useSelector((state: RootState) => state.polls.polls);
    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <Link to={"/createnewpoll"} className="btn btn-outline-primary" replace={true}>
                        Create new poll
                    </Link>
                </Col>
            </Row>
            <Row style={{ columnGap: "20px" }}>
                <Col xs={12} sm={12} md={12} lg={1} xl={1} xxl={1}></Col>
                <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5} className="text-center" style={{ marginTop: "50px" }}>
                    <Row>
                        <h5><strong>Open Polls</strong></h5>
                    </Row>
                    <Row style={{ maxHeight: "50vh", overflowY: "scroll" }}>
                        {storePolls.map((storePoll: Poll) => {
                            if (storePoll.status === "online") {
                                return <Link key={storePoll.id} to={`/openpoll/${storePoll.id}`} replace={true} style={{ marginTop: "10px" }}
                                    state={{
                                        mode: 'VIEW',
                                        pollData: storePoll,
                                    }}>
                                    {storePoll.title}
                                </Link>
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
                        {storePolls.map((storePoll: Poll) => {
                            if (storePoll.status === "closed") {
                                return <Link key={storePoll.id} to={`/closedpoll/${storePoll.id}`} replace={true} style={{ marginTop: "10px" }}
                                    state={{
                                        mode: 'VIEW',
                                        pollData: storePoll,
                                    }}>
                                    {storePoll.title}
                                </Link>
                            }
                            return ""
                        })}
                    </Row>
                </Col>
            </Row>
        </Container>
    );

}

export default AdminDashboard;
