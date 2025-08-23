"use client";
import React from "react";
import { NavbarDemo } from "@/components/navbar";

export default function BackgroundBoxesDemo() {
  return (
    <div className="main">
      <NavbarDemo />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <section className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">Welcome to the Hero Section</h1>
        </section>
        <section className="min-h-screen flex items-center justify-center">
          <p className="text-2xl">Second Section Content</p>
        </section>
        <section className="min-h-screen flex items-center justify-center">
          <p className="text-2xl">Third Section Content</p>
        </section>
      </div>
    </div>
  );
}