import styles from "./RidesPage.module.css";
import NextRideCard from "./NextRideCard";
import SearchContainer from "./SearchContainer";
import moment from "moment";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const clock = moment();

export default function RidesPage({ userInfo }) {
  const [timeLeft, setTimeLeft] = useState(
    userInfo.rides ? clock.toNow(userInfo.rides[0]) : ""
  );

  useEffect(() =>
    setInterval(() => {
      console.log("Ran useEffect");
      setTimeLeft(userInfo.rides ? clock.toNow(userInfo.rides[0]) : "");
    }, 5000)
  );

  return (
    <>
      <Container fluid className={styles.ridePage}>
        <Row>
          {/* Conditional rendering if logged in and has existing ride, otherwise prompt for ride creation */}
          <Container className={styles.nextRideContainer}>
            {userInfo.rides ? (
              <>
                <h2>Your next ride is in {clock.toNow(userInfo.rides[0])}.</h2>
                <Col md={6} sm={10} data-aos="zoom-in">
                  <NextRideCard />
                </Col>{" "}
              </>
            ) : (
              <>
                <h2>Schedule a new ride now!</h2>
              </>
            )}
          </Container>
        </Row>
        <Row>
          <SearchContainer />
        </Row>
      </Container>
    </>
  );
}
