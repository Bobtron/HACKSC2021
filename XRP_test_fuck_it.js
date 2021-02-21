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
    // MY ADDRESS 1
    const ADDRESS_1 = 'rpSDxPwUyUzyFxAyVGwGt1hoJGC8neLZhF'
    const SECRET_1 = "sh7ePwac3g2Py36YnnzTqJYxrEJpR"
    // YOUR ADDRESS 2
    const ADDRESS_2 = "rBemDgBYvHhGXcuJBMMatQLEAaRKgBc32g"

    const instructions = {maxLedgerVersionOffset: 5}
    const currency = 'XRP'
    const amount = '0.01'

    const payment = {
        source: {
            address: ADDRESS_1,
            maxAmount: {
            value: amount,
            currency: currency
            }
        },
        
        destination: {
            address: ADDRESS_2,
            amount: {
            value: amount,
            currency: currency
            }
        }
    }
    const api = new RippleAPI({
    //server: 'wss://s1.ripple.com'                 // MAINNET
    server: 'wss://s.altnet.rippletest.net:51233'   // TESTNET
    })
    api.connect().then(() => {
    console.log('Connected...')
    api.preparePayment(ADDRESS_1, payment, instructions).then(prepared => {
        const {signedTransaction, id} = api.sign(prepared.txJSON, SECRET_1)
        console.log(id)
        api.submit(signedTransaction).then(result => {
        console.log(JSON.stringify(result, null, 2))
        api.disconnect()
        })
    })
    }).catch(console.error)



}).then(() => {
    return api.disconnect();
  }).catch(console.error);