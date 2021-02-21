const RippleAPI = require('ripple-lib').RippleAPI;
// TESTNET ADDRESS 1
const ADDRESS_1 = 'rw3VB5Q9cZAPopdXmZssPFCfHfcTssd9ZQ'
const SECRET_1 = "sh7ePwac3g2Py36YnnzTqJYxrEJpR"
// TESTNET ADDRESS 2
const ADDRESS_2 = "rpSDxPwUyUzyFxAyVGwGt1hoJGC8neLZhF"
const instructions = {maxLedgerVersionOffset: 5};
const currency = 'XRP'
const amount = '900'
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
});
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