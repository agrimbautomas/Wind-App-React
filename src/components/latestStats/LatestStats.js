import React, {Component} from "react";
import './LatestStats.scss';

import windArrow from '../..//assets/img/main-wind-arrow.png';

class LatestStats extends Component {

    constructor(props) {
        super(props);
        var angle = this.parseDirection(this.props.direction);
        this.state = {
            direction: angle,
            speed: this.props.speed,
            gust: this.props.gust,
            hour: this.props.hour,
            unit: 'kts',
            in_knots: true,
            is_windy: this.props.speed >= 12,
            style: {
                transform: "rotate(" + (angle) + "deg)"
            }

        };


    }

    switchUnits = () => {
        if (this.state.in_knots)
            this.switchToKms();
        else
            this.switchToKnots();
    }

    switchToKms = () => {
        this.setState({
            speed: this.knToKm(this.state.speed),
            gust: this.knToKm(this.state.gust),
            unit: 'km/h',
            in_knots: false,
        })
    }

    switchToKnots = () => {
        this.setState({
            speed: this.kmToKn(this.state.speed),
            gust: this.kmToKn(this.state.gust),
            unit: 'kts',
            in_knots: true
        })
    }

    kmToKn = (kms) => {
        return Number((kms / 1.852).toFixed(1))
    }


    knToKm = (knots) => {
        return Number((knots * 1.852).toFixed(1))
    }

    parseDirection = (direction) => {
        return Math.round(direction);
    }

    getDirection = () => {
        var angle = this.state.direction;
        var directions = ['Norte', 'Noreste', 'Este', 'Sudeste', 'Sur', 'Sudoeste', 'Oeste', 'Noroeste'];
        return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
    }

    getCondition = () => {
        var angle = this.state.direction;
        return (angle > 0 && angle < 160) ? "Onshore" : "Offshore"
    }

    componentDidMount() {
        this.interval = setInterval(
            () => this.setState({
                time: Date.now()
            }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (

            <div className="latest-stats-item" onClick={this.switchUnits}>
                {/* Wind Direction */}
                <h2>
                    <span>{this.state.direction}°</span>
                    {this.getDirection()}
                </h2>

                {/* Wind Condition */}
                <h6 className={this.getCondition()}>{this.getCondition()}</h6>

                {/* Wind Arrow */}
                <div className="wind-arrow">
                    <img style={this.state.style} src={windArrow}/>
                </div>

                {/* Wind Speed */}
                <h1 className={this.state.is_windy ? 'windy' : ''}>
                    <span className="wind-speed-label">Viento</span>
                    <span className="wind-speed">{this.state.speed} {this.state.unit}</span>
                </h1>

                {/* Wind Gust */}
                <h3 className={this.state.is_windy ? 'windy' : ''}>
                    <span>Ráfaga</span>
                    <span className="wind-gust">{this.state.gust} {this.state.unit}</span>
                </h3>

                <span className='id-hidden'>{this.props.id}</span>

            </div>
        );
    }
}

export default LatestStats;