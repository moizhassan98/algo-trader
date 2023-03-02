import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar, NavbarBrand, NavLink } from "reactstrap"
import { tradevisorLogo2White, tradeVisorLogoBlack, tradevisorLogoWhite, tradingViewLogo2Black } from "../assets/svgs"
import '../styles/Navbar.css'

const TradevisorNavbar = () =>{
    const navigate = useNavigate()
    const [loginPage, setLoginPage] = useState(false)
    const [signupPage, setSignupPage] = useState(false)

    useEffect(()=>{
        var path = window.location.pathname
        if(path === '/login'){
            setLoginPage(true)
        }
        else{
            setLoginPage(false)
        }
        if(path === '/signup'){
            setSignupPage(true)
        }
        else{
            setSignupPage(false)
        }
    },[])

    return(
        <Navbar className={'my-navbar'}>
            <NavbarBrand style={{width: '13%'}} sm='6'>
                {tradevisorLogo2White} 
            </NavbarBrand>
            {loginPage &&
            <div className="navbar-btn" onClick={()=>window.location = '/signup'}>
                Signup
            </div>}

            {signupPage &&
            <div className="navbar-btn" onClick={()=>window.location = '/login'}>
                Signin
            </div>}
        </Navbar>
    )
}
export default TradevisorNavbar