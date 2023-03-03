import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Col, Container, Row,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner, Button, Label, Input } from "reactstrap"
import api from "../../apis"
import Panel from "../BasicUIElements/Panel"
import { brokerSelectionCompleted, setBotName, setBroker, setSymbol, symbolSelectionCompleted } from "../../redux/createBotSlice"
import List from 'devextreme-react/list'
import { useNavigate } from "react-router-dom"
import axios from 'axios'


const ChooseBrokerPanel = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {authToken} = useSelector((state)=> state.auth)

    const [pageLoading, setPageLoading] = useState(true)
    const [brokersList, setBrokersList] = useState([])
    const [showCreateBroker, setShowCreateBroker] = useState(false)
    const [symbolsSupported, setSymbolsSupported] = useState([])

    useEffect(()=>{
        api
            .getBrokersForUser(authToken)
            .then(response=>{
                if(response.data.result.length === 0){
                    setShowCreateBroker(true)
                }
                else{
                    setBrokersList(response.data.result)
                }
                setPageLoading(false)
            })
            .catch(err=>{
                setPageLoading(false)
                //TODO: Error Handling.
            })
        axios.get('https://api.binance.com/api/v3/exchangeInfo').then((response)=>{
            var symbolsObject = response.data.symbols.map((symbol)=> {return ({name: symbol.symbol})})
            setSymbolsSupported(symbolsObject)
        })
    },[])


    //#region Dropsdown
    const { broker, symbol, botName } = useSelector((state)=> state.createBot)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownToggle = () => setDropdownOpen((prevState) => !prevState);
    const [dropdownError, setDropdownError] = useState(null)

    const getBrokersDropdownItems = () =>{

        const handleClick = (brokerLocal) =>{
            dispatch(setBroker(brokerLocal.toUpperCase()))
            dispatch(brokerSelectionCompleted())
        }

        return brokersList.map((broker)=>{
            return (
                <DropdownItem onClick={()=>handleClick(broker)} key={broker}>
                    <span className={"p-2"}>{broker}</span>
                </DropdownItem>
            )
        })
    }

    

    const validateDropdown = () =>{
        if(broker.trim()===''){
            setDropdownError("You need to choose a Broker!")
        }
    }

    //#endregion Dropdown

    //#region Symbol List

    const symbolSelection = async(e) =>{
        dispatch(setSymbol(e.itemData.name.toUpperCase()))
        dispatch(symbolSelectionCompleted())
    }

    const symbolListRender = (data) =>{
        return (
            <div className="symbol-list-item">
                {data.name}
            </div>
        )
    }
    //#endregion

    return (pageLoading ? <Spinner className="hv-center"/> :
            <Row className="mt-4">
                <Col xs="12" sm="10" md="6" lg="6">
                    <Panel>{showCreateBroker ? <Button onClick={()=>window.location = '/createbroker'}>Go to Create Broker</Button> :
                    <div className="full-width">
                        {/* TODO: Input Name  */}
                        <Label for='botname'>Name</Label>
                        <Input 
                            id='botname'
                            type="text"
                            value={botName}
                            onChange={(e)=>dispatch(setBotName(e.target.value))}
                            />
                        <h6 className={"m-4"}>Choose a Broker from Dropdown</h6>
                        <Dropdown isOpen={dropdownOpen} toggle={dropdownToggle} className="h-center">
                            <DropdownToggle caret>{broker || "Choose a Broker"}</DropdownToggle>
                            <DropdownMenu >
                                {getBrokersDropdownItems()}
                            </DropdownMenu>
                        </Dropdown>
                        {symbol ? 
                            <div>
                                <h6 className={"m-4"}>Symbol: <strong>{symbol}</strong></h6>
                            </div>
                            :
                            <div>
                                <h6 className={"m-4"}>Choose a Symbol</h6>
                                <div className="h-center">
                                    <List 
                                        dataSource={symbolsSupported}
                                        height={300}
                                        width = {200}
                                        itemRender={symbolListRender}
                                        searchExpr="name"
                                        searchEnabled={true}
                                        searchMode='startsWith' 
                                        noDataText= "No Data ..."
                                        showScrollbar= "always"
                                        pageLoadMode= 'scrollBottom'
                                        onItemClick={symbolSelection}
                                        />
                                </div>
                            </div>

                        }
                    </div>
                    }</Panel>
                </Col>
            </Row>
    )
}
export default ChooseBrokerPanel