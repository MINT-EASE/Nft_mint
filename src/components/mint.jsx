"use client"

import { useState } from 'react';
import { ethers } from 'ethers';
import { Web3ZKsyncL2, ZKsyncPlugin, getPaymasterParams } from 'zksync-web3-plugin';
import { Web3 } from "web3";

const Mint = () => {
  const [tokenURI, setTokenURI] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [minting, setMinting] = useState<boolean>(false);

  // Handles the minting process
  const mintNFT = async () => {
    setMinting(true);
    setMessage('');

    try {
     const web3 = new Web3("https://zksync-sepolia.g.alchemy.com/v2/qEmpdbwR0-Q8zlYviUFkX1d_B8b3RJq0");
     web3.registerPlugin(new ZKsyncPlugin("https://sepolia.era.zksync.dev"));

      // Connect wallet

      const privateKey = "45a71309065d92d987010d97253ab26b0406f338b8de46a9c4f267d305c5d1fa";
      const wallet = new web3.ZKsync.Wallet(privateKey); 

      // const [account] = await web3.eth.requestAccounts();
      const provider = new wallet.providers.web3(window.ethereum);
      const signer = provider.getSigner();

      

      // Initialize contract and wallet
      const nftContract = new web3.Contract(
        "0xabC65b88f568D3A5C1d7bACB78AF6277E15aA094", //contract address
        ["function mint(address to, string memory tokenURI) public"],
        signer
      );


      const paymasterParams = getPaymasterParams("0x13D0D8550769f59aa241a41897D4859c87f7Dd46", { //paymaster
        type: "ApprovalBased",
        token: "0x927488F48ffbc32112F1fF721759649A89721F8F", //approve token
        minimalAllowance: 1,
        innerInput: new Uint8Array(),
      });

      // Mint the NFT
      const tx = await nftContract.mint(account, tokenURI, { paymasterParams });
      await tx.wait();

      setMessage('Mint successful!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Gasless NFT Minting</h1>
        <p className="text-gray-600 mb-4">Mint your NFT without paying gas fees!</p>
        <input
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
          type="text"
          placeholder="Enter Token URI"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
        />
        <button
          onClick={mintNFT}
          disabled={!tokenURI || minting}
          className={`w-full p-3 text-white rounded-md ${minting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition duration-200`}
        >
          {minting ? 'Minting...' : 'Mint NFT'}
        </button>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default Mint;
