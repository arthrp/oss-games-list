import React, { useState } from 'react';

interface CarouselProps {
 images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
 const [selectedImage, setSelectedImage] = useState<string | null>(null);

 const handleImageClick = (image: string) => {
    setSelectedImage(image);
 };

 return (
    <div className="flex space-x-2 overflow-x-auto">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`carousel-${index}`}
          className="w-24 h-24 object-cover cursor-pointer"
          onClick={() => handleImageClick(image)}
        />
      ))}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <img
            src={selectedImage}
            alt="selected"
            className="w-full h-full object-contain"
            onClick={() => setSelectedImage(null)}
          />
        </div>
      )}
    </div>
 );
};

export default Carousel;
