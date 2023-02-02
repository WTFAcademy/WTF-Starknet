import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export const CourseList = [
    {
        title: 'Solidity 入门',
        imgUrl: require('@site/static/img/course_solidity_start.jpg').default,
        linkUrl: '/solidity-start/',
        description: (
            <>
                学习solidity基础
            </>
        ),
    },
    {
        title: 'Solidity 进阶',
        imgUrl: require('@site/static/img/course_solidity_advanced.jpg').default,
        linkUrl: '/solidity-advanced/',
        description: (
            <>
                学习solidity进阶内容
            </>
        ),
    },
    {
        title: 'Solidity 应用',
        imgUrl: require('@site/static/img/course_solidity_apply.jpg').default,
        linkUrl: '/solidity-application/',
        description: (
            <>
                学习solidity应用内容
            </>
        ),
    },
    {
        title: 'Ethers.js 入门',
        imgUrl: require('@site/static/img/course_ethers_start.jpg').default,
        linkUrl: '/ether-start/',
        description: (
            <>
                学习Ethers.js基础
            </>
        ),
    },
];

export function Course({imgUrl, linkUrl, title, description}) {
    return (
        <li className={styles.learningCenterItem}>
            <Link to={linkUrl}>
                <img className={styles.learningCenterImage} src={imgUrl}/>
                <p className={styles.learningCenterListItemTitle}>{title}</p>
                <p className={styles.learningCenterListItemDesc}>{description}</p>
            </Link>
        </li>
    );
}

export default function HomepageLearningCenter() {
    return (
        <div className={styles.learningCenterContent}>
            <p className={styles.learningCenterTitle}>学习中心</p>
            <div className={styles.learningCenterListBox}>
                <ul className={styles.learningCenterList}>
                    {CourseList.map((props, idx) => (
                        <Course key={idx} {...props} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
