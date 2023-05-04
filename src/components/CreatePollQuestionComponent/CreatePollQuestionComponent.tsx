import { Component } from 'react';
import { Col, Row, Button } from "react-bootstrap";
import { Question } from "../../models/Question";
import CreatePollOptionComponent from "../CreatePollOptionComponent/CreatePollOptionComponent";
import FormGroupComponentWithoutRef from "../FormGroupComponentWithoutRef/FormGroupComponentWithoutRef";


type CreatePollQuestionComponentProps = {
    question: Question,
    canEdit: boolean,
    onQuestionLabelChange: any,
    index: number,
    onAddNewOption: any,
    onChangeOptionLabel: any,
    onRemoveOption: any
}

class CreatePollQuestionComponent extends Component<CreatePollQuestionComponentProps, any> {

    render() {
        return (
            <Row>
                <Col xs={12} sm={12} md={9} lg={9} xl={9} xxl={9} >
                    <FormGroupComponentWithoutRef type="text" id={`Q)${this.props.index + 1}`} placeholder="Enter question" value={this.props.question.label}
                        label={`Q)${this.props.index + 1}`} disabled={!this.props.canEdit} onChange={(event: any) => { this.props.onQuestionLabelChange(this.props.index, event) }} />
                </Col>
                <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} className="text-end" style={{ marginTop: "20px" }}>
                    {this.props.canEdit && <Button variant="outline-primary" type="button" onClick={(e) => { this.props.onAddNewOption(this.props.index) }}>
                        Add Option
                    </Button>}
                </Col>
                <Row>
                    {this.props.question.options.map((option, i) => {
                        return (
                            <CreatePollOptionComponent key={this.props.index + i} canEdit={this.props.canEdit} index={i} option={option} onChangeOptionLabel={this.props.onChangeOptionLabel} questionIndex={this.props.index} onRemoveOption={this.props.onRemoveOption} />
                        );
                    })}
                </Row>

                <Row style={{ marginTop: "20px" }}></Row>

            </Row>
        )

    }
}

export default CreatePollQuestionComponent;
