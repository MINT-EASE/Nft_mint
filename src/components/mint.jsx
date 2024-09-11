"use client";

import React, { useState, useRef } from "react";
import Web3 from "web3";
import { pinata } from "@/utils/config"; // Assuming Pinata setup is in config
import ABI from "@/scripts/abi.mjs";
import Image from "next/image";

const MintNFT = () => {
  const [account, setAccount] = useState(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [minting, setMinting] = useState(false);
  const [message, setMessage] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [address, setAddress] = useState("");
  const [uploading, setUploading] = useState(false);
  const [mintMessage, setMintMessage] = useState('');

  const inputFile = useRef(null);

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      console.log("MetaMask not found");
    }
  };

  // Upload file to Pinata
   const uploadFile = async () => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      console.log( "signed url",signedUrl);
      setUrl(signedUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  // const handleFileUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(URL.createObjectURL(file));
  //     setFile(file);
  //     await uploadFile(); // Store file on IPFS and set tokenURI
  //   }
  // };

  // Mint the NFT using MetaMask
  const handleMint = async () => {
    //  if (!url || !address) {
    //   alert('Please provide the URL and address');
    //   return;
    // }

    // setMinting(true);
    // setMintMessage('')

    try {
      const web3 = new Web3(window.ethereum); // Use MetaMask provider
      const contractAddress = "0x31d829BE8be3EfAfC7F7C1aDB482278f4B9Fa582"; // Your deployed MyNFT contract address
      const nftContract = new web3.eth.Contract(ABI, contractAddress);

      console.log("nft contract",nftContract);

      // Mint the NFT
      const mintTx = await nftContract.methods.mint(account, tokenURI).send({
        from: account,
      });

      setMessage("Mint successful!");
      console.log("Transaction hash:", mintTx.transactionHash); // You can check this on the blockchain explorer
    } catch (error) {
      console.error("Error minting NFT:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mint Your NFT</h1>

      {/* Connect Wallet */}
      {/* <button onClick={connectWallet} className="mb-4 p-2 bg-blue-500 text-white">
        {account ? `Connected: ${account}` : "Connect Wallet"}
      </button> */}

      {/* Upload Image */}
      {!tokenURI && (
        <>
          <input type="file" ref={inputFile} onChange={handleChange} />
          <button disabled={uploading} onClick={uploadFile}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}

      {image && !tokenURI && (
        <Image src={image} alt="NFT Preview" className="mt-4" width={200} height={200} />
      )}

      {/* Mint Form */}
      {url && (
        <div>
          <h2 className="text-xl font-semibold mt-4">Mint Form</h2>
          <input
            type="text"
            placeholder="Recipient Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 p-2 border border-gray-300"
          />
          <button
            onClick={handleMint}
            disabled={minting}
            className="mt-4 p-2 bg-green-500 text-white"
          >
            {minting ? 'Minting...' : 'Mint NFT'}
          </button>
          {mintMessage && <p className="mt-4 text-red-500">{mintMessage}</p>}
        </div>
      )}

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default MintNFT;





























// "use client";

// import React, { useState, useRef } from "react";
// import { Web3 } from "web3";
// // import { ZKsyncPlugin, getPaymasterParams } from "web3-plugin-zksync";
// // import { create } from "ipfs-http-client"; // For IPFS
// import ABI from "@/scripts/abi.mjs";
// import Image from "next/image";

// // const client = create("https://ipfs.infura.io:5001/api/v0"); // IPFS endpoint

// const MintNFT = () => {
//   const [account, setAccount] = useState(null);
//   const [tokenURI, setTokenURI] = useState("");
//   const [image, setImage] = useState(null);
//   const [minting, setMinting] = useState(false);
//   const [message, setMessage] = useState("");
//     const [file, setFile] = useState("");
//   const [url, setUrl] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const inputFile = useRef(null);

//   // Connect to MetaMask
//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         setAccount(accounts[0]);
//       } catch (error) {
//         console.error("Failed to connect wallet:", error);
//       }
//     } else {
//       console.log("MetaMask not found");
//     }
//   };

//   // Upload image to IPFS
//   // const uploadToIPFS = async (file) => {
//   //   try {
//   //     const added = await client.add(file);
//   //     const uri = `https://ipfs.infura.io/ipfs/${added.path}`;
//   //     setTokenURI(uri);
//   //   } catch (error) {
//   //     console.error("Error uploading file:", error);
//   //   }
//   // };


// 	const uploadFile = async () => {
// 		try {
// 			setUploading(true);
// 			const keyRequest = await fetch("/api/key", {
// 				method: "GET",
// 			});
// 			const keyData = await keyRequest.json();
// 			const upload = await pinata.upload.file(file).key(keyData.JWT);
// 			const urlReuest = await fetch("/api/sign", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({ cid: upload.cid }),
// 			});
// 			const url = await urlReuest.json();
// 			setUrl(url);
// 			setUploading(false);
// 		} catch (e) {
// 			console.log(e);
// 			setUploading(false);
// 			alert("Trouble uploading file");
// 		}
// 	};

// 	const handleChange = (e) => {
// 		setFile(e.target.files[0]);
// 	};

//   // Handle file upload
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//       await uploadToIPFS(file); // Store file on IPFS and set tokenURI
//     }
//   };

//   // Mint the NFT with Paymaster
//   const mintNFT = async () => {
//     if (!account || !tokenURI) {
//       setMessage("Please connect wallet and upload an image");
//       return;
//     }

//     setMinting(true);
//     setMessage("");

//     try {
//       const web3 = new Web3(window.ethereum); // Use MetaMask provider
//       web3.registerPlugin(new ZKsyncPlugin("https://sepolia.era.zksync.dev"));

//       // Get the contract instance
//       const contractAddress = "0x31d829BE8be3EfAfC7F7C1aDB482278f4B9Fa582"; // Your deployed MyNFT contract address
//       const nftContract = new web3.ZKsync.Contract(contractAddress, ABI, account);

//       // Paymaster settings
//       const paymasterParams = getPaymasterParams("0x13D0D8550769f59aa241a41897D4859c87f7Dd46", {
//         type: "ApprovalBased",
//         token: "0xYourERC20TokenAddress", // The token the Paymaster is allowed to use for gas fees
//         minimalAllowance: 1,
//         innerInput: new Uint8Array(),
//       });

//       // Mint the NFT using Paymaster
//       const mintTx = await nftContract.methods.mint(account, tokenURI).send({
//         from: account,
//         gas: 0, // User is not paying gas
//         paymasterParams, // Paymaster covers the gas fee
//       });

//       setMessage("Mint successful!");
//       console.log("Transaction hash:", mintTx.transactionHash); // You can check this on zkSync Explorer
//     } catch (error) {
//       console.error("Error minting NFT:", error);
//       setMessage(`Error: ${error.message}`);
//     } finally {
//       setMinting(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Mint Your NFT on zkSync</h1>

//       {/* Connect Wallet */}
//       <button onClick={connectWallet} className="mb-4 p-2 bg-blue-500 text-white">
//         {account ? `Connected: ${account}` : "Connect Wallet"}
//       </button>

//       {/* Upload Image */}
//       <input type="file" onChange={handleFileUpload} />

//       {image && (
//         <Image
//           src={image}
//           alt="NFT Preview"
//           className="mt-4"
//           width={200}
//           height={200}
//         />
//       )}

//       {/* Mint Button */}
//       <button
//         onClick={mintNFT}
//         disabled={!tokenURI || minting}
//         className="mt-4 p-2 bg-green-500 text-white"
//       >
//         {minting ? "Minting..." : "Mint NFT"}
//       </button>

//       <input type="file" id="file" ref={inputFile} onChange={handleChange} />
//       <button disabled={uploading} onClick={uploadFile}>
//         {uploading ? "Uploading..." : "Upload"}
//       </button>

//       {message && <p className="mt-4 text-red-500">{message}</p>}
//     </div>
//   );
// };

// export default MintNFT;











// "use client"


// import React, { useState, useEffect } from 'react';
// import { Web3 } from 'web3';
// import { ZKsyncPlugin, getPaymasterParams } from 'web3-plugin-zksync';
// // import { create } from 'ipfs-http-client'; // For IPFS
// // import { Web3ZKsyncL2, ZKsyncPlugin, getPaymasterParams } from 'zksync-web3-plugin';
// import ABI from '@/scripts/abi.mjs';
// import Image from 'next/image';

// // const client = create('https://ipfs.infura.io:5001/api/v0'); // IPFS endpoint

// const MintNFT = () => {
//   const [account, setAccount] = useState(null);
//   const [tokenURI, setTokenURI] = useState('');
//   const [image, setImage] = useState(null);
//   const [minting, setMinting] = useState(false);
//   const [message, setMessage] = useState('');

//   // Connect to MetaMask
//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         setAccount(accounts[0]);
//       } catch (error) {
//         console.error("Failed to connect wallet:", error);
//       }
//     } else {
//       console.log("MetaMask not found");
//     }
//   };

//   // Upload image to IPFS
//   // const uploadToIPFS = async (file) => {
//   //   try {
//   //     const added = await client.add(file);
//   //     const uri = `https://ipfs.infura.io/ipfs/${added.path}`;
//   //     setTokenURI(uri);
//   //   } catch (error) {
//   //     console.error('Error uploading file:', error);
//   //   }
//   // };

//   // Handle file upload
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//       await uploadToIPFS(file); // Store file on IPFS and set tokenURI
//     }
//   };

//   // Mint the NFT with Paymaster
//   const mintNFT = async () => {
//     if (!account || !tokenURI) {
//       setMessage('Please connect wallet and upload an image');
//       return;
//     }

//     setMinting(true);
//     setMessage('');

//     try {
//       const privateKey = "45a71309065d92d987010d97253ab26b0406f338b8de46a9c4f267d305c5d1fa"; // Use private key securely
//       const web3 = new Web3("https://zksync-sepolia.g.alchemy.com/v2/qEmpdbwR0-Q8zlYviUFkX1d_B8b3RJq0");
//       web3.registerPlugin(new ZKsyncPlugin("https://sepolia.era.zksync.dev"));

//       // Initialize zkSync wallet
//       const wallet = new web3.ZKsync.Wallet(privateKey);

//       // Get the contract instance
//       const contractAddress = "0x31d829BE8be3EfAfC7F7C1aDB482278f4B9Fa582"; // MyNFT contract address
//       const nftContract = new web3.ZKsync.Contract(contractAddress, contractABI, wallet);

//       // Paymaster settings
//       const paymasterParams = getPaymasterParams("0x13D0D8550769f59aa241a41897D4859c87f7Dd46", {
//         type: "ApprovalBased",
//         token: "0xYourERC20TokenAddress", // The token the Paymaster is allowed to use for gas fees
//         minimalAllowance: 1,
//         innerInput: new Uint8Array(),
//       });

//       // Mint the NFT using Paymaster
//       const mintTx = await nftContract.methods.mint(account, tokenURI).send({
//         from: account,
//         paymasterParams,
//       });

//       setMessage('Mint successful!');
//     } catch (error) {
//       console.error('Error minting NFT:', error);
//       setMessage(`Error: ${error.message}`);
//     } finally {
//       setMinting(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Mint Your NFT on zkSync</h1>
      
//       {/* Connect Wallet */}
//       <button onClick={connectWallet} className="mb-4 p-2 bg-blue-500 text-white">
//         {account ? `Connected: ${account}` : 'Connect Wallet'}
//       </button>
      
//       {/* Upload Image */}
//       <input type="file" onChange={handleFileUpload} />
      
//       {image && <Image src={image} alt="NFT Preview" className="mt-4" width={200} height={200}/>}
      
//       {/* Mint Button */}
//       <button
//         onClick={mintNFT}
//         disabled={!tokenURI || minting}
//         className="mt-4 p-2 bg-green-500 text-white"
//       >
//         {minting ? 'Minting...' : 'Mint NFT'}
//       </button>
      
//       {message && <p className="mt-4 text-red-500">{message}</p>}
//     </div>
//   );
// };

// export default MintNFT;



