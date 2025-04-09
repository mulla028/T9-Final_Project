import UserLayout from '@/components/UserLayout';
import { useForm } from 'react-hook-form';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { updatePassword } from "@/services";
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import userStyles from '@/styles/UserProfile.module.css';
import styles from '@/styles/login.module.css';


const PasswordSettings = () => {

    const { register, handleSubmit, formState: { errors, touchedFields }, trigger, reset } = useForm({
        defaultValues: {
            password: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    const [warning, setWarning] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const { logout } = useAuth();

    // Toggle the visibility of the password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.log('Form submitted'); // Debugging line
        try {
            const { password, newPassword, confirmPassword } = data;
            const res = await updatePassword(password, newPassword, confirmPassword);
            if (res === 200) {
                console.log('password change successful'); // Debugging line
                logout()

                router.push("/signup?role=user");
            }
        } catch (error) {
            console.error('Error updating password:', error); // Debugging line
            setWarning(error.message);
        }
    };


    return (
        <UserLayout>
            <Card className={userStyles["profile-card"]}>
                <div className='mb-4'>
                    <p>Manage your password</p>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                    <Form.Group className="mb-4" controlId="formPassword" style={{ position: 'relative' }}>
                        <Form.Label className={userStyles['custom-label']}>Old Password</Form.Label>
                        <div className={styles["password-container"]}>
                            <Form.Control className={userStyles["custom-input"]}
                                type={showPassword ? "text" : "password"}
                                {...register('password', { required: 'Password is required', minLength: 8 })}
                                isInvalid={touchedFields.password && errors.password}
                            // style={{ padding: '15px', paddingRight: '50px' }}
                            />
                            {/* Eye Icon Button */}
                            <span onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </span>
                        </div>
                        {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                    </Form.Group>
                    {errors.password?.type === "minLength" && <Form.Text className="text-danger">Must be at least 8 characters</Form.Text>}

                    <Form.Group className="mb-4" controlId="formNewPassword">
                        <Form.Label className={userStyles['custom-label']}> New Password</Form.Label>
                        <div className={styles["password-container"]}>
                            <Form.Control className={userStyles["custom-input"]}
                                type={showPassword ? "text" : "password"}
                                {...register('newPassword', { required: 'New password is required', minLength: 8 })}
                                isInvalid={touchedFields.newPassword && errors.newPassword}
                            // style={{ padding: '15px' }}
                            />
                            {/* Eye Icon Button */}
                            <span onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </span>
                        </div>
                        {errors.newPassword && <Form.Text className="text-danger">{errors.newPassword.message}</Form.Text>}
                    </Form.Group>
                    {errors.newPassword?.type === "minLength" && <Form.Text className="text-danger">Must be at least 8 characters</Form.Text>}

                    <Form.Group className="mb-4" controlId="formConfirmPassword">
                        <Form.Label className={userStyles['custom-label']}> Confirm Password</Form.Label>
                        <Form.Control className={userStyles["custom-input"]}
                            type="password"
                            {...register('confirmPassword', { required: 'Confirm password is required' })}
                            isInvalid={touchedFields.confirmPassword && errors.confirmPassword}
                        // style={{ padding: '15px' }}
                        />
                        {errors.confirmPassword && <Form.Text className="text-danger">{errors.confirmPassword.message}</Form.Text>}
                    </Form.Group>

                    <div style={{ textAlign: 'right', marginTop: '50px' }}>
                        <Button variant="dark" className={userStyles["save-btn"]} type="submit" onClick={() => trigger()}>Change</Button>
                    </div>
                    {warning && <Alert variant="danger">{warning}</Alert>}
                </Form>
            </Card>
        </UserLayout>
    );
};

export default PasswordSettings;
