import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-order';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as orderBurgerActions from '../../../store/actions';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'Cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false
    };

    checkVality = (value, rules) => {
        let valid = true;

        if (rules.required) {
            valid = value.trim() !== '' && valid;
        }
        if (rules.minLength) {
            valid = value.trim().length >= rules.minLength && valid;
        }
        if (rules.maxLength) {
            valid = value.trim().length <= rules.maxLength && valid;
        }

        return valid;
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const formValues = {};
        for (let elementId in this.state.orderForm) {
            formValues[elementId] = this.state.orderForm[elementId].value;
        }

        const order = {
            ingredients: this.props.ings,
            totalPrice: this.props.price,
            orderData: formValues
        };

        this.props.onOrderBurger(order);
    };

    inputChangedHandler = (event, id) => {
        const updatedFormData = {
            ...this.state.orderForm
        };

        const updatedElement = {
            ...updatedFormData[id]
        };

        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkVality(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;
        updatedFormData[id] = updatedElement;

        let formIsValid = true;
        for (let id in this.state.orderForm) {
            formIsValid = this.state.orderForm[id].valid && formIsValid;
        }

        this.setState({orderForm: updatedFormData, formIsValid});
    };

    render() {
        const formElementArray = [];

        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(el => (
                    <Input
                        key={el.id}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                        changed={(event) => this.inputChangedHandler(event, el.id)}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = (<Spinner/>);
        }

        return (

            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(orderBurgerActions.purchaseBurger(orderData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));