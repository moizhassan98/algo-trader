import { Col, Container, Row } from "reactstrap"
import Panel from "../BasicUIElements/Panel"


const OutputPanel = () =>{

    return (
            <Row>
                <Col xs="12" sm="10" md="6" lg="6">
                    <Panel className="mt-5">
                        Output panel
                    </Panel>
                </Col>
            </Row>
    )
}
export default OutputPanel