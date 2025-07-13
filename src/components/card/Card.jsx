"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import { Heart, MessageCircle, User } from "lucide-react";
import { useLikes, useComments } from "@/hooks/useInteractions";

const Card = ({ item }) => {
  const [showComments, setShowComments] = useState(false);
  
  // Use custom hooks for likes and comments
  const { isLiked, likesCount, toggleLike, loading: likeLoading } = useLikes(
    item.slug, 
    item._count?.likes || 0
  );
  
  const { 
    comments, 
    commentsCount, 
    loading: commentsLoading, 
    submitting, 
    addComment 
  } = useComments(item.slug, item._count?.comments || 0);

  // Memoize sanitized description
  const description = useMemo(() => {
    return DOMPurify.sanitize(item.desc, { ALLOWED_TAGS: [] });
  }, [item.desc]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const commentText = formData.get('comment');
    
    if (await addComment(commentText)) {
      e.target.reset();
    }
  };

  return (
    <div className="flex gap-[50px] mb-[50px] items-center">
      {/* Image Section */}
      <div className="flex-1 relative w-auto h-[250px] hidden lg:block">
        {item.img && (
          <Image
            src={item.img || "/placeholder.jpg"}
            alt="Post image"
            fill
            className="object-cover"
            quality={100}
          />
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col gap-[30px]">
        <div>
          <span className="text-gray-400">
            {new Date(item.createdAt).toLocaleDateString()} -{" "}
          </span>
          <span className="text-red-600 font-semibold">
            {item.catSlug?.toUpperCase()}
          </span>
        </div>

        <Link href={`/posts/${item.slug}`}>
          <h1 className="font-bold text-xl">{item.title}</h1>
          <p className="font-[18px] font-md text-gray-600">
            {description.substring(0, 150)}...
          </p>
        </Link>

        {/* Footer Section */}
        <div className="flex flex-row justify-between items-center align-baseline">
          {/* User Info */}
          <div className="flex items-center gap-2">
            {item.user?.image ? (
              <Image
                src={item.user.image}
                alt={item.user.name || "User"}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            )}
            <span className="font-semibold text-sm">{item.user?.name || "Anonymous"}</span>
          </div>

          {/* Interaction Buttons */}
          <div className="flex items-center gap-4">
            {/* Like Button */}
            <button
              onClick={toggleLike}
              disabled={likeLoading}
              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isLiked 
                    ? "text-red-500 fill-red-500" 
                    : "text-gray-500 hover:text-red-500"
                }`}
              />
              <span className="text-red-600 font-semibold">{likesCount}</span>
            </button>

            {/* Comment Button */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-gray-500 hover:text-blue-500 transition-colors" />
              <span className="text-gray-400 font-semibold">{commentsCount}</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="comment"
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  disabled={submitting}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? "..." : "Post"}
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {commentsLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mx-auto"></div>
                </div>
              ) : comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                    {comment.user?.image ? (
                      <Image
                        src={comment.user.image}
                        alt={comment.user.name || "User"}
                        width={32}
                        height={32}
                        className="rounded-full flex-shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.user?.name || "Anonymous"}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.desc}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;

