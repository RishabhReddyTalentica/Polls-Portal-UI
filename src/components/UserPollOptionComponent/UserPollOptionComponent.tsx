
import { Col, Row, Form } from "react-bootstrap";




const UserPollOptionComponent: React.FC<{ index: number, questionIndex: number, onChangeOptionHandler: any, onCheckSelected: any, option: string, canEdit: boolean }> = (props) => {

    return (
        <Row>
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} style={{ marginTop: "10px" }}>
                {
                    props.canEdit ?
                        <Form.Check
                            type="radio"
                            id={props.index.toString()}
                            label={props.option}
                            name={props.questionIndex.toString()}
                            onChange={(e) => { props.onChangeOptionHandler(props.index, props.questionIndex, e) }}
                            disabled={!props.canEdit}
                        /> :
                        <Form.Check
                            type="radio"
                            id={props.index.toString()}
                            label={props.option}
                            name={props.questionIndex.toString()}
                            disabled={!props.canEdit}
                            defaultChecked={props.onCheckSelected(props.index, props.questionIndex)}
                        />
                }

            </Col>
        </Row>
    )

}

export default UserPollOptionComponent;
