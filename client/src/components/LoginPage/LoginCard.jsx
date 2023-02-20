import { useState } from 'react';
import {
    Col,Row,Container,
    Form, FormGroup, Label, Input, Button, Alert, Spinner
} from 'reactstrap';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth';
import firebase from '../../config/firebase';


const LoginCard = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [authResponse, setAuthResponse] = useState('')

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
            })
            .catch((err)=>{
                console.log("Wrong Email or Password!")
                setAuthResponse('FAILED')
                console.log(err)
            })
    }


    return (
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
                <Button  className='btn-google-signin'><img src='./google-icon.png' width={17} height={17} alt='google'/> Google</Button>
            </div>
        </div>
    )
}

export default LoginCard