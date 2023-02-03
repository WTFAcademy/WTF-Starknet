import React, {useContext} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";
import {useHistory} from "@docusaurus/router";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div>
        <div className={styles.heroBannerLeftStar}></div>
        <div className={styles.heroBannerRightStar}></div>
        <h1 className={styles.heroBannerTitle}>{siteConfig.title}</h1>
        <p className={styles.heroBannerSubTitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={styles.tutorialsLink}
            to="/docs/intro"
          >
            StarkNet Tutorials
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();

    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <HomepageHeader/>
            <main>
                <HomepageFeatures/>
            </main>
        </Layout>
    );
}
