import React, {useState, useEffect} from 'react';
import styles from './styles.module.css';
import Button from "@site/src/components/Button";

export default function QuizForm(props) {
    const {link} = props;

    return (
        <div className={styles.quizFormBox}>
            <Button
                className={styles.quizFormBtn}
                type="primary"
                onClick={() => window.open(link)}
            >
                Start Quiz
                <svg style={{marginLeft: 8}} width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1L13 6M13 6L8 11M13 6H1" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </Button>
        </div>
    );
}
