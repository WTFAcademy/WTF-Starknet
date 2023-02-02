import React, { Component, useEffect, useState } from "react";
import { LoadingSvg } from "../../svg";

const TailwindImage = (props) => {
  const { src, imageClass } = props;
  const [done, setDone] = useState(false);

  const loadingClasses =
    imageClass + ` flex items-center justify-center bg-gray-300`;

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
        <img alt="nft image" src={src} className={imageClass} />
      ) : (
        <div className={loadingClasses}>
          <LoadingSvg className="animate-spin text-[24px]" />
        </div>
      )}
    </div>
  );
};

export default TailwindImage;
