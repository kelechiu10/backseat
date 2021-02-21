import styles from "./SearchContainer.module.css";
import SearchResult from "./SearchResult";
import { useState } from "react";
import {
  Container,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import data from "../data/data.json";

export default function SearchContainer() {
  const [startLoc, setStartLoc] = useState("");
  const [endLoc, setEndLoc] = useState("");
  const [results, setResults] = useState(data);

  console.log("INITIAL DEBUG:", results, typeof results);

  const handleFind = () => {
    console.log("DEBUG:", startLoc, endLoc);
    if (!startLoc && !endLoc) {
      setResults(data);
    } else if (!endLoc) {
      setResults(data.filter((e) => e.startLocation === startLoc));
    } else if (!startLoc) {
      setResults(data.filter((e) => e.endLocation === endLoc));
    } else {
      setResults(
        data.filter(
          (e) => e.startLocation === startLoc && e.endLocation === endLoc
        )
      );
    }
  };

  return (
    <Container className={styles.searchContainer + " rsCard p-4"}>
      <Col>
        <Col sm={10} md={6} className="mx-auto py-3">
          <InputGroup>
            <FormControl
              placeholder="Start?"
              value={startLoc}
              onChange={(e) => setStartLoc(e.target.value)}
            />
            <FormControl
              placeholder="End?"
              value={endLoc}
              onChange={(e) => setEndLoc(e.target.value)}
            />
            <InputGroup.Append>
              <Button variant="outline-success" onClick={handleFind}>
                Find Rides
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
        <ListGroup
          variant="flush"
          className={styles.rideList}
          data-aos="fade-up"
        >
          {results.map((result) => (
            <ListGroupItem key={result.objectID}>
              <SearchResult ride={result} />
            </ListGroupItem>
          ))}
        </ListGroup>
      </Col>
    </Container>
  );
}
