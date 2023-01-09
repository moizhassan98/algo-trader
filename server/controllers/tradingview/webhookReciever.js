

const recieveTest = async(req,res) =>{
    return res.status(200).json({
        success: true,
    })
}


module.exports = {
    recieveTest,
}