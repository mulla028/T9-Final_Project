import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const BlogSection = () => {
    const blogPosts = [
        {
            image: 'https://cdn.airalo.com/images/d8417ef5-972e-4f31-8285-bfb26a18350e.jpg',
            title: '10 Tips for Sustainable Travel',
            description: 'Discover practical ways to minimize your environmental footprint while traveling.',
            link: 'https://sustainabletravel.org/top-10-tips-for-sustainable-travel/'
        },
        {
            image: 'https://a0.muscache.com/im/pictures/c4189dbb-be6f-45fc-872d-46e66641f6b2.jpg?im_w=960',
            title: 'The Best Destinations for Long Stays',
            description: 'Explore destinations that encourage slow, meaningful travel and long stays.',
            link: 'https://d2detours.com/our-top-10-destinations-for-long-stays/'
        },
        {
            image: 'https://culturetrekking.com/images/img_MmTGqsHD8UFByjsP3LxyRu/adobestock_294945819.jpeg?fit=outside&w=1600&dpr=1',
            title: 'How to Minimize Your Carbon Footprint While Traveling',
            description: 'Learn how to reduce your impact with eco-friendly transportation and accommodations.',
            link: 'https://sustainabletravel.org/how-to-reduce-travel-carbon-footprint/'
        }
    ];

    return (
        <div id="blog-section" className="blog-section" style={{ padding: '60px 0' }}>
            <Container>
                <h2 className="text-center mb-4">Tips & Guides for Slow Travel</h2>
                <Row>
                    {blogPosts.map((post, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={post.image} />
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>{post.description}</Card.Text>
                                    <Button
                                        variant='dark'
                                        className='read-more-button'
                                        href={post.link}
                                        target="_blank"
                                        rel="noopener noreferrer" // For security
                                    >
                                        Read More
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="text-center">
                    <Button
                        variant="outline-dark"
                        href="#blog-section"
                        style={{
                            padding: '12px 30px',
                            borderRadius: '30px',
                            marginTop: '30px',
                        }}
                    >
                        Explore More Articles
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default BlogSection;
