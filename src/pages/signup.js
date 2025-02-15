import { GoogleOAuthProvider } from '@react-oauth/google';
import { FacebookProvider } from 'react-facebook';
import AppleLogin from 'react-apple-login';
import { Form, Button, Row, Col, Alert, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FaFacebook, FaGoogle, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { authenticateUser } from "@/services";
import { useRouter } from "next/router";
import { useAuth } from '@/context/AuthContext';
import RegisterModal from '../components/RegisterModal'; // Import the modal component
import ForgotPasswordModal from '../components/ForgotPasswordModal'; // Import the modal component
import styles from '../styles/login.module.css'; // Import custom CSS for styling

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
const appleClientId = 'YOUR_APPLE_CLIENT_ID';
const appleRedirectURI = 'YOUR_APPLE_REDIRECT_URI';

export default function Login() {
  const { register, handleSubmit, formState: { errors, touchedFields }, trigger } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [warning, setWarning] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false)
  const router = useRouter();
  const { login } = useAuth();
  const [isAdminLogin, setIsAdminLogin] = useState()

  const handleClose = () => {
    //reset(); // Reset the form fields and touched fields
    setShowRegister(false);
  };

  const handleCloseForgotPassword = () => {
    //reset(); // Reset the form fields and touched fields
    setShowForgotPassword(false);
  };
  
  const handleShow = () => setShowRegister(true);
  const handleShowForgotPassword = () => setShowForgotPassword(true);

  const handleSocialLogin = (provider) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}`;
    window.location.href = apiUrl; // Redirect the user to the backend's Passport authentication route
  };

  // Google Login
  const onGoogleLoginSuccess = () => {
    setGoogleLoading(true);
    handleSocialLogin('google')
  };

  // Facebook Login
  const onFacebookLoginSuccess = () => {
    setFacebookLoading(true);
    handleSocialLogin('facebook')
  };

  // Apple Login
  const onAppleLoginSuccess = (response) => {
    handleSocialLogin(response.authorization.code, 'apple');
  };

  useEffect(() => {
    const role = router.query.role
    if (role === 'admin') {
      setIsAdminLogin(true)
    } else {
      setIsAdminLogin(false)
    }
    console.log(role)
  }, [router.query.role])

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (isAdminLogin) {
      try {
        const response = await fetch("http://localhost:8080/api/Admin/login/admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        const result = await response.json();

        if (response.ok && result.role === "admin") {
          localStorage.setItem("token", result.token);
          router.push("/admin");
        } else {
          setWarning(result.message || "You are not an admin");
        }
      } catch (error) {
        setWarning("Error connecting to the server");
        console.error("Admin login error:", error);
      }
    } else {
      try {
        const token = await authenticateUser(data.email, data.password);
        login(token);
        router.push("/");
      } catch (error) {
        console.error("Login error:", error);
        setWarning(error.message);
      }
    }
  };

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
                  {/* Error Messages */}
                  {warning && <Alert variant="danger">{warning}</Alert>}

                  <h2 className="text-center mb-4">Welcome Back to DriftWay</h2>
                  <Form id="login-form" onSubmit={handleSubmit(onSubmit)}>
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
                        disabled={googleLoading}
                        onClick={onGoogleLoginSuccess}
                      >
                        {googleLoading ? '...' : <FaGoogle size={24} />}
                      </Button>

                      <Button
                        className={styles['custom-facebook-button']}
                        disabled={facebookLoading}
                        onClick={onFacebookLoginSuccess}
                      >
                        {facebookLoading ? '...' : <FaFacebook size={24} />}
                      </Button>
                    </Container>
                  </div>

                  <div className="text-center mt-1">
                    {!isAdminLogin && ( <Button variant="link" onClick={handleShow}>Don't have an account? Register</Button> )}
                  </div>
                  <div className="text-center">
              <ForgotPasswordModal show={showForgotPassword} handleClose={handleCloseForgotPassword} /> 
                  {!isAdminLogin && ( <Button variant="link" onClick={handleShowForgotPassword}>Forgot your password?</Button>  )}
                  </div>
                </div>
              </div>
              <RegisterModal show={showRegister} handleClose={handleClose} />
              <ForgotPasswordModal show={showForgotPassword} handleClose={handleCloseForgotPassword} />
            </FacebookProvider>
          </GoogleOAuthProvider>
        </Col>
      </Row>
    </div>
  );
}
