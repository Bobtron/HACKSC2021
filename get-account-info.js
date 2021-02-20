'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  server: 'wss://testnet.xrpl-labs.com'
});
api.connect().then(() => {
  /* begin custom code ------------------------------------ */
  const myAddress = 'rpSDxPwUyUzyFxAyVGwGt1hoJGC8neLZhF';

  console.log('getting account info for', myAddress);
  return api.getAccountInfo(myAddress);

}).then(info => {
  console.log(info);
  console.log('getAccountInfo done');

  /* end custom code -------------------------------------- */
}).then(() => {
  return api.disconnect();
}).then(() => {
  console.log('done and disconnected.');
}).catch(console.error);