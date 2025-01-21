import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onImagesUploaded: (images: File[]) => void;
  existingImages?: string[];
}

export const ImageUpload = ({
  onImagesUploaded,
  existingImages = [],
}: ImageUploadProps) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(existingImages);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setUploadedImages((prev) => [...prev, ...acceptedFiles]);
      setPreviewUrls((prev) => [
        ...prev,
        ...acceptedFiles.map((file) => URL.createObjectURL(file)),
      ]);
      onImagesUploaded(acceptedFiles);
    },
    [onImagesUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the images here ...</p>
        ) : (
          <p>Drag 'n' drop some images here, or click to select images</p>
        )}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative">
            <Image
              src={url || "/placeholder.svg"}
              alt={`Uploaded image ${index + 1}`}
              width={200}
              height={200}
              className="object-cover rounded-md"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
