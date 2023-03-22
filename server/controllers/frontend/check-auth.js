const admin = require('firebase-admin')

function checkAuth(req,res,next){
    if (req.headers.authtoken) {
    admin
        .auth()
        .verifyIdToken(req.headers.authtoken)
        .then((decodedToken) => {
            res.locals.uid = decodedToken.uid
            next()
        })
        .catch(() => {
            res.status(401).send('Unauthorized')
        });
    } else {
    res.status(401).send('Unauthorized')
    }
}

module.exports = checkAuth