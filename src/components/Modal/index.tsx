import clsx from "clsx";
import React, { ReactNode } from "react";
import styles from "./index.module.css";

type ModalProps = {
  open?: boolean;
  onClose?: () => void;
  children?: ReactNode;
};

export default function Modal(props: ModalProps): JSX.Element {
  const { children, open = false, onClose } = props;
  return (
    <div className={clsx(styles.modal, open && styles.modal_show)}>
      <div className={styles.modal_box}>
        <button onClick={onClose} className={clsx(styles.modal_close_btn)}>
          <CloseSvg />
        </button>
        {children}
      </div>
    </div>
  );
}

function CloseSvg() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11L11 1M1 1L11 11"
        stroke="black"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
