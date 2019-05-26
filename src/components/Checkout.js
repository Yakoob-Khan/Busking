import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const fromDollarToCent = amount => amount * 100;
const PAYMENT_SERVER_URL = 'http://localhost:9090/api/payment';
const CURRENCY = 'USD';
const STRIPE_KEY = 'pk_test_cmSKgd5oAKJCXkLZWdG9iPkY00gDJLz3VP';


const onToken = (amount, description) => token => axios.post(PAYMENT_SERVER_URL,
  {
    description,
    source: token.id,
    currency: 'USD',
    amount: fromDollarToCent(amount),
  })
  .catch(console.log('payment error'));

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    email="true"
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_KEY}
    image="https://blog.iconfactory.com/wp-content/uploads/2016/05/OlliesTipJar.png"
    panelLabel="Tip"
    label="Give a Tip"
  >
    <button id="stripe-checkout-button" className="event-button" type="button">
      {/* <img src="./../src/assets/bowl.svg" alt="send tip" /> */}
      <p>Send Tip</p>
    </button>
  </StripeCheckout>
);

export default Checkout;
