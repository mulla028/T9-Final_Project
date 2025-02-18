import { useForm } from 'react-hook-form';
import { Modal, Button, Form, Row, Col, Alert, Container } from 'react-bootstrap';
import { useState } from 'react';
import { FaFacebook, FaGoogle, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FacebookProvider } from 'react-facebook';
import { registerUser } from "@/services";
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import AppleLogin from 'react-apple-login';
import styles from '../styles/login.module.css'; // Import custom CSS for styling
import { API_BASE_URL } from '@/utils/general';

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
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
    const [showPassword, setShowPassword] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [facebookLoading, setFacebookLoading] = useState(false)
    const router = useRouter();
    const { login } = useAuth();

    // Toggle the visibility of the password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSocialRegister = (provider) => {
        const apiUrl = `${API_BASE_URL}/auth/${provider}`;
        window.location.href = apiUrl; // Redirect the user to the backend's Passport authentication route
    };

    // Google Login
    const onGoogleRegisterSuccess = () => {
        setGoogleLoading(true);
        handleSocialRegister('google');
    };

    // Facebook Login
    const onFacebookRegisterSuccess = () => {
        setFacebookLoading(true);
        handleSocialRegister('facebook');
    };

    // Apple Login
    const onAppleLoginSuccess = (response) => {
        handleSocialRegister(response.authorization.code, 'apple');
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.log('Form submitted'); // Debugging line
        try {
            const { firstName, lastName, email, password, confirmPassword } = data;
            const token = await registerUser({ firstName, lastName, email }, password, confirmPassword);
            if (token) {
                login(token)
                console.log('Registration successful'); // Debugging line

                router.push("/");
            }
        } catch (error) {
            console.error('Error during registration:', error); // Debugging line
            setWarning(error.message);
        }
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

                        <div className="px-5">
                            <Form id="register-form" onSubmit={handleSubmit(onSubmit)}>
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

                                <Form.Group className="mb-3" controlId="formConfirmPassword">
                                    <Form.Label> Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        {...register('confirmPassword', { required: 'Confirm password is required' })}
                                        isInvalid={touchedFields.confirmPassword && errors.confirmPassword}
                                        style={{ padding: '15px' }}
                                    />
                                    {errors.confirmPassword && <Form.Text className="text-danger">{errors.confirmPassword.message}</Form.Text>}
                                </Form.Group>

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
                                    disabled={googleLoading}
                                    onClick={onGoogleRegisterSuccess}
                                >
                                    {googleLoading ? '...' : <FaGoogle size={24} />}
                                </Button>

                                <Button
                                    className={styles['custom-facebook-button']}
                                    disabled={facebookLoading}
                                    onClick={onFacebookRegisterSuccess}
                                >
                                    {facebookLoading ? '...' : <FaFacebook size={24} />}
                                </Button>
                            </Container>
                        </div>
                    </Modal.Body>
                </Modal>
            </FacebookProvider>
        </GoogleOAuthProvider>
    );
}
