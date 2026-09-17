import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Noto_Sans_TC, Noto_Serif_TC, Space_Mono } from "next/font/google";
import AdSenseScript from "../components/AdSenseScript";
import "../styles/globals.css";
import "../styles/brand.css";
import "../styles/calculator.css";

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
  const router = useRouter();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const nodes = Array.from(document.querySelectorAll(".editorial-reveal"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("motion-pending");
        entry.target.classList.add("motion-arrived");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    nodes.forEach(node => {
      if (node.getBoundingClientRect().top > window.innerHeight) node.classList.add("motion-pending");
      observer.observe(node);
    });
    return () => { observer.disconnect(); nodes.forEach(node => node.classList.remove("motion-pending")); };
  }, [router.asPath]);
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
