import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { Spinner } from "reactstrap";
import OutputPanel from "../components/CreateBotPage/OutputPanel";
import Sidebar from "../components/Sidebar";


const BotDetailPage = () =>{
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [botId, setBotId] = useState('')

    useEffect(()=>{
        const botId = params.botId
        setBotId(botId)
        setLoading(false)
    },[])

    return(
        <div className="d-flex">
            <Sidebar active={'bots'} />
            <div style={{flexGrow: '1'}}>
                {loading ? <Spinner className='m-5' /> :
                    <OutputPanel botId={botId} />
                }
            </div>
        </div>
    )
}
export default BotDetailPage