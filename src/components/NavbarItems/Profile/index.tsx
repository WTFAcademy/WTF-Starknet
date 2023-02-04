import React, {useContext, useEffect, useState} from "react";
import styles from "./index.module.css";
import {
    useConnectors,
    useAccount,
} from "@starknet-react/core";
import Button from "@site/src/components/Button";
import truncation from "@site/src/utils/truncation";
import {WalletModal} from "@site/src/components/WalletModal";
import Avatar from "@site/src/components/Avatar";
import OfflineSvg from "@site/src/icons/OfflineSvg";
import clsx from "clsx";
import {login} from "@site/src/api/auth";
import GlobalContext from "@site/src/contexts/GlobalContext";

const LOCAL_FLAG = (address) => 'login-test-' + address;

const UserInfo = () => {
    const {account, address} = useAccount();
    const {disconnect} = useConnectors();

    return (
        <div className={styles.userInfo} onClick={() => {
            disconnect();
            localStorage.removeItem(LOCAL_FLAG(address));
        }}>
            <Avatar diameter={28} address={account?.address || ''}/>
            <span className={styles.userInfoAddress}>{truncation(account?.address)}</span>
            <OfflineSvg className={styles.userInfoDropIcon}/>
        </div>
    )
}

export const Profile = (props) => {
    const {status, address} = useAccount();
    const {setUid} = useContext(GlobalContext);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const isDisconnected = status === 'disconnected';

    useEffect(() => {
        if (status !== 'disconnected') {
            handleClose();
        }
    }, [status]);

    useEffect(() => {
        if (address && address !== '') {
            // 特殊处理，原因在于每次切换页面都会触发该组件的重新渲染
            const Flag = LOCAL_FLAG(address);
            if (localStorage.getItem(Flag)) {
                const data = JSON.parse(localStorage.getItem(Flag));
                if (data && data.expiredTime > Date.now()) {
                    setUid(data.data.uid);
                    return;
                }
            }

            login(address).then((res: any) => {
                localStorage.setItem(Flag, JSON.stringify({expiredTime: Date.now() + 1000 * 60 * 60 * 24, data: res.data}));
                setUid(res.data.uid);
            })
        }
    }, [address]);

    return (
        <div className={clsx(styles.profile, {'menu__list-item--hide': props.mobile})}>
            {isDisconnected && (
                <Button
                    type={isDisconnected ? 'primary' : 'normal'}
                    onClick={handleOpen}
                >
                    Connect Wallet
                </Button>
            )}
            {!isDisconnected && <UserInfo/>}
            <WalletModal open={open} onClose={handleClose}/>
        </div>
    );
};
