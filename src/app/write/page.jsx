"use client";

import React,{ useState} from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import { common, createLowlight } from "lowlight";
import ResizableImageExtension from "@/components/resizableImageExtension/ResizableImageExtension";
import "highlight.js/styles/github-dark.css";

// Initialize syntax highlighting
const lowlight = createLowlight(common);

const Page = () => {
  const { status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);


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
    content: "<p>Write something awesome</p>",
  });

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
  if(file){
    const reader = new FileReader();
    reader.onloadend = ()=> {
      editor.chain().focus().setImage({src:reader.result}).run();
    }
    reader.readAsDataURL(file);
  }
 };
  return (
    <div className="max-w-4xl mx-auto mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
      {/* Title Input */}
      <input
        type="text"
        placeholder="Document Title"
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

        <input

        type="file"
        accept="image/*"
        id="image"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        
        />
        <button
        onClick={() => document.getElementById('image').click()}
        className="px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md border border-gray-300"
        >
          Upload Image
        </button>
      
       
       

        {/* Save Button */}
        <button
          onClick={() => console.log(editor.getHTML())}
          className="ml-auto px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          save </button>
      </div>

      {/* Editor */}
      <div className="mt-5 bg-white min-h-[300px] border border-gray-300 rounded-md shadow-sm p-4 text-gray-800">
        <EditorContent editor={editor} 
        className="prose w-full min-h-[300px] focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Page;
