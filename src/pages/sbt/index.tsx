import React, {useContext, useEffect, useState} from "react";
import Layout from "@theme/Layout";
import Button from "@site/src/components/Button";
import SBTMessage from "@site/src/components/SBTMessage";

import styles from "./index.module.css";
import clsx from "clsx";
import LazyloadImage from "@site/src/components/LazyloadImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import {useDebounceEffect, useRequest} from "ahooks";
import {getUserCourseInfo, getNftSign} from "@site/src/api/course";
import {useHistory} from "@docusaurus/router";
import {toast} from "react-hot-toast";
import {useAccount} from "@starknet-react/core";
import contractAbi from "@site/src/contracts/mint.json";
import {Contract, uint256} from "starknet";
import {CourseId} from "@site/src/constants/course";
import GlobalContext from "@site/src/contexts/GlobalContext";

const contractAddress =
    "0x064bfed736951e98e16fedfd4605960879251f59f2f14427a2ae88a48f379801";
const checkMintedStatus = async (provider) => {
    const contract = new Contract(contractAbi, contractAddress, provider);
    const res = await contract.balanceOf(provider.address);
    const balance = uint256.uint256ToBN(res[0]).toNumber();

    return balance > 0;
};

const mint = async (provider) => {
    const contract = new Contract(contractAbi, contractAddress, provider);
    const tokenId = uint256.bnToUint256("1");
    const mintNFT = await contract.mint(provider.address, tokenId);
    return await provider.waitForTransaction(mintNFT.transaction_hash);
};

const SBTClaim: React.FC<any> = () => {
    const history = useHistory();
    const {status, account} = useAccount();
    const {uid} = useContext(GlobalContext);
    const [mintLoading, setMintLoading] = useState(false);
    const sbtUrl = useBaseUrl("/img/SBT.svg");

    const isConnected = status === "connected";

    const {loading, data} = useRequest(
        async () => {
            const info = await getUserCourseInfo(CourseId, uid);
            const mintedStatus = await checkMintedStatus(account);
            return {
                ...(info as any),
                mintedStatus,
            };
        },
        {
            onSuccess({data}) {
                // if (!data.can_graduate) {
                //     history.replace("/docs/dashboard");
                //     toast.error("You need to complete courses first!");
                // }
            },
            ready: isConnected,
        }
    );

    const handleClaim = async () => {
        if (!isConnected) {
            toast.error("You need to connect wallet first!");
            return;
        }

        setMintLoading(true);
        try {
            const nftSignRes: any = await getNftSign(CourseId, uid);
            console.log(nftSignRes);
            const signature = nftSignRes.data.sign.split(",");
            const mintResult = await mint(account);
            console.log(mintResult);
            if(mintResult.status === "ACCEPTED_ON_L2" || mintResult.status === "PENDING") {
                toast.success('Mint succeeded!');
            }
            else {
                toast.error('Mint failed, Please try again!');
            }
        } catch (e) {
            console.error(e.message);
            if (e.message.includes('User abort')) { /*ignore*/ }
            // ...
        }

        setMintLoading(false);
    };

    useDebounceEffect(() => {
        if (!isConnected) {
            setTimeout(() => {
                toast.error("You need to connect wallet first!");
            }, 0);
        }
    }, [status])

    const isMinted = data?.mintedStatus;

    return (
        <Layout
            title={`Hello from`}
            description="Description will go into a meta tag in <head />"
        >
            {loading || !isConnected ? (
                <FullscreenLoading/>
            ) : (
                <>
                    <SBTMessage claimed={isMinted}/>
                    <div className={styles.card}>
                        <Button
                            loading={mintLoading}
                            onClick={handleClaim}
                            className={styles.claimButton}
                            type="primary"
                            disabled={isMinted}
                        >
                            {!mintLoading && <ButtonIconSvg/>}
                            {isMinted ? "Claimed" : "Claim Your SBT"}
                        </Button>
                        <div className={clsx(styles.SBTLogo)}>
                            <div className={styles.shadow}/>
                            <LazyloadImage className={styles.SBTLogoImage} src={sbtUrl}/>
                        </div>
                    </div>
                </>
            )}
        </Layout>
    );
};

const ButtonIconSvg = () => {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.813 14.904L8 17.75L7.187 14.904C6.97687 14.1689 6.5829 13.4994 6.04226 12.9587C5.50162 12.4181 4.83214 12.0241 4.097 11.814L1.25 11L4.096 10.187C4.83114 9.97687 5.50062 9.5829 6.04126 9.04226C6.5819 8.50162 6.97587 7.83214 7.186 7.097L8 4.25L8.813 7.096C9.02313 7.83114 9.4171 8.50062 9.95774 9.04126C10.4984 9.5819 11.1679 9.97587 11.903 10.186L14.75 11L11.904 11.813C11.1689 12.0231 10.4994 12.4171 9.95874 12.9577C9.4181 13.4984 9.02413 14.1679 8.814 14.903L8.813 14.904ZM17.259 7.715L17 8.75L16.741 7.715C16.5927 7.12159 16.286 6.57962 15.8536 6.14703C15.4212 5.71444 14.8794 5.40749 14.286 5.259L13.25 5L14.286 4.741C14.8794 4.59251 15.4212 4.28556 15.8536 3.85297C16.286 3.42038 16.5927 2.87841 16.741 2.285L17 1.25L17.259 2.285C17.4073 2.87854 17.7142 3.42059 18.1468 3.85319C18.5794 4.28579 19.1215 4.59267 19.715 4.741L20.75 5L19.715 5.259C19.1215 5.40733 18.5794 5.71421 18.1468 6.14681C17.7142 6.57941 17.4073 7.12147 17.259 7.715ZM15.894 19.567L15.5 20.75L15.106 19.567C14.9955 19.2356 14.8094 18.9345 14.5625 18.6875C14.3155 18.4406 14.0144 18.2545 13.683 18.144L12.5 17.75L13.683 17.356C14.0144 17.2455 14.3155 17.0594 14.5625 16.8125C14.8094 16.5655 14.9955 16.2644 15.106 15.933L15.5 14.75L15.894 15.933C16.0045 16.2644 16.1906 16.5655 16.4375 16.8125C16.6845 17.0594 16.9856 17.2455 17.317 17.356L18.5 17.75L17.317 18.144C16.9856 18.2545 16.6845 18.4406 16.4375 18.6875C16.1906 18.9345 16.0045 19.2356 15.894 19.567Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

const FullscreenLoading = () => (
    <div className={styles.fullscreenLoading}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default SBTClaim;