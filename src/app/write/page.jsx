"use client";
export const dynmic = 'force-dynamic'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import slugify from "slugify";
import { common, createLowlight } from "lowlight";
import ResizableImageExtension from "@/components/resizableImageExtension/ResizableImageExtension";
import "highlight.js/styles/github-dark.css";
import useCategories from "@/hooks/useCategories";

// Initialize syntax highlighting
const lowlight = createLowlight(common);

const Page = () => {
  const  {data: session} = useSession();
  const { status } = useSession();
  const router = useRouter();
  
  // State for upload progress, file, dropdown visibility
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);  // New state to control dropdown visibility
  // states for the fetching of categories from the database

  const [ selectedCategory, setSelectedCategory] = useState("");
  //image url
  const [img, setImg] = useState("");
  // state of the title
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const  { categories, loading, error } = useCategories();

  

  const handleSave = async () => {


    
    if(!title || !desc || !selectedCategory || !img){
      alert("Please fill in all fields including an image");
      return;
      
      
    }
    
    //generate the slug for the title
    const slug = slugify(title, { lower: true , strict:true});

    // get the user from session

    if(!session){
      alert("You need to be logged in to create a post");
      return;
    }

    const userEmail = session.user.email; //get the email from session

    console.log("this is the user email", userEmail);



    try{
      const res = await fetch("/api/posts",{
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc,
          catSlug: selectedCategory,
          img,
          slug,
          userEmail,
          views: 0,
        }),
      });

      if(res.ok){
        alert("Post created successfully");
      }
      else{
        console.error("Failed to save document");
      }
    } catch (error) {
      console.error("Error saving the document", error)
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({ lowlight }),
      ResizableImageExtension,
      Bold,
      Italic,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
    ],
    content: "<p>Write something awesome...</p>",
  });

  useEffect(() => {
    if(editor){
      editor.on("update", () => {
        setDesc(editor.getHTML());// Update content state when editor changes
      });
    }
  },[editor]);

  if (status === "loading") {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  // Function to handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload", true);

      // Update progress state
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      };

      xhr.onload = async () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setImg(data.url);
          editor.chain().focus().setImage({ src: data.url }).run();
        } else {
          console.error("Upload failed", xhr.responseText);
        }
        setUploading(false);
        setUploadProgress(0);
      };

      xhr.onerror = () => {
        console.error("Upload failed");
        setUploading(false);
        setUploadProgress(0);
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Upload failed", error);
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
      {/* Title Input */}
      <input
        type="text"
        placeholder="Document Title"
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-xl font-semibold bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Toolbar */}
      <div className="mt-4 flex flex-wrap gap-2 bg-white p-2 shadow-sm rounded-md border border-gray-300">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md border border-gray-300"
        >
          <b>B</b>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-4 py-2 text-gray-700 italic hover:bg-blue-100 rounded-md border border-gray-300"
        >

          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="px-4 py-2 text-gray-700 underline hover:bg-blue-100 rounded-md border border-gray-300"
        >
          U
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md border border-gray-300"
        >
          • List
        </button>

        {/* Image Upload Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}  // Toggle dropdown visibility
            className="px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md border border-gray-300"
          >
            Image Options
          </button>

          {dropdownOpen && (
            <div className="absolute bg-white border border-gray-300 rounded-md shadow-md mt-2 w-48 z-10">
              <input
                type="file"
                accept="image/*"
                id="image"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <button
                onClick={() => document.getElementById("image").click()}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                From Pc
              </button>
              {/* Add Cloudinary selection option here */}
              <button
                onClick={() => console.log("Cloudinary Select (Implement later)")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                browse
              </button>
            </div>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="ml-auto px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          save
        </button>
      </div>

      {/* Progress Bar */}
      {uploading && (
        <div className="mt-4 w-full bg-gray-200 rounded-md overflow-hidden">
          <div
            className="bg-blue-500 text-xs font-medium text-white text-center p-1 leading-none"
            style={{ width: `${uploadProgress}%` }}
          >
            {uploadProgress}%
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="mt-5 bg-white min-h-[300px] border border-gray-300 rounded-md shadow-sm p-4 text-gray-800">
        <EditorContent editor={editor} className="prose w-full min-h-[300px] focus:outline-none" />
      </div>

      {/* Category Dropdown */}
      <div className="mt-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option 
            value=""
            className="text-gray-500"
          >Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug} className="text-gray-800 hover:bg-blue-100">
              {category.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Page;
