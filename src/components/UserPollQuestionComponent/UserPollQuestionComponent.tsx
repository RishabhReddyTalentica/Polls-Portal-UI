import { Col, Row, Form } from "react-bootstrap";
import { Question } from "../../models/Question";
import UserPollOptionComponent from "../UserPollOptionComponent/UserPollOptionComponent";



const UserPollQuestionComponent: React.FC<{ index: number, question: Question, canEdit: boolean, onChangeOptionHandler: any, onCheckSelected: any }> = (props) => {

    return (
        <Row>
            <Col xs={12} sm={12} md={9} lg={9} xl={9} xxl={9} >
                <Form.Label>
                    <strong><span style={{ color: "red" }}>*</span> {`Q)${props.index + 1} ${props.question.label}`}</strong>
                </Form.Label>
            </Col>
            <Row>
                {props.question.options.map((option, i) => {
                    return (
                        <UserPollOptionComponent key={i} index={i} questionIndex={props.index} canEdit={props.canEdit} onChangeOptionHandler={props.onChangeOptionHandler} onCheckSelected={props.onCheckSelected} option={option} />
                    );
                })}
            </Row>

            <Row style={{ marginTop: "20px" }}></Row>

        </Row>
    )

}

export default UserPollQuestionComponent;
