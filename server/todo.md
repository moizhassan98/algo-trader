- add rate limit precautions in binance api.
- for auth from trading view we can have a new collection where document IDs can be same as user and has decrypting key for the hashed and encoded string that we recieve from the trading view. or encryption key as document id.
- Type supported in Trading View: BUY,SELL, BUY Close, SELL Close
- Possible db Structure
    {users}
    [user] email as id
        - name
        - email
        - activeAccount
        - emailVerified
        - identityProvider(EmailPassword/Google/Microsoft)
        - {keys} //generated on signup.
          [key]
                - publicKey
                - privateKey
        - {Brokers}
          [Broker]
                - broker Name (in enum, BINANCE,BYBIT, etc.)
                - broker API Key
                - broker API Secret
                - Types of Trading supported (MARGIN, FUTURES, SPOT)
                - Asset of MARGIN, FUTURES, SPOT
        - {BOTS}
          [Bot] // random
                - bot name
                - active
                - broker ID (tells which broker to execute the trades on. to get the info of broker.) maybe also add api key to reduce reads.
                - bot account type (SPOT,MARGIN,FUTURES)
                - bot symbol (BTCUSDT, etc.) // multi symbol support maybe in future.
                - bot leverage (if MARGIN, FUTURES)
                - leverage type (CROSS,ISOLATED)
                - type of Order (fixed Dollar, fixed percentage, quantity order)
                - fixedDollar,fixedPercentage,quantityOrder
                - Trading View webhook url + data
                - {TRADES}
                  [Trade]
                        - binance details all.
                        - closed (true,false to indicate if the trade was closed or is it in effect)
                - {LOGS}
                  [Log]
                        - all request recieved.

    {brokerSymbols}
    [brokerSymbol] // broker name as ID
        - {marginSymbols}
        - {spotSymbols}
        - {futuresSymbols}

- Important ID Info
    - BrokerNames as ID
    - userEmails as userID // don;t do it.

- Flow
    signup form -> [get name, email] -> create user from email ID -> create public private key -> Store in DB -> activate account on email verification

    -> After Account start Ask for Broker Connection -> fill in broker info on Brokers Collection

    -> Creating a BOT -> check if broker connected -> connect Broker flow if not connected -> otherwise -> bot name -> Broker selection from already available brokers -> bot symbol choose -> Account type choose (SPOT,FUTURES) -> if FUTURES choose leverage and leverage type -> then continue for both type of trade (Fixed Dollar,Percentage,Quantity) -> encryptWithPublicKey(`userId+_|_+botID`) -> encode64(`userId+_|_+encryptedData`) -> save in data fireld of the bot and display to user to input in webhook url and data in body.

    -> in TV Data field in body {
        side: "BUY"|"SELL"|"BUY CLOSE"|"SELL CLOSE",// this would be sent in alert not in body. We can define what are the signal. BUY,SELL,Close ALL
        data: encodedEncryptedData
    } -> request Recieved on Server -> get userID, publicKey, encryptedData -> check email exist otherwise reject -> check if public key exist on that account otherwise reject -> get private key and decrypt the encrypted Data -> check if email from decrypted data is same -> check of the bot exist with same bot ID ->  get side from the Trading View request (BUY,SELL, etc.) -> using Bot info execute the trade.

- Change the Advanced Function relying on firestore for symbols.
- start/stop bot.