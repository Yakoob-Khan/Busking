import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const fromDollarToCent = amount => amount * 100;
// const PAYMENT_SERVER_URL = 'http://localhost:9090/api/payment';
const PAYMENT_SERVER_URL = 'https://busking-api.herokuapp.com/api/payment';
const CURRENCY = 'USD';
const STRIPE_KEY = 'pk_test_cmSKgd5oAKJCXkLZWdG9iPkY00gDJLz3VP';

const onToken = (amount, description, stripeId) => token => axios.post(PAYMENT_SERVER_URL,
  {
    description,
    source: token.id,
    currency: 'USD',
    amount: fromDollarToCent(amount),
    stripeId,
  });

const Checkout = ({
  name, description, amount, stripeId, eventCreatorImage,
}) => {
  return (
    <StripeCheckout
      name={name}
      email="true"
      description={description}
      amount={fromDollarToCent(amount)}
      token={onToken(amount, description, stripeId)}
      currency={CURRENCY}
      stripeKey={STRIPE_KEY}
      image={eventCreatorImage}
      panelLabel="Tip"
      label="Give a Tip"
    >
      <button id="stripe-checkout-button" className="event-button" type="button">
        <p>Send Tip</p>
      </button>
    </StripeCheckout>
  );
};

export default Checkout;
