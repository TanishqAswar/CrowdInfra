"use client"
import React from "react";
import HeroSection from "./components/hero_section";
import DecryptedText from "@/app/ui_comp/de_para"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <div className="flex flex-col items-center justify-center gap-16 mt-16 px-4">
        {/* Main Heading */}
        <div className="text-center">
          <DecryptedText
            text="Empowering Communities Through Smart Infrastructure"
            className="text-white text-4xl font-bold"
            animateOn="view"
            speed={100}
            revealDirection="center"
            parentClassName="mb-4"
          />
          <DecryptedText
            text="Voice Your Needs, Shape Your Community"
            className="text-blue-500 text-2xl"
            animateOn="view"
            speed={150}
            revealDirection="center"
          />
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
          <div className="bg-gray-900 p-8 rounded-xl">
            <DecryptedText
              text="📍 Location Pinning"
              className="text-white text-xl font-bold mb-4"
              animateOn="view"
              parentClassName="block"
            />
            <DecryptedText
              text="Mark areas that need essential services like hospitals, banks, and canteens"
              className="text-gray-300"
              animateOn="view"
              speed={80}
            />
          </div>

          <div className="bg-gray-900 p-8 rounded-xl">
            <DecryptedText
              text="👥 Community Voting"
              className="text-white text-xl font-bold mb-4"
              animateOn="view"
              parentClassName="block"
            />
            <DecryptedText
              text="Upvote and prioritize the most needed infrastructure in your area"
              className="text-gray-300"
              animateOn="view"
              speed={80}
            />
          </div>

          <div className="bg-gray-900 p-8 rounded-xl">
            <DecryptedText
              text="🤖 Smart Analysis"
              className="text-white text-xl font-bold mb-4"
              animateOn="view"
              parentClassName="block"
            />
            <DecryptedText
              text="ML-powered insights on market viability and resource optimization"
              className="text-gray-300"
              animateOn="view"
              speed={80}
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col items-center justify-center space-y-8 min-h-[50vh] py-24 px-4">
          <DecryptedText
            text="Ready to transform your community?"
            className="text-white text-4xl font-bold mb-8 max-w-2xl"
            animateOn="view" 
            speed={120}
            revealDirection="center"
            parentClassName="block text-center"
          />
          <DecryptedText
            text="Join us in building better infrastructure for everyone"
            className="text-gray-400 text-xl mb-12 max-w-2xl"
            animateOn="view"
            speed={100}
            revealDirection="center"
            parentClassName="text-center"
          />
          <button className="bg-blue-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Get Started →
          </button>
        </div>
      </div>
    </main>
  );
}
