import { useNavigate } from "react-router-dom"
import { Col } from "reactstrap"


const BotCard = (props) =>{
    const navigate = useNavigate()

    return(
        <Col className="bot-card"
            sm="6"
            md="3"
            onClick={()=>navigate(`/bot/${props.botId}`)}
        >
            <h3 className="bc-name">{props.name}</h3>
            <div className="bc-subtext">{props.symbol}</div>
        </Col>
    )
}

export default BotCard