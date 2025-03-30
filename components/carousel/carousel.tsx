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

 const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
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
        <div className={styles.fullImageWrapper} onClick={handleCloseClick}>
          <div className={styles.fullImageContainer} onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="selected"
              className={styles.fullImage}
            />
            <div className={styles.closeButton} onClick={handleCloseClick}>
              X
            </div>
          </div>
        </div>
      )}
    </div>
 );
};

export default Carousel;
