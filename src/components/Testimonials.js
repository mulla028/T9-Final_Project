import { Container, Carousel } from 'react-bootstrap';

const Testimonials = () => {
    const testimonials = [
        {
<<<<<<< HEAD
            image: 'http://www.neiyitu.com/cjpic/frombd/0/253/2420273647/1297396620.jpg', 
            name: 'Emily, Bali',
            quote: 'Thanks to DriftWay, I connected with local artisans in Bali while staying at an eco-friendly homestay. Truly an unforgettable experience!',
        },
        {
            image: 'http://www.neiyitu.com/cjpic/frombd/2/253/28639359/3355742424.jpg', 
            name: 'Liam, Kyoto',
            quote: 'The best part of my trip to Kyoto was the slow travel. DriftWay helped me discover quiet temples and eco-friendly stays.',
        },
        {
            image: 'http://www.neiyitu.com/cjpic/frombd/0/253/905552774/1730706076.jpg', 
            name: 'Sophia, Tuscany',
            quote: 'I stayed at a sustainable farmhouse in Tuscany and got to experience the local culture up close. DriftWay made it all so easy.',
        },
=======
            image: '/images/testimonial1.jpg',
            name: 'Emily, Bali',
            quote: 'Thanks to DriftWay, I connected with local artisans in Bali while staying at an eco-friendly homestay. Truly an unforgettable experience!'
        },
        {
            image: '/images/testimonial2.jpg',
            name: 'Liam, Kyoto',
            quote: 'The best part of my trip to Kyoto was the slow travel. DriftWay helped me discover quiet temples and eco-friendly stays.'
        },
        {
            image: '/images/testimonial3.jpg',
            name: 'Sophia, Tuscany',
            quote: 'I stayed at a sustainable farmhouse in Tuscany and got to experience the local culture up close. DriftWay made it all so easy.'
        }
>>>>>>> 6a51d3c (structure changed)
    ];

    return (
        <div className="testimonials" style={{ padding: '60px 0', backgroundColor: '#fff' }}>
            <Container>
                <h2 className="text-center mb-4">What Our Travelers Say</h2>
                <Carousel>
                    {testimonials.map((testimonial, index) => (
                        <Carousel.Item key={index}>
                            <div className="d-flex justify-content-center">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="testimonial-img"
<<<<<<< HEAD
                                    style={{
                                        borderRadius: '50%',
                                        width: '120px',
                                        height: '120px',
                                        objectFit: 'cover',
                                        border: '3px solid #ddd',
                                    }}
=======
                                    style={{ borderRadius: '50%', width: '120px', height: '120px', objectFit: 'cover' }}
>>>>>>> 6a51d3c (structure changed)
                                />
                            </div>
                            <Carousel.Caption>
                                <p className="testimonial-quote">"{testimonial.quote}"</p>
<<<<<<< HEAD
                                <h5 style={{ fontWeight: 'bold' }}>{testimonial.name}</h5>
=======
                                <h5>{testimonial.name}</h5>
>>>>>>> 6a51d3c (structure changed)
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </div>
    );
};

<<<<<<< HEAD
export default Testimonials;
=======
export default Testimonials;
>>>>>>> 6a51d3c (structure changed)
