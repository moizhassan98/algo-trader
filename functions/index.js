const functions = require("firebase-functions");
const firestore = require('firebase-admin/firestore')
const firebase = require('./firebase');
const axios = require('axios')
const db = firestore.getFirestore()
const cors = require("cors")({ origin: true });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.binanceFuturesSymbols = functions.region('europe-west1').https.onRequest((req,res)=>{
   
        axios.get('https://fapi.binance.com/fapi/v1/exchangeInfo',{
            headers:{
                'host': 'fapi.binance.com'
            }
        })
        .then((response)=>{
            var symbols = response.data.symbols

            symbols.map((symbol)=>{
                if(symbol.contractType === "PERPETUAL" && symbol.status === "TRADING"){
                    let symbolData = {
                        pair: symbol.pair,
                        baseAsset: symbol.baseAsset,
                        quoteAsset: symbol.quoteAsset,
                        marginAsset: symbol.marginAsset,
                        quantityPrecision: symbol.quantityPrecision,
                        baseAssetPrecision: symbol.baseAssetPrecision,
                        quotePrecision: symbol.quotePrecision, 
                    }
                    db
                        .collection("binanceFuturesSymbols")
                        .doc(symbol.symbol)
                        .set(symbolData)
                        .then(()=>{
                            functions.logger.info(`Added: ${symbol.symbol}`, {structuredData: true});
                        })
                        .catch((e)=>{
                            functions.logger.error(`Error: ${symbol.symbol}`, {structuredData: true});
                        })

                }
            })
            
            return res.status(200).json({
                success:true
            })
        })
        .catch((err) =>{
            console.log(err)
            return res.status(500).json({
                success: false,
                error: err,
            })
        });
    
    
})
