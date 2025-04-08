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
        <Container style={{ marginTop: '0px', paddingBottom: '10px' }}>

            {loading && <Spinner animation="border" className="d-block mx-auto" />}
            {error && <Alert variant="danger">{error}</Alert>}

            <div dangerouslySetInnerHTML={{ __html: privacy }} />
        </Container>
    );
};

export default PrivacyPolicyPage;
