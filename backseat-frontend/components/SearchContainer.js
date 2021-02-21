import styles from "./SearchContainer.module.css";
import SearchResult from "./SearchResult";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
  InputGroup,
  FormControl,
  Spinner,
} from "react-bootstrap";

const ax = axios.create({
  baseUrl: "https://8bedfcf472d6.ngrok.io/",
});

import data from "../data/data.json";

export default function SearchContainer() {
  const [loading, setLoading] = useState(false);

  const [rideID, setRideID] = useState(0);

  const [startLoc, setStartLoc] = useState("");
  const [endLoc, setEndLoc] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log("mounting");
    const preloadData = async () => {
      let data = await getData();
      setResults(data);
    };
    preloadData();
    return () => {
      console.log("unmounting");
    };
  }, []);

  const getData = async () => {
    const response = await axios.get("https://8bedfcf472d6.ngrok.io/rides");
    return response.data;
  };

  const handleFind = async () => {
    //setLoading(true);
    let res = await getData();

    let startLocContained = (e) =>
      e.startLocation.toLowerCase().includes(startLoc.toLowerCase());
    let endLocContained = (e) =>
      e.endLocation.toLowerCase().includes(endLoc.toLowerCase());

    if (!startLoc && !endLoc) {
      setResults(res);
    } else if (!endLoc) {
      setResults(res.filter((e) => startLocContained(e)));
    } else if (!startLoc) {
      setResults(res.filter((e) => endLocContained(e)));
    } else {
      setResults(res.filter((e) => startLocContained(e) && endLocContained(e)));
    }
    //setLoading(false);
  };

  return (
    <Container
      className={styles.searchContainer + " rsCard p-4"}
      onLoad={handleFind}
    >
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
          {loading ? (
            <Col className={styles.loading}>
              <Spinner animation="border" variant="success" />
            </Col>
          ) : (
            results.map((result) => (
              <ListGroupItem key={result.objectID}>
                <SearchResult ride={result} />
              </ListGroupItem>
            ))
          )}
        </ListGroup>
      </Col>
    </Container>
  );
}
