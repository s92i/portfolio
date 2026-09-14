import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MotionConfig } from "framer-motion";

function MyApp({ Component, pageProps }: AppProps) {
  return <MotionConfig reducedMotion="user"><Component {...pageProps} /></MotionConfig>;
}

export default MyApp;
