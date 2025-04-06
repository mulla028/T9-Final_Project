import { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { fetchTerms } from '@/services'

const TermsPage = () => {
    const [terms, setTerms] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTerms().then((data) => {
            if (data) {
                setTerms(data);
            }
        }).catch((err) => {
            setError('Unable to load Terms of Service.');
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <Container style={{ marginTop: '0px', paddingBottom: '40px' }}>
            <h2 className="text-center mb-4">Terms of Service</h2>

            {loading && <Spinner animation="border" className="d-block mx-auto" />}
            {error && <Alert variant="danger">{error}</Alert>}

            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {terms}
            </div>
        </Container>
    );
};

export default TermsPage;
