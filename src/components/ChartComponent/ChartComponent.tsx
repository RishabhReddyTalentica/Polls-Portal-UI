
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Colors } from 'chart.js';
import { Col } from "react-bootstrap";

Chart.register(CategoryScale);
Chart.register(Colors);
const ChartComponent: React.FC<{ chartData: any }> = (props) => {
    const [chartData] = useState({
        labels: props.chartData.map((data: any) => data.label),
        datasets: [
            {
                label: "",
                data: props.chartData.map((data: any) => data.count),
                borderColor: "black",
                borderWidth: 2
            }
        ]
    });

    return (
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="chart-container">
            <Pie
                data={chartData}
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

export default ChartComponent;
