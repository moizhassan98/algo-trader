import { Col } from "reactstrap"


const BotCard = (props) =>{


    return(
        <Col className="bot-card"
            sm="6"
            md="3"
        >
            <h3 className="bc-name">{props.name}</h3>
            <div className="bc-subtext">{props.symbol}</div>
        </Col>
    )
}

export default BotCard