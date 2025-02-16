import { useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const ProfileDropdown = () => {
    const [show, setShow] = useState(false);
    const { logout } = useAuth();
    const router = useRouter();

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
                        src="https://images.unsplash.com/photo-1466112928291-0903b80a9466?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your profile image path
                        alt="Profile"
                        className="rounded-circle"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Button>

                <Dropdown.Menu style={{ width: '350px', padding: '15px' }}>
                    <Dropdown.Item href="#">View Account</Dropdown.Item>
                    <Dropdown.Item href="#">Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default ProfileDropdown;
