"use client";
import React from "react";
import { NavbarDemo } from "@/components/navbar";
import AboutUsSection from "@/components/About";
import Footer from "@/components/FooterComp";
import CustomAccordion from "@/components/Accordion";
import Galaxy from "@/components/Galaxy";
import CarouselNew from "@/components/CarouselNew";
import { HeroSectionOne } from "@/components/Hero";

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
        {/* <section className="min-h-screen w-full flex flex-col items-center justify-center py-20">
          <HeroSectionOne />
        </section> */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center py-20">
          <div className="w-full flex justify-center">
            <CarouselNew />
          </div>
        </section>
        <AboutUsSection />
        <section className="min-h-screen w-full flex flex-col items-center justify-center py-20">
          <CustomAccordion />
        </section>
        <Footer />
      </div>
    </div >
  );
}