import styles from "./Layout.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/Link";
import firebase from "firebase/app";
import "firebase/auth";
import key from "../data/auth.json";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from "@react-firebase/auth";

// Firebase Config
const config = {
  apiKey: key["key"],
  authDomain: "ridesurf-53842.firebaseapp.com",
  projectId: "ridesurf-53842",
  storageBucket: "ridesurf-53842.appspot.com",
  messagingSenderId: "89267977016",
  appId: "1:89267977016:web:8fc0b0df929a49ed1e1fcd",
  measurementId: "G-NLXKVX5TTC",
};

console.dir(config);

function setInfo(email, token = null, error = null) {
  var userInfo = { user: {} };
  userInfo["user"].email = email;
  userInfo["user"].error = error;
  userInfo["user"].token = token;
  return userInfo;
}

//TODO:better error handling

//sign up with email and password
async function oAuthSignup(service) {
  var userInfo;
  var prov;
  //sets the proper provider
  switch (service) {
    case "google":
      prov = new firebase.auth.GoogleAuthProvider();
      break;
    case "github":
      prov = new firebase.auth.GithubAuthProvider();
      break;
  }

  //add scope and stuff later
  await firebase
    .auth()
    .signInWithPopup(prov)
    .then((res) => {
      console.log(res);
      var user = res.user;
      userInfo = setInfo(user.email, user.uid);
    })
    .catch((err) => {
      userInfo = setInfo(err.email, null, err.message);
      //console.log(err.message)
    });
  return userInfo;
}

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Backseat</title>
      </Head>
      <FirebaseAuthProvider firebase={firebase} {...config}>
        <Container fluid className={styles.layoutContainer + " p-0"}>
          <Navbar
            collapseOnSelect
            expand="md"
            bg="dark"
            variant="dark"
            className={styles.navbar}
          >
            <Navbar.Brand>Backseat</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <Link href="/" passHref>
                  <Nav.Link>Home</Nav.Link>
                </Link>
                <Link href="/rides" passHref>
                  <Nav.Link>Rides</Nav.Link>
                </Link>
                <Link href="/contact" passHref>
                  <Nav.Link>Contact Us</Nav.Link>
                </Link>
              </Nav>
              <FirebaseAuthConsumer>
                {({ isSignedIn, user, providerId }) => {
                  if (isSignedIn) {
                    user.backseatData = {
                      sharerUid: "999",
                      sharerName: user.displayName,
                    };
                    return <Navbar.Text>Hello {user.displayName}</Navbar.Text>;
                  } else {
                    return (
                      <>
                        {" "}
                        <Button variant="primary" className={styles.button}>
                          Sign In
                        </Button>
                        <Button
                          variant="outline-secondary"
                          className={styles.button}
                          onClick={() => {
                            oAuthSignup("google");
                          }}
                        >
                          Sign Up
                        </Button>
                      </>
                    );
                  }
                }}
              </FirebaseAuthConsumer>
            </Navbar.Collapse>
          </Navbar>

          {children}

          <footer className={styles.layoutFooter}>
            Made with lack of 💤😴 using React and Next.js by Andrew Wang,
            Kelechi Uhegbu, and Manseej Khatri
          </footer>
        </Container>
      </FirebaseAuthProvider>
    </>
  );
}
