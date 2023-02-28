import { useDispatch, useSelector } from "react-redux"
import { Button, Col, Container, Input, InputGroup, InputGroupText, Row, Spinner } from "reactstrap"
import { createBot, createBotValidation, setFixedDollarAmount, setPercentageAmount, togglePercentageSelected } from "../../redux/createBotSlice"
import Panel from "../BasicUIElements/Panel"
import ToggleSwitch from "../BasicUIElements/ToggleSwitch"


const OptionsPanel = () =>{
    const dispatch = useDispatch();
    const {percentageSelected, percentageAmount, fixedDollarAmount, createBotError, createBotLoading} = useSelector((state)=> state.createBot)

    return (
            <Row className="mt-4">
                <Col xs="12" sm="10" md="6" lg="6">
                    <Panel className="panel-1per-row">
                        <div className="full-width h-center" 
                            onClick={()=>dispatch(togglePercentageSelected())}>
                                <ToggleSwitch 
                                    text1={"Percentage (%)"} 
                                    text2={"Fixed Dollars"} 
                                    firstActive={percentageSelected}/>
                        </div>

                        {percentageSelected && 
                            <div className="full-width h-center mt-5">
                                <span style={{lineHeight: '40px'}}>Percentage</span>
                                <InputGroup style={{width: '15%', marginLeft: '15px', lineHeight: '40px'}}>
                                    <Input 
                                        type="number" 
                                        value={percentageAmount} 
                                        max={100}
                                        min={0}
                                        onChange={(e)=> dispatch(setPercentageAmount(Number(e.target.value)))}
                                    />
                                    <InputGroupText>%</InputGroupText>
                                </InputGroup>
                            </div>
                        }

                        {!percentageSelected && 
                            <div className="full-width h-center mt-5">
                            <span style={{lineHeight: '40px'}}>Fixed Dollar Amount</span>
                            <InputGroup style={{width: '35%', marginLeft: '15px', lineHeight: '40px'}}>
                                <Input 
                                    type="number" 
                                    value={fixedDollarAmount} 
                                    max={10000000}
                                    min={0}
                                    onChange={(e)=> dispatch(setFixedDollarAmount(Number(e.target.value)))}
                                />
                                <InputGroupText>USDT</InputGroupText>
                            </InputGroup>
                        </div>
                        }
                        {createBotError && <div className="text-danger">{createBotError}</div>}
                        <div className="full-width h-center mt-5">
                            <Button 
                                color="primary"
                                onClick={()=>dispatch(createBot())}
                                disabled={createBotLoading}
                                >
                                {createBotLoading ? <Spinner size="sm"/>: "Create Bot"}
                            </Button>
                        </div>
                    </Panel>
                </Col>
            </Row>
    )
}
export default OptionsPanel