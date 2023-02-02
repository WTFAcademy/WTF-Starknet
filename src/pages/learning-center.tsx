import React from 'react';
import Layout from '@theme/Layout';
import styles from './learning-center.module.css';
import {Course, CourseList} from "../components/HomepageLearningCenter";

export default function LearningCenter() {
    return (
        <Layout>
            <div className={styles.learningCenterContent}>
                <p className={styles.learningCenterTitle}>学习中心</p>
                <div className={styles.learningCenterListBox}>
                    <p className={styles.learningCenterListTitle}>进度</p>
                    <ul className={styles.learningCenterList}>
                        {CourseList.map((props, idx) => (
                            <Course key={idx} {...props} />
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
