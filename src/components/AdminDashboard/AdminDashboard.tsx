import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


const AdminDashboard: React.FC = (props) => {


    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <Link to={"/createnewpoll"} className="btn btn-outline-primary" replace={true}>
                        Create new poll
                    </Link>
                </Col>
            </Row>
        </Container>
    );

}

export default AdminDashboard;
