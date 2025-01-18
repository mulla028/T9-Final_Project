// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import { FacebookProvider, LoginButton } from 'react-facebook';
// import AppleLogin from 'react-apple-login';
// import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';
// import { useState } from 'react';
// import { FaEnvelope, FaLock } from 'react-icons/fa';
// import RegisterModal from '../components/RegisterModal'; // Adjust the path as needed
// import '../styles/login.module.css'; // Import custom CSS

// const clientId = 'YOUR_GOOGLE_CLIENT_ID';
// const facebookAppId = 'YOUR_FACEBOOK_APP_ID';
// const appleClientId = 'YOUR_APPLE_CLIENT_ID';
// const appleRedirectURI = 'YOUR_APPLE_REDIRECT_URI';

// export default function Login() {
//     const { register, handleSubmit, formState: { errors, touchedFields }, trigger } = useForm({
//         defaultValues: {
//             email: '',
//             password: ''
//         }
//     });
//     const [warning, setWarning] = useState('');
//     const [showRegister, setShowRegister] = useState(false);

//     // const handleGoogleLoginSuccess = (response) => { console.log('Google login success:', response); };
//     // const handleGoogleLoginFailure = (response) => { console.log('Google login failure:', response); };
//     // const handleFacebookResponse = (response) => { console.log('Facebook login response:', response); };
//     // const handleAppleLoginSuccess = (response) => { console.log('Apple login success:', response); };
//     // const handleAppleLoginFailure = (response) => { console.log('Apple login failure:', response); };

//     return (
//         <GoogleOAuthProvider clientId={clientId}>
//             <FacebookProvider appId={facebookAppId}>
//                 <div className="login-page">
//                     <main>
//                         <Row className="justify-content-center">
//                             <Col md={4}>
//                                 <h1 className="text-center">Welcome Back to DriftWay</h1>
//                                 <div className="p-4">
//                                     {warning && <Alert variant="danger">{warning}</Alert>}

//                                     <Form id="login-form" onSubmit={handleSubmit(() => { })}>
//                                         <Form.Group className="mb-3" controlId="formBasicEmail">
//                                             <Form.Label><FaEnvelope /> Email Address</Form.Label>
//                                             <Form.Control
//                                                 type="email"
//                                                 placeholder="Enter email"
//                                                 {...register('email', { required: 'Email is required' })}
//                                                 isInvalid={touchedFields.email && errors.email}
//                                             />
//                                             {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
//                                         </Form.Group>

//                                         <Form.Group className="mb-3" controlId="formBasicPassword">
//                                             <Form.Label><FaLock /> Password</Form.Label>
//                                             <Form.Control
//                                                 type="password"
//                                                 placeholder="Password"
//                                                 {...register('password', { required: 'Password is required' })}
//                                                 isInvalid={touchedFields.password && errors.password}
//                                             />
//                                             {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
//                                         </Form.Group>

//                                         <Button variant="success" className="w-100 mb-4" type="submit" onClick={() => trigger()}>Login</Button>
//                                     </Form>

//                                     <div className="social-login">
//                                         <GoogleLogin buttonText="Login with Google" />
//                                         <LoginButton scope="email" className="facebook-login-button">
//                                             <span>Login with Facebook</span>
//                                         </LoginButton>
//                                         <AppleLogin
//                                             clientId={appleClientId}
//                                             redirectURI={appleRedirectURI}
//                                             render={(props) => (
//                                                 <Button onClick={props.onClick} className="apple-login-button">
//                                                     Login with Apple
//                                                 </Button>
//                                             )}
//                                         />
//                                     </div>
//                                     <Button variant="link" onClick={() => setShowRegister(true)}>Don't have an account? Register</Button>
//                                 </div>
//                             </Col>
//                         </Row>
//                     </main>
//                 </div>
//                 <RegisterModal show={showRegister} handleClose={() => setShowRegister(false)} />
//             </FacebookProvider>
//         </GoogleOAuthProvider>
//     );
// }


