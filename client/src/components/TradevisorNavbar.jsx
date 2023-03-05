import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap"
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
        if(path === '/'){
            setLoginPage(true)
            setSignupPage(true)
        }
    },)

    return(
        <Navbar className={'my-navbar'} expand="lg">
            <NavbarBrand style={{width: '13%'}} sm='6'>
                {tradevisorLogoWhite} 
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
                {loginPage &&<NavItem>
                    <div className="navbar-btn" onClick={()=>window.location = '/signup'}>
                    Signup
                    </div>
                </NavItem>}
                {signupPage &&<NavItem>
                    <div className="navbar-btn" onClick={()=>window.location = '/login'}>
                    Signin
                    </div>
                </NavItem>}
            </Nav>
        </Navbar>
    )
}
export default TradevisorNavbar