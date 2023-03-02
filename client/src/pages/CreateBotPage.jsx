import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap"
import ChooseBrokerPanel from "../components/CreateBotPage/ChooseBrokerPanel"
import ChooseTradingTypePanel from "../components/CreateBotPage/ChooseTradingTypePanel";
import OptionsPanel from "../components/CreateBotPage/OptionsPanel";
import OutputPanel from "../components/CreateBotPage/OutputPanel";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth"
import '../styles/CreateBot.css'

//TODO: Fix styling of Navbar and side so that they are fixed

const CreateBotPage = () =>{
    useAuth();
    const {brokerSelectionDone, symbolSelectionDone, createBotCompleted, createdBotId} = useSelector((state)=> state.createBot)

    return(
        <div className="d-flex">
            <Sidebar active={'bots'} />
            <div style={{flexGrow: '1'}}>
            {createBotCompleted ?
                <OutputPanel botId={createdBotId}/>
                :
                <div>
                    <ChooseBrokerPanel />
                    {brokerSelectionDone && symbolSelectionDone ? <ChooseTradingTypePanel /> : null}
                    {brokerSelectionDone && symbolSelectionDone ? <OptionsPanel /> : null}
                </div>
            }
            </div>
        </div>
        
    )
}
export default CreateBotPage
