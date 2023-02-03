import React from "react";
import clsx from "clsx";
import styles from './index.module.css';
import LoadingSvg from "@site/src/icons/LoadingSvg";

interface Props extends React.PropsWithChildren<any> {
  loading?: boolean;
  type?: "normal" | "primary";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<Props> = (props) => {
  const {
    children,
    loading,
    className,
    type = "normal",
    disabled = false,
    ...other
  } = props;

  return (
    <div
      className={clsx(
        styles.button,
        { [styles.disabled]: disabled },
        className,
        styles[type]
      )}
      {...other}
    >
      {loading && (
        <LoadingSvg className={clsx("loading", styles.buttonLoading)} />
      )}
      {children}
    </div>
  );
};

export default Button;