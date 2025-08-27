"use client";

import React from "react";

const teamMembers = [
  {
    name: "Aman Jaiswal",
    description: "(Frontend & Backend Lead)",
    src: "/images/Aman.jpg",
    linkedin: "https://www.linkedin.com/in/beingaman?utm_",
  },
  {
    name: "Akash Das",
    description: "(Design & Frontend Lead)",
    src: "/images/Akash.jpg",
    linkedin: "https://www.linkedin.com/in/akash-das-b504a2272?utm_",
  },
  {
    name: "Anuvab Munshi",
    description: "(Backend Co-Lead)",
    src: "/images/Anuvab.jpg",
    linkedin: "https://www.linkedin.com/in/anuvab-munshi?utm_source=share&utm_",
  },
  {
    name: "Arijit Adhikary",
    description: "(Frontend Co-Lead)",
    src: "/images/Arijit.jpg",
    linkedin: "https://www.linkedin.com/in/arijit-adhikary",
  },
  {
    name: "Anupama Bain",
    description: "(Research & Content Lead)",
    src: "/images/Anupama.jpg",
    linkedin: "https://www.linkedin.com/in/anupama-bain",
  },
  {
    name: "Anushka Midda",
    description: "(Research & Content Co-Lead)",
    src: "/images/Anushka.jpg",
    linkedin: "https://www.linkedin.com/in/anushka-midda",
  },
];

export default function AboutUsSection() {
  return (
    <section className=" text-white py-12 px-4">
      <h2 className="text-5xl font-bold text-center mb-15">Meet Our Team</h2>

      <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-8 justify-items-center">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {/* Circular Photo with Dark Border */}
            <img
              src={member.src}
              alt={member.name}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full border-2"
            />
            {/* Clickable Name */}
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm font-semibold hover:text-purple-400 transition-colors"
            >
              {member.name}
            </a>
            {/* Description */}
            <p className="text-xs text-purple-400">{member.description}</p>
          </div>

        ))}
      </div>
    </section>
  );
}
