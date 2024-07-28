import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import ImageBox from './ImageBox';
import '../index.css';

const SkinGenerator = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const generateSkin = async () => {
        const userPrompt = prompt("Enter a description for the skin:");
        if (!userPrompt) return;

        setIsLoading(true);
        setIsImageLoaded(false);

        try {
            const response = await axios.post('http://localhost:3001/generate-skin', { prompt: userPrompt });

            if (response.status === 200) {
                const data = response.data;
                setImageUrl(data.imageUrl);
                localStorage.setItem("skinUrl", data.imageUrl);
                setIsImageLoaded(true);
            } else {
                console.error('Error generating skin:', response.statusText);
            }
        } catch (error) {
            console.error('Error generating skin:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const mintNFT = async () => {
        if (!imageUrl) return;

        try {
            const response = await axios.post('http://localhost:3001/mint-nft', { imageData: localStorage.getItem("skinUrl") });

            if (response.status === 200) {
                const result = response.data;
                alert(`NFT minted with ID: ${result.tokenId}`);
            } else {
                console.error('Error minting NFT:', response.statusText);
            }
        } catch (error) {
            console.error('Error minting NFT:', error);
        }
    };

    return (
        <div id="skin-generator">
            <button id="generate-skin" className="btn btn-primary" onClick={generateSkin}>Generate Skin</button>
            <div id="skin-preview-container">
                <h2>Skin Preview:</h2>
                <ImageBox imageUrl={imageUrl} onMint={mintNFT} isImageLoaded={isImageLoaded} />
                <Loader visible={isLoading} />
            </div>
        </div>
    );
};

export default SkinGenerator;
