import { Stack } from "react-bootstrap";
import Link from "next/link";
import { Navbar, Nav, Button, Container } from 'react-bootstrap';


const ResetPasswordFeedback = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid="md" >
          <Navbar.Brand href="/">Driftway</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
<<<<<<< HEAD
          <Nav>
            <Button variant="dark" href="/signup" className="my-button">Sign in</Button>
          </Nav>
        </Container>
=======
        </Container>
        <Nav>
          <Button variant="success" href="/signup" className="my-button">Sign in</Button>
        </Nav>
>>>>>>> 89ea291 (Forgot Password logic and UI implemented using nodemailer (#28))
      </Navbar>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}
      >
        <div>
          <Stack
            alignItems="center"
            spacing={2}
            style={{ marginBottom: "2rem", textAlign: "center" }}
          >
            <h1>Check your email</h1>
            <p>
              An email has been sent to your email address to reset your password.
            </p>
            <Link
              href="/signup"
              style={{
                fontSize: "0.875rem",
                color: "#000",
                textDecoration: "underline",
              }}
            >
              Back to login
            </Link>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordFeedback;