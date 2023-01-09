const db = require('../../db')

const recieveTest = async(req,res) =>{
    var result = await (await db.collection('test').doc('TChPqZo6dQztnTYTAk2B').get()).data();
    console.log(result);
    return res.status(200).json({
        success: true,
        message: result,
    })
}


module.exports = {
    recieveTest,
}

/// Not used Outside of the File or not API

