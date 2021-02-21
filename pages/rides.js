import Layout from "../components/Layout";
import RidePage from "../components/RidesPage";
import userInfo from "../data/userInfo.json";
import Homepage from "../components/Homepage";

import { FirebaseAuthConsumer } from "@react-firebase/auth";

export default function Rides() {
  console.log(userInfo.rides);
  return (
    <Layout>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          if (isSignedIn) {
            return <RidePage userInfo={user.backseatData} />;
          } else {
            return <Homepage />;
          }
        }}
      </FirebaseAuthConsumer>
    </Layout>
  );
}
