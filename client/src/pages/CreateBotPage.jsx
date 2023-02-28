import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap"
import ChooseBrokerPanel from "../components/CreateBotPage/ChooseBrokerPanel"
import ChooseTradingTypePanel from "../components/CreateBotPage/ChooseTradingTypePanel";
import OptionsPanel from "../components/CreateBotPage/OptionsPanel";
import OutputPanel from "../components/CreateBotPage/OutputPanel";
import useAuth from "../hooks/useAuth"
import '../styles/CreateBot.css'


const CreateBotPage = () =>{
    useAuth();
    const {brokerSelectionDone, symbolSelectionDone, createBotCompleted} = useSelector((state)=> state.createBot)

    return(
        <Container fluid={true}>
            {createBotCompleted ?
                <OutputPanel />
                :
                <div>
                    <ChooseBrokerPanel />
                    {brokerSelectionDone && symbolSelectionDone ? <ChooseTradingTypePanel /> : null}
                    {brokerSelectionDone && symbolSelectionDone ? <OptionsPanel /> : null}
                </div>
            }
        </Container>
    )
}
export default CreateBotPage