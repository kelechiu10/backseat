import styles from "./SearchResult.module.css";
import Image from "next/image";
import { Row, Col, Button } from "react-bootstrap";

export default function SearchResult({ ride }) {
  return (
    <Row>
      <Col sm={2} md={1} className={styles.imageColumn}>
        <Image src="/sedan.png" width={64} height={64} />
      </Col>
      <Col md={6}>
        <p className="lead">{ride.sharerName}</p>
        <Row>
          <Col sm={12} md={6}>
            <p>
              <b>Start:</b> {ride.startLocation}
            </p>
          </Col>
          <Col sm={12} md={6}>
            <p>
              <b>End:</b> {ride.endLocation}
            </p>
          </Col>
        </Row>
      </Col>
      <Col className={styles.timeColumn}>
        <p>
          <b>Passengers:</b> {ride.passengers} / {ride.maxOccupancy}
        </p>
        <p>
          <b>Leaves at:</b> {ride.departureTime}
        </p>
      </Col>
      <Col xs={1}>
        <Button variant="outline-success">Join</Button>
      </Col>
    </Row>
  );
}
