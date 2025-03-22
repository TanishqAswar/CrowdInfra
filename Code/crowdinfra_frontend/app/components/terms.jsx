"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import '../components/k.css';

export default function TermsAndConditions({ onAccept }) {
  const [accepted, setAccepted] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const router = useRouter();

  const handleAccept = () => {
    setAccepted(true);
    
    // Call the onAccept prop if provided
    if (onAccept) onAccept();
    // Redirect to /auth route
    router.push("/auth");
  };

  const toggleSection = (section) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      <header className="bg-gray-900 border-b border-gray-700 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-400 tracking-tight text-center">Terms and Conditions</h1>
        </div>
      </header>
      
      <main className="flex-grow overflow-hidden">
        <div className="max-w-7xl mx-auto p-6 h-full flex flex-col">
          {/* The scrollbar-hide class removes visible scrollbar while preserving functionality */}
          <div className="flex-grow overflow-y-auto scrollbar-hide bg-gray-800 rounded-xl border border-gray-700 shadow-2xl p-8">
            <section className="mb-8">
              <p className="mb-6 text-lg leading-relaxed text-gray-200">
                Welcome to our platform. This document outlines the terms and conditions for using our services. By accessing or using our platform, you agree to be bound by these terms and conditions. Please read them carefully before proceeding.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-300 mb-4 border-b border-gray-600 pb-2">1. User Agreement</h2>
              <div className="space-y-4 text-gray-200 leading-relaxed pl-4">
                <p>1.1. You must be at least 18 years old to use our services.</p>
                <p>1.2. You are responsible for maintaining the confidentiality of your account and password.</p>
                <p>1.3. You agree to accept responsibility for all activities that occur under your account or password.</p>
                <p>1.4. You must provide accurate, current, and complete information during the registration process.</p>
                <p>1.5. We reserve the right to refuse service, terminate accounts, or cancel orders at our discretion.</p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-300 mb-4 border-b border-gray-600 pb-2">2. Privacy Policy</h2>
              <div className="space-y-4 text-gray-200 leading-relaxed pl-4">
                <p>2.1. We respect your privacy and are committed to protecting it.</p>
                <p>2.2. We collect and process your personal data in accordance with our Privacy Policy.</p>
                <p>2.3. We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content.</p>
                <p>2.4. We may share your information with third-party service providers who help us operate our platform.</p>
                <p>2.5. You have the right to access, correct, or delete your personal data at any time.</p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-300 mb-4 border-b border-gray-600 pb-2">3. Prohibited Activities</h2>
              <div className="space-y-4 text-gray-200 leading-relaxed pl-4">
                <p>3.1. You agree not to engage in any unlawful or harmful activities while using our services.</p>
                <p>3.2. You must not upload, post, or transmit any content that is illegal, fraudulent, misleading, or harmful.</p>
                <p>3.3. You must not attempt to gain unauthorized access to our systems or networks.</p>
                <p>3.4. You must not interfere with or disrupt the integrity or performance of our platform.</p>
                <p>3.5. You must not collect or harvest any personal data from our platform without explicit consent.</p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-300 mb-4 border-b border-gray-600 pb-2">4. Intellectual Property</h2>
              <div className="space-y-4 text-gray-200 leading-relaxed pl-4">
                <p>4.1. All content on our platform, including text, graphics, logos, and software, is protected by intellectual property laws.</p>
                <p>4.2. You may not reproduce, distribute, modify, or create derivative works from any content on our platform without our permission.</p>
                <p>4.3. By submitting content to our platform, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute that content.</p>
                <p>4.4. We respect the intellectual property rights of others and expect users to do the same.</p>
                <p>4.5. If you believe that your intellectual property rights have been violated, please contact us immediately.</p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-300 mb-4 border-b border-gray-600 pb-2">5. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-200 leading-relaxed pl-4">
                <p>5.1. Our platform is provided on an "as is" and "as available" basis without any warranties of any kind.</p>
                <p>5.2. We do not guarantee that our platform will be uninterrupted, timely, secure, or error-free.</p>
                <p>5.3. We shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages.</p>
                <p>5.4. Our total liability to you for any claim arising from or relating to these terms shall not exceed the amount paid by you to us during the six months preceding the claim.</p>
                <p>5.5. Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability, so some of the above limitations may not apply to you.</p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-300 mb-4 border-b border-gray-600 pb-2">6. Termination</h2>
              <div className="space-y-4 text-gray-200 leading-relaxed pl-4">
                <p>6.1. We may terminate or suspend your account and access to our platform immediately, without prior notice or liability, for any reason.</p>
                <p>6.2. Upon termination, your right to use our platform will immediately cease.</p>
                <p>6.3. All provisions of these terms that by their nature should survive termination shall survive termination.</p>
                <p>6.4. You may terminate your account at any time by contacting us or using the account deletion feature if available.</p>
                <p>6.5. We reserve the right to delete any content you have submitted through the service after account termination.</p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-300 mb-4 border-b border-gray-600 pb-2">7. Changes to Terms</h2>
              <div className="space-y-4 text-gray-200 leading-relaxed pl-4">
                <p>7.1. We reserve the right to update these terms at any time without notice.</p>
                <p>7.2. Continued use of our platform after any changes indicates your acceptance of the revised terms.</p>
                <p>7.3. It is your responsibility to review these terms periodically for changes.</p>
                <p>7.4. We will make reasonable efforts to notify you of significant changes to these terms.</p>
                <p>7.5. If you do not agree to the new terms, you must stop using our platform.</p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-300 mb-4 border-b border-gray-600 pb-2">8. Governing Law</h2>
              <div className="space-y-4 text-gray-200 leading-relaxed pl-4">
                <p>8.1. These terms shall be governed by and construed in accordance with the laws of [Jurisdiction].</p>
                <p>8.2. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].</p>
                <p>8.3. If any provision of these terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary.</p>
                <p>8.4. These terms constitute the entire agreement between you and us regarding our platform.</p>
                <p>8.5. Our failure to enforce any right or provision of these terms will not be considered a waiver of those rights.</p>
              </div>
            </section>
            
            <p className="italic text-sm text-gray-400 text-right pt-6 border-t border-gray-700 mt-8">Last updated: March 17, 2025</p>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900 border-t border-gray-700 p-5 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            By clicking "Accept", you acknowledge that you have read and understood these terms and agree to be bound by them.
          </p>
          
          <div className="flex flex-col items-center">
            <button
              onClick={handleAccept}
              disabled={accepted}
              className={`px-10 py-4 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg ${
                accepted 
                  ? "bg-green-600 cursor-not-allowed opacity-90" 
                  : "bg-blue-600 hover:bg-blue-500 active:bg-blue-700"
              }`}
            >
              {accepted ? "Terms Accepted ✅" : "I Accept These Terms"}
            </button>
            
            {!accepted && (
              <p className="text-gray-400 text-sm mt-3">
                Please read the terms carefully before accepting
              </p>
            )}
            
            {accepted && (
              <p className="text-green-400 text-sm mt-3">
                Thank you for accepting our terms
              </p>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
