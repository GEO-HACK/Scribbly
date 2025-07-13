import { NextResponse } from "next/server";
import prisma from "../../../../../utils/connect";
import { getAuthSession } from "@/utils/auth";

// GET - Get comments for a post
export const GET = async (req, { params }) => {
  try {
    const { slug } = params;

    const comments = await prisma.comment.findMany({
      where: { postSlug: slug },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(comments);

  } catch (error) {
    console.error("Error in GET /api/posts/[slug]/comments:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};

// POST - Add a new comment
export const POST = async (req, { params }) => {
  try {
    const session = await getAuthSession();
    const { slug } = params;
    const { desc } = await req.json();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!desc || desc.trim().length === 0) {
      return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });
    }

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { slug }
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        desc: desc.trim(),
        userEmail: session.user.email,
        postSlug: slug
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            email: true
          }
        }
      }
    });

    // Get updated comment count
    const updatedPost = await prisma.post.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { comments: true }
        }
      }
    });

    return NextResponse.json({
      comment,
      commentsCount: updatedPost._count.comments
    });

  } catch (error) {
    console.error("Error in POST /api/posts/[slug]/comments:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
