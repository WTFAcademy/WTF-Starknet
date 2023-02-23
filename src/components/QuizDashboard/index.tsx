import React, {useContext} from 'react';
import Link from '@docusaurus/Link';
import {useHistory} from "@docusaurus/router";
import {useDebounceEffect, useRequest} from "ahooks";
import get from 'lodash/get';
import styles from './styles.module.css';
import {getLessons} from "../../api/course";
import clsx from "clsx";
import Button from "@site/src/components/Button";
import GlobalContext from "@site/src/contexts/GlobalContext";
import {useAccount} from "@starknet-react/core";

export default function QuizDashboard(props) {
    const {courseId} = props;
    const {uid} = useContext(GlobalContext);
    const {data, refresh} = useRequest(() => getLessons(courseId, uid));
    const history = useHistory();
    const {status} = useAccount();

    useDebounceEffect(() => {
        if (status !== "disconnected") {
            refresh();
        }
    }, [status]);

    function StatusSpan({children, score_percent, className}) {
        if (score_percent == 0) {
            return (<span className={clsx(styles.pendingSpan, styles.statusSpan, className)}>
          {children}
        </span>)
        } else if (score_percent == 100) {
            return (<span className={clsx(styles.completeSpan, styles.statusSpan, className)}>
          {children}
        </span>)
        } else {
            return (<span className={clsx(styles.learningSpan, styles.statusSpan, className)}>
          {children}
        </span>)
        }
    }

    function LessonCard({id, sort, estimated_time, lesson_title, score_percent, is_finish, route_path}) {
        return (<>
            <li>
                <Link to={`/docs/${route_path}`}>
                    <div className={styles.lessonCard}>
                        {lesson_title}
                        <div className={styles.lessonCardRight}>
                            <div className={styles.span}>
                <span className={styles.spanMsg}>
                  Progress
                </span>
                                <StatusSpan score_percent={score_percent} className={styles.span50px}>
                                    {score_percent}%
                                </StatusSpan>
                            </div>
                            <div className={styles.span}>
                <span className={styles.spanMsg}>
                  Status
                </span>
                                <StatusSpan score_percent={score_percent} className={styles.span100px}>
                                    {score_percent == 0 ? 'Pending' : (score_percent == 100 ? 'Complete' : 'Learning')}
                                </StatusSpan>
                            </div>
                        </div>
                    </div>
                </Link>
            </li>
        </>)
    }

    return (
        <div className={styles.quizDashboard}>
            <div className={styles.quizToc}>
                <h2 style={{marginBottom: 28}}>Learn and obtain technical certification</h2>
                <div className={styles.progressBox}>
                    <div className={styles.progressPoint}>
                        <div className={styles.circlePoint}>1</div>
                        <p className={styles.progressMsg}>Learning</p>
                    </div>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5625 10.3125L26.25 15M26.25 15L21.5625 19.6875M26.25 15H3.75" stroke="#8D8D8D"
                              stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className={styles.progressPoint}>
                        <div className={styles.circlePoint}>2</div>
                        <p className={styles.progressMsg}>Quiz</p>
                    </div>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5625 10.3125L26.25 15M26.25 15L21.5625 19.6875M26.25 15H3.75" stroke="#8D8D8D"
                              stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className={styles.progressPoint}>
                        <div className={styles.circlePoint}>3</div>
                        <p className={styles.progressMsg}>Certificate(SBT)</p>
                    </div>
                </div>
            </div>
            <div className={styles.quizCertification}>
                <h2>Courses and learning progress</h2>
                <ul className={styles.quizList}>
                    {get(data, 'data.list', []).map((props, idx) => (
                        <LessonCard key={idx} {...props} />
                    ))}
                </ul>
                <p style={{marginTop: 16, marginBottom: 16}}>When you have completed all the courses, please click the
                    button below to get the certificate.</p>
                <Button disabled type="primary" onClick={() => history.push('/sbt')}>
                    Obtain Certificate
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1L13 6M13 6L8 11M13 6H1" stroke="white" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                </Button>
            </div>
        </div>
    );
}
