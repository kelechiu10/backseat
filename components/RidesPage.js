import styles from "./RidesPage.module.css";
import NextRideCard from "./NextRideCard";
import RideModal from "./ScheduleModal";
import SearchContainer from "./SearchContainer";
import moment from "moment";
import axios from "axios";
import uInfo from "../data/userInfo.json";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const clock = moment();

export default function RidesPage({ userInfo }) {
  console.log("ridespage debug:", userInfo.rides);

  const [timeLeft, setTimeLeft] = useState(
    userInfo.rides !== undefined ? clock.toNow(userInfo.rides[0]) : ""
  );

  /*useEffect(() =>
    setInterval(() => {
      console.log("Ran useEffect");
      setTimeLeft(userInfo.rides ? clock.toNow(userInfo.rides[0]) : "");
    }, 5000)
  );*/

  return (
    <>
      <Container fluid className={styles.ridePage}>
        <Row>
          {/* Conditional rendering if logged in and has existing ride, otherwise prompt for ride creation */}
          <Container className={styles.nextRideContainer}>
            <Col md={6} sm={10} data-aos="zoom-in">
              {userInfo.rides !== undefined ? (
                <NextRideCard userInfo={uInfo} ride={userInfo.rides[0]} />
              ) : (
                <h2>You don't have any rides. Schedule one now!</h2>
              )}
              <RideModal userInfo={userInfo} />
            </Col>
          </Container>
        </Row>
        <Row>
          <SearchContainer />
        </Row>
      </Container>
    </>
  );
}
