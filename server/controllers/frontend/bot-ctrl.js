const db = require("../../db")
const cryptoHelper = require('../helpers/crypto-helpers')

const createBot = async(req,res) =>{
    const botInfo = req.body
    const uid = res.locals.uid

    //TODO: Input Validation

    var dbBotObject = {
        name: botInfo.botName,
        brokerId: botInfo.broker,
        symbol: botInfo.symbol,
        active: true
    }

    // setting Trading Type and leverage types
    if(botInfo.spotSelected){
        dbBotObject.accountType =  "SPOT"
        dbBotObject.leverageType = null
        dbBotObject.leverageMultiplier = null
    }
    else{
        dbBotObject.accountType = "FUTURES"
        dbBotObject.botLeverage = Number(botInfo.leverageMultiplier)
        if(botInfo.isolatedSelected){
            dbBotObject.leverageType = "ISOLATED"
        }
        else{
            dbBotObject.leverageType = "CROSSED"
        }
    }

    // setting options for the type of Order
    if(botInfo.percentageSelected){
        dbBotObject.typeOfOrder = "FIXED_PERCENTAGE"
        dbBotObject.fixedPercentage = Number(botInfo.percentageAmount)/100
        dbBotObject.fixedDollarAmount = null
        
    }
    else{
        dbBotObject.typeOfOrder = "FIXED_DOLLAR_AMOUNT"
        dbBotObject.fixedDollarAmount = Number(botInfo.fixedDollarAmount)
        dbBotObject.fixedPercentage = null
    }

    

    // saving in Firestore
    try{
        var documentRef = db.collection('users').doc(uid).collection('bots').doc()

        // creating a token for use in authenticating requests from Trading View
        // AESEncrypt(userId + '_|_' botId) -> encodeBase64(userId + '_|_' + cipherText)
        var aesKey = await (await db.collection('users').doc(uid).collection('keys').doc('key').get()).data().value
        var clearText = uid + '_|_' + documentRef.id // userId + _|_ + botId
        var cipherText = cryptoHelper.encrypt(clearText,aesKey)
        var stringToEncode = uid + '_|_' + cipherText
        var encodedString = Buffer.from(stringToEncode).toString('base64')
        dbBotObject.outputEncodedString = encodedString
        dbBotObject.webhookUrl = process.env.WebhookUrl


        var dbResponse = await documentRef.create(dbBotObject)
        return res.status(201).json({
            success: false,
            id: documentRef.id
        })
    }
    catch(err){
        return res.status(500).json({
            success: false
        })
    }
}

const getBotById = async(req,res) =>{
    const uid = res.locals.uid
    const botId = req.params.botId

    var docRef = await db.collection('users').doc(uid).collection('bots').doc(botId).get()
    if(docRef.exists){
        var botData = docRef.data()
        return res.status(200).json({
            success: true,
            botData: botData
        })
    }
    else{
        return res.status(404).json({
            success: false
        })
    }
}


module.exports = {
    createBot,
    getBotById,
}