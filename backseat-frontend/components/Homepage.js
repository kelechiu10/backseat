import styles from "./HomePage.module.css";
import Image from "next/image";
import Link from "next/Link";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function Homepage() {
  return (
    <>
      <Container fluid className="p-0">
        <Row className={styles.hero}>
          <Col sm={12} md={6} className={styles.heroRight}>
            <Image src="/sedan.png" width={256} height={256} />
          </Col>
          <Col sm={12} md={6} className={styles.heroLeft + " pl-5"}>
            <h1 data-aos="fade-right">Welcome to Backseat!</h1>
            <p className="lead" data-aos="fade-right">
              We make it easy for you to share and join rides with others. Ready
              to try?
            </p>
            <br />
            <Col md={4} sm={8} className="p-0">
              <Link href="/rides">
                <Button variant="success" size="lg">
                  Get Started
                </Button>
              </Link>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
}
