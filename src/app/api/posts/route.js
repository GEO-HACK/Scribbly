import { NextResponse } from "next/server";
import prisma from "../../../utils/connect";

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

    if (posts.length === 0) {
      return NextResponse.json([], { status: 200 }); // Return empty array instead of an error
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
};
