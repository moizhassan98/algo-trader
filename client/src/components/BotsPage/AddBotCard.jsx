import { useNavigate } from "react-router-dom"
import { Col } from "reactstrap"


const AddBotCard = (props) =>{
    const navigate = useNavigate()

    return(
        <Col className="add-bot-card"
            sm="6"
            md="3"
            onClick={()=>navigate('/createbot')}
        >
            <h3 className="bc-name">+</h3>
            <div className="bc-subtext">Create a New Bot</div>
        </Col>
    )
}

export default AddBotCard