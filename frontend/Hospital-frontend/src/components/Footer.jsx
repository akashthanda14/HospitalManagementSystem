import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Links Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-blue-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/hospitals" className="hover:text-blue-400 transition-colors">
                Hospitals
              </a>
            </li>
            <li>
              <a href="/doctors" className="hover:text-blue-400 transition-colors">
                Doctors
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400 transition-colors">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>+1 (123) 456-7890</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>info@hospitalmanagement.com</span>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800 mt-8 pt-8 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Hospital Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;