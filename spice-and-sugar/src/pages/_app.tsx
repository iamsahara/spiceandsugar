import "@/styles/globals.css"; // ✅ Import global CSS
import type { AppProps } from "next/app";
import Head from "next/head"; // ✅ Add Head for fonts

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* ✅ Load Google Fonts Correctly */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;700&family=Geist+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}