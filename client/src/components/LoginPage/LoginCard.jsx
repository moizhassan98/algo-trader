import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Form, FormGroup, Label, Input, Button, Alert, Spinner
} from 'reactstrap';
import {getAuth,signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult} from 'firebase/auth';


const LoginCard = () =>{

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [authResponse, setAuthResponse] = useState('')
    const [pageLoading, setPageLoading] = useState(true)

    useEffect(()=>{
        const auth = getAuth();
        getRedirectResult(auth)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                console.log("SIGNED IN USER: ",user)
                navigate('/home',{replace: true})
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                setPageLoading(false)
                // Handle Errors here.
                console.log("google sign in error: ", error)
            });
    },[])

    const validateEmail = () => {
        if (email.trim() === '') {
            setEmailError('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError(null);
        }
    };

    const validatePassword = () => {
        if (password.trim() === '') {
            setPasswordError('Password is required');
        } else {
            setPasswordError(null);
        }
    };

    const handleSubmit = async(event) => {
        console.log("submit called")
        event.preventDefault();
        validateEmail();
        validatePassword();
        if(!emailError && !passwordError){
            await signInWithEmailPass()
        }
    };

    const signInWithEmailPass = async() =>{
        setAuthResponse('WAIT')
        const auth = getAuth();
        signInWithEmailAndPassword(auth,email.trim(),password.trim())
            .then((res)=>{
                console.log(res)
                setAuthResponse('')
                navigate('/home',{replace: true})
            })
            .catch((err)=>{
                console.log("Wrong Email or Password!")
                setAuthResponse('FAILED')
                console.log(err)
            })
    }

    const signInWithGoogle = async() =>{
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithRedirect(auth, provider);
    }


    return ( pageLoading===true ? <Spinner/> :
        <div className="login-card">
            <img src='./gen.png' className='img-fluid margin-10 d-block mt-3' width={'100px'} height={'100px'} style={{margin:'auto'}} alt=''/>
            <h2 className='text-align-center mt-3'>Login</h2>

            {authResponse === "FAILED" ?
                <Alert color='danger'>Wrong Email or Password! Try again</Alert>
                :null
            }

            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    onBlur={validateEmail}
                    />
                    {emailError && <div className="text-danger">{emailError}</div>}
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onBlur={validatePassword}
                    />
                    {passwordError && <div className="text-danger">{passwordError}</div>}
                </FormGroup>
                <div className="d-flex justify-content-center">
                    {authResponse === "WAIT"?
                        <Button type="submit" color="primary" className='signin-btn' disabled={true}><Spinner/></Button>
                        :
                        <Button type="submit" color="primary" className='signin-btn'>Sign In</Button>
                    }
                    
                </div>
                
            </Form>
            <div className="d-flex justify-content-center"><hr style={{width: '25%',marginRight: '5px'}}/>{"or continue with"}  <hr style={{width: '25%', marginLeft: '5px'}}/></div>
            <div className="d-flex justify-content-center">
                <Button onClick={signInWithGoogle} className='btn-google-signin'><img src='./google-icon.png' width={17} height={17} alt='google'/> Google</Button>
            </div>
        </div>
    )
}

export default LoginCard