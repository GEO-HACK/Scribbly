import { NextResponse } from "next/server";
import prisma from "../../../utils/connect";

export const GET = async () => {
    try {
        const categories = await prisma.category.findMany();
      
        if (!categories.length) {
          return NextResponse.json(
            { error: "No categories found" },
            { status: 404 }
          );
        }
      
        return NextResponse.json(categories, { status: 200 });
      
      } catch (error) {
        console.error("Database Error:", error); // Detailed logging
        return NextResponse.json(
          { error: "Server error while fetching categories" },
          { status: 500 }
        );
      }
      
};
