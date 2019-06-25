import React from "react";
import OrderItem from '../orderItem/OrderItem';
import SocketsService from "../../services/socketsService"
import './OrdersList.scss';

const ENDPOINT = "https://qr-admin.amalgama.co/1";
// const ENDPOINT = "http://localhost:3000/1";


class OrdersList extends React.Component {

    constructor(props) {
        super(props);

        this.get_orders_url = ENDPOINT + "/orders/not_delivered";
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

    markAsDeliveredUrl = (orderId) => {
        return ENDPOINT + "/orders/" + orderId + "/mark_as_delivered"
    }

    getOrderItem = (order) => {
        return (
            <OrderItem
                key={order.id}
                id={order.id}
                buyer={order.buyer}
                payment_id={order.payment_id}
                product={order.product}
                created_time={order.created_time}
                image={order.image}
                onClick={() => this.markAsDelivered(order)}
                className={'A-donde-va'}
            />
        );
    }

    markAsDelivered = (order) => {
        fetch(this.markAsDeliveredUrl(order.id), {method: 'PATCH'})
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('markAsDelivered', result)
                },
                (error) => {
                    this.setState({error});
                }
            )
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

    addNewOrder = (order) => {
        let orderPosition = this.getOrderPosition(order);
        console.log('addNewOrder', orderPosition);

        this.state.orders.push(order);
        this.updateOrdersState();
    }

    removeOrder = (order) => {
        let orderPosition = this.getOrderPosition(order);
        console.log('removeOrder', orderPosition);
        this.state.orders.splice(orderPosition, 1);
        this.updateOrdersState();
    }

    updateOrdersState = () => {
        this.setState({
            orders: this.state.orders
        });
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
                {this.state.orders.map(order => this.getOrderItem(order))}
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

export default OrdersList;
