import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, CircularProgress, Button, Modal, TextField, Card, CardContent, CardActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Sdk, CHAIN_CONFIG } from '@unique-nft/sdk/full';
import { Sr25519Account } from '@unique-nft/sr25519';

const RFTsPage = () => {
  const { id: collectionId } = useParams(); // Use the correct parameter name
  const [rfts, setRfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    fetchRFTs();
  }, [collectionId]);

  const fetchRFTs = async () => {
    const mnemonicOwner = "impulse actress modify lazy country surface portion shrug cruise notice biology bar";
    const owner = Sr25519Account.fromUri(mnemonicOwner);
    const sdk = new Sdk({
      baseUrl: CHAIN_CONFIG.opal.restUrl,
      account: owner,
    });

    try {
      const rftsResult = await sdk.refungible.accountTokens({
        collectionId: parseInt(collectionId),
        address: owner.address,
      });
      setRfts(rftsResult.tokens);
      setError(null);
    } catch (err) {
      setError('An error occurred while fetching RFTs');
      setRfts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMintRFT = async () => {
    const mnemonicOwner = "impulse actress modify lazy country surface portion shrug cruise notice biology bar";
    const owner = Sr25519Account.fromUri(mnemonicOwner);
    const sdk = new Sdk({
      baseUrl: CHAIN_CONFIG.opal.restUrl,
      account: owner,
    });

    try {
      const mintRFTResult = await sdk.refungible.createToken({
        collectionId: parseInt(collectionId),
        amount: parseInt(quantity),
        data: {
          image: image, // Assuming image URL is in IPFS format
        },
      });
      console.log('RFT minted:', mintRFTResult);
      handleClose();
      await fetchRFTs(); // Refresh the RFTs list
      console.log("DOne")
    } catch (error) {
      console.error('Error minting RFT:', error);
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
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="h6">{error}</Typography>
        ) : (
          rfts.length > 0 ? (
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
              {rfts.map((rft) => (
                <Card key={rft.tokenId} variant="outlined" style={{ margin: '10px', width: '300px' }}>
                  <CardContent>
                    <Typography variant="h6">RFT ID: {rft.tokenId}</Typography>
                    <Typography color="textSecondary">Quantity: {rft.amount}</Typography>
                    {rft.data && rft.data.image && (
                      <img src={rft.data.image} alt={`RFT ${rft.tokenId}`} style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
                    )}
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => console.log('View details')}>
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography variant="h6">No RFTs found</Typography>
          )
        )}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          style={{ marginTop: '20px' }}
        >
          Mint
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="mint-rft-modal-title"
        aria-describedby="mint-rft-modal-description"
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
          <Typography id="mint-rft-modal-title" variant="h6" component="h2">
            Mint RFT
          </Typography>
          <TextField
            fullWidth
            label="Quantity"
            margin="normal"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <TextField
            fullWidth
            label="Image URL"
            margin="normal"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} style={{ marginRight: '10px' }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleMintRFT}>
              Mint
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default RFTsPage;
