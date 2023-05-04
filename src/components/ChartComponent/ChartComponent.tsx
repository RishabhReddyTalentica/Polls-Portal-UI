
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Component } from "react";
import { Pie } from "react-chartjs-2";
import { Colors } from 'chart.js';
import { Col } from "react-bootstrap";

Chart.register(CategoryScale);
Chart.register(Colors);

type ChartComponentProps = {
    chartData: any
}

type ChartComponentState = {
    chartDisplayData: any
}

class ChartComponent extends Component<ChartComponentProps, ChartComponentState>{
    constructor(props: ChartComponentProps) {
        super(props);
        this.state = {
            chartDisplayData: {
                labels: this.props.chartData.map((data: any) => data.label),
                datasets: [
                    {
                        label: "",
                        data: this.props.chartData.map((data: any) => data.count),
                        borderColor: "black",
                        borderWidth: 2
                    }
                ]
            }
        }
    }

    render() {
        return (
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="chart-container">
                <Pie
                    data={this.state.chartDisplayData}
                    options={{
                        plugins: {
                            colors: {
                                forceOverride: true
                            }
                        }
                    }}
                />
            </Col>
        );
    }

}


export default ChartComponent;
