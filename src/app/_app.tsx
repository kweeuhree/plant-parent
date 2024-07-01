// import "../css/style.css";
// import "../css/form.css";
import Head from "next/head";
import Link from "next/link";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Plant Parent App</title>
      </Head>

      <div>
        <div>
          <Link href="/">Home</Link>
          <Link href="/new">Add Plant</Link>
        </div>
{/* 
        <img
          id="title"
          src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Pet_logo_with_flowers.png"
          alt="pet care logo"
        ></img> */}
      </div>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;