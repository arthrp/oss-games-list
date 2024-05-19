import React, { useState } from 'react';
import styles from './carousel.module.css';

interface CarouselProps {
 images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
 const [selectedImage, setSelectedImage] = useState<string | null>(null);

 const handleImageClick = (image: string) => {
    setSelectedImage(image);
 };

 return (
    <div className={styles.wrapper}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`carousel-${index}`}
          className={styles.imagePreview}
          onClick={() => handleImageClick(image)}
        />
      ))}
      {selectedImage && (
        <div className={styles.fullImageWrapper}>
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
