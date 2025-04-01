import { useEffect, useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { fetchProfile } from '@/services';

const ProfileDropdown = () => {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({ name: '', email: '', profilePicture: '', phoneNumber: '', location: '' });
    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        fetchProfile().then((data) => {
            setUser(data);
        }).catch((error) => {
            console.error('Error fetching profile:', error);
        });
    }, []);

    const handleLogout = () => {
        logout();
        setTimeout(() => {
            router.push("/");
        }, 2000);
    };

    const toggleDropdown = (isOpen) => {
        setShow(isOpen);
    };

    return (
        <div className="d-flex justify-content-end align-items-center"
            style={{ height: '60px' }}
        >
            <Dropdown
                show={show}
                onToggle={toggleDropdown}
                align="end"
            >
                <Button
                    variant="light"
                    className="p-2 rounded-circle d-flex align-items-center border-0"
                    style={{
                        width: '50px',
                        height: '50px',
                        overflow: 'hidden',
                    }}
                    onClick={() => setShow(!show)}
                >
                    <img
                        src={user.profilePicture} // Replace with your profile image path
                        alt="Profile"
                        className="rounded-circle"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
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
