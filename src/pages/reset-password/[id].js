import { useRouter } from 'next/router'
import { Form, Button, Row, Col, Alert, Container } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navbar } from 'react-bootstrap';
import { setPassword } from '@/services';


export default function resetPassword() {
    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    const [warning, setWarning] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const { register, handleSubmit, watch, formState: { errors, touchedFields }, trigger } = useForm({
        defaultValues: {
            id: id,
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (password, e) => {
        try {
            const response = await setPassword(id, password);
            if (response == 200) {
                router.push("/reset-password-confirmation");
             }
        } catch (error) {
            console.error('Error during reset password:', error); // Debugging line
            setWarning(error.message);
        }
    };

    // Toggle the visibility of the password
    const togglePasswordVisibility1 = () => {
      setShowPassword1(!showPassword1);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
      };
 
    return (
        <>
        <Navbar bg="light" expand="lg">
          <Container fluid="md" >
            <Navbar.Brand href="/">Driftway</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Container>
        </Navbar>
        
            <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                <div>
                    {/* Error Messages */}
                    {warning && <Alert variant="danger">{warning}</Alert>}
                    <h1>Reset Your Password</h1>
                    <Form id="login-form" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicPassword" style={{ position: 'relative' }}>
                            <Form.Label> New Password</Form.Label>
                            <Form.Control
                                type={showPassword1 ? 'text' : 'password'}
                                placeholder="Enter your new password"
                                {...register('password', { required: 'Password is required', minLength: 8})}
                                isInvalid={touchedFields.password && errors.password}
                                style={{ padding: '15px', paddingRight: '50px' }}
                            />
                            {/* Eye Icon Button */}
                            <span
                                onClick={togglePasswordVisibility1}
                                style={{
                                    position: 'absolute',
                                    right: '20px',
                                    top: '50px',
                                    cursor: 'pointer',
                                    zIndex: 2,
                                }}
                            >
                                {/* Change icon based on password visibility */}
                                {showPassword1 ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                            </span>
                            {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                            {errors.password?.type === "minLength" && <Form.Text className="text-danger">Must be at least 8 characters</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword" style={{ position: 'relative' }}>
                            <Form.Label> Confirm Password</Form.Label>
                            <Form.Control
                                type={showPassword2 ? 'text' : 'password'}
                                placeholder="Confirm your new password"
                                {...register('confirmPassword', { 
                                    required: 'Password is required',
                                    validate: (value) => value === watch('password') || 'Passwords do not match' 
                                })}
                                isInvalid={touchedFields.confirmPassword && errors.confirmPassword}
                                style={{ padding: '15px', paddingRight: '50px' }}
                            />
                            {/* Eye Icon Button */}
                            <span
                                onClick={togglePasswordVisibility2}
                                style={{
                                    position: 'absolute',
                                    right: '20px',
                                    top: '50px',
                                    cursor: 'pointer',
                                    zIndex: 2,
                                }}
                            >
                                {/* Change icon based on password visibility */}
                                {showPassword2 ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                            </span>
                            {errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
                                <Form.Text className="text-danger">{errors.confirmPassword.message}</Form.Text>
                            )}
                        </Form.Group>

                        <Button variant="success" style={{ padding: '18px', width: '100%', marginBottom: '20px' }} type="submit" onClick={() => trigger()}>Submit</Button>
                    </Form>
                </div>
            </div>
            </>
    );
}