import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Heart, MessageCircle, Share2, Bookmark,
    Play, Pause, VolumeX, Volume2
} from 'lucide-react';
import Navbar from '../../components/user/Navbar';

const Reels = () => {
    const [reels] = useState([
        {
            id: 1,
            author: {
                name: 'Chef Maria',
                image: 'https://randomuser.me/api/portraits/women/1.jpg',
                username: '@chefmaria'
            },
            video: 'https://example.com/video1.mp4', // Replace with actual video URL
            description: 'Quick and easy pasta carbonara recipe 🍝 #ItalianFood #Cooking',
            likes: 1240,
            comments: 89,
            isLiked: false,
            isSaved: false
        },
        // Add more reels
    ]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white pt-16">
                <div className="max-w-md mx-auto relative">
                    {reels.map((reel) => (
                        <ReelCard key={reel.id} reel={reel} />
                    ))}
                </div>
            </div>
        </>
    );
};

const ReelCard = ({ reel }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isLiked, setIsLiked] = useState(reel.isLiked);
    const [isSaved, setIsSaved] = useState(reel.isSaved);
    const [showComments, setShowComments] = useState(false);
    const videoRef = useRef(null);

    const handleVideoPress = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        // Add API call to update likes
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
        // Add API call to save reel
    };

    return (
        <div className="relative h-screen snap-start">
            {/* Video Player */}
            <div className="relative h-full bg-black">
                <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    src={reel.video}
                    loop
                    muted={isMuted}
                    onClick={handleVideoPress}
                />

                {/* Play/Pause Overlay */}
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    onClick={handleVideoPress}
                >
                    {!isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-black/50 rounded-full p-4"
                        >
                            <Play size={32} className="text-white" />
                        </motion.div>
                    )}
                </div>

                {/* Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="flex items-end justify-between">
                        {/* Author Info */}
                        <div className="flex items-center space-x-3">
                            <img
                                src={reel.author.image}
                                alt={reel.author.name}
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                            <div className="text-white">
                                <h4 className="font-semibold">{reel.author.name}</h4>
                                <p className="text-sm opacity-80">{reel.author.username}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col items-center space-y-4">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={handleLike}
                                className="text-white"
                            >
                                <Heart
                                    size={28}
                                    fill={isLiked ? '#ef4444' : 'none'}
                                    className={isLiked ? 'text-red-500' : ''}
                                />
                                <span className="text-xs block">{reel.likes}</span>
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setShowComments(true)}
                                className="text-white"
                            >
                                <MessageCircle size={28} />
                                <span className="text-xs block">{reel.comments}</span>
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={handleSave}
                                className="text-white"
                            >
                                <Bookmark
                                    size={28}
                                    fill={isSaved ? 'white' : 'none'}
                                />
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMuted(!isMuted)}
                                className="text-white"
                            >
                                {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
                            </motion.button>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-white mt-4 text-sm">{reel.description}</p>
                </div>
            </div>

            {/* Comments Modal */}
            {showComments && (
                <CommentsModal
                    reelId={reel.id}
                    onClose={() => setShowComments(false)}
                />
            )}
        </div>
    );
};

// Update the CommentsModal component with edit and delete functionality

const CommentsModal = ({ reelId, onClose }) => {
    const [comments, setComments] = useState([
        {
            id: 1,
            author: {
                name: 'Jane Cooper',
                image: 'https://randomuser.me/api/portraits/women/2.jpg'
            },
            content: 'This looks amazing! Can you share the recipe?',
            timestamp: '2h ago',
            likes: 24,
            isEditing: false
        },
    ]);

    const [newComment, setNewComment] = useState('');
    const [editingComment, setEditingComment] = useState(null);

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        if (editingComment) {
            // Update existing comment
            setComments(comments.map(comment =>
                comment.id === editingComment.id
                    ? { ...comment, content: newComment, isEditing: false }
                    : comment
            ));
            setEditingComment(null);
        } else {
            // Add new comment
            setComments([
                {
                    id: Date.now(),
                    author: {
                        name: 'You',
                        image: 'https://randomuser.me/api/portraits/men/1.jpg'
                    },
                    content: newComment,
                    timestamp: 'Just now',
                    likes: 0,
                    isEditing: false
                },
                ...comments
            ]);
        }

        setNewComment('');
    };

    const handleEditComment = (comment) => {
        setEditingComment(comment);
        setNewComment(comment.content);
        setComments(comments.map(c =>
            c.id === comment.id
                ? { ...c, isEditing: true }
                : { ...c, isEditing: false }
        ));
    };

    const handleDeleteComment = (commentId) => {
        // Add confirmation dialog
        if (window.confirm('Are you sure you want to delete this comment?')) {
            setComments(comments.filter(comment => comment.id !== commentId));
        }
    };

    const handleCancelEdit = () => {
        setEditingComment(null);
        setNewComment('');
        setComments(comments.map(c => ({ ...c, isEditing: false })));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[70vh] overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-center">Comments</h3>
                </div>

                <div className="overflow-y-auto max-h-[calc(70vh-8rem)] p-4 space-y-4">
                    {comments.map(comment => (
                        <div key={comment.id} className="flex space-x-3 group">
                            <img
                                src={comment.author.image}
                                alt={comment.author.name}
                                className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="bg-gray-100 rounded-2xl p-3">
                                    <h4 className="font-semibold text-sm">{comment.author.name}</h4>
                                    <p className="text-sm">{comment.content}</p>
                                </div>
                                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                    <span>{comment.timestamp}</span>
                                    <button>{comment.likes} likes</button>
                                    <button>Reply</button>
                                    {/* Only show edit/delete for user's own comments */}
                                    {comment.author.name === 'You' && (
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEditComment(comment)}
                                                className="text-orange-500 hover:text-orange-600 mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteComment(comment.id)}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <form
                    onSubmit={handleSubmitComment}
                    className="p-4 border-t bg-white sticky bottom-0"
                >
                    <div className="flex items-center space-x-3">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={editingComment ? "Edit your comment..." : "Add a comment..."}
                            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-orange-500"
                        />
                        {editingComment ? (
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="text-gray-500 font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="text-orange-500 font-semibold disabled:opacity-50"
                                    disabled={!newComment.trim()}
                                >
                                    Update
                                </button>
                            </div>
                        ) : (
                            <button
                                type="submit"
                                className="text-orange-500 font-semibold disabled:opacity-50"
                                disabled={!newComment.trim()}
                            >
                                Post
                            </button>
                        )}
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Reels;