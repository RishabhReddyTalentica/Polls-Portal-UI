import { ReactNode } from "react";
import { Link } from "react-router-dom";




const LinkComponent: React.FC<{ to: string, style?: any, state: any, children: ReactNode, className?: string }> = (props) => {

    return (
        <Link to={props.to} replace={true} style={props.style ? props.style : {}}
            state={props.state} className={props.className ? props.className : ``}>
            {props.children}
        </Link>
    )

}

export default LinkComponent;
