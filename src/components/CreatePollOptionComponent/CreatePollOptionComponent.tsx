import { Component } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";


type CreatePollOptionComponentProps = {
    canEdit: boolean,
    index: number,
    option: string,
    onChangeOptionLabel: any,
    questionIndex: number,
    onRemoveOption: any
}

class CreatePollOptionComponent extends Component<CreatePollOptionComponentProps, any> {

    render() {
        return (
            <Row >
                <Col xs={10} sm={10} md={6} lg={6} xl={6} xxl={6} style={{ marginTop: "10px" }}>
                    <Form.Control type="text" placeholder={`Enter option ${this.props.index + 1}`} value={this.props.option} onChange={(e) => { this.props.onChangeOptionLabel(this.props.index, this.props.questionIndex, e) }}
                        disabled={!this.props.canEdit} />
                </Col>
                {this.props.index !== 0 && this.props.index !== 1 && this.props.canEdit ? <Col xs={2} sm={2} md={6} lg={6} xl={6} xxl={6} style={{ marginTop: "10px" }}>
                    <Button variant="outline-danger" type="button" onClick={(e) => { this.props.onRemoveOption(this.props.index, this.props.questionIndex, e) }}>
                        X
                    </Button>
                </Col> : ""}

            </Row>
        )
    }

}

// const CreatePollOptionComponent: React.FC<{ canEdit: boolean, index: number, option: string, onChangeOptionLabel: any, questionIndex: number, onRemoveOption: any }> = (props) => {

//     return (
//         <Row >
//             <Col xs={10} sm={10} md={6} lg={6} xl={6} xxl={6} style={{ marginTop: "10px" }}>
//                 <Form.Control type="text" placeholder={`Enter option ${props.index + 1}`} value={props.option} onChange={(e) => { props.onChangeOptionLabel(props.index, props.questionIndex, e) }}
//                     disabled={!props.canEdit} />
//             </Col>
//             {props.index !== 0 && props.index !== 1 && props.canEdit ? <Col xs={2} sm={2} md={6} lg={6} xl={6} xxl={6} style={{ marginTop: "10px" }}>
//                 <Button variant="outline-danger" type="button" onClick={(e) => { props.onRemoveOption(props.index, props.questionIndex, e) }}>
//                     X
//                 </Button>
//             </Col> : ""}

//         </Row>
//     )

// }

export default CreatePollOptionComponent;
