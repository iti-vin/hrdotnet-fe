import React, { useRef, useState } from "react";
import { IconCloudUpload, IconFileTypeDoc, IconFileTypeDocx, IconFileTypeJpg, IconFileTypePdf, IconFileTypePng, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface FileAttachmentProps {
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  onChange?: (files: File[]) => void;
  initialFiles?: File[];
  required?: boolean;
  lz?: "xs" | "sm" | "md" | "lg" | "xl";
  label?: string;
}

const labelSizes: Record<string, string> = {
  xs: "text-[0.78rem]",
  sm: "text-[0.84rem]",
  md: "text-[0.94rem]",
  lg: "text-[1rem]",
  xl: "text-[1.05rem]",
};

export default function FileAttachment({
  multiple = true,
  maxFiles = 10,
  accept = ".pdf,.doc,.docx,.png,.jpg,.jpeg",
  onChange,
  initialFiles = [],
  required,
  lz = "xs",
  label,
}: FileAttachmentProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>(initialFiles);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const addUniqueFiles = (incoming: File[]) => {
    setSelectedFiles((prev) => {
      const existingKeys = new Set(prev.map((f) => f.name + f.size));
      const filtered = incoming.filter((f) => !existingKeys.has(f.name + f.size));
      const combined = [...prev, ...filtered];
      onChange?.(combined.slice(0, maxFiles));

      return combined.slice(0, maxFiles);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      if (!multiple) {
        addUniqueFiles(filesArray.slice(0, 1));
      } else {
        addUniqueFiles(filesArray);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const filesArray = Array.from(e.dataTransfer.files);
    if (!multiple) {
      addUniqueFiles(filesArray.slice(0, 1));
    } else {
      addUniqueFiles(filesArray);
    }
  };

  const renderFileIcon = (file: File) => {
    if (file.type.startsWith("image/png")) {
      return <IconFileTypePng size={35} className="text-gray-600" />;
    }
    if (file.type.startsWith("image/jpeg") || file.type.startsWith("image/jpg")) {
      return <IconFileTypeJpg size={35} className="text-gray-600" />;
    }
    if (file.type === "application/pdf") {
      return <IconFileTypePdf size={35} className="text-gray-600" />;
    }
    if (file.type.includes("word")) {
      return <IconFileTypeDocx size={35} className="text-gray-600" />;
    }
    return <IconFileTypeDoc size={35} className="text-gray-400" />;
  };

  const formatSize = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

  const labelBaseClass = "font-medium text-[#6d6d6d] flex flex-row gap-1";

  return (
    <div className="w-full">
      {/* Input File Area */}
      <input type="file" multiple={multiple} accept={accept} ref={fileInputRef} className="absolute w-0 h-0 opacity-0" onChange={handleFileChange} />

      {/* Label */}
      <div className={cn(labelBaseClass, labelSizes[lz])}>
        {label} {required && <p className="text-red-500">*</p>}
      </div>

      {/* Drag and Drop Area if the Length is Higher than 0 */}
      {selectedFiles.length > 0 && selectedFiles.length < maxFiles && (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          className={`mb-6 flex flex-col items-center justify-center border-2 border-dashed p-2 transition-all cursor-pointer ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-[#ced4da] hover:bg-gray-50"
          }`}>
          <IconCloudUpload stroke={1.5} size={80} className="text-[#559cda]" />
          <h1 className="text-base font-medium">{isDragging ? "Drop files here" : "Click or drag to upload"}</h1>
          <div className="text-[#90979f] text-center text-sm mt-1">
            Supported: {accept.replace(/\./g, "")} • Selected files {selectedFiles.length} out of {maxFiles}
          </div>
        </div>
      )}

      {selectedFiles.length > 0 ? (
        <div className="flex flex-col gap-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex flex-row justify-between border-[1px] items-start px-2 rounded-md bg-white">
              <div className="p-2 flex items-center gap-2 w-25">
                {renderFileIcon(file)}
                <div className="flex flex-col gap-1 items-start w-auto">
                  <div className="break-all text-sm">{file.name}</div>
                  <div className="text-center text-xs">{formatSize(file.size)}</div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-full p-0.5 mt-2 hover:scale-110">
                <button onClick={() => handleRemoveFile(index)} className="text-gray-500 hover:underline flex items-center gap-1 text-sm" type="button">
                  <IconX size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          className={`flex flex-col items-center justify-center border-2 border-dashed p-8 transition-all cursor-pointer ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-[#ced4da] hover:bg-gray-50"
          }`}>
          <IconCloudUpload stroke={1.5} size={80} className="text-[#559cda]" />
          <h1 className="text-base font-medium">{isDragging ? "Drop files here" : "Click or drag to upload"}</h1>
          <div className="text-[#90979f] text-center text-sm mt-1">
            Supported: {accept.replace(/\./g, "")} • Max {maxFiles} file{maxFiles > 1 ? "s" : ""}
          </div>
        </div>
      )}
    </div>
  );
}
