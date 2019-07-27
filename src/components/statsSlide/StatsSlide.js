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

    parseDirection = (direction) => {
        return Math.round(direction);
    }

    getCondition = () => {
        var angle = this.state.direction;
        return (angle > 0 && angle < 160) ? "Onshore" : "Offshore"
    }

    render() {
        return (

            <div className="stats-container">
                <div
                    className="stats-slide">


                    {/* Wind Condition */}
                    <h6 className={this.getCondition()}>{this.getCondition()} ({this.state.hour}hs)</h6>

                    {/* Wind Arrow */}
                    <div className="wind-arrow" style={this.state.style}>
                        <img src={windArrow}/>
                    </div>

                    {/* Wind Speed */}
                    <h1 className={this.state.is_windy ? 'windy' : ''}>
                        <span className="wind-speed">{this.state.speed} kts</span>
                    </h1>

                    <span className='id-hidden'>{this.props.id}</span>

                </div>
            </div>
        );
    }
}

export default StatsSlide;