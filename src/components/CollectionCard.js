// src/components/CollectionCard.js
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CollectionCard = ({ collection }) => {
  const history = useNavigate();

  const viewRFTs = () => {
    history(`/rfts/${collection.id}`);
  };

  return (
    <Card variant="outlined" style={{ margin: '10px', maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {collection.name}
        </Typography>
        <Typography color="textSecondary">
          ID: {collection.id}
        </Typography>
        <Typography color="textSecondary">
          Mode: {collection.mode}
        </Typography>
        <Typography color="textSecondary">
          Owner: {collection.owner}
        </Typography>
        <Typography color="textSecondary">
          Description: {collection.description}
        </Typography>
        <Typography color="textSecondary">
          Token Prefix: {collection.tokenPrefix}
        </Typography>
        <Typography color="textSecondary">
          Decimals: {collection.decimals}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={viewRFTs}
          style={{ marginTop: '10px' }}
        >
          View RFTs
        </Button>
      </CardContent>
    </Card>
  );
};

export default CollectionCard;
