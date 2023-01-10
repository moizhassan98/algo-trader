const { Spot } = require('@binance/connector')
const db = require('../../../db')


const getBinanceConnector = async(userid) =>{
    var Api = await (await db.collection('users').doc(userid).get()).data()
    if(!Api){
        return {
            success: false,
            status: 404,
            message: "Unable to get API for User!"
        }
    }
    else{
        if(!Api.apiKey || !Api.apiSecret){
            return {
                success: false,
                status: 404,
                message: "Unable to find apiKey or apiSecret in API object."
            }
        }
        else{
            const client = new Spot(Api.apiKey, Api.apiSecret)
            return client;
        }

    }
    
}

module.exports =  getBinanceConnector;