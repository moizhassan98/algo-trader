import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Form, FormGroup, Label, Input, Button, Alert, Spinner
} from 'reactstrap';
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { firebase, db } from '../../config/firebase';
import { createUser, setAuthToken } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

const SignupCard = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [authResponse, setAuthResponse] = useState('')
    const [pageLoading, setPageLoading] = useState(true)

    useEffect(()=>{
        const auth = getAuth();
        getRedirectResult(auth)
            .then(async(result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                console.log("SIGNED IN USER: ",user)
                await saveToken()
                await createUserInFirestore(user)
                navigate('/dashboard',{replace: true})
            }).catch((error) => {
                setPageLoading(false)
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
        setAuthResponse('')
        event.preventDefault();
        validateEmail();
        validatePassword();
        if(!emailError && !passwordError){
            await signupWithEmailPass()

        }
    };

    const signupWithEmailPass = async() =>{
        setAuthResponse('WAIT')
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,email.trim(),password.trim())
            .then(async (userCredential)=>{
                setAuthResponse('')
                await saveToken()
                await createUserInFirestore(userCredential.user);
                navigate('/dashboard',{replace: true})
            })
            .catch((error)=>{
                if(error.code === "auth/email-already-in-use"){
                    setAuthResponse("EXISTS")
                }
                else{
                    setAuthResponse('FAILED')
                }
                
            })
    }

    const signupWithGoogle = async() =>{
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithRedirect(auth, provider);
    }

    const createUserInFirestore = async(user) =>{
        const {email, uid, emailVerified} = user
        dispatch(createUser({email,uid,emailVerified}))
    }

    const saveToken = async() =>{
        const auth = getAuth();
        var authToken = await auth.currentUser.getIdToken(true);
        dispatch(setAuthToken(authToken))
    }

    return ( pageLoading===true ? <Spinner/> :
        <div className="login-card">
            <img src='./gen.png' className='img-fluid margin-10 d-block mt-3' width={'100px'} height={'100px'} style={{margin:'auto'}} alt=''/>
            <h2 className='text-align-center mt-3'>Signup</h2>

            {authResponse === "FAILED" ?
                <Alert color='danger'>Unable to Signup! Try again</Alert>
                :null
            }

            {authResponse === "EXISTS" ?
                <Alert color='danger'>You are already Signed up! Please Login.</Alert>
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
                        <Button type="submit" color="primary" className='signin-btn'>Sign Up</Button>
                    }
                    
                </div>
                
            </Form>
            <div className="d-flex justify-content-center"><hr style={{width: '25%',marginRight: '5px'}}/>{"or continue with"}  <hr style={{width: '25%', marginLeft: '5px'}}/></div>
            <div className="d-flex justify-content-center">
                <Button onClick={signupWithGoogle} className='btn-google-signin'><img src='./google-icon.png' width={17} height={17} alt='google'/> Google</Button>
            </div>
        </div>
    )
}

export default SignupCard