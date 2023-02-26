
import { Container } from "reactstrap"
import styled from "styled-components";

const Panel = styled.div.attrs({className: 'panel'})`
    display: flex;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: white;
    padding: 10px;
    margin: 10px
`

export default Panel