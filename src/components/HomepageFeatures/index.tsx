import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  imgUrl: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Account Abstraction',
    imgUrl: require('@site/static/img/home_feature_item1.png').default,
    description: (
      <>
        Introduce you to account abstraction on Starknet.
      </>
    ),
  },
  {
    title: 'Cairo Lang',
    imgUrl: require('@site/static/img/home_feature_item2.png').default,
    description: (
      <>
        Teach you to write a NFT contract in cairo.
      </>
    ),
  },
  {
    title: 'Starknet Dapp',
    imgUrl: require('@site/static/img/home_feature_item3.png').default,
    description: (
      <>
      Build a simple NFT minting Dapp on Starknet.
      </>
    ),
  },
];


function Feature({title, imgUrl, description}: FeatureItem) {
  return (
    <div className={styles.featureItem}>
      <img className={styles.featureImg} src={imgUrl} />
      <h3 className={styles.featureItemTitle}>{title}</h3>
      <p className={styles.featureItemDesc}>{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className={styles.overview}>
        <div className={styles.overviewLogo}>
          <StarknetLogo/>
        </div>
        <div className={styles.overviewText}>
          <h2 className={styles.overviewTextTitle}>Say hi to Starknet 🤟</h2>
          <p className={styles.overviewTextDes}>Starknet is a permissionless decentralized Validity-Rollup (often referred to as ZK-Rollup). It operates as an L2 network over Ethereum, enabling any dApp to achieve unlimited scale for its computation – without compromising Ethereum's composability and security.</p>
          <a className={styles.overviewLink} href='https://starknet.io' target="_blank">
            <span className={styles.overviewLinkText}>https://starknet.io</span>
            <LinkIcon/>
          </a>
        </div>
      </div>
      <div className={styles.featureTitle}>What will you learn from this tutorial</div>
      <div className={styles.featureList}>
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
      <Link
        className={styles.tutorialsLink}
        to="/docs/starknet-101"
      >
        Go to tutorial
        <div className={styles.tutorialsLinkIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </Link>
    </section>
  );
}


function StarknetLogo() {
  return (
    <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1_550)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M91.9996 45.9991C91.9996 71.404 71.4053 91.9982 46.0005 91.9982C20.5956 91.9982 0 71.404 0 45.9991C0 20.5942 20.5956 0 46.0005 0C71.4053 0 91.9996 20.5942 91.9996 45.9991Z" fill="#29296E"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M67.4061 33.6992L66.2364 30.0855C65.9987 29.3505 65.4186 28.7786 64.6809 28.5531L61.0495 27.4363C60.5468 27.2828 60.5427 26.5737 61.0413 26.412L64.6564 25.2423C65.39 25.0045 65.962 24.4244 66.1889 23.6867L67.3042 20.0553C67.4578 19.554 68.1669 19.5486 68.3286 20.0485L69.4983 23.6623C69.736 24.3959 70.3161 24.9678 71.0538 25.1947L74.6852 26.3101C75.1879 26.465 75.1933 27.1728 74.6934 27.3344L71.0783 28.5041C70.3447 28.7419 69.7727 29.3234 69.5458 30.061L68.4305 33.6911C68.277 34.1938 67.5678 34.1992 67.4061 33.6992Z" fill="#FAFAFA"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.18237 45.2698C5.27601 43.1274 7.43882 41.5134 9.68586 40.4931C11.956 39.4837 14.4517 38.8642 16.9025 38.6632C21.8503 38.2162 26.6705 39.0436 31.0613 40.4741C33.3233 41.1479 35.3475 42.084 37.4383 43.0295C38.4545 43.5186 39.4096 44.0729 40.3932 44.6082L43.1103 46.1827C46.0936 48.0113 48.986 49.6307 51.7031 50.8887C54.427 52.1359 56.8887 52.9795 59.2091 53.4102C61.5295 53.8463 63.8879 53.8409 66.7884 53.1752C69.6658 52.5244 72.9032 51.1211 76.2874 49.321C79.6919 47.5195 83.1834 45.3105 87.1667 43.1518C86.7672 47.6635 85.4902 51.8941 83.4959 55.9792C81.4526 60.0155 78.6105 63.9525 74.4669 67.1411C70.4022 70.3554 64.8199 72.5956 59.1371 72.9326C53.4515 73.317 48.0432 72.0644 43.4418 70.1801C38.8227 68.2687 34.8313 65.7567 31.2936 62.9839C30.3168 62.2177 29.7924 61.7829 29.071 61.173L27.0563 59.4082C25.6991 58.3458 24.384 57.0756 23.0404 56.0227C20.36 53.7825 17.7081 51.5381 14.8008 49.5927C13.3349 48.6037 11.8229 47.6866 10.1084 46.8742C9.25655 46.4816 8.35176 46.1162 7.3804 45.8281C6.38594 45.5035 5.37518 45.3105 4.18237 45.2698Z" fill="#F6643C"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.18237 45.2699C4.74074 40.6277 6.90491 36.2736 10.3733 32.5674C13.824 28.8967 19.2147 26.0668 25.1964 25.6918C28.1486 25.4948 31.1455 25.8236 33.9007 26.5871C36.6436 27.3479 39.2139 28.4565 41.5303 29.762C42.6878 30.4182 43.7705 31.1355 44.8492 31.8596L47.7239 34.036L52.2112 37.5764C55.1239 39.8955 57.9035 42.0406 60.4725 43.8122C63.066 45.5864 65.275 46.8825 67.3848 47.6419C69.4756 48.4706 72.1166 48.6826 75.6081 47.8049C77.3416 47.4055 79.1499 46.676 81.079 45.8853C82.9973 45.0756 84.9889 44.1097 87.1667 43.1519C86.9045 45.4859 86.4303 47.8104 85.5296 49.9827C84.6642 52.1849 83.5244 54.3396 81.9308 56.3488C81.1157 57.327 80.2421 58.3106 79.2232 59.2181C78.2043 60.1039 77.0753 60.9448 75.8282 61.6825C73.3407 63.1239 70.3899 64.1768 67.3631 64.5518C64.3362 64.9322 61.2972 64.742 58.5298 64.1551C55.7475 63.5845 53.2124 62.6647 50.8852 61.6024C46.2472 59.445 42.3671 56.7333 38.9368 53.8627C37.2142 52.4294 35.5988 50.9323 34.0691 49.4121L32.2623 47.5984C31.7175 47.0727 31.1673 46.5442 30.6225 46.0606C28.4271 44.1192 26.3892 42.6357 24.1449 41.7105C21.9169 40.7418 19.0653 40.3438 15.567 40.9986C12.0824 41.6466 8.25938 43.1533 4.18237 45.2699Z" fill="#FAFAFA"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5696 69.2087C22.5696 70.5822 21.4556 71.6962 20.0821 71.6962C18.7086 71.6962 17.5959 70.5822 17.5959 69.2087C17.5959 67.8352 18.7086 66.7212 20.0821 66.7212C21.4556 66.7212 22.5696 67.8352 22.5696 69.2087Z" fill="#FAFAFA"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5696 69.2087C22.5696 70.5822 21.4556 71.6962 20.0821 71.6962C18.7086 71.6962 17.5959 70.5822 17.5959 69.2087C17.5959 67.8352 18.7086 66.7212 20.0821 66.7212C21.4556 66.7212 22.5696 67.8352 22.5696 69.2087Z" fill="#FAFAFA"/>
      </g>
      <defs>
        <clipPath id="clip0_1_550">
          <rect width="92" height="92" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 6.5V11.5H0V2H6V3H1V10.5H9.5V6.5H10.5ZM12 0.5H6.506L8.5235 2.5L5.035 6.035L6.449 7.449L9.9375 3.914L12 6V0.5Z" fill="#37A411"/>
    </svg>
  );
}

