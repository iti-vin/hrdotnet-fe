import { useRef, useState } from "react";
import { IconCloudUpload, IconFileText, IconFileTypeDoc, IconX } from "@tabler/icons-react";
import { FileImageIcon } from "lucide-react";

const FileUploadButton = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const renderFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <FileImageIcon size={20} className="text-blue-400" />;
    }
    if (file.type === "application/pdf" || file.type.includes("word")) {
      return <IconFileText size={20} className="text-red-400" />;
    }
    return <IconFileTypeDoc size={20} className="text-gray-400" />;
  };

  const formatSize = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        className={`flex flex-col items-center justify-center border-2 border-dashed p-8 transition-all ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-[#ced4da] hover:bg-gray-50"
        } cursor-pointer`}>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        />

        <IconCloudUpload stroke={1.5} size={80} className="text-[#559cda]" />
        <h1 className="text-base font-medium">{isDragging ? "Drop files here" : "Click or drag to upload"}</h1>
        <p className="text-[#90979f] text-center text-sm mt-1">Supported: PDF, DOC, Image • Max 25 MB each</p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">File</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedFiles.map((file, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 flex items-center gap-2">
                    {renderFileIcon(file)}
                    <span className="break-all">{file.name}</span>
                  </td>
                  <td className="px-4 py-2">{formatSize(file.size)}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:underline flex items-center gap-1 text-sm">
                      <IconX size={16} /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileUploadButton;
