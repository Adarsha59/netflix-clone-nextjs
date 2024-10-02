"use client";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

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
          ].map((link, path) => (
            <a
              key={link}
              href={path}
              className="mx-3 my-1 hover:text-[#e50914] transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="footer-social flex justify-center mb-4">
          {[
            {
              icon: <FaFacebook />,
              label: "Facebook",
              path: "https://www.facebook.com/paudyaladarsha",
            },
            {
              icon: <FaTwitter />,
              label: "Twitter",
              path: "https://x.com/Adarsha59",
            },
            {
              icon: <FaGithub />,
              label: "Instagram",
              path: "https://github.com/Adarsha59",
            },
          ].map(({ icon, label, path }) => (
            <a
              key={label}
              href={path}
              className="mx-2 text-2xl hover:text-[#e50914] transition-colors duration-300"
              aria-label={label}
            >
              {icon}
            </a>
          ))}
        </div>
        <div className="footer-bottom text-sm">
          &copy; 2024 Netflix Clone. All rights reserved. || Adarsha Paudyal
        </div>
      </div>
    </footer>
  );
};

export default Footer;
