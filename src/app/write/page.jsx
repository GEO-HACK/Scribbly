"use client";

import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Page = () => {
  const [value, setValue] = useState("");

  const handleEditorChange = (content) => {
    setValue(content);
  };

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
};

export default Page;
