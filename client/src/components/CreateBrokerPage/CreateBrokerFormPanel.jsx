import { useState } from "react"
import Panel from "../BasicUIElements/Panel"
import {Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Label, InputGroup, InputGroupText, Input, FormFeedback, Button} from 'reactstrap'
import Brokers from "../../config/brokerSupported"
import {
    setApiKey, setApiSecret,clear,setBroker, setInputPanelComplete,
} from '../../redux/createBrokerSlice'
import { useDispatch, useSelector } from "react-redux"
import api from "../../apis"

const CreateBrokerFormPanel = () =>{
    const dispatch = useDispatch()
    const {authToken} = useSelector((state)=> state.auth)
    //#region  Dropdown
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownToggle = () => setDropdownOpen((prevState) => !prevState);
    const [dropdownError, setDropdownError] = useState(null)

    const getBrokersDropdownItem = () =>{
        return Brokers.map((broker)=>{
            return (
                <DropdownItem onClick={()=> dispatch(setBroker(broker.name.toUpperCase()))} key={broker.name}>
                    {broker.logoSvg && <img src={`${broker.logoSvg}`} height={"16px"} width={"16px"} />}
                    {broker.logoUrl && <img src={`${broker.logoUrl}`} height={"16px"} width={"16px"} />}
                    <span className={"p-2"}>{broker.name}</span>
                </DropdownItem>
            )
        })
    }

    const validateDropdown = () =>{
        if(broker.trim()===''){
            setDropdownError("You need to choose a Broker!")
        }
    }

    //#endregion

    //#region API Fields
    const { broker} = useSelector((state)=> state.createBroker)
    const [apiKey, setApiKeyState] = useState('')
    const [apiSecret, setApiSecretState] = useState('')
    const [apiKeyError, setApiKeyError] = useState(null)
    const [apiSecretError, setApiSecretError] = useState(null)

    const validateApiKey = () =>{
        if(apiKey.trim() === ''){
            setApiKeyError('API can;t be empty')
        }
    }

    const validateApiSecret = () =>{
        if(apiSecret.trim() === ''){
            setApiSecretError('API secret can\'t be empty')
        }
    }

    //#endregion

    const submit = async(e) =>{
        e.preventDefault()
        validateApiKey();
        validateApiSecret();
        validateDropdown()
        if(!apiKeyError && !apiSecretError && !dropdownError){
            console.log("submit")
            dispatch(setApiKey(apiKey))
            dispatch(setApiSecret(apiSecret))
            dispatch(setInputPanelComplete())
            await api.saveApi({
                broker,
                apiKey,
                apiSecret
            },authToken)
            /// TODO: Error handling!
        }
    }

    return(
        <Container>
            <Row>
                <Col xs="12" sm="10" md="6" lg="6">
                    <Panel>
                        <Form onSubmit={submit} className="full-width">
                        <FormGroup >
                            <h6 className={"m-4"}>Choose a Broker from Dropdown</h6>
                            <Dropdown isOpen={dropdownOpen} toggle={dropdownToggle} className="h-center">
                                <DropdownToggle caret>{broker || "Choose a Broker"}</DropdownToggle>
                                <DropdownMenu >
                                    {getBrokersDropdownItem()}
                                </DropdownMenu>
                            </Dropdown>
                            {dropdownError && <div className="text-danger">{dropdownError}</div>}

                            <h6 className="m-4">Input the API Keys for you Broker</h6>
                            <InputGroup className={"mt-4"}>
                                <InputGroupText className="input-text"> API Key</InputGroupText>
                                <Input 
                                    xs="9"
                                    type="text" 
                                    value={apiKey}
                                    onChange={(e)=> setApiKeyState(e.target.value)}
                                    />
                            </InputGroup>
                            {apiKeyError && <div className="text-danger">{apiKeyError}</div>}

                            <InputGroup className={"mt-4"}>
                                <InputGroupText className="input-text">API Secret</InputGroupText>
                                <Input 
                                    type="password" 
                                    value={apiSecret}
                                    onChange={(e)=> setApiSecretState(e.target.value)}
                                    />
                                
                            </InputGroup>
                            {apiSecretError && <div className="text-danger">{apiSecretError}</div>}

                            <Button className={"mt-5"} type="primary" >Save Broker </Button>
                        </FormGroup>
                        </Form>
                    </Panel>
                </Col>
            </Row>
        </Container>
    )

}

export default CreateBrokerFormPanel