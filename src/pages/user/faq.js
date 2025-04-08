import { useEffect, useState } from 'react';
import { Container, Accordion, Spinner, Alert } from 'react-bootstrap';
import UserLayout from '@/components/UserLayout';
import styles from '@/styles/UserProfile.module.css';
import { fetchFaqs } from '@/services';

const FAQPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFaqs().then((data) => {
            setFaqs(data);
            setError('');
        }).catch((err) => {
            console.error('Error fetching FAQs:', err);
            setError('Failed to load FAQs.');
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <UserLayout title="FAQs" className={styles.faqPage}>
            <Container style={{ marginTop: '0px' }}>
                <h2 className="text-center mb-4">Frequently Asked Questions</h2>

                {loading && <Spinner animation="border" className="d-block mx-auto" />}
                {error && <Alert variant="danger">{error}</Alert>}

                <Accordion defaultActiveKey="0">
                    {faqs.map((faq, idx) => (
                        <Accordion.Item eventKey={idx.toString()} key={faq._id}>
                            <Accordion.Header>{faq.question}</Accordion.Header>
                            <Accordion.Body>{faq.answer}</Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Container>
        </UserLayout>
    );
};

export default FAQPage;
