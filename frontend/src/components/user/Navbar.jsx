import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  ChefHat, 
  Cookie, 
  BookOpen, 
  Users, 
  User,
  Menu, 
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const NavItems = [
    { 
      icon: <Home size={24} />, 
      label: 'Home', 
      action: () => navigate('/home')
    },
    { 
      icon: <ChefHat size={24} />, 
      label: 'Feed', 
      action: () => navigate('/feed')
    },
    { 
      icon: <Cookie size={24} />, 
      label: 'Reels', 
      action: () => navigate('/reels')
    },
    { 
      icon: <Users size={24} />, 
      label: 'Network', 
      action: () => navigate('/network')
    }
  ];
  

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <ChefHat className="text-orange-500" size={32} />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Batter & Bake
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NavItems.map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={item.action}
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/create')}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full"
        >
          Share Recipe
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/profile')}
          className="p-2 rounded-full hover:bg-orange-100"
        >
          <User className="text-gray-600" size={24} />
        </motion.button>
      </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-white border-t"
          >
            {NavItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  item.action();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-3 w-full p-4 hover:bg-orange-50 border-b border-gray-100"
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;