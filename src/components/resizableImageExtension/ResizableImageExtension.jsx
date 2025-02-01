import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import { useState, useRef } from "react";

const ResizableImage = (props) => {
  const { node, updateAttributes } = props;
  const [width, setWidth] = useState(node.attrs.width || "300px");
  const imgRef = useRef(null);

  // Handle Mouse Drag to Resize
  const onResize = (event) => {
    if (!imgRef.current) return;
    const newWidth = event.clientX - imgRef.current.getBoundingClientRect().left;
    setWidth(`${newWidth}px`);
    updateAttributes({ width: newWidth });
  };

  return (
    <NodeViewWrapper as="div" className="relative inline-block">
      <img
        ref={imgRef}
        src={node.attrs.src}
        alt={node.attrs.alt}
        width={width}
        className="rounded shadow"
      />
      {/* Resizer Handle */}
      <div
        className="absolute right-0 bottom-0 w-4 h-4 bg-gray-400 cursor-se-resize"
        onMouseDown={(event) => {
          event.preventDefault();
          document.addEventListener("mousemove", onResize);
          document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onResize);
          });
        }}
      ></div>
    </NodeViewWrapper>
  );
};

// Custom TipTap Extension for Resizable Images
const ResizableImageExtension = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "300px",
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) => ({ width: attributes.width }),
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImage);
  },
});

export default ResizableImageExtension;
