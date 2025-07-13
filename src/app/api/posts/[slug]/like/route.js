import { NextResponse } from "next/server";
import prisma from "../../../../../utils/connect";
import { getAuthSession } from "@/utils/auth";

// GET - Check if user has liked the post and get like count
export const GET = async (req, { params }) => {
  try {
    const session = await getAuthSession();
    const { slug } = params;

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get post by slug
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { likes: true }
        }
      }
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if user has liked this post
    const userLike = await prisma.like.findUnique({
      where: {
        userEmail_postSlug: {
          userEmail: session.user.email,
          postSlug: slug
        }
      }
    });

    return NextResponse.json({
      isLiked: !!userLike,
      likesCount: post._count.likes
    });

  } catch (error) {
    console.error("Error in GET /api/posts/[slug]/like:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};

// POST - Toggle like for a post
export const POST = async (req, { params }) => {
  try {
    const session = await getAuthSession();
    const { slug } = params;

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { slug }
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if user already liked this post
    const existingLike = await prisma.like.findUnique({
      where: {
        userEmail_postSlug: {
          userEmail: session.user.email,
          postSlug: slug
        }
      }
    });

    let isLiked;
    
    if (existingLike) {
      // Unlike the post
      await prisma.like.delete({
        where: {
          userEmail_postSlug: {
            userEmail: session.user.email,
            postSlug: slug
          }
        }
      });
      isLiked = false;
    } else {
      // Like the post
      await prisma.like.create({
        data: {
          userEmail: session.user.email,
          postSlug: slug
        }
      });
      isLiked = true;
    }

    // Get updated like count
    const updatedPost = await prisma.post.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { likes: true }
        }
      }
    });

    return NextResponse.json({
      isLiked,
      likesCount: updatedPost._count.likes
    });

  } catch (error) {
    console.error("Error in POST /api/posts/[slug]/like:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
