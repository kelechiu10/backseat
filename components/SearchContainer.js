import styles from "./SearchContainer.module.css";
import SearchResult from "./SearchResult";
import axios from "axios";
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
const ngrokURL = "https://8bedfcf472d6.ngrok.io/";

export default function SearchContainer() {
  const [loading, setLoading] = useState(false);
  const [startLoc, setStartLoc] = useState("");
  const [endLoc, setEndLoc] = useState("");
  const [results, setResults] = useState(data);

  const handleFind = async () => {
    setLoading(true);
    axios
      .get("https://8bedfcf472d6.ngrok.io/rides")
      .then((response) => {
        let res = response.data;
        if (!startLoc && !endLoc) {
          setResults(res);
        } else if (!endLoc) {
          setResults(res.filter((e) => e.startLocation === startLoc));
        } else if (!startLoc) {
          setResults(res.filter((e) => e.endLocation === endLoc));
        } else {
          setResults(
            res.filter(
              (e) => e.startLocation === startLoc && e.endLocation === endLoc
            )
          );
        }
      })
      .catch((error) => {
        console.log(error);
        setResults([]);
      });

    setLoading(false);
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
          {loading ? (
            <h1>Loading...</h1>
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
