import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useBinanceApi from "../../hooks/useBinanceApi";

const OutputCreateBrokerPanel = () =>{
    
    useEffect(()=>{
        useBinanceApi()
    },[])
    
    return(
        <Container>
            <Row>
                <Col xs="12" sm="10" md="6" lg="6">
                    <Panel>
                    </Panel>
                </Col>
            </Row>
        </Container>
    )
}