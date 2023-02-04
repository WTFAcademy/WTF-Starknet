import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import get from 'lodash/get';
import styles from './styles.module.css';
import {useRequest} from "ahooks";
import {getLesson} from "../../api/course";

export default function QuizForm(props) {
    const [formUrl, setFormUrl] = useState('#');
    const {link} = props;

    return (
        <div className={styles.quizFormBox}>
            <Link className={styles.quizFormBtn} to={link}>
                <p>Test</p>
            </Link>
        </div>
    );
}
