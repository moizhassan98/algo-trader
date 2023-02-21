import {
    Col,
    Row,
    Container
} from 'reactstrap'
import '../styles/LoginPage.css'

import SignupCard from '../components/SignupPage/SignupCard'

const SignupPage = () =>{


    return (
        <Container className='full-height'>
            <Row className='align-items-center justify-content-center full-height'>
                <Col xs="12" sm="10" md="6" lg="4">
                    <SignupCard />
                </Col>
            </Row>
        </Container>
    )

}
export default SignupPage;