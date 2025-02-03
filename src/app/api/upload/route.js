import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const base64File = Buffer.from(buffer).toString("base64");
    const mimeType = file.type;

    const uploadRes = await cloudinary.uploader.upload(`data:${mimeType};base64,${base64File}`, {
      resource_type: "auto", // Automatically detects if it's an image or video
    });

    return NextResponse.json({ url: uploadRes.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
};
