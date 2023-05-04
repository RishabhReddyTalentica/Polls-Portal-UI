import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { Poll } from "../../models/Poll";
import { fetchUserSubmittedPolls } from "../../services/api";
import { Component, Context } from "react";
import AuthContext from "../../store/user-context";
import Loader from "../Loader/Loader";
import LinkComponent from "../LinkComponent/LinkComponent";

type UserDashboardState = {
    filledPolls: any,
    showLoader: boolean
}
type UserDashboardProps = {
}
const mapStateToProps = (state: RootState) => ({
    storePolls: state.polls.polls
});
class UserDashboard extends Component<UserDashboardProps & any, UserDashboardState>{
    static contextType: Context<any> = AuthContext;
    context!: React.ContextType<typeof AuthContext>;
    constructor(props: UserDashboardProps & any) {
        super(props);
        this.state = {
            filledPolls: [],
            showLoader: true
        }
    }

    componentDidMount() {
        fetchUserSubmittedPolls(this.context.userData?.id).then((data: any) => {
            this.setState({ filledPolls: [...data], showLoader: false });
        });
    }

    render() {
        return (
            <Container>
                {this.state.showLoader && <Loader />}
                <Row style={{ columnGap: "20px" }}>
                    <Col xs={12} sm={12} md={12} lg={1} xl={1} xxl={1}></Col>
                    <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5} className="text-center" style={{ marginTop: "50px" }}>
                        <Row>
                            <h5><strong>Online Polls</strong></h5>
                        </Row>
                        <Row style={{ maxHeight: "50vh", overflowY: "scroll" }}>
                            {this.props.storePolls.map((storePoll: Poll) => {
                                if (storePoll.status === "online" && (this.state.filledPolls.findIndex((filledPoll: any) => { return filledPoll.poll === storePoll.id })) === -1) {
                                    return <LinkComponent key={storePoll.id} to={`/userpollform/${storePoll.id}`} style={{ marginTop: "10px" }}
                                        state={{
                                            mode: 'NEW',
                                            pollData: storePoll,
                                        }}>
                                        {storePoll.title}
                                    </LinkComponent>
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
                            {this.props.storePolls.map((storePoll: Poll) => {
                                if (storePoll.status === "online" && (this.state.filledPolls.findIndex((filledPoll: any) => { return filledPoll.poll === storePoll.id })) !== -1) {
                                    return <LinkComponent key={storePoll.id} to={`/userpollform/${storePoll.id}`} style={{ marginTop: "10px" }}
                                        state={{
                                            mode: 'VIEW',
                                            pollData: storePoll,
                                            filledData: this.state.filledPolls.filter((filledPoll: any) => filledPoll.poll === storePoll.id)
                                        }}>
                                        {storePoll.title}
                                    </LinkComponent>
                                }
                                return "";
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(mapStateToProps)(UserDashboard);
