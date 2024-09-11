"use client"

import React, { useState, useEffect,useContext } from 'react';
// import { ethers } from 'ethers';
// import { Web3Provider, Signer, Contract } from "zksync-ethers";
import ABI from "@/scripts/abi.mjs";
import { useRouter } from "next/navigation";

// import BYTECODE from "@/scripts/bytecode.mjs";



const ConnectWallet = () => {

  // const [networkOk, setNetworkOk] = useState(false);
  // const [wallet, setWallet] = useState({ address: "", acc_short: "" });
  // const NETWORK_NAME = "zkSync Era Sepolia Testnet";
  // const NETWORK_ID = "0x12c";
  // const router = useRouter();

  // // useEffect(() => {
  // //   checkNetwork();
  // // }, []);

  // const shortenAddress = (address) => {
  //   const start = address.slice(0, 6);
  //   const end = address.slice(-4);
  //   return `${start}...${end}`;
  // };


  // const connectWallet = async () => {
  //   console.log("connectWallet");
  //   // if (!networkOk) await switchNetwork();
  //   try {
     
  //     if(window.ethereum){
  //       try{
  //         console.log("metamask detected");
  //         const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  //          console.log("metamsk accounts",accounts);

          
  //         setWallet(accounts[0], shortenAddress(accounts[0]));

  //         // Save the wallet address in local storage
  //         localStorage.setItem('walletAddress', accounts[0]);
          

  //         //Redirect to profile page if wallet is connected
  //         if (accounts.length > 0) {
  //           router.push("/mint");
  //         } else {
  //           console.log("No accounts found.");
  //         }

  //       }catch(err){
  //         if (err.code === 4001) {
  //           // EIP-1193 userRejectedRequest error.
  //             console.log("Please connect to MetaMask.");
  //           } else {
  //                 console.error(err);
  //             }
  //       }
  //     }
  //     else{
  //     console.log("metamask not detected");
  //     alert("Please install metamask and connect to a network");
  //     }

     
  //   } catch (error) {
  //     console.error("Error connecting DApp to your wallet");
  //     console.error(error);
  //   }
  // };

  
  return (
    <div>
      <button
          // onClick={connectWallet}
          // disabled={wallet.address != ""}
          // className={`relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-custom hover:bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-custom ${
          //   wallet.address == "" ? "disabled:opacity-50" : ""
          // }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {/* <span>
            {wallet.address != ""
              ? `Connected ${wallet.acc_short}`
              : `Connect Wallet`}
          </span> */}
        </button>
      {/* {!networkOk ? (
        <button
          onClick={switchNetwork}
          className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-custom hover:bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-custom"
        >
          Wrong network. Switch to {NETWORK_NAME}
        </button>
      ) : (
        
      )} */}
    </div>
  )
}

export default ConnectWallet

  //  const initContracts = async (provider, signer) => {
  //   if (provider && signer) {
  //       try {
  //         const nftContract = new ethers.Contract("0xD9a7B146ec05E2cd6680088DaBaD7121EBf57624", ABI, signer);
  //         setNftContractInstance(nftContract);

  //         const address = await signer.getAddress();
  //         console.log("address", address);

  //         const balance = await nftContract.tokensOfOwner(address);
  //         console.log("balance", balance);

  //         if (balance.length > 0) {
  //           let ownedNfts = [];
  //           for (let i = 0; i < balance.length; i++) {
  //             const tokenId = balance[i];
              
  //             const tokenURI = await nftContract.tokenURI(tokenId);
  //             if (!tokenURI) continue;

  //             const response = await fetch(tokenURI);
  //             if (!response.ok) continue;

  //             const metadata = await response.json();
  //             ownedNfts.push(metadata);
  //           }

  //           setNfts(ownedNfts);
  //         } else {
  //           setNfts([]);
  //         }
  //       } catch (error) {
  //         console.error('Error initializing contracts:', error);
  //       } finally {
  //         setLoading(false);
  //       }
  //   };
  //   }
  

  // const checkNetwork = async () => {
  //   if (window.ethereum) {
  //     const currentChainId = await window.ethereum.request({
  //       method: "eth_chainId",
  //     });

  //     console.log("chainId", currentChainId)

  //     if (currentChainId == NETWORK_ID) setNetworkOk(true);
  //   }
  // };

  // const switchNetwork = async () => {
  //   await window.ethereum.request({
  //     method: "wallet_switchEthereumChain",
  //     params: [{ chainId: NETWORK_ID }],
  //   });
  //   // refresh
  //   window.location.reload();
  // };


 // if (window.ethereum) {
      //   const provider = await window.ethereum;
      //   console.log(provider);
      //   web3Context.setProvider(provider);

      //   const data = await provider.request({ method: "eth_requestAccounts" });
       

      //   const signerInstance = provider.getSigner();
      //   web3Context.setSigner(signerInstance);

      //   setWallet({ address: data[0], acc_short: shortenAddress(data[0]) });

      //   await initContracts(provider, signerInstance);
      // }



// const connectWallet = () => {
//   const web3Context = useContext(Web3Context);
//   const [networkOk, setNetworkOk] = useState(false);
//   const [wallet, setWallet] = useState({ address: "", acc_short: "" });

