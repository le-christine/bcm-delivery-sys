import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand href="#">BCM Delivery System</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavBar;
