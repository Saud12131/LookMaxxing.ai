"use client";

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Heart, MessageCircle, PlusCircle, X, Upload, Image as ImageIcon } from 'lucide-react';
import { postAction, getPost } from '@/actions/postAction';
import { useAuth } from '@/context/authcontext';
interface TransformationPost {
  id: number;
  username: string;
  beforeImage: string;
  afterImage: string;
  title: string;
  timeAgo: string;
  likes: number;
  comments: number;
  category: string;
  createdAt?: Date;
}

import { toast } from 'sonner';

// Helper function to format time ago
const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return `${Math.floor(diffInSeconds / 604800)}w ago`;
};
export default function Home() {
  // Dummy data for transformation posts with new images and categories
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useAuth();
  const userID = user?.uid;
  const [formData, setFormData] = useState({
    UserID: userID, // This should come from your auth system
    UserBeforeImage: '',
    UserAfterImage: '',
    Description: ''
  });
  const [previewBefore, setPreviewBefore] = useState('');
  const [previewAfter, setPreviewAfter] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const fileInputBeforeRef = useRef<HTMLInputElement>(null);
  const fileInputAfterRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (type === 'before') {
        setFormData(prev => ({ ...prev, UserBeforeImage: base64String }));
        setPreviewBefore(URL.createObjectURL(file));
      } else {
        setFormData(prev => ({ ...prev, UserAfterImage: base64String }));
        setPreviewAfter(URL.createObjectURL(file));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form when closing
    setFormData({
      UserID: 'user12',
      UserBeforeImage: '',
      UserAfterImage: '',
      Description: ''
    });
    setPreviewBefore('');
    setPreviewAfter('');
  };
const handlePostSubmit = async () => {
  if (isPosting) return;
  
  setIsPosting(true);
  try {
    const post = await postAction(
      formData.UserBeforeImage,
      formData.UserAfterImage,
      formData.Description,
    );
    
    if (post) {
      toast.success("Post created successfully!");
      closeModal();
    }
  } catch (err) {
    console.error('Error creating post:', err);
    toast.error("Failed to create post. Please try again.");
  } finally {
    setIsPosting(false);
  }
};
  const [posts, setPosts] = useState<TransformationPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const dbPosts = await getPost();
        
        // Transform database posts to match the TransformationPost interface
        const transformedPosts = dbPosts.map((post: any) => ({
          id: post.id,
          username: post.UserID || 'anonymous',
          beforeImage: post.UserBeforeImage,
          afterImage: post.UserAfterImage,
          title: post.Description.substring(0, 50) + (post.Description.length > 50 ? '...' : ''),
          timeAgo: post.createdAt ? formatTimeAgo(new Date(post.createdAt)) : 'Recently',
          likes: Math.floor(Math.random() * 100), // Random likes for demo
          comments: Math.floor(Math.random() * 30), // Random comments for demo
          category: ['Fitness', 'Skincare', 'Fashion', 'Haircare'][Math.floor(Math.random() * 4)] // Random category
        }));

        setPosts(transformedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Fitness': 'bg-pink-100 text-pink-800',
      'Skincare': 'bg-purple-100 text-purple-800',
      'Fashion': 'bg-indigo-100 text-indigo-800',
      'Haircare': 'bg-amber-100 text-amber-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Transformations <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">That Inspire</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fake people, real results. Get inspired by these amazing transformations powered by AI.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              {/* Post Header */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold">
                      {post.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">@{post.username}</p>
                      <p className="text-xs text-gray-500">{post.timeAgo}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{post.title}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="relative rounded-xl overflow-hidden shadow-md">
                    <div className="relative pb-[125%] bg-gray-100">
                      <img 
                        src={post.beforeImage} 
                        alt="Before transformation" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                        Before
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden shadow-md">
                    <div className="relative pb-[125%] bg-gray-100">
                      <img 
                        src={post.afterImage} 
                        alt="After transformation" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 right-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-3 py-1.5 rounded-full">
                        After
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-gray-500">
                  <button className="flex items-center space-x-1.5 hover:text-pink-500 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1.5 hover:text-purple-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  <div className="flex-1"></div>
                  <button className="text-sm font-medium text-pink-500 hover:text-pink-600 flex items-center">
                    <PlusCircle className="w-4 h-4 mr-1" />
                    Try this look
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
        
        {/* Add Transformation Button */}
        <div className="mt-12 mb-16 flex justify-center">
          <button 
            className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            onClick={openModal}
          >
            <span className="relative z-10 flex items-center">
              <PlusCircle className="w-5 h-5 mr-2" />
              Share Your Transformation
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>

        {/* Transformation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Share Your Transformation</h2>
                  <button 
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Before & After Photos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Before Photo */}
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                        {previewBefore ? (
                          <div className="relative">
                            <img 
                              src={previewBefore} 
                              alt="Before transformation" 
                              className="w-full h-48 object-cover rounded-lg mb-2"
                            />
                            <button
                              onClick={() => fileInputBeforeRef.current?.click()}
                              className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full shadow-sm hover:bg-white"
                            >
                              <Upload className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        ) : (
                          <div 
                            className="flex flex-col items-center justify-center h-48 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => fileInputBeforeRef.current?.click()}
                          >
                            <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Upload Before Photo</p>
                          </div>
                        )}
                        <input
                          type="file"
                          ref={fileInputBeforeRef}
                          onChange={(e) => handleImageUpload(e, 'before')}
                          accept="image/*"
                          className="hidden"
                        />
                        <p className="text-xs text-gray-500 mt-1">Before</p>
                      </div>

                      
                      {/* After Photo */}
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                        {previewAfter ? (
                          <div className="relative">
                            <img 
                              src={previewAfter} 
                              alt="After transformation" 
                              className="w-full h-48 object-cover rounded-lg mb-2"
                            />
                            <button
                              onClick={() => fileInputAfterRef.current?.click()}
                              className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full shadow-sm hover:bg-white"
                            >
                              <Upload className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        ) : (
                          <div 
                            className="flex flex-col items-center justify-center h-48 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => fileInputAfterRef.current?.click()}
                          >
                            <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Upload After Photo</p>
                          </div>
                        )}
                        <input
                          type="file"
                          ref={fileInputAfterRef}
                          onChange={(e) => handleImageUpload(e, 'after')}
                          accept="image/*"
                          className="hidden"
                        />
                        <p className="text-xs text-gray-500 mt-1">After</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="Description"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Share your transformation story..."
                      value={formData.Description}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePostSubmit}
                      type="button"
                      className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center min-w-[100px]"
                      disabled={!formData.UserBeforeImage || !formData.UserAfterImage || !formData.Description || isPosting}
                    >
                      {isPosting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Posting...
                        </>
                      ) : 'Post'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  </div>
);
}