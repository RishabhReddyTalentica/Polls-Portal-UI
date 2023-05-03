import { Col, Row, Form, Button } from "react-bootstrap";
import { Question } from "../../models/Question";
import CreatePollOptionComponent from "../CreatePollOptionComponent/CreatePollOptionComponent";
import FormGroupComponentWithoutRef from "../FormGroupComponentWithoutRef/FormGroupComponentWithoutRef";



const CreatePollQuestionComponent: React.FC<{ question: Question, canEdit: boolean, onQuestionLabelChange: any, index: number, onAddNewOption: any, onChangeOptionLabel: any, onRemoveOption: any }> = (props) => {

    return (
        <Row>
            <Col xs={12} sm={12} md={9} lg={9} xl={9} xxl={9} >
                <FormGroupComponentWithoutRef type="text" id={`Q)${props.index + 1}`} placeholder="Enter question" value={props.question.label}
                    label={`Q)${props.index + 1}`} disabled={!props.canEdit} onChange={(event: any) => { props.onQuestionLabelChange(props.index, event) }} />
            </Col>
            <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} className="text-end" style={{ marginTop: "20px" }}>
                {props.canEdit && <Button variant="outline-primary" type="button" onClick={(e) => { props.onAddNewOption(props.index) }}>
                    Add Option
                </Button>}
            </Col>
            <Row>
                {props.question.options.map((option, i) => {
                    return (
                        <CreatePollOptionComponent key={props.index + i} canEdit={props.canEdit} index={i} option={option} onChangeOptionLabel={props.onChangeOptionLabel} questionIndex={props.index} onRemoveOption={props.onRemoveOption} />
                    );
                })}
            </Row>

            <Row style={{ marginTop: "20px" }}></Row>

        </Row>
    )


}

export default CreatePollQuestionComponent;
