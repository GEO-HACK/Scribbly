import { NextResponse } from "next/server";
import prisma from "@/utils/connect"; // Ensure this is correctly set up
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

// Get all comments for a post
export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const postSlug = searchParams.get("postSlug");

    const comments = await prisma.comment.findMany({
      where: { postSlug },
      include: { user: true },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    console.error("Error fetching comments:", err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};

// Create a comment
export const POST = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const { desc, postSlug } = await req.json();
    if (!desc || !postSlug) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newComment = await prisma.comment.create({
      data: {
        desc,
        postSlug,
        userEmail: session.user.email, // Fixed to use userEmail
      },
    });

    console.log("New comment created:", newComment); // Log created comment for debugging

    return NextResponse.json(newComment, { status: 201 }); // Return new comment in response
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
