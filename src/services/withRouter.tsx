import { useNavigate } from "react-router-dom";

export interface withRouterProps {
    navigate: any;
}

const withRouter = <P extends object>(OldComponent: React.ComponentType<P>) => {

    const NewComponent: React.FC<P & withRouterProps> = (props) => {
        const navigate = useNavigate();

        return <OldComponent {...props as P} navigate={navigate} />

    }
    return NewComponent;
}


export default withRouter;
