import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChefHat,
  Star,
  Users,
  Grid,
  BookmarkCheck,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Edit,
  Instagram,
  Twitter,
  X,
  Camera,
  Trash2,
  AlertCircle,
  Loader2,
  CheckCircle,
} from "lucide-react";
import Navbar from "../../components/user/Navbar";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("recipes");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const initialProfile = {
    id: "",
    name: "Guest User",
    role: "Chef",
    bio: "",
    location: "",
    website: "",
    instagram: "",
    twitter: "",
    image: "/default-profile-image.jpg",
    coverImage: "/default-cover-image.jpg",
    stats: {
      recipes: 0,
      rating: 0,
      followers: "0",
    },
  };

  const [profile, setProfile] = useState(initialProfile);
  const [editForm, setEditForm] = useState(initialProfile);
  const [imageFile, setImageFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);

  const profileImageRef = useRef(null);
  const coverImageRef = useRef(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const ProfileSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-64 sm:h-80 rounded-xl bg-gray-200" />
      <div className="relative bg-white rounded-xl shadow-sm p-6 -mt-20 mx-4 sm:mx-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-32 h-32 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/profile");
      setProfile(response.data);
      setEditForm(response.data);
    } catch (err) {
      setError("Failed to load profile data");
      console.error("Error fetching profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (event, type) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "profile") {
          setImageFile(file);
          setEditForm((prev) => ({ ...prev, image: reader.result }));
        } else {
          setCoverImageFile(file);
          setEditForm((prev) => ({ ...prev, coverImage: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Error processing image");
      console.error("Error handling image:", err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      Object.keys(editForm).forEach((key) => {
        if (key !== "image" && key !== "coverImage") {
          formData.append(key, editForm[key]);
        }
      });

      if (imageFile) formData.append("profileImage", imageFile);
      if (coverImageFile) formData.append("coverImage", coverImageFile);

      const response = await axios.put("/api/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile(response.data);
      setSuccessMessage("Profile updated successfully!");
      setIsEditModalOpen(false);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to update profile");
      console.error("Error updating profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      setIsLoading(true);
      await axios.delete("/api/profile");
      navigate("/");
    } catch (err) {
      setError("Failed to delete profile");
      console.error("Error deleting profile:", err);
      setIsLoading(false);
    }
  };

  const SuccessMessage = ({ message }) => (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center"
        >
          <CheckCircle className="mr-2" size={20} />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const ErrorMessage = ({ message }) => (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center"
        >
          <AlertCircle className="mr-2" size={20} />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );

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
            {isLoading ? (
              <ProfileSkeleton />
            ) : (
              <>
                {/* Profile Content */}
                <div className="space-y-6">
                  {/* Cover Image */}
                  <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
                    <img
                      src={profile?.coverImage || "/default-cover-image.jpg"}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Profile Info */}
                  <div className="relative bg-white rounded-xl shadow-sm p-6 -mt-20 mx-4 sm:mx-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={profile?.image || "/default-profile-image.jpg"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-orange-500/20"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                              {profile?.name}
                            </h1>
                            <p className="text-gray-500">{profile?.role}</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsEditModalOpen(true)}
                            className="mt-4 sm:mt-0 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow"
                          >
                            <Edit size={16} className="inline-block mr-2" />
                            Edit Profile
                          </motion.button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center sm:justify-start gap-6 mt-6">
                          <div className="flex items-center space-x-2">
                            <ChefHat className="text-orange-500" size={20} />
                            <span className="text-sm">
                              <b>{profile?.stats?.recipes || 0}</b> Recipes
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="text-orange-500" size={20} />
                            <span className="text-sm">
                              <b>{profile?.stats?.rating || 0}</b> Rating
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="text-orange-500" size={20} />
                            <span className="text-sm">
                              <b>{profile?.stats?.followers || "0"}</b>{" "}
                              Followers
                            </span>
                          </div>
                        </div>

                        {/* Bio */}
                        <p className="mt-4 text-gray-600 max-w-2xl">
                          {profile?.bio}
                        </p>

                        {/* Contact Info */}
                        <div className="flex flex-wrap gap-4 mt-4">
                          {profile?.location && (
                            <div className="flex items-center text-gray-600">
                              <MapPin size={16} className="mr-1" />
                              <span className="text-sm">
                                {profile.location}
                              </span>
                            </div>
                          )}
                          {profile?.website && (
                            <a
                              href={`https://${profile.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-gray-600 hover:text-orange-500"
                            >
                              <LinkIcon size={16} className="mr-1" />
                              <span className="text-sm">{profile.website}</span>
                            </a>
                          )}
                          <div className="flex items-center space-x-4">
                            {profile?.instagram && (
                              <a
                                href={`https://instagram.com/${profile.instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-orange-500"
                              >
                                <Instagram size={16} />
                              </a>
                            )}
                            {profile?.twitter && (
                              <a
                                href={`https://twitter.com/${profile.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-orange-500"
                              >
                                <Twitter size={16} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <nav className="flex overflow-x-auto">
                    {["recipes", "saved", "classes", "following"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors whitespace-nowrap ${
                          activeTab === tab
                            ? "text-orange-500 border-b-2 border-orange-500 bg-orange-50/50"
                            : "text-gray-500 hover:text-orange-500 hover:bg-orange-50/30"
                        }`}
                      >
                        {tab === "recipes" && (
                          <Grid size={18} className="inline-block mr-2" />
                        )}
                        {tab === "saved" && (
                          <BookmarkCheck
                            size={18}
                            className="inline-block mr-2"
                          />
                        )}
                        {tab === "classes" && (
                          <Calendar size={18} className="inline-block mr-2" />
                        )}
                        {tab === "following" && (
                          <Users size={18} className="inline-block mr-2" />
                        )}
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Content Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Add your content here based on activeTab */}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Success and Error Messages */}
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={error} />

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-20"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsEditModalOpen(false);
            }}
          >
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-xl">
                      <Edit size={20} className="text-orange-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Edit Profile
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                <form onSubmit={handleEditSubmit} className="p-6 space-y-8">
                  {/* Images Section */}
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Profile Photo
                      </label>
                      <div className="relative group">
                        <img
                          src={editForm.image}
                          alt="Profile"
                          className="w-32 h-32 rounded-2xl object-cover shadow-md ring-4 ring-orange-500/10"
                        />
                        <input
                          type="file"
                          ref={profileImageRef}
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, "profile")}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => profileImageRef.current?.click()}
                          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <div className="flex flex-col items-center text-white">
                            <Camera size={24} />
                            <span className="text-xs mt-1">Change</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Cover Photo
                      </label>
                      <div className="relative group h-32 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100/80 transition-colors">
                        <input
                          type="file"
                          ref={coverImageRef}
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, "cover")}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => coverImageRef.current?.click()}
                          className="absolute inset-0 flex flex-col items-center justify-center text-gray-600"
                        >
                          <Camera size={24} />
                          <span className="mt-2 text-sm font-medium">
                            Change Cover Photo
                          </span>
                          <span className="mt-1 text-xs text-gray-500">
                            Recommended: 1500x500px
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Role
                        </label>
                        <input
                          type="text"
                          value={editForm.role}
                          onChange={(e) =>
                            setEditForm({ ...editForm, role: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                          placeholder="e.g. Professional Chef"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Bio</h3>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) =>
                        setEditForm({ ...editForm, bio: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-100 rounded-xl">
                          <MapPin size={20} className="text-orange-600" />
                        </div>
                        <input
                          type="text"
                          value={editForm.location}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              location: e.target.value,
                            })
                          }
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                          placeholder="Your location"
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-100 rounded-xl">
                          <LinkIcon size={20} className="text-orange-600" />
                        </div>
                        <input
                          type="url"
                          value={editForm.website}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              website: e.target.value,
                            })
                          }
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                          placeholder="Your website"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Social Links
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                          <Instagram size={20} className="text-white" />
                        </div>
                        <input
                          type="text"
                          value={editForm.instagram}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              instagram: e.target.value,
                            })
                          }
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                          placeholder="Instagram username"
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-500 rounded-xl">
                          <Twitter size={20} className="text-white" />
                        </div>
                        <input
                          type="text"
                          value={editForm.twitter}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              twitter: e.target.value,
                            })
                          }
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                          placeholder="Twitter username"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-gray-200">
                <div className="flex items-center justify-between gap-3 p-4">
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="px-6 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium flex items-center"
                  >
                    <Trash2 size={18} className="mr-2" />
                    Delete Profile
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      disabled={isLoading}
                      className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={18} />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsDeleteModalOpen(false);
            }}
          >
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white w-full max-w-md rounded-2xl shadow-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertCircle size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Delete Profile
                </h3>
              </div>

              <p className="text-gray-600 mb-6">
                Are you sure you want to delete your profile? This action cannot
                be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteProfile}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Deleting...
                    </>
                  ) : (
                    "Delete Profile"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Profile;
