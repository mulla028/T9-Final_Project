// import { useForm } from 'react-hook-form';
// import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
// import { useState } from 'react';
// import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

// export default function RegisterModal({ show, handleClose }) {
//     const { register, handleSubmit, formState: { errors, touchedFields }, trigger, reset } = useForm({
//         defaultValues: {
//             firstName: '',
//             lastName: '',
//             email: '',
//             password: '',
//             confirmPassword: ''
//         }
//     });
//     const [warning, setWarning] = useState('');
//     const [showMessage, setShowMessage] = useState(false);

//     const handleCloseModal = () => {
//         reset();
//         handleClose();
//     };

//     return (
//         <Modal show={show} onHide={handleCloseModal} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Join DriftWay Today</Modal.Title>
//             </Modal.Header>
//             <Modal.Body className="register-modal-body">
//                 {/* Error & Success Messages */}
//                 {warning && <Alert variant="danger">{warning}</Alert>}
//                 {showMessage && <Alert variant="success">Successfully Registered!</Alert>}

//                 <Form id="register-form" onSubmit={handleSubmit()}>
//                     <Row>
//                         <Col>
//                             <Form.Group controlId="firstName">
//                                 <Form.Label><FaUser /> First Name</Form.Label>
//                                 <Form.Control
//                                     placeholder="First name"
//                                     {...register('firstName', { required: 'First name is required' })}
//                                     isInvalid={touchedFields.firstName && errors.firstName}
//                                 />
//                                 {errors.firstName && <Form.Text className="text-danger">{errors.firstName.message}</Form.Text>}
//                             </Form.Group>
//                         </Col>
//                         <Col>
//                             <Form.Group controlId="lastName">
//                                 <Form.Label><FaUser /> Last Name</Form.Label>
//                                 <Form.Control
//                                     placeholder="Last name"
//                                     {...register('lastName', { required: 'Last name is required' })}
//                                     isInvalid={touchedFields.lastName && errors.lastName}
//                                 />
//                                 {errors.lastName && <Form.Text className="text-danger">{errors.lastName.message}</Form.Text>}
//                             </Form.Group>
//                         </Col>
//                     </Row>

//                     <Form.Group className="mt-4 mb-4" controlId="formBasicEmail">
//                         <Form.Label><FaEnvelope /> Email Address</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Enter email"
//                             {...register('email', { required: 'Email is required' })}
//                             isInvalid={touchedFields.email && errors.email}
//                         />
//                         {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
//                     </Form.Group>

//                     <Form.Group className="mb-4" controlId="formBasicPassword">
//                         <Form.Label><FaLock /> Password</Form.Label>
//                         <Form.Control
//                             type="password"
//                             placeholder="Password"
//                             {...register('password', { required: 'Password is required', minLength: 8 })}
//                             isInvalid={touchedFields.password && errors.password}
//                         />
//                         {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formConfirmPassword">
//                         <Form.Label><FaLock /> Confirm Password</Form.Label>
//                         <Form.Control
//                             type="password"
//                             placeholder="Confirm Password"
//                             {...register('confirmPassword', { required: 'Confirm password is required' })}
//                             isInvalid={touchedFields.confirmPassword && errors.confirmPassword}
//                         />
//                         {errors.confirmPassword && <Form.Text className="text-danger">{errors.confirmPassword.message}</Form.Text>}
//                     </Form.Group>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="success" form="register-form" type="submit" onClick={() => trigger()}>Register</Button>
//                 <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }


// import { useForm } from 'react-hook-form';
// import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
// import { useState } from 'react';
// import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import { FacebookProvider, LoginButton } from 'react-facebook';
// import AppleLogin from 'react-apple-login';
// import '../styles/login.module.css'; // Import custom CSS

// const googleClientId = 'YOUR_GOOGLE_CLIENT_ID';
// const facebookAppId = 'YOUR_FACEBOOK_APP_ID';
// const appleClientId = 'YOUR_APPLE_CLIENT_ID';
// const appleRedirectURI = 'YOUR_APPLE_REDIRECT_URI';

