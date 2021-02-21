import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

export default function ScheduleModal({ userInfo }) {
  const [show, setShow] = useState(false);
  const [startLoc, setStartLoc] = useState("");
  const [endLoc, setEndLoc] = useState("");
  const [maxOcc, setMaxOcc] = useState("");

  const toggleShow = () => setShow(!show);

  const handleClick = async () => {
    const newRide = {
      rideID: "99",
      sharerUid: userInfo.sharerUid,
      sharerName: userInfo.sharerName,
      departureTime: "2021-03-21 01:00:00 PM",
      passengers: 1,
      startLocation: startLoc,
      endLocation: endLoc,
      maxOccupancy: maxOcc,
    };

    await axios.post("https://8bedfcf472d6.ngrok.io/rides", newRide);
    setStartLoc("");
    setEndLoc("");
    setMaxOcc("");
    toggleShow();
    if (userInfo.rides !== undefined) {
      userInfo.rides.push(newRide);
    } else {
      userInfo.rides = [newRide];
    }
  };

  return (
    <>
      <Button variant="success" className="mt-3" onClick={toggleShow}>
        Schedule
      </Button>
      <Modal
        show={show}
        onHide={toggleShow}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Schedule Rideshare</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">Enter details about your rideshare here.</p>
          <br />
          <Form>
            <Form.Group>
              <Form.Label>Start Location</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Somewhere"
                value={startLoc}
                onChange={(e) => setStartLoc(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Location</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Over the rainbow"
                value={endLoc}
                onChange={(e) => setEndLoc(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Maximum occupancy</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="How much room's left?"
                value={maxOcc}
                onChange={(e) => setMaxOcc(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleShow}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Schedule
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
