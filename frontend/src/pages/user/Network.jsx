import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/user/Navbar';
import FollowersList from '../../components/user/FollowersList';
import SuggestedUsers from '../../components/user/SuggestedUsers';
import { Users, UserPlus } from 'lucide-react';

const Network = () => {
    const [activeTab, setActiveTab] = useState('followers');

    const [followers] = useState([
        {
            id: 1,
            name: 'Sarah Wilson',
            image: 'https://randomuser.me/api/portraits/women/1.jpg',
            role: 'Professional Chef',
            followers: 1200,
            isFollowing: true
        },
        {
            id: 2,
            name: 'Mike Chen',
            image: 'https://randomuser.me/api/portraits/men/2.jpg',
            role: 'Food Blogger',
            followers: 850,
            isFollowing: true
        },
        // Add more followers as needed
    ]);

    const [suggestions] = useState([
        {
            id: 3,
            name: 'Emma Davis',
            image: 'https://randomuser.me/api/portraits/women/3.jpg',
            role: 'Pastry Chef',
            followers: 2300,
            isFollowing: false
        },
        {
            id: 4,
            name: 'James Lee',
            image: 'https://randomuser.me/api/portraits/men/4.jpg',
            role: 'Home Cook',
            followers: 650,
            isFollowing: false
        },
        // Add more suggestions as needed
    ]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-5xl mx-auto space-y-6"
                    >
                        {/* Header */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Network</h1>
                            <p className="text-gray-600">Connect with other food enthusiasts and chefs</p>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <nav className="flex">
                                <button
                                    onClick={() => setActiveTab('followers')}
                                    className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'followers'
                                            ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50/50'
                                            : 'text-gray-500 hover:text-orange-500 hover:bg-orange-50/30'
                                        }`}
                                >
                                    <Users size={18} className="inline-block mr-2" />
                                    Followers
                                </button>
                                <button
                                    onClick={() => setActiveTab('suggestions')}
                                    className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'suggestions'
                                            ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50/50'
                                            : 'text-gray-500 hover:text-orange-500 hover:bg-orange-50/30'
                                        }`}
                                >
                                    <UserPlus size={18} className="inline-block mr-2" />
                                    Suggested Users
                                </button>
                            </nav>
                        </div>

                        {/* Content Area */}
                        <div className="space-y-4">
                            {activeTab === 'followers' ? (
                                <FollowersList followers={followers} />
                            ) : (
                                <SuggestedUsers suggestions={suggestions} />
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Network;