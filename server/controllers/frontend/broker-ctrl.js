const db = require("../../db")


const getBrokersForUser = async(req,res) =>{
    const uid = res.locals.uid

    try{
        var brokerRef = await db.collection('users').doc(uid).collection('brokers')
        if(brokerRef.count() === 0){
            return res.status(200).json({
                result: []
            })
        }
        else{
            var brokersList = [];
            (await brokerRef.listDocuments()).forEach((broker)=> brokersList.push(broker.id));
            return res.status(200).json({
                result: brokersList
            })
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success: false
        })
    }

}

 module.exports = {
    getBrokersForUser
 }