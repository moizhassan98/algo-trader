import {
    Col,
    Row,
    Container
} from 'reactstrap'
import '../styles/LoginPage.css'

import LoginCard from '../components/LoginPage/LoginCard'

const LoginPage = () =>{


    return (
        <Container className='full-height'>
            <Row className='align-items-center justify-content-center full-height'>
                <Col xs="12" sm="10" md="6" lg="4">
                    <LoginCard />
                </Col>
            </Row>
        </Container>
    )

}
export default LoginPage;