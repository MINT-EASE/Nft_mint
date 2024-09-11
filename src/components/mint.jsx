"use client";

import UsePaymaster from "../hooks/Paymaster"; // Import the Paymaster hook
import ABI from "@/scripts/abi.mjs";
import BYTECODE from "@/scripts/bytecode.mjs";
import Web3 from "web3";
// import { ZKsyncPlugin, getPaymasterParams } from "web3-plugin-zksync";
import {ethers} from "ethers"
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ZKsyncPlugin, getPaymasterParams ,ContractFactory,} from "web3-plugin-zksync"
import { MdOutlineFileUpload } from "react-icons/md";


const MintNFT = () => {
  const [account, setAccount] = useState(null);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [minting, setMinting] = useState(false);
  const [mintMessage, setMintMessage] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [address, setAddress] = useState("");
  const [uploading, setUploading] = useState(false);
  const [gasParams, setGasParams] = useState(null); // Add a state for gasParams
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

  // Upload file to Pinata or IPFS
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
      setUrl(signedUrl);
      setUploading(false);
    } catch (e) {
      console.error(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Move the usePaymaster hook call here and get the gasParams
  useEffect(() => {
    const getGasParams = async () => {
      if (url) {
        try {
          const web3 = new Web3(window.ethereum); // Use MetaMask provider
          const zksync = web3.ZKsync;
          const PRIVATE_KEY = "0x45a71309065d92d987010d97253ab26b0406f338b8de46a9c4f267d305c5d1fa";
          const wallet = new zksync.Wallet(PRIVATE_KEY);

          const contractAddress = "0xD9a7B146ec05E2cd6680088DaBaD7121EBf57624";
          const nftContract = new ethers.Contract(contractAddress, ABI, wallet);

          const gasData = await UsePaymaster({
            nftInstance: nftContract,
            url: `ipfs://${url}`,
            price: "0.01",
          });

          setGasParams(gasData); // Store the gas params in state
        } catch (error) {
          console.error("Error fetching gas params:", error);
        }
      }
    };

    getGasParams();
  }, [url]); // Only run when URL is available

  // Mint the NFT using Paymaster for gas fees
  const handleMint = async () => {
    try {
      setMinting(true);

      const web3 = new Web3(window.ethereum); // Use MetaMask provider
      web3.registerPlugin(new ZKsyncPlugin("https://sepolia.era.zksync.dev"));

      const zksync = web3.ZKsync;
      const PRIVATE_KEY = "0x45a71309065d92d987010d97253ab26b0406f338b8de46a9c4f267d305c5d1fa"; // Replace with your private key
      const wallet = new zksync.Wallet(PRIVATE_KEY);

      const contractAddress = "0xD9a7B146ec05E2cd6680088DaBaD7121EBf57624"; // Your deployed NFT contract address
      const nftContract = new ethers.Contract(contractAddress, ABI, wallet);

      const fileUrl = `ipfs://${url}`; // Assuming the file is uploaded to Pinata/IPFS

      // Ensure gasParams are available before proceeding
      if (!gasParams) {
        console.error("No gas params available");
        return;
      }

      // Mint the NFT, using Paymaster to cover gas fees
      const mintTx = await nftContract.mint(account, fileUrl, {
        ...gasParams, // Pass gas estimates and Paymaster custom data
        from: account, // User's MetaMask account
      });

      setMintMessage("Mint successful!");
      console.log("Transaction hash:", mintTx.hash);
    } catch (error) {
      console.error("Error minting NFT:", error);
      setMintMessage(`Error: ${error.message}`);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mint Your NFT</h1>

      {!tokenURI && (
        <div className="flex justify-center">
          {/* <input type="file" ref={inputFile} onChange={handleChange} />
          <button disabled={uploading} onClick={uploadFile}>
            {uploading ? "Uploading..." : "Upload"}
          </button> */}

          <div
            className='mb-8 p-8 w-[354px] h-[188px] border-dotted border-2 border-white flex flex-col justify-center items-center' 
        >
            <p
                className='text-xs font-bold mb-4'
            >
              PNG, WEBP. Max 2mb 
            </p>

            <label
                htmlFor='imageUpload'
                className='cursor-pointer text-base font-bold bg-yellow1 rounded-3xl p-4 flex flex-row items-center'
            >
                <MdOutlineFileUpload className='mr-2' />

                Browse Files
            </label>

            <input 
                hidden={true}
                id='imageUpload'
                type="file" ref={inputFile} onChange={handleChange}
                className="mb-8"
            />

            <button disabled={uploading} onClick={uploadFile}
            className='mt-8 w-[100px] text-center cursor-pointer text-base font-bold bg-yellow1 rounded-3xl p-2 flex flex-row justify-center'
            >
            {uploading ? "Uploading..." : "Upload"}
            </button>
        </div>
        </div>
      )}

      {file && !tokenURI && (
        <Image src={URL.createObjectURL(file)} alt="NFT Preview" className="mt-4" width={200} height={200} />
      )}

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
            {minting ? "Minting..." : "Mint NFT"}
          </button>
          {mintMessage && <p className="mt-4 text-red-500">{mintMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default MintNFT;

// import React, { useState, useRef } from "react";
// import Web3 from "web3";
// import ABI from "@/scripts/abi.mjs";
// import BYTECODE from "@/scripts/bytecode.mjs";
// import Image from "next/image";
// import { ZKsyncPlugin, getPaymasterParams ,ContractFactory,} from "web3-plugin-zksync"


// const MintNFT = () => {
//   const [account, setAccount] = useState(null);
//   const [file, setFile] = useState(null);
//   const [image, setImage] = useState(null);
//   const [url, setUrl] = useState("");
//   const [minting, setMinting] = useState(false);
//   const [message, setMessage] = useState("");
//   const [tokenURI, setTokenURI] = useState("");
//   const [address, setAddress] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [mintMessage, setMintMessage] = useState('');

//   const inputFile = useRef(null);

//   // Connect to MetaMask
//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         setAccount(account[0]);
//       } catch (error) {
//         console.error("Failed to connect wallet:", error);
//       }
//     } else {
//       console.log("MetaMask not found");
//     }
//   };

//   async function getEstimate() {
//     // Get gas price
//     if (!provider) return;
//     let gasPrice = await provider.getGasPrice();
//     let price = ethers.utils.formatEther(gasPrice.toString());
//     setPrice(price);
//     // Estimate gas required for transaction
//     if (!greeterInstance) return;
//     let gasEstimate = await greeterInstance.estimateGas["setGreeting"](message);
//     let gas = ethers.utils.formatEther(gasEstimate.toString());
//     setGas(gas);
//     // Calculate the cost: gasPrice * gasEstimate
//     let transactionCost = gasPrice.mul(gasEstimate);
//     let cost = ethers.utils.formatEther(transactionCost.toString());
//     // Set the cost state
//     setCost(cost);
//   }

//   // Upload file to Pinata
//    const uploadFile = async () => {
//     try {
//       setUploading(true);
//       const data = new FormData();
//       data.set("file", file);
//       const uploadRequest = await fetch("/api/files", {
//         method: "POST",
//         body: data,
//       });
//       const signedUrl = await uploadRequest.json();
//       console.log( "signed url",signedUrl);

//       setUrl(signedUrl);
//       setUploading(false);
//     } catch (e) {
//       console.log(e);
//       setUploading(false);
//       alert("Trouble uploading file");
//     }
//   };

//   const handleChange = (e) => {
//     setFile(e.target.files[0]);
//   };


//   // Mint the NFT using MetaMask
//   const handleMint = async () => {
    

//     try {
//       const web3 = new Web3(window.ethereum); // Use MetaMask provider
//       web3.registerPlugin(new ZKsyncPlugin("https://sepolia.era.zksync.dev"));

//       const contractAddress = "0xD9a7B146ec05E2cd6680088DaBaD7121EBf57624"; // Your deployed MyNFT contract address
     

//       const zksync = web3.ZKsync;

//       const PRIVATE_KEY = "0x45a71309065d92d987010d97253ab26b0406f338b8de46a9c4f267d305c5d1fa";
//       const wallet = new zksync.Wallet(PRIVATE_KEY);
//       //  const nftContract = new web3.eth.Contract(ABI, contractAddress, wallet);

//       // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       // const account = accounts[0];

//       console.log("Wallet address:", await wallet.getAddress());
//       console.log("nft contract",nftContract);
//       console.log("Recipient address (account):", account);

//       const initContracts = async (provider, wallet) => {
//         if (provider && wallet) {
//             try {
              
//               const nftContract = new ethers.Contract("0xD9a7B146ec05E2cd6680088DaBaD7121EBf57624", ABI, wallet);
//               setNftContractInstance(nftContract);

//               const address = await wallet.getAddress();
//               console.log("address", address);

//               const balance = await nftContract.tokensOfOwner(address);
//               console.log("balance", balance);

//               if (balance.length > 0) {
//                 let ownedNfts = [];
//                 for (let i = 0; i < balance.length; i++) {
//                   const tokenId = balance[i];
                  
//                   const tokenURI = await nftContract.tokenURI(tokenId);
//                   if (!tokenURI) continue;

//                   const response = await fetch(tokenURI);
//                   if (!response.ok) continue;

//                   const metadata = await response.json();
//                   ownedNfts.push(metadata);
//                 }

//                 setNfts(ownedNfts);
//               } else {
//                 setNfts([]);
//               }
//             } catch (error) {
//               console.error('Error initializing contracts:', error);
//             } finally {
//               setLoading(false);
//             }
//         };
//         }


//         const address = await wallet.getAddress();
//         const balance = await nftContract.balanceOf(address);
        
//         console.log("Wallet Balance:", balance);

//         if (balance > 0) {
//           let ownedNfts  = [];
//           const ownedTokensResponse = await nftContract.tokensOfOwner(address);
//           console.log("Owned tokens:", ownedTokensResponse);

//         for (let i = 0; i < ownedTokensResponse.length; i++) {
//           const tokenId = ownedTokensResponse[i];

//          const tokenURI = await nftContract.tokenURI(tokenId);
//          console.log("token uri", tokenURI);
//          if (tokenURI == undefined || tokenURI == "") {
//           continue;
//           }

//          const response = await fetch(tokenURI);
//           if (!response.ok) {
//             continue;
//           }

//          ownedNfts.push((await response.json()) );
//        }
//       }

//         const contract = await nftContract.deploy();
//         console.log("Contract methods:", contract.methods);

//         // Paymaster settings
//        const paymasterParams = getPaymasterParams("0x13D0D8550769f59aa241a41897D4859c87f7Dd46", {
//         type: "ApprovalBased",
//         token: "0x927488F48ffbc32112F1fF721759649A89721F8F", // The token the Paymaster is allowed to use for gas fees
//         minimalAllowance: 1000000000000000000,
//         innerInput: new Uint8Array(),
//       });

//       // Mint the NFT
//       const mintTx = await contract.methods.mint(account, url).send({
//         from: account,
//         gas: 0, // User is not paying gas
//        paymasterParams, // Paymaster covers the gas fee
//       });

//       setMessage("Mint successful!");
//       console.log("Transaction hash:", mintTx.transactionHash); // You can check this on the blockchain explorer
//     } catch (error) {
//       console.error("Error minting NFT:", error);
//       setMessage(`Error: ${error.message}`);
//     } finally {
//       setMinting(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Mint Your NFT</h1>

    

//       {/* Upload Image */}
//       {!tokenURI && (
//         <>
//           <input type="file" ref={inputFile} onChange={handleChange} />
//           <button disabled={uploading} onClick={uploadFile}>
//             {uploading ? "Uploading..." : "Upload"}
//           </button>
//         </>
//       )}

//       {image && !tokenURI && (
//         <Image src={image} alt="NFT Preview" className="mt-4" width={200} height={200} />
//       )}

//       {/* Mint Form */}
//       {url && (
//         <div>
//           <h2 className="text-xl font-semibold mt-4">Mint Form</h2>
//           <input
//             type="text"
//             placeholder="Recipient Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="mt-2 p-2 border border-gray-300"
//           />
//           <button
//             onClick={handleMint}
//             disabled={minting}
//             className="mt-4 p-2 bg-green-500 text-white"
//           >
//             {minting ? 'Minting...' : 'Mint NFT'}
//           </button>
//           {mintMessage && <p className="mt-4 text-red-500">{mintMessage}</p>}
//         </div>
//       )}

//       {message && <p className="mt-4 text-red-500">{message}</p>}
//     </div>
    
//   );
// };

// export default MintNFT;





























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



