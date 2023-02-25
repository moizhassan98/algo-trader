import {useState, useEffect} from 'react'

import { increment, decrement,reset, setValue,delayedIncrement } from "./counterSlice";
import {useDispatch, useSelector} from 'react-redux'
import { Button, Col, Container, Input, Row } from 'reactstrap';


const Counter = () =>{
    const dispatch = useDispatch()
    const count = useSelector((state)=> state.counter.value)

    const [num, setNum] = useState(0)

    return (
        <div>
            <Row className='d-flex justify-content-center align-content-center'>
                <Col md={"5"} className='hv-center'>
                    <Button onClick={()=> dispatch(increment())}>+</Button>
                </Col>
                <Col md={"2"} className='hv-center'>
                    <Input type='number' value={count}/>
                </Col>
                <Col md={"5"} className='hv-center'>
                    <Button onClick={()=> dispatch(decrement())}>-</Button>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center align-content-center'>
                <Col md="3" className='hv-center'>
                    <Input type={"number"} value={num} onChange={(e)=>setNum(e.target.value)}/>
                </Col>
                
                <Col md="3" className='hv-center'>
                    <Button onClick={()=>dispatch(setValue(Number(num) || 0))} >Increment by Value</Button>
                </Col>

                <Col md= "3" className='hv-center'>
                    <Button color='secondry' onClick={()=> dispatch(delayedIncrement(Number(num) || 0))} > Delayed Increment</Button>
                </Col>

                <Col md="3" className='hv-center'>
                    <Button color='danger' onClick={()=>dispatch(reset())} >Reset</Button>
                </Col>
            </Row>
        </div>
    )
}
export default Counter