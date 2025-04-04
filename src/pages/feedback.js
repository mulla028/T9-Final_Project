import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { API_BASE_URL } from '@/utils/general';
import { useRouter } from 'next/router';

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="mb-3">
      <Form.Label style={{ fontFamily: 'Quicksand, serif', fontSize: '1.2rem' }}>
        Rating
      </Form.Label>
      <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }}>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= (hover || rating);

          return (
            <span
              key={index}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(null)}
              style={{ fontSize: '30px' }}
            >
              {isFilled ? (
                <FaStar color="#f4b400" />
              ) : (
                <FaRegStar color="#555" />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const FeedbackForm = () => {
  const [experienceTitle, setExperienceTitle] = useState('Eco Haven Resort');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [media, setMedia] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const commentRef = useRef(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/feedback`);
        setReviews(res.data.feedbacks.reverse());
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    const textarea = commentRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleAddMedia = (e) => {
    const selected = Array.from(e.target.files);
    const uniqueNew = selected.filter(
      (newFile) =>
        !media.some(
          (existing) =>
            existing.name === newFile.name && existing.size === newFile.size
        )
    );
    setMedia((prev) => [...prev, ...uniqueNew]);
    e.target.value = null;
  };

  const handleRemoveMedia = (index) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('title', experienceTitle);
    formData.append('rating', rating);
    formData.append('comment', comment);
    media.forEach((file) => {
      formData.append('media', file);
    });

    try {
      const res = await axios.post(`${API_BASE_URL}/feedback`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setReviews([res.data, ...reviews]);
      setExperienceTitle('Eco Haven Resort');
      setRating(0);
      setComment('');
      setFirstName('');
      setLastName('');
      setMedia([]);
      setShowSuccess(true);

      setTimeout(() => {
        router.push('/communityfeedback');
      }, 1000); 
    } catch (error) {
      console.error(error);
      alert('Failed to submit feedback.');
    }
  };

  return (
    <Container
      fluid
      style={{
        backgroundImage: "url('/icon/feedback-form.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        paddingTop: '60px',
      }}
    >
      {showSuccess && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            flexDirection: 'column',
            fontSize: '2rem',
            fontWeight: 'bold',
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <Spinner animation="border" variant="light" style={{ marginBottom: '20px' }} />
          Feedback submitted!
        </div>
      )}

      <Row>
        <Col md={6} className="mx-auto">
          <Card
            className="mb-4"
            style={{
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              borderRadius: '30px',
              width: '80%',
              margin: '0 auto',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Card.Body>
              <Card.Title className="text-center">
                <h2
                  style={{
                    fontFamily: 'Raleway, serif',
                    fontWeight: 700,
                    color: '#2c3e50',
                    letterSpacing: '0.5px',
                  }}
                >
                  Share Your Experience
                </h2>
              </Card.Title>
              <br />
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName" className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="lastName" className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="experienceTitle" className="mb-3">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    as="select"
                    value={experienceTitle}
                    onChange={(e) => setExperienceTitle(e.target.value)}
                  >
                    <option>Cultural Immersion</option>
                    <option>Eco-Stays</option>
                    <option>Outdoor Adventures</option>
                    <option>Eco-Tourism</option>
                    <option>Farm-to-Table Dining</option>
                    <option>Wildlife Conservation</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="rating" className="mb-3">
                  <StarRating rating={rating} setRating={setRating} />
                </Form.Group>

                <Form.Group controlId="reviewComment" className="mb-3">
                  <Form.Label>Feedback</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Write your review here..."
                    value={comment}
                    onChange={handleCommentChange}
                    ref={commentRef}
                    style={{
                      overflow: 'hidden',
                      resize: 'none',
                      minHeight: '100px',
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="mediaUpload" className="mb-4">
                  <label
                    htmlFor="mediaInput"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'skyblue',
                      padding: '10px 198px',
                      borderRadius: '999px',
                      cursor: 'pointer',
                      fontWeight: '500',
                    }}
                  >
                    <img
                      src="/icon/camera.svg"
                      alt="Upload Icon"
                      width="20"
                      height="20"
                      style={{ marginRight: '8px' }}
                    />
                    Add Photos & Videos
                  </label>
                  <input
                    id="mediaInput"
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleAddMedia}
                  />
                  {media.length > 0 && (
                    <div className="mt-3">
                      {media.map((file, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '10px',
                          }}
                        >
                          {file.type.startsWith('image') ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt="preview"
                              width={60}
                              height={60}
                              style={{
                                borderRadius: '8px',
                                marginRight: '10px',
                              }}
                            />
                          ) : (
                            <video
                              width={60}
                              height={60}
                              style={{
                                borderRadius: '8px',
                                marginRight: '10px',
                              }}
                            >
                              <source src={URL.createObjectURL(file)} />
                            </video>
                          )}
                          <span style={{ flex: 1 }}>{file.name}</span>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemoveMedia(index)}
                            style={{ borderRadius: '999px' }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </Form.Group>

                <div style={{ textAlign: 'center' }}>
                  <Button
                    type="submit"
                    variant="success"
                    style={{
                      borderRadius: '999px',
                      width: '30%',
                      height: '50px',
                    }}
                  >
                    Submit Review
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => router.push('/communityfeedback')}
                    style={{
                      borderRadius: '999px',
                      width: '30%',
                      height: '50px',
                      marginLeft: '20px',
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FeedbackForm;
