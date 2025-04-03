import { useRouter } from 'next/router';
import { FaUser, FaLock, FaUsers, FaBuilding, FaFileContract, FaBell, FaCogs } from 'react-icons/fa';
import styles from '@/styles/UserProfile.module.css';

const Sidebar = () => {
    const router = useRouter();
    const isActive = (path) => router.pathname === path;

    return (
        <>
            <div>
                <h3>General</h3>
            </div>

            <ul>
                <li className={isActive('/user/profile') ? styles.active : ''} onClick={() => router.push('/user/profile')}><FaUser /> Account</li>
                <li className={isActive('/user/password') ? styles.active : ''} onClick={() => router.push('/user/password')}><FaLock /> Password</li>
                <li className={isActive('/user/notifications') ? styles.active : ''} onClick={() => router.push('/user/notifications')}><FaBell /> Notifications</li>
                <li className={isActive('/user/preferences') ? styles.active : ''} onClick={() => router.push('/user/preferences')}><FaCogs /> Preferences</li>
            </ul>

            <div>
                <h3>Support</h3>
            </div>
            <ul>
                <li className={isActive('/user/help') ? styles.active : ''} onClick={() => router.push('/user/help')}><FaUsers /> Help</li>
                <li className={isActive('/user/contact') ? styles.active : ''} onClick={() => router.push('/user/contact')}><FaBuilding /> Contact Us</li>
                <li className={isActive('/user/faq') ? styles.active : ''} onClick={() => router.push('/user/faq')}><FaFileContract /> FAQ</li>
                <li className={isActive('/user/terms') ? styles.active : ''} onClick={() => router.push('/user/terms')}><FaBell /> Terms of Service</li>
                <li className={isActive('/user/privacy') ? styles.active : ''} onClick={() => router.push('/user/privacy')}><FaCogs /> Privacy Policy</li>
            </ul>
        </>

    );
};

export default Sidebar;
