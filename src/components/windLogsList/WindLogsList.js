import React from "react";
import WindLog from '../windLog/WindLog';
import SocketsService from "../../services/socketsService"
import './WindLogsList.scss';

const ENDPOINT = "http://wind-api.amalgama.co/1";

//const ENDPOINT = "http://localhost:3000/1";


class WindLogsList extends React.Component {

    constructor(props) {
        super(props);

        this.get_windLogs_url = ENDPOINT + "/stats";
        SocketsService.listenForNewWindLogs(this);

        this.state = {
            error: null,
            isLoaded: false,
            stats: []
        };
    }

    componentDidMount = () => {
        fetch(this.get_windLogs_url)
            .then(res => res.json())
            .then(
                (results) => {
                    this.setState({
                        isLoaded: true,
                        stats: results
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    getWindLog = (windLog) => {
        return (
            <WindLog
                key={windLog.id}
                id={windLog.id}
                speed={windLog.speed}
                gust={windLog.gust}
                direction={windLog.direction}
                className={'A-donde-va'}
            />
        );
    }

    socketsCallback = (data) => {
        console.log(data);
        this.updateStats(data.stats);
    }

    updateStats = (stats) => {
        this.setState({
            stats: stats
        });
    }


    render() {
        const {error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return this.renderWindLogsView()
        }
    }


    renderWindLogsView = () => {
        if (this.state.stats)
            return this.displayStats();
        else
            return this.displayPlaceholder();
    }


    displayStats = () => {
        var windLog = this.state.stats.latest;
        return (
            <div className="stats-container">
                {this.getWindLog(windLog)}
            </div>
        )
    }

    displayPlaceholder = () => {
        return (
            <div className="stats-placeholder">
                <h1>No hay ordenes pendientes</h1>
            </div>
        )
    }

}

export default WindLogsList;
