import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import api from "../apis"
import Panel from "../components/BasicUIElements/Panel";
import AddBotCard from "../components/BotsPage/AddBotCard";
import BotCard from "../components/BotsPage/BotCard";
import OutputBotCard from "../components/BotsPage/OutputBotCard";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth"
import "../styles/BotsPage.css"



const BotsPage = () =>{
    useAuth();
    const {authToken} = useSelector((state)=> state.auth)
    const [bots, setBots] = useState([])
    const [botsLoading, setBotsLoading] = useState(true)

    const [selectedBot, setSelectedBot] = useState('')

    useEffect(()=>{
        api.getAllBots(authToken).then((response)=>{
            console.log(response.data)
            setBots(response.data.bots)
            setBotsLoading(false)
        })
        .catch((err)=>{
            setBotsLoading(false)
        })
    },[])

    return (
        <div className="d-flex">
            <Sidebar active={'bots'} />
            <div style={{flexGrow: '1'}}>
                <Panel className='d-flex'>
                    {botsLoading ? <Spinner className="m-5"/>:
                        bots.map((bot)=>{
                            return <BotCard key={bot.name+bot.symbol} botId={bot.botId} name={bot.name} symbol={bot.symbol}/>
                        })
                    }
                    <AddBotCard />
                </Panel>
            </div>
        </div>
    )
}
export default BotsPage