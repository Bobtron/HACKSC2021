ripple = require('ripple-lib')
api = new ripple.RippleAPI({server: 'wss://testnet.xrpl-labs.com'})
api.connect()

// Continuing after connecting to the API
async function doPrepare() {
    const sender = "rpSDxPwUyUzyFxAyVGwGt1hoJGC8neLZhF"
    const preparedTx = await api.prepareTransaction({
      "TransactionType": "Payment",
      "Account": sender,
      "Amount": api.xrpToDrops("22"), // Same as "Amount": "22000000"
      "Destination": "rBemDgBYvHhGXcuJBMMatQLEAaRKgBc32g"
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
txJSON = JSON.stringify(doPrepare())

// Continuing from the previous step...
const response = api.sign(txJSON, "sh7ePwac3g2Py36YnnzTqJYxrEJpR")
const txID = response.id
console.log("Identifying hash:", txID)
const txBlob = response.signedTransaction
console.log("Signed blob:", txBlob)

// use txBlob from the previous example
async function doSubmit(txBlob) {
    const latestLedgerVersion = await api.getLedgerVersion()
  
    const result = await api.submit(txBlob)
  
    console.log("Tentative result code:", result.resultCode)
    console.log("Tentative result message:", result.resultMessage)
  
    // Return the earliest ledger index this transaction could appear in
    // as a result of this submission, which is the first one after the
    // validated ledger at time of submission.
    return latestLedgerVersion + 1
  }
  const earliestLedgerVersion = doSubmit(txBlob)

  api.on('ledger', ledger => {
    console.log("Ledger version", ledger.ledgerVersion, "was validated.")
    if (ledger.ledgerVersion > maxLedgerVersion) {
      console.log("If the transaction hasn't succeeded by now, it's expired")
    }
  })

  // Continues from previous examples.
// earliestLedgerVersion was noted when the transaction was submitted.
// txID was noted when the transaction was signed.
/*try {
    tx = await api.getTransaction(txID, {minLedgerVersion: earliestLedgerVersion})
    console.log("Transaction result:", tx.outcome.result)
    console.log("Balance changes:", JSON.stringify(tx.outcome.balanceChanges))
  } catch(error) {
    console.log("Couldn't get transaction outcome:", error)
  }*/