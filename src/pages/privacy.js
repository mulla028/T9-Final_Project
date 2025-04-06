import { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { fetchPolicy } from '@/services';

const PrivacyPolicyPage = () => {
    const [privacy, setPrivacy] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPolicy().then((data) => {
            if (data) {
                setPrivacy(data);
            }
        }).catch((err) => {
            setError('Unable to load Privacy Policy.');
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <Container style={{ marginTop: '0px', paddingBottom: '40px' }}>
            <h2 className="text-center mb-4">Privacy Policy</h2>

            {loading && <Spinner animation="border" className="d-block mx-auto" />}
            {error && <Alert variant="danger">{error}</Alert>}

            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {privacy}
            </div>
        </Container>
    );
};

export default PrivacyPolicyPage;
