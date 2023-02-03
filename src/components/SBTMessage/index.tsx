import React from "react";
import clsx from "clsx";
import styles from './index.module.css';

interface Props extends React.PropsWithChildren<any> {
    available?: boolean;
}

const SBTMessage: React.FC<Props> = (props) => {
    const { available = false, ...other } = props;
    
    if (available) {
        return (<>
            <div className={styles.icon}>🎉</div>
            <p className={styles.message}>Wow, you have finished this tutorial  👏</p>
        </>)
    } else {
        return (<>
            <div className={styles.icon}>🫣</div>
            <p className={styles.message}>Oh, NO! You haven't finished this tutorial  🤯</p>
        </>)
    }
}

export default SBTMessage;