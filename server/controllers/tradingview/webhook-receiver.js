const db = require('../../db')

const recieveTest = async(req,res) =>{
    const body = req.body
    await db.collection('TradingViewReqs').doc().create(body)
    return res.status(200).json({
        success: true
    })
}


module.exports = {
    recieveTest,
}



