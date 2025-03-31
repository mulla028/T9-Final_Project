// Description: User Profile Page Component

import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { FaUser, FaGoogle } from 'react-icons/fa';
import { fetchProfile, updateProfile, deleteProfile } from '@/services';
import UserLayout from '@/components/UserLayout';
import styles from '@/styles/UserProfile.module.css';

const UserProfile = () => {
    const [user, setUser] = useState({ name: '', email: '', profilePicture: '', phoneNumber: '', location: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProfile().then((data) => {
            setUser(data);
        }).catch((error) => {
            console.error('Error fetching profile:', error);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateProfile(user);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
        setLoading(false);
    };

    // Handle profile picture upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser({ ...user, profilePicture: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // handle delete account
    const handleDeleteAccount = async () => {
        try {
            await deleteProfile(user._id);
            alert('Account deleted successfully!');
            // Redirect to signup page or logout
            window.location.href = '/signup?role=user';
        }
        catch (error) {
            console.error('Error deleting account:', error);
            alert('Failed to delete account. Please try again.');
            return;
        }
        alert('Account deleted successfully!');
    };

    return (
        <UserLayout>
            {/* Profile form goes here */}
            <Card className={styles["profile-card"]}>
                <div className='mb-4'>
                    <h3>{user.username}</h3>
                    <p>Manage your account settings and set preferences.</p>
                </div>
                <div className={styles["profile-header"]}>
                    {user.profilePicture ? <img src={user.profilePicture} alt="Profile" className={styles["profile-pic"]} /> : <FaUser className={styles["profile-pic"]} />}
                    <label htmlFor="profile-upload" className={styles["custom-file-upload"]}>Upload new picture</label>
                    <input id="profile-upload" type="file" accept="image/*" onChange={handleFileChange} hidden />
                    <Button className={styles["custom-delete-btn"]} onClick={() => setUser({ ...user, profilePicture: '' })}>Delete</Button>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-4" controlId="formFullName">
                                <Form.Label className={styles["custom-label"]}>Full Name</Form.Label>
                                <Form.Control className={styles["custom-input"]} type="text" value={user.username}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-4" controlId="formEmail">
                        <Form.Label className={styles["custom-label"]}>Email</Form.Label>
                        <Form.Control className={styles["custom-input"]} type="email" value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formLocation">
                        <Form.Label className={styles["custom-label"]}>Location</Form.Label>
                        <Form.Control className={styles["custom-input"]} type="text" value={user.location}
                            onChange={(e) => setUser({ ...user, location: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formPhoneNumber">
                        <Form.Label className={styles["custom-label"]}>Phone Number</Form.Label>
                        <Form.Control className={styles["custom-input"]} type="text" value={user.phoneNumber}
                            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} />
                    </Form.Group>

                    <div className="mb-4">
                        <Form.Label className={styles["custom-label"]}>Integrated Accounts</Form.Label>
                        <div className={styles["button-group"]}>
                            <Button variant="dark" className={styles["social-btn"]}><FaGoogle />Connect Google</Button>
                        </div>
                    </div>

                    <div className="mb-5">
                        <Form.Label className={styles["custom-label"]}>Account Security</Form.Label>
                        <div className={styles["button-group"]}>
                            <Button className={styles["custom-button"]} onClick={(handleDeleteAccount)}>Delete my account</Button>
                            <Button variant="dark" type="submit" disabled={loading} className={styles["save-btn"]}>Save changes</Button>
                        </div>
                    </div>
                </Form>
            </Card>
        </UserLayout>
    );
};

export default UserProfile;

