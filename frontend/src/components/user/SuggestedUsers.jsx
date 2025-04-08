import React from 'react';
import { motion } from 'framer-motion';
import UserCard from './UserCard';

const SuggestedUsers = ({ suggestions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {suggestions.map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <UserCard user={user} />
        </motion.div>
      ))}
    </div>
  );
};

export default SuggestedUsers;