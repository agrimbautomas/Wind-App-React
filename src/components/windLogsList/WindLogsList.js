import React from "react";
import WindLog from '../windLog/WindLog';
import SocketsService from "../../services/socketsService"
import './WindLogsList.scss';

const ENDPOINT = "http://wind-api.amalgama.co/1";
// const ENDPOINT = "http://localhost:3000/1";


class WindLogsList extends React.Component {

    constructor(props) {
        super(props);

        this.get_orders_url = ENDPOINT + "/stats";
        SocketsService.listenForNewOrders(this);

        this.state = {
            error: null,
            isLoaded: false,
            orders: []
        };
    }

    componentDidMount = () => {
        fetch(this.get_orders_url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        orders: result.response
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



    getWindLog = (order) => {
        return (
            <WindLog
                key={order.id}
                id={order.id}
                buyer={order.buyer}
                payment_id={order.payment_id}
                product={order.product}
                created_time={order.created_time}
                image={order.image}
                className={'A-donde-va'}
            />
        );
    }

    socketsCallback = (data) => {
        let order = JSON.parse(data.order)
        this.updateOrders(order)
    }

    updateOrders = (order) => {
        if (order.delivered)
            this.removeOrder(order);
        else
            this.addNewOrder(order);
    }

    getOrderPosition = (order) => {
        return this.state.orders.findIndex(function (element) {
            return element.id === order.id;
        });
    }

    render() {
        const {error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return this.renderOrdersView()
        }
    }



    renderOrdersView = () => {
        if (this.state.orders.length > 0)
            return this.displayOrders();
        else
            return this.displayPlaceholder();
    }

    displayOrders = () => {
        return (
            <div className="orders-container">
                {this.state.orders.map(order => this.getWindLog(order))}
            </div>
        )
    }

    displayPlaceholder = () => {
        return (
            <div className="orders-placeholder">
                <h1>No hay ordenes pendientes</h1>
            </div>
        )
    }

}

export default WindLogsList;
