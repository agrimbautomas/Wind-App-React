import React from "react";
import WindLog from '../windLog/WindLog';
import SocketsService from "../../services/socketsService"
import './WindLogsList.scss';

const ENDPOINT = "http://wind-api.amalgama.co/1";

// const ENDPOINT = "http://localhost:3000/1";


class WindLogsList extends React.Component {

    constructor(props) {
        super(props);

        this.get_windLogs_url = ENDPOINT + "/stats";
        SocketsService.listenForNewWindLogs(this);

        this.state = {
            error: null,
            isLoaded: false,
            windLogs: []
        };
    }

    componentDidMount = () => {
        fetch(this.get_windLogs_url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        windLogs: result.response
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
        let windLog = JSON.parse(data.windLog)
        this.updatewindLogs(windLog)
    }

    updatewindLogs = (windLog) => {
        if (windLog.delivered)
            this.removewindLog(windLog);
        else
            this.addNewwindLog(windLog);
    }

    getwindLogPosition = (windLog) => {
        return this.state.windLogs.findIndex(function (element) {
            return element.id === windLog.id;
        });
    }

    render() {
        const {error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return this.renderwindLogsView()
        }
    }


    renderwindLogsView = () => {
        if (this.state.windLogs.length > 0)
            return this.displaywindLogs();
        else
            return this.displayPlaceholder();
    }

    displaywindLogs = () => {
        return (
            <div className="windLogs-container">
                {this.state.windLogs.map(windLog => this.getWindLog(windLog))}
            </div>
        )
    }

    displayPlaceholder = () => {
        return (
            <div className="windLogs-placeholder">
                <h1>No hay ordenes pendientes</h1>
            </div>
        )
    }

}

export default WindLogsList;
