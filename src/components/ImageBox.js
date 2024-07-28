import React from 'react';
import '../index.css';

const ImageBox = ({ imageUrl, onMint, isImageLoaded }) => (
    <div className="image-box">
        <img id="skin-image" src={imageUrl} alt="Generated Skin" style={{ display: isImageLoaded ? 'block' : 'none' }} />
        <button id="mint-button" className="mint-button" style={{ display: isImageLoaded ? 'block' : 'none' }} onClick={onMint}>Mint now</button>
        <div className="next-arrow">&rarr;</div>
    </div>
);

export default ImageBox;
