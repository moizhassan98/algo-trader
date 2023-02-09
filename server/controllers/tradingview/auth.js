const db = require('../../db')
const cryptoHelper = require('../helpers/crypto-helpers')

const checkTradingViewAuth = async(encodedData) =>{
    const decodedData = Buffer.from(encodedData, 'base64').toString('utf8');
    const decodedUserId = decodedData.split("_|_")[0]
    const encryptedData = decodedData.split("_|_")[1]

    var userRef = db.collection('users').doc(decodedUserId)

    var user = await userRef.get();
    if(!user.exists){//user not found
        console.log("USER DOESN'T EXIST")
        return errorHandler();
    }else{
        console.log("USER EXISTS")
        var decryptionKey = await (await userRef.collection('keys').doc('key').get()).data().value
        var decryptedText = cryptoHelper.decrypt(encryptedData, decryptionKey);
        console.log("decrypted Data: ",decryptedText)

        const decryptedUserId = decryptedText.split("_|_")[0]
        const botId = decryptedText.split("_|_")[1]

        if(decryptedUserId !== decodedUserId){
            console.log("USERS DON'T MATCH");
            return errorHandler();
        }
        else{
            console.log("USERS MATCH");
            var bot = await userRef.collection('bots').doc(botId).get()
            if(!bot.exists){
                console.log("BOT DON'T MATCH")
                return errorHandler()
            }
            else{
                console.log("BOT MATCH")
                var botData = await bot.data()
                return botData
            }
        }
    }
    
    
    
}
module.exports = {
    checkTradingViewAuth
}
//ZWViNTFmNGYwMGJlYmMxYTcxMzc4OWNmZTMyZTFlYzg6NGM0ZTI3N2JmOWI0NjAyMzNiYzk2M2I3MjI4MzZmOTNmNDNlMjUzYzVhODlmMWVmNWQ3YTg5MjU1MTY4NzBjMDA4YmIzOGJlODU2M2QwMmUzNzdlMDE=


function errorHandler(res){
    return ({
        success: false,
    })
}