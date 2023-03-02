import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import api from "../apis"
import Panel from "../components/BasicUIElements/Panel";
import AddBotCard from "../components/BotsPage/AddBotCard";
import BotCard from "../components/BotsPage/BotCard";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth"
import "../styles/BotsPage.css"



const BotsPage = () =>{
    useAuth();
    const {authToken} = useSelector((state)=> state.auth)
    const [bots, setBots] = useState([])

    useEffect(()=>{
        api.getAllBots(authToken).then((response)=>{
            setBots(response.data.bots)
        })
        .catch((err)=>{

        })
    },[])

    return (
        <div className="d-flex">
            <Sidebar active={'bots'} />
            <div style={{flexGrow: '1'}}>
                <Panel className='d-flex'>
                    {bots.map((bot)=>{
                        return <BotCard name={bot.name} symbol={bot.symbol} />
                    })}
                    <AddBotCard />
                </Panel>
                
            </div>
        </div>
    )
}
export default BotsPage