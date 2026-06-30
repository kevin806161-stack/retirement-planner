import AdSenseScript from "../components/AdSenseScript";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AdSenseScript />
      <Component {...pageProps} />
    </>
  );
}
