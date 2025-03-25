import React from 'react';
import { 
  ChefHat, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube,
  Mail,
  PhoneCall,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = {
    explore: ['Recipes', 'Cooking Classes', 'Blog Posts', 'Community'],
    company: ['About Us', 'Careers', 'Contact Us', 'Privacy Policy'],
    resources: ['Cooking Tips', 'Kitchen Guide', 'Equipment', 'Ingredients']
  };

  return (
    <footer className="bg-[#dad9d9] backdrop-blur-md text-gray-600">
      {/* Newsletter Section */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
                Get Weekly Recipe Updates
              </h3>
              <p className="text-gray-600">
                Join our newsletter and never miss out on exclusive cooking tips
              </p>
            </div>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-orange-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <ChefHat className="text-orange-500" size={32} />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Batter & Bake
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Empowering home chefs with professional cooking skills and techniques.
            </p>
            <div className="flex gap-4">
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-800 hover:text-orange-500">
                <Instagram size={20} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-800 hover:text-orange-500">
                <Twitter size={20} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-800 hover:text-orange-500">
                <Facebook size={20} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-800 hover:text-orange-500">
                <Youtube size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-gray-800 font-semibold mb-4 capitalize">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="text-gray-600 hover:text-orange-500 flex items-center gap-2"
                    >
                      <ArrowRight size={16} />
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto py-6 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Batter & Bake. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-orange-500">Terms</a>
              <a href="#" className="text-gray-600 hover:text-orange-500">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-orange-500">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;