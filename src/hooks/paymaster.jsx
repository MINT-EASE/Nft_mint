import { Contract, utils } from "zksync-ethers";
import { PAYMASTER_CONTRACT_ADDRESS } from "../constants/consts";
import * as ethers from "ethers";

/**
 * @typedef {Object} PaymasterProps
 * @property {Contract} nftInstance - The greeter contract instance.
 * @property {string} url - The url to set.
 * @property {string} price - The price in Ether.
 */


//PAYMASTER_CONTRACT_ADDRESS:  0xC6F122635dace9eBDf8707b49414B10973488f6F

/**
 * Function to use paymaster for estimating gas and preparing custom data.
 * @param {PaymasterProps} params - The parameters for the function.
 * @returns {Promise<Object>} - An object containing gas estimates and custom data.
 */
const usePaymaster = async ({ nftInstance, url, price }) => {
  let gasPrice = ethers.utils.parseEther(price);
  const paymasterParams = utils.getPaymasterParams("0xC6F122635dace9eBDf8707b49414B10973488f6F", {
    type: "General",
    innerInput: new Uint8Array(),
  });

  // Estimate gas limit via paymaster
  const gasLimit = await nftInstance.estimateGas.mint(url, {
    customData: {
      gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      paymasterParams: paymasterParams,
    },
  });

  return {
    maxFeePerGas: gasPrice,
    maxPriorityFeePerGas: ethers.BigNumber.from(0),
    gasLimit: gasLimit,
    customData: {
      gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      paymasterParams: paymasterParams,
    },
  };
};

export default usePaymaster;
