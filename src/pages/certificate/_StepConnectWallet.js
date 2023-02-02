import React, { useContext, useEffect, useMemo, useState } from "react";
import { StepContext } from "../../components/Stepper/Step";
import StepLabel from "../../components/Stepper/StepLabel";
import { useAccount, useConnectors } from "@starknet-react/core";
import TailwindButton from "../../components/TailwindButton";
import { bindWallet } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import clsx from "clsx";
import get from "lodash/get";

const isEqualWallet = (addressA, addressB) => {
  return (
    addressA.toString().toLowerCase() === addressB.toString().toLowerCase()
  );
};

const StepConnectWallet = (props) => {
  const { next, info } = props;
  const { active, index, disabled, completed } = useContext(StepContext);

  const { data: user } = useAuth();
  const { address, status, account } = useAccount();
  const { disconnect, connect } = useConnectors();

  const [currentBingWallet, setCurrentBingWallet] = useState(null);
  // 钱包连接状态
  const connected = status === "connected";

  // 钱包与Github关联状态
  const [isBinding, setIsBinding] =
    useState();
    // !!get(courseInfo, "user_wallet.wallet")
  const isErrorWallet =
    connected && isBinding && !isEqualWallet(address, currentBingWallet);
  const [bindError, setBindError] = useState(false);
  const githubName = get(user, "user_metadata.user_name");

  const handleBinding = async () => {
    if (!account) return;

    if (!githubName) {
      console.log("githubName", githubName);
    }

    const { signer } = account;

    // const nonce = await signer.getTransactionCount();
    const message = `You are binding the wallet address to your github ID in WTF Academy. \n\nThis binding can not be changed later. \nPlease confirm the binding operation. \n\nGithub ID: ${githubName}\n\nWallet Address: ${address}\n\n`; //Nonce: ${nonce}`;

    const signData = await signer.signMessage(message);
    const res = await bindWallet(message, signData, address);
    if (res.code !== 0) {
      setBindError(true);
      return;
    }
    setCurrentBingWallet(address);
    setIsBinding(true);
  };

  useEffect(() => {
    if (!connected && !disabled) {
      next(1);
    }

    if (connected && isBinding && !isErrorWallet) {
      console.log("connected");
      next(2);
    }
  }, [connected, disabled, isBinding, isErrorWallet]);

  // useEffect(() => {
  //   setIsBinding(!!get(courseInfo, "user_wallet.wallet"));
  // }, [!!get(courseInfo, "user_wallet.wallet")]);

  // useEffect(() => {
  //   setCurrentBingWallet(get(courseInfo, "user_wallet.wallet", ""));
  // }, [get(courseInfo, "user_wallet.wallet")]);

  const errorMessage = useMemo(() => {
    if (isErrorWallet) {
      return "请切换已绑定钱包";
    }
  }, [isErrorWallet]);

  const leftText = useMemo(() => {
    if (isBinding) {
      return connected ? "已连接绑定钱包" : "连接绑定钱包";
    }
    return "未绑定钱包";
  }, [isBinding, connected]);

  const rightButton = () => {
    return (
      <>
        {!connected && (
          <TailwindButton error={!disabled} onClick={connect}>
            连接钱包
          </TailwindButton>
        )}
        {connected && !isBinding && (
          <TailwindButton error={!disabled} onClick={handleBinding}>
            {bindError ? "重试绑定" : "绑定钱包"}
          </TailwindButton>
        )}
        {connected && isBinding && isErrorWallet && (
          <TailwindButton error={!disabled} onClick={disconnect}>
            切换钱包
          </TailwindButton>
        )}
      </>
    );
  };

  return (
    <StepLabel error={isErrorWallet && !disabled}>
      <div className="flex flex-col">
        <div className="font-bold text-[16px] lg:text-[18px]">{leftText}</div>
        {isErrorWallet && <div className="text-[14px]">{errorMessage}</div>}
      </div>
      {(active || completed) && (
        <div className="flex items-center">
          {connected && (
            <div
              className={clsx(
                "text-white cursor-pointer mr-2 text-[14px] lg:text-[16px]",
                { "text-black": connected && isBinding && !isErrorWallet }
              )}
              onClick={disconnect}
            >
              {account.address}
            </div>
          )}
          {rightButton()}
        </div>
      )}
    </StepLabel>
  );
};

export default StepConnectWallet;
