import { Fragment, ReactNode, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from "../../TalenticaLogo.png";
import styles from "./MainHeader.module.scss";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/user-context";
import { Button } from "react-bootstrap";


const MainHeader: React.FC<{ children: ReactNode }> = (props) => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <Fragment>
            <Container className={styles.mainHeader}>
                <Row className={`card ${styles.cardStyle}`}>
                    <Row className="card-body justify-content-center">
                        <Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2} className={styles.colImage}>
                            <img
                                src={Logo}
                                height="36px"
                                width="116px"
                                alt="Talentica Logo"
                            />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5} className={styles.colHeaderText}>
                            <h3>
                                <strong>Polls Application</strong>
                            </h3>
                        </Col>
                        {authCtx.isLoggedIn ?
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4} className="text-center">
                                <Button variant="outline-primary" type="button" onClick={() => {
                                    authCtx.logout();
                                    navigate("/login", { replace: true });
                                }}>
                                    Logout
                                </Button>
                            </Col>
                            :
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}></Col>
                        }
                    </Row>
                </Row>
            </Container>
            <main>
                {props.children}
            </main>
        </Fragment>
    );
}

export default MainHeader;
