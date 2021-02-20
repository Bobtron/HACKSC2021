'use strict';
// const RippleAPI = require('ripple-lib').RippleAPI;

// const api = new RippleAPI({
//     server: 'wss://s1.ripple.com' // Public rippled server
// });

// Address: rBemDgBYvHhGXcuJBMMatQLEAaRKgBc32g
// Secret: sp13b5jQ9taDGDFfWM1ijoJFUgVt3
// Balance: 1,000 XRP

var api = new ripple.RippleAPI({server:'wss://s.altnet.rippletest.net:51233'});

// api.connect().then(() => {
//     /* begin custom code ------------------------------------ */
//     const myAddress = 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn';
//
//     console.log('getting account info for', myAddress);
//     return api.getAccountInfo(myAddress);
//
// }).then(info => {
//     console.log(info);
//     console.log('getAccountInfo done');
//
//     /* end custom code -------------------------------------- */
// }).then(() => {
//     return api.disconnect();
// }).then(() => {
//     console.log('done and disconnected.');
// }).catch(console.error);


function getAccountInfo(){
    api.connect().then(() => {
        /* begin custom code ------------------------------------ */
        // const myAddress = 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn';
        const myAddress = 'rBemDgBYvHhGXcuJBMMatQLEAaRKgBc32g';

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
}
