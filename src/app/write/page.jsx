"use client";

import React from "react";
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
import "highlight.js/styles/github-dark.css";

// Initialize syntax highlighting
const lowlight = createLowlight(common);

const Page = () => {
  const { status } = useSession();
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({ lowlight }),
      Image, // Enable image uploading
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
  const addImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
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
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md border border-gray-300"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md border border-gray-300"
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md border border-gray-300"
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md border border-gray-300"
        >
          ❝ Quote
        </button>
        <button
          onClick={addImage}
          className="px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md border border-gray-300"
        >
          🖼️ Image
        </button>
      </div>

      {/* Editor */}
      <div className="mt-5 bg-white min-h-[300px] border border-gray-300 rounded-md shadow-sm p-4 text-gray-800">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Page;
