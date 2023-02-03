import React from "react";
import clsx from "clsx";
import styles from './index.module.css';
import LoadingSvg from "@site/src/icons/LoadingSvg";

interface Props extends React.PropsWithChildren<any> {

}

const Button: React.FC<Props> = (props) => {
    const {children, loading, className, type = 'normal', ...other} = props;

    return (
        <div className={clsx(styles.button, className, styles[type])} {...other}>
            {loading && <LoadingSvg className={clsx('loading', styles.buttonLoading)} />}
            {children}
        </div>
    )
}

export default Button;