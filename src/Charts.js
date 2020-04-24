import React from 'react';
import BarChartsPage from './Barcharts';
import LineChartsPage from './Linecharts';

class Charts extends React.Component {
    constructor(props) {
        super(props)
        this.state = { gegevens: props.gegevens, student: props.student, showing: true };

        this.state.opdrachten = this.state.gegevens.reduce((ac, cv) => {
            let opdracht = ac.find(data => data.opdracht === cv["Welke opdracht of welk project lever je nu in?"]);
            if (opdracht == null) {
                opdracht = { opdracht: cv["Welke opdracht of welk project lever je nu in?"], totaal: 0, moeilijk: 0, leuk: 0 }
                ac.push(opdracht);
            }
            opdracht.totaal += 1;
            opdracht.moeilijk += parseInt(cv["Hoe moeilijk vond je deze opdracht?"]);
            opdracht.leuk += parseInt(cv["Hoe leuk vond je deze opdracht?"]);
            return ac;
        }, []);


        this.state.selectedOpdrachten = this.state.opdrachten.map(data => { return { opdracht: data.opdracht, selected: true } });
        this.state.selectedStudenten = this.state.student.map(data => { return { student: data.student, selected: true } });

    }

    render() {
        const toggleOpdracht = (event) => {
            this.state.selectedOpdrachten.find(data => data.opdracht === event.target.id).selected = event.target.checked;

            this.setState(this.state);

        }

        const toggleStudent = (event) => {
            this.state.selectedStudenten.find(data => data.student === event.target.id).selected = event.target.checked;

            this.setState(this.state);

        }

        this.state.studentenData = this.state.gegevens.filter(data => this.state.selectedOpdrachten.find(studentenData => studentenData.opdracht === data["Welke opdracht of welk project lever je nu in?"]).selected).reduce((ac, cv) => {
            let student = ac.find(data => data.student === cv["Wie ben je?"]);
            if (student == null) {
                student = { student: cv["Wie ben je?"], totaal: 0, moeilijk: 0, leuk: 0 };
                ac.push(student);
            }
            student.totaal += 1;
            student.moeilijk += parseInt(cv["Hoe moeilijk vond je deze opdracht?"]);
            student.leuk += parseInt(cv["Hoe leuk vond je deze opdracht?"]);
            return ac;
        }, []);

        this.state.opdrachtenData = this.state.gegevens.filter(data => this.state.selectedStudenten.find(opdrachtenData => opdrachtenData.student === data["Wie ben je?"]).selected).reduce((ac, cv) => {
            let opdracht = ac.find(data => data.opdracht === cv["Welke opdracht of welk project lever je nu in?"]);
            if (opdracht == null) {
                opdracht = { opdracht: cv["Welke opdracht of welk project lever je nu in?"], totaal: 0, moeilijk: 0, leuk: 0 }
                ac.push(opdracht);
            }
            opdracht.totaal += 1;
            opdracht.moeilijk += parseInt(cv["Hoe moeilijk vond je deze opdracht?"]);
            opdracht.leuk += parseInt(cv["Hoe leuk vond je deze opdracht?"]);
            return ac;
        }, []);


        return (
            < div >

                < BarChartsPage state={this.state} labels={this.state.opdrachten.map(data => data.opdracht)} datasets={
                    [{
                        label: "Moeilijk",
                        backgroundColor: "#ec407a ",
                        data: this.state.opdrachten.map(opdracht => opdracht.moeilijk / opdracht.totaal)
                    },
                    {
                        label: "Leuk",
                        backgroundColor: "#2BBBAD",
                        data: this.state.opdrachten.map(opdracht => opdracht.leuk / opdracht.totaal)
                    }]} />
                <LineChartsPage title="Studentenoverzicht" labels={this.state.studentenData.map(data => data.student)}
                    datasets={[{
                        label: "Moeilijk",
                        borderColor: "#ec407a",
                        data: this.state.studentenData.map(opdracht => opdracht.moeilijk / opdracht.totaal),
                        fill: false,
                        lineTension: 0.3,
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "#ec407a",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 10,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "#2BBBAD",
                        pointHoverBorderColor: "#ec407a",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10

                    },
                    {
                        label: "Leuk",
                        borderColor: "#2BBBAD",
                        data: this.state.studentenData.map(opdracht => opdracht.leuk / opdracht.totaal),
                        fill: false,
                        lineTension: 0.3,
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "#2BBBAD",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 10,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "#ec407a",
                        pointHoverBorderColor: "#2BBBAD",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10
                    }]}

                />
                <div className="opdrachten">
                    {this.state.selectedOpdrachten.map(data => (
                        <div>
                            <input type="checkbox" className="form-check-input" id={data.opdracht} checked={data.selected} onChange={toggleOpdracht} />
                            < label class="form-check-label" for={data.opdracht}  >{data.opdracht}</label>
                        </div>
                    ))}
                </div>
                <LineChartsPage title="Opdrachtenoverzicht" labels={this.state.opdrachtenData.map(data => data.opdracht)}
                    datasets={[{
                        label: "Moeilijk",
                        borderColor: "#ec407a",
                        data: this.state.opdrachtenData.map(opdracht => opdracht.moeilijk / opdracht.totaal),
                        fill: false,
                        lineTension: 0.3,
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "#ec407a",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 10,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "#2BBBAD",
                        pointHoverBorderColor: "#ec407a",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10

                    },
                    {
                        label: "Leuk",
                        borderColor: "#2BBBAD",
                        data: this.state.opdrachtenData.map(opdracht => opdracht.leuk / opdracht.totaal),
                        fill: false,
                        lineTension: 0.3,
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "#2BBBAD",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 10,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "#ec407a",
                        pointHoverBorderColor: "#2BBBAD",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10
                    }]}

                />
                <div class="form-check">
                    {this.state.selectedStudenten.map(data => (
                        <div className="studenten">
                            <input type="checkbox" className="form-check-input" id={data.student} checked={data.selected} onChange={toggleStudent} />
                            < label class="form-check-label" for={data.student}  >{data.student}</label>
                        </div>
                    ))}
                </div>

            </div >

        );
    }

};
export default Charts;