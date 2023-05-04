import React from "react";
import { Component } from "react";
import { Form } from "react-bootstrap";


type FormGroupComponentProps = {
    type: string,
    id: string,
    placeholder: string,
    label: string,
    onChange?: any
}

class FormGroupComponent extends Component<FormGroupComponentProps, any>{
    inputref = React.createRef<HTMLInputElement>();
    getInput = () => {
        return this.inputref.current?.value;
    }
    render() {
        return (
            <Form.Group className="mb-3">
                <Form.Label htmlFor={this.props.id}>
                    <strong>
                        <span style={{ color: "red" }}>*</span> {this.props.label}
                    </strong>
                </Form.Label>
                {this.props.type === "dropdown" ?
                    <Form.Select id={this.props.id} onChange={this.props.onChange}>
                        <option value={this.props.id}>{this.props.placeholder}</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </Form.Select>
                    :
                    <Form.Control type={this.props.type} id={this.props.id} placeholder={this.props.placeholder} ref={this.inputref} />
                }

            </Form.Group>
        )
    }
}

export default FormGroupComponent;
