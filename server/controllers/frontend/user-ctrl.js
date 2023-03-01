const db = require("../../db")
const cryptoHelper = require('../helpers/crypto-helpers')


const createUser = async(req,res) =>{
    const {email, uid, emailVerified} = req.body
    const authUid = res.locals.uid
    //TODO: Input Validation!
    //TODO: Save email in res.locals also from decodedToken and check if this is same as the email in input.
    if(authUid !== uid){
        return res.status(400).json({
            success: false,
        })
    }
    else{
        var userCreatedUnix = Date.now()
        var userCreated = new Date(userCreatedUnix).toISOString()
        var dbObject = {
            email: email,
            emailVerified: emailVerified,
            userCreatedUnix: userCreatedUnix,
            userCreated:userCreated,
        }
        db.collection('users').doc(uid).set(dbObject)
            .then((dbResponse)=>{
                var aesKey = cryptoHelper.generateKey()
                db.collection('users').doc(uid).collection('keys').doc('key').set({
                    value: aesKey
                })
                .then((keyCreationResponse)=>{
                    return res.status(201).json({
                        success: true
                    })
                })
                .catch((err)=>{
                    return res.status(500).json({
                        success: true,
                    })
                })
            })
            .catch((err)=>{
                //TODO: Logger
                return res.status(500).json({
                    success: false
                })
            })
    }

}

// checks if the user already exists or not from uid from res.locals
const userExists = async(req,res)=>{
    const uid = res.locals.uid

    var docRef = await db.collection('users').doc(uid).get()
    if(docRef.exists){
        return res.status(200).json({
            success: true,
            exists: true
        })
    }
    else{
        return res.status(200).json({
            success: false,
            exists: false
        })
    }
}

module.exports = {
    createUser,
    userExists,
}