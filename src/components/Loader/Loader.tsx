import { Component } from "react";
import ReactDOM from "react-dom";


class Loader extends Component<any, any> {

    render() {
        return (
            ReactDOM.createPortal(
                <div className="d-flex justify-content-center position-fixed top-0 start-0 w-100 vh-100 align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
                    <div className="spinner-border text-primary m-5" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>, document.getElementById("loader")!)
        );
    }

}

export default Loader
