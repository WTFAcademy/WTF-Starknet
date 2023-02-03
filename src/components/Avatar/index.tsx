import React from "react";
import Jazzicon from "react-jazzicon";
import {useAccount} from "@starknet-react/core";

interface AvatarProps extends React.PropsWithChildren<any> {
    address?: string;
    diameter?: number;
}

const Avatar = (props: AvatarProps) => {
    const { address, diameter = 30, ...other } = props;
    const { address: accountAddress } = useAccount();
    const newAddress = address || accountAddress || '';
    const seed = parseInt(newAddress.slice(2, 10), 16);

    return (
        <Jazzicon diameter={diameter} seed={seed} {...other} />
    )
}

export default Avatar;