import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import api from "../apis"
import Panel from "../components/BasicUIElements/Panel";
import AddBotCard from "../components/BotsPage/AddBotCard";
import BotCard from "../components/BotsPage/BotCard";
import AddBrokerCard from "../components/BrokersPage/AddBrokerCard";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth"
import "../styles/BotsPage.css"

const BrokersPage = () =>{
    useAuth();
    const {authToken} = useSelector((state)=> state.auth)
    const [brokers, setBrokers] = useState([])

    useEffect(()=>{
        api.getBrokersForUser(authToken).then((response)=>{
            setBrokers(response.data.result)
        })
        .catch((err)=>{

        })
    },[])

    return (
        <div className="d-flex">
            <Sidebar active={'brokers'} />
            <div style={{flexGrow: '1'}}>
                <Panel className="d-flex">
                    {brokers.map((broker)=>{
                        return <BotCard name={broker} symbol={""} broker={true}/>
                    })}
                    <AddBrokerCard />
                </Panel>
                
            </div>
        </div>
    )
}
export default BrokersPage