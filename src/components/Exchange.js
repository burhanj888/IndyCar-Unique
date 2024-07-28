import React, { useEffect, useState } from 'react';
import Wallet from './Wallet';
import Header from './Header';
import Sdk from "@unique-nft/sdk";

const Exchange = () => {
  const [api, setApi] = useState(null);
  const [address, setAddress] = useState(null);
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState(null);
  const sdk = new Sdk({ baseUrl: 'https://rest.unique.network/opal' });

  useEffect(() => {
    if (api && address) {
      fetchCollections();
    }
  }, [api, address]);

  const fetchCollections = async () => {
    try {
      const collection = await sdk.collection.get({ collectionId: 1 });
      setCollections(collection);
      setError(null); // Clear any previous errors
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('No collection minted yet');
      } else {
        setError('An error occurred while fetching collections');
      }
      setCollections([]);
    }
  };

  const createCollection = async () => {
    // Add your create collection logic here
  };

  return (
    <div>
      {/* <Wallet setApi={setApi} setAddress={setAddress} /> */}
      <Header collections={collections} onCreateCollection={createCollection} />
      {error ? <p>{error}</p> : (
        collections.length > 0 ? (
          <div>
            {/* Render your collections here */}
          </div>
        ) : (
          <p>No collection minted yet</p>
        )
      )}
    </div>
  );
};

export default Exchange;
