import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Ensure this is imported if you have global styles here

const CollectionCard = ({ collection }) => {
  const history = useNavigate();

  const viewRFTs = () => {
    history(`/rfts/${collection.id}`);
  };

  return (
    <Card className="collection-card">
      <CardContent>
        <Typography variant="h6" component="div" className="collection-name">
          {collection.name}
        </Typography>
        <Typography color="textSecondary" className="collection-info">
          ID: {collection.id}
        </Typography>
        <Typography color="textSecondary" className="collection-info">
          Mode: {collection.mode}
        </Typography>
        <Typography color="textSecondary" className="collection-info">
          Owner: {collection.owner}
        </Typography>
        <Typography color="textSecondary" className="collection-info">
          Description: {collection.description}
        </Typography>
        <Typography color="textSecondary" className="collection-info">
          Token Prefix: {collection.tokenPrefix}
        </Typography>
        <Typography color="textSecondary" className="collection-info">
          Decimals: {collection.decimals}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={viewRFTs}
          className="view-rfts-button"
        >
          View RFTs
        </Button>
      </CardContent>
    </Card>
  );
};

export default CollectionCard;
