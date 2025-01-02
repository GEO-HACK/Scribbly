"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data, status } = useSession();
  const router = useRouter();

  const [value, setValue] = useState("");
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);

  const handleEditorChange = (content) => {
    setValue(content);
  };

  useEffect(() => {
    // Set the editor to load only on the client side
    setIsEditorLoaded(true);
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null; // Return null to prevent rendering of the page when redirecting
  }

  if (status === "authenticated" && isEditorLoaded) {
    return (
      <div className="p-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mt-5">
          <Editor
            value={value}
            onEditorChange={handleEditorChange}
            init={{
              height: 300,
              menubar: false,
              plugins: ['link', 'image', 'lists'],
              toolbar: 'undo redo | bold italic | link image | alignleft aligncenter alignright',
              branding: false, // Optional: Disable branding
            }}
          />
        </div>
      </div>
    );
  }

  return null; // Return null if not authenticated and editor is not loaded
};

export default Page;
