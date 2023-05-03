import { forwardRef } from "react";
import { Form } from "react-bootstrap";


const FormGroupComponent = forwardRef<any, { type: string, id: string, placeholder: string, label: string, onChange?: any }>((props, ref) => {

    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor={props.id}>
                <strong>
                    <span style={{ color: "red" }}>*</span> {props.label}
                </strong>
            </Form.Label>
            {props.type === "dropdown" ?
                <Form.Select id={props.id} onChange={props.onChange}>
                    <option value={props.id}>{props.placeholder}</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </Form.Select>
                :
                <Form.Control type={props.type} id={props.id} placeholder={props.placeholder} ref={ref} />
            }

        </Form.Group>
    )

});

export default FormGroupComponent;
