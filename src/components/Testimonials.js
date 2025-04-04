import { Container, Carousel,Button } from 'react-bootstrap';
import { isAuthenticated } from '@/services';
import { useRouter } from 'next/router';

const Testimonials = () => {
    const testimonials = [
        {
            image: '/icon/Emily.jpg', 
            name: 'Emily, Bali',
            quote: 'Thanks to DriftWay, I connected with local artisans in Bali while staying at an eco-friendly homestay. Truly an unforgettable experience!',
            Rating:'⭐⭐⭐⭐⭐'
        },
        {
            image: '/icon/Liam.jpg', 
            name: 'Liam, Kyoto',
            quote: 'The best part of my trip to Kyoto was the slow travel. DriftWay helped me discover quiet temples and eco-friendly stays.',
            Rating:'⭐⭐⭐⭐⭐'
        },
        {
            image: '/icon/Sophia.jpg', 
            name: 'Sophia, Tuscany',
            quote: 'I stayed at a sustainable farmhouse in Tuscany and got to experience the local culture up close. DriftWay made it all so easy.',
            Rating:'⭐⭐⭐⭐'
        },
    ];
    const router = useRouter();

    const handleButtonClick = () => {
        const authState = isAuthenticated();
        const destination = authState ? "/communityfeedback" : "/signup"; 
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
                                <h5 style={{ fontWeight: 'bold' }}>{testimonial.Rating}</h5>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>   
            </Container>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button
                    className='feedback-button' onClick={handleButtonClick} style={{ background: 'green', border: 'none', borderRadius: '40px', padding: '8px 8px', width: '30%',
                    height: '60px', textAlign: 'center'
                    }}>
                        Submit Your Experience  
                    </Button>
                </div>
        </div>
    );
};

export default Testimonials;