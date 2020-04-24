import React from "react";
import LineChartsPage from '../Linecharts';
import { useParams } from "react-router-dom";


function UserPage(props) {
    console.log(props);

    let { id } = useParams();
    let opdrachten = props.gegevens.filter(data => data["Wie ben je?"] === id).reduce((ac, cv) => {
        let opdracht = ac.find(data => data.opdracht === cv["Welke opdracht of welk project lever je nu in?"]);
        if (opdracht == null) {
            opdracht = { opdracht: cv["Welke opdracht of welk project lever je nu in?"], totaal: 0, moeilijk: 0, leuk: 0, student: [] }
            ac.push(opdracht);
        }
        opdracht.totaal += 1;
        opdracht.moeilijk += parseInt(cv["Hoe moeilijk vond je deze opdracht?"]);
        opdracht.leuk += parseInt(cv["Hoe leuk vond je deze opdracht?"]);
        opdracht.student.push(cv);
        return ac;
    }, []);
    console.log(opdrachten);
    console.log(id);
    return (
        < div >
            <h3>Dit is het dashboard van {id}</h3>

            <LineChartsPage labels={opdrachten.map(data => data.opdracht)}
                datasets={[{
                    label: "Moeilijk",
                    borderColor: "#ec407a",
                    data: opdrachten.map(opdracht => opdracht.moeilijk / opdracht.totaal),
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
                    data: opdrachten.map(opdracht => opdracht.leuk / opdracht.totaal),
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
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th><h4>{id}</h4></th>
                        <th><b>Opdracht</b></th>
                        <th><b>Leuk</b></th>
                        <th><b>Moeilijk</b></th>
                    </tr>
                </thead>
                <tbody>
                    {opdrachten.map(opdracht => (
                        <tr class="table-info">
                            <th scope="row"><b>Opdracht:</b></th>
                            <td>{opdracht.opdracht}</td>
                            <td>{opdracht.leuk}</td>
                            <td>{opdracht.moeilijk}</td>
                        </tr>
                    ))}
                </tbody>
            </table>



        </div >
    );

}

export default UserPage;