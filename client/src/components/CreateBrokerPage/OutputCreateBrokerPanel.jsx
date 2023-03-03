import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Panel from "../BasicUIElements/Panel"
import {Container, Row, Col, Spinner} from 'reactstrap'
import api from "../../apis";
import { checkMark, crossMark } from "../../assets/svgs";

const OutputCreateBrokerPanel = () =>{

    const {apiKey, apiSecret} = useSelector((state)=> state.createBroker)
    const {authToken} = useSelector((state)=> state.auth)

    const [reqRes, setReqRes] = useState(true)
    const [tradingEnabled, setTradingEnabled] = useState({
        spot: false,
        futures: false
    })
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        api.apiPermission({
            apiKey,
            apiSecret
        }, authToken)
        .then((response)=>{
            console.log(response)
            if(response.data.success){
                setTradingEnabled(response.data.result)
                setLoading(false)
            }
            else{
                setReqRes(false)
                setLoading(false)
            }
        })
        .catch(err=>{
            console.log(err)
            setReqRes(false)
            setLoading(false)
        })
    },[])
    
    return(loading ? <Spinner className="center"/>:
        <Container>
            <Row>
                <Col xs="12" sm="10" md="6" lg="6">
                    <Panel className="d-flex" style={{flexDirection: 'column'}}>
                        <Row>
                            {tradingEnabled.spot ? <div>{checkMark}Spot Trading Enabled</div> : <div>{crossMark} Spot trading <strong>NOT Enabled</strong></div>}
                        </Row>
                        <Row>
                            {tradingEnabled.futures ? <div>{checkMark} Futures Trading Enabled</div>: <div>{crossMark} Futures trading <strong>NOT Enabled</strong></div>}
                        </Row>
                        
                    </Panel>
                </Col>
            </Row>
        </Container>
    )
}

export default OutputCreateBrokerPanel