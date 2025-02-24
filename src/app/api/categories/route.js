import { NextResponse } from "next/server";
import prisma from "../../../utils/connect";
import { PrismaClient } from "@prisma/client";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();

    if (!categories.length) {
      return NextResponse.json(
        { error: "No categories found" },
        { status: 404 }
      );
    }

    return NextResponse.json(categories, {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Server error while fetching categories" },
      { status: 500 }
    );
  }
};
