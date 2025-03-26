import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  ChefHat, Star, Users, Grid, BookmarkCheck, 
  Calendar, MapPin, Link as LinkIcon, Edit, 
  Instagram, Twitter 
} from 'lucide-react';
import Navbar from '../../components/user/Navbar';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('recipes');

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto space-y-6"
          >
            {/* Cover Image */}
            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f"
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Profile Header */}
            <div className="relative bg-white rounded-xl shadow-sm p-6 -mt-20 mx-4 sm:mx-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-orange-500/20"
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
                      <p className="text-gray-500">Amateur Chef</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4 sm:mt-0 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Edit size={16} className="inline-block mr-2" />
                      Edit Profile
                    </motion.button>
                  </div>
                  
                  <div className="flex flex-wrap justify-center sm:justify-start gap-6 mt-6">
                    <div className="flex items-center space-x-2">
                      <ChefHat className="text-orange-500" size={20} />
                      <span className="text-sm"><b>127</b> Recipes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="text-orange-500" size={20} />
                      <span className="text-sm"><b>4.8</b> Rating</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="text-orange-500" size={20} />
                      <span className="text-sm"><b>3.4k</b> Followers</span>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-600 max-w-2xl">
                    Passionate about creating delicious home-cooked meals and sharing recipes with fellow food enthusiasts. 
                    Specializing in Italian and Asian fusion cuisine. 🍝👨‍🍳
                  </p>

                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">New York, USA</span>
                    </div>
                    <a href="#" className="flex items-center text-gray-600 hover:text-orange-500">
                      <LinkIcon size={16} className="mr-1" />
                      <span className="text-sm">chefjohn.com</span>
                    </a>
                    <div className="flex items-center space-x-4">
                      <a href="#" className="text-gray-600 hover:text-orange-500">
                        <Instagram size={16} />
                      </a>
                      <a href="#" className="text-gray-600 hover:text-orange-500">
                        <Twitter size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Navigation */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <nav className="flex">
                {['recipes', 'saved', 'classes', 'following'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                      activeTab === tab
                        ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50/50'
                        : 'text-gray-500 hover:text-orange-500 hover:bg-orange-50/30'
                    }`}
                  >
                    {tab === 'recipes' && <Grid size={18} className="inline-block mr-2" />}
                    {tab === 'saved' && <BookmarkCheck size={18} className="inline-block mr-2" />}
                    {tab === 'classes' && <Calendar size={18} className="inline-block mr-2" />}
                    {tab === 'following' && <Users size={18} className="inline-block mr-2" />}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add your content here based on activeTab */}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Profile;