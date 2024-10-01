"use client";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#141414] text-white py-5 text-center">
      <div className="container mx-auto px-4">
        <div className="footer-links flex flex-wrap justify-center mb-4">
          {[
            "About Us",
            "Contact",
            "Privacy Policy",
            "Terms of Service",
            "Help Center",
          ].map((link) => (
            <a
              key={link}
              href="#"
              className="mx-3 my-1 hover:text-[#e50914] transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="footer-social flex justify-center mb-4">
          {[
            { icon: <FaFacebook />, label: "Facebook" },
            { icon: <FaTwitter />, label: "Twitter" },
            { icon: <FaInstagram />, label: "Instagram" },
          ].map(({ icon, label }) => (
            <a
              key={label}
              href="#"
              className="mx-2 text-2xl hover:text-[#e50914] transition-colors duration-300"
              aria-label={label}
            >
              {icon}
            </a>
          ))}
        </div>
        <div className="footer-bottom text-sm">
          &copy; 2024 Netflix Clone. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
