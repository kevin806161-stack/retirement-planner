import Head from "next/head";
import { Noto_Sans_TC, Noto_Serif_TC, Space_Mono } from "next/font/google";
import AdSenseScript from "../components/AdSenseScript";
import "../styles/globals.css";

const notoSansTC = Noto_Sans_TC({
  weight: ["400", "500", "700", "900"],
  display: "swap",
  preload: false,
  variable: "--font-noto-sans-tc",
});

const notoSerifTC = Noto_Serif_TC({
  weight: ["600", "700"],
  display: "swap",
  preload: false,
  variable: "--font-noto-serif-tc",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${notoSansTC.variable} ${notoSerifTC.variable} ${spaceMono.variable} font-vars-root`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdSenseScript />
      <Component {...pageProps} />
    </div>
  );
}
