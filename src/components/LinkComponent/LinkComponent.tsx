import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";


type LinkComponentProps = {
    to: string,
    style?: any,
    state: any,
    children: ReactNode,
    className?: string
}
class LinkComponent extends Component<LinkComponentProps, any>{

    render() {
        return (
            <Link to={this.props.to} replace={true} style={this.props.style ? this.props.style : {}}
                state={this.props.state} className={this.props.className ? this.props.className : ``}>
                {this.props.children}
            </Link>
        )
    }
}

export default LinkComponent;
