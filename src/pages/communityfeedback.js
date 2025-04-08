import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Pagination, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { API_BASE_URL } from '@/utils/general';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Header from '@/components/Header'; 

const ITEMS_PER_PAGE = 4;
const MAX_COMMENT_LENGTH = 100;

const CommunityFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expanded, setExpanded] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [modalMedia, setModalMedia] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchFeedbacks(currentPage);
  }, [currentPage]);

  const fetchFeedbacks = async (page) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/feedback?page=${page}&limit=${ITEMS_PER_PAGE}`);
      setFeedbacks(res.data.feedbacks);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const renderComment = (comment, index) => {
    const isLong = comment.length > MAX_COMMENT_LENGTH;
    const isExpanded = expanded[index];
    if (!isLong) return comment;

    return (
      <>
        {isExpanded ? comment : `${comment.slice(0, MAX_COMMENT_LENGTH)}... `}
        <span
          onClick={() => toggleExpand(index)}
          style={{ color: '#007bff', cursor: 'pointer', fontSize: '0.9rem' }}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </span>
      </>
    );
  };

  const stripApiFromBaseUrl = (url) => url.replace(/\/api\/?$/, '');

  const openModal = (mediaUrls, index) => {
  const baseUrl = stripApiFromBaseUrl(API_BASE_URL);
  const fullUrls = mediaUrls.map(url =>
    `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
  );
  setModalMedia(fullUrls);
  setCurrentIndex(index);
  setModalShow(true);
};

const renderMediaThumbnails = (mediaUrls) => {
  if (!mediaUrls || mediaUrls.length === 0) return null;

  const baseUrl = stripApiFromBaseUrl(API_BASE_URL);
  const fullUrls = mediaUrls.map(url =>
    `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
  );

  return (
    <div className="d-flex flex-wrap justify-content-center" style={{ gap: '10px', margin: '10px auto', maxWidth: '260px' }}>
      {fullUrls.map((url, idx) => (
        <div key={idx} style={{ width: '80px', height: '80px', cursor: 'pointer' }} onClick={() => openModal(mediaUrls, idx)}>
          {url.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
            <img
              src={url}
              alt="media"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
            />
          ) : (
            <video
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
            >
              <source src={url} type="video/mp4" />
            </video>
          )}
        </div>
      ))}
    </div>
  );
};

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % modalMedia.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + modalMedia.length) % modalMedia.length);
  };

  return (
    <>
    <Header /> {/* ✅ Inject Navbar here */}
    <div
      style={{
        backgroundImage: "url('/icon/CommunityFeedback.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '120vh',
        paddingTop: '60px',
      }}
    >
    <Container>
      <h2 className="text-center mb-5" 
      style={{
        fontFamily: 'Raleway, serif',
        fontSize:'55px',
        fontWeight: 700,
        color: '#ffffff',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        letterSpacing: '0.5px'}}>Community Feedbacks</h2>
        <div style={{ textAlign: 'center', marginBottom: '30px', marginTop: '-20px' }}>
          <button
            onClick={() => router.push('/feedback')}
            style={{
              padding: '10px 30px',
              fontSize: '1rem',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: '#28a745',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            Leave Your feedback Now
          </button>
        </div>
      <Row className="justify-content-center">
        {feedbacks.map((item, index) => (
          <Col key={index} xs={12} md={8} lg={6} className="mb-4 d-flex justify-content-center">
            <Card
              style={{
                borderRadius: '20px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
              <Card.Body className="text-center">
                <img
                  src={item.userId?.profilePicture || '/icon/default-icon.png'}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/icon/default-icon.png';
                  }}
                />
                <Card.Text style={{ fontSize: '0.95rem', marginBottom: '10px' }}>
                  {renderComment(item.comment, index)}
                </Card.Text>
                <Card.Title style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                  {item.userId?.username || 'Anonymous'}
                </Card.Title>
                <Card.Subtitle className="mb-3 text-muted" style={{ fontSize: '1rem', marginTop:'10px' }}>
                  {item.title}
                </Card.Subtitle>
                <Card.Subtitle className="text-muted text-center" style={{ fontSize: '0.9rem' }}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <FaStar key={i} color="#f4b400" />
                  ))}
                </Card.Subtitle>
                <Card.Subtitle className="text-muted" style={{ fontSize: '0.85rem', marginTop:'10px', marginBottom: '10px' }}>
                  {new Date(item.createdAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                  })}
                </Card.Subtitle>
                {renderMediaThumbnails(item.mediaUrls)}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{
        position: 'fixed',
        bottom: 20,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1000,
      }}>
        <Pagination className="justify-content-center" style={{
            background: 'transparent',
            boxShadow: 'none',
            border: 'none',
          }}>
          <Pagination.Prev
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Body
          style={{
            backgroundColor: '#000',
            padding: '0',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* X Close Button */}
          <span
            onClick={() => setModalShow(false)}
            style={{
              position: 'absolute',
              top: '15px',
              right: '20px',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            ✕
          </span>

          {/* Media Display */}
          {modalMedia[currentIndex]?.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
            <img
              src={modalMedia[currentIndex]}
              alt="modal"
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
            />
          ) : (
            <video
              controls
              autoPlay
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
            >
              <source src={modalMedia[currentIndex]} type="video/mp4" />
            </video>
          )}

          {/* Left / Right Arrows (unstyled) */}
          {modalMedia.length > 1 && (
            <>
              <span
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '15px',
                  transform: 'translateY(-50%)',
                  fontSize: '2.5rem',
                  color: '#fff',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                ‹
              </span>
              <span
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '15px',
                  transform: 'translateY(-50%)',
                  fontSize: '2.5rem',
                  color: '#fff',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                ›
              </span>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
    </div>
    </>
  );
};

export default CommunityFeedbackPage;