// export default function RegisterModal({ show, handleClose }) {
//     const { register, handleSubmit, formState: { errors, touchedFields }, trigger, reset } = useForm({
//         defaultValues: {
//             firstName: '',
//             lastName: '',
//             email: '',
//             password: '',
//             confirmPassword: ''
//         }
//     });
//     const [warning, setWarning] = useState('');
//     const [showMessage, setShowMessage] = useState(false);

//     const handleCloseModal = () => {
//         reset();
//         handleClose();
//     };

//     // const handleGoogleLoginSuccess = (response) => { console.log('Google login success:', response); };
//     // const handleGoogleLoginFailure = (response) => { console.log('Google login failure:', response); };
//     // const handleFacebookResponse = (response) => { console.log('Facebook login response:', response); };
//     // const handleAppleLoginSuccess = (response) => { console.log('Apple login success:', response); };
//     // const handleAppleLoginFailure = (response) => { console.log('Apple login failure:', response); };

//     return (
//         <GoogleOAuthProvider clientId={googleClientId}>
//             <FacebookProvider appId={facebookAppId}>
//                 <Modal show={show} onHide={handleCloseModal} centered>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Join DriftWay Today</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body className="register-modal-body">
//                         {warning && <Alert variant="danger">{warning}</Alert>}
//                         {showMessage && <Alert variant="success">Successfully Registered!</Alert>}

//                         <Form id="register-form" onSubmit={handleSubmit(() => { })}>
//                             <Row>
//                                 <Col>
//                                     <Form.Group controlId="firstName">
//                                         <Form.Label><FaUser /> First Name</Form.Label>
//                                         <Form.Control
//                                             placeholder="First name"
//                                             {...register('firstName', { required: 'First name is required' })}
//                                             isInvalid={touchedFields.firstName && errors.firstName}
//                                         />
//                                         {errors.firstName && <Form.Text className="text-danger">{errors.firstName.message}</Form.Text>}
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId="lastName">
//                                         <Form.Label><FaUser /> Last Name</Form.Label>
//                                         <Form.Control
//                                             placeholder="Last name"
//                                             {...register('lastName', { required: 'Last name is required' })}
//                                             isInvalid={touchedFields.lastName && errors.lastName}
//                                         />
//                                         {errors.lastName && <Form.Text className="text-danger">{errors.lastName.message}</Form.Text>}
//                                     </Form.Group>
//                                 </Col>
//                             </Row>

//                             <Form.Group className="mt-4 mb-4" controlId="formBasicEmail">
//                                 <Form.Label><FaEnvelope /> Email Address</Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     placeholder="Enter email"
//                                     {...register('email', { required: 'Email is required' })}
//                                     isInvalid={touchedFields.email && errors.email}
//                                 />
//                                 {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
//                             </Form.Group>

//                             <Form.Group className="mb-4" controlId="formBasicPassword">
//                                 <Form.Label><FaLock /> Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     placeholder="Password"
//                                     {...register('password', { required: 'Password is required', minLength: 8 })}
//                                     isInvalid={touchedFields.password && errors.password}
//                                 />
//                                 {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
//                             </Form.Group>

//                             <Form.Group className="mb-3" controlId="formConfirmPassword">
//                                 <Form.Label><FaLock /> Confirm Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     placeholder="Confirm Password"
//                                     {...register('confirmPassword', { required: 'Confirm password is required' })}
//                                     isInvalid={touchedFields.confirmPassword && errors.confirmPassword}
//                                 />
//                                 {errors.confirmPassword && <Form.Text className="text-danger">{errors.confirmPassword.message}</Form.Text>}
//                             </Form.Group>
//                         </Form>

//                         <div className="social-login">
//                             <GoogleLogin buttonText="Register with Google" />
//                             <LoginButton scope="email" className="facebook-login-button">
//                                 <span>Register with Facebook</span>
//                             </LoginButton>
//                             <AppleLogin
//                                 clientId={appleClientId}
//                                 redirectURI={appleRedirectURI}
//                                 render={(props) => (
//                                     <Button onClick={props.onClick} className="apple-login-button">
//                                         Register with Apple
//                                     </Button>
//                                 )}
//                             />
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="success" form="register-form" type="submit" onClick={() => trigger()}>Register</Button>
//                         <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </FacebookProvider>
//         </GoogleOAuthProvider>
//     );
// }


