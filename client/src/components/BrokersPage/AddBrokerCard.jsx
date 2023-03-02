import { useNavigate } from "react-router-dom"
import { Col } from "reactstrap"


const AddBrokerCard = (props) =>{
    const navigate = useNavigate()

    return(
        <Col className="add-bot-card"
            sm="6"
            md="3"
            onClick={()=>navigate('/createbroker')}
        >
            <h3 className="bc-name">+</h3>
            <div className="bc-subtext">Create a New Broker</div>
        </Col>
    )
}

export default AddBrokerCard