import { GoogleOAuthProvider } from '@react-oauth/google';
import { FacebookProvider } from 'react-facebook';
import AppleLogin from 'react-apple-login';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaFacebook, FaGoogle, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import RegisterModal from '../components/RegisterModal'; // Import the modal component
import styles from '../styles/login.module.css'; // Import custom CSS for styling

const clientId = 'YOUR_GOOGLE_CLIENT_ID';
const facebookAppId = 'YOUR_FACEBOOK_APP_ID';
const appleClientId = 'YOUR_APPLE_CLIENT_ID';
const appleRedirectURI = 'YOUR_APPLE_REDIRECT_URI';

export default function Login() {
    const { register, handleSubmit, formState: { errors, touchedFields }, trigger } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const [showRegister, setShowRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Toggle the visibility of the password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <Row>
                <Col md={7}
                    className={styles['login-page']}
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1527527613092-72e027fd03f9?q=80&w=1414&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100vh',
                        position: 'relative',
                    }}>

                    {/* Overlay Div */}
                    <div className={styles['overlay']}></div>

                    {/* Quote Text Container */}
                    <div className={styles['quote-container']}>
                        <h1 className={styles['quote-text']}>Travel slowly, see deeply.</h1>
                        <p className={styles['quote-subtext']}>Embrace the journey, not the destination.</p>
                    </div>
                </Col>

                <Col md={5}>
                    <GoogleOAuthProvider clientId={clientId}>
                        <FacebookProvider appId={facebookAppId}>
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                                <div>
                                    <h2 className="text-center mb-4">Welcome Back to DriftWay</h2>
                                    <Form id="login-form" onSubmit={handleSubmit(() => { })}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label> Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter your email address"
                                                {...register('email', { required: 'Email is required' })}
                                                isInvalid={touchedFields.email && errors.email}
                                                style={{ padding: '15px' }} />
                                            {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword" style={{ position: 'relative' }}>
                                            <Form.Label> Password</Form.Label>
                                            <Form.Control
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter your password"
                                                {...register('password', { required: 'Password is required' })}
                                                isInvalid={touchedFields.password && errors.password}
                                                style={{ padding: '15px', paddingRight: '50px' }}
                                            />
                                            {/* Eye Icon Button */}
                                            <span
                                                onClick={togglePasswordVisibility}
                                                style={{
                                                    position: 'absolute',
                                                    right: '20px',
                                                    top: '50px',
                                                    cursor: 'pointer',
                                                    zIndex: 2,
                                                }}
                                            >
                                                {/* Change icon based on password visibility */}
                                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                            </span>
                                            {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                                        </Form.Group>

                                        <Button variant="success" style={{ padding: '18px', width: '100%', marginBottom: '20px' }} type="submit" onClick={() => trigger()}>Sign in</Button>
                                    </Form>

                                    <div className={styles['social-login-wrapper']}>
                                        <div className={styles['or-signin-text']}>
                                            <span>Or sign in with</span>
                                        </div>

                                        {/* Social login options container */}
                                        <Container className={styles['social-login-buttons']}>
                                            <Button
                                                className={styles['custom-google-button']}
                                                onClick={() => console.log('Google login initiated')}
                                            >
                                                <FaGoogle size={24} />
                                            </Button>

                                            <Button
                                                className={styles['custom-facebook-button']}
                                                onClick={() => console.log('Facebook login initiated')}
                                            >
                                                <FaFacebook size={24} />
                                            </Button>

                                            <AppleLogin
                                                clientId={appleClientId}
                                                redirectURI={appleRedirectURI}
                                                render={(props) => (
                                                    <Button
                                                        className={styles['custom-apple-button']}
                                                        onClick={props.onClick}
                                                    >
                                                        <FaApple size={24} />
                                                    </Button>
                                                )}
                                            />
                                        </Container>
                                    </div>


                                    <div className="text-center mt-3">
                                        <Button variant="link" onClick={() => setShowRegister(true)}>Don't have an account? Register</Button>
                                    </div>
                                </div>
                            </div>
                            <RegisterModal show={showRegister} handleClose={() => setShowRegister(false)} />
                        </FacebookProvider>
                    </GoogleOAuthProvider>
                </Col>
            </Row>
        </div>
    );
}
