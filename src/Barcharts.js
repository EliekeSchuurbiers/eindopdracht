import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";



class BarChartsPage extends React.Component {


    render() {
        // console.log(this.props.state.gegevens)
        return (
            <MDBContainer>
                <h3 className="mt-5">Opdrachtscores</h3>
                <Bar data=
                    {{
                        labels: this.props.labels,
                        datasets: this.props.datasets

                    }}
                    options=
                    {{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: [
                                {
                                    barPercentage: 1,
                                    gridLines: {
                                        display: true,
                                        color: "rgba(0, 0, 0, 0.1)"
                                    }
                                }
                            ],
                            yAxes: [
                                {
                                    gridLines: {
                                        display: true,
                                        color: "rgba(0, 0, 0, 0.1)"
                                    },
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }
                            ]
                        }
                    }} />
            </MDBContainer>
        );
    }
}

export default BarChartsPage;