import { NextResponse } from "next/server";
import prisma from "../../../utils/connect";
import { getAuthSession } from "@/utils/auth";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const category = searchParams.get("cat") || null;
    const userEmail = searchParams.get("userEmail") || null;
    const fetchAll = searchParams.get("all") === "true";
    const POST_PER_PAGE = 2;

    // Create filter object
    const filter = {};
    if (category) {
      filter.catSlug = category; // Filter posts by category slug
    }
    if (userEmail) {
      filter.userEmail = userEmail; // Filter posts by user email
    }

    // 🚀 Fetch posts with user details & comment count
    const posts = await prisma.post.findMany({
      where: filter,
      take: fetchAll ? undefined : POST_PER_PAGE + 1, // Take one extra to check if there are more
      skip: fetchAll ? undefined : (page - 1) * POST_PER_PAGE,
      include: {
        user: {  // ✅ Include user details (image, name, email)
          select: {
            name: true,
            image: true,
            email: true,
          },
        },
        _count: {  // ✅ Count number of comments and likes for each post
          select: {
             comments: true,
             likes: true,
           },
        },
      },
      orderBy: {
        createdAt: 'desc', // ✅ Order by newest first
      },
    });

    // If not fetching all, handle pagination
    if (!fetchAll) {
      const hasMore = posts.length > POST_PER_PAGE;
      const actualPosts = hasMore ? posts.slice(0, POST_PER_PAGE) : posts;
      
      return NextResponse.json({
        posts: actualPosts,
        hasMore,
        currentPage: page,
        totalPosts: await prisma.post.count({ where: filter }),
      }, { status: 200 });
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
};

// Handle POST request to create a new post
export const POST = async (req) => {
  try {
    // 🚀 Get user session
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
    }
    const userEmail = session.user.email;
    const body = await req.json();
    console.log("Received body:", body);

    const { title, desc, catSlug, img, slug } = body;

    // Validate required fields (including image)
    if (!title || !desc || !catSlug || !img || !slug) {
      return NextResponse.json({ error: "All fields including image are required!" }, { status: 400 });
    }

    // Validate fields are not empty strings
    if (title.trim() === '' || desc.trim() === '' || catSlug.trim() === '' || slug.trim() === '' || img.trim() === '') {
      return NextResponse.json({ error: "All fields must have valid content!" }, { status: 400 });
    }

    // ✅ Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json({ error: "A post with this title already exists!" }, { status: 400 });
    }

    // ✅ Log existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    console.log("Existing User:", existingUser);

    if (!existingUser) {
      return NextResponse.json({ error: "User does not exist!" }, { status: 404 });
    }

    // ✅ Log category
    const category = await prisma.category.findUnique({
      where: { slug: catSlug },
    });
    console.log("Category:", category);

    if (!category) {
      return NextResponse.json({ error: "Category does not exist!" }, { status: 400 });
    }

    // 🚀 Create new post with user relation
    const newPost = await prisma.post.create({
      data: {
        title,
        desc,
        catSlug,
        img, // Required field
        slug,
        userEmail,
        views: 0,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            email: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    console.log("Post was created:", newPost);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post!" }, { status: 500 });
  }
};

export const DELETE = async (req, {params}) => {
  try {
    const {id } = params;

    // gettig the user for authorization
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
    }

    const userEmail = session.user.email;

    //now checkingthe existence of the post
    const post = await prisma.post.findunique({
      where: { id },
      select:{
        id: true,
        title:true,
        userEmail: true,
        slug:true,
      },
    })
    if (!post) {
      return NextResponse.json({ error: "Post not found!" }, { status: 404 });
    }
    if (post.userEmail !== userEmail) {
      return NextResponse.json({ error: "You are not authorized to delete this post!" }, { status: 403 });
    }

    // Delete the post
    await prisma.post.delete({
      where: { id },
    });
    
    await prisma.like.deleteMany({
      where: { postSlug: post.slug },
    });
    await prisma.comment.deleteMany({
      where: { postSlug: post.slug },
    });
    await prisma.view.deleteMany({
      where: { postSlug: post.slug },
    });

    return NextResponse.json({ 
      message: "Post deleted successfully!",
      deletedPost:{
        id: post.id,
        title: post.title,
        slug: post.slug
      }
    
    
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Failed to delete post!" }, { status: 500 });
  }
  
}

