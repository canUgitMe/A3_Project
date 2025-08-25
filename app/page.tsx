"use client";
import React from "react";
import { NavbarDemo } from "@/components/navbar";
import DotGrid from "@/components/DotGrid";

export default function BackgroundBoxesDemo() {
  return (
    <div className="main">
      <div className="fixed inset-0 z-0">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#271e37"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <NavbarDemo />
      <div className="relative z-20 flex flex-col items-center justify-center">
        <section className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Welcome to the Hero Section</h1>
        </section>
        <section className="min-h-screen flex items-center justify-center">
          <p className="text-2xl text-white">Second Section Content</p>
        </section>
        <section className="min-h-screen flex items-center justify-center">
          <p className="text-2xl text-white">Third Section Content</p>
        </section>
      </div>
    </div>
  );
}