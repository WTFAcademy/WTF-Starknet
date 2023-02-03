import LoadingSvg from "@site/src/icons/LoadingSvg";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

const LazyloadImage = (props) => {
  const { src, className } = props;
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setDone(true);
      };
    }
  }, [src]);

  return (
    <div>
      {done ? (
        <img alt="nft image" src={src} className={className} />
      ) : (
        <div className={clsx(className, styles.loading)}>
          <LoadingSvg className={clsx("loading", styles.loadingIcon)} />
        </div>
      )}
    </div>
  );
};

export default LazyloadImage;
