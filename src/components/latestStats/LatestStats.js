import React, {Component} from "react";
import './LatestStats.scss';

class LatestStats extends Component {


    constructor(props) {
        super(props);
        this.state = {
            direction: this.parseDirection(this.props.direction),
            speed: this.props.speed,
            gust: this.props.gust,
            messure: 'kts',
            in_knots: true

        };
        //this.fadeImage = this.fadeImage.click(this);
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
            in_knots: false
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

    kmToKn = (kms) => {
        return Number((kms / 1.852).toFixed(1))
    }


    knToKm = (knots) => {
        return Number((knots * 1.852).toFixed(1))
    }

    parseDirection = (direction) => {
        return Math.round(direction);
    }

    getDirection = (angle) => {
        // var directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"]
        var directions = ['Norte', 'Noreste', 'Este', 'Sudeste', 'Sur', 'Sudoeste', 'Oeste', 'Noroeste'];

        return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
    }


    render() {
        return (

            <div className="stats-container">
                <div
                    className="latest-stats-item" onClick={this.fadeImage}>

                    <h2>
                        {this.getDirection(this.state.direction)}
                        <span>({this.state.direction}°)</span>
                    </h2>

                    <h1>
                        <span>Viento</span>
                        {this.state.speed} {this.state.messure}
                    </h1>

                    <h3>
                        <span>Ráfaga</span>
                        {this.state.gust} {this.state.messure}
                    </h3>
                    <span className='id-hidden'>{this.props.id}</span>

                </div>
            </div>
        );
    }
}

export default LatestStats;