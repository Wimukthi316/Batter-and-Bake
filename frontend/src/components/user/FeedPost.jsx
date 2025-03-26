import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Edit2,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const FeedPost = ({ 
  post, 
  onLike, 
  onAddComment, 
  onEditComment, 
  onDeleteComment,
  onShare 
}) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      onLike();
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleMediaNav = (direction) => {
    if (direction === 'next') {
      setCurrentMediaIndex((prev) => 
        prev < post.media.length - 1 ? prev + 1 : prev
      );
    } else {
      setCurrentMediaIndex((prev) => 
        prev > 0 ? prev - 1 : prev
      );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden max-w-2xl mx-auto w-full"
    >
      {/* Post Header */}
      <div className="p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img 
            src={post.authorImage} 
            alt={post.authorName}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{post.authorName}</h3>
            <p className="text-xs sm:text-sm text-gray-500">{post.timestamp}</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700 p-1">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
        <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{post.content}</p>
        
        {/* Media Carousel */}
        {post.media && post.media.length > 0 && (
          <div className="relative rounded-lg overflow-hidden">
            <div className="relative aspect-[4/3] sm:aspect-[16/9]">
              {post.media[currentMediaIndex].type === 'video' ? (
                <video
                  src={post.media[currentMediaIndex].url}
                  poster={post.media[currentMediaIndex].thumbnail}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={post.media[currentMediaIndex].url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            {post.media.length > 1 && (
              <>
                <button
                  onClick={() => handleMediaNav('prev')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-full bg-black/50 text-white opacity-75 hover:opacity-100 transition-opacity"
                  disabled={currentMediaIndex === 0}
                >
                  <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => handleMediaNav('next')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-full bg-black/50 text-white opacity-75 hover:opacity-100 transition-opacity"
                  disabled={currentMediaIndex === post.media.length - 1}
                >
                  <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {post.media.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                        index === currentMediaIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onLike}
              className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : 'text-gray-600'}`}
            >
              <Heart size={18} className="sm:w-5 sm:h-5" fill={post.isLiked ? "currentColor" : "none"} />
              <span className="text-xs sm:text-sm">{post.likes}</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 text-gray-600"
            >
              <MessageCircle size={18} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">{post.comments.length}</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onShare}
              className="flex items-center space-x-1 text-gray-600"
            >
              <Share2 size={18} className="sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-100">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-2 sm:space-x-3 mb-3">
              <img 
                src={comment.authorImage} 
                alt={comment.authorName}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800 text-xs sm:text-sm">{comment.authorName}</h4>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => setEditingComment(comment.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Edit2 size={14} className="sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteComment(comment.id)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
                {editingComment === comment.id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      onEditComment(comment.id, formData.get('content'));
                      setEditingComment(null);
                    }}
                    className="mt-1"
                  >
                    <input
                      name="content"
                      defaultValue={comment.content}
                      className="w-full px-2 py-1 text-xs sm:text-sm border rounded"
                    />
                  </form>
                ) : (
                  <p className="text-gray-600 text-xs sm:text-sm">{comment.content}</p>
                )}
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                  {comment.timestamp}
                  {comment.edited && ' • Edited'}
                </p>
              </div>
            </div>
          ))}
          <form onSubmit={handleAddComment} className="flex items-center space-x-2 sm:space-x-3 mt-3">
            <input 
              type="text" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:border-orange-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full text-xs sm:text-sm font-semibold"
            >
              Post
            </motion.button>
          </form>
        </div>
      )}
    </motion.div>
  );
};

export default FeedPost;