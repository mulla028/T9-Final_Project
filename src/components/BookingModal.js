import { Modal } from 'react-bootstrap';
import styles from '../styles/login.module.css'; // Import custom CSS for styling

export default function BookingModal({ handleClose, show }) {


    return (
        <Modal dialogClassName={styles['modal-dialog']} onHide={handleClose} show={show} centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Booking</Modal.Title>
            </Modal.Header>

            <Modal.Body className="register-modal-body">
                {/* Add appropriate details */}
            </Modal.Body>
        </Modal>
    );
}
