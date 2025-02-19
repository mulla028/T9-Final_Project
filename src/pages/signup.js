import { GoogleOAuthProvider } from '@react-oauth/google';
import { FacebookProvider } from 'react-facebook';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaFacebook, FaGoogle, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { authenticateUser } from "@/services";
import { useRouter } from "next/router";
import { useAuth } from '@/context/AuthContext';
import RegisterModal from '../components/RegisterModal';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import styles from '../styles/login.module.css';
import { API_BASE_URL } from '../utils/general';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

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
    const [loading, setLoading] = useState({ google: false, facebook: false });

    const router = useRouter();
    const { login } = useAuth();
    const [isAdminLogin, setIsAdminLogin] = useState(false);

    useEffect(() => {
        const role = router.query.role;
        setIsAdminLogin(role === 'admin');
    }, [router.query.role]);

    const handleCloseRegister = () => setShowRegister(false);
    const handleCloseForgotPassword = () => setShowForgotPassword(false);

    const handleSocialLogin = (provider) => {
        setLoading((prev) => ({ ...prev, [provider]: true }));
        const apiUrl = `${API_BASE_URL}/auth/${provider}`;
        window.location.href = apiUrl;
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();
        if (isAdminLogin) {
            try {
                const response = await fetch(`${API_BASE_URL}/Admin/login/admin`, {
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

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <Container fluid className={styles["login-container"]}>
            <GoogleOAuthProvider clientId={clientId}>
                <FacebookProvider appId={facebookAppId}>
                    <div className={styles["login-box"]}>
                        {warning && <Alert variant="danger">{warning}</Alert>}

                        <h3 className={styles['quote-subtext']}>Sign in or create an account</h3>
                        <Form id="login-form" onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label className={styles['custom-label']}> Email Address</Form.Label>
                                <Form.Control className={styles["custom-input"]}
                                    type="email"
                                    placeholder="Enter your email address"
                                    {...register('email', { required: 'Email is required' })}
                                    isInvalid={touchedFields.email && errors.email}
                                />
                                {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword" style={{ position: 'relative' }}>
                                <Form.Label className={styles['custom-label']}> Password</Form.Label>
                                <div className={styles["password-container"]}>
                                    <Form.Control className={styles["custom-input"]}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        {...register('password', { required: 'Password is required' })}
                                        isInvalid={touchedFields.password && errors.password}
                                    />
                                    <span onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                    </span>
                                </div>
                                {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                            </Form.Group>

                            <div className="text-end mt-1">
                                <Button variant="link" className={styles['forgot-password']} onClick={() => setShowForgotPassword(true)}>
                                    Forgot password?
                                </Button>
                            </div>

                            <Button variant="success" className={styles["custom-submit-button"]} type="submit" onClick={() => trigger()}>
                                Sign in
                            </Button>
                        </Form>

                        <div className={styles['social-login-wrapper']}>
                            <div className={styles['or-signin-text']}>
                                <span>Or sign in with</span>
                            </div>

                            <Container className={styles['social-login-buttons']}>
                                <Button className={styles['custom-google-button']} disabled={loading.google} onClick={() => handleSocialLogin('google')}>
                                    {loading.google ? '...' : <FaGoogle size={24} />}
                                </Button>

                                <Button className={styles['custom-facebook-button']} disabled={loading.facebook} onClick={() => handleSocialLogin('facebook')}>
                                    {loading.facebook ? '...' : <FaFacebook size={24} />}
                                </Button>
                            </Container>
                        </div>

                        <div className="text-center mt-1">
                            <Button variant="link" className={styles['register-link']} onClick={() => setShowRegister(true)}>
                                Don't have an account? Register
                            </Button>
                        </div>

                        <div className="text-center mt-5">
                            <p>
                                <small>
                                    By signing in or creating an account, you agree to our <a href="#/terms">Terms of Service</a> and <a href="#/privacy">Privacy Policy</a>
                                </small>
                            </p>
                        </div>
                    </div>
                    <RegisterModal show={showRegister} handleClose={handleCloseRegister} />
                    <ForgotPasswordModal show={showForgotPassword} handleClose={handleCloseForgotPassword} />
                </FacebookProvider>
            </GoogleOAuthProvider>
        </Container>
    );
};