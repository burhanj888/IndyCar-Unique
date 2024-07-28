// src/components/GlobalHeader.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import PolkadotIcon from '@mui/icons-material/AccountBalanceWallet';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';

const GlobalHeader = ({ setApi, setAddress }) => {
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const storedAddress = localStorage.getItem('address');
    if (storedAddress) {
      setAddress(storedAddress);
      setWalletConnected(true);
    }
  }, [setAddress]);

  const connectWallet = async () => {
    const extensions = await web3Enable('refungible-marketplace');
    if (extensions.length === 0) {
      console.log('No extension installed');
      return;
    }
    const allAccounts = await web3Accounts();
    if (allAccounts.length > 0) {
      const selectedAddress = allAccounts[0].address;
      setAddress(selectedAddress);
      localStorage.setItem('address', selectedAddress);
      setWalletConnected(true);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to={'/'}>
            
          Refungible Token Marketplace
          </Link>
        </Typography>
        <Button
          color="inherit"
          onClick={connectWallet}
        //   startIcon={<PolkadotIcon />}
        >
          {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default GlobalHeader;
