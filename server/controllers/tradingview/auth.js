const db = require('../../db')
const cryptoHelper = require('../helpers/crypto-helpers')

const checkTradingViewAuth = async(encodedData) =>{
    const decodedData = Buffer.from(encodedData, 'base64').toString('utf8');
    const decodedUserId = decodedData.split("_|_")[0]
    const encryptedData = decodedData.split("_|_")[1]

    var userRef = db.collection('users').doc(decodedUserId)

    var user = await userRef.get();
    if(!user.exists){//user not found
        return errorHandler("User Doesn't Exist");
    }else{
        var decryptionKey = await (await userRef.collection('keys').doc('key').get()).data().value
        try{
            var decryptedText = cryptoHelper.decrypt(encryptedData, decryptionKey);
        }
        catch(err){
            return errorHandler("Error in Decrypting")
        }
        
        const decryptedUserId = decryptedText.split("_|_")[0]
        const botId = decryptedText.split("_|_")[1]

        if(decryptedUserId !== decodedUserId){
            return errorHandler("Malformed! Users don't match in decoded and decrypted!");
        }
        else{
            var bot = await userRef.collection('bots').doc(botId).get()
            if(!bot.exists){
                return errorHandler("User doesn't have a Bot with the specified ID!")
            }
            else{
                var botData = await bot.data()
                if(botData.active !== true){
                    return errorHandler("Bot isn't active!");
                }
                else{
                    return ({
                        success: true,
                        status: 200,
                        result: {
                            userId: decodedUserId,
                            botId
                        }
                    })
                }
            }
        }
    }
    
    
    
}
module.exports = {
    checkTradingViewAuth
}

function errorHandler(error){
    return ({
        success: false,
        status: 400,
        error: error
    })
}