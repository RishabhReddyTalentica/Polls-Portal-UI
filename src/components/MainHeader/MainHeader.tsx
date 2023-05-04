import { Component, Fragment, ReactNode } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from "../../TalenticaLogo.png";
import styles from "./MainHeader.module.scss";
import { Navigate } from "react-router-dom";
import AuthContext from "../../store/user-context";
import { Button } from "react-bootstrap";

type MainHeaderProps = {
    children: ReactNode
}
class MainHeader extends Component<MainHeaderProps, any> {
    static contextType: React.Context<any> = AuthContext;
    context!: React.ContextType<typeof AuthContext>;

    render() {
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
                            {this.context.isLoggedIn ?
                                <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4} className="text-center">
                                    <Button variant="outline-primary" type="button" onClick={() => {
                                        this.context.logout();
                                        <Navigate to="/login" replace={true} />
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
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default MainHeader;
