const db = require('../../db')

const getBotData = async(userId,botId) =>{
    var botData = await (await db.collection('users').doc(userId).collection('bots').doc(botId).get()).data()
    return botData
}

const getBrokerApiKeys = async(userId,brokerId)=>{
    var brokerRef = await db.collection('users').doc(userId).collection('brokers').doc(brokerId).get()
    if(!brokerRef.exists){
        return ({
            apiKey: -1,
            apiSecret: -1
        })
    }else{
        var apiKeys = await brokerRef.data();
        return apiKeys;
    }
}

module.exports = {
    getBotData,
    getBrokerApiKeys
}