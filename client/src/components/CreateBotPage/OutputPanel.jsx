import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Col, Container, Input, Row, Spinner, Label, Button } from "reactstrap"
import api from "../../apis"
import Panel from "../BasicUIElements/Panel"


const OutputPanel = (props) =>{
    //props:  botId
    const {authToken} = useSelector((state)=> state.auth)

    const [loading, setLoading] = useState(true)
    const [botData, setBotData] = useState({
        name: '',
        outputEncodedString: '',
        webhookUrl: ''
    })
    const [buyMessage, setBuyMessage] = useState('')
    const [sellMessage, setSellMessage] = useState('')

    useEffect(()=>{
        api.getBotById(props.botId,authToken)
            .then((response)=>{
                console.log(response.data.botData)
                var data = response.data.botData
                setBotData(data);
                var token = data.outputEncodedString

                var buyObject = {
                    tradeSide: "BUY",
                    token: token
                }

                var sellObject = {
                    tradeSide: "SELL",
                    token: token
                }

                setBuyMessage(JSON.stringify(buyObject))
                setSellMessage(JSON.stringify(sellObject))
                setLoading(false)
            })
            .catch((err)=>{
                setLoading(false)
            })
    },[])

    const copyTextToClipboard = async(text) => {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
    }

    return (loading ? <Spinner /> :
            <Row>
                <Col xs="12" sm="10" md="6" lg="6">
                    <Panel className="panel-1per-row mt-5">
                        <h2 className="full-width h-center mt-5">{botData.name}</h2>
                        <div className="full-width h-center mt-5" style={{height: '35px'}}>
                            <Label for="webhook" >Webhook URL</Label>
                            <Input
                                id="webhook"
                                type="text"
                                // contentEditable={false}
                                value={botData.webhookUrl}
                                readOnly={true}
                                />
                        </div>
                        <div className="full-width d-flex" style={{justifyContent: 'end'}}>
                        <Button style={{width: '45px', padding: '5px', marginTop: '-35px', right: '15px'}} color="primary" onClick={()=>copyTextToClipboard(botData.webhookUrl)}>copy</Button>
                        </div>

                        <div className="full-width h-center mt-5">
                            <Label for="bodytext" >Message for BUY Signal</Label>
                            <Input
                                id="bodytext"
                                type="textarea"
                                disabled={true}
                                contentEditable={false}
                                value={buyMessage}
                                readOnly={true}
                                style={{height: '150px',}}
                                />
                        </div>
                        <div className="full-width d-flex" style={{justifyContent: 'end'}}>
                        <Button style={{width: '45px', padding: '5px', marginTop: '-35px', right: '15px'}} color="primary" onClick={()=>copyTextToClipboard(buyMessage)}>copy</Button>
                        </div>

                        <div className="full-width h-center mt-5">
                            <Label for="bodytext" >Message for SELL Signal</Label>
                            <Input
                                id="bodytext"
                                type="textarea"
                                disabled={true}
                                contentEditable={false}
                                value={sellMessage}
                                readOnly={true}
                                style={{height: '150px',}}
                                />
                        </div>
                        <div className="full-width d-flex" style={{justifyContent: 'end'}}>
                        <Button style={{width: '45px', padding: '5px', marginTop: '-35px', right: '15px'}} color="primary" onClick={()=>copyTextToClipboard(sellMessage)}>copy</Button>
                        </div>
                        
                        
                    </Panel>
                </Col>
            </Row>
    )
}
export default OutputPanel