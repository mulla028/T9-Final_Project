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

            {loading && <Spinner animation="border" className="d-block mx-auto" />}
            {error && <Alert variant="danger">{error}</Alert>}

            <div dangerouslySetInnerHTML={{ __html: terms }} />
        </Container>
    );
};

export default TermsPage;
