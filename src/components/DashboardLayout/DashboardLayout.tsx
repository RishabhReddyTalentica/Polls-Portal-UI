import { ReactNode, useContext } from "react";
import AuthContext from "../../store/user-context";
import { Container, Row, Col } from "react-bootstrap";


const DashboardLayout: React.FC<{ children: ReactNode }> = (props) => {
    const authCtx = useContext(AuthContext);
    return (
        <Container>
            <Row>
                <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}></Col>
                <Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3} className="text-center"><h4><strong>{`${authCtx.userData?.role} Dashboard`}</strong></h4></Col>
                <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4} className="text-center">
                    <Row>
                        <Col><p><strong>Logged in user : <span style={{ color: "blue" }}>{`${authCtx.userData?.firstName} ${authCtx.userData?.lastName}`}</span></strong></p></Col>
                    </Row>
                    <Row>
                        <Col><p><strong>Logged in as : <span style={{ color: "blue" }}>{authCtx.userData?.role}</span> </strong></p></Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                {props.children}
            </Row>
        </Container>
    );
}

export default DashboardLayout;
