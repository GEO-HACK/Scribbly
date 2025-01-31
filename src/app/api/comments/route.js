import { NextResponse } from "next/server";
import prisma from "../../../utils/connect";

// Get all comments of a post

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);

    console.log(searchParams)
    const postSlug = searchParams.get("postSlug");


    const Comments = await prisma.comment.findMany({
      where: { 
        ...(postSlug && {postSlug})
       },
      include:{user:true}
    });

    if (!Comments) {
      return new NextResponse(JSON.stringify({ message: "no comments on this post" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(Comments ), { status: 200 });
  } catch (err) {
    // console.error("Error fetching post:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
