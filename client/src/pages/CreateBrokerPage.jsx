import { useState } from "react";
import { useSelector } from "react-redux";
import CreateBrokerFormPanel from "../components/CreateBrokerPage/CreateBrokerFormPanel";
import OutputCreateBrokerPanel from "../components/CreateBrokerPage/OutputCreateBrokerPanel";

import '../styles/CreateBrokerPage.css'

const CreateBrokerPage = ( ) =>{

    const {outputPanel, inputPanel} = useSelector((state)=> state.createBroker)
    const [state, setState] = useState(true)

    return (
        <>
            {inputPanel && <CreateBrokerFormPanel />}
            {outputPanel && <OutputCreateBrokerPanel />}
        </>
    )
}

export default CreateBrokerPage