import { Contract, Web3Provider } from "zksync-ethers";

/**
 * @typedef {Object} PowerStoneAttributes
 * @property {string} trait_type - The type of the trait.
 * @property {string} value - The value of the trait.
 */

/**
 * @typedef {Object} PowerStoneNft
 * @property {PowerStoneAttributes[]} attributes - Array of attributes.
 * @property {string} description - Description of the NFT.
 * @property {string} image - URL of the NFT image.
 * @property {string} name - Name of the NFT.
 */

/**
 * @typedef {Object} InputProps
 * @property {Contract|null} greeterInstance - The greeter contract instance.
 * @property {function(string): void} setGreetingMessage - Function to set the greeting message.
 * @property {Web3Provider|null} provider - The Web3 provider instance.
 * @property {PowerStoneNft[]} nfts - Array of NFTs.
 */

/**
 * @typedef {Object} CheckoutProps
 * @property {Contract|null} greeterInstance - The greeter contract instance.
 * @property {string} message - The message.
 * @property {function(string): void} setGreetingMessage - Function to set the greeting message.
 * @property {string} cost - The cost.
 * @property {string} price - The price.
 * @property {string} gas - The gas fee.
 * @property {PowerStoneNft[]} nfts - Array of NFTs.
 */

/**
 * @typedef {Object} GreeterData
 * @property {string} message - The message.
 */

/**
 * @typedef {Object} ModalProps
 * @property {function(): void} closeModal - Function to close the modal.
 * @property {Contract|null} greeterInstance - The greeter contract instance.
 * @property {string} message - The message.
 * @property {function(string): void} setGreetingMessage - Function to set the greeting message.
 * @property {string} cost - The cost.
 * @property {string} price - The price.
 * @property {string} gas - The gas fee.
 * @property {PowerStoneNft[]} nfts - Array of NFTs.
 */

/**
 * @typedef {Object} PaymasterProps
 * @property {Contract} nftInstance - The nft contract instance.
 * @property {string} url - The url.
 * @property {string} price - The price.
 */
