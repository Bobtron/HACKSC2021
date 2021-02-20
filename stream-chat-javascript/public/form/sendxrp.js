var api = new ripple.RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'})

async function doPrepare() {
    const sender = "rBemDgBYvHhGXcuJBMMatQLEAaRKgBc32g"
    const preparedTx = await api.prepareTransaction({
        "TransactionType": "Payment",
        "Account": sender,
        "Amount": api.xrpToDrops("22"), // Same as "Amount": "22000000"
        "Destination": "rUCzEr6jrEyMpjhs4wSdQdz4g8Y382NxfM"
    }, {
        // Expire this transaction if it doesn't execute within ~5 minutes:
        "maxLedgerVersionOffset": 75
    })
    const maxLedgerVersion = preparedTx.instructions.maxLedgerVersion
    console.log("Prepared transaction instructions:", preparedTx.txJSON)
    console.log("Transaction cost:", preparedTx.instructions.fee, "XRP")
    console.log("Transaction expires after ledger:", maxLedgerVersion)
    return preparedTx.txJSON
}
//txJSON = JSON.stringify(doPrepare())

function sendXRP(){
    api.connect().then(() => {
        /* begin custom code ------------------------------------ */
        const myAddress = 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn';

        console.log('getting account info for', myAddress);

        // var txJSON = JSON.stringify(doPrepare());

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

