import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

export default function ScheduleModal({ button, mode }) {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  return (
    <>
      <Button variant="success" className="mt-3" onClick={toggleShow}>
        Schedule New Ride
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
              <Form.Control type="textarea" placeholder="Somewhere" />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Location</Form.Label>
              <Form.Control type="textarea" placeholder="Over the rainbow" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Maximum occupancy</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="How much room's left?"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleShow}>
            Close
          </Button>
          <Button variant="primary">Schedule</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
