import React from 'react';
import '../index.css';

const ImageBox = ({ imageUrl,  isImageLoaded }) => (
    <div className="image-box">
        <img id="skin-image" src={imageUrl} alt="Generated Skin" style={{ display: isImageLoaded ? 'block' : 'none' }} />
    </div>
);

export default ImageBox;