//   useEffect(() => {
//     checkNetwork();
//   }, []);

//   const shortenAddress = (address) => {
//     const start = address.slice(0, 6);
//     const end = address.slice(-4);
//     return `${start}...${end}`;
//   };

//    const initContracts = async () => {
//     try {
//           const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);
//           setNftContractInstance(nftContract);

//           const address = await signer.getAddress();
//           const balance = await nftContract.tokensOfOwner(address);
//           if (balance.length > 0) {
//             let ownedNfts = [];
//             for (let i = 0; i < balance.length; i++) {
//               const tokenId = balance[i];
              
//               const tokenURI = await nftContract.tokenURI(tokenId);
//               if (!tokenURI) continue;

//               const response = await fetch(tokenURI);
//               if (!response.ok) continue;

//               const metadata = await response.json();
//               ownedNfts.push(metadata);
//             }

//             setNfts(ownedNfts);
//           } else {
//             setNfts([]);
//           }
//         } catch (error) {
//           console.error('Error initializing contracts:', error);
//         } finally {
//           setLoading(false);
//         }
//       };

//   const checkNetwork = async () => {
//     if (window.ethereum) {
//       const currentChainId = await window.ethereum.request({
//         method: "eth_chainId",
//       });

//       if (currentChainId == NETWORK_ID) setNetworkOk(true);
//     }
//   };

//   const switchNetwork = async () => {
//     await window.ethereum.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: NETWORK_ID }],
//     });
//     // refresh
//     window.location.reload();
//   };

//   const connectWallet = async () => {
//     console.log("connectWallet");
//     if (!networkOk) await switchNetwork();
//     try {
//       if (window.ethereum) {
//         const provider = new Web3Provider(window.ethereum);
//         web3Context.setProvider(provider);

//         const data = await provider.send("eth_requestAccounts", []);

//         const signerInstance = provider.getSigner();
//         web3Context.setSigner(signerInstance);

//         setWallet({ address: data[0], acc_short: shortenAddress(data[0]) });

//         await initContracts(provider, signerInstance);
//       }
//     } catch (error) {
//       console.error("Error connecting DApp to your wallet");
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       {!networkOk ? (
//         <button
//           onClick={switchNetwork}
//           className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-custom hover:bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-custom"
//         >
//           Wrong network. Switch to {NETWORK_NAME}
//         </button>
//       ) : (
//         <button
//           onClick={connectWallet}
//           disabled={wallet.address != ""}
//           className={`relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-custom hover:bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-custom ${
//             wallet.address == "" ? "disabled:opacity-50" : ""
//           }`}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 mr-2"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span>
//             {wallet.address != ""
//               ? `Connected ${wallet.acc_short}`
//               : `Connect Wallet`}
//           </span>
//         </button>
//       )}
//     </>
//   );
// }


// export default connectWallet



// const Web3MyNFTComponent = ({ provider, signer }) => {
//   const [nftContractInstance, setNftContractInstance] = useState<ethers.Contract | null>(null);
//   const [nfts, setNfts] = useState([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const NFT_CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
//   const NFT_CONTRACT_ABI = [
//     // Add the ABI of your MyNFT contract here
//   ];

//   const connectWallet = async () => {
//   if (!networkOk) await switchNetwork();
//   try {
//     if (window .ethereum) {
//       const provider = new Web3Provider(window .ethereum);
//       web3Context.setProvider(provider);

//       const data = await provider.send("eth_requestAccounts", []);

//       const signerInstance = provider.getSigner();
//       web3Context.setSigner(signerInstance);

//       setWallet({ address: data[0], acc_short: shortenAddress(data[0]) });

//       await initContracts(provider, signerInstance);
//     }
//   } catch (error) {
//     console.error("Error connecting DApp to your wallet");
//     console.error(error);
//   }
// };

//   const initContracts = async () => {
//     try {
//           const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);
//           setNftContractInstance(nftContract);

//           const address = await signer.getAddress();
//           const balance = await nftContract.tokensOfOwner(address);
//           if (balance.length > 0) {
//             let ownedNfts = [];
//             for (let i = 0; i < balance.length; i++) {
//               const tokenId = balance[i];
              
//               const tokenURI = await nftContract.tokenURI(tokenId);
//               if (!tokenURI) continue;

//               const response = await fetch(tokenURI);
//               if (!response.ok) continue;

//               const metadata = await response.json();
//               ownedNfts.push(metadata);
//             }

//             setNfts(ownedNfts);
//           } else {
//             setNfts([]);
//           }
//         } catch (error) {
//           console.error('Error initializing contracts:', error);
//         } finally {
//           setLoading(false);
//         }
//       };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <h2>Your NFTs</h2>
//       {nfts.length > 0 ? (
//         nfts.map((nft, index) => (
//           <div key={index}>
//             <img src={nft.image} alt={`NFT ${index + 1}`} />
//             <p>Name: {nft.name}</p>
//             <p>Description: {nft.description}</p>
//           </div>
//         ))
//       ) : (
//         <p>No NFTs found</p>
//       )}
//     </>
//   );
// };