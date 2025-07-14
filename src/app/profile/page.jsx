"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import { 
  User, 
  Mail, 
  Calendar, 
  FileText, 
  Heart, 
  MessageCircle, 
  Eye,
  Edit,
  Trash2,
  Plus
} from "lucide-react";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0
  });

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserPosts();
    }
  }, [session]);

  const fetchUserPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts?userEmail=${session.user.email}&all=true`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
        
        // Calculate stats
        const totalLikes = data.reduce((sum, post) => sum + (post._count?.likes || 0), 0);
        const totalComments = data.reduce((sum, post) => sum + (post._count?.comments || 0), 0);
        
        setStats({
          totalPosts: data.length,
          totalLikes,
          totalComments
        });
      }
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally {
      setLoading(false);
    }
  };

  const sanitizeContent = (html) => {
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to view your profile</p>
          <Link 
            href="/login" 
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-red-500 to-red-600 h-32"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              <div className="relative -mt-16 mb-4 sm:mb-0">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={120}
                    height={120}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-500" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-gray-900 truncate">
                  {session.user.name || "Anonymous User"}
                </h1>
                <div className="flex items-center text-gray-600 mt-2">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="truncate">{session.user.email}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Member since {new Date().getFullYear()}</span>
                </div>
              </div>

              <div className="flex-shrink-0">
                <Link
                  href="/write"
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalPosts}</h3>
                <p className="text-gray-600">Total Posts</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalLikes}</h3>
                <p className="text-gray-600">Total Likes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalComments}</h3>
                <p className="text-gray-600">Total Comments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
              <span className="text-sm text-gray-500">{posts.length} posts</span>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your posts...</p>
              </div>
            ) : posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex gap-6">
                      {/* Post Image */}
                      {post.img && (
                        <div className="flex-shrink-0 w-32 h-24 relative">
                          <Image
                            src={post.img}
                            alt={post.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      )}

                      {/* Post Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <Link
                              href={`/posts/${post.slug}`}
                              className="group"
                            >
                              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors mb-2">
                                {post.title}
                              </h3>
                            </Link>
                            
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {sanitizeContent(post.desc).substring(0, 200)}...
                            </p>

                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.createdAt).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {post.views || 0} views
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {post._count?.likes || 0} likes
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {post._count?.comments || 0} comments
                              </span>
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                {post.catSlug?.toUpperCase()}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 ml-4">
                            <Link
                              href={`/posts/${post.slug}`}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Post"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Edit Post"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Post"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600 mb-6">Start sharing your thoughts with the world!</p>
                <Link
                  href="/write"
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Post
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
