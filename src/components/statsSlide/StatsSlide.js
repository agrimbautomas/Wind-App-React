import React, {Component} from "react";
import './StatsSlide.scss';

import windArrow from '../..//assets/img/wind-arrow.png';

class StatsSlide extends Component {

    constructor(props) {
        super(props);
        var angle = this.parseDirection(this.props.direction);
        this.state = {
            direction: angle,
            speed: this.props.speed,
            hour: this.props.hour,
            is_windy: this.props.speed >= 12,
            style: {
                transform: "rotate(" + (angle) + "deg)"
            }

        };
    }

    fadeImage = () => {
        if (this.state.in_knots)
            this.switchToKms();
        else
            this.switchToKnots();
    }

    switchToKms = () => {
        this.setState({
            speed: this.knToKm(this.state.speed),
            gust: this.knToKm(this.state.gust),
            messure: 'km/h',
            in_knots: false,
        })
    }

    switchToKnots = () => {
        this.setState({
            speed: this.kmToKn(this.state.speed),
            gust: this.kmToKn(this.state.gust),
            messure: 'kts',
            in_knots: true
        })
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

    render() {
        return (

            <div className="stats-container">
                <div
                    className="latest-stats-item" onClick={this.fadeImage}>

                    {/* Wind Direction */}
                    <h2>
                        <span>{this.state.direction}°</span>
                        {this.getDirection()}
                    </h2>

                    {/* Wind Condition */}
                    <h6 className={this.getCondition()}>{this.getCondition()} ({this.state.hour}hs)</h6>

                    {/* Wind Arrow */}
                    <div className="wind-arrow" style={this.state.style}>
                        <img src={windArrow}/>
                    </div>

                    {/* Wind Speed */}
                    <h1 className={this.state.is_windy ? 'windy' : ''}>
                        <span className="wind-speed">{this.state.speed} {this.state.messure}</span>
                    </h1>

                    <span className='id-hidden'>{this.props.id}</span>

                </div>
            </div>
        );
    }
}

export default StatsSlide;