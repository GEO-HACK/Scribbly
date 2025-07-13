"use client";
export const dynamic = 'force-dynamic'

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
import { 
  Bold as BoldIcon, 
  Italic as ItalicIcon, 
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Image as ImageIcon,
  Type,
  Save,
  Upload,
  X,
  Check,
  AlertCircle
} from "lucide-react";

// Initialize syntax highlighting
const lowlight = createLowlight(common);

const Page = () => {
  const { data: session } = useSession();
  const { status } = useSession();
  const router = useRouter();
  
  // State management
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success', 'error', null
  const { categories, loading, error } = useCategories();

  const handleSave = async () => {
    if (!title || !desc || !selectedCategory || !img) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }
    
    setSaving(true);
    
    // Generate the slug for the title
    const slug = slugify(title, { lower: true, strict: true });

    if (!session) {
      setSaveStatus('error');
      setSaving(false);
      router.push('/login');
      return;
    }

    const userEmail = session.user.email;

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

      if (res.ok) {
        setSaveStatus('success');
        setTimeout(() => {
          router.push('/blog');
        }, 2000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error("Error saving the document", error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus(null), 3000);
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
    content: "<p>Start writing your story...</p>",
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] px-6 py-4',
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.on("update", () => {
        setDesc(editor.getHTML());
      });
    }
  }, [editor]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading editor...</p>
        </div>
      </div>
    );
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
          if (editor) {
            editor.chain().focus().setImage({ src: data.url }).run();
          }
        } else {
          console.error("Upload failed", xhr.responseText);
        }
        setUploading(false);
        setUploadProgress(0);
        setDropdownOpen(false);
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
          <p className="text-gray-600">Share your thoughts with the world</p>
        </div>

        {/* Main Editor Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Title Input */}
          <div className="border-b border-gray-200 p-6">
            <input
              type="text"
              placeholder="Enter your post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-2xl font-bold bg-transparent placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Toolbar */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex flex-wrap items-center gap-2">
              {/* Formatting Buttons */}
              <div className="flex items-center gap-1 border-r border-gray-200 pr-3 mr-3">
                <button
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`p-2 rounded-md transition-colors ${
                    editor?.isActive('bold') 
                      ? 'bg-red-100 text-red-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Bold"
                >
                  <BoldIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`p-2 rounded-md transition-colors ${
                    editor?.isActive('italic') 
                      ? 'bg-red-100 text-red-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Italic"
                >
                  <ItalicIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleUnderline().run()}
                  className={`p-2 rounded-md transition-colors ${
                    editor?.isActive('underline') 
                      ? 'bg-red-100 text-red-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Underline"
                >
                  <UnderlineIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Heading Buttons */}
              <div className="flex items-center gap-1 border-r border-gray-200 pr-3 mr-3">
                {[1, 2, 3].map((level) => (
                  <button
                    key={level}
                    onClick={() => editor?.chain().focus().toggleHeading({ level }).run()}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      editor?.isActive('heading', { level }) 
                        ? 'bg-red-100 text-red-600' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    title={`Heading ${level}`}
                  >
                    H{level}
                  </button>
                ))}
              </div>

              {/* List Buttons */}
              <div className="flex items-center gap-1 border-r border-gray-200 pr-3 mr-3">
                <button
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                  className={`p-2 rounded-md transition-colors ${
                    editor?.isActive('bulletList') 
                      ? 'bg-red-100 text-red-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                  className={`p-2 rounded-md transition-colors ${
                    editor?.isActive('orderedList') 
                      ? 'bg-red-100 text-red-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                  className={`p-2 rounded-md transition-colors ${
                    editor?.isActive('blockquote') 
                      ? 'bg-red-100 text-red-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Quote"
                >
                  <Quote className="w-4 h-4" />
                </button>
              </div>

              {/* Image Upload */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span className="text-sm">Image</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                    <input
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => document.getElementById("image-upload").click()}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Image
                    </button>
                    <button
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Save Button */}
              <div className="ml-auto">
                <button
                  onClick={handleSave}
                  disabled={saving || !title || !desc || !selectedCategory || !img}
                  className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Publish
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="px-6 py-3 bg-blue-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-blue-700">Uploading image...</span>
                    <span className="text-sm text-blue-600">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Status */}
          {saveStatus && (
            <div className={`px-6 py-3 border-b border-gray-200 ${
              saveStatus === 'success' ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <div className="flex items-center gap-2">
                {saveStatus === 'success' ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">Post published successfully! Redirecting...</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-700 font-medium">
                      Please fill in all required fields (title, content, category, and featured image)
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Editor */}
          <div className="min-h-[400px]">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Category Selection */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="" className="text-gray-500">
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            
            {img && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <div className="relative">
                  <img
                    src={img}
                    alt="Featured"
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => setImg("")}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
