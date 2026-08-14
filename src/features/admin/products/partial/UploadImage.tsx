import { useState, useRef } from "react";
import { retrieveImageFromServer } from "../../../../utils/retrieveImageFromServer";
import type { File } from "buffer";

type UploadImageProps = {
  onFileSelect: (file: File | null) => void;
  formDataImage?: string | null;
};

export default function UploadImage({
  onFileSelect,
  formDataImage,
}: UploadImageProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageSrc = retrieveImageFromServer(formDataImage);

  const defaultPlaceholder =
    "https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg";

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {/* 1. Added overflow-hidden to the main card */}
      <div className="w-full max-w-xs rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 overflow-hidden">
        {/* 2. Added fixed height (h-48) and relative positioning */}
        <div className="relative h-48 w-full bg-slate-100 flex items-center justify-center overflow-hidden">
          <img
            src={imagePreview || imageSrc || defaultPlaceholder}
            /* 3. CRITICAL FIX: max-h-full max-w-full object-contain keeps it strictly inside */
            className="max-h-full max-w-full object-contain p-2 rounded-t-lg mx-auto"
            alt="Product Preview"
          />
        </div>

        <input
          type="file"
          ref={fileInputRef}
          name="image"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="p-6 flex justify-between gap-3">
          <button
            type="button"
            onClick={handleButtonClick}
            className="inline-block flex-1 rounded bg-primary px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 focus:outline-none"
          >
            {imagePreview ? "Change Image" : "Upload Image"}
          </button>

          {imagePreview && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="inline-block rounded bg-red-500 px-4 pb-2 pt-2.5 text-xs font-medium uppercase text-white hover:bg-red-600 transition duration-150 ease-in-out"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
