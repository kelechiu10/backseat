import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 24,
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
