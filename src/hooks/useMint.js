import { useState } from "react";
import { useAccount, useContract } from "@starknet-react/core";
import MinterABI from "../constants/abi/WTFSBT1155Minter";
import { ethers } from "ethers";

const ErrorMap = (message) => {
  if (message.includes("Already minted!")) {
    return "已铸造完成，请勿重复进行！";
  }

  if (message.includes("SoulId is not created yet")) {
    return `该认证NFT还未进行未创建`;
  }

  if (message.includes("mint has not started")) {
    return "铸造还未开放，请等待";
  }

  if (message.includes("mint has ended")) {
    return "铸造已经结束";
  }

  if (message.includes("Invalid signature")) {
    return "错误的签名";
  }

  if (message.includes("User denied transaction signature.")) {
    return "拒绝交易";
  }

  return "领取错误，请重试";
};

const useMint = (onSuccess = (tx) => {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("领取失败，请稍后重试");
  const { address } = useAccount();

  const contract = useContract({
    address: "0xfd8A6971aCCB1C05a76274C846E5C9fD0c8b82cb",
    abi: MinterABI,
    // signerOrProvider: signer,
  });

  const mint = async (soulId, signData, amount) => {
    console.log(soulId, signData, amount);
    setLoading(true);
    try {
      const gasLimit = await contract.estimateGas.mint(
        address,
        soulId,
        signData,
        {
          value: ethers.utils.parseEther(amount + ""),
        }
      );
      const tx = await contract.mint(address, soulId, signData, {
        value: ethers.utils.parseEther(amount + ""),
        gasLimit: gasLimit.add(1000),
      });
      await tx.wait();
      setLoading(false);
      onSuccess(tx);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError(true);
      setErrorMessage(ErrorMap(String(e.message)));
    }
  };

  return {
    loading,
    error,
    errorMessage,
    setError,
    setErrorMessage,
    mint,
  };
};

export default useMint;
