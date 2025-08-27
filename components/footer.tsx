"use client";

import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    
    <footer className="bg-black-900 text-white">
      {/* Main Footer */}
      <div className="border-t border-gray-800"></div>
      <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        {/* Left: Branding */}
        <div className="text-xl font-bold hover:text-purple-500 transition-colors">
          Skillverse
        </div>

        {/* Middle: Empty */}
        <div className="flex-1"></div>

        {/* Right: Contact Section */}
        <div className="flex flex-col items-end space-y-4">
          {/* Title */}
          <h3 className="text-lg font-semibold">Contact Us</h3>

          {/* Social Media */}
          <div className="flex space-x-6">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
            >
              <SiX size={24} />
            </a>
          </div>

          {/* Email Section */}
          <div className="text-sm text-gray-400">
            <a href="mailto:contact@skillverse.com" className="hover:text-white transition-colors">
              contact@skillverse.com
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Bottom Copyright */}
      
      <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Skillverse. All rights reserved.
      </div>
    </footer>
  );
}
