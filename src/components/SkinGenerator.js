import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import ImageBox from './ImageBox';
import '../index.css';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';

const SkinGenerator = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState('');

    const connectWallet = async () => {
        const extensions = await web3Enable('refungible-marketplace');
        if (extensions.length === 0) {
            console.log('No extension installed');
            return;
        }
        const allAccounts = await web3Accounts();
        if (allAccounts.length > 0) {
            const selectedAddress = allAccounts[0].address;
            localStorage.setItem('address', selectedAddress);
        }
    };

    useEffect(() => {
        connectWallet();
    }, []);

    const handleInputChange = (event) => {
        setPrompt(event.target.value);
    };

    const generateSkin = async () => {
        if (!prompt) return;

        setIsLoading(true);
        setIsImageLoaded(false);

        try {
            const response = await axios.post('http://localhost:3001/generate-skin', { prompt });

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
            const response = await axios.post('http://localhost:3001/mint-nft', { imageData: localStorage.getItem("skinUrl"), address: localStorage.getItem("address") });

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

    const onApplyButton = () => {
        if (imageUrl) {
            const landingPageUrl = `http://localhost:8000/landing-page.html?skinUrl=${encodeURIComponent(imageUrl)}`;
            window.location.href = landingPageUrl;
        } else {
            console.error('No skinUrl found in localStorage');
        }
    };

    return (
        <div id="skin-generator" className="skin-generator">
            <div id="skin-preview-container" className="skin-preview-container">
                <h2>Skin Preview:</h2>
                <Loader visible={isLoading} />
                <ImageBox imageUrl={imageUrl} isImageLoaded={isImageLoaded} />
                <button id="mint-button" className="mint-button" style={{ display: isImageLoaded ? 'block' : 'none' }} onClick={mintNFT}>Mint now</button>
                <button id="mint-button" className="apply-button" style={{ display: isImageLoaded ? 'block' : 'none' }} onClick={onApplyButton}>Launch Game</button>
            </div>
            <div className="input-container">
                <input 
                    type="text" 
                    className="prompt-input" 
                    placeholder="Enter a description for the skin" 
                    value={prompt} 
                    onChange={handleInputChange} 
                />
                <button id="generate-skin" className="btn btn-primary generate-skin-button" onClick={generateSkin}>Generate</button>
            </div>
        </div>
    );
};

export default SkinGenerator;
