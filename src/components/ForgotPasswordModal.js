import { useForm } from 'react-hook-form';
<<<<<<< HEAD
<<<<<<< HEAD
import { Modal, Button, Form, Alert } from 'react-bootstrap';
=======
import { Modal, Button, Form, Alert, ModalBody } from 'react-bootstrap';
>>>>>>> 89ea291 (Forgot Password logic and UI implemented using nodemailer (#28))
=======
import { Modal, Button, Form, Alert } from 'react-bootstrap';
>>>>>>> 3bec758 (adding booking feature files)
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css'; // Import custom CSS for styling
import { sendPasswordResetEmail } from '@/services';


export default function ForgotPasswordModal({ handleClose, show }) {
    const { register, handleSubmit, formState: { errors, touchedFields }, trigger, reset } = useForm({
        defaultValues: {
            email: ''
        }
    });

    const [warning, setWarning] = useState('');
    const router = useRouter();

    const onSubmit = async (email, e) => {
        e.preventDefault();
        console.log('Form submitted'); // Debugging line
<<<<<<< HEAD
<<<<<<< HEAD
        try {
            const response = await sendPasswordResetEmail(email);
            if (response == 200) {
                router.push("/reset-password-feedback");
            }
        } catch (error) {
            console.error('Error during sending email:', error); // Debugging line
            setWarning(error.message);
        }
=======
         try {
             const response = await sendPasswordResetEmail(email);
             if (response == 200) {
                router.push("/reset-password-feedback");
             }
         } catch (error) {
             console.error('Error during sending email:', error); // Debugging line
             setWarning(error.message);
         }
>>>>>>> 89ea291 (Forgot Password logic and UI implemented using nodemailer (#28))
=======
        try {
            const response = await sendPasswordResetEmail(email);
            if (response == 200) {
                router.push("/reset-password-feedback");
            }
        } catch (error) {
            console.error('Error during sending email:', error); // Debugging line
            setWarning(error.message);
        }
>>>>>>> 3bec758 (adding booking feature files)
    };

    const handleCloseModal = () => {
        reset();
        handleClose();
    };

    return (
<<<<<<< HEAD
<<<<<<< HEAD
        <Modal dialogClassName={styles['modal-dialog']} onHide={handleCloseModal} show={show} centered scrollable>
=======
        <Modal dialogClassName={styles['modal-dialog']} onHide={handleCloseModal} show={show}centered scrollable>
>>>>>>> 89ea291 (Forgot Password logic and UI implemented using nodemailer (#28))
=======
        <Modal dialogClassName={styles['modal-dialog']} onHide={handleCloseModal} show={show} centered scrollable>
>>>>>>> 3bec758 (adding booking feature files)
            <Modal.Header closeButton>
                <Modal.Title>Forgot Your Password ?</Modal.Title>
            </Modal.Header>

            <Modal.Body className="register-modal-body">
                {/* Error & Success Messages */}
                {warning && <Alert variant="danger">{warning}</Alert>}

                <div className="px-5">
                    <Form id="forgot-password-form" onSubmit={handleSubmit(onSubmit)} >
<<<<<<< HEAD
<<<<<<< HEAD
                        <Form.Group className="mt-4 mb-4" controlId="formEmail">
                            <Form.Label className={styles['custom-label']}> Email Address</Form.Label>
                            <Form.Control className={styles["custom-input"]}
=======
                        <Form.Group className="mt-4 mb-4" controlId="formBasicEmail">
                            <Form.Label> Email Address</Form.Label>
                            <Form.Control
>>>>>>> 89ea291 (Forgot Password logic and UI implemented using nodemailer (#28))
=======
                        <Form.Group className="mt-4 mb-4" controlId="formEmail">
                            <Form.Label className={styles['custom-label']}> Email Address</Form.Label>
                            <Form.Control className={styles["custom-input"]}
>>>>>>> 3bec758 (adding booking feature files)
                                type="email"
                                placeholder="Enter your email address"
                                {...register('email', { required: 'Email is required' })}
                                isInvalid={touchedFields.email && errors.email}
<<<<<<< HEAD
<<<<<<< HEAD
                            />
                            {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                        </Form.Group>
                        <div className="mb-4">
                            <Button variant="success" className={styles['custom-submit-button']} type="submit" onClick={() => trigger()}>Submit</Button>
=======
                                style={{ padding: '15px' }}
                            />
                            {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="success" style={{ padding: '18px', marginTop: '5px', marginBottom: '20px' }} type="submit" onClick={() => trigger()}>Submit</Button>
>>>>>>> 89ea291 (Forgot Password logic and UI implemented using nodemailer (#28))
=======
                            />
                            {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                        </Form.Group>
                        <div className="mb-4">
                            <Button variant="success" className={styles['custom-submit-button']} type="submit" onClick={() => trigger()}>Submit</Button>
>>>>>>> 3bec758 (adding booking feature files)
                        </div>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    );
}
