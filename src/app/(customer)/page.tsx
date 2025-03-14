"use client";

import Image from "next/image";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out'
    });
  }, []);

  return (
    <ParallaxProvider>
      <div className="relative h-screen" style={{ backgroundImage: 'url(/background-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="container mx-auto h-full flex items-center">
            <div className="max-w-2xl px-4" data-aos="fade-right">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Phong Cách Thời Thượng</h1>
              <p className="text-xl text-gray-200 mb-8">Khám phá bộ sưu tập mới nhất của chúng tôi</p>
              <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition">
                Mua sắm ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-700" data-aos="fade-up">Sản Phẩm Nổi Bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group" data-aos="fade-up" data-aos-delay="100">
              <div className="relative overflow-hidden">
                <Image
                  src="https://upload-aws-cls.s3.us-east-2.amazonaws.com/aothun.jpg"
                  alt="Áo thun nam"
                  width={400}
                  height={500}
                  className="w-full transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold">Áo Thun Nam</h3>
                  <p className="text-gray-300">Từ 199.000đ</p>
                </div>
              </div>
            </div>

            <div className="group" data-aos="fade-up" data-aos-delay="200">
              <div className="relative overflow-hidden">
                <Image
                  src="https://upload-aws-cls.s3.us-east-2.amazonaws.com/aothun.jpg"
                  alt="Áo sơ mi"
                  width={400}
                  height={500}
                  className="w-full transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold">Áo Sơ Mi</h3>
                  <p className="text-gray-300">Từ 299.000đ</p>
                </div>
              </div>
            </div>

            <div className="group" data-aos="fade-up" data-aos-delay="300">
              <div className="relative overflow-hidden">
                <Image
                  src="https://upload-aws-cls.s3.us-east-2.amazonaws.com/aothun.jpg"
                  alt="Quần jean"
                  width={400}
                  height={500}
                  className="w-full transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold">Quần Jean</h3>
                  <p className="text-gray-300">Từ 399.000đ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2" data-aos="fade-right">
              <Parallax speed={-5}>
                <Image
                  src="https://upload-aws-cls.s3.us-east-2.amazonaws.com/aothun.jpg"
                  alt="Bộ sưu tập mới"
                  width={600}
                  height={800}
                  className="rounded-lg shadow-xl"
                />
              </Parallax>
            </div>
            <div className="md:w-1/2" data-aos="fade-left">
              <h2 className="text-4xl font-bold mb-6 text-gray-700">Bộ Sưu Tập Mới</h2>
              <p className="text-gray-600 mb-8">
                Khám phá những thiết kế độc đáo và phong cách mới nhất của chúng tôi.
                Được làm từ chất liệu cao cấp và thiết kế tinh tế, mỗi sản phẩm đều mang đến sự thoải mái và phong cách riêng cho bạn.
              </p>
              <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </section>
    </ParallaxProvider>
  );
}
