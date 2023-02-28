import styled from "styled-components"


const ToggleSwitch = (props) =>{
    const { text1, text2 } = props



    const activeStyle = {
        backgroundColor: 'white',
        borderRadius: '20px',
        width: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black',
        height: '50px',
        cursor: 'pointer'
    }

    const passiveStyle = {
        backgroundColor: '#d9d9d9',
        borderRadius: '20px',
        width: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // border: '1px solid black',
        height: '50px',
        cursor: 'pointer'
    }

    return(
        <Boundry >
            <div style={props.firstActive ? activeStyle : passiveStyle}>{text1}</div>
            <div style={props.firstActive === false ? activeStyle : passiveStyle}>{text2}</div>
        </Boundry>
    )
}
export default ToggleSwitch

const Boundry = styled.div.attrs()`
    border-radius: 50px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    background-color: #d9d9d9;
    align-items: center;
    width: 300px;
    height: 50px;
    cursor: pointer;
`
