import { useForm } from 'react-hook-form';
import { Modal, Button, Form, Alert, ModalBody } from 'react-bootstrap';
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
         try {
             const response = await sendPasswordResetEmail(email);
             if (response == 200) {
                router.push("/reset-password-feedback");
             }
         } catch (error) {
             console.error('Error during sending email:', error); // Debugging line
             setWarning(error.message);
         }
    };

    const handleCloseModal = () => {
        reset();
        handleClose();
    };

    return (
        <Modal dialogClassName={styles['modal-dialog']} onHide={handleCloseModal} show={show}centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Forgot Your Password ?</Modal.Title>
            </Modal.Header>

            <Modal.Body className="register-modal-body">
                {/* Error & Success Messages */}
                {warning && <Alert variant="danger">{warning}</Alert>}

                <div className="px-5">
                    <Form id="forgot-password-form" onSubmit={handleSubmit(onSubmit)} >
                        <Form.Group className="mt-4 mb-4" controlId="formBasicEmail">
                            <Form.Label> Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email address"
                                {...register('email', { required: 'Email is required' })}
                                isInvalid={touchedFields.email && errors.email}
                                style={{ padding: '15px' }}
                            />
                            {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="success" style={{ padding: '18px', marginTop: '5px', marginBottom: '20px' }} type="submit" onClick={() => trigger()}>Submit</Button>
                        </div>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    );
}
