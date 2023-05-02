import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Poll } from "../../models/Poll";
import { fetchUserSubmittedPolls } from "../../services/api";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/user-context";
import Loader from "../Loader/Loader";


const UserDashboard: React.FC = (props) => {
    const storePolls = useSelector((state: RootState) => state.polls.polls);
    const [filledPolls, setFilledPolls] = useState<any>([]);
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        fetchUserSubmittedPolls(authCtx.userData?.id).then((data: any) => {
            setFilledPolls([...data]);
            setShowLoader(false);
        });

    }, [authCtx.userData]);



    return (
        <Container>
            {showLoader && <Loader />}
            <Row style={{ columnGap: "20px" }}>
                <Col xs={12} sm={12} md={12} lg={1} xl={1} xxl={1}></Col>
                <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5} className="text-center" style={{ marginTop: "50px" }}>
                    <Row>
                        <h5><strong>Online Polls</strong></h5>
                    </Row>
                    <Row style={{ maxHeight: "50vh", overflowY: "scroll" }}>
                        {storePolls.map((storePoll: Poll) => {
                            if (storePoll.status === "online" && (filledPolls.findIndex((filledPoll: any) => { return filledPoll.poll === storePoll.id })) === -1) {
                                return <Link key={storePoll.id} to={`/userpollform/${storePoll.id}`} replace={true} style={{ marginTop: "10px" }}
                                    state={{
                                        mode: 'NEW',
                                        pollData: storePoll,
                                    }}>
                                    {storePoll.title}
                                </Link>
                            }
                            return "";
                        })}
                    </Row>
                </Col>
                <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5} className="text-center" style={{ marginTop: "50px" }}>
                    <Row>
                        <h5><strong>Submitted Polls</strong></h5>
                    </Row>
                    <Row style={{ maxHeight: "50vh", overflowY: "scroll" }}>
                        {storePolls.map((storePoll: Poll) => {
                            if (storePoll.status === "online" && (filledPolls.findIndex((filledPoll: any) => { return filledPoll.poll === storePoll.id })) !== -1) {
                                return <Link key={storePoll.id} to={`/userpollform/${storePoll.id}`} replace={true} style={{ marginTop: "10px" }}
                                    state={{
                                        mode: 'VIEW',
                                        pollData: storePoll,
                                        filledData: filledPolls.filter((filledPoll: any) => filledPoll.poll === storePoll.id)
                                    }}>
                                    {storePoll.title}
                                </Link>
                            }
                            return "";
                        })}
                    </Row>
                </Col>
            </Row>
        </Container>
    );

}

export default UserDashboard;
