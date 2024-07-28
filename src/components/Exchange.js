import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Box, Button, Typography, Modal, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Sdk, CHAIN_CONFIG } from '@unique-nft/sdk/full';
import { Sr25519Account } from '@unique-nft/sr25519';
import CollectionCard from './CollectionCard';

const Exchange = ({ api, address }) => {
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [newCollectionTokenPrefix, setNewCollectionTokenPrefix] = useState('');

  useEffect(() => {
    const storedAddress = localStorage.getItem('address');
    if (storedAddress) {
      setOwnerFromLocalStorage(storedAddress);
    } else {
      alert('Please connect your wallet');
    }
  }, []);

  const setOwnerFromLocalStorage = (storedAddress) => {
    
    
    fetchCollections();
  };

  const fetchCollections = async () => {
    const mnemonicOwner = "impulse actress modify lazy country surface portion shrug cruise notice biology bar";
    const owner = Sr25519Account.fromUri(mnemonicOwner);
    const sdk = new Sdk({
        baseUrl: CHAIN_CONFIG.opal.restUrl,
        account: owner,
      });
    try {
      const collection = await sdk.refungible.getCollection({ collectionId: 3335 });
      setCollections([collection]); // Wrapping the collection in an array
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('No collection minted yet');
      } else {
        setError('An error occurred while fetching collections');
      }
      setCollections([]);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateCollection = async () => {
    const mnemonicOwner = "impulse actress modify lazy country surface portion shrug cruise notice biology bar";
    const owner = Sr25519Account.fromUri(mnemonicOwner);
    const sdk = new Sdk({
      baseUrl: CHAIN_CONFIG.opal.restUrl,
      account: owner,
    });

    try {
      const rftCollectionTxResult = await sdk.refungible.createCollection({
        mode: 'ReFungible',
        name: newCollectionName,
        description: newCollectionDescription,
        tokenPrefix: newCollectionTokenPrefix,
      });
      console.log('Collection created:', rftCollectionTxResult);
      handleClose();
      fetchCollections(sdk); // Refresh the collections list
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        {error ? (
          <Typography variant="h6">{error}</Typography>
        ) : (
          collections.length > 0 ? (
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
              {collections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </Box>
          ) : (
            <Typography variant="h6">No collection minted yet</Typography>
          )
        )}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          style={{ marginTop: '20px' }}
        >
          Create New Collection
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-collection-modal-title"
        aria-describedby="create-collection-modal-description"
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bgcolor="background.paper"
          p={4}
          borderRadius={2}
          boxShadow={24}
          width={400}
        >
          <Typography id="create-collection-modal-title" variant="h6" component="h2">
            Create New Collection
          </Typography>
          <TextField
            fullWidth
            label="Collection Name"
            margin="normal"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Collection Description"
            margin="normal"
            value={newCollectionDescription}
            onChange={(e) => setNewCollectionDescription(e.target.value)}
          />
          <TextField
            fullWidth
            label="Token Prefix"
            margin="normal"
            value={newCollectionTokenPrefix}
            onChange={(e) => setNewCollectionTokenPrefix(e.target.value)}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} style={{ marginRight: '10px' }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleCreateCollection}>
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Exchange;
