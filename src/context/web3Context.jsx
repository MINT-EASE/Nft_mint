import React, { createContext, useState, useContext } from "react";
import { Contract, Web3Provider, Signer } from "zksync-ethers";

/**
 * @typedef {Object} PowerStoneNft
 * @property {Object[]} attributes - The attributes of the NFT.
 * @property {string} description - The description of the NFT.
 * @property {string} image - The image URL of the NFT.
 * @property {string} name - The name of the NFT.
 */

/**
 * @typedef {Object} Web3ContextType
 * @property {Contract|null} greeterContractInstance - The greeter contract instance.
 * @property {string} greeting - The current greeting message.
 * @property {PowerStoneNft[]} nfts - The list of NFTs.
 * @property {Web3Provider|null} provider - The Web3 provider.
 * @property {Signer|null} signer - The Web3 signer.
 * @property {Function} setGreeterContractInstance - Function to set the greeter contract instance.
 * @property {Function} setGreetingMessage - Function to set the greeting message.
 * @property {Function} setNfts - Function to set the list of NFTs.
 * @property {Function} setProvider - Function to set the Web3 provider.
 * @property {Function} setSigner - Function to set the Web3 signer.
 */

/**
 * Default state for Web3Context.
 * @type {Web3ContextType}
 */
export const defaultWeb3State = {
  greeterContractInstance: null,
  greeting: "",
  nfts: [],
  provider: null,
  signer: null,
  setGreeterContractInstance: () => {},
  setGreetingMessage: () => {},
  setNfts: () => {},
  setProvider: () => {},
  setSigner: () => {},
};

const Web3Context = createContext(defaultWeb3State);

/**
 * Custom hook to use Web3Context.
 * @returns {Web3ContextType} - The context value.
 */
export const useWeb3Context = () => useContext(Web3Context);

export default Web3Context;
