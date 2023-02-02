import React from 'react';
import Layout from '@theme/Layout';
import GithubIcon from '@site/static/img/github.svg';
import useAuth from "@site/src/hooks/useAuth";
import styles from './login.module.css';

export default function Login() {
    const {signInWithGithub} = useAuth();

    return (
        <Layout title="Hello" description="Hello React Page">
            <div className={styles.container}>
                <div className={styles.bigText}>Log in to WTFAcademy</div>
                <button
                    onClick={signInWithGithub}
                    className={`button button--secondary button--lg ${styles.loginButton}`}
                >
                    <GithubIcon className={styles.githubIcon}/>
                    <div className={styles.loginText}>Continue with Github</div>
                </button>
            </div>
        </Layout>
    );
}

