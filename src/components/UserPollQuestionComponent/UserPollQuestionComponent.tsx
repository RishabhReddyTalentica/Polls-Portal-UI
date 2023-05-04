import { Col, Row, Form } from "react-bootstrap";
import { Question } from "../../models/Question";
import UserPollOptionComponent from "../UserPollOptionComponent/UserPollOptionComponent";
import { Component } from "react";


type UserPollQuestionComponentProps = {
    index: number,
    question: Question,
    canEdit: boolean,
    onChangeOptionHandler: any,
    onCheckSelected: any
}
class UserPollQuestionComponent extends Component<UserPollQuestionComponentProps, any> {

    render() {
        return (
            <Row>
                <Col xs={12} sm={12} md={9} lg={9} xl={9} xxl={9} >
                    <Form.Label>
                        <strong><span style={{ color: "red" }}>*</span> {`Q)${this.props.index + 1} ${this.props.question.label}`}</strong>
                    </Form.Label>
                </Col>
                <Row>
                    {this.props.question.options.map((option, i) => {
                        return (
                            <UserPollOptionComponent key={i} index={i} questionIndex={this.props.index} canEdit={this.props.canEdit} onChangeOptionHandler={this.props.onChangeOptionHandler} onCheckSelected={this.props.onCheckSelected} option={option} />
                        );
                    })}
                </Row>

                <Row style={{ marginTop: "20px" }}></Row>

            </Row>
        )
    }
}

export default UserPollQuestionComponent;
