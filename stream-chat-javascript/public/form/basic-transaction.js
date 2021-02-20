'use strict';

var api = new ripple.RippleAPI({server:'wss://s.altnet.rippletest.net:51233'});

function getAccountInfo(){
    api.connect().then(() => {
        /* begin custom code ------------------------------------ */
        // const myAddress = 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn';
        // const myAddress = 'rBemDgBYvHhGXcuJBMMatQLEAaRKgBc32g';
        //
        // console.log('getting account info for', myAddress);
        // return api.getAccountInfo(myAddress);

        const sender = "rBemDgBYvHhGXcuJBMMatQLEAaRKgBc32g";
        const preparedTx = api.prepareTransaction({
            "TransactionType": "Payment",
            "Account": sender,
            "Amount": api.xrpToDrops("220"), // Same as "Amount": "22000000"
            "Destination": "rUCzEr6jrEyMpjhs4wSdQdz4g8Y382NxfM"
        }, {
            // Expire this transaction if it doesn't execute within ~5 minutes:
            "maxLedgerVersionOffset": 75
        });
        const maxLedgerVersion = preparedTx.instructions.maxLedgerVersion;
        console.log("Prepared transaction instructions:", preparedTx.txJSON);
        console.log("Transaction cost:", preparedTx.instructions.fee, "XRP");
        console.log("Transaction expires after ledger:", maxLedgerVersion)
        return JSON.stringify(preparedTx.txJSON)

    }).then(txJSON => {
        // console.log(info);
        // console.log('getAccountInfo done');

        const response = api.sign(txJSON, "sp13b5jQ9taDGDFfWM1ijoJFUgVt3");
        const txID = response.id;
        console.log("Identifying hash:", txID);
        const txBlob = response.signedTransaction;
        console.log("Signed blob:", txBlob);
        return txBlob

        /* end custom code -------------------------------------- */
    }).then((txBlob) => {
        // return api.disconnect();
        const latestLedgerVersion = api.getLedgerVersion()

        const result = api.submit(txBlob)

        console.log("Tentative result code:", result.resultCode)
        console.log("Tentative result message:", result.resultMessage)

        // Return the earliest ledger index this transaction could appear in
        // as a result of this submission, which is the first one after the
        // validated ledger at time of submission.
        return latestLedgerVersion + 1
    }).then(() => {
        console.log('done and disconnected.');
    }).catch(console.error);
}

getAccountInfo()

// ripple = require('ripple-lib')
// api = new ripple.RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'})
// api.connect();
//
// // Continuing after connecting to the API
// async function doPrepare() {
//     const sender = "rBemDgBYvHhGXcuJBMMatQLEAaRKgBc32g";
//     const preparedTx = await api.prepareTransaction({
//         "TransactionType": "Payment",
//         "Account": sender,
//         "Amount": api.xrpToDrops("220"), // Same as "Amount": "22000000"
//         "Destination": "rUCzEr6jrEyMpjhs4wSdQdz4g8Y382NxfM"
//     }, {
//         // Expire this transaction if it doesn't execute within ~5 minutes:
//         "maxLedgerVersionOffset": 75
//     });
//     const maxLedgerVersion = preparedTx.instructions.maxLedgerVersion;
//     console.log("Prepared transaction instructions:", preparedTx.txJSON);
//     console.log("Transaction cost:", preparedTx.instructions.fee, "XRP");
//     console.log("Transaction expires after ledger:", maxLedgerVersion)
//     return preparedTx.txJSON
// }
// txJSON = JSON.stringify(doPrepare());
//
// // Continuing from the previous step...
// const response = api.sign(txJSON, "sp13b5jQ9taDGDFfWM1ijoJFUgVt3");
// const txID = response.id;
// console.log("Identifying hash:", txID);
// const txBlob = response.signedTransaction;
// console.log("Signed blob:", txBlob);
//
// // use txBlob from the previous example
// async function doSubmit(txBlob) {
//     const latestLedgerVersion = await api.getLedgerVersion()
//
//     const result = await api.submit(txBlob)
//
//     console.log("Tentative result code:", result.resultCode)
//     console.log("Tentative result message:", result.resultMessage)
//
//     // Return the earliest ledger index this transaction could appear in
//     // as a result of this submission, which is the first one after the
//     // validated ledger at time of submission.
//     return latestLedgerVersion + 1
// }
// const earliestLedgerVersion = doSubmit(txBlob)
//
// api.on('ledger', ledger => {
//     console.log("Ledger version", ledger.ledgerVersion, "was validated.")
//     if (ledger.ledgerVersion > maxLedgerVersion) {
//         console.log("If the transaction hasn't succeeded by now, it's expired")
//     }
// })

