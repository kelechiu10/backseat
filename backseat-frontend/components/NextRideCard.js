import styles from "./NextRideCard.module.css";
import Image from "next/image";
import EditModal from "./EditModal";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function NextRideCard({ userInfo, ride }) {
  console.log("NextRideCard debug:", ride);
  return (
    <Container className="rsCard p-2">
      <Row>
        <Col xs={12}>
          <Image src="/sedan.png" width={64} height={64} />
        </Col>
        <Col>
          <Row>
            <Col sm={12} md={6}>
              <h4>Requester</h4>
              <p>John Smith</p>
            </Col>
            <Col sm={12} md={6}>
              <h4>Departure Time</h4>
              <p>Yesterday</p>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <h4>Start</h4>
              <p>Here</p>
            </Col>
            <Col sm={12} md={6}>
              <h4>Destination</h4>
              <p>There</p>
            </Col>
          </Row>
          <Row className="justify-content-center mx-auto">
            <EditModal userInfo={userInfo} ride={ride} />
            <Button
              variant="outline-danger"
              className="ml-4"
              onClick={async () =>
                await axios.delete("https://8bedfcf472d6.ngrok.io/rides", {
                  rideID: ride.rideID,
                })
              }
            >
              Cancel
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
