import styles from "./ContactPage.module.css";
import { Container, Col, Form, Button } from "react-bootstrap";

export default function ContactPage() {
  return (
    <Container fluid className={styles.contactPage}>
      <Col sm={8} md={6} className="rsCard p-5 mx-auto" data-aos="fade-up">
        <Form>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="John Smith" cols={6} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  cols={6}
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={5} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
}
