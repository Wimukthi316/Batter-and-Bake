import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const UserCard = ({ user }) => {
    const [isFollowing, setIsFollowing] = useState(user.isFollowing);

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
        // Here you would typically make an API call to update the follow status
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={user.image}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.role}</p>
                    <div className="flex items-center space-x-1 mt-1 text-sm text-gray-500">
                        <Users size={14} />
                        <span>{user.followers} followers</span>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFollowToggle}
                    className={`px-4 py-2 rounded-full font-semibold text-sm ${isFollowing
                            ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            : 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                        }`}
                >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </motion.button>
            </div>
        </div>
    );
};

export default UserCard;