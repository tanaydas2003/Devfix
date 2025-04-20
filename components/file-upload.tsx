"use client";

import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { FileIcon, X } from "lucide-react";
import "@uploadthing/react/styles.css";
import { useState } from "react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const [uploadName, setUploadName] = useState<string>("");
  const fileType = uploadName?.split(".").pop()?.toLowerCase();
  const imageTypes = ["jpg", "jpeg", "png", "gif", "webp"];

  // Check if the file is an image
  const isImage = value && fileType && imageTypes.includes(fileType);
  const isPdf = value && fileType === "pdf";

  // Function to truncate long URLs
  function truncateString(str: string) {
    if (str.length > 40) {
      return str.substring(0, 40) + "...";
    }
    return str;
  }

  // Render image preview
  if (value && isImage) {
    return (
      <div className="relative h-20 w-20 mx-auto">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full object-cover"
          onError={() => {
            console.error("Failed to load image:", value);
            onChange(""); // Clear invalid image
            setUploadName(""); // Clear file name
          }}
        />
        <button
          onClick={() => {
            onChange("");
            setUploadName("");
          }}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // Render PDF preview
  if (value && isPdf) {
    return (
      <div className="relative h-20 w-20 mx-auto">
        <div className="flex items-center justify-center h-full w-full bg-indigo-100 rounded-full">
          <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        </div>
        <button
          onClick={() => {
            onChange("");
            setUploadName("");
          }}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // Render UploadDropzone for file upload
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("Upload complete:", res);
        onChange(res?.[0]?.url);
        setUploadName(res?.[0]?.name || "");
      }}
      onUploadError={(error: Error) => {
        console.error("Upload error:", error);
      }}
      className="cursor-pointer hover:bg-gray-100"
    />
  );
};