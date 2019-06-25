import React, {Component} from "react";
import './OrderItem.scss';

class OrderItem extends Component {
    render() {
        return (
            <div
                className="order-item smooth-transition" onClick={() => this.props.onClick()}>
                <span className="created-time">{this.props.created_time}</span>
                <h1>{this.props.buyer}</h1>
                <h3>{this.props.payment_id}</h3>
                <img src={this.props.image} alt={this.props.product} />
                <span className='id-hidden'>{this.props.id}</span>
                <h2>{this.props.product}</h2>
                <button>
                    <span></span>
                    Entregada
                </button>
            </div>
        );
    }
}

export default OrderItem;