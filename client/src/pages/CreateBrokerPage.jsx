import { useState } from "react";
import { useSelector } from "react-redux";
import CreateBrokerFormPanel from "../components/CreateBrokerPage/CreateBrokerFormPanel";
import OutputCreateBrokerPanel from "../components/CreateBrokerPage/OutputCreateBrokerPanel";
import Sidebar from "../components/Sidebar";

import '../styles/CreateBrokerPage.css'

const CreateBrokerPage = ( ) =>{

    const {outputPanel, inputPanel} = useSelector((state)=> state.createBroker)
    const [state, setState] = useState(true)

    return (
        <div className="d-flex">
            <Sidebar active={"brokers"} />
            {inputPanel && <CreateBrokerFormPanel />}
            {outputPanel && <OutputCreateBrokerPanel />}
        </div>
    )
}

export default CreateBrokerPage