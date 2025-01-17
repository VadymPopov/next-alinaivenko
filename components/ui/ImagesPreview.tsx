import React from 'react';
import { MdClose } from 'react-icons/md';

import Image from 'next/image';

interface ImagesPreviewProps {
  selectedFiles: File[];
  handleDelete: (_index: number) => void;
}

export default function ImagesPreview({
  selectedFiles,
  handleDelete,
}: ImagesPreviewProps) {
  return (
    <div className="flex justify-center mb-5">
      <ul className="grid  grid-cols-2 sm:grid-cols-3 gap-4">
        {selectedFiles?.map((file, index) => (
          <li
            key={index}
            className="relative flex flex-col justify-center items-center"
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              width={100}
              height={100}
              className="border-mainDarkColor rounded-xl object-cover mb-2 h-[100px]"
            />
            <button
              type="button"
              className="absolute top-2 right-2"
              onClick={() => handleDelete(index)}
            >
              <div className="bg-accentColor rounded-full">
                <MdClose className="text-lg text-mainDarkColor" />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
