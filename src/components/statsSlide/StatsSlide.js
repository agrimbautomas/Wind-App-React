import React, {Component} from "react";
import './StatsSlide.scss';

import windArrow from '../..//assets/img/main-wind-arrow.png';
import noWindArrow from '../..//assets/img/main-no-wind-arrow.png';
import {RoundUnits} from "../../helpers/RoundUnits";

class StatsSlide extends Component {

    constructor(props) {
        super(props);
        let angle = this.parseDirection(this.props.direction);
        this.state = {
            direction: angle,
            onshore: angle >= 0 && angle < 160,
            speed: RoundUnits(this.props.speed),
            hour: this.props.hour,
            is_windy: this.props.speed >= 12,
            style: {
                transform: "rotate(" + (angle) + "deg)"
            }
        };
    }

    parseDirection = (direction) => {
        return Math.round(direction);
    }

    render() {
        return (
            <div
                className="stats-slide">

                {/* Wind Condition */}
                <h5>{this.state.hour}hs</h5>

                {/* Wind Arrow */}
                <div className="wind-arrow">
                    <img style={this.state.style} src={this.state.onshore ? windArrow : noWindArrow}
                         alt='viento-en-el-rio-fleacha'/>
                </div>

                {/* Wind Speed */}
                <h1 className={this.state.is_windy ? 'windy' : ''}>
                    <span className="wind-speed">{this.state.speed}</span>
                    <span className="units">kts</span>
                </h1>

            </div>
        );
    }
}

export default StatsSlide;