import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { authenticateUser } from '@/services';
import { authenticateAdmin } from '@/services';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
// import styles from '../styles/login.module.css'; // Import custom CSS for styling

export default function Login() {
  const { register, handleSubmit, formState: { errors, touchedFields }, trigger } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [warning, setWarning] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
        const token = await authenticateAdmin(data.email, data.password);
        login(token);
        router.push('/admin-dashboard'); // Redirect to admin-specific dashboard
    } catch (error) {
        console.error('Error during admin login:', error);
        setWarning(error.message);
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
        //   className={styles['login-page']}
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1527527613092-72e027fd03f9?q=80&w=1414&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            position: 'relative',
          }}>

          {/* <div className={styles['overlay']}></div>

          <div className={styles['quote-container']}>
            <h1 className={styles['quote-text']}>Travel slowly, see deeply.</h1>
            <p className={styles['quote-subtext']}>Embrace the journey, not the destination.</p>
          </div> */}
        </Col>

        <Col md={5}>
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div>
              {/* Error Messages */}
              {warning && <Alert variant="danger">{warning}</Alert>}

              <h2 className="text-center mb-4">Welcome to Admin page</h2>
              <Form id="login-form" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    {...register('email', { required: 'Email is required' })}
                    isInvalid={touchedFields.email && errors.email}
                    style={{ padding: '15px' }}
                  />
                  {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword" style={{ position: 'relative' }}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register('password', { required: 'Password is required' })}
                    isInvalid={touchedFields.password && errors.password}
                    style={{ padding: '15px', paddingRight: '50px' }}
                  />
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
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </span>
                  {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                </Form.Group>

                <Button
                  variant="success"
                  style={{ padding: '18px', width: '100%', marginBottom: '20px' }}
                  type="submit"
                  onClick={() => trigger()}
                >
                  Sign in
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
