import { Button, Input, Label } from "reactstrap"
import Panel from "../BasicUIElements/Panel"
import { useEffect, useState } from "react"


const OutputBotCard = (props) =>{
    // takes bot object as props. in props.bot

    const [buyMessage, setBuyMessage] = useState('')
    const [sellMessage, setSellMessage] = useState('')

    useEffect(()=>{
        var token = props.bot.outputEncodedString

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
    },[])


    const copyTextToClipboard = async(text) => {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
    }

    return (
        <Panel className="flex-column h-center">
            <h2 className="full-width h-center mt-5">{props.bot.name}</h2>

            <div className="full-width h-center mt-5" style={{height: '35px'}}>
                <Label for="webhook" >Webhook URL</Label>
                <Input
                    id="webhook"
                    type="text"
                    // contentEditable={false}
                    value={props.bot.webhookUrl}
                    readOnly={true}
                    />
            </div>
            <div className="full-width d-flex" style={{justifyContent: 'end'}}>
            <Button style={{width: '45px', padding: '5px', marginTop: '-35px', right: '15px'}} color="primary" onClick={()=>copyTextToClipboard(props.bot.webhookUrl)}>copy</Button>
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
    )
}
export default OutputBotCard