import { useEffect, useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Col, Container, Input, Label, Row } from "reactstrap"
import { setSpotSelected, toggleSpotSelected, toggleIsolatedSelected, setLeverageMultiplier } from "../../redux/createBotSlice"
import Panel from "../BasicUIElements/Panel"
import ToggleSwitch from "../BasicUIElements/ToggleSwitch"


const ChooseTradingTypePanel = () =>{
    const dispatch = useDispatch()
    const {spotSelected, isolatedSelected, leverageMultiplier} = useSelector((state)=> state.createBot)

    return (
            <Row className="mt-4">
                <Col xs="12" sm="10" md="6" lg="6">
                    <Panel className="panel-1per-row">
                        <div className="full-width h-center">
                            <h6 style={{lineHeight: '50px', marginRight: '20px'}}>Choose Trading Type</h6>
                            <span onClick={()=> dispatch(toggleSpotSelected())}><ToggleSwitch text1={"SPOT"} text2={"FUTURES"} firstActive={spotSelected}/></span>
                        </div>
                        {spotSelected === false ?<div className="full-width h-center">
                            <h6 style={{lineHeight: '50px', marginRight: '20px'}}>Choose Margin Type</h6>
                            <div onClick={()=>dispatch(toggleIsolatedSelected())}><ToggleSwitch text1={"ISOLATED"} text2={"CROSSED"} firstActive={isolatedSelected}/></div>
                        </div>:null}

                        {spotSelected === false ?<div className="full-width h-center">
                            <h6  style={{lineHeight: '50px', marginRight: '20px'}}>Choose Margin Multiplier (1x - 125x)</h6>
                            
                        </div>:null}

                        {spotSelected === false ?<div className="full-width h-center">
                            <Input style={{height: '40px'}} value={leverageMultiplier} type="range" max={125} min={1} onChange={(e)=>dispatch(setLeverageMultiplier(Number(e.target.value)))} />
                            <Input style={{width: '10%'}} value={leverageMultiplier} type="number" max={125} min={1} onChange={(e)=>dispatch(setLeverageMultiplier(Number(e.target.value)))} />
                        </div>
                        :null}
                    </Panel>
                </Col>
            </Row>
    )
}
export default ChooseTradingTypePanel