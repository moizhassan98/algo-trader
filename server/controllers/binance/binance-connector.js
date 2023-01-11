const { Spot } = require('@binance/connector')
const db = require('../../db')


const getBinanceConnector = async(userid) =>{
    console.log("API::::",(await db.collection('users').doc(userid)))
    var Api = await (await db.collection('users').doc(userid).get()).data()
    console.log("API::::",Api)
    if(!Api){
        return false
    }
    else{
        if(!Api.apiKey || !Api.apiSecret){
            return false
        }
        else{
            const client = new Spot(Api.apiKey, Api.apiSecret)
            return client;
        }
    }
}

module.exports =  getBinanceConnector;