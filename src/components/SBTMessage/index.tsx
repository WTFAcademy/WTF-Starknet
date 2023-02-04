import React from "react";
import clsx from "clsx";
import styles from "./index.module.css";

interface Props extends React.PropsWithChildren<any> {
  claimed?: boolean;
}

const SBTMessage: React.FC<Props> = (props) => {
  const { claimed = false, ...other } = props;

  if (!claimed) {
    return (
      <>
        <div className={styles.icon}>🎁</div>
        <p className={styles.message}>
          Wow, you have finished this tutorial 👏
        </p>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.icon}>🎉</div>
        <p className={styles.message}>Congratulations! Your SBT is claimed!</p>
      </>
    );
  }
};

export default SBTMessage;