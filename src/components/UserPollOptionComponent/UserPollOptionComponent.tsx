
import { Component } from "react";
import { Col, Row, Form } from "react-bootstrap";


type UserPollOptionComponentProps = {
    index: number,
    questionIndex: number,
    onChangeOptionHandler: any,
    onCheckSelected: any,
    option: string,
    canEdit: boolean
}
class UserPollOptionComponent extends Component<UserPollOptionComponentProps, any> {

    render() {
        return (
            <Row>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} style={{ marginTop: "10px" }}>
                    {
                        this.props.canEdit ?
                            <Form.Check
                                type="radio"
                                id={this.props.index.toString()}
                                label={this.props.option}
                                name={this.props.questionIndex.toString()}
                                onChange={(e) => { this.props.onChangeOptionHandler(this.props.index, this.props.questionIndex, e) }}
                                disabled={!this.props.canEdit}
                            /> :
                            <Form.Check
                                type="radio"
                                id={this.props.index.toString()}
                                label={this.props.option}
                                name={this.props.questionIndex.toString()}
                                disabled={!this.props.canEdit}
                                defaultChecked={this.props.onCheckSelected(this.props.index, this.props.questionIndex)}
                            />
                    }

                </Col>
            </Row>
        )

    }


}


export default UserPollOptionComponent;
