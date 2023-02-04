# Official API Docs
    - https://binance-docs.github.io/apidocs/spot/en/
    - https://binance.github.io/binance-api-swagger/

# Connector (@binance/connector)
    - https://github.com/binance/binance-connector-node
    - https://binance.github.io/binance-connector-node/

# testnets
    - https://testnet.binancefuture.com/
    - https://testnet.binance.vision/ (spot)
    - https://dev.binance.vision/t/binance-testnet-environments/99/2
# Binance HTTP Codes
- HTTP 4XX return codes are used for malformed requests; the issue is on the sender's side.
- HTTP 403 return code is used when the WAF Limit (Web Application Firewall) has been violated.
- HTTP 409 return code is used when a cancelReplace order partially succeeds. (e.g. if the cancellation of the order fails but the new order placement succeeds.)
- HTTP 429 return code is used when breaking a request rate limit.
- HTTP 418 return code is used when an IP has been auto-banned for continuing to send requests after receiving 429 codes.
- HTTP 5XX return codes are used for internal errors; the issue is on Binance's side. It is important to NOT treat this as a failure operation; the execution status is UNKNOWN and could have been a success.
