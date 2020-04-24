import React from 'react';
import { withGoogleSheets } from 'react-db-google-sheets';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import UserPage from './Students/UserPage'
import Charts from './Charts'
class Data extends React.Component {
    constructor(props) {
        super(props)
        this.state = { gegevens: props.db.Blad1 };
        this.state.student = this.state.gegevens.reduce((ac, cv) => {
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



    }
    render() {
        const tijdstip = new Date().getHours();

        const begroeting =
            tijdstip >= 4 && tijdstip < 12 ? 'Goedemorgen,' :
                tijdstip >= 12 && tijdstip <= 17 ? 'Goedemiddag,' :
                    tijdstip > 17 || tijdstip < 4 ? 'Goedenavond' :
                        'Hallo,'


        return (
            <div>

                <Router>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link className="link" to="/">Home</Link>
                                </li>
                                {this.state.student.map(data =>
                                    (<li>
                                        <Link className="link" to={data.student}>{data.student}</Link>
                                    </li>
                                    ))}

                            </ul>
                        </nav>
                        <h1 className="welkom">{begroeting} welkom op het Winc Dashboard!</h1>
                        <Switch>
                            <Route path="/:id" children={<UserPage gegevens={this.state.gegevens} />}>
                            </Route>
                            <Route path="/">
                                <Charts gegevens={this.state.gegevens} student={this.state.student}></Charts>
                            </Route>
                        </Switch>
                    </div>
                </Router>

            </div >
        );
    }

};
export default withGoogleSheets('Blad1')(Data);