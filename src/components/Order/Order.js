import React from 'react';
import classes from './Order.module.css';

const order = (props) => {

    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]});
    }

    const output = ingredients.map((ig) => {
        return <span key={ig.name}
            style={{
                textTransform: 'capitalize',
                border: '1px solid #ccc',
                margin: '0 8px',
                padding: '5px',
                display: 'inline-block'
            }}
        >{ig.name} ({ig.amount})</span>;
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {output}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;
