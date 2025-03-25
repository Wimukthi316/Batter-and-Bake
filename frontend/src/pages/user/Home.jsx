import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Utensils, Clock, Users, ArrowRight } from 'lucide-react';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';

const Home = () => {
    const heroImage = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80";
  const features = [
    {
      icon: <ChefHat size={32} />,
      title: "Expert Recipes",
      description: "Access thousands of professionally curated recipes"
    },
    {
      icon: <Utensils size={32} />,
      title: "Cooking Classes",
      description: "Learn from professional chefs through live sessions"
    },
    {
      icon: <Clock size={32} />,
      title: "Quick Tutorials",
      description: "Master cooking techniques in bite-sized videos"
    },
    {
      icon: <Users size={32} />,
      title: "Community",
      description: "Connect with fellow cooking enthusiasts"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
              >
                Master the Art of Cooking
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600"
              >
                Join our community of food enthusiasts and learn from the best chefs around the world. Share recipes, techniques, and culinary stories.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
              >
                <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:shadow-lg transition-shadow">
                  Start Learning
                </button>
                <button className="px-8 py-3 border-2 border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-50 transition-colors">
                  Browse Recipes
                </button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-full bg-gradient-to-r from-orange-500/20 to-red-600/20 absolute inset-0" />
              <img 
                src={heroImage}
                alt="Professional Chef Cooking" 
                className="relative z-10 rounded-3xl shadow-2xl w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&q=80"; // fallback image
                }}
            />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-lg flex items-center justify-center text-orange-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="container mx-auto max-w-6xl bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-12 text-white"
        >
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold">Ready to Start Your Culinary Journey?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of home chefs and food enthusiasts in our growing community
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-orange-500 rounded-full font-semibold inline-flex items-center gap-2 group"
            >
              Join Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;