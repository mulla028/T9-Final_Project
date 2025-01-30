import { Stack } from "react-bootstrap";
import Link from "next/link";
import { Navbar, Nav, Button, Container } from 'react-bootstrap';


const ResetPasswordConfirmation = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid="md" >
          <Navbar.Brand href="/">Driftway</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
        <Nav>
          <Button variant="success" href="/signup" className="my-button">Sign in</Button>
        </Nav>
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
            <h1>Reset Successful!</h1>
            <p>
              Your password has been reset!
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

export default ResetPasswordConfirmation;