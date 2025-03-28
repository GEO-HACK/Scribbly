import { NextResponse } from "next/server";
import prisma from "../../../../utils/connect";

// Get single post
export const GET = async (req, { params }) => {
  try {
    const { slug } = params;
    const post = await prisma.post.findUnique({
      where: { slug },
      include:{user:true}
    });

    if (!post) {
      return new NextResponse(JSON.stringify({ message: "Post not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ post }), { status: 200 });
  } catch (err) {
    console.error("Error fetching post:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
