import { Component } from "react";
import { Form } from "react-bootstrap";


type FormGroupComponentWithoutRefProps = {
    type: string,
    id: string,
    placeholder: string,
    label: string,
    onChange: any,
    value: any,
    disabled: boolean
}

class FormGroupComponentWithoutRef extends Component<FormGroupComponentWithoutRefProps, any>{

    render() {
        return (
            <Form.Group className="mb-3">
                <Form.Label htmlFor={this.props.id}>
                    <strong>
                        <span style={{ color: "red" }}>*</span> {this.props.label}
                    </strong>
                </Form.Label>
                <Form.Control type={this.props.type} id={this.props.id} placeholder={this.props.placeholder}
                    onChange={this.props.onChange} defaultValue={this.props.value} disabled={this.props.disabled} />
            </Form.Group>
        )
    }
}


export default FormGroupComponentWithoutRef;
