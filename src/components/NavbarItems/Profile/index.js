import React, { useEffect } from "react";
import Link from "@docusaurus/Link";
import useAuth from "@site/src/hooks/useAuth";
import clsx from "clsx";
import styles from "./index.module.css";

export const Profile = (props) => {
  const { data: user, signOut } = useAuth();
  const isSignIn = user !== null;

  if (isSignIn) {
    return (
      <div
        className={clsx(styles.customNavbarItem, styles.box, {
          "menu__list-item--hide": props.mobile,
        })}
      >
        <img className={styles.avatar} src={user?.user_metadata?.avatar_url} />
        <span className={styles.text} onClick={signOut}>
          退出
        </span>
      </div>
    );
  } else {
    return (
      <Link
        className={clsx(styles.customNavbarItem, {
          "menu__list-item--hide": props.mobile,
        })}
        to="/login"
      >
        登录
      </Link>
    );
  }
};
