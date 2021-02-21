const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  server: 'wss://testnet.xrpl-labs.com' // Public rippled server hosted by Ripple, Inc.
});
api.on('error', (errorCode, errorMessage) => {
  console.log(errorCode + ': ' + errorMessage);
});
api.on('connected', () => {
  console.log('connected');
});
api.on('disconnected', (code) => {
  // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server
  // will be 1000 if this was normal closure
  console.log('disconnected, code:', code);
});
api.connect().then(() => {
  /* insert code here */

    const my_addr = 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59';
    const rec_addr = 'rMH4UxPrbuMa1spCBR98hLLyNJp4d8p4tM';
    const payment = {
    "source": {
        "address": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
        "maxAmount": {
        "value": "0.01",
        "currency": "USD",
        "counterparty": "rMH4UxPrbuMa1spCBR98hLLyNJp4d8p4tM"
        }
    },
    "destination": {
        "address": "rpZc4mVfWUif9CRoHRKKcmhu1nx2xktxBo",
        "amount": {
        "value": "0.01",
        "currency": "USD",
        "counterparty": "rMH4UxPrbuMa1spCBR98hLLyNJp4d8p4tM"
        }
    }
    };
    return api.preparePayment(address, payment).then(prepared => {
        /* ... */
    }).catch(error => {
        /* ... as with all prepare* methods, use a Promise catch block to handle errors ... */\
        console.log("errooooooooooooooooooor")
    })






}).then(() => {
    return api.disconnect();
  }).catch(console.error);