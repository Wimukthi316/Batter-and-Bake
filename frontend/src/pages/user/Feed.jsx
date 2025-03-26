import React, { useState } from 'react';
import FeedPost from '../../components/user/FeedPost';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Image, 
  Video, 
  TrendingUp, 
  Users, 
  Bookmark,
  Bell,
  ChefHat,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      authorName: 'Chef Sarah',
      authorImage: 'https://randomuser.me/api/portraits/women/1.jpg',
      timestamp: '2h ago',
      content: "Just perfected my signature chocolate soufflé recipe! Here's a quick demo of the technique. #BakingTips #Desserts",
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1590841609987-4ac211aff423?auto=format&fit=crop&q=80'
        }
      ],
      likes: 245,
      comments: [
        {
          id: 1,
          authorName: 'Mike Chen',
          authorImage: 'https://randomuser.me/api/portraits/men/1.jpg',
          content: 'Looks amazing! Would love to try this recipe!',
          timestamp: '1h ago'
        }
      ]
    },
    {
      id: 2,
      authorName: 'Chef John',
      authorImage: 'https://randomuser.me/api/portraits/men/2.jpg',
      timestamp: '4h ago',
      content: 'Made this amazing sourdough bread today! The crust is perfectly crispy 🍞',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80'
        }
      ],
      likes: 189,
      comments: []
    }
  ]);

  

  const [trendingRecipes] = useState([
    {
      id: 1,
      title: 'Perfect Pasta Carbonara',
      image: 'https://source.unsplash.com/featured/300x200?pasta',
      saves: '1.2k',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Crusty Sourdough Bread',
      image: 'https://source.unsplash.com/featured/300x200?bread',
      saves: '956',
      rating: 4.9
    },
    {
      id: 3,
      title: 'Classic Tiramisu',
      image: 'https://source.unsplash.com/featured/300x200?tiramisu',
      saves: '845',
      rating: 4.7
    }
  ]);

  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: 'Amateur Chef',
    stats: {
      recipes: 127,
      following: '1.2k',
      followers: '3.4k'
    }
  });


  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
    media: []
  });

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };
  
  // Update the FeedPost props to include isLiked
  {posts.map(post => (
    <FeedPost 
      key={post.id} 
      post={post}
      onLike={() => handleLike(post.id)}
      isLiked={post.isLiked}
      
    />
  ))}

  const handleAddComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            authorName: 'Current User',
            authorImage: 'https://randomuser.me/api/portraits/men/1.jpg',
            content: comment,
            timestamp: 'Just now'
          }]
        };
      }
      return post;
    }));
  };

  const handleEditComment = (postId, commentId, newContent) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => 
            comment.id === commentId 
              ? { ...comment, content: newContent, edited: true }
              : comment
          )
        };
      }
      return post;
    }));
  };

  const handleDeleteComment = (postId, commentId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.filter(comment => comment.id !== commentId)
        };
      }
      return post;
    }));
  };

  const handleShare = async (post) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${post.authorName}'s Recipe`,
          text: post.content,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };
  
  // Add these handler functions
  const handleViewProfile = () => {
    navigate('/profile');
  };
  
  const handleQuickLink = (path) => {
    switch(path) {
      case 'recipes':
        navigate('/my-recipes');
        break;
      case 'following':
        navigate('/following');
        break;
      case 'followers':
        navigate('/followers');
        break;
      case 'saved':
        navigate('/saved-recipes');
        break;
      case 'classes':
        navigate('/upcoming-classes');
        break;
      case 'kitchen':
        navigate('/my-kitchen');
        break;
      default:
        break;
    }
  };

  return (
    <div className="container mx-auto px-4 pt-20">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Sidebar */}
<div className="hidden lg:block lg:col-span-3">
  <div className="sticky top-24 space-y-6">
    {/* User Profile Card */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-4"
    >
      <div className="flex items-center space-x-3 mb-4">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          src={userProfile.image}
          alt="Your profile"
          className="w-12 h-12 rounded-full object-cover cursor-pointer"
          onClick={handleViewProfile}
        />
        <div>
          <h3 className="font-semibold text-gray-800">{userProfile.name}</h3>
          <p className="text-sm text-gray-500">{userProfile.role}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-100 py-3 mb-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-center cursor-pointer"
          onClick={() => handleQuickLink('recipes')}
        >
          <div className="font-semibold text-gray-800">{userProfile.stats.recipes}</div>
          <div className="text-xs text-gray-500">Recipes</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-center cursor-pointer"
          onClick={() => handleQuickLink('following')}
        >
          <div className="font-semibold text-gray-800">{userProfile.stats.following}</div>
          <div className="text-xs text-gray-500">Following</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-center cursor-pointer"
          onClick={() => handleQuickLink('followers')}
        >
          <div className="font-semibold text-gray-800">{userProfile.stats.followers}</div>
          <div className="text-xs text-gray-500">Followers</div>
        </motion.div>
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleViewProfile}
        className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold cursor-pointer hover:shadow-md transition-shadow"
      >
        View Profile
      </motion.button>
    </motion.div>

    {/* Quick Navigation */}
    <nav className="space-y-2">
  <motion.button
    whileHover={{ scale: 1.02, x: 4 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => handleQuickLink('saved')}
    className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-orange-50 text-gray-700 cursor-pointer transition-colors"
  >
    <Bookmark size={20} />
    <span>Saved Recipes</span>
  </motion.button>
  <motion.button
    whileHover={{ scale: 1.02, x: 4 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => handleQuickLink('classes')}
    className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-orange-50 text-gray-700 cursor-pointer transition-colors"
  >
    <Calendar size={20} />
    <span>Upcoming Classes</span>
  </motion.button>
  <motion.button
    whileHover={{ scale: 1.02, x: 4 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => handleQuickLink('kitchen')}
    className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-orange-50 text-gray-700 cursor-pointer transition-colors"
  >
    <ChefHat size={20} />
    <span>My Kitchen</span>
  </motion.button>
</nav>
  </div>
</div>


        {/* Main Feed */}
      <div className="lg:col-span-6 space-y-4">
        {/* Create Post */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {!isCreating ? (
            <div className="p-4">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Your profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <button 
                  onClick={() => setIsCreating(true)}
                  className="flex-1 text-left px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100"
                >
                  Share your cooking journey...
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="What's cooking?"
                className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 resize-none"
                rows={3}
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Image size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Video size={20} className="text-gray-600" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold"
                  >
                    Post
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Posts Feed */}
        <AnimatePresence>
          {posts.map(post => (
            <FeedPost 
              key={post.id} 
              post={post}
              onLike={() => handleLike(post.id)}
              onAddComment={(comment) => handleAddComment(post.id, comment)}
              onEditComment={(commentId, content) => handleEditComment(post.id, commentId, content)}
              onDeleteComment={(commentId) => handleDeleteComment(post.id, commentId)}
              onShare={() => handleShare(post)}
            />
          ))}
        </AnimatePresence>
      </div>

        {/* Right Sidebar */}
<div className="hidden lg:block lg:col-span-3">
  <div className="sticky top-24 space-y-6">
    {/* Trending Recipes */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Trending Recipes</h3>
        <TrendingUp size={20} className="text-orange-500" />
      </div>
      <div className="space-y-4">
        {trendingRecipes.map((recipe) => (
          <motion.div 
            key={recipe.id} 
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <img 
              src={recipe.image}
              alt={recipe.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-medium text-gray-800 text-sm">{recipe.title}</h4>
              <p className="text-xs text-gray-500">{recipe.saves} saves • {recipe.rating} ⭐</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Feed;