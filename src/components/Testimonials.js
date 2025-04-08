import { Container, Carousel, Button } from 'react-bootstrap';
import { isAuthenticated } from '@/services';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Testimonials = () => {
    const testimonials = [
        {
            image: '/icon/Emily.jpg',
            name: 'Emily, Bali',
            quote: 'Thanks to DriftWay, I connected with local artisans in Bali while staying at an eco-friendly homestay. Truly an unforgettable experience!',
            rating: '⭐⭐⭐⭐⭐'
        },
        {
            image: '/icon/Liam.jpg',
            name: 'Liam, Kyoto',
            quote: 'The best part of my trip to Kyoto was the slow travel. DriftWay helped me discover quiet temples and eco-friendly stays.',
            rating: '⭐⭐⭐⭐⭐'
        },
        {
            image: '/icon/Sophia.jpg',
            name: 'Sophia, Tuscany',
            quote: 'I stayed at a sustainable farmhouse in Tuscany and got to experience the local culture up close. DriftWay made it all so easy.',
            rating: '⭐⭐⭐⭐'
        },
    ];
    const router = useRouter();

    const handleButtonClick = () => {
        const authState = isAuthenticated();
        const destination = authState ? "/communityfeedback" : "/signup?role=user";
        router.push(destination);
    };

    return (
        <div className="testimonials" style={{ padding: '60px 0', backgroundColor: '#fff' }}>
            <Container>
                <h2 className="text-center mb-4">What Our Travelers Say</h2>
                <Carousel>
                    {testimonials.map((testimonial, index) => (
                        <Carousel.Item key={index} style={{ minHeight: '340px' }}>
                            <div className="d-flex justify-content-center">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="testimonial-img"
                                    style={{
                                        borderRadius: '50%',
                                        width: '120px',
                                        height: '120px',
                                        objectFit: 'cover',
                                        border: '3px solid #ddd',
                                    }}
                                />
                            </div>
                            <Carousel.Caption>
                                <p className="testimonial-quote">"{testimonial.quote}"</p>
                                <h5 style={{ fontWeight: 'bold' }}>{testimonial.name}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>{testimonial.rating}</h5>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>

            <div>
                <p className="text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    We would love to hear about your travel experiences and suggestions. Your feedback helps us improve and offer better services.
                </p>
            </div>

            <div className="d-flex justify-content-center mt-5">
                <Link href="/feedback" passHref>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleButtonClick}
                        style={{
                            padding: '12px 30px',
                            borderRadius: '30px',
                            background: 'linear-gradient(90deg, #28a745, #218838)',
                            border: 'none',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        Share Your Experience
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Testimonials;