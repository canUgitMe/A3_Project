"use client";
import React from "react";
import { NavbarDemo } from "@/components/navbar";
import AboutUsSection from "@/components/about-us";
import Footer from "@/components/footer";
import CustomAccordion from "@/components/Accordion";
import Galaxy from "@/components/Galaxy";
import Carousel from "@/components/Carousel";

export default function BackgroundBoxesDemo() {
  return (
    <div className="main">
      <div className="fixed inset-0 z-0">
        <Galaxy
          mouseRepulsion={false}
          mouseInteraction={false}
          density={0.8}
          glowIntensity={0.4}
          saturation={1}
          hueShift={180}
          twinkleIntensity={0.2}
          rotationSpeed={0.1}
          repulsionStrength={5}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>
      {/* Content container with proper z-index */}
      <div className="flex flex-col relative z-20" >
        <NavbarDemo />

        <section className="min-h-screen w-full flex flex-col items-center justify-center py-20">
          <h2 className="text-center text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-400 via-gray-200 to-white bg-clip-text text-transparent mb-12">
            Our Features
          </h2>
          <div className="w-full flex justify-center">
            <Carousel
              baseWidth={650}
              mobileWidth={400}
              autoplay={false}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={false}
              title="Features"
            />
          </div>
        </section>

        <div className="animated-divider"></div>
        <AboutUsSection />
        <CustomAccordion />
        <Footer />
      </div>
    </div >
  );
}