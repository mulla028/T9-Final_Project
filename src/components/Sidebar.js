import { useRouter } from 'next/router';
import { FaUser, FaLock, FaUsers, FaEnvelope, FaFileContract } from 'react-icons/fa';
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
                <li className={isActive('/user/profile') ? styles.active : ''} onClick={() => router.push('/user/profile')}><FaUser /> Profile</li>
                <li className={isActive('/user/password') ? styles.active : ''} onClick={() => router.push('/user/password')}><FaLock /> Password</li>
            </ul>

            <div>
                <h3>Support</h3>
            </div>
            <ul>
                <li className={isActive('/user/help') ? styles.active : ''} onClick={() => router.push('/user/help')}><FaUsers /> Help</li>
                <li className={isActive('/user/contact') ? styles.active : ''} onClick={() => router.push('/user/contact')}><FaEnvelope /> Contact Us</li>
                <li className={isActive('/user/faq') ? styles.active : ''} onClick={() => router.push('/user/faq')}><FaFileContract /> FAQ</li>
            </ul>
        </>

    );
};

export default Sidebar;
