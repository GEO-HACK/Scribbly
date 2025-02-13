import { NextResponse } from "next/server";
import prisma from "../../../utils/connect";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const category = searchParams.get("cat") || null;
    const fetchAll = searchParams.get("all") === "true";
    const POST_PER_PAGE = 2;

    // Create filter object
    const filter = {};
    if (category) {
      filter.catSlug = category; // Filter posts by category slug
    }

    // 🚀 Fetch posts with user details & comment count
    const posts = await prisma.post.findMany({
      where: filter,
      take: fetchAll ? undefined : POST_PER_PAGE,
      skip: fetchAll ? undefined : (page - 1) * POST_PER_PAGE,
      include: {
        user: {  // ✅ Added: Include user details (image, name, email)
          select: {
            name: true,
            image: true,
            email: true,
          },
        },
        _count: {  // ✅ Added: Count number of comments for each post
          select: { comments: true },
        },
      },
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
    console.log("this is the body", body);
    const { title, desc, catSlug, img, slug, userEmail } = body;

    // Validate required fields
    if (!title || !desc || !catSlug || !img || !slug || !userEmail) {
      return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
    }

    // 🚀 Create new post with user relation
    const newPost = await prisma.post.create({
      data: {
        title,
        desc,
        catSlug,
        img,
        slug,
        userEmail,
        views: 0,
        user: {  // ✅ Added: Link post to user via email
          connect: { email: userEmail },
        },
      },
    });

    console.log("Post was created", newPost);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create post!" }, { status: 500 });
  }
};
