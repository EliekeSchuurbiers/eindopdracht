import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class LineChartsPage extends React.Component {

    render() {
        // console.log("Linechart", this.props.labels);
        return (
            <MDBContainer>
                <h3 className="mt-5">{this.props.title}</h3>
                <Line data={{ labels: this.props.labels, datasets: this.props.datasets }} options={{ responsive: true }} />
            </MDBContainer>
        );
    }
}

export default LineChartsPage;