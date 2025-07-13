"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export const useLikes = (postSlug, initialLikesCount = 0) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [loading, setLoading] = useState(false);

  // Fetch initial like status
  useEffect(() => {
    if (session?.user && postSlug) {
      fetchLikeStatus();
    }
  }, [session, postSlug]);

  const fetchLikeStatus = async () => {
    try {
      const res = await fetch(`/api/posts/${postSlug}/like`);
      if (res.ok) {
        const data = await res.json();
        setIsLiked(data.isLiked);
        setLikesCount(data.likesCount);
      }
    } catch (error) {
      console.error("Error fetching like status:", error);
    }
  };

  const toggleLike = async () => {
    if (!session?.user) {
      // Redirect to login or show message
      window.location.href = '/login';
      return;
    }

    if (loading) return;

    setLoading(true);
    
    // Optimistic update
    const newIsLiked = !isLiked;
    const newLikesCount = newIsLiked ? likesCount + 1 : likesCount - 1;
    
    setIsLiked(newIsLiked);
    setLikesCount(newLikesCount);

    try {
      const res = await fetch(`/api/posts/${postSlug}/like`, {
        method: 'POST',
      });

      if (res.ok) {
        const data = await res.json();
        setIsLiked(data.isLiked);
        setLikesCount(data.likesCount);
      } else {
        // Revert optimistic update on error
        setIsLiked(!newIsLiked);
        setLikesCount(likesCount);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      // Revert optimistic update on error
      setIsLiked(!newIsLiked);
      setLikesCount(likesCount);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLiked,
    likesCount,
    toggleLike,
    loading
  };
};

export const useComments = (postSlug, initialCommentsCount = 0) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(initialCommentsCount);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch comments
  useEffect(() => {
    if (postSlug) {
      fetchComments();
    }
  }, [postSlug]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${postSlug}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
        setCommentsCount(data.length);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (commentText) => {
    if (!session?.user) {
      window.location.href = '/login';
      return false;
    }

    if (!commentText.trim() || submitting) return false;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/posts/${postSlug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ desc: commentText.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        setComments(prev => [data.comment, ...prev]);
        setCommentsCount(data.commentsCount);
        return true;
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmitting(false);
    }
    return false;
  };

  return {
    comments,
    commentsCount,
    loading,
    submitting,
    addComment,
    fetchComments
  };
};
