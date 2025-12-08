import Head from "next/head";
import Link from "next/link";

 
export default function Home() {
  return (
     <>
      <Head>
        <title>AI-Powered Healthcare - Find Your Perfect Doctor</title>
        <meta
          name="description"
          content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <Hero />
        <Specialities />
        <TopRatedDoctors />
        <Steps />
        <Testimonials /> */}
        <h1>Main content</h1>
      </main>
    </>
  );
}
