import React from "react";
import LatestStats from '../latestStats/LatestStats';
import SocketsService from "../../services/socketsService"
import './WindLogsList.scss';

const ENDPOINT = "http://wind-api.amalgama.co/1";
//const ENDPOINT = "http://localhost:3000/1";


class WindLogsList extends React.Component {

    constructor(props) {
        super(props);

        this.get_stats_url = ENDPOINT + "/stats";
        SocketsService.listenForNewWindLogs(this);

        this.state = {
            error: null,
            isLoaded: false,
            stats: []
        };
    }

    componentDidMount = () => {
        fetch(this.get_stats_url)
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


    getLatestStatsView = (stats) => {
        return (
            <LatestStats
                key={stats.id}
                id={stats.id}
                speed={stats.speed}
                gust={stats.gust}
                direction={stats.direction}
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
            return this.renderLatestStatsView()
        }
    }


    renderLatestStatsView = () => {
        if (this.state.stats)
            return this.displayStats();
        else
            return this.displayPlaceholder();
    }

    displayStats = () => {
        return (
            <div className="stats-container">
                {this.getLatestStatsView(this.state.stats.latest)}
            </div>
        )
    }

    displayPlaceholder = () => {
        return (
            <div className="stats-placeholder">
                <h1>No información disponible</h1>
            </div>
        )
    }

}

export default WindLogsList;
