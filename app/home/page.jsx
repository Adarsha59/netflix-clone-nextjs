"use client";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTv,
  FaMobileAlt,
  FaTabletAlt,
  FaChild,
} from "react-icons/fa";

const NetflixSignUp = () => {
  const [email, setEmail] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const trendingMovies = [
    {
      id: 1,
      title: "Stranger Things",
      poster:
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "The Crown",
      poster:
        "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      title: "Bridgerton",
      poster:
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    },
    {
      id: 4,
      title: "Money Heist",
      poster:
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 5,
      title: "The Witcher",
      poster:
        "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  const reasons = [
    { icon: <FaTv />, title: "Watch on TV" },
    { icon: <FaMobileAlt />, title: "Offline Viewing" },
    { icon: <FaTabletAlt />, title: "Watch Everywhere" },
    { icon: <FaChild />, title: "Profiles for Kids" },
  ];

  const faqs = [
    {
      question: "What is Netflix?",
      answer:
        "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    },
    {
      question: "How much does Netflix cost?",
      answer:
        "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $8.99 to $17.99 a month. No extra costs, no contracts.",
    },
    {
      question: "Where can I watch?",
      answer:
        "Watch anywhere, anytime, on an unlimited number of devices. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center p-4 md:p-8">
          <Image
            width={100}
            height={100}
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
            className="w-24 md:w-40"
          />
          <Link href="/sign-in">
            <button className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition duration-300 text-xl font-bold">
              Signin
            </button>
          </Link>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Unlimited movies, TV shows, and more.
          </h1>
          <h2 className="text-xl md:text-2xl mb-8">
            Watch anywhere. Cancel anytime.
          </h2>

          {/* CTA Section */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-4">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div className="flex flex-col md:flex-row gap-2 justify-center">
              <input
                type="email"
                placeholder="Email address"
                className="flex-grow px-4 py-3 rounded-md bg-black/60 border border-gray-600 focus:outline-none focus:border-white transition duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Link href="/sign-up">
                <button className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition duration-300 text-xl font-bold">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* Trending Now Section */}
          <section className="mt-16">
            <h3 className="text-2xl font-bold mb-4">Trending Now</h3>
            <div className="relative">
              <div className="flex overflow-x-scroll scrollbar-hide space-x-4 py-4">
                {trendingMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex-shrink-0 w-40 h-60 relative group"
                  >
                    <Image
                      width={100}
                      height={100}
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                      <p className="text-white text-center">{movie.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full">
                <FaChevronLeft className="text-white" />
              </button>
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full">
                <FaChevronRight className="text-white" />
              </button>
            </div>
          </section>

          {/* More Reasons to Join */}
          <section className="mt-16">
            <h3 className="text-2xl font-bold mb-8">More Reasons to Join</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {reasons.map((reason, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-4xl mb-4">{reason.icon}</div>
                  <p className="text-lg">{reason.title}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs Section */}
          <section className="mt-16">
            <h3 className="text-2xl font-bold mb-8">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-700">
                  <button
                    className="flex justify-between items-center w-full py-4 text-left"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="text-lg">{faq.question}</span>
                    <span
                      className={`transform transition-transform duration-300 ${
                        activeAccordion === index ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {activeAccordion === index && (
                    <div className="py-4 text-gray-300">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-black/80 text-gray-400 py-8 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Jobs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Press
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white">
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Cookie Preferences
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Account</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white">
                      My Account
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Redeem Gift Cards
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-center">
              <p>© 2023 Netflix, Inc.</p>
              <select className="bg-transparent border border-gray-600 rounded-md px-2 py-1">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NetflixSignUp;
