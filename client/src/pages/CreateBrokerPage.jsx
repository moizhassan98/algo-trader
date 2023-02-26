import { useState } from "react";
import CreateBrokerFormPanel from "../components/CreateBrokerPage/CreateBrokerFormPanel";

import '../styles/CreateBrokerPage.css'

const CreateBrokerPage = ( ) =>{

    const [state, setState] = useState(true)

    return (
        <>
            {state && <CreateBrokerFormPanel />}
        </>
    )
}

export default CreateBrokerPage