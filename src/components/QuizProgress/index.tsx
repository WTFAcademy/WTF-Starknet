import React, {useState, useEffect, useContext} from 'react';
import styles from './styles.module.css';
import get from "lodash/get";
import {useDebounceEffect, useRequest} from "ahooks";
import {getLesson} from "../../api/course";
import GlobalContext from "@site/src/contexts/GlobalContext";
import {useAccount} from "@starknet-react/core";
import LoadingSvg from "@site/src/icons/LoadingSvg";

export default function QuizProgress(props) {
    const {courseId, lessonId} = props;
    const {uid} = useContext(GlobalContext);
    const {status} = useAccount();

    const {data, refresh, loading} = useRequest(() => getLesson(courseId, lessonId, uid), {
        cacheKey: 'lesson-share-' + lessonId,
        manual: status !== 'disconnected'
    });

    useEffect(() => {
        if (status !== "disconnected") {
            refresh();
        }
    }, [status]);

    return (
        <div className={styles.quizProgressBox}>
            <div className={styles.quizProgressTime}>
                Estimated Time:
                <span style={{marginLeft: 4}}>
                    {
                        loading ?
                        <LoadingSvg className="loading" style={{ verticalAlign: 'middle', marginTop: -2}} /> :
                        get(data, 'data.lesson.estimated_time') + '%'
                    }
                </span>
            </div>
            <div className={styles.quizProgressScore}>
                Score:
                <span style={{marginLeft: 4}}>
                    {
                        loading ?
                            <LoadingSvg className="loading" style={{ verticalAlign: 'middle', marginTop: -2}} /> :
                            get(data, 'data.lesson.score_percent') + '%'
                    }
                </span>
            </div>
        </div>
    );
}
