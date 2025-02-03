import { NextResponse } from "next/server";
import prisma from "../../../utils/connect";
import { useReducedMotion } from "framer-motion";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const category = searchParams.get("cat") || null;
    const POST_PER_PAGE = 2;

    // Create a filter object
    const filter = {};
    if (category) {
      filter.catSlug = category; // Filter posts by category slug
    }

    // Fetch posts with pagination
    const posts = await prisma.post.findMany({
      where: filter,
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
};

// Handle POST request to create a new post
export const POST = async (req) => {
  try {
    const body = await req.json();
    console.log("this is the body",body);
    const { title, desc, category, imageUrl ,slug, userEmail} = body;

    // Validate required fields
    if (!title || !desc || !category || !imageUrl || !slug || !userEmail) {
      return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
    }

    // Create new post with image
    console.log("this is the progress posting");
    const newPost = await prisma.post.create({
      data: {
        title,
        desc,
        catSlug: category, // Assuming category is stored as a slug
        imageUrl, // Store image URL
        slug,
        userEmail,
      },
    });



    console.log("post was created",newPost);
    

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create post!" }, { status: 500 });
  }
};
