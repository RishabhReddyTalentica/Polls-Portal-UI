import { Component, ReactNode } from "react";
import AuthContext from "../../store/user-context";
import { Container, Row, Col } from "react-bootstrap";


type DashboardLayoutProps = {
    children: ReactNode
}
class DashboardLayout extends Component<DashboardLayoutProps, any> {
    static contextType: React.Context<any> = AuthContext;
    context!: React.ContextType<typeof AuthContext>;

    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}></Col>
                    <Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3} className="text-center"><h4><strong>{`${this.context.userData?.role} Dashboard`}</strong></h4></Col>
                    <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4} className="text-center">
                        <Row>
                            <Col><p><strong>Logged in user : <span style={{ color: "blue" }}>{`${this.context.userData?.firstName} ${this.context.userData?.lastName}`}</span></strong></p></Col>
                        </Row>
                        <Row>
                            <Col><p><strong>Logged in as : <span style={{ color: "blue" }}>{this.context.userData?.role}</span> </strong></p></Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    {this.props.children}
                </Row>
            </Container>
        );
    }
}

export default DashboardLayout;
