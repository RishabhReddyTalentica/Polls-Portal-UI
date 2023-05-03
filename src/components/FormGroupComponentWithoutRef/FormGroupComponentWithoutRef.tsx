import { Form } from "react-bootstrap";


const FormGroupComponentWithoutRef: React.FC<{ type: string, id: string, placeholder: string, label: string, onChange: any, value: any, disabled: boolean }> = (props) => {

    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor={props.id}>
                <strong>
                    <span style={{ color: "red" }}>*</span> {props.label}
                </strong>
            </Form.Label>
            <Form.Control type={props.type} id={props.id} placeholder={props.placeholder}
                onChange={props.onChange} defaultValue={props.value} disabled={props.disabled} />
        </Form.Group>
    )

};

export default FormGroupComponentWithoutRef;
