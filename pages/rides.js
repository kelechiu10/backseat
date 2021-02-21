import Layout from "../components/Layout";
import RidePage from "../components/RidesPage";
import userInfo from "../data/userInfo.json";

export default function Rides() {
  console.log(userInfo.rides);
  return (
    <Layout>
      <RidePage userInfo={userInfo} />
    </Layout>
  );
}
