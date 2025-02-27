"use client";

import Image from "next/image";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Head from "next/head";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <ParallaxProvider>
      <Head>
        <title>Shop3Man</title>
        <meta name="description" content="Shop3Man" />
        <meta property="og:title" content="Shop3Man" />
        <meta property="og:description" content="Shop3Man" />
      </Head>
      <div className="relative h-screen flex flex-col items-center justify-center bg-gray-900" data-aos="fade-up">
        <Parallax speed={-10}>
          <h1 className="text-5xl font-bold text-white">Welcome to Our Clothing Shop</h1>
        </Parallax>

        <Parallax speed={5}>
          <p className="text-lg text-gray-300 mt-4">Scroll down to explore our collection</p>
        </Parallax>
      </div>

      <div className="h-screen flex items-center justify-center bg-gray-100" data-aos="fade-up">
        <Parallax speed={-20}>
          <Image
            src="https://upload-aws-cls.s3.us-east-2.amazonaws.com/aothun.jpg"
            alt="Featured Clothing"
            className="rounded-lg shadow-lg"
            width={300}
            height={300}
          />
        </Parallax>
      </div>
    </ParallaxProvider>
  );
}