import { useForm } from 'react-hook-form';
import { Modal, Button, Form, Row, Col, Alert, Container } from 'react-bootstrap';
import { useState } from 'react';
import { FaFacebook, FaGoogle, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FacebookProvider } from 'react-facebook';
import AppleLogin from 'react-apple-login';
import styles from '../styles/login.module.css'; // Import custom CSS for styling

const googleClientId = 'YOUR_GOOGLE_CLIENT_ID';
const facebookAppId = 'YOUR_FACEBOOK_APP_ID';
const appleClientId = 'YOUR_APPLE_CLIENT_ID';
const appleRedirectURI = 'YOUR_APPLE_REDIRECT_URI';

export default function RegisterModal({ show, handleClose }) {
    const { register, handleSubmit, formState: { errors, touchedFields }, trigger, reset } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });
    const [warning, setWarning] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Toggle the visibility of the password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCloseModal = () => {
        reset();
        handleClose();
    };

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <FacebookProvider appId={facebookAppId}>
                <Modal dialogClassName={styles['modal-dialog']} show={show} onHide={handleCloseModal} centered scrollable>
                    <Modal.Header closeButton>
                        <Modal.Title>Join DriftWay Today</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="register-modal-body">
                        {/* Error & Success Messages */}
                        {warning && <Alert variant="danger">{warning}</Alert>}
                        {showMessage && <Alert variant="success">Successfully Registered!</Alert>}

                        <div className="px-5">
                            <Form id="register-form" onSubmit={handleSubmit(() => { })}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="firstName">
                                            <Form.Label> First Name</Form.Label>
                                            <Form.Control
                                                placeholder="First name"
                                                {...register('firstName', { required: 'First name is required' })}
                                                isInvalid={touchedFields.firstName && errors.firstName}
                                                style={{ padding: '15px' }}
                                            />
                                            {errors.firstName && <Form.Text className="text-danger">{errors.firstName.message}</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="lastName">
                                            <Form.Label> Last Name</Form.Label>
                                            <Form.Control
                                                placeholder="Last name"
                                                {...register('lastName', { required: 'Last name is required' })}
                                                isInvalid={touchedFields.lastName && errors.lastName}
                                                style={{ padding: '15px' }}
                                            />
                                            {errors.lastName && <Form.Text className="text-danger">{errors.lastName.message}</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mt-4 mb-4" controlId="formBasicEmail">
                                    <Form.Label> Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        {...register('email', { required: 'Email is required' })}
                                        isInvalid={touchedFields.email && errors.email}
                                        style={{ padding: '15px' }}
                                    />
                                    {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword" style={{ position: 'relative' }}>
                                    <Form.Label> Password</Form.Label>
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        {...register('password', { required: 'Password is required', minLength: 8 })}
                                        isInvalid={touchedFields.password && errors.password}
                                        style={{ padding: '15px', paddingRight: '50px' }}
                                    />
                                    {/* Eye Icon Button */}
                                    <span
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            position: 'absolute',
                                            right: '15px',
                                            top: '50px',
                                            cursor: 'pointer',
                                            zIndex: 2,
                                        }}
                                    >
                                        {/* Change icon based on password visibility */}
                                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                    </span>
                                    {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                                    {errors.password?.type === "minLength" && <Form.Text className="text-danger">Must be at least 8 characters</Form.Text>}
                                </Form.Group>

                                {/* <Form.Group className="mb-3" controlId="formConfirmPassword">
                                    <Form.Label> Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        {...register('confirmPassword', { required: 'Confirm password is required' })}
                                        isInvalid={touchedFields.confirmPassword && errors.confirmPassword}
                                        style={{ padding: '15px' }}
                                    />
                                    {errors.confirmPassword && <Form.Text className="text-danger">{errors.confirmPassword.message}</Form.Text>}
                                </Form.Group> */}

                                <div className="d-grid gap-2">
                                    <Button variant="success" style={{ padding: '18px', marginTop: '5px', marginBottom: '20px' }} type="submit" onClick={() => trigger()}>Join now</Button>
                                </div>
                            </Form>
                        </div>

                        <div className={styles['social-login-wrapper']}>
                            <div className={styles['or-signin-text']}>
                                <span>Or sign up with</span>
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
                    </Modal.Body>
                </Modal>
            </FacebookProvider>
        </GoogleOAuthProvider>
    );
}
