import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Sidebar.css'
import { botLogo, signoutLogo, dashboardLogo, brokerLogo, accountLogo } from '../assets/svgs'
import { useDispatch } from 'react-redux'
import {  signOut,getAuth } from "firebase/auth";
import { setAuthToken } from '../redux/authSlice'

const Sidebar = (props) =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        try{
            document.getElementById(props.active).classList.add('active-menu-item')
        }catch(err){

        }
    },[])

    const signOutUser = () =>{
        const auth = getAuth()
        signOut(auth).then((response)=>{
            dispatch(setAuthToken(''))
            navigate('/login',{replace:true})
        })
        .catch((err)=>{
            dispatch(setAuthToken(''))
            navigate('/login',{replace:true})
        })
    }

    return (
        <div className="sidebar-container">
            <div className="sidebar-logo">

            </div>
            <div onClick={()=>navigate('/dashboard')} id='dashboard' className="sidebar-menu-items">
                {dashboardLogo} <span className='sidebar-menuitem-text'>Dashboard</span>
            </div>
            <div onClick={()=>navigate('/createbroker')} id='brokers' className="sidebar-menu-items">
                {brokerLogo} <span className='sidebar-menuitem-text'>Brokers</span>
            </div>
            <div onClick={()=>navigate('/createbot')} id='bots' className='sidebar-menu-items'>
                {botLogo}
                <span className='sidebar-menuitem-text'>Bots</span>
            </div>
            <div id='account' className="sidebar-menu-items">
                {accountLogo} <span className='sidebar-menuitem-text'>Account</span>
            </div>

            <div className="signout-btn" onClick={signOutUser}>
                {signoutLogo}Signout
            </div>

        </div>
    )
}

export default Sidebar