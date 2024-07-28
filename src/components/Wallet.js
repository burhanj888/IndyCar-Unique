// src/components/Wallet.js
import React, { useEffect, useState } from 'react';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';

const Wallet = ({ setApi, setAddress }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      const extensions = await web3Enable('refungible-marketplace');
      if (extensions.length === 0) {
        console.log('No extension installed');
        return;
      }
      const allAccounts = await web3Accounts();
      setAccounts(allAccounts);
    };
    connectWallet();
  }, []);

  const handleAccountChange = async (event) => {
    const selectedAddress = event.target.value;
    setSelectedAccount(selectedAddress);
    setAddress(selectedAddress);

    const provider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider });
    setApi(api);
  };

  return (
    <div>
      <select onChange={handleAccountChange}>
        <option value="">Select Account</option>
        {accounts.map((account) => (
          <option key={account.address} value={account.address}>
            {account.meta.name} - {account.address}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Wallet;
