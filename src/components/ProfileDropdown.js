import { useEffect, useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { fetchProfile } from '@/services';
import { FaUser } from 'react-icons/fa';
import styles from '@/styles/UserProfile.module.css';

const ProfileDropdown = () => {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        profilePicture: '',
        phoneNumber: '',
        location: ''
    });

    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        fetchProfile()
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
            });
    }, []);

    const handleLogout = () => {
        logout();
        setTimeout(() => {
            router.push('/');
        }, 2000);
    };

    const toggleDropdown = (isOpen) => {
        setShow(isOpen);
    };

    const rawLastName = user?.name?.split(" ").slice(-1)[0] || user?.username?.split(" ").slice(-1)[0];
    const lastName = rawLastName ? rawLastName.charAt(0).toUpperCase() + rawLastName.slice(1) : '';

    return (
        <div className="d-flex justify-content-end align-items-center" style={{ height: '60px' }}>
            <Dropdown show={show} onToggle={toggleDropdown} align="end">
                <Button
                    variant="light"
                    className="p-2 rounded-circle d-flex align-items-center justify-content-center border-0"
                    style={{
                        width: '60px',
                        height: '60px',
                        overflow: 'hidden',
                    }}
                    onClick={() => setShow(!show)}
                >
                    {!user.profilePicture ? (
                        <img src="/icon/default-icon.png" alt="default" style={{ width: '60px', height: '60px', borderRadius: '50%', marginLeft:'0px'}}/>
                    ) : (
                        <img
                            src={user.profilePicture}
                            alt="Profile"
                            className="rounded-circle"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                    )}
                </Button>

                <Dropdown.Menu style={{ width: '350px', padding: '15px' }}>
                    <Dropdown.Item href="/user/profile">View Account</Dropdown.Item>
                    <Dropdown.Item href={`/overview/?id=${user._id}`}>Trips</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default ProfileDropdown;
