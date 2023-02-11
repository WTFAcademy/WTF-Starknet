import React from 'react';
import clsx from "clsx";

import styles from './styles.module.css';

export default function DashboardTitle() {
    return (
        <>
            <h2 className={styles.title}>
                Welcome to the
                <br/>
                <p className={clsx(styles.title, styles.orangeTitle)}>STARK Way of Building</p>
            </h2>

            <p>
                Starknet uses the Cairo programming language both for its infrastructure and for writing Starknet
                contracts. L2 &lt;--&gt; L1 messaging infrastructure is available and contracts are fully composable.
            </p>
        </>
    )
}
