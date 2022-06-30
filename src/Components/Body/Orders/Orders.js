import { useEffect } from "react";
import { connect } from "react-redux";
import { Row } from "reactstrap";
import { asyncFetchOrders } from "../../../redux/ActionCreator";
import Spinner from '../../Spinner/Spinner.js';
import OrderDetail from "./orderDetail";

const mapStateToProps = state => {
    return {
        orders: state.state.orders,
        orderLoading: state.state.ordersLoading,
        ordersLoadError: state.state.ordersLoadError,
        token: state.state.auth.token,
        userId: state.state.auth.userId,
    }
}
const mapDispatchToProps = dispatchEvent => { return { fetchOrders: (token, userId) => dispatchEvent(asyncFetchOrders(token, userId)) } }

const Orders = props => {
    useEffect(() => {
        props.fetchOrders(props.token, props.userId);
    });

    if (props.orderLoading) return (<Spinner />);
    if (props.ordersLoadError) return (<h1 className="display-4 text-danger text-center my-5">Orders Load Failed<br />{props.ordersLoadError}</h1>);
    if (!props.orders.length) return (<h1 className="display-4 text-danger text-center my-5">You have no Orders</h1>)
    const orderJSX = props.orders.map(order => {
        return (<OrderDetail order={order} key={order.id} />)
    })
    // debugger
    return (
        <>
            <div className="display-4 text-danger text-center mb-3 fw-bold">All Orders</div>
            <Row>
                {orderJSX}
            </Row>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);