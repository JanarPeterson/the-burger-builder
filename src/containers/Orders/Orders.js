import React, {Component} from 'react';
import Order from "../../components/Order/Order";
import {connect} from "react-redux";
import axios from '../../axios-order';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions';
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render () {
        let orders = <Spinner />;
        if ( !this.props.loading ) {
            orders = this.props.orders.map( order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.totalPrice} />
            ) )
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders
    }
};

const mapDispachToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
};

export default connect(mapStateToProps, mapDispachToProps)(withErrorHandler(Orders, axios));