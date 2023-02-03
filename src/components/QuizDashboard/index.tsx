import React from 'react';
import Link from '@docusaurus/Link';
import {useHistory} from "@docusaurus/router";
import {useRequest} from "ahooks";
import get from 'lodash/get';
import styles from './styles.module.css';
import {getLessons} from "../../api/course";

const quizCertificationImg = require('@site/static/img/docusaurus.png').default;

export default function QuizDashboard(props) {
    const {courseId, uid} = props;
    const {data} = useRequest(() => getLessons(courseId, uid));
    const history = useHistory();

    function Course({id, sort, estimated_time, lesson_title, score_percent, is_finish, route_path}) {
        return (
            <li className={styles.quizListItem}>
                <Link to={`/${route_path}`}>
                    <div className={styles.quizListItemInner}>{sort}.{lesson_title}({estimated_time})</div>
                    <div className={styles.quizListItemInner}>{is_finish ? '✅' : '❌'}({score_percent}%)</div>
                </Link>
            </li>
        );
    }

    return (
        <div className={styles.quizDashboard}>
            <div className={styles.quizToc}>
                <h2>Menu</h2>
                <div className={styles.quizBox}>
                    <ul className={styles.quizList}>
                        {get(data, 'data.list', []).map((props, idx) => (
                            <Course key={idx} {...props} />
                        ))}
                    </ul>

                    <div className={styles.quizGraduateBox}>
                        <div className={styles.quizGraduateBtn}
                             onClick={() => history.push(`/SBT`)}>
                            <p>Graduate</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.quizCertification}>
                <h2>Technical certification</h2>
                <div className={styles.quizCertificationContent}>
                    <img src={quizCertificationImg}/>
                    <div className={styles.quizCertificationText}>
                        <p>Win the SBT technical certification 🔥</p>
                        <p>Pass all the exams to earn your Soulbound Token (SBT) technical certification! You can show it off on social media and add it to your resume!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
