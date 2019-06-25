import React, {Component} from "react";
import './WindLog.scss';

class WindLog extends Component {
    render() {
        return (
            <div
                className="order-item smooth-transition" onClick={() => this.props.onClick()}>
                <span className="created-time">{this.props.registered_date}</span>
                <h1>{this.props.speed}kts</h1>
                <h3>{this.props.gust}kts</h3>
                <span className='id-hidden'>{this.props.id}</span>
                <h2>{this.props.direction}°</h2>
            </div>
        );
    }
}

export default WindLog;