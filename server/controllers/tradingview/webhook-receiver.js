const db = require('../../db')
const {
    checkTradingViewAuth
} = require('./auth')
const recieveTest = async(req,res) =>{
    const body = req.body
    // await db.collection('TradingViewReqs').doc().create(body)

    const encodedText = "MmdrdUtVamlVdG92ODJwRXZibjNffF9lZWI1MWY0ZjAwYmViYzFhNzEzNzg5Y2ZlMzJlMWVjODo0YzRlMjc3YmY5YjQ2MDIzM2JjOTYzYjcyMjgzNmY5M2Y0M2UyNTNjNWE4OWYxZWY1ZDdhODkyNTUxNjg3MGMwMDhiYjM4YmU4NTYzZDAyZTM3N2UwMQ=="
    var result = await checkTradingViewAuth(encodedText);
    //get encoded encrypted Data and side from the trading view request.

    //decode the data and get the user ID

    //check if user exists. Then get the decoding key from DB.

    //decode and check if the ID matches.

    // Get the Bot ID from te decrypted Data and check if the bot with similar ID exists.

    //If it does then execute the trade.

    return res.status(200).json({
        success: true,
        result: result
    })
}


module.exports = {
    recieveTest,
}



